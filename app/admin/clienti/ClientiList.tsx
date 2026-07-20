'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Building2, Plus, Trash2, Search, Loader2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { CrmClient, Member, ClientStatus } from '@/types/crm';
import { ClientForm, ClientFormValues } from './ClientForm';

const STATUS_STYLE: Record<ClientStatus, { bg: string; fg: string; bd: string; label: string }> = {
  activ:    { bg: '#F0FDF4', fg: '#15803D', bd: '#BBF7D0', label: 'Activ' },
  prospect: { bg: '#EFF6FF', fg: '#1D4ED8', bd: '#BFDBFE', label: 'Prospect' },
  inactiv:  { bg: '#F8FAFC', fg: '#64748B', bd: '#E2E8F0', label: 'Inactiv' },
};

const ctrl: React.CSSProperties = {
  height: 38, border: '1px solid #E2E8F0', borderRadius: 8, padding: '0 12px',
  fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#0F172A', background: '#fff', outline: 'none',
};

const PER_PAGE = 20;

export function ClientiList({ canAssign, canDelete }: { canAssign: boolean; canDelete: boolean }) {
  const [items, setItems]   = useState<CrmClient[]>([]);
  const [total, setTotal]   = useState(0);
  const [page, setPage]     = useState(1);
  const [loading, setLoading] = useState(true);

  const [qInput, setQInput] = useState('');
  const [q, setQ]           = useState('');
  const [status, setStatus] = useState('');
  const [assigned, setAssigned] = useState('');
  const [sort, setSort]     = useState('created_at');

  const [members, setMembers] = useState<Member[]>([]);
  const [showNew, setShowNew] = useState(false);
  const [creating, setCreating] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const memberName = useCallback(
    (id: string | null) => {
      if (!id) return '—';
      const m = members.find((x) => x.id === id);
      return m ? (m.full_name || m.email) : '—';
    },
    [members],
  );

  // Membri (pentru alocare + afisare nume)
  useEffect(() => {
    fetch('/api/admin/members')
      .then((r) => r.json())
      .then((j) => setMembers(j.members ?? []))
      .catch(() => {});
  }, []);

  // Debounce cautare
  useEffect(() => {
    const t = setTimeout(() => { setQ(qInput); setPage(1); }, 300);
    return () => clearTimeout(t);
  }, [qInput]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const p = new URLSearchParams({ page: String(page), perPage: String(PER_PAGE), sort, order: 'desc' });
      if (q) p.set('q', q);
      if (status) p.set('status', status);
      if (assigned) p.set('assigned', assigned);
      const res = await fetch(`/api/admin/clienti?${p.toString()}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Eroare');
      setItems(json.items ?? []);
      setTotal(json.total ?? 0);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Eroare la incarcarea clientilor');
    } finally {
      setLoading(false);
    }
  }, [page, q, status, assigned, sort]);

  useEffect(() => { load(); }, [load]);

  async function createClient(values: ClientFormValues) {
    setCreating(true);
    try {
      const res = await fetch('/api/admin/clienti', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Eroare la creare');
      toast.success('Client creat');
      setShowNew(false);
      setPage(1);
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Eroare la creare');
    } finally {
      setCreating(false);
    }
  }

  async function remove(id: string, name: string) {
    if (!confirm(`Stergi clientul "${name}"? Se sterg si fisierele, contractele si activitatea asociate.`)) return;
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/clienti/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Eroare la stergere');
      toast.success('Client sters');
      setItems((prev) => prev.filter((c) => c.id !== id));
      setTotal((t) => Math.max(0, t - 1));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Eroare la stergere');
    } finally {
      setBusyId(null);
    }
  }

  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const from = total === 0 ? 0 : (page - 1) * PER_PAGE + 1;
  const to = Math.min(total, page * PER_PAGE);

  return (
    <div style={{ padding: '28px 32px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 20 }}>
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.35rem', color: '#0F172A', marginBottom: 4 }}>
            <Building2 size={22} color="#2B8FCC" /> Clienti
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#64748B' }}>
            {total} {total === 1 ? 'client' : 'clienti'} in total.
          </p>
        </div>
        <Button leftIcon={<Plus size={15} />} onClick={() => setShowNew(true)}>Client nou</Button>
      </div>

      {/* Toolbar filtre */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
        <div style={{ position: 'relative', flex: '1 1 260px', minWidth: 200 }}>
          <Search size={15} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
          <input
            value={qInput}
            onChange={(e) => setQInput(e.target.value)}
            placeholder="Cauta nume, CUI, email, telefon..."
            style={{ ...ctrl, width: '100%', paddingLeft: 34, boxSizing: 'border-box' }}
          />
        </div>
        <select style={{ ...ctrl, cursor: 'pointer' }} value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
          <option value="">Toate statusurile</option>
          <option value="activ">Activ</option>
          <option value="prospect">Prospect</option>
          <option value="inactiv">Inactiv</option>
        </select>
        {canAssign && (
          <select style={{ ...ctrl, cursor: 'pointer' }} value={assigned} onChange={(e) => { setAssigned(e.target.value); setPage(1); }}>
            <option value="">Toti agentii</option>
            <option value="unassigned">Nealocati</option>
            {members.map((m) => <option key={m.id} value={m.id}>{m.full_name || m.email}</option>)}
          </select>
        )}
        <select style={{ ...ctrl, cursor: 'pointer' }} value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }}>
          <option value="created_at">Cei mai noi</option>
          <option value="name">Nume (A-Z)</option>
          <option value="updated_at">Ultima modificare</option>
        </select>
      </div>

      {/* Tabel */}
      <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 14, overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, color: '#64748B' }}>
            <Loader2 size={18} className="animate-spin" /> Se incarca...
          </div>
        ) : items.length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center', color: '#64748B', fontFamily: 'var(--font-body)', fontSize: '0.9rem' }}>
            Niciun client gasit.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-body)' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', textAlign: 'left' }}>
                  {['Client', 'CUI', 'Contact', 'Status', 'Alocat', 'Actiuni'].map((h) => (
                    <th key={h} style={{ padding: '11px 16px', fontSize: '0.72rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid #E2E8F0', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((c) => {
                  const st = STATUS_STYLE[c.status];
                  return (
                    <tr key={c.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '13px 16px' }}>
                        <Link href={`/admin/clienti/${c.id}`} style={{ fontWeight: 600, fontSize: '0.875rem', color: '#0F172A', textDecoration: 'none' }}>
                          {c.name}
                        </Link>
                        <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: 2 }}>{c.type === 'PF' ? 'Persoana fizica' : 'Persoana juridica'}</div>
                      </td>
                      <td style={{ padding: '13px 16px', fontSize: '0.82rem', color: '#475569', whiteSpace: 'nowrap' }}>{c.cui || '—'}</td>
                      <td style={{ padding: '13px 16px', fontSize: '0.8rem', color: '#475569' }}>
                        <div>{c.email || '—'}</div>
                        <div style={{ color: '#94A3B8' }}>{c.phone || ''}</div>
                      </td>
                      <td style={{ padding: '13px 16px' }}>
                        <span style={{ display: 'inline-block', padding: '2px 9px', borderRadius: 999, fontSize: '0.72rem', fontWeight: 600, background: st.bg, color: st.fg, border: `1px solid ${st.bd}` }}>{st.label}</span>
                      </td>
                      <td style={{ padding: '13px 16px', fontSize: '0.82rem', color: '#475569', whiteSpace: 'nowrap' }}>{memberName(c.assigned_to)}</td>
                      <td style={{ padding: '13px 16px' }}>
                        {canDelete && (
                          <Button variant="ghost" size="icon-sm" disabled={busyId === c.id} onClick={() => remove(c.id, c.name)} className="text-red-400 hover:text-red-600 hover:bg-red-50" title="Sterge client">
                            <Trash2 size={15} />
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Paginare */}
      {total > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#64748B' }}>
          <span>{from}-{to} din {total}</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="outline" size="sm" disabled={page <= 1 || loading} onClick={() => setPage((p) => p - 1)} leftIcon={<ChevronLeft size={14} />}>Inapoi</Button>
            <span style={{ display: 'flex', alignItems: 'center', padding: '0 6px' }}>{page} / {totalPages}</span>
            <Button variant="outline" size="sm" disabled={page >= totalPages || loading} onClick={() => setPage((p) => p + 1)} rightIcon={<ChevronRight size={14} />}>Inainte</Button>
          </div>
        </div>
      )}

      {/* Modal client nou */}
      {showNew && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.45)', zIndex: 100, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '40px 16px', overflowY: 'auto' }} onClick={() => !creating && setShowNew(false)}>
          <div style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 720, padding: 28 }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: '#0F172A' }}>Client nou</h2>
              <button onClick={() => !creating && setShowNew(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: 4 }}><X size={20} /></button>
            </div>
            <ClientForm
              members={members}
              canAssign={canAssign}
              submitting={creating}
              submitLabel="Creeaza client"
              onSubmit={createClient}
              onCancel={() => setShowNew(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
