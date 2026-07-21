'use client';

import { useState, FormEvent } from 'react';
import { toast } from 'sonner';
import { Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { CrmClient, Member } from '@/types/crm';

export interface ClientFormValues {
  name: string; type: string; status: string; source: string;
  cui: string; reg_com: string; iban: string; bank: string;
  address: string; city: string; county: string; country: string;
  website: string; email: string; phone: string; contact_person: string;
  assigned_to: string; gdpr_consent: boolean; notes: string;
}

const s = (v: string | null | undefined) => v ?? '';

export function toFormValues(c?: Partial<CrmClient> | null): ClientFormValues {
  return {
    name: s(c?.name), type: c?.type ?? 'PJ', status: c?.status ?? 'activ', source: s(c?.source),
    cui: s(c?.cui), reg_com: s(c?.reg_com), iban: s(c?.iban), bank: s(c?.bank),
    address: s(c?.address), city: s(c?.city), county: s(c?.county), country: c?.country ?? 'Romania',
    website: s(c?.website), email: s(c?.email), phone: s(c?.phone), contact_person: s(c?.contact_person),
    assigned_to: s(c?.assigned_to), gdpr_consent: c?.gdpr_consent ?? false, notes: s(c?.notes),
  };
}

const inp: React.CSSProperties = {
  width: '100%', height: 40, border: '1px solid #E2E8F0', borderRadius: 8,
  padding: '0 12px', fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#0F172A',
  background: '#fff', outline: 'none', boxSizing: 'border-box',
};
const lbl: React.CSSProperties = {
  display: 'block', marginBottom: 6, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.8rem', color: '#374151',
};
const sectionTitle: React.CSSProperties = {
  fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.06em',
  textTransform: 'uppercase', color: '#94A3B8', margin: '4px 0 12px',
};

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label style={lbl}>{label} {required && <span style={{ color: '#DC2626' }}>*</span>}</label>
      {children}
    </div>
  );
}

export function ClientForm({ initial, members, canAssign, submitting, submitLabel, onSubmit, onCancel }: {
  initial?: Partial<CrmClient> | null;
  members: Member[];
  canAssign: boolean;
  submitting: boolean;
  submitLabel: string;
  onSubmit: (values: ClientFormValues) => void;
  onCancel?: () => void;
}) {
  const [v, setV] = useState<ClientFormValues>(() => toFormValues(initial));
  const set = (k: keyof ClientFormValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setV((prev) => ({ ...prev, [k]: e.target.value }));

  const [anafLoading, setAnafLoading] = useState(false);
  async function fetchAnaf() {
    const cui = (v.cui || '').replace(/\D/g, '');
    if (cui.length < 2) { toast.error('Introdu mai intai CUI-ul'); return; }
    setAnafLoading(true);
    try {
      const res = await fetch(`/api/admin/anaf?cui=${cui}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Eroare');
      const c = json.company;
      setV((prev) => ({
        ...prev, type: 'PJ',
        name: c.name || prev.name, cui: c.cui || prev.cui, reg_com: c.reg_com || prev.reg_com,
        address: c.address || prev.address, city: c.city || prev.city, county: c.county || prev.county,
        phone: c.phone || prev.phone, iban: c.iban || prev.iban,
      }));
      toast.success('Date preluate de la ANAF');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Eroare la preluarea de la ANAF');
    } finally { setAnafLoading(false); }
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    onSubmit(v);
  }

  const grid2: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 };

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      {/* Date firma */}
      <section>
        <div style={sectionTitle}>Date firma</div>
        <div style={grid2}>
          <Field label="Denumire / Nume" required>
            <input style={inp} value={v.name} onChange={set('name')} required placeholder="SC Exemplu SRL" />
          </Field>
          <Field label="Tip">
            <select style={{ ...inp, cursor: 'pointer' }} value={v.type} onChange={set('type')}>
              <option value="PJ">Persoana juridica (PJ)</option>
              <option value="PF">Persoana fizica (PF)</option>
            </select>
          </Field>
          <Field label="CUI / CIF — completeaza automat de la ANAF">
            <div style={{ display: 'flex', gap: 8 }}>
              <input style={{ ...inp, flex: 1 }} value={v.cui} onChange={set('cui')} placeholder="RO12345678 sau 12345678" />
              <Button type="button" variant="outline" onClick={fetchAnaf} loading={anafLoading} leftIcon={<Building2 size={14} />} style={{ height: 40, flexShrink: 0 }}>Preia</Button>
            </div>
          </Field>
          <Field label="Nr. Reg. Comertului"><input style={inp} value={v.reg_com} onChange={set('reg_com')} placeholder="J40/1234/2020" /></Field>
          <Field label="IBAN"><input style={inp} value={v.iban} onChange={set('iban')} placeholder="RO49 AAAA 1B31..." /></Field>
          <Field label="Banca"><input style={inp} value={v.bank} onChange={set('bank')} /></Field>
        </div>
      </section>

      {/* Contact */}
      <section>
        <div style={sectionTitle}>Contact</div>
        <div style={grid2}>
          <Field label="Persoana de contact"><input style={inp} value={v.contact_person} onChange={set('contact_person')} /></Field>
          <Field label="Email"><input style={inp} type="email" value={v.email} onChange={set('email')} placeholder="contact@firma.ro" /></Field>
          <Field label="Telefon"><input style={inp} value={v.phone} onChange={set('phone')} placeholder="07xx xxx xxx" /></Field>
          <Field label="Website"><input style={inp} value={v.website} onChange={set('website')} placeholder="https://..." /></Field>
        </div>
      </section>

      {/* Adresa */}
      <section>
        <div style={sectionTitle}>Adresa</div>
        <div style={grid2}>
          <Field label="Adresa"><input style={inp} value={v.address} onChange={set('address')} placeholder="Str. ..., nr. ..." /></Field>
          <Field label="Oras"><input style={inp} value={v.city} onChange={set('city')} /></Field>
          <Field label="Judet"><input style={inp} value={v.county} onChange={set('county')} /></Field>
          <Field label="Tara"><input style={inp} value={v.country} onChange={set('country')} /></Field>
        </div>
      </section>

      {/* Clasificare */}
      <section>
        <div style={sectionTitle}>Clasificare</div>
        <div style={grid2}>
          <Field label="Status">
            <select style={{ ...inp, cursor: 'pointer' }} value={v.status} onChange={set('status')}>
              <option value="activ">Activ</option>
              <option value="prospect">Prospect</option>
              <option value="inactiv">Inactiv</option>
            </select>
          </Field>
          <Field label="Sursa"><input style={inp} value={v.source} onChange={set('source')} placeholder="website / recomandare / meta..." /></Field>
          {canAssign && (
            <Field label="Alocat catre">
              <select style={{ ...inp, cursor: 'pointer' }} value={v.assigned_to} onChange={set('assigned_to')}>
                <option value="">— Nealocat —</option>
                {members.map((m) => (
                  <option key={m.id} value={m.id}>{m.full_name || m.email}</option>
                ))}
              </select>
            </Field>
          )}
          <Field label="Consimtamant GDPR">
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, height: 40, fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#374151', cursor: 'pointer' }}>
              <input type="checkbox" checked={v.gdpr_consent} onChange={(e) => setV((p) => ({ ...p, gdpr_consent: e.target.checked }))} style={{ width: 16, height: 16 }} />
              Clientul si-a dat acordul pentru prelucrarea datelor
            </label>
          </Field>
        </div>
      </section>

      {/* Note */}
      <section>
        <div style={sectionTitle}>Note</div>
        <textarea
          value={v.notes} onChange={set('notes')} rows={3}
          style={{ ...inp, height: 'auto', padding: '10px 12px', resize: 'vertical', lineHeight: 1.6 }}
          placeholder="Observatii interne despre client..."
        />
      </section>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
        {onCancel && <Button type="button" variant="outline" onClick={onCancel}>Anuleaza</Button>}
        <Button type="submit" loading={submitting}>{submitLabel}</Button>
      </div>
    </form>
  );
}
