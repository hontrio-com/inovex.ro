import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase';
import { limbaEmail } from '@/lib/email/texte';
import { completeaza } from '@/lib/i18n/completeaza';
import { textConfiguratoare } from '@/lib/i18n/pagini/configuratoare';
import {
  ATASAMENTE_BUCKET, ATASAMENTE_EXT, ATASAMENTE_MAX, ATASAMENTE_MAX_BYTES, ATASAMENTE_PREFIX, extensie,
} from '@/lib/configurator-atasamente';

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
  fisiere: z.array(z.object({
    nume: z.string().min(1).max(200),
    marime: z.number().int().positive().max(ATASAMENTE_MAX_BYTES),
  })).min(1).max(ATASAMENTE_MAX),
  limba: z.enum(['ro', 'en', 'de', 'fr']).optional(),
});

/** Nume sigur pentru storage: fara diacritice, spatii sau cai; pastreaza extensia (doar cele permise). */
function numeSigur(nume: string, folosite: Set<string>): string | null {
  const ext = extensie(nume);
  if (!ATASAMENTE_EXT.includes(ext)) return null;
  const baza = nume.slice(0, nume.length - ext.length)
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-zA-Z0-9_-]+/g, '-').replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'fisier';
  let candidat = `${baza}${ext}`;
  for (let i = 2; folosite.has(candidat); i++) candidat = `${baza}-${i}${ext}`;
  folosite.add(candidat);
  return candidat;
}

/**
 * POST /api/configurator/aplicatie-web/upload
 * URL-uri semnate de incarcare pentru atasamentele configuratorului de aplicatie web (lib/configurator-atasamente.ts):
 * fisierele urca direct din browser in Supabase Storage. Cererea configuratorului trimite apoi doar id-ul, iar
 * ruta ei citeste fisierele din storage.
 */
export async function POST(req: NextRequest) {
  // limba paginii, pentru mesajele de eroare
  const corp = await req.json().catch(() => null);
  const e = textConfiguratoare(limbaEmail(corp?.limba)).aplicatie.atasamente;

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: e.preaMulte }, { status: 429 });
  }

  const parsed = schema.safeParse(corp);
  if (!parsed.success) {
    return NextResponse.json({ error: e.eroare }, { status: 400 });
  }

  const id = crypto.randomUUID();
  const folosite = new Set<string>();
  const incarcari: { nume: string; url: string }[] = [];

  for (const fisier of parsed.data.fisiere) {
    const nume = numeSigur(fisier.nume, folosite);
    if (!nume) {
      return NextResponse.json({ error: completeaza(e.tip, { nume: fisier.nume }) }, { status: 400 });
    }
    const { data, error } = await supabaseAdmin.storage
      .from(ATASAMENTE_BUCKET)
      .createSignedUploadUrl(`${ATASAMENTE_PREFIX}/${id}/${nume}`);
    if (error || !data) {
      console.error('[configurator aplicatie-web upload]', error?.message);
      return NextResponse.json({ error: e.eroare }, { status: 500 });
    }
    incarcari.push({ nume: fisier.nume, url: data.signedUrl });
  }

  return NextResponse.json({ id, incarcari });
}
