'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { FileText, Plus, Trash2, Pencil, ArrowLeft, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RichEditor } from './RichEditor';

interface Template {
  id: string; name: string; description: string | null; content: string; is_active: boolean;
  created_at: string; updated_at: string;
}

const inp: React.CSSProperties = {
  width: '100%', height: 40, border: '1px solid #E2E8F0', borderRadius: 8, padding: '0 12px',
  fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#0F172A', background: '#fff', outline: 'none', boxSizing: 'border-box',
};
const lbl: React.CSSProperties = { display: 'block', marginBottom: 6, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.8rem', color: '#374151' };

const SAMPLE = `<h2>Contract de prestari servicii nr. {{contract_number}}</h2>
<p>Incheiat astazi, {{date}}, intre:</p>
<p><strong>{{company_name}}</strong>, CUI {{company_cui}}, cu sediul in {{company_address}}, reprezentata prin {{company_signer}}, in calitate de Prestator,</p>
<p>si <strong>{{client_name}}</strong>, {{client_type}}, CUI {{client_cui}}, cu sediul in {{client_address}}, in calitate de Beneficiar.</p>
<h3>1. Obiectul contractului</h3>
<p>Prestatorul se obliga sa presteze serviciile convenite, in valoare de {{value}} {{currency}}.</p>
<h3>2. Semnaturi</h3>
<p>Prestator: {{company_signer}}<br/>Beneficiar: {{client_name}}</p>`;

export function SabloaneClient() {
  const [items, setItems] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Template | 'new' | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/contracte/sabloane');
      const json = await res.json();
      if (res.ok) setItems(json.items ?? []);
      else throw new Error(json.error);
    } catch (e) { toast.error(e instanceof Error ? e.message : 'Eroare'); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { load(); }, [load]);

  async function remove(id: string, name: string) {
    if (!confirm(`Stergi sablonul "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/contracte/sabloane/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error((await res.json()).error);
      setItems((prev) => prev.filter((t) => t.id !== id));
      toast.success('Sablon sters');
    } catch (e) { toast.error(e instanceof Error ? e.message : 'Eroare'); }
  }

  if (editing) {
    return <TemplateEditor template={editing === 'new' ? null : editing} onClose={() => setEditing(null)} onSaved={() => { setEditing(null); load(); }} />;
  }

  return (
    <div style={{ padding: '28px 32px' }}>
      <Link href="/admin/contracte" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#64748B', textDecoration: 'none', marginBottom: 14 }}>
        <ArrowLeft size={15} /> Inapoi la contracte
      </Link>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 20 }}>
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.35rem', color: '#0F172A', marginBottom: 4 }}>
            <FileText size={22} color="#2B8FCC" /> Sabloane contracte
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#64748B' }}>Sabloane cu variabile, folosite la generarea contractelor.</p>
        </div>
        <Button leftIcon={<Plus size={15} />} onClick={() => setEditing('new')}>Sablon nou</Button>
      </div>

      <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 14, overflow: 'hidden' }}>
        {loading ? <div style={{ padding: 48, textAlign: 'center', color: '#64748B' }}><Loader2 size={18} className="animate-spin" style={{ display: 'inline' }} /> Se incarca...</div>
          : items.length === 0 ? <div style={{ padding: 48, textAlign: 'center', color: '#64748B', fontFamily: 'var(--font-body)', fontSize: '0.9rem' }}>Niciun sablon. Creeaza primul sablon.</div>
          : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {items.map((t) => (
                <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: '1px solid #F1F5F9' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9rem', color: '#0F172A' }}>
                      {t.name} {!t.is_active && <span style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: 500 }}>(inactiv)</span>}
                    </div>
                    {t.description && <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#94A3B8' }}>{t.description}</div>}
                  </div>
                  <Button variant="outline" size="sm" leftIcon={<Pencil size={14} />} onClick={() => setEditing(t)}>Editeaza</Button>
                  <Button variant="ghost" size="icon-sm" onClick={() => remove(t.id, t.name)} className="text-red-400 hover:text-red-600 hover:bg-red-50"><Trash2 size={15} /></Button>
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  );
}

function TemplateEditor({ template, onClose, onSaved }: { template: Template | null; onClose: () => void; onSaved: () => void }) {
  const [name, setName] = useState(template?.name ?? '');
  const [description, setDescription] = useState(template?.description ?? '');
  const [isActive, setIsActive] = useState(template?.is_active ?? true);
  const [content, setContent] = useState(template?.content ?? SAMPLE);
  const [saving, setSaving] = useState(false);

  async function save() {
    if (!name.trim() || !content.trim()) { toast.error('Nume si continut obligatorii'); return; }
    setSaving(true);
    try {
      const url = template ? `/api/admin/contracte/sabloane/${template.id}` : '/api/admin/contracte/sabloane';
      const res = await fetch(url, {
        method: template ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, content, is_active: isActive }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      toast.success(template ? 'Sablon actualizat' : 'Sablon creat');
      onSaved();
    } catch (e) { toast.error(e instanceof Error ? e.message : 'Eroare'); }
    finally { setSaving(false); }
  }

  return (
    <div style={{ padding: '24px 32px' }}>
      <button onClick={onClose} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#64748B', marginBottom: 14, padding: 0 }}>
        <X size={15} /> Renunta
      </button>
      <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.35rem', color: '#0F172A', marginBottom: 20 }}>{template ? 'Editeaza sablon' : 'Sablon nou'}</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, marginBottom: 16 }}>
        <div><label style={lbl}>Nume sablon *</label><input style={inp} value={name} onChange={(e) => setName(e.target.value)} placeholder="Contract prestari servicii" /></div>
        <div><label style={lbl}>Descriere</label><input style={inp} value={description} onChange={(e) => setDescription(e.target.value)} /></div>
      </div>
      <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#374151', marginBottom: 16, cursor: 'pointer' }}>
        <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} style={{ width: 16, height: 16 }} /> Activ (disponibil la generare)
      </label>

      {/* Editor WYSIWYG */}
      <div style={{ marginBottom: 20 }}>
        <label style={lbl}>Continut contract</label>
        <RichEditor value={content} onChange={setContent} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
        <Button variant="outline" onClick={onClose}>Anuleaza</Button>
        <Button onClick={save} loading={saving}>{template ? 'Salveaza' : 'Creeaza sablon'}</Button>
      </div>
    </div>
  );
}
