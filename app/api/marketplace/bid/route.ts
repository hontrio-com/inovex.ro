import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { transporter } from '@/lib/nodemailer';

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
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const from = process.env.SMTP_FROM ?? 'contact@inovex.ro';
    const to   = process.env.SMTP_TO   ?? 'contact@inovex.ro';

    await transporter.sendMail({
      from,
      to,
      subject: `Oferta noua Marketplace — ${data.productTitle} — ${data.offeredPrice} EUR`,
      html: `
        <h2 style="color:#2B8FCC">Oferta noua pe Marketplace</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px">
          <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Produs</td><td style="padding:8px;border:1px solid #eee">${data.productTitle}</td></tr>
          <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Slug</td><td style="padding:8px;border:1px solid #eee">${data.productSlug}</td></tr>
          <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Oferta (EUR)</td><td style="padding:8px;border:1px solid #eee"><strong style="color:#2B8FCC;font-size:18px">${data.offeredPrice} EUR</strong></td></tr>
          <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Nume</td><td style="padding:8px;border:1px solid #eee">${data.name}</td></tr>
          <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #eee"><a href="mailto:${data.email}">${data.email}</a></td></tr>
          <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Telefon</td><td style="padding:8px;border:1px solid #eee"><a href="tel:${data.phone}">${data.phone}</a></td></tr>
          ${data.message ? `<tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Mesaj</td><td style="padding:8px;border:1px solid #eee">${data.message.replace(/\n/g, '<br>')}</td></tr>` : ''}
        </table>
        <p style="margin-top:20px;color:#6B7280;font-size:13px">
          Raspunde direct la acest email sau suna la <a href="tel:${data.phone}">${data.phone}</a> pentru a accepta / negocia oferta.
        </p>
      `,
    });

    // Email confirmare catre client
    await transporter.sendMail({
      from,
      to: data.email,
      subject: `Am primit oferta ta pentru "${data.productTitle}" — Inovex`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#2B8FCC">Oferta ta a fost primita!</h2>
          <p>Buna, <strong>${data.name}</strong>!</p>
          <p>Am primit oferta ta de <strong>${data.offeredPrice} EUR</strong> pentru <strong>${data.productTitle}</strong>.</p>
          <p>Te contactam in maxim <strong>24 de ore</strong> cu raspunsul nostru.</p>
          <hr style="border:none;border-top:1px solid #eee;margin:24px 0">
          <p style="color:#9CA3AF;font-size:13px">Echipa Inovex — contact@inovex.ro — 0750 456 096</p>
        </div>
      `,
    });

    // Save bid to Supabase for admin panel
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
