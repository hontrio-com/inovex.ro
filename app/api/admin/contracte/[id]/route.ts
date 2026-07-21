import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase';
import { requireRole } from '@/lib/auth';
import { canAccessAssigned, isPrivileged } from '@/lib/crm/access';

const patchSchema = z.object({
  title: z.string().trim().max(200).nullable().optional(),
  content: z.string().trim().min(1, 'Continut gol').optional(),
  value: z.preprocess(
    (v) => (v === '' || v == null ? null : typeof v === 'string' ? Number(v) : v),
    z.number().nonnegative('Valoare invalida').nullable(),
  ).optional(),
});

const BUCKET = 'crm-files';

/** GET /api/admin/contracte/[id] — contract + URL semnat pt PDF (daca exista). */
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireRole(['owner', 'admin']);
  if (auth.error) return auth.error;
  const { id } = await params;

  const { data: contract } = await supabaseAdmin
    .from('crm_contracts')
    .select('*, client:crm_clients(id, name, email), signatures:crm_contract_signatures(signer_name, signer_email, signed_at, ip_address)')
    .eq('id', id).single();
  if (!contract) return NextResponse.json({ error: 'Contract inexistent' }, { status: 404 });
  if (!canAccessAssigned(auth.user, contract.assigned_to)) return NextResponse.json({ error: 'Acces interzis' }, { status: 403 });

  let pdfSigned: string | null = null;
  if (contract.signed_pdf_url) {
    const { data: s } = await supabaseAdmin.storage.from(BUCKET).createSignedUrl(contract.signed_pdf_url, 3600);
    pdfSigned = s?.signedUrl ?? null;
  }
  return NextResponse.json({ contract, signed_pdf_signed_url: pdfSigned });
}

/** PATCH /api/admin/contracte/[id] — editare continut/titlu/valoare. Doar cat e in draft. */
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireRole(['owner', 'admin']);
  if (auth.error) return auth.error;
  const { id } = await params;

  const { data: contract } = await supabaseAdmin
    .from('crm_contracts').select('status, assigned_to, client_id').eq('id', id).single();
  if (!contract) return NextResponse.json({ error: 'Contract inexistent' }, { status: 404 });
  if (!canAccessAssigned(auth.user, contract.assigned_to)) return NextResponse.json({ error: 'Acces interzis' }, { status: 403 });
  if (contract.status !== 'draft') {
    return NextResponse.json({ error: 'Contractul poate fi editat doar cat e in draft (inainte de trimitere).' }, { status: 400 });
  }

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Date invalide' }, { status: 400 }); }
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Date invalide' }, { status: 400 });

  const update: Record<string, unknown> = {};
  if (parsed.data.title !== undefined) update.title = parsed.data.title;
  if (parsed.data.content !== undefined) update.content = parsed.data.content;
  if (parsed.data.value !== undefined) update.value = parsed.data.value;

  const { data, error } = await supabaseAdmin
    .from('crm_contracts').update(update).eq('id', id)
    .select('*, client:crm_clients(id, name, email), signatures:crm_contract_signatures(signer_name, signer_email, signed_at, ip_address)')
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await supabaseAdmin.from('crm_activities').insert({
    type: 'system', title: 'Contract editat', contract_id: id, client_id: contract.client_id, created_by: auth.user.id,
  });

  return NextResponse.json({ contract: data });
}

/** DELETE /api/admin/contracte/[id] — doar owner/admin. Curata PDF-ul din storage. */
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireRole(['owner', 'admin']);
  if (auth.error) return auth.error;
  const { id } = await params;

  if (!isPrivileged(auth.user)) return NextResponse.json({ error: 'Doar owner/admin pot sterge contracte' }, { status: 403 });

  const { data: contract } = await supabaseAdmin.from('crm_contracts').select('signed_pdf_url').eq('id', id).single();
  if (contract?.signed_pdf_url) await supabaseAdmin.storage.from(BUCKET).remove([contract.signed_pdf_url]);

  const { error } = await supabaseAdmin.from('crm_contracts').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
