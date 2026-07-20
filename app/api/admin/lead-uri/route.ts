import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireAuth } from '@/lib/auth';
import { leadSchema } from '@/lib/crm/schemas';

const BOARD_LIMIT = 300;

/** GET /api/admin/lead-uri — board (toate, plafonat) sau lista paginata, cu filtre + scoping rol. */
export async function GET(req: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const { user } = auth;

  const sp = new URL(req.url).searchParams;
  const board = sp.get('board') === '1';

  let query = supabaseAdmin.from('crm_leads').select('*', { count: 'exact' });

  // Scoping rol
  if (user.role === 'agent') {
    query = query.eq('assigned_to', user.id);
  } else {
    const assigned = sp.get('assigned');
    if (assigned === 'unassigned') query = query.is('assigned_to', null);
    else if (assigned) query = query.eq('assigned_to', assigned);
  }

  // Filtre
  const platform = sp.get('platform');
  if (platform) query = query.eq('platform', platform);
  const source = sp.get('source');
  if (source) query = query.eq('source', source);
  const status = sp.get('status');
  if (status) query = query.eq('status', status);
  const from = sp.get('from');
  if (from) query = query.gte('created_at', from);
  const to = sp.get('to');
  if (to) query = query.lte('created_at', `${to}T23:59:59`);

  // Cautare (nume, companie, email, campanie) — sanitizat pt PostgREST or().
  const raw = (sp.get('q') ?? '').trim().slice(0, 100);
  const q = raw.replace(/[,()%*\\"]/g, ' ').trim();
  if (q) {
    query = query.or(`name.ilike.%${q}%,company.ilike.%${q}%,email.ilike.%${q}%,campaign.ilike.%${q}%`);
  }

  query = query.order('created_at', { ascending: false });

  if (board) {
    const { data, error } = await query.limit(BOARD_LIMIT);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ items: data ?? [] });
  }

  const page = Math.max(1, parseInt(sp.get('page') ?? '1', 10) || 1);
  const perPage = Math.min(100, Math.max(1, parseInt(sp.get('perPage') ?? '30', 10) || 30));
  const fromIdx = (page - 1) * perPage;
  const { data, error, count } = await query.range(fromIdx, fromIdx + perPage - 1);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ items: data ?? [], total: count ?? 0, page, perPage });
}

/** POST /api/admin/lead-uri — creare lead. */
export async function POST(req: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const { user } = auth;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Date invalide' }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Date invalide' }, { status: 400 });
  }

  const assigned_to = user.role === 'agent' ? user.id : parsed.data.assigned_to;

  const { data, error } = await supabaseAdmin
    .from('crm_leads')
    .insert({ ...parsed.data, assigned_to, created_by: user.id })
    .select('*')
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await supabaseAdmin.from('crm_activities').insert({
    type: 'system',
    title: 'Lead creat',
    lead_id: data.id,
    created_by: user.id,
  });

  return NextResponse.json({ lead: data }, { status: 201 });
}
