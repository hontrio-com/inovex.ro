import { NextRequest, NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { getStripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';
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

  const customer = session.customer_details;
  const videos = Number(meta.videoclipuri);
  const pachet = videos > 0 ? motionLabel(videos) : 'necunoscut';
  const total = (session.amount_total ?? 0) / 100;
  const cui = customer?.tax_ids?.[0]?.value ?? null;
  const companie = customer?.business_name ?? null;

  const paidLine = `PLATIT ONLINE: ${pachet} - ${formatLei(total)}.${cui ? ` CUI: ${cui}.` : ''}`;

  // Lead-ul exista deja, creat la trimiterea brief-ului (metadata.lead_id).
  // platform_lead_id = id-ul sesiunii face webhook-ul idempotent: Stripe
  // retrimite evenimentul daca nu primeste 2xx la timp.
  let lead: { id: string; name: string | null; phone: string | null; notes: string | null; fbp?: string | null; fbclid?: string | null } | null = null;
  if (meta.lead_id) {
    const { data: existing } = await supabaseAdmin
      .from('crm_leads')
      .select('id, name, phone, notes, fbp, fbclid, platform_lead_id')
      .eq('id', meta.lead_id)
      .maybeSingle();
    if (existing?.platform_lead_id) return NextResponse.json({ received: true, duplicate: true });
    if (existing) {
      const { data: updated } = await supabaseAdmin
        .from('crm_leads')
        .update({
          platform_lead_id: session.id,
          estimated_value: total,
          company: companie ?? undefined,
          notes: `${paidLine}

${(existing.notes ?? '').replace(' (PLATA IN ASTEPTARE)', '')}`,
        })
        .eq('id', existing.id)
        .is('platform_lead_id', null)
        .select('id');
      if (!updated?.length) return NextResponse.json({ received: true, duplicate: true });
      lead = existing;
    }
  }

  // Fara lead (inserarea de la brief a esuat sau lead-ul a fost sters): il cream acum.
  if (!lead) {
    const { data: created, error } = await supabaseAdmin
      .from('crm_leads')
      .insert({
        name: customer?.name ?? null,
        company: companie,
        email: customer?.email?.toLowerCase() ?? null,
        phone: customer?.phone ?? null,
        status: 'nou',
        platform: 'website',
        platform_lead_id: session.id,
        source: 'Comanda Motion Design',
        notes: `${paidLine} Brief-ul nu a fost gasit - de contactat clientul.`,
        estimated_value: total,
        raw_payload: session,
      })
      .select('id, name, phone, notes')
      .single();
    if (error?.code === '23505') return NextResponse.json({ received: true, duplicate: true });
    // Emailurile pleaca oricum — o comanda platita nu are voie sa se piarda.
    if (error) console.error('[stripe webhook] insert lead:', error.message);
    else lead = created;
  }

  if (lead) {
    await supabaseAdmin.from('crm_activities').insert({
      type: 'system',
      title: `Comanda platita prin Stripe: Motion Design - ${pachet} (${formatLei(total)})`,
      lead_id: lead.id,
    });
  }

  // Meta "Purchase" server-side; perechea de browser pleaca de pe pagina de multumire.
  await sendMetaPurchaseCapi({
    eventId: session.id,
    value: total, currency: 'RON', contentName: 'motion-design',
    email: customer?.email, phone: lead?.phone ?? customer?.phone,
    fbp: lead?.fbp, fbclid: lead?.fbclid,
    sourceUrl: `${req.nextUrl.origin}${MOTION_PATH}/multumim`,
  });

  const emailData = {
    nume: lead?.name ?? customer?.name ?? 'client',
    email: customer?.email ?? '',
    telefon: lead?.phone ?? customer?.phone,
    companie, cui, pachet,
    total: formatLei(total),
    brief: lead?.notes?.replace(' (PLATA IN ASTEPTARE)', ''),
    sessionId: session.id,
  };
  const to = process.env.SMTP_TO ?? 'contact@inovex.ro';

  const [internResult, clientResult] = await Promise.all([
    sendEmail({ to, subject: internSubject(emailData), html: internHtml(emailData), replyTo: emailData.email || undefined }),
    emailData.email
      ? sendEmail({ to: emailData.email, subject: clientSubject(), html: clientHtml(emailData) })
      : Promise.resolve({ success: true as const, error: undefined }),
  ]);
  if (!internResult.success) console.error('[Email intern Motion Design esuat]', internResult.error);
  if (!clientResult.success) console.error('[Email client Motion Design esuat]', clientResult.error);

  return NextResponse.json({ received: true });
}
