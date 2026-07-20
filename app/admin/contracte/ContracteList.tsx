'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { FileSignature, Plus, Search, Loader2, Settings, LayoutTemplate, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ContractRow {
  id: string; contract_number: string | null; title: string | null; status: string;
  value: number | null; currency: string | null; created_at: string;
  client?: { id: string; name: string } | null;
}

export const CONTRACT_STATUS: Record<string, { label: string; fg: string; bg: string; bd: string }> = {
  draft:   { label: 'Draft',   fg: '#64748B', bg: '#F8FAFC', bd: '#E2E8F0' },
  trimis:  { label: 'Trimis',  fg: '#1D4ED8', bg: '#EFF6FF', bd: '#BFDBFE' },
  semnat:  { label: 'Semnat',  fg: '#15803D', bg: '#F0FDF4', bd: '#BBF7D0' },
  expirat: { label: 'Expirat', fg: '#B45309', bg: '#FFFBEB', bd: '#FDE68A' },
  anulat:  { label: 'Anulat',  fg: '#DC2626', bg: '#FEF2F2', bd: '#FECACA' },
};

const ctrl: React.CSSProperties = { height: 38, border: '1px solid #E2E8F0', borderRadius: 8, padding: '0 12px', fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#0F172A', background: '#fff', outline: 'none' };
const PER_PAGE = 30;

function fmtMoney(v: number | null, cur: string | null) { if (v == null) return '—'; try { return new Intl.NumberFormat('ro-RO', { style: 'currency', currency: cur || 'RON', maximumFractionDigits: 0 }).format(v); } catch { return `${v} RON`; } }
function fmtDate(iso: string) { return new Date(iso).toLocaleDateString('ro-RO', { day: '2-digit', month: 'short', year: 'numeric' }); }

export function ContracteList({ canManageConfig }: { canManageConfig: boolean }) {
  const [items, setItems] = useState<ContractRow[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [qInput, setQInput] = useState('');
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('');
  const [showNew, setShowNew] = useState(false);

  useEffect(() => { const t = setTimeout(() => { setQ(qInput); setPage(1); }, 300); return () => clearTimeout(t); }, [qInput]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const p = new URLSearchParams({ page: String(page), perPage: String(PER_PAGE) });
      if (q) p.set('q', q);
      if (status) p.set('status', status);
      const res = await fetch(`/api/admin/contracte?${p.toString()}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setItems(json.items ?? []); setTotal(json.total ?? 0);
    } catch (e) { toast.error(e instanceof Error ? e.message : 'Eroare'); }
    finally { setLoading(false); }
  }, [page, q, status]);
  useEffect(() => { load(); }, [load]);

  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));

  return (
    <div style={{ padding: '28px 32px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.35rem', color: '#0F172A', marginBottom: 4 }}>
            <FileSignature size={22} color="#2B8FCC" /> Contracte
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#64748B' }}>{total} contracte.</p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Button href="/admin/contracte/sabloane" variant="outline" leftIcon={<LayoutTemplate size={15} />}>Sabloane</Button>
          {canManageConfig && <Button href="/admin/contracte/setari" variant="outline" leftIcon={<Settings size={15} />}>Setari firma</Button>}
          <Button leftIcon={<Plus size={15} />} onClick={() => setShowNew(true)}>Contract nou</Button>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
        <div style={{ position: 'relative', flex: '1 1 240px', minWidth: 200 }}>
          <Search size={15} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
          <input value={qInput} onChange={(e) => setQInput(e.target.value)} placeholder="Cauta numar sau titlu..." style={{ ...ctrl, width: '100%', paddingLeft: 34, boxSizing: 'border-box' }} />
        </div>
        <select style={{ ...ctrl, cursor: 'pointer' }} value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
          <option value="">Toate statusurile</option>
          {Object.entries(CONTRACT_STATUS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
      </div>

      <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 14, overflow: 'hidden' }}>
        {loading ? <div style={{ padding: 48, textAlign: 'center', color: '#64748B' }}><Loader2 size={18} className="animate-spin" style={{ display: 'inline' }} /> Se incarca...</div>
          : items.length === 0 ? <div style={{ padding: 48, textAlign: 'center', color: '#64748B', fontFamily: 'var(--font-body)', fontSize: '0.9rem' }}>Niciun contract.</div>
          : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-body)' }}>
                <thead><tr style={{ background: '#F8FAFC', textAlign: 'left' }}>
                  {['Numar', 'Client', 'Titlu', 'Valoare', 'Status', 'Data'].map((h) => <th key={h} style={{ padding: '11px 16px', fontSize: '0.72rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid #E2E8F0', whiteSpace: 'nowrap' }}>{h}</th>)}
                </tr></thead>
                <tbody>
                  {items.map((c) => {
                    const st = CONTRACT_STATUS[c.status] ?? CONTRACT_STATUS.draft;
                    return (
                      <tr key={c.id} style={{ borderBottom: '1px solid #F1F5F9', cursor: 'pointer' }} onClick={() => (window.location.href = `/admin/contracte/${c.id}`)}>
                        <td style={{ padding: '12px 16px', fontWeight: 600, fontSize: '0.82rem', color: '#0F172A', whiteSpace: 'nowrap' }}>{c.contract_number || '—'}</td>
                        <td style={{ padding: '12px 16px', fontSize: '0.85rem', color: '#334155' }}>{c.client?.name ?? '—'}</td>
                        <td style={{ padding: '12px 16px', fontSize: '0.82rem', color: '#64748B' }}>{c.title || '—'}</td>
                        <td style={{ padding: '12px 16px', fontSize: '0.82rem', color: '#475569', whiteSpace: 'nowrap' }}>{fmtMoney(c.value, c.currency)}</td>
                        <td style={{ padding: '12px 16px' }}><span style={{ padding: '2px 9px', borderRadius: 999, fontSize: '0.72rem', fontWeight: 600, background: st.bg, color: st.fg, border: `1px solid ${st.bd}` }}>{st.label}</span></td>
                        <td style={{ padding: '12px 16px', fontSize: '0.78rem', color: '#94A3B8', whiteSpace: 'nowrap' }}>{fmtDate(c.created_at)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
      </div>

      {total > PER_PAGE && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8, marginTop: 16, fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#64748B' }}>
          <Button variant="outline" size="sm" disabled={page <= 1 || loading} onClick={() => setPage((p) => p - 1)} leftIcon={<ChevronLeft size={14} />}>Inapoi</Button>
          <span>{page} / {totalPages}</span>
          <Button variant="outline" size="sm" disabled={page >= totalPages || loading} onClick={() => setPage((p) => p + 1)} rightIcon={<ChevronRight size={14} />}>Inainte</Button>
        </div>
      )}

      {showNew && <GenerateModal onClose={() => setShowNew(false)} />}
    </div>
  );
}

/* ── Modal generare contract: alegi client + sablon ── */
function GenerateModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [clientQ, setClientQ] = useState('');
  const [clientResults, setClientResults] = useState<{ id: string; name: string }[]>([]);
  const [clientId, setClientId] = useState('');
  const [clientName, setClientName] = useState('');
  const [templates, setTemplates] = useState<{ id: string; name: string; is_active: boolean }[]>([]);
  const [templateId, setTemplateId] = useState('');
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/admin/contracte/sabloane').then((r) => r.json()).then((j) => setTemplates((j.items ?? []).filter((t: { is_active: boolean }) => t.is_active))).catch(() => {});
  }, []);

  useEffect(() => {
    if (clientId) return;
    const t = setTimeout(() => {
      const p = new URLSearchParams({ perPage: '8' });
      if (clientQ) p.set('q', clientQ);
      fetch(`/api/admin/clienti?${p.toString()}`).then((r) => r.json()).then((j) => setClientResults((j.items ?? []).map((c: { id: string; name: string }) => ({ id: c.id, name: c.name })))).catch(() => {});
    }, 250);
    return () => clearTimeout(t);
  }, [clientQ, clientId]);

  async function generate() {
    if (!clientId || !templateId) { toast.error('Alege client si sablon'); return; }
    setSaving(true);
    try {
      const res = await fetch('/api/admin/contracte', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ client_id: clientId, template_id: templateId, title, value }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      toast.success('Contract generat');
      router.push(`/admin/contracte/${json.contract.id}`);
    } catch (e) { toast.error(e instanceof Error ? e.message : 'Eroare'); setSaving(false); }
  }

  const inp: React.CSSProperties = { ...ctrl, width: '100%', height: 40, boxSizing: 'border-box' };
  const lbl: React.CSSProperties = { display: 'block', marginBottom: 6, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.8rem', color: '#374151' };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.45)', zIndex: 100, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '40px 16px', overflowY: 'auto' }} onClick={() => !saving && onClose()}>
      <div style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 560, padding: 28 }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: '#0F172A' }}>Contract nou</h2>
          <button onClick={() => !saving && onClose()} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: 4 }}><X size={20} /></button>
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={lbl}>Client *</label>
          {clientId ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', ...inp, height: 40, lineHeight: '40px' }}>
              <span style={{ fontSize: '0.875rem' }}>{clientName}</span>
              <button onClick={() => { setClientId(''); setClientName(''); setClientQ(''); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}><X size={15} /></button>
            </div>
          ) : (
            <>
              <input style={inp} value={clientQ} onChange={(e) => setClientQ(e.target.value)} placeholder="Cauta client dupa nume, CUI..." autoFocus />
              {clientResults.length > 0 && (
                <div style={{ border: '1px solid #E2E8F0', borderRadius: 8, marginTop: 4, maxHeight: 180, overflowY: 'auto' }}>
                  {clientResults.map((c) => (
                    <button key={c.id} onClick={() => { setClientId(c.id); setClientName(c.name); }} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '9px 12px', border: 'none', borderBottom: '1px solid #F1F5F9', background: '#fff', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#334155' }}>{c.name}</button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={lbl}>Sablon *</label>
          <select style={{ ...inp, cursor: 'pointer' }} value={templateId} onChange={(e) => setTemplateId(e.target.value)}>
            <option value="">— Alege sablon —</option>
            {templates.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
          {templates.length === 0 && <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#94A3B8', marginTop: 6 }}>Niciun sablon activ. <Link href="/admin/contracte/sabloane" style={{ color: '#2B8FCC' }}>Creeaza unul</Link>.</p>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
          <div><label style={lbl}>Titlu</label><input style={inp} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Contract servicii web" /></div>
          <div><label style={lbl}>Valoare (RON)</label><input style={inp} type="number" min="0" value={value} onChange={(e) => setValue(e.target.value)} placeholder="0" /></div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          <Button variant="outline" onClick={onClose}>Anuleaza</Button>
          <Button onClick={generate} loading={saving}>Genereaza contract</Button>
        </div>
      </div>
    </div>
  );
}
