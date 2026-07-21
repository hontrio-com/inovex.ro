'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Target, Plus, Search, Loader2, LayoutGrid, List, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { CrmLead, Member, LeadStatus } from '@/types/crm';
import { LeadForm, LeadFormValues } from './LeadForm';
import { LEAD_COLUMNS, STATUS_LABEL, PLATFORM_META, fmtMoney, fmtDate } from './meta';

const ctrl: React.CSSProperties = {
  height: 38, border: '1px solid #E2E8F0', borderRadius: 8, padding: '0 10px',
  fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#0F172A', background: '#fff', outline: 'none',
};

export function LeadsBoard({ canAssign }: { canAssign: boolean }) {
  const router = useRouter();
  const [view, setView] = useState<'kanban' | 'lista'>('kanban');
  const [leads, setLeads] = useState<CrmLead[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const [qInput, setQInput] = useState('');
  const [q, setQ] = useState('');
  const [platform, setPlatform] = useState('');
  const [assigned, setAssigned] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const [members, setMembers] = useState<Member[]>([]);
  const [showNew, setShowNew] = useState(false);
  const [creating, setCreating] = useState(false);
  const [dragOver, setDragOver] = useState<LeadStatus | null>(null);

  const memberName = useCallback((id: string | null) => {
    if (!id) return '—';
    const m = members.find((x) => x.id === id);
    return m ? (m.full_name || m.email) : '—';
  }, [members]);

  useEffect(() => {
    fetch('/api/admin/members').then((r) => r.json()).then((j) => setMembers(j.members ?? [])).catch(() => {});
  }, []);

  useEffect(() => {
    const t = setTimeout(() => { setQ(qInput); setPage(1); }, 300);
    return () => clearTimeout(t);
  }, [qInput]);

  const buildParams = useCallback(() => {
    const p = new URLSearchParams();
    if (q) p.set('q', q);
    if (platform) p.set('platform', platform);
    if (assigned) p.set('assigned', assigned);
    if (from) p.set('from', from);
    if (to) p.set('to', to);
    return p;
  }, [q, platform, assigned, from, to]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const p = buildParams();
      if (view === 'kanban') {
        p.set('board', '1');
      } else {
        p.set('page', String(page));
        p.set('perPage', '30');
      }
      const res = await fetch(`/api/admin/lead-uri?${p.toString()}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Eroare');
      setLeads(json.items ?? []);
      setTotal(json.total ?? (json.items?.length ?? 0));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Eroare la incarcarea lead-urilor');
    } finally {
      setLoading(false);
    }
  }, [view, page, buildParams]);

  useEffect(() => { load(); }, [load]);

  async function createLead(values: LeadFormValues) {
    setCreating(true);
    try {
      const res = await fetch('/api/admin/lead-uri', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Eroare la creare');
      toast.success('Lead creat');
      setShowNew(false);
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Eroare la creare');
    } finally {
      setCreating(false);
    }
  }

  async function moveStatus(id: string, status: LeadStatus) {
    const lead = leads.find((l) => l.id === id);
    if (!lead || lead.status === status) return;
    let lost_reason: string | null = null;
    if (status === 'pierdut') {
      lost_reason = window.prompt('Motiv pierdere (optional):') ?? null;
    }
    const prev = lead.status;
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, status } : l)));
    try {
      const res = await fetch(`/api/admin/lead-uri/${id}/status`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status, lost_reason }),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? 'Eroare');
    } catch (e) {
      setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, status: prev } : l)));
      toast.error(e instanceof Error ? e.message : 'Eroare la schimbarea statusului');
    }
  }

  const byStatus = useMemo(() => {
    const map: Record<string, CrmLead[]> = {};
    LEAD_COLUMNS.forEach((c) => { map[c.key] = []; });
    leads.forEach((l) => { (map[l.status] ??= []).push(l); });
    return map;
  }, [leads]);

  const totalPages = Math.max(1, Math.ceil(total / 30));

  return (
    <div style={{ padding: '28px 32px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 18 }}>
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.35rem', color: '#0F172A', marginBottom: 4 }}>
            <Target size={22} color="#2B8FCC" /> Lead-uri
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#64748B' }}>Pipeline clienti potentiali.</p>
        </div>
        <Button leftIcon={<Plus size={15} />} onClick={() => setShowNew(true)}>Lead nou</Button>
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16, alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '1 1 220px', minWidth: 180 }}>
          <Search size={15} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
          <input value={qInput} onChange={(e) => setQInput(e.target.value)} placeholder="Cauta nume, companie, campanie..." style={{ ...ctrl, width: '100%', paddingLeft: 34, boxSizing: 'border-box' }} />
        </div>
        <select style={{ ...ctrl, cursor: 'pointer' }} value={platform} onChange={(e) => { setPlatform(e.target.value); setPage(1); }}>
          <option value="">Toate sursele</option>
          <option value="meta">Meta</option>
          <option value="google">Google</option>
          <option value="tiktok">TikTok</option>
          <option value="website">Website</option>
          <option value="manual">Manual</option>
        </select>
        {canAssign && (
          <select style={{ ...ctrl, cursor: 'pointer' }} value={assigned} onChange={(e) => { setAssigned(e.target.value); setPage(1); }}>
            <option value="">Toti agentii</option>
            <option value="unassigned">Nealocate</option>
            {members.map((m) => <option key={m.id} value={m.id}>{m.full_name || m.email}</option>)}
          </select>
        )}
        <input type="date" value={from} onChange={(e) => { setFrom(e.target.value); setPage(1); }} style={{ ...ctrl, cursor: 'pointer' }} title="De la data" />
        <input type="date" value={to} onChange={(e) => { setTo(e.target.value); setPage(1); }} style={{ ...ctrl, cursor: 'pointer' }} title="Pana la data" />
        <div style={{ display: 'flex', border: '1px solid #E2E8F0', borderRadius: 8, overflow: 'hidden', marginLeft: 'auto' }}>
          <button onClick={() => setView('kanban')} title="Kanban" style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '0 12px', height: 38, border: 'none', cursor: 'pointer', background: view === 'kanban' ? '#EFF6FF' : '#fff', color: view === 'kanban' ? '#2B8FCC' : '#64748B', fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 600 }}><LayoutGrid size={15} /></button>
          <button onClick={() => setView('lista')} title="Lista" style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '0 12px', height: 38, border: 'none', borderLeft: '1px solid #E2E8F0', cursor: 'pointer', background: view === 'lista' ? '#EFF6FF' : '#fff', color: view === 'lista' ? '#2B8FCC' : '#64748B', fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 600 }}><List size={15} /></button>
        </div>
      </div>

      {loading ? (
        <div style={{ padding: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, color: '#64748B' }}>
          <Loader2 size={18} className="animate-spin" /> Se incarca...
        </div>
      ) : view === 'kanban' ? (
        <div style={{ display: 'flex', gap: 14, overflowX: 'auto', paddingBottom: 12, alignItems: 'flex-start' }}>
          {LEAD_COLUMNS.map((col) => {
            const colLeads = byStatus[col.key] ?? [];
            const sum = colLeads.reduce((acc, l) => acc + (l.estimated_value ?? 0), 0);
            return (
              <div key={col.key}
                onDragOver={(e) => { e.preventDefault(); setDragOver(col.key); }}
                onDragLeave={() => setDragOver((d) => (d === col.key ? null : d))}
                onDrop={(e) => { e.preventDefault(); setDragOver(null); const id = e.dataTransfer.getData('text/plain'); if (id) moveStatus(id, col.key); }}
                style={{ flex: '0 0 268px', width: 268, background: dragOver === col.key ? '#EFF6FF' : '#F8FAFC', border: `1px solid ${dragOver === col.key ? '#BFDBFE' : '#E2E8F0'}`, borderRadius: 12, padding: 10, transition: 'background 120ms' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 6px 10px' }}>
                  <span style={{ width: 8, height: 8, borderRadius: 999, background: col.color }} />
                  <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.82rem', color: '#334155' }}>{col.label}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#94A3B8', background: '#fff', border: '1px solid #E2E8F0', borderRadius: 999, padding: '0 7px', lineHeight: '18px' }}>{colLeads.length}</span>
                  {sum > 0 && <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>{fmtMoney(sum, 'RON')}</span>}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minHeight: 40 }}>
                  {colLeads.map((l) => {
                    const pm = l.platform ? PLATFORM_META[l.platform] : null;
                    return (
                      <div key={l.id} draggable
                        onDragStart={(e) => { e.dataTransfer.setData('text/plain', l.id); e.dataTransfer.effectAllowed = 'move'; }}
                        onClick={() => router.push(`/admin/lead-uri/${l.id}`)}
                        style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, padding: '10px 12px', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
                        <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.85rem', color: '#0F172A' }}>{l.company || l.name}</div>
                        {l.company && l.name && <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#94A3B8' }}>{l.name}</div>}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginTop: 7 }}>
                          {pm && <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 700, color: '#fff', background: pm.color, borderRadius: 5, padding: '1px 6px' }}>{pm.label}</span>}
                          {l.campaign && <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: '#64748B' }}>{l.campaign}</span>}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 700, color: '#15803D' }}>{fmtMoney(l.estimated_value, l.currency) ?? ''}</span>
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: '#94A3B8' }}>{memberName(l.assigned_to)}</span>
                        </div>
                      </div>
                    );
                  })}
                  {colLeads.length === 0 && <div style={{ padding: '14px 6px', textAlign: 'center', color: '#CBD5E1', fontFamily: 'var(--font-body)', fontSize: '0.75rem' }}>—</div>}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Lista */
        <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 14, overflow: 'hidden' }}>
          {leads.length === 0 ? (
            <div style={{ padding: 48, textAlign: 'center', color: '#64748B', fontFamily: 'var(--font-body)', fontSize: '0.9rem' }}>Niciun lead gasit.</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-body)' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', textAlign: 'left' }}>
                    {['Lead', 'Sursa', 'Campanie', 'Valoare', 'Status', 'Alocat', 'Data'].map((h) => (
                      <th key={h} style={{ padding: '11px 16px', fontSize: '0.72rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid #E2E8F0', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {leads.map((l) => {
                    const pm = l.platform ? PLATFORM_META[l.platform] : null;
                    const col = LEAD_COLUMNS.find((c) => c.key === l.status)!;
                    return (
                      <tr key={l.id} style={{ borderBottom: '1px solid #F1F5F9', cursor: 'pointer' }} onClick={() => router.push(`/admin/lead-uri/${l.id}`)}>
                        <td style={{ padding: '12px 16px' }}>
                          <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#0F172A' }}>{l.company || l.name}</div>
                          {l.company && l.name && <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>{l.name}</div>}
                        </td>
                        <td style={{ padding: '12px 16px' }}>{pm ? <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#fff', background: pm.color, borderRadius: 5, padding: '1px 6px' }}>{pm.label}</span> : '—'}</td>
                        <td style={{ padding: '12px 16px', fontSize: '0.8rem', color: '#475569' }}>{l.campaign || '—'}</td>
                        <td style={{ padding: '12px 16px', fontSize: '0.82rem', color: '#15803D', fontWeight: 600, whiteSpace: 'nowrap' }}>{fmtMoney(l.estimated_value, l.currency) ?? '—'}</td>
                        <td style={{ padding: '12px 16px' }}><span style={{ fontSize: '0.72rem', fontWeight: 600, color: col.color }}>{STATUS_LABEL[l.status]}</span></td>
                        <td style={{ padding: '12px 16px', fontSize: '0.8rem', color: '#475569', whiteSpace: 'nowrap' }}>{memberName(l.assigned_to)}</td>
                        <td style={{ padding: '12px 16px', fontSize: '0.78rem', color: '#94A3B8', whiteSpace: 'nowrap' }}>{fmtDate(l.created_at)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Paginare (doar lista) */}
      {view === 'lista' && total > 30 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8, marginTop: 16, fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#64748B' }}>
          <Button variant="outline" size="sm" disabled={page <= 1 || loading} onClick={() => setPage((p) => p - 1)}>Inapoi</Button>
          <span>{page} / {totalPages}</span>
          <Button variant="outline" size="sm" disabled={page >= totalPages || loading} onClick={() => setPage((p) => p + 1)}>Inainte</Button>
        </div>
      )}

      {/* Modal lead nou */}
      {showNew && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.45)', zIndex: 100, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '40px 16px', overflowY: 'auto' }} onClick={() => !creating && setShowNew(false)}>
          <div style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 700, padding: 28 }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: '#0F172A' }}>Lead nou</h2>
              <button onClick={() => !creating && setShowNew(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: 4 }}><X size={20} /></button>
            </div>
            <LeadForm members={members} canAssign={canAssign} submitting={creating} submitLabel="Creeaza lead" onSubmit={createLead} onCancel={() => setShowNew(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
