'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { FileText, Phone, Mail, Users, CheckSquare, RefreshCw, Info, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { CrmActivity, ActivityType, Member } from '@/types/crm';

const ACTIVITY_META: Record<ActivityType, { icon: React.ElementType; label: string; color: string }> = {
  note:          { icon: FileText,    label: 'Nota',      color: '#2B8FCC' },
  call:          { icon: Phone,       label: 'Apel',      color: '#15803D' },
  email:         { icon: Mail,        label: 'Email',     color: '#7C3AED' },
  meeting:       { icon: Users,       label: 'Intalnire', color: '#EA580C' },
  task:          { icon: CheckSquare, label: 'Task',      color: '#0891B2' },
  status_change: { icon: RefreshCw,   label: 'Status',    color: '#64748B' },
  system:        { icon: Info,        label: 'Sistem',    color: '#94A3B8' },
};

const card: React.CSSProperties = { background: '#fff', border: '1px solid #E2E8F0', borderRadius: 14, padding: 24 };

function fmtDateTime(iso: string) {
  return new Date(iso).toLocaleString('ro-RO', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

/**
 * Timeline de activitati reutilizabil (client sau lead).
 * baseUrl = ex. `/api/admin/clienti/<id>` sau `/api/admin/lead-uri/<id>`.
 */
export function ActivityTimeline({ baseUrl, members }: { baseUrl: string; members: Member[] }) {
  const [items, setItems] = useState<CrmActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState<ActivityType>('note');
  const [body, setBody] = useState('');
  const [adding, setAdding] = useState(false);

  const memberName = useCallback((id: string | null) => {
    if (!id) return 'Sistem';
    const m = members.find((x) => x.id === id);
    return m ? (m.full_name || m.email) : '—';
  }, [members]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/activities`);
      const json = await res.json();
      if (res.ok) setItems(json.items ?? []);
    } finally { setLoading(false); }
  }, [baseUrl]);
  useEffect(() => { load(); }, [load]);

  async function add() {
    if (!body.trim()) return;
    setAdding(true);
    try {
      const res = await fetch(`${baseUrl}/activities`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type, body }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Eroare');
      setItems((prev) => [json.activity, ...prev]);
      setBody('');
      toast.success('Activitate adaugata');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Eroare');
    } finally { setAdding(false); }
  }

  const inp: React.CSSProperties = { height: 38, border: '1px solid #E2E8F0', borderRadius: 8, padding: '0 10px', fontFamily: 'var(--font-body)', fontSize: '0.85rem', outline: 'none', background: '#fff' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={card}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
          <select value={type} onChange={(e) => setType(e.target.value as ActivityType)} style={{ ...inp, cursor: 'pointer' }}>
            <option value="note">Nota</option>
            <option value="call">Apel</option>
            <option value="email">Email</option>
            <option value="meeting">Intalnire</option>
            <option value="task">Task</option>
          </select>
        </div>
        <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={2} placeholder="Scrie o nota, un rezumat de apel, un task..."
          style={{ width: '100%', border: '1px solid #E2E8F0', borderRadius: 8, padding: '10px 12px', fontFamily: 'var(--font-body)', fontSize: '0.875rem', resize: 'vertical', outline: 'none', boxSizing: 'border-box', lineHeight: 1.6 }} />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
          <Button onClick={add} loading={adding} disabled={!body.trim()} leftIcon={<Send size={14} />}>Adauga</Button>
        </div>
      </div>

      <div style={card}>
        {loading ? <div style={{ padding: 30, textAlign: 'center', color: '#94A3B8', fontFamily: 'var(--font-body)', fontSize: '0.85rem' }}>Se incarca...</div>
          : items.length === 0 ? <div style={{ padding: 30, textAlign: 'center', color: '#94A3B8', fontFamily: 'var(--font-body)', fontSize: '0.85rem' }}>Nicio activitate inca.</div>
          : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {items.map((a, i) => {
                const meta = ACTIVITY_META[a.type];
                const Icon = meta.icon;
                const last = i === items.length - 1;
                return (
                  <div key={a.id} style={{ display: 'flex', gap: 12, paddingBottom: last ? 0 : 16 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ width: 32, height: 32, borderRadius: 999, background: '#F8FAFC', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={15} color={meta.color} />
                      </div>
                      {!last && <div style={{ width: 1, flex: 1, background: '#E2E8F0', marginTop: 4 }} />}
                    </div>
                    <div style={{ flex: 1, paddingTop: 3 }}>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', flexWrap: 'wrap' }}>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 700, color: meta.color, textTransform: 'uppercase', letterSpacing: '0.03em' }}>{meta.label}</span>
                        {a.title && <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>{a.title}</span>}
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: '#94A3B8', marginLeft: 'auto' }}>{fmtDateTime(a.created_at)}</span>
                      </div>
                      {a.body && <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#475569', marginTop: 3, whiteSpace: 'pre-wrap', lineHeight: 1.55 }}>{a.body}</div>}
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: '#94A3B8', marginTop: 3 }}>{memberName(a.created_by)}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
      </div>
    </div>
  );
}
