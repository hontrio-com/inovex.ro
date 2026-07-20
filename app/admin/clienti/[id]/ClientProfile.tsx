'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ArrowLeft, Trash2, Upload, Download, FileText, FileSignature, Plus, Pencil, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type {
  CrmClient, Member, CrmClientFile, CrmContractLite, CrmSubscription, ClientStatus,
} from '@/types/crm';
import { ClientForm, ClientFormValues } from '../ClientForm';
import { ActivityTimeline } from '../../_components/ActivityTimeline';
import { SubscriptionForm, SubFormValues } from '../../abonamente/SubscriptionForm';

type Tab = 'detalii' | 'contracte' | 'fisiere' | 'abonamente' | 'activitate';

const STATUS_STYLE: Record<ClientStatus, { bg: string; fg: string; bd: string; label: string }> = {
  activ:    { bg: '#F0FDF4', fg: '#15803D', bd: '#BBF7D0', label: 'Activ' },
  prospect: { bg: '#EFF6FF', fg: '#1D4ED8', bd: '#BFDBFE', label: 'Prospect' },
  inactiv:  { bg: '#F8FAFC', fg: '#64748B', bd: '#E2E8F0', label: 'Inactiv' },
};

const card: React.CSSProperties = { background: '#fff', border: '1px solid #E2E8F0', borderRadius: 14, padding: 24 };

function fmtDate(iso: string) { return new Date(iso).toLocaleDateString('ro-RO', { day: '2-digit', month: 'short', year: 'numeric' }); }
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
    <div style={{ padding: '24px 32px' }}>
      <Link href="/admin/clienti" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#64748B', textDecoration: 'none', marginBottom: 14 }}>
        <ArrowLeft size={15} /> Inapoi la clienti
      </Link>

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
      {tab === 'activitate' && <ActivityTimeline baseUrl={`/api/admin/clienti/${client.id}`} members={members} />}
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

/* ── Tab Abonamente (management per client) ── */
function SubscriptionsTab({ clientId }: { clientId: string }) {
  const [items, setItems] = useState<CrmSubscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<CrmSubscription | 'new' | null>(null);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/abonamente?client_id=${clientId}&perPage=100`);
      const json = await res.json();
      if (res.ok) setItems(json.items ?? []);
    } finally { setLoading(false); }
  }, [clientId]);
  useEffect(() => { load(); }, [load]);

  async function save(values: SubFormValues) {
    setSaving(true);
    try {
      const isEdit = editing && editing !== 'new';
      const url = isEdit ? `/api/admin/abonamente/${(editing as CrmSubscription).id}` : '/api/admin/abonamente';
      const res = await fetch(url, { method: isEdit ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) });
      if (!res.ok) throw new Error((await res.json()).error);
      toast.success(isEdit ? 'Abonament actualizat' : 'Abonament adaugat');
      setEditing(null); load();
    } catch (e) { toast.error(e instanceof Error ? e.message : 'Eroare'); }
    finally { setSaving(false); }
  }
  async function remove(sub: CrmSubscription) {
    if (!confirm(`Stergi abonamentul "${sub.name}"?`)) return;
    setBusyId(sub.id);
    try {
      const res = await fetch(`/api/admin/abonamente/${sub.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error((await res.json()).error);
      setItems((prev) => prev.filter((s) => s.id !== sub.id)); toast.success('Abonament sters');
    } catch (e) { toast.error(e instanceof Error ? e.message : 'Eroare'); }
    finally { setBusyId(null); }
  }

  return (
    <div style={card}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#64748B' }}>Abonamente de mentenanta</span>
        <Button size="sm" leftIcon={<Plus size={14} />} onClick={() => setEditing('new')}>Adauga</Button>
      </div>
      {loading ? <EmptyState text="Se incarca..." />
        : items.length === 0 ? <EmptyState text="Niciun abonament de mentenanta." />
        : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {items.map((sub) => (
              <div key={sub.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', border: '1px solid #F1F5F9', borderRadius: 10 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 600, color: '#0F172A' }}>{sub.name}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#94A3B8' }}>{sub.status} · {sub.billing_cycle}{sub.next_renewal_date ? ` · reinnoire ${fmtDate(sub.next_renewal_date)}` : ''}</div>
                </div>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 600, color: '#15803D' }}>{fmtMoney(sub.price, sub.currency)}</span>
                <Button variant="ghost" size="icon-sm" onClick={() => setEditing(sub)}><Pencil size={14} /></Button>
                <Button variant="ghost" size="icon-sm" disabled={busyId === sub.id} onClick={() => remove(sub)} className="text-red-400 hover:text-red-600 hover:bg-red-50"><Trash2 size={14} /></Button>
              </div>
            ))}
          </div>
        )}

      {editing && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.45)', zIndex: 100, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '40px 16px', overflowY: 'auto' }} onClick={() => !saving && setEditing(null)}>
          <div style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 560, padding: 26 }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.05rem', color: '#0F172A' }}>{editing === 'new' ? 'Abonament nou' : 'Editeaza abonament'}</h2>
              <button onClick={() => !saving && setEditing(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: 4 }}><X size={20} /></button>
            </div>
            <SubscriptionForm
              initial={editing === 'new' ? null : editing}
              fixedClientId={clientId}
              submitting={saving}
              submitLabel={editing === 'new' ? 'Adauga' : 'Salveaza'}
              onSubmit={save}
              onCancel={() => setEditing(null)}
            />
          </div>
        </div>
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
