import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendEmail } from '@/lib/email/send';
import { internSubject, internHtml, clientSubject, clientHtml } from '@/lib/email/templates/website-prezentare';

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
  tipEntitate:      z.string().min(1),
  industrie:        z.string().min(1),
  nrPagini:         z.string().min(1),
  obiectiv:         z.string().min(1),
  nume:             z.string().min(2).max(100),
  email:            z.string().email(),
  telefon:          z.string().min(10).max(20),
  observatii:       z.string().optional(),
  acordPrivacitate: z.literal(true),
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

    const [internResult, clientResult] = await Promise.all([
      sendEmail({ to, subject: internSubject(emailData), html: internHtml(emailData) }),
      sendEmail({ to: data.email, subject: clientSubject(), html: clientHtml(emailData), replyTo: process.env.SMTP_USER }),
    ]);

    if (!internResult.success) console.error('[Email intern WP eșuat]', internResult.error);
    if (!clientResult.success) console.error('[Email client WP eșuat]', clientResult.error);

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Date invalide' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Eroare server' }, { status: 500 });
  }
}
