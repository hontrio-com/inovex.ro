import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireAuth } from '@/lib/auth';
import { guardClient } from '@/lib/crm/guard';
import { subscriptionSchema } from '@/lib/crm/schemas';

const STATUSES = ['activ', 'suspendat', 'anulat'];

/** Normalizeaza pretul la valoare lunara (pentru MRR). */
function monthly(price: number | null, cycle: string): number {
  if (price == null) return 0;
  if (cycle === 'trimestrial') return price / 3;
  if (cycle === 'anual') return price / 12;
  return price; // lunar
}

function addCycle(dateStr: string, cycle: string): string {
  const d = new Date(dateStr);
  if (cycle === 'trimestrial') d.setMonth(d.getMonth() + 3);
  else if (cycle === 'anual') d.setFullYear(d.getFullYear() + 1);
  else d.setMonth(d.getMonth() + 1);
  return d.toISOString().slice(0, 10);
}

/** GET /api/admin/abonamente — lista + agregate MRR / active / reinnoiri 30 zile. */
export async function GET(req: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const isAgent = auth.user.role === 'agent';

  const sp = new URL(req.url).searchParams;
  const page = Math.max(1, parseInt(sp.get('page') ?? '1', 10) || 1);
  const perPage = Math.min(100, Math.max(1, parseInt(sp.get('perPage') ?? '30', 10) || 30));

  let query = supabaseAdmin
    .from('crm_subscriptions')
    .select('*, client:crm_clients!inner(id, name, assigned_to)', { count: 'exact' });
  if (isAgent) query = query.eq('client.assigned_to', auth.user.id);

  const status = sp.get('status');
  if (status && STATUSES.includes(status)) query = query.eq('status', status);
  const cycle = sp.get('cycle');
  if (cycle) query = query.eq('billing_cycle', cycle);
  const clientId = sp.get('client_id');
  if (clientId) query = query.eq('client_id', clientId);
  const raw = (sp.get('q') ?? '').trim().slice(0, 100).replace(/[,()%*\\"]/g, ' ').trim();
  if (raw) query = query.ilike('name', `%${raw}%`);

  const from = (page - 1) * perPage;
  const { data, error, count } = await query.order('created_at', { ascending: false }).range(from, from + perPage - 1);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Agregate peste abonamentele active (in scope).
  let aggQuery = supabaseAdmin
    .from('crm_subscriptions')
    .select('price, billing_cycle, next_renewal_date, client:crm_clients!inner(assigned_to)')
    .eq('status', 'activ');
  if (isAgent) aggQuery = aggQuery.eq('client.assigned_to', auth.user.id);
  const { data: active } = await aggQuery;

  const now = new Date();
  const in30 = new Date(now.getTime() + 30 * 86_400_000);
  let mrr = 0;
  let renewals30 = 0;
  (active ?? []).forEach((s) => {
    mrr += monthly(s.price, s.billing_cycle);
    if (s.next_renewal_date) {
      const d = new Date(s.next_renewal_date);
      if (d >= now && d <= in30) renewals30++;
    }
  });

  return NextResponse.json({
    items: data ?? [],
    total: count ?? 0,
    page,
    perPage,
    mrr: Math.round(mrr * 100) / 100,
    activeCount: active?.length ?? 0,
    renewals30,
  });
}

/** POST /api/admin/abonamente — creare abonament. */
export async function POST(req: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Date invalide' }, { status: 400 }); }
  const parsed = subscriptionSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Date invalide' }, { status: 400 });

  const guard = await guardClient(parsed.data.client_id, auth.user);
  if (guard.error) return guard.error;

  // Calculeaza automat urmatoarea reinnoire daca lipseste.
  const next_renewal_date = parsed.data.next_renewal_date
    ?? (parsed.data.start_date ? addCycle(parsed.data.start_date, parsed.data.billing_cycle) : null);

  const { data, error } = await supabaseAdmin
    .from('crm_subscriptions')
    .insert({ ...parsed.data, next_renewal_date })
    .select('*, client:crm_clients(id, name)')
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await supabaseAdmin.from('crm_activities').insert({
    type: 'system', title: `Abonament adaugat: ${parsed.data.name}`, client_id: parsed.data.client_id, created_by: auth.user.id,
  });

  return NextResponse.json({ subscription: data }, { status: 201 });
}
