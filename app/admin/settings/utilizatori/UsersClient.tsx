'use client';

import { useEffect, useState, FormEvent } from 'react';
import { toast } from 'sonner';
import { UserPlus, Trash2, ShieldCheck, Loader2, Users as UsersIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Role = 'owner' | 'admin' | 'agent';

interface CrmUser {
  id: string;
  email: string;
  full_name: string | null;
  role: Role;
  is_active: boolean;
  created_at: string;
}

const ROLE_COLOR: Record<Role, { bg: string; fg: string; bd: string }> = {
  owner: { bg: '#EFF6FF', fg: '#1D4ED8', bd: '#BFDBFE' },
  admin: { bg: '#F0FDF4', fg: '#15803D', bd: '#BBF7D0' },
  agent: { bg: '#F8FAFC', fg: '#475569', bd: '#E2E8F0' },
};

const inp: React.CSSProperties = {
  width: '100%', height: 40, border: '1px solid #E2E8F0', borderRadius: 8,
  padding: '0 12px', fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#0F172A',
  background: '#fff', outline: 'none', boxSizing: 'border-box',
};
const lbl: React.CSSProperties = {
  display: 'block', marginBottom: 6, fontFamily: 'var(--font-body)',
  fontWeight: 600, fontSize: '0.8125rem', color: '#374151',
};

export function UsersClient({ currentUserId }: { currentUserId: string }) {
  const [users, setUsers]     = useState<CrmUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Formular utilizator nou
  const [fullName, setFullName] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole]         = useState<Role>('agent');
  const [submitting, setSubmitting] = useState(false);
  const [busyId, setBusyId]     = useState<string | null>(null);

  async function loadUsers() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/crm/users');
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Eroare la incarcare');
      setUsers(json.users ?? []);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Eroare la incarcarea utilizatorilor');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadUsers(); }, []);

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/crm/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: fullName || undefined, email, password, role }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Eroare la creare');
      toast.success(`Utilizator creat: ${email}`);
      setUsers((prev) => [...prev, json.user]);
      setFullName(''); setEmail(''); setPassword(''); setRole('agent');
      setShowForm(false);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Eroare la crearea utilizatorului');
    } finally {
      setSubmitting(false);
    }
  }

  async function patchUser(id: string, patch: Partial<Pick<CrmUser, 'role' | 'is_active'>>) {
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/crm/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patch),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Eroare la actualizare');
      setUsers((prev) => prev.map((u) => (u.id === id ? json.user : u)));
      toast.success('Actualizat');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Eroare la actualizare');
    } finally {
      setBusyId(null);
    }
  }

  async function deleteUser(id: string, email: string) {
    if (!confirm(`Stergi utilizatorul ${email}? Actiunea este ireversibila.`)) return;
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/crm/users/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Eroare la stergere');
      setUsers((prev) => prev.filter((u) => u.id !== id));
      toast.success('Utilizator sters');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Eroare la stergere');
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1000 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 24 }}>
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.35rem', color: '#0F172A', marginBottom: 4 }}>
            <UsersIcon size={22} color="#2B8FCC" /> Utilizatori
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#64748B' }}>
            Gestioneaza conturile si rolurile pentru accesul in panou.
          </p>
        </div>
        <Button leftIcon={<UserPlus size={15} />} onClick={() => setShowForm((s) => !s)}>
          {showForm ? 'Inchide' : 'Adauga utilizator'}
        </Button>
      </div>

      {/* Formular utilizator nou */}
      {showForm && (
        <form
          onSubmit={handleCreate}
          style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 14, padding: 24, marginBottom: 24 }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={lbl}>Nume complet</label>
              <input style={inp} value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Ion Popescu" />
            </div>
            <div>
              <label style={lbl}>Email <span style={{ color: '#DC2626' }}>*</span></label>
              <input style={inp} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@inovex.ro" autoComplete="off" />
            </div>
            <div>
              <label style={lbl}>Parola <span style={{ color: '#DC2626' }}>*</span></label>
              <input style={inp} type="text" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="min. 8 caractere" autoComplete="new-password" />
            </div>
            <div>
              <label style={lbl}>Rol</label>
              <select style={{ ...inp, cursor: 'pointer' }} value={role} onChange={(e) => setRole(e.target.value as Role)}>
                <option value="agent">Agent</option>
                <option value="admin">Administrator</option>
                <option value="owner">Owner</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
            <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Anuleaza</Button>
            <Button type="submit" loading={submitting} leftIcon={<UserPlus size={15} />}>
              Creeaza utilizator
            </Button>
          </div>
        </form>
      )}

      {/* Tabel utilizatori */}
      <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 14, overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, color: '#64748B' }}>
            <Loader2 size={18} className="animate-spin" /> Se incarca...
          </div>
        ) : users.length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center', color: '#64748B', fontFamily: 'var(--font-body)', fontSize: '0.9rem' }}>
            Niciun utilizator inca.
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-body)' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', textAlign: 'left' }}>
                {['Utilizator', 'Rol', 'Status', 'Actiuni'].map((h) => (
                  <th key={h} style={{ padding: '12px 16px', fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid #E2E8F0' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const isSelf = u.id === currentUserId;
                const rc = ROLE_COLOR[u.role];
                return (
                  <tr key={u.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#0F172A' }}>
                        {u.full_name || '—'} {isSelf && <span style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: 500 }}>(tu)</span>}
                      </div>
                      <div style={{ fontSize: '0.8125rem', color: '#64748B' }}>{u.email}</div>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <select
                        value={u.role}
                        disabled={isSelf || busyId === u.id}
                        onChange={(e) => patchUser(u.id, { role: e.target.value as Role })}
                        style={{
                          height: 32, border: `1px solid ${rc.bd}`, background: rc.bg, color: rc.fg,
                          borderRadius: 7, padding: '0 8px', fontSize: '0.8125rem', fontWeight: 600,
                          cursor: isSelf ? 'not-allowed' : 'pointer', outline: 'none',
                        }}
                      >
                        <option value="agent">Agent</option>
                        <option value="admin">Administrator</option>
                        <option value="owner">Owner</option>
                      </select>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <button
                        onClick={() => patchUser(u.id, { is_active: !u.is_active })}
                        disabled={isSelf || busyId === u.id}
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: 6,
                          height: 28, padding: '0 10px', borderRadius: 999, fontSize: '0.75rem', fontWeight: 600,
                          border: `1px solid ${u.is_active ? '#BBF7D0' : '#FECACA'}`,
                          background: u.is_active ? '#F0FDF4' : '#FEF2F2',
                          color: u.is_active ? '#15803D' : '#DC2626',
                          cursor: isSelf ? 'not-allowed' : 'pointer',
                        }}
                        title={isSelf ? 'Nu iti poti dezactiva propriul cont' : (u.is_active ? 'Dezactiveaza' : 'Activeaza')}
                      >
                        <span style={{ width: 7, height: 7, borderRadius: 999, background: u.is_active ? '#22C55E' : '#EF4444' }} />
                        {u.is_active ? 'Activ' : 'Inactiv'}
                      </button>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        disabled={isSelf || busyId === u.id}
                        onClick={() => deleteUser(u.id, u.email)}
                        className="text-red-400 hover:text-red-600 hover:bg-red-50"
                        title={isSelf ? 'Nu iti poti sterge propriul cont' : 'Sterge utilizator'}
                      >
                        <Trash2 size={15} />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <p style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#94A3B8' }}>
        <ShieldCheck size={14} /> Doar owner-ul poate crea si gestiona utilizatori. Parolele sunt setate direct — comunica-le utilizatorului in siguranta.
      </p>
    </div>
  );
}
