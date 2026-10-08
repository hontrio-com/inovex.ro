import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase';
import {
  MOTION_BRIEF_PREFIX, MOTION_MAX_FILES, MOTION_MAX_FILE_SIZE, MOTION_ALLOWED_EXT,
} from '@/lib/motion-design';

const BUCKET = 'crm-files';

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return true;
  }
  if (entry.count >= 10) return false;
  entry.count++;
  return true;
}

const schema = z.object({
  files: z.array(z.object({
    name: z.string().min(1).max(200),
    size: z.number().int().positive().max(MOTION_MAX_FILE_SIZE),
  })).min(1).max(MOTION_MAX_FILES),
});

/** Nume sigur pentru storage: fara diacritice, spatii sau cai; pastreaza extensia. */
function safeName(name: string, taken: Set<string>): string | null {
  const dot = name.lastIndexOf('.');
  const ext = dot > 0 ? name.slice(dot).toLowerCase() : '';
  if (!MOTION_ALLOWED_EXT.includes(ext)) return null;
  const base = name.slice(0, dot)
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-zA-Z0-9_-]+/g, '-').replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'fisier';
  let candidate = `${base}${ext}`;
  for (let i = 2; taken.has(candidate); i++) candidate = `${base}-${i}${ext}`;
  taken.add(candidate);
  return candidate;
}

/**
 * POST /api/checkout/motion-design/upload
 * Intoarce URL-uri semnate de upload: fisierele brief-ului urca direct din
 * browser in Supabase Storage (o functie Vercel nu primeste corpuri > 4.5 MB).
 */
export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Prea multe cereri. Incearca din nou mai tarziu.' }, { status: 429 });
  }

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: 'Fisiere invalide.' }, { status: 400 });
  }

  const orderId = crypto.randomUUID();
  const taken = new Set<string>();
  const uploads: { name: string; signedUrl: string }[] = [];

  for (const file of parsed.data.files) {
    const name = safeName(file.name, taken);
    if (!name) {
      return NextResponse.json({ error: `Tip de fisier nepermis: ${file.name}` }, { status: 400 });
    }
    const { data, error } = await supabaseAdmin.storage
      .from(BUCKET)
      .createSignedUploadUrl(`${MOTION_BRIEF_PREFIX}/${orderId}/${name}`);
    if (error || !data) {
      console.error('[motion-design upload]', error?.message);
      return NextResponse.json({ error: 'Nu am putut pregati incarcarea fisierelor.' }, { status: 500 });
    }
    uploads.push({ name: file.name, signedUrl: data.signedUrl });
  }

  return NextResponse.json({ orderId, uploads });
}
