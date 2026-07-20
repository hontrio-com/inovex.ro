'use client';

import { useState, useEffect, FormEvent } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { CrmSubscription } from '@/types/crm';

export interface SubFormValues {
  client_id: string; name: string; status: string; price: string; currency: string;
  billing_cycle: string; start_date: string; next_renewal_date: string; notes: string;
}

const s = (v: string | null | undefined) => v ?? '';

export function toSubValues(sub?: Partial<CrmSubscription> | null, fixedClientId?: string): SubFormValues {
  return {
    client_id: fixedClientId ?? s(sub?.client_id),
    name: s(sub?.name),
    status: sub?.status ?? 'activ',
    price: sub?.price != null ? String(sub.price) : '',
    currency: sub?.currency ?? 'RON',
    billing_cycle: sub?.billing_cycle ?? 'lunar',
    start_date: s(sub?.start_date),
    next_renewal_date: s(sub?.next_renewal_date),
    notes: s(sub?.notes),
  };
}

const inp: React.CSSProperties = { width: '100%', height: 40, border: '1px solid #E2E8F0', borderRadius: 8, padding: '0 12px', fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#0F172A', background: '#fff', outline: 'none', boxSizing: 'border-box' };
const lbl: React.CSSProperties = { display: 'block', marginBottom: 6, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.8rem', color: '#374151' };

export function SubscriptionForm({ initial, fixedClientId, fixedClientName, submitting, submitLabel, onSubmit, onCancel }: {
  initial?: Partial<CrmSubscription> | null;
  fixedClientId?: string;
  fixedClientName?: string;
  submitting: boolean;
  submitLabel: string;
  onSubmit: (v: SubFormValues) => void;
  onCancel?: () => void;
}) {
  const [v, setV] = useState<SubFormValues>(() => toSubValues(initial, fixedClientId));
  const set = (k: keyof SubFormValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setV((p) => ({ ...p, [k]: e.target.value }));

  // Client picker (doar cand nu e fixat)
  const [clientQ, setClientQ] = useState('');
  const [clientName, setClientName] = useState(fixedClientName ?? (initial?.client?.name ?? ''));
  const [results, setResults] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    if (fixedClientId || v.client_id) return;
    const t = setTimeout(() => {
      const p = new URLSearchParams({ perPage: '8' });
      if (clientQ) p.set('q', clientQ);
      fetch(`/api/admin/clienti?${p.toString()}`).then((r) => r.json()).then((j) => setResults((j.items ?? []).map((c: { id: string; name: string }) => ({ id: c.id, name: c.name })))).catch(() => {});
    }, 250);
    return () => clearTimeout(t);
  }, [clientQ, v.client_id, fixedClientId]);

  function submit(e: FormEvent) { e.preventDefault(); onSubmit(v); }
  const grid2: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 };

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {!fixedClientId && (
        <div>
          <label style={lbl}>Client *</label>
          {v.client_id ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', ...inp, height: 40, lineHeight: '40px' }}>
              <span style={{ fontSize: '0.875rem' }}>{clientName}</span>
              <button type="button" onClick={() => { setV((p) => ({ ...p, client_id: '' })); setClientName(''); setClientQ(''); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}><X size={15} /></button>
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
      )}

      <div style={grid2}>
        <div><label style={lbl}>Nume abonament *</label><input style={inp} value={v.name} onChange={set('name')} placeholder="Mentenanta website" /></div>
        <div>
          <label style={lbl}>Status</label>
          <select style={{ ...inp, cursor: 'pointer' }} value={v.status} onChange={set('status')}>
            <option value="activ">Activ</option>
            <option value="suspendat">Suspendat</option>
            <option value="anulat">Anulat</option>
          </select>
        </div>
        <div><label style={lbl}>Pret</label><input style={inp} type="number" min="0" step="0.01" value={v.price} onChange={set('price')} placeholder="0" /></div>
        <div>
          <label style={lbl}>Ciclu facturare</label>
          <select style={{ ...inp, cursor: 'pointer' }} value={v.billing_cycle} onChange={set('billing_cycle')}>
            <option value="lunar">Lunar</option>
            <option value="trimestrial">Trimestrial</option>
            <option value="anual">Anual</option>
          </select>
        </div>
        <div><label style={lbl}>Data start</label><input style={inp} type="date" value={v.start_date} onChange={set('start_date')} /></div>
        <div><label style={lbl}>Urmatoarea reinnoire</label><input style={inp} type="date" value={v.next_renewal_date} onChange={set('next_renewal_date')} /></div>
      </div>
      <div><label style={lbl}>Note</label><textarea value={v.notes} onChange={set('notes')} rows={2} style={{ ...inp, height: 'auto', padding: '10px 12px', resize: 'vertical' }} /></div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 4 }}>
        {onCancel && <Button type="button" variant="outline" onClick={onCancel}>Anuleaza</Button>}
        <Button type="submit" loading={submitting}>{submitLabel}</Button>
      </div>
    </form>
  );
}
