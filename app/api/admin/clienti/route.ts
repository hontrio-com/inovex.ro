import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireRole } from '@/lib/auth';
import { clientSchema } from '@/lib/crm/schemas';

const SORTABLE = ['created_at', 'updated_at', 'name', 'status'] as const;
const STATUSES = ['activ', 'inactiv', 'prospect'];

/** GET /api/admin/clienti — lista cu cautare, filtre, sortare si paginare server-side. */
export async function GET(req: NextRequest) {
  const auth = await requireRole(['owner', 'admin']);
  if (auth.error) return auth.error;
  const { user } = auth;

  const sp = new URL(req.url).searchParams;
  const page = Math.max(1, parseInt(sp.get('page') ?? '1', 10) || 1);
  const perPage = Math.min(100, Math.max(1, parseInt(sp.get('perPage') ?? '20', 10) || 20));
  const sort = (SORTABLE as readonly string[]).includes(sp.get('sort') ?? '')
    ? (sp.get('sort') as string)
    : 'created_at';
  const ascending = (sp.get('order') ?? 'desc') === 'asc';

  let query = supabaseAdmin
    .from('crm_clients')
    .select('*', { count: 'exact' });

  // Scoping rol: agentul vede doar clientii alocati lui.
  if (user.role === 'agent') {
    query = query.eq('assigned_to', user.id);
  } else {
    // Filtru alocare (doar pentru owner/admin)
    const assigned = sp.get('assigned');
    if (assigned === 'unassigned') query = query.is('assigned_to', null);
    else if (assigned) query = query.eq('assigned_to', assigned);
  }

  // Filtru status
  const status = sp.get('status');
  if (status && STATUSES.includes(status)) query = query.eq('status', status);

  // Filtru sursa
  const source = sp.get('source');
  if (source) query = query.eq('source', source);

  // Cautare (nume, CUI, email, telefon, persoana de contact) — sanitizat pt. PostgREST or().
  const raw = (sp.get('q') ?? '').trim().slice(0, 100);
  const q = raw.replace(/[,()%*\\"]/g, ' ').trim();
  if (q) {
    query = query.or(
      `name.ilike.%${q}%,cui.ilike.%${q}%,email.ilike.%${q}%,phone.ilike.%${q}%,contact_person.ilike.%${q}%`,
    );
  }

  const from = (page - 1) * perPage;
  query = query.order(sort, { ascending }).range(from, from + perPage - 1);

  const { data, error, count } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ items: data ?? [], total: count ?? 0, page, perPage });
}

/** POST /api/admin/clienti — creare client. */
export async function POST(req: NextRequest) {
  const auth = await requireRole(['owner', 'admin']);
  if (auth.error) return auth.error;
  const { user } = auth;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Date invalide' }, { status: 400 });
  }

  const parsed = clientSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Date invalide' }, { status: 400 });
  }

  // Agentul isi aloca siesi clientul; owner/admin folosesc valoarea din formular.
  const assigned_to = user.role === 'agent' ? user.id : parsed.data.assigned_to;

  const { data, error } = await supabaseAdmin
    .from('crm_clients')
    .insert({ ...parsed.data, assigned_to, created_by: user.id })
    .select('*')
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Log activitate (timeline)
  await supabaseAdmin.from('crm_activities').insert({
    type: 'system',
    title: 'Client creat',
    client_id: data.id,
    created_by: user.id,
  });

  return NextResponse.json({ client: data }, { status: 201 });
}
