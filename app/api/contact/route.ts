import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { transporter } from '@/lib/nodemailer';

const schema = z.object({
  nume: z.string().min(2).max(100),
  email: z.string().email(),
  telefon: z.string().min(10).max(20),
  companie: z.string().max(100).optional(),
  mesaj: z.string().min(10).max(2000),
  acordPrivacitate: z.literal(true),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const from = process.env.SMTP_FROM ?? 'contact@inovex.ro';
    const to = process.env.SMTP_TO ?? 'contact@inovex.ro';

    // Email intern
    await transporter.sendMail({
      from,
      to,
      subject: `Mesaj nou de contact — ${data.nume}`,
      html: `
        <h2>Mesaj nou de pe inovex.ro</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Nume</td><td style="padding:8px;border:1px solid #eee">${data.nume}</td></tr>
          <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #eee">${data.email}</td></tr>
          <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Telefon</td><td style="padding:8px;border:1px solid #eee">${data.telefon}</td></tr>
          ${data.companie ? `<tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Companie</td><td style="padding:8px;border:1px solid #eee">${data.companie}</td></tr>` : ''}
          <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Mesaj</td><td style="padding:8px;border:1px solid #eee">${data.mesaj.replace(/\n/g, '<br>')}</td></tr>
        </table>
      `,
    });

    // Email confirmare client
    await transporter.sendMail({
      from,
      to: data.email,
      subject: 'Am primit mesajul tău — Inovex',
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#2B8FCC">Mulțumim, ${data.nume}!</h2>
          <p>Am primit mesajul tău și te vom contacta în maximum <strong>24 de ore</strong> pe email sau telefon.</p>
          <p>Dacă ai o urgență, ne poți suna direct la <a href="tel:+40750456096" style="color:#2B8FCC">0750 456 096</a>.</p>
          <hr style="border:none;border-top:1px solid #eee;margin:24px 0">
          <p style="color:#8A94A6;font-size:14px">Echipa Inovex — contact@inovex.ro</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Date invalide', details: err.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Eroare server. Încearcă din nou.' }, { status: 500 });
  }
}
