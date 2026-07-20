import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireAuth } from '@/lib/auth';
import { canAccessAssigned, isPrivileged } from '@/lib/crm/access';

const BUCKET = 'crm-files';

/** GET /api/admin/contracte/[id] — contract + URL semnat pt PDF (daca exista). */
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth();
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

/** DELETE /api/admin/contracte/[id] — doar owner/admin. Curata PDF-ul din storage. */
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const { id } = await params;

  if (!isPrivileged(auth.user)) return NextResponse.json({ error: 'Doar owner/admin pot sterge contracte' }, { status: 403 });

  const { data: contract } = await supabaseAdmin.from('crm_contracts').select('signed_pdf_url').eq('id', id).single();
  if (contract?.signed_pdf_url) await supabaseAdmin.storage.from(BUCKET).remove([contract.signed_pdf_url]);

  const { error } = await supabaseAdmin.from('crm_contracts').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
