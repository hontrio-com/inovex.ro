import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { transporter } from '@/lib/nodemailer';

/* ------------------------------------------------------------------ */
/*  Rate limiting in-memory                                             */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  Schema                                                              */
/* ------------------------------------------------------------------ */

const schema = z.object({
  tipEntitate: z.string().min(1),
  industrie: z.string().min(1),
  areProduse: z.string().min(1),
  nrProduse: z.string().optional(),
  nume: z.string().min(2).max(100),
  email: z.string().email(),
  telefon: z.string().min(10).max(20),
  observatii: z.string().optional(),
  acordPrivacitate: z.literal(true),
});

/* ------------------------------------------------------------------ */
/*  Handler                                                             */
/* ------------------------------------------------------------------ */

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Prea multe cereri. Incearca din nou mai tarziu.' },
      { status: 429 },
    );
  }

  try {
    const body = await req.json();
    const data = schema.parse(body);

    const from = process.env.SMTP_FROM ?? 'contact@inovex.ro';
    const to = process.env.SMTP_TO ?? 'contact@inovex.ro';
    const submittedAt = new Date().toLocaleString('ro-RO', { timeZone: 'Europe/Bucharest' });

    const row = (label: string, value: string) =>
      `<tr><td style="padding:8px;border:1px solid #eee;font-weight:bold;background:#f9f9f9;width:200px">${label}</td><td style="padding:8px;border:1px solid #eee">${value}</td></tr>`;

    /* Email intern */
    await transporter.sendMail({
      from,
      to,
      subject: `[LEAD NOU] Configurator Magazine Online - ${data.nume}`,
      html: `
        <div style="font-family:sans-serif;max-width:700px;margin:0 auto">
          <h2 style="color:#2B8FCC;margin-bottom:4px">Lead nou - Configurator Magazine Online</h2>
          <p style="color:#8A94A6;font-size:13px;margin-bottom:24px">Trimis la: ${submittedAt} | IP: ${ip}</p>

          <h3 style="color:#0D1117;margin-bottom:8px">Date de contact</h3>
          <table style="border-collapse:collapse;width:100%;margin-bottom:20px">
            ${row('Nume', data.nume)}
            ${row('Email', data.email)}
            ${row('Telefon', data.telefon)}
          </table>

          <h3 style="color:#0D1117;margin-bottom:8px">Detalii proiect</h3>
          <table style="border-collapse:collapse;width:100%;margin-bottom:20px">
            ${row('Tip entitate', data.tipEntitate)}
            ${row('Industrie', data.industrie)}
            ${row('Are produse', data.areProduse)}
            ${data.nrProduse ? row('Numar produse', data.nrProduse) : ''}
          </table>

          ${data.observatii ? `<h3 style="color:#0D1117">Observatii</h3><p style="background:#f9f9f9;padding:12px;border-radius:6px;border-left:3px solid #2B8FCC">${data.observatii}</p>` : ''}
        </div>
      `,
    });

    /* Email confirmare client */
    await transporter.sendMail({
      from,
      to: data.email,
      subject: 'Am primit cererea ta - Inovex te contacteaza in 24h',
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#2B8FCC">Multumim, ${data.nume}!</h2>
          <p>Am primit cererea ta pentru un <strong>magazin online</strong> si o vom analiza imediat.</p>
          <p>Un consultant Inovex te va contacta in maximum <strong>24 de ore</strong> pentru a discuta detaliile proiectului tau.</p>
          <div style="background:#EAF5FF;border:1px solid #C8E6F8;border-radius:8px;padding:16px;margin:24px 0">
            <p style="margin:0;font-size:14px;color:#0D1117"><strong>Datele tale de contact inregistrate:</strong></p>
            <p style="margin:4px 0;font-size:13px;color:#4A5568">Telefon: ${data.telefon}</p>
            <p style="margin:0;font-size:13px;color:#4A5568">Email: ${data.email}</p>
          </div>
          <p>Daca ai o urgenta, ne poti suna direct la <a href="tel:+40750456096" style="color:#2B8FCC">0750 456 096</a>.</p>
          <hr style="border:none;border-top:1px solid #eee;margin:24px 0">
          <p style="color:#8A94A6;font-size:13px">Echipa Inovex | contact@inovex.ro | 0750 456 096</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Date invalide' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Eroare server' }, { status: 500 });
  }
}
