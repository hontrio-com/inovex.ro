'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  ArrowLeft, Trash2, Upload, Download, FileText, Phone, Mail, Users, CheckSquare,
  RefreshCw, Info, Send, FileSignature,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import type {
  CrmClient, Member, CrmClientFile, CrmActivity, CrmContractLite, CrmSubscriptionLite,
  ClientStatus, ActivityType,
} from '@/types/crm';
import { ClientForm, ClientFormValues } from '../ClientForm';

type Tab = 'detalii' | 'contracte' | 'fisiere' | 'abonamente' | 'activitate';

const STATUS_STYLE: Record<ClientStatus, { bg: string; fg: string; bd: string; label: string }> = {
  activ:    { bg: '#F0FDF4', fg: '#15803D', bd: '#BBF7D0', label: 'Activ' },
  prospect: { bg: '#EFF6FF', fg: '#1D4ED8', bd: '#BFDBFE', label: 'Prospect' },
  inactiv:  { bg: '#F8FAFC', fg: '#64748B', bd: '#E2E8F0', label: 'Inactiv' },
};

const ACTIVITY_META: Record<ActivityType, { icon: React.ElementType; label: string; color: string }> = {
  note:          { icon: FileText,   label: 'Nota',      color: '#2B8FCC' },
  call:          { icon: Phone,      label: 'Apel',      color: '#15803D' },
  email:         { icon: Mail,       label: 'Email',     color: '#7C3AED' },
  meeting:       { icon: Users,      label: 'Intalnire', color: '#EA580C' },
  task:          { icon: CheckSquare,label: 'Task',      color: '#0891B2' },
  status_change: { icon: RefreshCw,  label: 'Status',    color: '#64748B' },
  system:        { icon: Info,       label: 'Sistem',    color: '#94A3B8' },
};

const card: React.CSSProperties = { background: '#fff', border: '1px solid #E2E8F0', borderRadius: 14, padding: 24 };

function fmtDate(iso: string) { return new Date(iso).toLocaleDateString('ro-RO', { day: '2-digit', month: 'short', year: 'numeric' }); }
function fmtDateTime(iso: string) { return new Date(iso).toLocaleString('ro-RO', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }); }
function fmtSize(b: number | null) { if (!b) return ''; if (b < 1024) return `${b} B`; if (b < 1048576) return `${(b / 1024).toFixed(0)} KB`; return `${(b / 1048576).toFixed(1)} MB`; }
function fmtMoney(v: number | null, cur: string | null) { if (v == null) return '—'; try { return new Intl.NumberFormat('ro-RO', { style: 'currency', currency: cur || 'RON' }).format(v); } catch { return `${v} ${cur || 'RON'}`; } }

function EmptyState({ text }: { text: string }) {
  return <div style={{ padding: 40, textAlign: 'center', color: '#94A3B8', fontFamily: 'var(--font-body)', fontSize: '0.875rem' }}>{text}</div>;
}

export function ClientProfile({ initialClient, canAssign, canDelete }: {
  initialClient: CrmClient;
  canAssign: boolean;
  canDelete: boolean;
}) {
  const router = useRouter();
  const [client, setClient] = useState<CrmClient>(initialClient);
  const [members, setMembers] = useState<Member[]>([]);
  const [tab, setTab] = useState<Tab>('detalii');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const memberName = useCallback((id: string | null) => {
    if (!id) return '—';
    const m = members.find((x) => x.id === id);
    return m ? (m.full_name || m.email) : '—';
  }, [members]);

  useEffect(() => {
    fetch('/api/admin/members').then((r) => r.json()).then((j) => setMembers(j.members ?? [])).catch(() => {});
  }, []);

  // ── Detalii: salvare ──
  async function save(values: ClientFormValues) {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/clienti/${client.id}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Eroare');
      setClient(json.client);
      toast.success('Modificari salvate');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Eroare la salvare');
    } finally { setSaving(false); }
  }

  async function removeClient() {
    if (!confirm(`Stergi clientul "${client.name}"? Actiune ireversibila.`)) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/clienti/${client.id}`, { method: 'DELETE' });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Eroare');
      toast.success('Client sters');
      router.push('/admin/clienti');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Eroare la stergere');
      setDeleting(false);
    }
  }

  const st = STATUS_STYLE[client.status];
  const TABS: { key: Tab; label: string }[] = [
    { key: 'detalii', label: 'Detalii' },
    { key: 'contracte', label: 'Contracte' },
    { key: 'fisiere', label: 'Fisiere' },
    { key: 'abonamente', label: 'Abonamente' },
    { key: 'activitate', label: 'Activitate' },
  ];

  return (
    <div style={{ padding: '24px 32px', maxWidth: 1000 }}>
      {/* Back */}
      <Link href="/admin/clienti" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#64748B', textDecoration: 'none', marginBottom: 14 }}>
        <ArrowLeft size={15} /> Inapoi la clienti
      </Link>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 20 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', color: '#0F172A', marginBottom: 6 }}>{client.name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span style={{ padding: '2px 10px', borderRadius: 999, fontSize: '0.72rem', fontWeight: 600, background: st.bg, color: st.fg, border: `1px solid ${st.bd}`, fontFamily: 'var(--font-body)' }}>{st.label}</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#94A3B8' }}>
              {client.type === 'PF' ? 'Persoana fizica' : 'Persoana juridica'} · Alocat: {memberName(client.assigned_to)}
            </span>
          </div>
        </div>
        {canDelete && (
          <Button variant="outline" loading={deleting} onClick={removeClient} leftIcon={<Trash2 size={15} />} className="text-red-600 border-red-200 hover:bg-red-50">Sterge</Button>
        )}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid #E2E8F0', marginBottom: 20, overflowX: 'auto' }}>
        {TABS.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)}
            style={{
              padding: '10px 16px', border: 'none', background: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 600, whiteSpace: 'nowrap',
              color: tab === t.key ? '#2B8FCC' : '#64748B',
              borderBottom: tab === t.key ? '2px solid #2B8FCC' : '2px solid transparent', marginBottom: -1,
            }}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'detalii' && (
        <div style={card}>
          <ClientForm initial={client} members={members} canAssign={canAssign} submitting={saving} submitLabel="Salveaza modificarile" onSubmit={save} />
        </div>
      )}
      {tab === 'contracte' && <ContractsTab clientId={client.id} />}
      {tab === 'fisiere' && <FilesTab clientId={client.id} />}
      {tab === 'abonamente' && <SubscriptionsTab clientId={client.id} />}
      {tab === 'activitate' && <ActivityTab clientId={client.id} memberName={memberName} />}
    </div>
  );
}

/* ── Tab Contracte (read-only; gestionat in Faza E) ── */
function ContractsTab({ clientId }: { clientId: string }) {
  const [items, setItems] = useState<CrmContractLite[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`/api/admin/clienti/${clientId}/contracte`).then((r) => r.json())
      .then((j) => setItems(j.items ?? [])).catch(() => {}).finally(() => setLoading(false));
  }, [clientId]);

  return (
    <div style={card}>
      {loading ? <EmptyState text="Se incarca..." />
        : items.length === 0 ? <EmptyState text="Niciun contract inca. Contractele se genereaza in modulul Contracte." />
        : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-body)' }}>
            <tbody>
              {items.map((c) => (
                <tr key={c.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '12px 8px' }}><FileSignature size={16} style={{ verticalAlign: 'middle', color: '#94A3B8', marginRight: 8 }} />{c.contract_number || c.title || '(fara numar)'}</td>
                  <td style={{ padding: '12px 8px', fontSize: '0.82rem', color: '#64748B' }}>{c.status}</td>
                  <td style={{ padding: '12px 8px', fontSize: '0.82rem', color: '#475569', textAlign: 'right' }}>{fmtMoney(c.value, c.currency)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
    </div>
  );
}

/* ── Tab Abonamente (read-only; gestionat in Faza F) ── */
function SubscriptionsTab({ clientId }: { clientId: string }) {
  const [items, setItems] = useState<CrmSubscriptionLite[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`/api/admin/clienti/${clientId}/abonamente`).then((r) => r.json())
      .then((j) => setItems(j.items ?? [])).catch(() => {}).finally(() => setLoading(false));
  }, [clientId]);

  return (
    <div style={card}>
      {loading ? <EmptyState text="Se incarca..." />
        : items.length === 0 ? <EmptyState text="Niciun abonament de mentenanta. Se adauga in modulul Abonamente." />
        : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-body)' }}>
            <tbody>
              {items.map((sub) => (
                <tr key={sub.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '12px 8px', fontWeight: 600 }}>{sub.name}</td>
                  <td style={{ padding: '12px 8px', fontSize: '0.82rem', color: '#64748B' }}>{sub.status} · {sub.billing_cycle}</td>
                  <td style={{ padding: '12px 8px', fontSize: '0.82rem', color: '#475569', textAlign: 'right' }}>{fmtMoney(sub.price, sub.currency)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
    </div>
  );
}

/* ── Tab Fisiere ── */
function FilesTab({ clientId }: { clientId: string }) {
  const [files, setFiles] = useState<CrmClientFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/clienti/${clientId}/files`);
      const json = await res.json();
      if (res.ok) setFiles(json.items ?? []);
    } finally { setLoading(false); }
  }, [clientId]);
  useEffect(() => { load(); }, [load]);

  async function upload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch(`/api/admin/clienti/${clientId}/files`, { method: 'POST', body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Eroare la upload');
      setFiles((prev) => [json.file, ...prev]);
      toast.success('Fisier incarcat');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Eroare la upload');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  async function remove(id: string, name: string) {
    if (!confirm(`Stergi fisierul "${name}"?`)) return;
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/clienti/${clientId}/files/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Eroare');
      setFiles((prev) => prev.filter((f) => f.id !== id));
      toast.success('Fisier sters');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Eroare la stergere');
    } finally { setBusyId(null); }
  }

  return (
    <div style={card}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#64748B' }}>Documente atasate (max 10 MB / fisier)</span>
        <label>
          <Button asChild loading={uploading} leftIcon={<Upload size={15} />}><span style={{ cursor: 'pointer' }}>Incarca fisier</span></Button>
          <input ref={inputRef} type="file" onChange={upload} style={{ display: 'none' }} />
        </label>
      </div>
      {loading ? <EmptyState text="Se incarca..." />
        : files.length === 0 ? <EmptyState text="Niciun fisier atasat." />
        : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {files.map((f) => (
              <div key={f.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', border: '1px solid #F1F5F9', borderRadius: 10 }}>
                <FileText size={18} color="#94A3B8" />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 600, color: '#0F172A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.file_name}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: '#94A3B8' }}>{fmtSize(f.size_bytes)} · {fmtDate(f.created_at)}</div>
                </div>
                {f.signed_url && (
                  <a href={f.signed_url} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: '#2B8FCC', textDecoration: 'none', fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 600 }}>
                    <Download size={15} /> Descarca
                  </a>
                )}
                <Button variant="ghost" size="icon-sm" disabled={busyId === f.id} onClick={() => remove(f.id, f.file_name)} className="text-red-400 hover:text-red-600 hover:bg-red-50">
                  <Trash2 size={15} />
                </Button>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}

/* ── Tab Activitate (timeline + adauga nota) ── */
function ActivityTab({ clientId, memberName }: { clientId: string; memberName: (id: string | null) => string }) {
  const [items, setItems] = useState<CrmActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState<ActivityType>('note');
  const [body, setBody] = useState('');
  const [adding, setAdding] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/clienti/${clientId}/activities`);
      const json = await res.json();
      if (res.ok) setItems(json.items ?? []);
    } finally { setLoading(false); }
  }, [clientId]);
  useEffect(() => { load(); }, [load]);

  async function add() {
    if (!body.trim()) return;
    setAdding(true);
    try {
      const res = await fetch(`/api/admin/clienti/${clientId}/activities`, {
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
      {/* Adauga */}
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

      {/* Timeline */}
      <div style={card}>
        {loading ? <EmptyState text="Se incarca..." />
          : items.length === 0 ? <EmptyState text="Nicio activitate inca." />
          : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {items.map((a, i) => {
                const meta = ACTIVITY_META[a.type];
                const Icon = meta.icon;
                return (
                  <div key={a.id} style={{ display: 'flex', gap: 12, paddingBottom: i === items.length - 1 ? 0 : 16 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ width: 32, height: 32, borderRadius: 999, background: '#F8FAFC', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={15} color={meta.color} />
                      </div>
                      {i !== items.length - 1 && <div style={{ width: 1, flex: 1, background: '#E2E8F0', marginTop: 4 }} />}
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
