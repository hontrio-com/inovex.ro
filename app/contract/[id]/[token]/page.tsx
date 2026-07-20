import type { Metadata } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import { SignClient } from './SignClient';

export const metadata: Metadata = { title: 'Semnare contract | Inovex', robots: { index: false, follow: false } };

function FullPageMessage({ title, text, tone = 'neutral' }: { title: string; text: string; tone?: 'neutral' | 'error' | 'success' }) {
  const color = tone === 'error' ? '#DC2626' : tone === 'success' ? '#15803D' : '#0F172A';
  return (
    <div style={{ minHeight: '100vh', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 16, padding: '40px 32px', maxWidth: 440, textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.3rem', color, marginBottom: 10 }}>{title}</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#64748B', lineHeight: 1.6 }}>{text}</p>
      </div>
    </div>
  );
}

export default async function SignPage({ params }: { params: Promise<{ id: string; token: string }> }) {
  const { id, token } = await params;

  const { data: c } = await supabaseAdmin
    .from('crm_contracts')
    .select('id, contract_number, title, content, status, sign_token, expires_at')
    .eq('id', id)
    .single();

  if (!c || !c.sign_token || c.sign_token !== token) {
    return <FullPageMessage title="Link invalid" text="Linkul de semnare nu este valid. Verifica emailul primit sau contacteaza-ne." tone="error" />;
  }
  if (c.status === 'semnat') {
    return <FullPageMessage title="Contract deja semnat" text="Acest contract a fost deja semnat. Multumim!" tone="success" />;
  }
  if (c.status === 'anulat' || (c.expires_at && new Date(c.expires_at) < new Date())) {
    return <FullPageMessage title="Link expirat" text="Perioada de semnare a expirat. Contacteaza-ne pentru un link nou." tone="error" />;
  }

  return (
    <SignClient
      id={id}
      token={token}
      contractNumber={c.contract_number}
      title={c.title}
      content={c.content}
    />
  );
}
