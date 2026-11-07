import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendEmail } from '@/lib/email/send';
import { internSubject, internHtml, clientSubject, clientHtml } from '@/lib/email/templates/aplicatie-web';
import { limbaEmail, sufixLimba } from '@/lib/email/texte';
import { createWebsiteLead } from '@/lib/crm/website-lead';
import { supabaseAdmin } from '@/lib/supabase';
import {
  ATASAMENTE_BUCKET, ATASAMENTE_MAX, ATASAMENTE_MAX_BYTES, ATASAMENTE_PREFIX,
} from '@/lib/configurator-atasamente';

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return true;
  }
  if (entry.count >= 3) return false;
  entry.count++;
  return true;
}

const schema = z.object({
  ideaClaritate:  z.enum(['da-stiu-exact', 'am-o-idee', 'am-nevoie-de-ajutor']),
  tipAplicatie:   z.enum(['platforma-utilizatori', 'marketplace', 'aplicatie-servicii', 'sistem-intern', 'alt-tip']),
  descriereIdeea: z.string().max(500).optional(),
  numeComplet:    z.string().min(2).max(100),
  email:          z.string().email().optional().or(z.literal('')),
  telefon:        z.string().min(10).max(20),
  gdprConsent:    z.literal(true),
  // limba paginii (2026-11-07): confirmarea pleaca in limba clientului, iar in CRM sursa o arata
  limba:          z.enum(['ro', 'en', 'de', 'fr']).optional(),
  // atasamentele (2026-11-07), urcate inainte prin /api/configurator/aplicatie-web/upload: doar id-ul lor
  atasamenteId:   z.string().uuid().optional(),
});

/**
 * Atasamentele se citesc din storage, nu din ce declara browserul: ce depaseste limitele se sterge, restul
 * ajunge in CRM si in emailul intern ca linkuri spre /api/admin/atasamente-configurator (bucket privat,
 * deschise doar de cei logati in admin).
 */
async function atasamente(id: string, origin: string): Promise<{ nume: string; link: string }[]> {
  const folder = `${ATASAMENTE_PREFIX}/${id}`;
  const { data: fisiere } = await supabaseAdmin.storage.from(ATASAMENTE_BUCKET).list(folder, { limit: 100 });
  if (!fisiere?.length) return [];

  const bune = fisiere.filter((f) => (f.metadata?.size ?? 0) <= ATASAMENTE_MAX_BYTES).slice(0, ATASAMENTE_MAX);
  const respinse = fisiere.filter((f) => !bune.includes(f));
  if (respinse.length) {
    await supabaseAdmin.storage.from(ATASAMENTE_BUCKET).remove(respinse.map((f) => `${folder}/${f.name}`));
  }
  return bune.map((f) => ({ nume: f.name, link: `${origin}/api/admin/atasamente-configurator?f=${id}/${encodeURIComponent(f.name)}` }));
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Prea multe cereri. Incearca din nou mai tarziu.' }, { status: 429 });
  }

  try {
    const body = await req.json();
    const data = schema.parse(body);
    const lang = limbaEmail(data.limba);
    // daca storage-ul nu raspunde, cererea pleaca oricum, fara linkuri (fisierele raman in storage)
    const fisiere = data.atasamenteId
      ? await atasamente(data.atasamenteId, req.nextUrl.origin).catch((e) => {
          console.error('[configurator aplicatie-web atasamente]', e);
          return [];
        })
      : [];

    // Lead in CRM (best-effort, nu afecteaza emailurile).
    await createWebsiteLead({
      req, source: 'Configurator aplicatie web' + sufixLimba(lang), metaEventId: req.headers.get('x-meta-event-id'),
      name: data.numeComplet, email: data.email || null, phone: data.telefon,
      notes: [
        `Claritate idee: ${data.ideaClaritate}`,
        `Tip aplicatie: ${data.tipAplicatie}`,
        data.descriereIdeea ? `Descriere: ${data.descriereIdeea}` : null,
        fisiere.length ? `Atasamente (deschise din admin):\n${fisiere.map((x) => `- ${x.nume}: ${x.link}`).join('\n')}` : null,
      ].filter(Boolean).join('\n'),
      raw: data,
    });

    const to = process.env.SMTP_TO ?? 'contact@inovex.ro';
    const emailData = { ...data, ip, limba: lang, atasamente: fisiere };

    const internResult = await sendEmail({ to, subject: internSubject(emailData), html: internHtml(emailData) });
    if (!internResult.success) console.error('[Email intern AplicatieWeb esuat]', internResult.error);

    if (data.email) {
      const clientResult = await sendEmail({ to: data.email, subject: clientSubject(lang), html: clientHtml(emailData, lang), replyTo: process.env.SMTP_USER });
      if (!clientResult.success) console.error('[Email client AplicatieWeb esuat]', clientResult.error);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Date invalide' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Eroare server' }, { status: 500 });
  }
}
