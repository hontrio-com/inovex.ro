import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { sendEmail } from '@/lib/email/send';
import { reminderHtml, reminderSubject } from '@/lib/email/templates/contract';
import { renewalReminderHtml, renewalReminderSubject } from '@/lib/email/templates/subscription';
import { flushPendingSignals } from '@/lib/crm/ads/signals';

export const runtime = 'nodejs';
export const maxDuration = 60;

/**
 * GET /api/cron/contracts — job zilnic (Vercel Cron, 08:00):
 *  1) reminder catre client pentru contractele 'trimis' nesemnate dupa X zile;
 *  2) reminder intern (office -> contact) pentru abonamentele care se reinnoiesc curand;
 *  3) retry pentru semnalele de ads (Meta/TikTok/Google) ramase pending/failed.
 * Linkurile de contract nu expira. Protejat cu CRON_SECRET (Authorization: Bearer ...).
 */
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (!process.env.CRON_SECRET || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const now = new Date();
  const nowIso = now.toISOString();
  const fmtDate = (iso: string) => new Date(iso).toLocaleDateString('ro-RO', { day: '2-digit', month: 'short', year: 'numeric' });
  const internalTo = process.env.SMTP_TO || 'contact@inovex.ro';

  const { data: org } = await supabaseAdmin.from('crm_org_settings').select('company_name, reminder_days').eq('id', 1).single();
  const reminderDays = org?.reminder_days ?? 3;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://inovex.ro';

  // ── 1) Remindere de semnare contracte ──
  const threshold = new Date(now.getTime() - reminderDays * 86_400_000).toISOString();
  const { data: toRemind } = await supabaseAdmin
    .from('crm_contracts')
    .select('id, contract_number, sign_token, client_id')
    .eq('status', 'trimis')
    .is('reminder_sent_at', null)
    .lt('sent_at', threshold);

  const clientIds = [...new Set((toRemind ?? []).map((c) => c.client_id).filter(Boolean))];
  const emailMap = new Map<string, string | null>();
  if (clientIds.length > 0) {
    const { data: clients } = await supabaseAdmin.from('crm_clients').select('id, email').in('id', clientIds);
    (clients ?? []).forEach((cl) => emailMap.set(cl.id, cl.email));
  }

  let contractReminders = 0;
  for (const c of toRemind ?? []) {
    const email = c.client_id ? emailMap.get(c.client_id) : null;
    if (email && c.sign_token) {
      await sendEmail({
        to: email,
        subject: reminderSubject(c.contract_number || ''),
        html: reminderHtml({
          contractNumber: c.contract_number || '',
          companyName: org?.company_name,
          signUrl: `${siteUrl}/contract/${c.sign_token}`,
          expires: null,
        }),
      });
      contractReminders++;
    }
    await supabaseAdmin.from('crm_contracts').update({ reminder_sent_at: nowIso }).eq('id', c.id);
  }

  // ── 2) Remindere reinnoire abonamente (o data per fereastra de reinnoire) ──
  const SUB_WINDOW_DAYS = 7;
  const windowEnd = new Date(now.getTime() + SUB_WINDOW_DAYS * 86_400_000).toISOString().slice(0, 10);
  const { data: subs } = await supabaseAdmin
    .from('crm_subscriptions')
    .select('id, name, price, currency, next_renewal_date, renewal_reminder_sent_at, client:crm_clients(name)')
    .eq('status', 'activ')
    .not('next_renewal_date', 'is', null)
    .lte('next_renewal_date', windowEnd);

  const fmtMoney = (v: number | null, cur: string | null) => {
    if (v == null) return null;
    try { return new Intl.NumberFormat('ro-RO', { style: 'currency', currency: cur || 'RON', maximumFractionDigits: 0 }).format(v); }
    catch { return `${v} ${cur || 'RON'}`; }
  };

  let subReminders = 0;
  for (const sub of subs ?? []) {
    if (!sub.next_renewal_date) continue;
    const renewal = new Date(sub.next_renewal_date);
    const remindFrom = new Date(renewal.getTime() - SUB_WINDOW_DAYS * 86_400_000);
    const sentAt = sub.renewal_reminder_sent_at ? new Date(sub.renewal_reminder_sent_at) : null;
    if (sentAt && sentAt >= remindFrom) continue; // deja notificat pentru aceasta reinnoire

    const daysLeft = Math.ceil((renewal.getTime() - now.getTime()) / 86_400_000);
    const clientName = (sub.client as { name?: string } | null)?.name ?? 'Client';
    await sendEmail({
      to: internalTo,
      subject: renewalReminderSubject(clientName, daysLeft),
      html: renewalReminderHtml({
        subscriptionName: sub.name,
        clientName,
        renewalDate: fmtDate(sub.next_renewal_date),
        daysLeft,
        price: fmtMoney(sub.price, sub.currency),
      }),
    });
    await supabaseAdmin.from('crm_subscriptions').update({ renewal_reminder_sent_at: nowIso }).eq('id', sub.id);
    subReminders++;
  }

  // ── 3) Retry semnale ads (pending/failed, max 8 incercari) ──
  let signalsProcessed = 0;
  try {
    signalsProcessed = await flushPendingSignals(100);
  } catch (e) {
    console.error('[cron] flushPendingSignals:', e instanceof Error ? e.message : e);
  }

  return NextResponse.json({ contractReminders, subReminders, signalsProcessed });
}
