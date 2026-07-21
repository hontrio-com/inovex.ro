'use client';

import { useEffect, useState, useCallback, FormEvent } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import {
  Server, Plus, Search, Loader2, Trash2, Pencil, X, Eye, EyeOff, Copy,
  ExternalLink, KeyRound, Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { CrmWebsite, WebsiteCredential, WebsiteStatus } from '@/types/crm';

const STATUS_STYLE: Record<WebsiteStatus, { label: string; fg: string; bg: string; bd: string }> = {
  activ:         { label: 'Activ',          fg: '#15803D', bg: '#F0FDF4', bd: '#BBF7D0' },
  in_dezvoltare: { label: 'In dezvoltare',  fg: '#1D4ED8', bg: '#EFF6FF', bd: '#BFDBFE' },
  suspendat:     { label: 'Suspendat',      fg: '#B45309', bg: '#FFFBEB', bd: '#FDE68A' },
  arhivat:       { label: 'Arhivat',        fg: '#64748B', bg: '#F1F5F9', bd: '#E2E8F0' },
};
const STATUSES: WebsiteStatus[] = ['activ', 'in_dezvoltare', 'suspendat', 'arhivat'];
const PLATFORMS = ['WordPress', 'WooCommerce', 'Shopify', 'PrestaShop', 'Magento', 'Next.js / Custom', 'Laravel', 'Wix', 'Squarespace', 'Drupal', 'Joomla'];

const ctrl: React.CSSProperties = { height: 38, border: '1px solid #E2E8F0', borderRadius: 8, padding: '0 12px', fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#0F172A', background: '#fff', outline: 'none' };
const inp: React.CSSProperties = { width: '100%', height: 40, border: '1px solid #E2E8F0', borderRadius: 8, padding: '0 12px', fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#0F172A', background: '#fff', outline: 'none', boxSizing: 'border-box' };
const lbl: React.CSSProperties = { display: 'block', marginBottom: 6, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.8rem', color: '#374151' };

function copy(text: string) { navigator.clipboard.writeText(text).then(() => toast.success('Copiat')).catch(() => {}); }

/* ─────────────── Form ─────────────── */
interface WebFormValues {
  client_id: string; subscription_id: string; label: string; domain: string;
  platform: string; hosting: string; hosting_url: string; admin_url: string;
  status: WebsiteStatus; credentials: WebsiteCredential[]; notes: string;
}
function toValues(w?: CrmWebsite | null): WebFormValues {
  return {
    client_id: w?.client_id ?? '', subscription_id: w?.subscription_id ?? '',
    label: w?.label ?? '', domain: w?.domain ?? '', platform: w?.platform ?? '',
    hosting: w?.hosting ?? '', hosting_url: w?.hosting_url ?? '', admin_url: w?.admin_url ?? '',
    status: w?.status ?? 'activ', credentials: w?.credentials ?? [], notes: w?.notes ?? '',
  };
}

function WebsiteForm({ initial, submitting, onSubmit, onCancel }: {
  initial?: CrmWebsite | null; submitting: boolean; onSubmit: (v: WebFormValues) => void; onCancel: () => void;
}) {
  const [v, setV] = useState<WebFormValues>(() => toValues(initial));
  const setF = (k: keyof WebFormValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setV((p) => ({ ...p, [k]: e.target.value }));

  // Client picker
  const [clientQ, setClientQ] = useState('');
  const [clientName, setClientName] = useState(initial?.client?.name ?? '');
  const [results, setResults] = useState<{ id: string; name: string }[]>([]);
  useEffect(() => {
    if (v.client_id) return;
    const t = setTimeout(() => {
      const p = new URLSearchParams({ perPage: '8' });
      if (clientQ) p.set('q', clientQ);
      fetch(`/api/admin/clienti?${p.toString()}`).then((r) => r.json()).then((j) => setResults((j.items ?? []).map((c: { id: string; name: string }) => ({ id: c.id, name: c.name })))).catch(() => {});
    }, 250);
    return () => clearTimeout(t);
  }, [clientQ, v.client_id]);

  // Abonamente ale clientului (optional)
  const [subs, setSubs] = useState<{ id: string; name: string }[]>([]);
  useEffect(() => {
    if (!v.client_id) return;
    let cancelled = false;
    fetch(`/api/admin/abonamente?client_id=${v.client_id}&perPage=50`)
      .then((r) => r.json())
      .then((j) => { if (!cancelled) setSubs((j.items ?? []).map((s: { id: string; name: string }) => ({ id: s.id, name: s.name }))); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [v.client_id]);

  function setCred(i: number, k: keyof WebsiteCredential, val: string) {
    setV((p) => ({ ...p, credentials: p.credentials.map((c, j) => j === i ? { ...c, [k]: val } : c) }));
  }
  function addCred() { setV((p) => ({ ...p, credentials: [...p.credentials, { label: '', url: '', username: '', password: '' }] })); }
  function removeCred(i: number) { setV((p) => ({ ...p, credentials: p.credentials.filter((_, j) => j !== i) })); }

  function submit(e: FormEvent) { e.preventDefault(); if (!v.client_id) { toast.error('Alege un client'); return; } onSubmit(v); }
  const grid2: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 };

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div>
        <label style={lbl}>Client *</label>
        {v.client_id ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', ...inp, lineHeight: '40px' }}>
            <span style={{ fontSize: '0.875rem' }}>{clientName}</span>
            <button type="button" onClick={() => { setV((p) => ({ ...p, client_id: '', subscription_id: '' })); setClientName(''); setClientQ(''); setSubs([]); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}><X size={15} /></button>
          </div>
        ) : (
          <>
            <input style={inp} value={clientQ} onChange={(e) => setClientQ(e.target.value)} placeholder="Cauta client..." />
            {results.length > 0 && (
              <div style={{ border: '1px solid #E2E8F0', borderRadius: 8, marginTop: 4, maxHeight: 160, overflowY: 'auto' }}>
                {results.map((c) => (
                  <button key={c.id} type="button" onClick={() => { setV((p) => ({ ...p, client_id: c.id })); setClientName(c.name); }} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '9px 12px', border: 'none', borderBottom: '1px solid #F1F5F9', background: '#fff', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#334155' }}>{c.name}</button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <div style={grid2}>
        <div><label style={lbl}>Nume / eticheta</label><input style={inp} value={v.label} onChange={setF('label')} placeholder="Ex: Site prezentare" /></div>
        <div><label style={lbl}>Domeniu</label><input style={inp} value={v.domain} onChange={setF('domain')} placeholder="exemplu.ro" /></div>
        <div>
          <label style={lbl}>Platforma</label>
          <input style={inp} list="platforms" value={v.platform} onChange={setF('platform')} placeholder="WordPress, Shopify..." />
          <datalist id="platforms">{PLATFORMS.map((p) => <option key={p} value={p} />)}</datalist>
        </div>
        <div>
          <label style={lbl}>Status</label>
          <select style={{ ...inp, cursor: 'pointer' }} value={v.status} onChange={setF('status')}>
            {STATUSES.map((s) => <option key={s} value={s}>{STATUS_STYLE[s].label}</option>)}
          </select>
        </div>
        <div><label style={lbl}>Hosting</label><input style={inp} value={v.hosting} onChange={setF('hosting')} placeholder="Ex: Hostico, cPanel" /></div>
        <div><label style={lbl}>Link hosting / panou</label><input style={inp} value={v.hosting_url} onChange={setF('hosting_url')} placeholder="https://..." /></div>
        {subs.length > 0 && (
          <div>
            <label style={lbl}>Abonament asociat</label>
            <select style={{ ...inp, cursor: 'pointer' }} value={v.subscription_id} onChange={setF('subscription_id')}>
              <option value="">Fara</option>
              {subs.map((sub) => <option key={sub.id} value={sub.id}>{sub.name}</option>)}
            </select>
          </div>
        )}
        <div><label style={lbl}>Link admin</label><input style={inp} value={v.admin_url} onChange={setF('admin_url')} placeholder="https://.../wp-admin" /></div>
      </div>

      {/* Date de logare */}
      <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <label style={{ ...lbl, marginBottom: 0, display: 'flex', alignItems: 'center', gap: 6 }}><KeyRound size={14} color="#2B8FCC" /> Date de logare (criptate)</label>
          <Button type="button" variant="outline" size="sm" onClick={addCred} leftIcon={<Plus size={13} />}>Adauga logare</Button>
        </div>
        {v.credentials.length === 0 && <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#94A3B8', margin: '2px 0 4px' }}>Adauga conturi (WordPress, cPanel, FTP, DB, domeniu...). Parolele sunt criptate.</p>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {v.credentials.map((c, i) => (
            <div key={i} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 10, padding: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <input style={{ ...inp, height: 34, flex: 1 }} value={c.label ?? ''} onChange={(e) => setCred(i, 'label', e.target.value)} placeholder="Eticheta (ex: WordPress Admin)" />
                <button type="button" onClick={() => removeCred(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', display: 'flex', padding: 4 }}><Trash2 size={15} /></button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                <input style={{ ...inp, height: 34 }} value={c.url ?? ''} onChange={(e) => setCred(i, 'url', e.target.value)} placeholder="URL login" />
                <input style={{ ...inp, height: 34 }} value={c.username ?? ''} onChange={(e) => setCred(i, 'username', e.target.value)} placeholder="Utilizator" autoComplete="off" />
                <input style={{ ...inp, height: 34 }} value={c.password ?? ''} onChange={(e) => setCred(i, 'password', e.target.value)} placeholder="Parola" autoComplete="off" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div><label style={lbl}>Note</label><textarea value={v.notes} onChange={setF('notes')} rows={2} style={{ ...inp, height: 'auto', padding: '10px 12px', resize: 'vertical' }} placeholder="Observatii, detalii tehnice..." /></div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 4 }}>
        <Button type="button" variant="outline" onClick={onCancel}>Anuleaza</Button>
        <Button type="submit" loading={submitting}>{initial ? 'Salveaza' : 'Adauga website'}</Button>
      </div>
    </form>
  );
}

/* ─────────────── Credential view (read-only) ─────────────── */
function CredRow({ c }: { c: WebsiteCredential }) {
  const [show, setShow] = useState(false);
  return (
    <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 10, padding: 12 }}>
      <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.82rem', color: '#0F172A', marginBottom: 8 }}>{c.label || 'Cont'}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {c.url && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-body)', fontSize: '0.8rem' }}>
            <span style={{ width: 78, color: '#94A3B8', flexShrink: 0 }}>URL</span>
            <a href={c.url.startsWith('http') ? c.url : `https://${c.url}`} target="_blank" rel="noreferrer" style={{ color: '#2B8FCC', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4, wordBreak: 'break-all' }}>{c.url} <ExternalLink size={12} /></a>
          </div>
        )}
        {c.username && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-body)', fontSize: '0.8rem' }}>
            <span style={{ width: 78, color: '#94A3B8', flexShrink: 0 }}>Utilizator</span>
            <span style={{ color: '#334155', fontFamily: 'monospace', flex: 1, wordBreak: 'break-all' }}>{c.username}</span>
            <button type="button" onClick={() => copy(c.username!)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', display: 'flex' }}><Copy size={13} /></button>
          </div>
        )}
        {c.password && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-body)', fontSize: '0.8rem' }}>
            <span style={{ width: 78, color: '#94A3B8', flexShrink: 0 }}>Parola</span>
            <span style={{ color: '#334155', fontFamily: 'monospace', flex: 1, wordBreak: 'break-all' }}>{show ? c.password : '••••••••••'}</span>
            <button type="button" onClick={() => setShow((s) => !s)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', display: 'flex' }}>{show ? <EyeOff size={14} /> : <Eye size={14} />}</button>
            <button type="button" onClick={() => copy(c.password!)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', display: 'flex' }}><Copy size={13} /></button>
          </div>
        )}
      </div>
    </div>
  );
}

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 12, fontFamily: 'var(--font-body)', fontSize: '0.85rem', padding: '6px 0' }}>
      <span style={{ width: 110, color: '#94A3B8', flexShrink: 0 }}>{label}</span>
      <span style={{ color: '#334155', wordBreak: 'break-word' }}>{children}</span>
    </div>
  );
}

/* ─────────────── Main list ─────────────── */
const PER_PAGE = 50;

export function WebsitesList() {
  const [items, setItems] = useState<CrmWebsite[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [qInput, setQInput] = useState('');
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('');

  const [openId, setOpenId] = useState<string | 'new' | null>(null);
  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const [detail, setDetail] = useState<CrmWebsite | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => { const t = setTimeout(() => setQ(qInput), 300); return () => clearTimeout(t); }, [qInput]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const p = new URLSearchParams({ perPage: String(PER_PAGE) });
      if (q) p.set('q', q);
      if (status) p.set('status', status);
      const res = await fetch(`/api/admin/website-uri?${p.toString()}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setItems(json.items ?? []); setTotal(json.total ?? 0);
    } catch (e) { toast.error(e instanceof Error ? e.message : 'Eroare'); }
    finally { setLoading(false); }
  }, [q, status]);
  useEffect(() => { load(); }, [load]);

  async function openView(id: string) {
    setOpenId(id); setMode('view'); setDetail(null); setDetailLoading(true);
    try {
      const res = await fetch(`/api/admin/website-uri/${id}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setDetail(json.item);
    } catch (e) { toast.error(e instanceof Error ? e.message : 'Eroare'); setOpenId(null); }
    finally { setDetailLoading(false); }
  }

  async function save(values: WebFormValues) {
    setSaving(true);
    try {
      const isEdit = openId && openId !== 'new';
      const url = isEdit ? `/api/admin/website-uri/${openId}` : '/api/admin/website-uri';
      const res = await fetch(url, { method: isEdit ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      toast.success(isEdit ? 'Website actualizat' : 'Website adaugat');
      setOpenId(null); setDetail(null);
      load();
    } catch (e) { toast.error(e instanceof Error ? e.message : 'Eroare'); }
    finally { setSaving(false); }
  }

  async function remove(w: CrmWebsite) {
    if (!confirm(`Stergi website-ul "${w.label || w.domain || 'fara nume'}"? Se sterg si datele de logare.`)) return;
    setBusyId(w.id);
    try {
      const res = await fetch(`/api/admin/website-uri/${w.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error((await res.json()).error);
      setItems((prev) => prev.filter((x) => x.id !== w.id));
      if (openId === w.id) { setOpenId(null); setDetail(null); }
      toast.success('Website sters');
    } catch (e) { toast.error(e instanceof Error ? e.message : 'Eroare'); }
    finally { setBusyId(null); }
  }

  return (
    <div style={{ padding: '28px 32px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 20 }}>
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.35rem', color: '#0F172A', marginBottom: 4 }}>
            <Server size={22} color="#2B8FCC" /> Website-uri administrate
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#64748B' }}>Site-urile pentru care oferi mentenanta, cu platforma, hosting si date de logare.</p>
        </div>
        <Button leftIcon={<Plus size={15} />} onClick={() => { setOpenId('new'); setMode('edit'); setDetail(null); }}>Website nou</Button>
      </div>

      {/* Filtre */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
        <div style={{ position: 'relative', flex: '1 1 220px', minWidth: 180 }}>
          <Search size={15} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
          <input value={qInput} onChange={(e) => setQInput(e.target.value)} placeholder="Cauta domeniu, platforma..." style={{ ...ctrl, width: '100%', paddingLeft: 34, boxSizing: 'border-box' }} />
        </div>
        <select style={{ ...ctrl, cursor: 'pointer' }} value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Toate statusurile</option>
          {STATUSES.map((s) => <option key={s} value={s}>{STATUS_STYLE[s].label}</option>)}
        </select>
      </div>

      {/* Tabel */}
      <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 14, overflow: 'hidden' }}>
        {loading ? <div style={{ padding: 48, textAlign: 'center', color: '#64748B' }}><Loader2 size={18} className="animate-spin" style={{ display: 'inline' }} /> Se incarca...</div>
          : items.length === 0 ? <div style={{ padding: 48, textAlign: 'center', color: '#64748B', fontFamily: 'var(--font-body)', fontSize: '0.9rem' }}>Niciun website inca.</div>
          : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-body)' }}>
                <thead><tr style={{ background: '#F8FAFC', textAlign: 'left' }}>
                  {['Website', 'Client', 'Platforma', 'Hosting', 'Status', 'Logari', 'Actiuni'].map((h) => <th key={h} style={{ padding: '11px 16px', fontSize: '0.72rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid #E2E8F0', whiteSpace: 'nowrap' }}>{h}</th>)}
                </tr></thead>
                <tbody>
                  {items.map((w) => {
                    const st = STATUS_STYLE[w.status];
                    return (
                      <tr key={w.id} style={{ borderBottom: '1px solid #F1F5F9', cursor: 'pointer' }} onClick={() => openView(w.id)}>
                        <td style={{ padding: '12px 16px', fontSize: '0.85rem' }}>
                          <div style={{ fontWeight: 600, color: '#0F172A', display: 'flex', alignItems: 'center', gap: 7 }}><Globe size={14} color="#94A3B8" /> {w.domain || w.label || '—'}</div>
                          {w.label && w.domain && <div style={{ fontSize: '0.74rem', color: '#94A3B8', marginLeft: 21 }}>{w.label}</div>}
                        </td>
                        <td style={{ padding: '12px 16px', fontSize: '0.82rem' }}>{w.client ? <Link href={`/admin/clienti/${w.client.id}`} onClick={(e) => e.stopPropagation()} style={{ color: '#2B8FCC', textDecoration: 'none' }}>{w.client.name}</Link> : '—'}</td>
                        <td style={{ padding: '12px 16px', fontSize: '0.82rem', color: '#475569' }}>{w.platform || '—'}</td>
                        <td style={{ padding: '12px 16px', fontSize: '0.82rem', color: '#475569' }}>{w.hosting || '—'}</td>
                        <td style={{ padding: '12px 16px' }}><span style={{ padding: '2px 9px', borderRadius: 999, fontSize: '0.72rem', fontWeight: 600, background: st.bg, color: st.fg, border: `1px solid ${st.bd}`, whiteSpace: 'nowrap' }}>{st.label}</span></td>
                        <td style={{ padding: '12px 16px', fontSize: '0.8rem', color: '#64748B' }}>{w.credentials_count ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><KeyRound size={13} /> {w.credentials_count}</span> : '—'}</td>
                        <td style={{ padding: '12px 16px' }} onClick={(e) => e.stopPropagation()}>
                          <div style={{ display: 'flex', gap: 4 }}>
                            <Button variant="ghost" size="icon-sm" onClick={() => openView(w.id)} title="Vezi"><Eye size={15} /></Button>
                            <Button variant="ghost" size="icon-sm" disabled={busyId === w.id} onClick={() => remove(w)} className="text-red-400 hover:text-red-600 hover:bg-red-50"><Trash2 size={14} /></Button>
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
      {total > 0 && <p style={{ marginTop: 12, fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#94A3B8' }}>{total} website{total === 1 ? '' : '-uri'}</p>}

      {/* Modal detaliu / editare */}
      {openId && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.45)', zIndex: 100, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '40px 16px', overflowY: 'auto' }} onClick={() => !saving && setOpenId(null)}>
          <div style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 640, padding: 28 }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: '#0F172A' }}>
                {openId === 'new' ? 'Website nou' : mode === 'edit' ? 'Editeaza website' : (detail?.domain || detail?.label || 'Detalii website')}
              </h2>
              <button onClick={() => !saving && setOpenId(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: 4 }}><X size={20} /></button>
            </div>

            {mode === 'edit' ? (
              <WebsiteForm initial={openId === 'new' ? null : detail} submitting={saving} onSubmit={save} onCancel={() => (openId === 'new' ? setOpenId(null) : setMode('view'))} />
            ) : detailLoading || !detail ? (
              <div style={{ padding: 40, textAlign: 'center', color: '#64748B' }}><Loader2 size={18} className="animate-spin" style={{ display: 'inline' }} /> Se incarca...</div>
            ) : (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
                  <span style={{ padding: '2px 9px', borderRadius: 999, fontSize: '0.72rem', fontWeight: 600, background: STATUS_STYLE[detail.status].bg, color: STATUS_STYLE[detail.status].fg, border: `1px solid ${STATUS_STYLE[detail.status].bd}` }}>{STATUS_STYLE[detail.status].label}</span>
                  {detail.client && <Link href={`/admin/clienti/${detail.client.id}`} style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#2B8FCC', textDecoration: 'none' }}>{detail.client.name}</Link>}
                </div>
                <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: 6, marginBottom: 8 }}>
                  {detail.domain && <DetailRow label="Domeniu"><a href={detail.domain.startsWith('http') ? detail.domain : `https://${detail.domain}`} target="_blank" rel="noreferrer" style={{ color: '#2B8FCC', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>{detail.domain} <ExternalLink size={12} /></a></DetailRow>}
                  {detail.platform && <DetailRow label="Platforma">{detail.platform}</DetailRow>}
                  {detail.hosting && <DetailRow label="Hosting">{detail.hosting}{detail.hosting_url ? <> — <a href={detail.hosting_url} target="_blank" rel="noreferrer" style={{ color: '#2B8FCC', textDecoration: 'none' }}>panou</a></> : ''}</DetailRow>}
                  {detail.admin_url && <DetailRow label="Admin"><a href={detail.admin_url} target="_blank" rel="noreferrer" style={{ color: '#2B8FCC', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>{detail.admin_url} <ExternalLink size={12} /></a></DetailRow>}
                  {detail.subscription && <DetailRow label="Abonament">{detail.subscription.name}</DetailRow>}
                  {detail.notes && <DetailRow label="Note">{detail.notes}</DetailRow>}
                </div>

                <div style={{ marginTop: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.85rem', color: '#0F172A', marginBottom: 10 }}><KeyRound size={15} color="#2B8FCC" /> Date de logare</div>
                  {detail.credentials && detail.credentials.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {detail.credentials.map((c, i) => <CredRow key={i} c={c} />)}
                    </div>
                  ) : <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#94A3B8' }}>Nu sunt date de logare salvate.</p>}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 20, borderTop: '1px solid #F1F5F9', paddingTop: 16 }}>
                  <Button variant="outline" onClick={() => remove(detail)} className="text-red-600 border-red-200 hover:bg-red-50" leftIcon={<Trash2 size={14} />}>Sterge</Button>
                  <Button onClick={() => setMode('edit')} leftIcon={<Pencil size={14} />}>Editeaza</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
