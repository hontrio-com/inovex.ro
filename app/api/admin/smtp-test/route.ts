import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

type SmtpSettings = {
  host: string;
  port: string;
  user: string;
  pass: string;
  secure: boolean;
  fromName: string;
  fromEmail: string;
};

type RequestBody = {
  smtp: SmtpSettings;
  to: string;
};

export async function POST(req: NextRequest) {
  const body = await req.json() as RequestBody;
  const { smtp, to } = body;

  if (!smtp.host || !smtp.port || !smtp.user || !smtp.pass) {
    return NextResponse.json({ ok: false, error: 'Configuratie SMTP incompleta. Completeaza host, port, utilizator si parola.' }, { status: 400 });
  }

  if (!to || !to.includes('@')) {
    return NextResponse.json({ ok: false, error: 'Adresa de email destinatar invalida.' }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: Number(smtp.port),
    secure: smtp.secure,
    auth: {
      user: smtp.user,
      pass: smtp.pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
  });

  try {
    await transporter.verify();

    const from = smtp.fromEmail
      ? `"${smtp.fromName || 'Inovex'}" <${smtp.fromEmail}>`
      : `"${smtp.fromName || 'Inovex'}" <${smtp.user}>`;

    await transporter.sendMail({
      from,
      to,
      subject: 'Test SMTP - Inovex Admin',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 24px; background: #fff;">
          <img src="https://inovex.ro/imagini/logo_negru.png" alt="Inovex" style="height: 36px; margin-bottom: 24px;" />
          <h2 style="color: #0D1117; font-size: 20px; margin-bottom: 12px;">Configurare SMTP functionala</h2>
          <p style="color: #4A5568; font-size: 15px; line-height: 1.6; margin-bottom: 16px;">
            Acesta este un email de test trimis din panoul de administrare Inovex pentru a confirma ca setarile SMTP sunt corecte.
          </p>
          <div style="background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
            <p style="color: #065F46; font-size: 14px; margin: 0;">
              <strong>Host:</strong> ${smtp.host}:${smtp.port}<br/>
              <strong>Utilizator:</strong> ${smtp.user}<br/>
              <strong>Expeditor:</strong> ${from}
            </p>
          </div>
          <p style="color: #8A94A6; font-size: 13px;">
            Acest email a fost trimis automat din panoul admin inovex.ro
          </p>
        </div>
      `,
      text: `Test SMTP Inovex Admin\n\nConfiguratia SMTP functioneaza corect.\nHost: ${smtp.host}:${smtp.port}\nUtilizator: ${smtp.user}`,
    });

    transporter.close();
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
