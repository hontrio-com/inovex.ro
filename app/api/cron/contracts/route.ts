import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { sendEmail } from '@/lib/email/send';
import { reminderHtml, reminderSubject } from '@/lib/email/templates/contract';

export const runtime = 'nodejs';
export const maxDuration = 60;

/**
 * GET /api/cron/contracts — job zilnic (Vercel Cron):
 *  - trimite un reminder pentru contractele 'trimis' nesemnate dupa X zile.
 * Linkurile nu expira. Protejat cu CRON_SECRET (header Authorization: Bearer ...).
 */
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (!process.env.CRON_SECRET || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const now = new Date();
  const nowIso = now.toISOString();

  const { data: org } = await supabaseAdmin.from('crm_org_settings').select('company_name, reminder_days').eq('id', 1).single();
  const reminderDays = org?.reminder_days ?? 3;
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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://inovex.ro';
  let remindersSent = 0;

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
      remindersSent++;
    }
    await supabaseAdmin.from('crm_contracts').update({ reminder_sent_at: nowIso }).eq('id', c.id);
  }

  return NextResponse.json({ remindersSent });
}
