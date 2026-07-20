'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ArrowLeft, Send, Download, Trash2, Copy, RefreshCw, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CONTRACT_STATUS } from '../ContracteList';

interface Signature { signer_name: string; signer_email: string | null; signed_at: string; ip_address: string | null; }
interface Contract {
  id: string; contract_number: string | null; title: string | null; content: string; status: string;
  value: number | null; currency: string | null; sign_token: string | null; sent_at: string | null;
  expires_at: string | null; signed_at: string | null; signed_pdf_url: string | null;
  client?: { id: string; name: string; email: string | null } | null;
  signatures?: Signature[];
}

function fmtMoney(v: number | null, cur: string | null) { if (v == null) return null; try { return new Intl.NumberFormat('ro-RO', { style: 'currency', currency: cur || 'RON' }).format(v); } catch { return `${v} RON`; } }
function fmtDateTime(iso: string | null) { return iso ? new Date(iso).toLocaleString('ro-RO', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''; }
function fmtDate(iso: string | null) { return iso ? new Date(iso).toLocaleDateString('ro-RO', { day: '2-digit', month: 'short', year: 'numeric' }) : ''; }

export function ContractDetail({ initialContract, pdfUrl, canDelete }: {
  initialContract: Contract; pdfUrl: string | null; canDelete: boolean;
}) {
  const router = useRouter();
  const [contract, setContract] = useState<Contract>(initialContract);
  const [busy, setBusy] = useState(false);
  const [showSend, setShowSend] = useState(false);
  const [email, setEmail] = useState(initialContract.client?.email ?? '');

  const st = CONTRACT_STATUS[contract.status] ?? CONTRACT_STATUS.draft;
  const publicLink = contract.sign_token ? `${typeof window !== 'undefined' ? window.location.origin : ''}/contract/${contract.id}/${contract.sign_token}` : '';

  async function send() {
    if (!email || !email.includes('@')) { toast.error('Email destinatar invalid'); return; }
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/contracte/${contract.id}/send`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setContract((c) => ({ ...c, ...json.contract }));
      setShowSend(false);
      toast.success('Contract trimis spre semnare');
    } catch (e) { toast.error(e instanceof Error ? e.message : 'Eroare la trimitere'); }
    finally { setBusy(false); }
  }

  async function remove() {
    if (!confirm('Stergi contractul? Actiune ireversibila.')) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/contracte/${contract.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error((await res.json()).error);
      toast.success('Contract sters');
      router.push('/admin/contracte');
    } catch (e) { toast.error(e instanceof Error ? e.message : 'Eroare'); setBusy(false); }
  }

  function copyLink() { navigator.clipboard.writeText(publicLink).then(() => toast.success('Link copiat')); }

  return (
    <div style={{ padding: '24px 32px', maxWidth: 900 }}>
      <Link href="/admin/contracte" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#64748B', textDecoration: 'none', marginBottom: 14 }}><ArrowLeft size={15} /> Inapoi la contracte</Link>

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 18, flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.4rem', color: '#0F172A', marginBottom: 6 }}>{contract.contract_number || 'Contract'}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span style={{ padding: '2px 10px', borderRadius: 999, fontSize: '0.72rem', fontWeight: 600, background: st.bg, color: st.fg, border: `1px solid ${st.bd}`, fontFamily: 'var(--font-body)' }}>{st.label}</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#64748B' }}>
              {contract.client && <Link href={`/admin/clienti/${contract.client.id}`} style={{ color: '#2B8FCC', textDecoration: 'none' }}>{contract.client.name}</Link>}
              {contract.title ? ` · ${contract.title}` : ''}{fmtMoney(contract.value, contract.currency) ? ` · ${fmtMoney(contract.value, contract.currency)}` : ''}
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {(contract.status === 'draft' || contract.status === 'trimis') && (
            <Button disabled={busy} onClick={() => setShowSend(true)} leftIcon={contract.status === 'trimis' ? <RefreshCw size={15} /> : <Send size={15} />}>
              {contract.status === 'trimis' ? 'Retrimite' : 'Trimite spre semnare'}
            </Button>
          )}
          {contract.status === 'semnat' && pdfUrl && (
            <Button href={pdfUrl} leftIcon={<Download size={15} />}>Descarca PDF</Button>
          )}
          {canDelete && <Button variant="ghost" size="icon" disabled={busy} onClick={remove} className="text-red-400 hover:text-red-600 hover:bg-red-50"><Trash2 size={16} /></Button>}
        </div>
      </div>

      {/* Info status */}
      {contract.status === 'trimis' && (
        <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 12, padding: 16, marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#1D4ED8', fontWeight: 600, marginBottom: 8 }}>
            <Clock size={15} /> Trimis {fmtDateTime(contract.sent_at)}{contract.expires_at ? ` · expira ${fmtDate(contract.expires_at)}` : ''}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <input readOnly value={publicLink} style={{ flex: 1, minWidth: 200, height: 34, border: '1px solid #BFDBFE', borderRadius: 7, padding: '0 10px', fontFamily: 'monospace', fontSize: '0.72rem', color: '#475569', background: '#fff' }} />
            <Button variant="outline" size="sm" onClick={copyLink} leftIcon={<Copy size={13} />}>Copiaza link</Button>
          </div>
        </div>
      )}
      {contract.status === 'semnat' && contract.signatures && contract.signatures[0] && (
        <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 12, padding: 16, marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#15803D', fontWeight: 600 }}>
            <CheckCircle2 size={16} /> Semnat de {contract.signatures[0].signer_name} · {fmtDateTime(contract.signatures[0].signed_at)}
          </div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#64748B', marginTop: 4 }}>
            {contract.signatures[0].signer_email}{contract.signatures[0].ip_address ? ` · IP ${contract.signatures[0].ip_address}` : ''}
          </div>
        </div>
      )}

      {/* Continut contract */}
      <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 14, padding: '40px 48px' }}>
        <div className="contract-body" style={{ fontFamily: 'Georgia, serif', fontSize: '0.9rem', color: '#1e293b', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: contract.content }} />
      </div>

      {showSend && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.45)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }} onClick={() => !busy && setShowSend(false)}>
          <div style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 440, padding: 26 }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.05rem', color: '#0F172A', marginBottom: 6 }}>Trimite spre semnare</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#64748B', marginBottom: 16 }}>Clientul primeste un email cu linkul de semnare.</p>
            <label style={{ display: 'block', marginBottom: 6, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.8rem', color: '#374151' }}>Email destinatar</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="client@firma.ro" style={{ width: '100%', height: 40, border: '1px solid #E2E8F0', borderRadius: 8, padding: '0 12px', fontFamily: 'var(--font-body)', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box', marginBottom: 20 }} />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <Button variant="outline" onClick={() => setShowSend(false)}>Anuleaza</Button>
              <Button onClick={send} loading={busy} leftIcon={<Send size={14} />}>Trimite</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
