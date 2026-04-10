'use client';

import { useEffect, useState } from 'react';
import { A, Field, Inp, Textarea, SaveBar, AdminHeader, ArrayItem } from '@/app/admin/_components/AdminPage';
import { Plus } from 'lucide-react';

type FaqItem = {
  id: string;
  q: string;
  a: string;
};

const EMPTY = (): FaqItem => ({
  id: Date.now().toString(),
  q: '',
  a: '',
});

export default function FaqPage() {
  const [items, setItems] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch('/api/admin/generic/faq')
      .then((r) => r.json())
      .then((d: FaqItem[]) => {
        setItems(d);
        // Collapse all by default
        const col: Record<string, boolean> = {};
        d.forEach((it) => { col[it.id] = true; });
        setCollapsed(col);
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    try {
      await fetch('/api/admin/generic/faq', {
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

  function addNew() {
    const item = EMPTY();
    setItems((prev) => [...prev, item]);
    setCollapsed((prev) => ({ ...prev, [item.id]: false }));
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((it) => it.id !== id));
    setCollapsed((prev) => { const c = { ...prev }; delete c[id]; return c; });
  }

  function patch(id: string, key: keyof FaqItem, val: string) {
    setItems((prev) => prev.map((it) => it.id === id ? { ...it, [key]: val } : it));
  }

  function toggleCollapse(id: string) {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));
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
        title="Intrebari frecvente (FAQ)"
        desc="Gestioneaza intrebarile si raspunsurile afisate pe site."
        action={
          <button style={A.btnPrimary} onClick={addNew}>
            <Plus size={15} />
            Intrebare noua
          </button>
        }
      />

      <div style={{ padding: '0 32px 40px' }}>
        {items.length === 0 && (
          <div style={{
            textAlign: 'center', padding: '60px 0',
            fontFamily: 'var(--font-body)', color: '#94A3B8', fontSize: '0.9rem',
          }}>
            Nicio intrebare adaugata. Apasa &quot;Intrebare noua&quot; pentru a incepe.
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {items.map((item, index) => (
            <div key={item.id} style={{ border: '1px solid #E2E8F0', borderRadius: 10, overflow: 'hidden', background: '#fff' }}>
              {/* Accordion header */}
              <div
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '12px 16px',
                  background: collapsed[item.id] ? '#fff' : '#F8FAFC',
                  borderBottom: collapsed[item.id] ? 'none' : '1px solid #E2E8F0',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
                onClick={() => toggleCollapse(item.id)}
              >
                {/* Number badge */}
                <span style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 26, height: 26, borderRadius: 6,
                  background: '#EFF6FF', color: '#2B8FCC',
                  fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.75rem',
                  flexShrink: 0,
                }}>
                  {index + 1}
                </span>

                <span style={{
                  flex: 1,
                  fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem', color: '#0F172A',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {item.q || <span style={{ color: '#CBD5E1', fontWeight: 400 }}>Intrebare necompletata...</span>}
                </span>

                <span style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#94A3B8',
                  marginRight: 4,
                }}>
                  {collapsed[item.id] ? 'Editeaza' : 'Restrânge'}
                </span>

                {/* Delete button */}
                <button
                  onClick={(e) => { e.stopPropagation(); removeItem(item.id); }}
                  style={A.btnDanger}
                  title="Sterge"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" />
                  </svg>
                </button>
              </div>

              {/* Expanded form */}
              {!collapsed[item.id] && (
                <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <Field label="Intrebare">
                    <Inp
                      value={item.q}
                      onChange={(v) => patch(item.id, 'q', v)}
                      placeholder="ex: Cat dureaza realizarea unui site?"
                    />
                  </Field>
                  <Field label="Raspuns">
                    <Textarea
                      value={item.a}
                      onChange={(v) => patch(item.id, 'a', v)}
                      placeholder="Raspunsul detaliat la aceasta intrebare..."
                      rows={4}
                    />
                  </Field>
                </div>
              )}
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center' }}>
            <button style={{ ...A.btnOutline, gap: 8 }} onClick={addNew}>
              <Plus size={14} />
              Adauga inca o intrebare
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
