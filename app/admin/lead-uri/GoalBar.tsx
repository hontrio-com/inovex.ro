'use client';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Target, TrendingUp, AlertTriangle, CheckCircle2, Clock, Pencil, X, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { GoalProgress, GoalStatus } from '@/lib/crm/goal';

/**
 * Bara de obiectiv de deasupra pipeline-ului: cate conversii s-au strans, unde
 * ar trebui sa fii azi si daca ritmul actual duce la tinta. Toate cifrele vin
 * calculate din API (lib/crm/goal.ts) — componenta doar le afiseaza.
 */

const STATUS_META: Record<GoalStatus, { color: string; bg: string; icon: React.ElementType }> = {
  atins:     { color: '#15803D', bg: '#F0FDF4', icon: CheckCircle2 },
  inainte:   { color: '#15803D', bg: '#F0FDF4', icon: TrendingUp },
  in_termen: { color: '#2B8FCC', bg: '#EFF6FF', icon: TrendingUp },
  in_urma:   { color: '#D97706', bg: '#FFFBEB', icon: AlertTriangle },
  risc:      { color: '#DC2626', bg: '#FEF2F2', icon: AlertTriangle },
  neinceput: { color: '#64748B', bg: '#F8FAFC', icon: Clock },
  expirat:   { color: '#64748B', bg: '#F8FAFC', icon: Clock },
};

const inp: React.CSSProperties = {
  width: '100%', height: 40, border: '1px solid #E2E8F0', borderRadius: 8, padding: '0 12px',
  fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#0F172A', background: '#fff',
  outline: 'none', boxSizing: 'border-box',
};
const lbl: React.CSSProperties = { display: 'block', marginBottom: 6, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.8rem', color: '#374151' };

interface FormState { title: string; target: string; start_date: string; end_date: string }

export function GoalBar({ canEdit, refreshKey }: { canEdit: boolean; refreshKey: number }) {
  const [progress, setProgress] = useState<GoalProgress | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<FormState>({ title: '', target: '', start_date: '', end_date: '' });

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/goals');
      const json = await res.json();
      if (res.ok) setProgress(json.progress ?? null);
    } catch {
      /* bara de obiectiv nu blocheaza pagina daca pica requestul */
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => { load(); }, [load, refreshKey]);

  function openEditor() {
    const g = progress?.goal;
    const today = new Date().toISOString().slice(0, 10);
    setForm({
      title: g?.title ?? 'Obiectiv clienti convertiti',
      target: g ? String(g.target) : '50',
      start_date: g?.start_date ?? today,
      end_date: g?.end_date ?? today,
    });
    setEditing(true);
  }

  async function submit() {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/goals', {
        method: progress ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Eroare');
      setProgress(json.progress ?? null);
      setEditing(false);
      toast.success('Obiectiv salvat');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Eroare la salvare');
    } finally {
      setSaving(false);
    }
  }

  async function archive() {
    if (!confirm('Renunti la obiectivul curent? Ramane in istoric, dar nu mai apare aici.')) return;
    setSaving(true);
    try {
      const res = await fetch('/api/admin/goals', { method: 'DELETE' });
      if (!res.ok) throw new Error((await res.json()).error ?? 'Eroare');
      setProgress(null);
      setEditing(false);
      toast.success('Obiectiv arhivat');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Eroare');
    } finally {
      setSaving(false);
    }
  }

  // Cat timp nu stim daca exista obiectiv nu desenam nimic, ca sa nu sara layout-ul.
  if (!loaded) return null;

  if (!progress) {
    if (!canEdit) return null;
    return (
      <>
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, padding: '12px 16px', background: '#F8FAFC', border: '1px dashed #CBD5E1', borderRadius: 12 }}>
          <Target size={16} color="#94A3B8" />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#64748B' }}>Niciun obiectiv activ.</span>
          <button onClick={openEditor} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 600, color: '#2B8FCC' }}>
            Seteaza un obiectiv
          </button>
        </div>
        {editing && <Editor form={form} setForm={setForm} saving={saving} onSubmit={submit} onClose={() => setEditing(false)} />}
      </>
    );
  }

  const meta = STATUS_META[progress.status];
  const Icon = meta.icon;
  const fill = Math.min(100, progress.percent * 100);
  const marker = Math.min(100, Math.max(0, progress.percentTime * 100));
  const running = progress.status !== 'neinceput' && progress.status !== 'expirat';

  return (
    <>
      <div style={{ flexShrink: 0, marginBottom: 14, padding: '14px 16px', background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12 }}>
        {/* Rand 1: titlu, cifre, zile ramase */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap', marginBottom: 9 }}>
          <Target size={15} color={meta.color} style={{ alignSelf: 'center', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.85rem', color: '#0F172A' }}>{progress.goal.title}</span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#94A3B8' }}>
            pana pe {new Date(`${progress.goal.end_date}T12:00:00Z`).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
          <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.05rem', color: meta.color }}>
              {progress.done}<span style={{ color: '#94A3B8', fontWeight: 600, fontSize: '0.85rem' }}> / {progress.goal.target}</span>
            </span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#64748B' }}>
              {running ? `${progress.daysLeft} zile ramase` : progress.status === 'expirat' ? 'perioada incheiata' : 'nu a inceput'}
            </span>
            {canEdit && (
              <button onClick={openEditor} title="Editeaza obiectivul" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: 2, display: 'flex' }}>
                <Pencil size={14} />
              </button>
            )}
          </span>
        </div>

        {/* Rand 2: bara + reperul "unde ar trebui sa fii azi" */}
        <div style={{ position: 'relative', height: 9, background: '#F1F5F9', borderRadius: 999, overflow: 'hidden', marginBottom: 9 }}>
          <div style={{ width: `${fill}%`, height: '100%', background: meta.color, borderRadius: 999, transition: 'width 300ms' }} />
          {running && (
            <div title={`Ar trebui sa fii la ${Math.round(progress.expectedByNow)} pana azi`}
              style={{ position: 'absolute', top: -2, bottom: -2, left: `${marker}%`, width: 2, background: '#0F172A', opacity: 0.35 }} />
          )}
        </div>

        {/* Rand 3: verdictul si cifrele din spate */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
          <span style={{ display: 'flex', flexShrink: 0, padding: '2px 6px', borderRadius: 6, background: meta.bg }}>
            <Icon size={14} color={meta.color} />
          </span>
          <div style={{ minWidth: 0 }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 600, color: meta.color }}>{progress.tip}</span>
            {progress.detail && (
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.79rem', color: '#64748B' }}> {progress.detail}</span>
            )}
          </div>
        </div>
      </div>

      {editing && (
        <Editor form={form} setForm={setForm} saving={saving} onSubmit={submit} onClose={() => setEditing(false)} onArchive={archive} />
      )}
    </>
  );
}

function Editor({ form, setForm, saving, onSubmit, onClose, onArchive }: {
  form: FormState;
  setForm: (f: FormState) => void;
  saving: boolean;
  onSubmit: () => void;
  onClose: () => void;
  onArchive?: () => void;
}) {
  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [k]: e.target.value });

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.45)', zIndex: 100, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '60px 16px', overflowY: 'auto' }} onClick={() => !saving && onClose()}>
      <div style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 520, padding: 28 }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: '#0F172A' }}>Obiectiv de conversii</h2>
          <button onClick={() => !saving && onClose()} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: 4 }}><X size={20} /></button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div><label style={lbl}>Titlu</label><input style={inp} value={form.title} onChange={set('title')} placeholder="50 de clienti convertiti" /></div>
          <div><label style={lbl}>Tinta (clienti convertiti)</label><input style={inp} inputMode="numeric" value={form.target} onChange={set('target')} placeholder="50" /></div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
            <div><label style={lbl}>De la</label><input style={{ ...inp, cursor: 'pointer' }} type="date" value={form.start_date} onChange={set('start_date')} /></div>
            <div><label style={lbl}>Pana pe</label><input style={{ ...inp, cursor: 'pointer' }} type="date" value={form.end_date} onChange={set('end_date')} /></div>
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#94A3B8', lineHeight: 1.5 }}>
            Se numara lead-urile care trec pe statusul &laquo;Convertit&raquo; in perioada aleasa, indiferent de suma
            contractului si indiferent daca au fost mutate din Kanban sau convertite in client.
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center' }}>
            {onArchive
              ? <Button type="button" variant="outline" size="sm" onClick={onArchive} disabled={saving} leftIcon={<Trash2 size={14} />}>Renunta</Button>
              : <span />}
            <span style={{ display: 'flex', gap: 10 }}>
              <Button type="button" variant="outline" onClick={onClose} disabled={saving}>Anuleaza</Button>
              <Button type="button" onClick={onSubmit} loading={saving}>Salveaza</Button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
