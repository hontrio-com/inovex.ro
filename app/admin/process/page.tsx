'use client';

import { useEffect, useState } from 'react';
import {
  A, Field, Inp, Textarea, Sel, SaveBar, AdminHeader,
} from '@/app/admin/_components/AdminPage';
import { Plus, Trash2, ChevronDown, ChevronUp, GripVertical } from 'lucide-react';

type ProcessStep = {
  id: string;
  numar: string;
  iconName: string;
  titlu: string;
  descriere: string;
};

const EMPTY = (): ProcessStep => ({
  id: Date.now().toString(),
  numar: '',
  iconName: 'MessageSquare',
  titlu: '',
  descriere: '',
});

const ICON_OPTIONS = [
  'MessageSquare', 'FileText', 'Layers', 'Code2', 'Rocket',
  'Settings', 'Zap', 'Star', 'Check',
].map((name) => ({ value: name, label: name }));

// Icon preview map (SVG paths)
const ICON_GLYPHS: Record<string, React.ReactNode> = {
  MessageSquare: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  FileText: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  Layers: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  Code2: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  Rocket: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  ),
  Settings: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  Zap: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Star: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Check: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
};

export default function ProcessPage() {
  const [items, setItems] = useState<ProcessStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch('/api/admin/generic/process')
      .then((r) => r.json())
      .then((d: ProcessStep[]) => {
        setItems(d);
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
      await fetch('/api/admin/generic/process', {
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
    const num = items.length + 1;
    item.numar = String(num).padStart(2, '0');
    setItems((prev) => [...prev, item]);
    setCollapsed((prev) => ({ ...prev, [item.id]: false }));
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }

  function patch(id: string, key: keyof ProcessStep, val: string) {
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
        title="Procesul nostru"
        desc="Pasii procesului de lucru afisati pe site."
        action={
          <button style={A.btnPrimary} onClick={addNew}>
            <Plus size={15} />
            Pas nou
          </button>
        }
      />

      <div style={{ padding: '0 32px 40px' }}>
        {items.length === 0 && (
          <div style={{
            textAlign: 'center', padding: '60px 0',
            fontFamily: 'var(--font-body)', color: '#94A3B8', fontSize: '0.9rem',
          }}>
            Niciun pas adaugat. Apasa &quot;Pas nou&quot; pentru a incepe.
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {items.map((item) => {
            const isCollapsed = collapsed[item.id] ?? true;

            return (
              <div
                key={item.id}
                style={{
                  border: '1px solid #E2E8F0', borderRadius: 12,
                  overflow: 'hidden', background: '#fff',
                }}
              >
                {/* Card header */}
                <div
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '14px 16px',
                    background: isCollapsed ? '#fff' : '#F8FAFC',
                    borderBottom: isCollapsed ? 'none' : '1px solid #E2E8F0',
                    cursor: 'pointer',
                    userSelect: 'none',
                  }}
                  onClick={() => toggleCollapse(item.id)}
                >
                  <GripVertical size={14} color="#CBD5E1" style={{ flexShrink: 0 }} />

                  {/* Icon badge */}
                  <div style={{
                    width: 36, height: 36, borderRadius: 8,
                    background: '#EFF6FF', color: '#2B8FCC',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    {ICON_GLYPHS[item.iconName] ?? ICON_GLYPHS['Check']}
                  </div>

                  {/* Number */}
                  <span style={{
                    fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem',
                    color: '#E2E8F0', letterSpacing: '-0.02em', flexShrink: 0, width: 36,
                  }}>
                    {item.numar || '?'}
                  </span>

                  {/* Title */}
                  <span style={{
                    flex: 1, fontFamily: 'var(--font-body)', fontWeight: 600,
                    fontSize: '0.875rem', color: '#0F172A',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {item.titlu || <span style={{ color: '#CBD5E1', fontWeight: 400 }}>Pas nedenumit...</span>}
                  </span>

                  {/* Icon name tag */}
                  <span style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: '#94A3B8',
                    background: '#F1F5F9', padding: '3px 8px', borderRadius: 20,
                    flexShrink: 0,
                  }}>
                    {item.iconName}
                  </span>

                  {isCollapsed ? <ChevronDown size={14} color="#94A3B8" /> : <ChevronUp size={14} color="#94A3B8" />}

                  <button
                    onClick={(e) => { e.stopPropagation(); removeItem(item.id); }}
                    style={A.btnDanger}
                    title="Sterge"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>

                {/* Edit form */}
                {!isCollapsed && (
                  <div style={{ padding: 20 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr 200px', gap: 16, marginBottom: 16 }}>
                      <Field label="Numar pas">
                        <Inp value={item.numar} onChange={(v) => patch(item.id, 'numar', v)} placeholder="01" />
                      </Field>
                      <Field label="Titlu pas">
                        <Inp value={item.titlu} onChange={(v) => patch(item.id, 'titlu', v)} placeholder="ex: Consultatie initiala" />
                      </Field>
                      <Field label="Icon">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{
                            width: 42, height: 42, borderRadius: 8,
                            background: '#EFF6FF', color: '#2B8FCC',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            flexShrink: 0, border: '1px solid #BFDBFE',
                          }}>
                            {ICON_GLYPHS[item.iconName] ?? ICON_GLYPHS['Check']}
                          </div>
                          <Sel
                            value={item.iconName}
                            onChange={(v) => patch(item.id, 'iconName', v)}
                            options={ICON_OPTIONS}
                          />
                        </div>
                      </Field>
                    </div>
                    <Field label="Descriere">
                      <Textarea
                        value={item.descriere}
                        onChange={(v) => patch(item.id, 'descriere', v)}
                        placeholder="Descrie ce se intampla in aceasta etapa..."
                        rows={3}
                      />
                    </Field>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {items.length > 0 && (
          <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center' }}>
            <button style={{ ...A.btnOutline, gap: 8 }} onClick={addNew}>
              <Plus size={14} />
              Adauga un pas
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
