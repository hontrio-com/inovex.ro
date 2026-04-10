'use client';

import { useEffect, useState } from 'react';
import {
  A, Field, Inp, Textarea, Sel, SaveBar, AdminHeader, ImageField,
} from '@/app/admin/_components/AdminPage';
import { Plus, Edit2, Trash2, X, Check } from 'lucide-react';

type Testimonial = {
  id: string;
  clientName: string;
  clientRole: string;
  company: string;
  rating: number;
  quote: string;
};

const EMPTY = (): Testimonial => ({
  id: Date.now().toString(),
  clientName: '',
  clientRole: '',
  company: '',
  rating: 5,
  quote: '',
});

const RATING_OPTIONS = [1, 2, 3, 4, 5].map((n) => ({ value: String(n), label: '★'.repeat(n) + ' - ' + n }));

export default function TestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Testimonial | null>(null);

  useEffect(() => {
    fetch('/api/admin/generic/testimonials')
      .then((r) => r.json())
      .then((d) => setItems(d))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    try {
      await fetch('/api/admin/generic/testimonials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(items),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  }

  function startEdit(item: Testimonial) {
    setEditId(item.id);
    setDraft({ ...item });
  }

  function cancelEdit() {
    setEditId(null);
    setDraft(null);
  }

  function commitEdit() {
    if (!draft) return;
    setItems((prev) => prev.map((it) => (it.id === draft.id ? draft : it)));
    setEditId(null);
    setDraft(null);
  }

  function addNew() {
    const item = EMPTY();
    setItems((prev) => [...prev, item]);
    startEdit(item);
  }

  function removeItem(id: string) {
    if (editId === id) cancelEdit();
    setItems((prev) => prev.filter((it) => it.id !== id));
  }

  function patchDraft<K extends keyof Testimonial>(key: K, val: Testimonial[K]) {
    setDraft((d) => d ? { ...d, [key]: val } : d);
  }

  if (loading) {
    return (
      <div style={{ padding: 32, fontFamily: 'var(--font-body)', color: '#64748B' }}>
        Se incarca...
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <SaveBar saving={saving} onSave={handleSave} saved={saved} />

      <AdminHeader
        title="Testimoniale"
        desc="Gestioneaza recenziile clientilor afisate pe site."
        action={
          <button style={A.btnPrimary} onClick={addNew}>
            <Plus size={15} />
            Testimonial nou
          </button>
        }
      />

      <div style={{ padding: '0 32px 40px' }}>
        {items.length === 0 && (
          <div style={{
            textAlign: 'center', padding: '60px 0',
            fontFamily: 'var(--font-body)', color: '#94A3B8', fontSize: '0.9rem',
          }}>
            Niciun testimonial. Apasa &quot;Testimonial nou&quot; pentru a adauga.
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {/* Table header */}
          {items.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 80px 120px',
              gap: 12,
              padding: '10px 16px',
              background: '#F1F5F9',
              borderRadius: '10px 10px 0 0',
              border: '1px solid #E2E8F0',
              borderBottom: 'none',
            }}>
              {['Client', 'Rol', 'Companie', 'Rating', 'Actiuni'].map((h) => (
                <span key={h} style={{
                  fontFamily: 'var(--font-body)', fontWeight: 700,
                  fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em',
                }}>{h}</span>
              ))}
            </div>
          )}

          {items.map((item, idx) => (
            <div key={item.id} style={{ border: '1px solid #E2E8F0', borderTop: idx === 0 ? '1px solid #E2E8F0' : 'none', background: '#fff', borderRadius: idx === items.length - 1 ? '0 0 10px 10px' : 0 }}>
              {/* Row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 80px 120px',
                gap: 12,
                padding: '14px 16px',
                alignItems: 'center',
              }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#0F172A', fontWeight: 600 }}>
                  {item.clientName || <span style={{ color: '#CBD5E1' }}>-</span>}
                </span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#64748B' }}>
                  {item.clientRole || <span style={{ color: '#CBD5E1' }}>-</span>}
                </span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#64748B' }}>
                  {item.company || <span style={{ color: '#CBD5E1' }}>-</span>}
                </span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#F59E0B' }}>
                  {'★'.repeat(item.rating)}
                </span>
                <div style={{ display: 'flex', gap: 6 }}>
                  {editId === item.id ? (
                    <>
                      <button
                        onClick={commitEdit}
                        style={{ ...A.btnDanger, background: '#ECFDF5', color: '#10B981', border: '1px solid #A7F3D0' }}
                        title="Confirma"
                      >
                        <Check size={13} />
                      </button>
                      <button onClick={cancelEdit} style={A.btnDanger} title="Anuleaza">
                        <X size={13} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit(item)}
                        style={{ ...A.btnDanger, background: '#EFF6FF', color: '#2B8FCC', border: '1px solid #BFDBFE' }}
                        title="Editeaza"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button onClick={() => removeItem(item.id)} style={A.btnDanger} title="Sterge">
                        <Trash2 size={13} />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Inline edit form */}
              {editId === item.id && draft && (
                <div style={{
                  padding: '20px 16px 20px',
                  borderTop: '1px solid #E2E8F0',
                  background: '#FAFBFF',
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 16 }}>
                    <Field label="Nume client">
                      <Inp value={draft.clientName} onChange={(v) => patchDraft('clientName', v)} placeholder="ex: Ion Popescu" />
                    </Field>
                    <Field label="Rol / Functie">
                      <Inp value={draft.clientRole} onChange={(v) => patchDraft('clientRole', v)} placeholder="ex: CEO" />
                    </Field>
                    <Field label="Companie">
                      <Inp value={draft.company} onChange={(v) => patchDraft('company', v)} placeholder="ex: Acme SRL" />
                    </Field>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 16 }}>
                    <Field label="Rating (1–5 stele)">
                      <Sel
                        value={String(draft.rating)}
                        onChange={(v) => patchDraft('rating', Number(v))}
                        options={RATING_OPTIONS}
                      />
                    </Field>
                    <Field label="Citat / Recenzie">
                      <Textarea value={draft.quote} onChange={(v) => patchDraft('quote', v)} placeholder="Ce a spus clientul..." rows={3} />
                    </Field>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 16 }}>
                    <button onClick={cancelEdit} style={A.btnOutline}>
                      <X size={14} /> Anuleaza
                    </button>
                    <button onClick={commitEdit} style={{ ...A.btnPrimary, background: '#10B981' }}>
                      <Check size={14} /> Confirma editarea
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
