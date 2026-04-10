import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendEmail } from '@/lib/email/send';
import { bidInternSubject, bidInternHtml, bidClientSubject, bidClientHtml } from '@/lib/email/templates/marketplace';

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
  productSlug:  z.string().min(1).max(120),
  productTitle: z.string().min(1).max(200),
  name:         z.string().min(2).max(100),
  email:        z.string().email(),
  phone:        z.string().min(10).max(20),
  offeredPrice: z.number().positive(),
  message:      z.string().max(1000).optional(),
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
      sendEmail({ to, subject: bidInternSubject(emailData), html: bidInternHtml(emailData) }),
      sendEmail({ to: data.email, subject: bidClientSubject(emailData), html: bidClientHtml(emailData), replyTo: process.env.SMTP_USER }),
    ]);

    if (!internResult.success) console.error('[Email intern Marketplace eșuat]', internResult.error);
    if (!clientResult.success) console.error('[Email client Marketplace eșuat]', clientResult.error);

    const { appendToArray } = await import('@/lib/data-layer');
    await appendToArray('bids', {
      id: Date.now().toString(),
      productSlug: data.productSlug,
      productTitle: data.productTitle,
      name: data.name,
      email: data.email,
      phone: data.phone,
      offeredPrice: data.offeredPrice,
      message: data.message ?? '',
      status: 'pending',
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Date invalide', details: err.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Eroare server.' }, { status: 500 });
  }
}
