import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireRole } from '@/lib/auth';

function monthlyMRR(price: number | null, cycle: string): number {
  if (price == null) return 0;
  if (cycle === 'trimestrial') return price / 3;
  if (cycle === 'anual') return price / 12;
  return price;
}

/** GET /api/admin/stats — agregate pentru dashboard (scoping pe rol). Toate query-urile in paralel. */
export async function GET() {
  const auth = await requireRole(['owner', 'admin']);
  if (auth.error) return auth.error;
  const agent = auth.user.role === 'agent' ? auth.user.id : null;

  const now = Date.now();
  const iso = (ms: number) => new Date(ms).toISOString();
  const d7 = iso(now - 7 * 86_400_000);
  const d30 = iso(now - 30 * 86_400_000);
  const d60 = iso(now - 60 * 86_400_000);
  const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString();

  const leadCount = () => {
    const q = supabaseAdmin.from('crm_leads').select('*', { count: 'exact', head: true });
    return agent ? q.eq('assigned_to', agent) : q;
  };
  const clientCount = () => {
    const q = supabaseAdmin.from('crm_clients').select('*', { count: 'exact', head: true });
    return agent ? q.eq('assigned_to', agent) : q;
  };

  let pipeQ = supabaseAdmin.from('crm_leads').select('status, estimated_value').neq('status', 'convertit').neq('status', 'edinio').neq('status', 'pierdut');
  if (agent) pipeQ = pipeQ.eq('assigned_to', agent);
  let platQ = supabaseAdmin.from('crm_leads').select('platform');
  if (agent) platQ = platQ.eq('assigned_to', agent);
  let contrQ = supabaseAdmin.from('crm_contracts').select('status, value').gte('created_at', monthStart);
  if (agent) contrQ = contrQ.eq('assigned_to', agent);
  let subQ = supabaseAdmin.from('crm_subscriptions').select('price, billing_cycle, next_renewal_date, client:crm_clients!inner(assigned_to)').eq('status', 'activ');
  if (agent) subQ = subQ.eq('client.assigned_to', agent);
  let actQ = supabaseAdmin.from('crm_activities').select('*').order('created_at', { ascending: false }).limit(8);
  if (agent) actQ = actQ.eq('created_by', agent);

  // Toate interogarile in paralel.
  const [c7, c30, cPrev, cTotal, cWon, cLost, clientsTotal, pipeRes, platRes, contrRes, subRes, actRes] = await Promise.all([
    leadCount().gte('created_at', d7),
    leadCount().gte('created_at', d30),
    leadCount().gte('created_at', d60).lt('created_at', d30),
    leadCount(),
    leadCount().eq('status', 'convertit'),
    leadCount().eq('status', 'pierdut'),
    clientCount(),
    pipeQ,
    platQ,
    contrQ,
    subQ,
    actQ,
  ]);

  const pipeline: Record<string, { count: number; value: number }> = {};
  (pipeRes.data ?? []).forEach((r) => {
    const s = (pipeline[r.status] ??= { count: 0, value: 0 });
    s.count++; s.value += r.estimated_value ?? 0;
  });

  const platforms: Record<string, number> = {};
  (platRes.data ?? []).forEach((r) => { const k = r.platform ?? 'necunoscut'; platforms[k] = (platforms[k] ?? 0) + 1; });

  let cDraft = 0, cSent = 0, cSigned = 0, signedValue = 0;
  (contrRes.data ?? []).forEach((r) => {
    if (r.status === 'draft') cDraft++;
    else if (r.status === 'trimis') cSent++;
    else if (r.status === 'semnat') { cSigned++; signedValue += r.value ?? 0; }
  });

  let mrr = 0, renewals30 = 0;
  const in30 = now + 30 * 86_400_000;
  (subRes.data ?? []).forEach((s) => {
    mrr += monthlyMRR(s.price, s.billing_cycle);
    if (s.next_renewal_date) { const d = new Date(s.next_renewal_date).getTime(); if (d >= now && d <= in30) renewals30++; }
  });

  const leadsTotal = cTotal.count ?? 0;
  const won = cWon.count ?? 0;
  const conversionRate = leadsTotal > 0 ? Math.round((won / leadsTotal) * 1000) / 10 : 0;

  return NextResponse.json({
    leads: { last7: c7.count ?? 0, last30: c30.count ?? 0, prev30: cPrev.count ?? 0, total: leadsTotal, won, lost: cLost.count ?? 0 },
    conversionRate,
    clientsTotal: clientsTotal.count ?? 0,
    pipeline,
    platforms,
    contracts: { draft: cDraft, trimis: cSent, semnat: cSigned, signedValue },
    subs: { active: subRes.data?.length ?? 0, mrr: Math.round(mrr * 100) / 100, renewals30 },
    activities: actRes.data ?? [],
  });
}
