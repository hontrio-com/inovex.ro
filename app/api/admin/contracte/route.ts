import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireAuth } from '@/lib/auth';
import { canAccessClient } from '@/lib/crm/access';
import { contractCreateSchema } from '@/lib/crm/schemas';
import { buildContractValues, fillVariables } from '@/lib/crm/contract-vars';
import type { CrmClient } from '@/types/crm';

const STATUSES = ['draft', 'trimis', 'semnat', 'expirat', 'anulat'];

/** GET /api/admin/contracte — lista contractelor (scoping rol + filtre). */
export async function GET(req: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  const sp = new URL(req.url).searchParams;
  const page = Math.max(1, parseInt(sp.get('page') ?? '1', 10) || 1);
  const perPage = Math.min(100, Math.max(1, parseInt(sp.get('perPage') ?? '30', 10) || 30));

  let query = supabaseAdmin
    .from('crm_contracts')
    .select('*, client:crm_clients(id, name)', { count: 'exact' });

  if (auth.user.role === 'agent') query = query.eq('assigned_to', auth.user.id);

  const status = sp.get('status');
  if (status && STATUSES.includes(status)) query = query.eq('status', status);

  const raw = (sp.get('q') ?? '').trim().slice(0, 100).replace(/[,()%*\\"]/g, ' ').trim();
  if (raw) query = query.or(`contract_number.ilike.%${raw}%,title.ilike.%${raw}%`);

  const from = (page - 1) * perPage;
  const { data, error, count } = await query.order('created_at', { ascending: false }).range(from, from + perPage - 1);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ items: data ?? [], total: count ?? 0, page, perPage });
}

/** POST /api/admin/contracte — genereaza un contract din client + sablon. */
export async function POST(req: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Date invalide' }, { status: 400 }); }
  const parsed = contractCreateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Date invalide' }, { status: 400 });

  const { data: client } = await supabaseAdmin.from('crm_clients').select('*').eq('id', parsed.data.client_id).single();
  if (!client) return NextResponse.json({ error: 'Client inexistent' }, { status: 404 });
  if (!canAccessClient(auth.user, client.assigned_to)) return NextResponse.json({ error: 'Acces interzis' }, { status: 403 });

  const { data: template } = await supabaseAdmin.from('crm_contract_templates').select('content').eq('id', parsed.data.template_id).single();
  if (!template) return NextResponse.json({ error: 'Sablon inexistent' }, { status: 404 });

  const { data: org } = await supabaseAdmin.from('crm_org_settings').select('*').eq('id', 1).single();

  // Numar atomic INV-YYYY-NNNN
  const { data: numberData, error: numErr } = await supabaseAdmin.rpc('next_contract_number');
  if (numErr || !numberData) return NextResponse.json({ error: numErr?.message ?? 'Eroare la numerotare' }, { status: 500 });
  const contractNumber = numberData as string;

  const values = buildContractValues(client as CrmClient, org ?? {}, {
    number: contractNumber,
    title: parsed.data.title,
    value: parsed.data.value,
    currency: parsed.data.currency,
    date: new Date().toLocaleDateString('ro-RO'),
  });
  const content = fillVariables(template.content, values);

  const { data: contract, error } = await supabaseAdmin
    .from('crm_contracts')
    .insert({
      client_id: client.id,
      template_id: parsed.data.template_id,
      contract_number: contractNumber,
      title: parsed.data.title,
      content,
      value: parsed.data.value,
      currency: parsed.data.currency,
      status: 'draft',
      assigned_to: client.assigned_to,
      created_by: auth.user.id,
    })
    .select('*')
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await supabaseAdmin.from('crm_activities').insert({
    type: 'system', title: `Contract generat: ${contractNumber}`, client_id: client.id, contract_id: contract.id, created_by: auth.user.id,
  });

  return NextResponse.json({ contract }, { status: 201 });
}
