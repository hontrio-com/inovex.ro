'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { RefreshCw, Plus, Search, Loader2, Trash2, Pencil, X, TrendingUp, CheckCircle2, CalendarClock, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { CrmSubscription, SubscriptionStatus } from '@/types/crm';
import { SubscriptionForm, SubFormValues } from './SubscriptionForm';

const STATUS_STYLE: Record<SubscriptionStatus, { label: string; fg: string; bg: string; bd: string }> = {
  activ:     { label: 'Activ',     fg: '#15803D', bg: '#F0FDF4', bd: '#BBF7D0' },
  suspendat: { label: 'Suspendat', fg: '#B45309', bg: '#FFFBEB', bd: '#FDE68A' },
  expirat:   { label: 'Expirat',   fg: '#DC2626', bg: '#FEF2F2', bd: '#FECACA' },
  anulat:    { label: 'Anulat',    fg: '#64748B', bg: '#F1F5F9', bd: '#E2E8F0' },
};
const CYCLE_LABEL: Record<string, string> = { lunar: 'lunar', trimestrial: 'trimestrial', semestrial: 'semestrial', anual: 'anual' };
const ctrl: React.CSSProperties = { height: 38, border: '1px solid #E2E8F0', borderRadius: 8, padding: '0 12px', fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#0F172A', background: '#fff', outline: 'none' };
const PER_PAGE = 30;

function fmtMoney(v: number | null, cur: string | null) { if (v == null) return '—'; try { return new Intl.NumberFormat('ro-RO', { style: 'currency', currency: cur || 'RON', maximumFractionDigits: 0 }).format(v); } catch { return `${v} RON`; } }
function fmtDate(iso: string | null) { return iso ? new Date(iso).toLocaleDateString('ro-RO', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'; }

function StatTile({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div style={{ flex: '1 1 180px', background: '#fff', border: '1px solid #E2E8F0', borderRadius: 14, padding: 18, display: 'flex', alignItems: 'center', gap: 14 }}>
      <div style={{ width: 42, height: 42, borderRadius: 10, background: `${color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>{icon}</div>
      <div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.3rem', color: '#0F172A' }}>{value}</div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#94A3B8' }}>{label}</div>
      </div>
    </div>
  );
}

export function AbonamenteList() {
  const [items, setItems] = useState<CrmSubscription[]>([]);
  const [total, setTotal] = useState(0);
  const [mrr, setMrr] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [renewals30, setRenewals30] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [qInput, setQInput] = useState('');
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('');
  const [cycle, setCycle] = useState('');
  const [editing, setEditing] = useState<CrmSubscription | 'new' | null>(null);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => { const t = setTimeout(() => { setQ(qInput); setPage(1); }, 300); return () => clearTimeout(t); }, [qInput]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const p = new URLSearchParams({ page: String(page), perPage: String(PER_PAGE) });
      if (q) p.set('q', q);
      if (status) p.set('status', status);
      if (cycle) p.set('cycle', cycle);
      const res = await fetch(`/api/admin/abonamente?${p.toString()}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setItems(json.items ?? []); setTotal(json.total ?? 0);
      setMrr(json.mrr ?? 0); setActiveCount(json.activeCount ?? 0); setRenewals30(json.renewals30 ?? 0);
    } catch (e) { toast.error(e instanceof Error ? e.message : 'Eroare'); }
    finally { setLoading(false); }
  }, [page, q, status, cycle]);
  useEffect(() => { load(); }, [load]);

  async function save(values: SubFormValues) {
    setSaving(true);
    try {
      const isEdit = editing && editing !== 'new';
      const url = isEdit ? `/api/admin/abonamente/${(editing as CrmSubscription).id}` : '/api/admin/abonamente';
      const res = await fetch(url, { method: isEdit ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      toast.success(isEdit ? 'Abonament actualizat' : 'Abonament creat');
      setEditing(null);
      load();
    } catch (e) { toast.error(e instanceof Error ? e.message : 'Eroare'); }
    finally { setSaving(false); }
  }

  async function remove(sub: CrmSubscription) {
    if (!confirm(`Stergi abonamentul "${sub.name}"?`)) return;
    setBusyId(sub.id);
    try {
      const res = await fetch(`/api/admin/abonamente/${sub.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error((await res.json()).error);
      setItems((prev) => prev.filter((s) => s.id !== sub.id));
      toast.success('Abonament sters');
    } catch (e) { toast.error(e instanceof Error ? e.message : 'Eroare'); }
    finally { setBusyId(null); }
  }

  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));

  return (
    <div style={{ padding: '28px 32px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 20 }}>
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.35rem', color: '#0F172A', marginBottom: 4 }}>
            <RefreshCw size={22} color="#2B8FCC" /> Abonamente mentenanta
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#64748B' }}>Venit recurent si reinnoiri.</p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Button variant="outline" href="/admin/pachete" leftIcon={<Package size={15} />}>Pachete</Button>
          <Button leftIcon={<Plus size={15} />} onClick={() => setEditing('new')}>Abonament nou</Button>
        </div>
      </div>

      {/* Statistici */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginBottom: 20 }}>
        <StatTile icon={<TrendingUp size={20} />} label="MRR (venit lunar)" value={fmtMoney(mrr, 'RON')} color="#2B8FCC" />
        <StatTile icon={<CheckCircle2 size={20} />} label="Abonamente active" value={String(activeCount)} color="#15803D" />
        <StatTile icon={<CalendarClock size={20} />} label="Reinnoiri in 30 zile" value={String(renewals30)} color="#EA580C" />
      </div>

      {/* Filtre */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
        <div style={{ position: 'relative', flex: '1 1 220px', minWidth: 180 }}>
          <Search size={15} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
          <input value={qInput} onChange={(e) => setQInput(e.target.value)} placeholder="Cauta abonament..." style={{ ...ctrl, width: '100%', paddingLeft: 34, boxSizing: 'border-box' }} />
        </div>
        <select style={{ ...ctrl, cursor: 'pointer' }} value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
          <option value="">Toate statusurile</option>
          <option value="activ">Activ</option>
          <option value="suspendat">Suspendat</option>
          <option value="expirat">Expirat</option>
          <option value="anulat">Anulat</option>
        </select>
        <select style={{ ...ctrl, cursor: 'pointer' }} value={cycle} onChange={(e) => { setCycle(e.target.value); setPage(1); }}>
          <option value="">Toate ciclurile</option>
          <option value="lunar">Lunar</option>
          <option value="trimestrial">Trimestrial</option>
          <option value="semestrial">Semestrial</option>
          <option value="anual">Anual</option>
        </select>
      </div>

      {/* Tabel */}
      <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 14, overflow: 'hidden' }}>
        {loading ? <div style={{ padding: 48, textAlign: 'center', color: '#64748B' }}><Loader2 size={18} className="animate-spin" style={{ display: 'inline' }} /> Se incarca...</div>
          : items.length === 0 ? <div style={{ padding: 48, textAlign: 'center', color: '#64748B', fontFamily: 'var(--font-body)', fontSize: '0.9rem' }}>Niciun abonament.</div>
          : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-body)' }}>
                <thead><tr style={{ background: '#F8FAFC', textAlign: 'left' }}>
                  {['Client', 'Abonament', 'Status', 'Pret', 'Reinnoire', 'Actiuni'].map((h) => <th key={h} style={{ padding: '11px 16px', fontSize: '0.72rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid #E2E8F0', whiteSpace: 'nowrap' }}>{h}</th>)}
                </tr></thead>
                <tbody>
                  {items.map((sub) => {
                    const st = STATUS_STYLE[sub.status];
                    return (
                      <tr key={sub.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                        <td style={{ padding: '12px 16px', fontSize: '0.85rem' }}>{sub.client ? <Link href={`/admin/clienti/${sub.client.id}`} style={{ color: '#2B8FCC', textDecoration: 'none', fontWeight: 600 }}>{sub.client.name}</Link> : '—'}</td>
                        <td style={{ padding: '12px 16px', fontSize: '0.85rem', color: '#334155', fontWeight: 600 }}>
                          {sub.name}
                          {sub.package && <span style={{ display: 'block', fontWeight: 500, fontSize: '0.72rem', color: '#94A3B8' }}>Pachet: {sub.package.name}</span>}
                        </td>
                        <td style={{ padding: '12px 16px' }}><span style={{ padding: '2px 9px', borderRadius: 999, fontSize: '0.72rem', fontWeight: 600, background: st.bg, color: st.fg, border: `1px solid ${st.bd}` }}>{st.label}</span></td>
                        <td style={{ padding: '12px 16px', fontSize: '0.82rem', color: '#475569', whiteSpace: 'nowrap' }}>{fmtMoney(sub.price, sub.currency)} <span style={{ color: '#94A3B8', fontSize: '0.72rem' }}>/ {CYCLE_LABEL[sub.billing_cycle]}</span></td>
                        <td style={{ padding: '12px 16px', fontSize: '0.8rem', color: '#64748B', whiteSpace: 'nowrap' }}>{fmtDate(sub.next_renewal_date)}</td>
                        <td style={{ padding: '12px 16px' }}>
                          <div style={{ display: 'flex', gap: 4 }}>
                            <Button variant="ghost" size="icon-sm" onClick={() => setEditing(sub)} title="Editeaza"><Pencil size={14} /></Button>
                            <Button variant="ghost" size="icon-sm" disabled={busyId === sub.id} onClick={() => remove(sub)} className="text-red-400 hover:text-red-600 hover:bg-red-50"><Trash2 size={14} /></Button>
                          </div>
                        </td>
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
          <Button variant="outline" size="sm" disabled={page <= 1 || loading} onClick={() => setPage((p) => p - 1)}>Inapoi</Button>
          <span>{page} / {totalPages}</span>
          <Button variant="outline" size="sm" disabled={page >= totalPages || loading} onClick={() => setPage((p) => p + 1)}>Inainte</Button>
        </div>
      )}

      {editing && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.45)', zIndex: 100, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '40px 16px', overflowY: 'auto' }} onClick={() => !saving && setEditing(null)}>
          <div style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 600, padding: 28 }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: '#0F172A' }}>{editing === 'new' ? 'Abonament nou' : 'Editeaza abonament'}</h2>
              <button onClick={() => !saving && setEditing(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: 4 }}><X size={20} /></button>
            </div>
            <SubscriptionForm
              initial={editing === 'new' ? null : editing}
              fixedClientId={editing === 'new' ? undefined : (editing as CrmSubscription).client_id}
              fixedClientName={editing === 'new' ? undefined : (editing as CrmSubscription).client?.name ?? undefined}
              submitting={saving}
              submitLabel={editing === 'new' ? 'Creeaza' : 'Salveaza'}
              onSubmit={save}
              onCancel={() => setEditing(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
