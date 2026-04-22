import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendEmail } from '@/lib/email/send';
import { internSubject, internHtml, clientSubject, clientHtml } from '@/lib/email/templates/automatizari-ai';

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

const proceseEnum = z.enum([
  'comunicare-clienti',
  'confirmare-comenzi',
  'gestionare-date',
  'taskuri-interne',
  'facturi-documente',
  'altceva',
]);

const schema = z
  .object({
    tipAfacere:          z.enum(['magazin-online', 'prestari-servicii', 'afacere-locala', 'alt-tip']),
    proceseAutomatizare: z.array(proceseEnum).min(1),
    descriereAltceva:    z.string().max(500).optional(),
    numeComplet:         z.string().min(2).max(100),
    email:               z.string().email().optional().or(z.literal('')),
    telefon:             z.string().min(10).max(20),
    gdprConsent:         z.literal(true),
  })
  .superRefine((data, ctx) => {
    if (
      data.proceseAutomatizare.includes('altceva') &&
      (!data.descriereAltceva || data.descriereAltceva.trim().length < 10)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Te rugam sa descrii ce proces vrei sa automatizezi',
        path: ['descriereAltceva'],
      });
    }
  });

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Prea multe cereri. Incearca din nou mai tarziu.' }, { status: 429 });
  }

  try {
    const body = await req.json();
    const data = schema.parse(body);

    const to = process.env.SMTP_TO ?? 'contact@inovex.ro';
    const emailData = { ...data, ip };

    const internResult = await sendEmail({ to, subject: internSubject(emailData), html: internHtml(emailData) });
    if (!internResult.success) console.error('[Email intern Automatizari esuat]', internResult.error);

    if (data.email) {
      const clientResult = await sendEmail({ to: data.email, subject: clientSubject(), html: clientHtml(emailData), replyTo: process.env.SMTP_USER });
      if (!clientResult.success) console.error('[Email client Automatizari esuat]', clientResult.error);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Date invalide' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Eroare server' }, { status: 500 });
  }
}
