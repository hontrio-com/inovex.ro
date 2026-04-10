'use client';

import { useEffect, useState } from 'react';
import {
  A, Field, Inp, Textarea, Sel, SaveBar, AdminHeader, ImageField,
} from '@/app/admin/_components/AdminPage';
import { Plus, Edit2, Trash2, X, Check, ChevronDown, ChevronUp } from 'lucide-react';

type PortfolioItem = {
  id: string;
  titlu: string;
  categorie: string;
  descriere: string;
  tags: string[];
  link: string;
  imagine: string;
  accentColor: string;
};

const EMPTY = (): PortfolioItem => ({
  id: Date.now().toString(),
  titlu: '',
  categorie: '',
  descriere: '',
  tags: [],
  link: '',
  imagine: '',
  accentColor: '#2B8FCC',
});

const CATEGORIE_OPTIONS = [
  { value: '', label: '- Selecteaza categorie -' },
  { value: 'Web Design', label: 'Web Design' },
  { value: 'E-commerce', label: 'E-commerce' },
  { value: 'Branding', label: 'Branding' },
  { value: 'SEO', label: 'SEO' },
  { value: 'App', label: 'App' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Altele', label: 'Altele' },
];

export default function PortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, PortfolioItem>>({});

  useEffect(() => {
    fetch('/api/admin/generic/portfolio')
      .then((r) => r.json())
      .then((d: PortfolioItem[]) => setItems(d))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    // Commit any open draft first
    if (expandedId && drafts[expandedId]) {
      commitDraft(expandedId);
    }
    setSaving(true);
    setSaved(false);
    try {
      await fetch('/api/admin/generic/portfolio', {
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

  function toggleExpand(item: PortfolioItem) {
    if (expandedId === item.id) {
      setExpandedId(null);
    } else {
      setExpandedId(item.id);
      setDrafts((prev) => ({ ...prev, [item.id]: { ...item } }));
    }
  }

  function patchDraft(id: string, key: keyof PortfolioItem, val: PortfolioItem[keyof PortfolioItem]) {
    setDrafts((prev) => ({ ...prev, [id]: { ...prev[id], [key]: val } }));
  }

  function commitDraft(id: string) {
    const d = drafts[id];
    if (!d) return;
    setItems((prev) => prev.map((it) => it.id === id ? d : it));
    setExpandedId(null);
  }

  function cancelDraft(id: string) {
    setDrafts((prev) => { const c = { ...prev }; delete c[id]; return c; });
    setExpandedId(null);
  }

  function addNew() {
    const item = EMPTY();
    setItems((prev) => [...prev, item]);
    setExpandedId(item.id);
    setDrafts((prev) => ({ ...prev, [item.id]: { ...item } }));
  }

  function removeItem(id: string) {
    if (expandedId === id) setExpandedId(null);
    setItems((prev) => prev.filter((it) => it.id !== id));
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
        title="Portofoliu"
        desc="Proiectele afisate in sectiunea de portofoliu a site-ului."
        action={
          <button style={A.btnPrimary} onClick={addNew}>
            <Plus size={15} />
            Proiect nou
          </button>
        }
      />

      <div style={{ padding: '0 32px 40px' }}>
        {items.length === 0 && (
          <div style={{
            textAlign: 'center', padding: '60px 0',
            fontFamily: 'var(--font-body)', color: '#94A3B8', fontSize: '0.9rem',
          }}>
            Niciun proiect adaugat. Apasa &quot;Proiect nou&quot; pentru a incepe.
          </div>
        )}

        {/* Responsive grid */}
        <div className="portfolio-grid" style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {items.map((item) => {
            const isOpen = expandedId === item.id;
            const d = drafts[item.id] ?? item;

            return (
              <div
                key={item.id}
                style={{
                  border: isOpen ? '2px solid #2B8FCC' : '1px solid #E2E8F0',
                  borderRadius: 12,
                  overflow: 'hidden',
                  background: '#fff',
                  gridColumn: isOpen ? '1 / -1' : undefined,
                  transition: 'border-color 150ms ease',
                }}
              >
                {/* Card header */}
                <div
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '0 14px',
                    cursor: 'pointer',
                    borderBottom: isOpen ? '1px solid #E2E8F0' : 'none',
                    minHeight: 70,
                  }}
                  onClick={() => toggleExpand(item)}
                >
                  {/* Accent color swatch */}
                  <div style={{
                    width: 10, height: 44, borderRadius: 5, flexShrink: 0,
                    background: item.accentColor || '#2B8FCC',
                  }} />

                  {/* Thumbnail */}
                  {item.imagine && (
                    <div style={{ width: 48, height: 36, borderRadius: 6, overflow: 'hidden', flexShrink: 0, border: '1px solid #E2E8F0' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.imagine} alt={item.titlu} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.875rem', color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.titlu || <span style={{ color: '#CBD5E1', fontWeight: 400 }}>Proiect nedenumit</span>}
                    </div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#64748B', marginTop: 2 }}>
                      {item.categorie || '-'}
                    </div>
                    {item.tags.length > 0 && (
                      <div style={{ display: 'flex', gap: 4, marginTop: 4, flexWrap: 'wrap' }}>
                        {item.tags.slice(0, 3).map((tag) => (
                          <span key={tag} style={{
                            fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 600,
                            padding: '2px 7px', borderRadius: 20,
                            background: '#EFF6FF', color: '#2B8FCC',
                          }}>{tag}</span>
                        ))}
                        {item.tags.length > 3 && (
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: '#94A3B8' }}>
                            +{item.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                    {isOpen ? <ChevronUp size={14} color="#94A3B8" /> : <ChevronDown size={14} color="#94A3B8" />}
                    <button
                      onClick={(e) => { e.stopPropagation(); removeItem(item.id); }}
                      style={A.btnDanger}
                      title="Sterge"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                {/* Edit form */}
                {isOpen && (
                  <div style={{ padding: 20 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 16 }}>
                      <Field label="Titlu proiect">
                        <Inp value={d.titlu} onChange={(v) => patchDraft(item.id, 'titlu', v)} placeholder="ex: Site prezentare X" />
                      </Field>
                      <Field label="Categorie">
                        <Sel value={d.categorie} onChange={(v) => patchDraft(item.id, 'categorie', v)} options={CATEGORIE_OPTIONS} />
                      </Field>
                      <Field label="Link proiect">
                        <Inp value={d.link} onChange={(v) => patchDraft(item.id, 'link', v)} placeholder="https://..." />
                      </Field>
                    </div>

                    <div style={{ marginBottom: 16 }}>
                      <Field label="Descriere">
                        <Textarea value={d.descriere} onChange={(v) => patchDraft(item.id, 'descriere', v)} placeholder="Scurta descriere a proiectului..." rows={3} />
                      </Field>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 180px', gap: 16, marginBottom: 16 }}>
                      <Field label="Taguri (separate prin virgula)">
                        <Inp
                          value={d.tags.join(', ')}
                          onChange={(v) => patchDraft(item.id, 'tags', v.split(',').map((t) => t.trim()).filter(Boolean))}
                          placeholder="ex: React, Next.js, Tailwind"
                        />
                      </Field>
                      <div>
                        <label style={A.label}>Culoare accent</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <input
                            type="color"
                            value={d.accentColor || '#2B8FCC'}
                            onChange={(e) => patchDraft(item.id, 'accentColor', e.target.value)}
                            style={{
                              width: 42, height: 42, padding: 3,
                              border: '1px solid #E2E8F0', borderRadius: 8,
                              cursor: 'pointer', background: '#fff',
                            }}
                          />
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: '#64748B' }}>
                            {d.accentColor || '#2B8FCC'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div style={{ marginBottom: 20 }}>
                      <ImageField
                        value={d.imagine}
                        onChange={(url) => patchDraft(item.id, 'imagine', url)}
                        dir="portofoliu"
                        label="Imagine proiect"
                      />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                      <button onClick={() => cancelDraft(item.id)} style={A.btnOutline}>
                        <X size={14} /> Anuleaza
                      </button>
                      <button onClick={() => commitDraft(item.id)} style={{ ...A.btnPrimary, background: '#10B981' }}>
                        <Check size={14} /> Aplica modificarile
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {items.length > 0 && (
          <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
            <button style={{ ...A.btnOutline, gap: 8 }} onClick={addNew}>
              <Plus size={14} />
              Adauga proiect nou
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
