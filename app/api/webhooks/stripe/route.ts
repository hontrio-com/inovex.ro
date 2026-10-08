import { NextRequest, NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { getStripe } from '@/lib/stripe';
import { sendEmail } from '@/lib/email/send';
import { internSubject, internHtml, clientSubject, clientHtml } from '@/lib/email/templates/motion-design';
import { sendMetaPurchaseCapi } from '@/lib/crm/ads/signals';
import { motionLabel, formatLei, MOTION_PATH } from '@/lib/motion-design';

export const runtime = 'nodejs';
export const maxDuration = 30;

/**
 * Webhook Stripe — comenzi platite prin Stripe Checkout.
 * Se configureaza in Stripe Dashboard -> Developers -> Webhooks:
 *   URL:        https://inovex.ro/api/webhooks/stripe
 *   Evenimente: checkout.session.completed, checkout.session.async_payment_succeeded
 *   Secret:     STRIPE_WEBHOOK_SECRET (whsec_...)
 *
 * Comanda nu se salveaza in CRM: tot ce trebuie (contact, brief, materiale)
 * vine in metadata sesiunii si pleaca pe email.
 */
export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) return NextResponse.json({ error: 'Webhook neconfigurat' }, { status: 503 });

  // Semnatura se verifica pe corpul brut, nu pe JSON-ul parsat.
  const payload = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, req.headers.get('stripe-signature') ?? '', secret);
  } catch {
    return NextResponse.json({ error: 'Semnatura invalida' }, { status: 400 });
  }

  if (event.type !== 'checkout.session.completed' && event.type !== 'checkout.session.async_payment_succeeded') {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object;
  const meta = session.metadata ?? {};
  if (meta.serviciu !== 'motion-design' || session.payment_status !== 'paid') {
    return NextResponse.json({ received: true });
  }

  // Idempotenta: Stripe retrimite evenimentul daca nu primeste 2xx la timp.
  // Marcam plata ca notificata pe PaymentIntent, inainte de a trimite ceva.
  const paymentIntentId = typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id;
  if (paymentIntentId) {
    try {
      const intent = await stripe.paymentIntents.retrieve(paymentIntentId);
      if (intent.metadata.motion_notified) return NextResponse.json({ received: true, duplicate: true });
      await stripe.paymentIntents.update(paymentIntentId, { metadata: { motion_notified: '1' } });
    } catch (err) {
      // Emailurile pleaca oricum — o comanda platita nu are voie sa se piarda.
      console.error('[stripe webhook] marcaj idempotenta:', err instanceof Error ? err.message : err);
    }
  }

  const customer = session.customer_details;
  const videos = Number(meta.videoclipuri);
  const pachet = videos > 0 ? motionLabel(videos) : 'necunoscut';
  const total = (session.amount_total ?? 0) / 100;

  let brief = '';
  for (let i = 0; meta[`brief_${i}`] !== undefined; i++) brief += meta[`brief_${i}`];

  const emailData = {
    nume: meta.nume || customer?.name || 'client',
    email: customer?.email ?? session.customer_email ?? '',
    telefon: meta.telefon || customer?.phone,
    companie: customer?.business_name ?? null,
    cui: customer?.tax_ids?.[0]?.value ?? null,
    pachet,
    total: formatLei(total),
    brief: brief || null,
    sessionId: session.id,
  };

  // Meta "Purchase" server-side; perechea de browser pleaca de pe pagina de multumire.
  await sendMetaPurchaseCapi({
    eventId: session.id,
    value: total, currency: 'RON', contentName: 'motion-design',
    email: emailData.email, phone: emailData.telefon,
    fbp: meta.fbp, fbclid: meta.fbclid,
    sourceUrl: `${req.nextUrl.origin}${MOTION_PATH}/multumim`,
  });

  const to = process.env.SMTP_TO ?? 'contact@inovex.ro';
  const [internResult, clientResult] = await Promise.all([
    sendEmail({ to, subject: internSubject(emailData), html: internHtml(emailData), replyTo: emailData.email || undefined }),
    emailData.email
      ? sendEmail({ to: emailData.email, subject: clientSubject(), html: clientHtml(emailData) })
      : Promise.resolve({ success: true as const, error: undefined }),
  ]);
  if (!internResult.success) console.error('[Email intern Motion Design esuat]', internResult.error);
  if (!clientResult.success) console.error('[Email client Motion Design esuat]', clientResult.error);

  // Fara CRM, emailul intern e singura evidenta a comenzii: daca nu a plecat,
  // raspundem cu eroare ca Stripe sa retrimita evenimentul.
  if (!internResult.success) {
    if (paymentIntentId) {
      await stripe.paymentIntents.update(paymentIntentId, { metadata: { motion_notified: '' } }).catch(() => {});
    }
    return NextResponse.json({ error: 'Emailul comenzii nu a putut fi trimis' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
