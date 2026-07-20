'use client';

import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import type { CrmLead, Member } from '@/types/crm';

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
const sectionTitle: React.CSSProperties = { fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#94A3B8', margin: '4px 0 12px' };

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
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <section>
        <div style={sectionTitle}>Contact</div>
        <div style={grid2}>
          <Field label="Nume persoana"><input style={inp} value={v.name} onChange={set('name')} placeholder="Ion Popescu" /></Field>
          <Field label="Companie"><input style={inp} value={v.company} onChange={set('company')} placeholder="SC Exemplu SRL" /></Field>
          <Field label="Email"><input style={inp} type="email" value={v.email} onChange={set('email')} /></Field>
          <Field label="Telefon"><input style={inp} value={v.phone} onChange={set('phone')} /></Field>
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: '#94A3B8', marginTop: 8 }}>Completeaza cel putin numele sau compania.</p>
      </section>

      <section>
        <div style={sectionTitle}>Sursa & valoare</div>
        <div style={grid2}>
          <Field label="Platforma">
            <select style={{ ...inp, cursor: 'pointer' }} value={v.platform} onChange={set('platform')}>
              <option value="">— Nespecificat —</option>
              <option value="meta">Meta</option>
              <option value="google">Google</option>
              <option value="tiktok">TikTok</option>
              <option value="website">Website</option>
              <option value="manual">Manual</option>
            </select>
          </Field>
          <Field label="Campanie"><input style={inp} value={v.campaign} onChange={set('campaign')} placeholder="Nume campanie" /></Field>
          <Field label="Sursa"><input style={inp} value={v.source} onChange={set('source')} placeholder="recomandare / eveniment..." /></Field>
          <Field label="Valoare estimata (RON)"><input style={inp} type="number" min="0" step="1" value={v.estimated_value} onChange={set('estimated_value')} placeholder="0" /></Field>
        </div>
      </section>

      <section>
        <div style={sectionTitle}>Pipeline</div>
        <div style={grid2}>
          <Field label="Status">
            <select style={{ ...inp, cursor: 'pointer' }} value={v.status} onChange={set('status')}>
              <option value="nou">Nou</option>
              <option value="contactat">Contactat</option>
              <option value="calificat">Calificat</option>
              <option value="oferta_trimisa">Oferta trimisa</option>
              <option value="castigat">Castigat</option>
              <option value="pierdut">Pierdut</option>
            </select>
          </Field>
          {canAssign && (
            <Field label="Alocat catre">
              <select style={{ ...inp, cursor: 'pointer' }} value={v.assigned_to} onChange={set('assigned_to')}>
                <option value="">— Nealocat —</option>
                {members.map((m) => <option key={m.id} value={m.id}>{m.full_name || m.email}</option>)}
              </select>
            </Field>
          )}
          {v.status === 'pierdut' && (
            <Field label="Motiv pierdere"><input style={inp} value={v.lost_reason} onChange={set('lost_reason')} placeholder="De ce s-a pierdut lead-ul?" /></Field>
          )}
        </div>
      </section>

      <section>
        <div style={sectionTitle}>Note</div>
        <textarea value={v.notes} onChange={set('notes')} rows={3}
          style={{ ...inp, height: 'auto', padding: '10px 12px', resize: 'vertical', lineHeight: 1.6 }} placeholder="Detalii despre lead..." />
      </section>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
        {onCancel && <Button type="button" variant="outline" onClick={onCancel}>Anuleaza</Button>}
        <Button type="submit" loading={submitting}>{submitLabel}</Button>
      </div>
    </form>
  );
}
