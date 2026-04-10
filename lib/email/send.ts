import { transporter } from '@/lib/nodemailer';

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail(options: SendEmailOptions): Promise<{ success: boolean; error?: string }> {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM ?? 'contact@inovex.ro',
      to: options.to,
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo ?? process.env.SMTP_USER,
    });

    if (process.env.NODE_ENV === 'development') {
      console.log('[Email sent]', options.subject, '→', options.to, info.messageId ?? '');
    }

    return { success: true };
  } catch (error) {
    console.error('[Email Error]', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Eroare necunoscuta',
    };
  }
}
