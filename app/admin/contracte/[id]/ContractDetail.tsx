'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ArrowLeft, Send, Download, Trash2, Copy, RefreshCw, CheckCircle2, Pencil, Check, Link2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CONTRACT_STATUS } from '../ContracteList';
import { RichEditor } from '../sabloane/RichEditor';

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

const fld: React.CSSProperties = { width: '100%', height: 40, border: '1px solid #E2E8F0', borderRadius: 8, padding: '0 12px', fontFamily: 'var(--font-body)', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' };
const lbl: React.CSSProperties = { display: 'block', marginBottom: 6, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.8rem', color: '#374151' };

export function ContractDetail({ initialContract, pdfUrl, canDelete, views }: {
  initialContract: Contract; pdfUrl: string | null; canDelete: boolean;
  views?: { count: number; first: string | null; last: string | null };
}) {
  const router = useRouter();
  const [contract, setContract] = useState<Contract>(initialContract);
  const [busy, setBusy] = useState(false);
  const [showSend, setShowSend] = useState(false);
  const [email, setEmail] = useState(initialContract.client?.email ?? '');

  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState(initialContract.content);
  const [editTitle, setEditTitle] = useState(initialContract.title ?? '');
  const [editValue, setEditValue] = useState(initialContract.value != null ? String(initialContract.value) : '');
  const [savingEdit, setSavingEdit] = useState(false);

  const st = CONTRACT_STATUS[contract.status] ?? CONTRACT_STATUS.draft;
  const publicLink = contract.sign_token ? `${typeof window !== 'undefined' ? window.location.origin : ''}/contract/${contract.sign_token}` : '';

  async function send(withEmail: boolean) {
    if (withEmail && (!email || !email.includes('@'))) { toast.error('Email destinatar invalid'); return; }
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/contracte/${contract.id}/send`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: withEmail ? email : '' }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setContract((c) => ({ ...c, ...json.contract }));
      setShowSend(false);
      toast.success(withEmail ? 'Link generat si trimis pe email' : 'Link de semnare generat');
    } catch (e) { toast.error(e instanceof Error ? e.message : 'Eroare'); }
    finally { setBusy(false); }
  }

  async function saveEdit() {
    setSavingEdit(true);
    try {
      const res = await fetch(`/api/admin/contracte/${contract.id}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content: editContent, title: editTitle, value: editValue }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setContract(json.contract);
      setEditing(false);
      toast.success('Contract salvat');
    } catch (e) { toast.error(e instanceof Error ? e.message : 'Eroare la salvare'); }
    finally { setSavingEdit(false); }
  }

  function startEdit() {
    setEditContent(contract.content); setEditTitle(contract.title ?? '');
    setEditValue(contract.value != null ? String(contract.value) : ''); setEditing(true);
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
    <div style={{ padding: '24px 32px' }}>
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
        {!editing && (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {contract.status === 'draft' && (
              <Button variant="outline" onClick={startEdit} leftIcon={<Pencil size={15} />}>Editeaza</Button>
            )}
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
        )}
      </div>

      {/* Link de semnare (dupa trimitere) */}
      {contract.status === 'trimis' && !editing && (
        <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 12, padding: 16, marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#1D4ED8', fontWeight: 600, marginBottom: 8 }}>
            <Link2 size={15} /> Link de semnare (permanent) — trimite-l clientului
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <input readOnly value={publicLink} onFocus={(e) => e.target.select()} style={{ flex: 1, minWidth: 220, height: 36, border: '1px solid #BFDBFE', borderRadius: 7, padding: '0 10px', fontFamily: 'monospace', fontSize: '0.78rem', color: '#334155', background: '#fff' }} />
            <Button variant="outline" size="sm" onClick={copyLink} leftIcon={<Copy size={13} />}>Copiaza link</Button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10, fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#64748B' }}>
            <Eye size={14} /> {views && views.count > 0 ? `Deschis de ${views.count} ${views.count === 1 ? 'data' : 'ori'}${views.last ? ` · ultima data ${fmtDateTime(views.last)}` : ''}` : 'Nedeschis inca de client'}
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

      {/* Continut contract — editare sau afisare */}
      {editing ? (
        <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 14, padding: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14, marginBottom: 16 }}>
            <div><label style={lbl}>Titlu</label><input style={fld} value={editTitle} onChange={(e) => setEditTitle(e.target.value)} placeholder="Titlu contract" /></div>
            <div><label style={lbl}>Valoare (RON)</label><input style={fld} type="number" min="0" value={editValue} onChange={(e) => setEditValue(e.target.value)} /></div>
          </div>
          <label style={lbl}>Continut contract</label>
          <RichEditor value={editContent} onChange={setEditContent} />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 16 }}>
            <Button variant="outline" onClick={() => setEditing(false)}>Anuleaza</Button>
            <Button onClick={saveEdit} loading={savingEdit} leftIcon={<Check size={15} />}>Salveaza modificarile</Button>
          </div>
        </div>
      ) : (
        <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 14, padding: '40px 48px' }}>
          <div className="contract-body" style={{ fontFamily: 'Georgia, serif', fontSize: '0.9rem', color: '#1e293b', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: contract.content }} />
        </div>
      )}

      {showSend && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.45)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }} onClick={() => !busy && setShowSend(false)}>
          <div style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 460, padding: 26 }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.05rem', color: '#0F172A', marginBottom: 6 }}>Trimite spre semnare</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#64748B', marginBottom: 16 }}>Se genereaza un link de semnare. Optional, il trimitem si pe email clientului.</p>
            <label style={{ display: 'block', marginBottom: 6, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.8rem', color: '#374151' }}>Email client (optional)</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="client@firma.ro" style={{ ...fld, marginBottom: 20 }} />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, flexWrap: 'wrap' }}>
              <Button variant="outline" onClick={() => send(false)} loading={busy} leftIcon={<Link2 size={14} />}>Doar genereaza link</Button>
              <Button onClick={() => send(true)} loading={busy} leftIcon={<Send size={14} />}>Trimite pe email</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
