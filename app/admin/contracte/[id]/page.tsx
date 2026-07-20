import { redirect, notFound } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';
import { canAccessAssigned } from '@/lib/crm/access';
import { ContractDetail } from './ContractDetail';

export const metadata = { title: 'Contract | Admin Inovex', robots: 'noindex,nofollow' };

export default async function ContractDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getSessionUser();
  if (!user) redirect('/admin/login');

  const { id } = await params;
  const { data: contract } = await supabaseAdmin
    .from('crm_contracts')
    .select('*, client:crm_clients(id, name, email), signatures:crm_contract_signatures(signer_name, signer_email, signed_at, ip_address)')
    .eq('id', id).single();
  if (!contract) notFound();

  if (!canAccessAssigned(user, contract.assigned_to)) {
    return (
      <div style={{ padding: '48px 32px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.35rem', color: '#0F172A' }}>Acces restrictionat</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#64748B' }}>Acest contract nu iti este alocat.</p>
      </div>
    );
  }

  let pdfUrl: string | null = null;
  if (contract.signed_pdf_url) {
    const { data: s } = await supabaseAdmin.storage.from('crm-files').createSignedUrl(contract.signed_pdf_url, 3600);
    pdfUrl = s?.signedUrl ?? null;
  }

  const privileged = user.role === 'owner' || user.role === 'admin';
  return <ContractDetail initialContract={contract} pdfUrl={pdfUrl} canDelete={privileged} />;
}
