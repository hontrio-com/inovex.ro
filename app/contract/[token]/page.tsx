import type { Metadata } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import { SignClient } from './SignClient';

export const metadata: Metadata = { title: 'Semnare contract | Inovex', robots: { index: false, follow: false } };

const LOGO = '/imagini/logo_negru.png';

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 16, padding: '40px 32px', maxWidth: 460, textAlign: 'center' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LOGO} alt="Inovex" style={{ height: 34, objectFit: 'contain', marginBottom: 20 }} />
        {children}
      </div>
    </div>
  );
}

function Message({ title, text, tone = 'neutral' }: { title: string; text: string; tone?: 'neutral' | 'error' | 'success' }) {
  const color = tone === 'error' ? '#DC2626' : tone === 'success' ? '#15803D' : '#0F172A';
  return (
    <Shell>
      <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.3rem', color, marginBottom: 10 }}>{title}</h1>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#64748B', lineHeight: 1.6 }}>{text}</p>
    </Shell>
  );
}

export default async function SignPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  const { data: c } = await supabaseAdmin
    .from('crm_contracts')
    .select('id, contract_number, title, content, status, client_id, signed_pdf_url')
    .eq('sign_token', token)
    .single();

  if (!c) return <Message title="Link invalid" text="Linkul de semnare nu este valid. Verifica adresa sau contacteaza-ne." tone="error" />;

  if (c.status === 'semnat') {
    let pdfUrl: string | null = null;
    if (c.signed_pdf_url) {
      const { data: s } = await supabaseAdmin.storage.from('crm-files').createSignedUrl(c.signed_pdf_url, 3600);
      pdfUrl = s?.signedUrl ?? null;
    }
    return (
      <Shell>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.3rem', color: '#15803D', marginBottom: 10 }}>Contract semnat ✓</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#64748B', lineHeight: 1.6, marginBottom: 20 }}>
          Acest contract{c.contract_number ? ` (${c.contract_number})` : ''} a fost semnat. Poti descarca o copie PDF.
        </p>
        {pdfUrl && (
          <a href={pdfUrl} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, height: 46, padding: '0 22px', borderRadius: 10, background: '#2B8FCC', color: '#fff', textDecoration: 'none', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.95rem' }}>
            Descarca PDF
          </a>
        )}
      </Shell>
    );
  }

  if (c.status === 'anulat') return <Message title="Contract anulat" text="Acest contract a fost anulat. Contacteaza-ne pentru detalii." tone="error" />;
  if (c.status === 'draft') return <Message title="In pregatire" text="Contractul nu este inca disponibil pentru semnare. Vei fi anuntat cand e gata." />;

  let clientName = '';
  if (c.client_id) {
    const { data: cl } = await supabaseAdmin.from('crm_clients').select('name').eq('id', c.client_id).single();
    clientName = cl?.name ?? '';
  }

  return <SignClient token={token} contractNumber={c.contract_number} title={c.title} content={c.content} clientName={clientName} logo={LOGO} />;
}
