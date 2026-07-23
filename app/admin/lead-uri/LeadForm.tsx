'use client';

import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import type { CrmLead, Member } from '@/types/crm';

/**
 * Structura completa a valorilor lead-ului. Formularul AFISEAZA doar campurile
 * relevante (nume, telefon, email, sursa, status, alocat, note), dar pastreaza
 * restul in state — asa incat la editare nu se pierd (ex. motiv pierdere, valoare
 * de la lead-uri venite din platforme).
 */
export interface LeadFormValues {
  name: string; company: string; email: string; phone: string;
  status: string; platform: string; source: string; campaign: string;
  estimated_value: string; currency: string; assigned_to: string; lost_reason: string; notes: string;
}

const s = (v: string | null | undefined) => v ?? '';

export function toLeadFormValues(l?: Partial<CrmLead> | null): LeadFormValues {
  return {
    name: s(l?.name), company: s(l?.company), email: s(l?.email), phone: s(l?.phone),
    status: l?.status ?? 'nou', platform: s(l?.platform), source: s(l?.source), campaign: s(l?.campaign),
    estimated_value: l?.estimated_value != null ? String(l.estimated_value) : '',
    currency: l?.currency ?? 'RON', assigned_to: s(l?.assigned_to), lost_reason: s(l?.lost_reason), notes: s(l?.notes),
  };
}

const inp: React.CSSProperties = {
  width: '100%', height: 40, border: '1px solid #E2E8F0', borderRadius: 8,
  padding: '0 12px', fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#0F172A',
  background: '#fff', outline: 'none', boxSizing: 'border-box',
};
const lbl: React.CSSProperties = { display: 'block', marginBottom: 6, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.8rem', color: '#374151' };

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label style={lbl}>{label}</label>{children}</div>;
}

export function LeadForm({ initial, members, canAssign, submitting, submitLabel, onSubmit, onCancel }: {
  initial?: Partial<CrmLead> | null;
  members: Member[];
  canAssign: boolean;
  submitting: boolean;
  submitLabel: string;
  onSubmit: (values: LeadFormValues) => void;
  onCancel?: () => void;
}) {
  const [v, setV] = useState<LeadFormValues>(() => toLeadFormValues(initial));
  const set = (k: keyof LeadFormValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setV((p) => ({ ...p, [k]: e.target.value }));

  function submit(e: FormEvent) { e.preventDefault(); onSubmit(v); }
  const grid2: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 };

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Field label="Nume complet"><input style={inp} value={v.name} onChange={set('name')} placeholder="Ion Popescu" /></Field>

      <div style={grid2}>
        <Field label="Telefon"><input style={inp} type="tel" value={v.phone} onChange={set('phone')} placeholder="07xx xxx xxx" /></Field>
        <Field label="Email"><input style={inp} type="email" value={v.email} onChange={set('email')} placeholder="email@exemplu.ro" /></Field>
      </div>

      <div style={grid2}>
        <Field label="Sursa">
          <select style={{ ...inp, cursor: 'pointer' }} value={v.platform} onChange={set('platform')}>
            <option value="">— Nespecificat —</option>
            <option value="meta">Meta</option>
            <option value="google">Google</option>
            <option value="tiktok">TikTok</option>
            <option value="website">Website</option>
            <option value="manual">Manual</option>
          </select>
        </Field>
        <Field label="Status">
          <select style={{ ...inp, cursor: 'pointer' }} value={v.status} onChange={set('status')}>
            <option value="nou">Nou</option>
            <option value="necalificat">Necalificat</option>
            <option value="calificat">Calificat</option>
            <option value="convertit">Convertit</option>
            <option value="edinio">Catre Edinio</option>
            <option value="pierdut">Pierdut</option>
          </select>
        </Field>
      </div>

      {canAssign && (
        <Field label="Alocat catre">
          <select style={{ ...inp, cursor: 'pointer' }} value={v.assigned_to} onChange={set('assigned_to')}>
            <option value="">— Nealocat —</option>
            {members.map((m) => <option key={m.id} value={m.id}>{m.full_name || m.email}</option>)}
          </select>
        </Field>
      )}

      <Field label="Note">
        <textarea value={v.notes} onChange={set('notes')} rows={3}
          style={{ ...inp, height: 'auto', padding: '10px 12px', resize: 'vertical', lineHeight: 1.6 }} placeholder="Detalii despre lead, context, ce s-a discutat..." />
      </Field>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
        {onCancel && <Button type="button" variant="outline" onClick={onCancel}>Anuleaza</Button>}
        <Button type="submit" loading={submitting}>{submitLabel}</Button>
      </div>
    </form>
  );
}
