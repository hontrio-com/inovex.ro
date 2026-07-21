'use client';

import { useEffect, useState, useCallback, FormEvent } from 'react';
import { toast } from 'sonner';
import { Package, Plus, Pencil, Trash2, X, Check, Loader2, CircleDot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { CrmMaintenancePackage, BillingCycle } from '@/types/crm';

const CYCLE_LABEL: Record<BillingCycle, string> = { lunar: 'luna', trimestrial: 'trimestru', semestrial: 'semestru', anual: 'an' };
const CYCLES: BillingCycle[] = ['lunar', 'trimestrial', 'semestrial', 'anual'];

function fmtMoney(v: number | null, cur: string | null) {
  if (v == null) return '—';
  try { return new Intl.NumberFormat('ro-RO', { style: 'currency', currency: cur || 'RON', maximumFractionDigits: 0 }).format(v); }
  catch { return `${v} ${cur || 'RON'}`; }
}

const inp: React.CSSProperties = { width: '100%', height: 40, border: '1px solid #E2E8F0', borderRadius: 8, padding: '0 12px', fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#0F172A', background: '#fff', outline: 'none', boxSizing: 'border-box' };
const lbl: React.CSSProperties = { display: 'block', marginBottom: 6, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.8rem', color: '#374151' };

interface PkgFormValues { name: string; description: string; price: string; currency: string; billing_cycle: BillingCycle; features: string[]; is_active: boolean; }

function toValues(p?: CrmMaintenancePackage | null): PkgFormValues {
  return {
    name: p?.name ?? '', description: p?.description ?? '',
    price: p?.price != null ? String(p.price) : '', currency: p?.currency ?? 'RON',
    billing_cycle: p?.billing_cycle ?? 'lunar', features: p?.features ?? [], is_active: p?.is_active ?? true,
  };
}

function PackageForm({ initial, submitting, onSubmit, onCancel }: {
  initial?: CrmMaintenancePackage | null; submitting: boolean;
  onSubmit: (v: PkgFormValues) => void; onCancel: () => void;
}) {
  const [v, setV] = useState<PkgFormValues>(() => toValues(initial));
  const [featInput, setFeatInput] = useState('');

  function addFeat() {
    const f = featInput.trim();
    if (!f) return;
    setV((p) => ({ ...p, features: [...p.features, f] }));
    setFeatInput('');
  }
  function submit(e: FormEvent) { e.preventDefault(); onSubmit(v); }

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div><label style={lbl}>Nume pachet *</label><input style={inp} value={v.name} onChange={(e) => setV((p) => ({ ...p, name: e.target.value }))} placeholder="Ex: Mentenanta Standard" /></div>
      <div><label style={lbl}>Descriere</label><textarea value={v.description} onChange={(e) => setV((p) => ({ ...p, description: e.target.value }))} rows={2} style={{ ...inp, height: 'auto', padding: '10px 12px', resize: 'vertical' }} placeholder="Pe scurt, ce include pachetul" /></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        <div><label style={lbl}>Pret</label><input style={inp} type="number" min="0" step="0.01" value={v.price} onChange={(e) => setV((p) => ({ ...p, price: e.target.value }))} placeholder="0" /></div>
        <div><label style={lbl}>Moneda</label>
          <select style={{ ...inp, cursor: 'pointer' }} value={v.currency} onChange={(e) => setV((p) => ({ ...p, currency: e.target.value }))}>
            <option value="RON">RON</option><option value="EUR">EUR</option><option value="USD">USD</option>
          </select>
        </div>
        <div><label style={lbl}>Facturare</label>
          <select style={{ ...inp, cursor: 'pointer' }} value={v.billing_cycle} onChange={(e) => setV((p) => ({ ...p, billing_cycle: e.target.value as BillingCycle }))}>
            {CYCLES.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label style={lbl}>Beneficii incluse</label>
        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <input style={inp} value={featInput} onChange={(e) => setFeatInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addFeat(); } }} placeholder="Ex: Backup zilnic" />
          <Button type="button" variant="outline" onClick={addFeat}>Adauga</Button>
        </div>
        {v.features.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {v.features.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 8, padding: '7px 10px' }}>
                <Check size={14} color="#15803D" />
                <span style={{ flex: 1, fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#334155' }}>{f}</span>
                <button type="button" onClick={() => setV((p) => ({ ...p, features: p.features.filter((_, j) => j !== i) }))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', display: 'flex' }}><X size={14} /></button>
              </div>
            ))}
          </div>
        )}
      </div>

      <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#334155' }}>
        <input type="checkbox" checked={v.is_active} onChange={(e) => setV((p) => ({ ...p, is_active: e.target.checked }))} />
        Pachet activ (disponibil la crearea abonamentelor)
      </label>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 4 }}>
        <Button type="button" variant="outline" onClick={onCancel}>Anuleaza</Button>
        <Button type="submit" loading={submitting}>{initial ? 'Salveaza' : 'Creeaza pachet'}</Button>
      </div>
    </form>
  );
}

export function PacheteList({ canManage }: { canManage: boolean }) {
  const [items, setItems] = useState<CrmMaintenancePackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<CrmMaintenancePackage | 'new' | null>(null);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/pachete');
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setItems(json.items ?? []);
    } catch (e) { toast.error(e instanceof Error ? e.message : 'Eroare'); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { load(); }, [load]);

  async function save(values: PkgFormValues) {
    setSaving(true);
    try {
      const isEdit = editing && editing !== 'new';
      const url = isEdit ? `/api/admin/pachete/${(editing as CrmMaintenancePackage).id}` : '/api/admin/pachete';
      const res = await fetch(url, { method: isEdit ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      toast.success(isEdit ? 'Pachet actualizat' : 'Pachet creat');
      setEditing(null);
      load();
    } catch (e) { toast.error(e instanceof Error ? e.message : 'Eroare'); }
    finally { setSaving(false); }
  }

  async function remove(pkg: CrmMaintenancePackage) {
    if (!confirm(`Stergi pachetul "${pkg.name}"?${pkg.usage_count ? ` Este folosit de ${pkg.usage_count} abonament(e), care raman neschimbate.` : ''}`)) return;
    setBusyId(pkg.id);
    try {
      const res = await fetch(`/api/admin/pachete/${pkg.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error((await res.json()).error);
      setItems((prev) => prev.filter((p) => p.id !== pkg.id));
      toast.success('Pachet sters');
    } catch (e) { toast.error(e instanceof Error ? e.message : 'Eroare'); }
    finally { setBusyId(null); }
  }

  return (
    <div style={{ padding: '28px 32px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 20 }}>
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.35rem', color: '#0F172A', marginBottom: 4 }}>
            <Package size={22} color="#2B8FCC" /> Pachete de mentenanta
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#64748B' }}>Sabloane pe care le atribui clientilor cand creezi un abonament.</p>
        </div>
        {canManage && <Button leftIcon={<Plus size={15} />} onClick={() => setEditing('new')}>Pachet nou</Button>}
      </div>

      {loading ? (
        <div style={{ padding: 48, textAlign: 'center', color: '#64748B' }}><Loader2 size={18} className="animate-spin" style={{ display: 'inline' }} /> Se incarca...</div>
      ) : items.length === 0 ? (
        <div style={{ background: '#fff', border: '1px dashed #E2E8F0', borderRadius: 14, padding: 48, textAlign: 'center', fontFamily: 'var(--font-body)', color: '#64748B' }}>
          Niciun pachet inca. {canManage && 'Creeaza primul pachet de mentenanta.'}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {items.map((p) => (
            <div key={p.id} style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 14, padding: 20, display: 'flex', flexDirection: 'column', opacity: p.is_active ? 1 : 0.6 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: 8 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.05rem', color: '#0F172A' }}>{p.name}</div>
                  {!p.is_active && <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 700, color: '#B45309', background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 5, padding: '1px 6px' }}>inactiv</span>}
                </div>
                {canManage && (
                  <div style={{ display: 'flex', gap: 2 }}>
                    <Button variant="ghost" size="icon-sm" onClick={() => setEditing(p)} title="Editeaza"><Pencil size={14} /></Button>
                    <Button variant="ghost" size="icon-sm" disabled={busyId === p.id} onClick={() => remove(p)} className="text-red-400 hover:text-red-600 hover:bg-red-50"><Trash2 size={14} /></Button>
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 10 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.4rem', color: '#2B8FCC' }}>{fmtMoney(p.price, p.currency)}</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#94A3B8' }}>/ {CYCLE_LABEL[p.billing_cycle]}</span>
              </div>
              {p.description && <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#64748B', lineHeight: 1.5, marginBottom: 12 }}>{p.description}</p>}
              {p.features.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
                  {p.features.map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#334155' }}>
                      <Check size={14} color="#15803D" style={{ flexShrink: 0 }} /> {f}
                    </div>
                  ))}
                </div>
              )}
              <div style={{ marginTop: 'auto', paddingTop: 10, borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#94A3B8' }}>
                <CircleDot size={13} /> {p.usage_count ?? 0} abonament{(p.usage_count ?? 0) === 1 ? '' : 'e'}
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.45)', zIndex: 100, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '40px 16px', overflowY: 'auto' }} onClick={() => !saving && setEditing(null)}>
          <div style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 560, padding: 28 }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: '#0F172A' }}>{editing === 'new' ? 'Pachet nou' : 'Editeaza pachet'}</h2>
              <button onClick={() => !saving && setEditing(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: 4 }}><X size={20} /></button>
            </div>
            <PackageForm initial={editing === 'new' ? null : editing} submitting={saving} onSubmit={save} onCancel={() => setEditing(null)} />
          </div>
        </div>
      )}
    </div>
  );
}
