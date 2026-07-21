import { notFound } from 'next/navigation';
import { requireStaffPage } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';
import { ContractDetail } from './ContractDetail';

export const metadata = { title: 'Contract | Admin Inovex', robots: 'noindex,nofollow' };

export default async function ContractDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireStaffPage();

  const { id } = await params;
  const { data: contract } = await supabaseAdmin
    .from('crm_contracts')
    .select('*, client:crm_clients(id, name, email), signatures:crm_contract_signatures(signer_name, signer_email, signed_at, ip_address)')
    .eq('id', id).single();
  if (!contract) notFound();

  let pdfUrl: string | null = null;
  if (contract.signed_pdf_url) {
    const { data: s } = await supabaseAdmin.storage.from('crm-files').createSignedUrl(contract.signed_pdf_url, 3600);
    pdfUrl = s?.signedUrl ?? null;
  }

  // Statistici deschideri link
  const { data: viewRows } = await supabaseAdmin
    .from('crm_contract_views').select('viewed_at').eq('contract_id', id).order('viewed_at', { ascending: true });
  const views = {
    count: viewRows?.length ?? 0,
    first: viewRows?.[0]?.viewed_at ?? null,
    last: viewRows && viewRows.length > 0 ? viewRows[viewRows.length - 1].viewed_at : null,
  };

  return <ContractDetail initialContract={contract} pdfUrl={pdfUrl} canDelete views={views} />;
}
