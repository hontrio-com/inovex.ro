'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ArrowLeft, Trash2, UserPlus, Trophy, XCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { CrmLead, Member, LeadStatus } from '@/types/crm';
import { LeadForm, LeadFormValues } from '../LeadForm';
import { ActivityTimeline } from '../../_components/ActivityTimeline';
import { LEAD_COLUMNS, STATUS_LABEL, PLATFORM_META, fmtMoney } from '../meta';

type Tab = 'detalii' | 'activitate';

export function LeadDetail({ initialLead, canAssign, canDelete }: {
  initialLead: CrmLead;
  canAssign: boolean;
  canDelete: boolean;
}) {
  const router = useRouter();
  const [lead, setLead] = useState<CrmLead>(initialLead);
  const [members, setMembers] = useState<Member[]>([]);
  const [tab, setTab] = useState<Tab>('detalii');
  const [saving, setSaving] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch('/api/admin/members').then((r) => r.json()).then((j) => setMembers(j.members ?? [])).catch(() => {});
  }, []);

  async function save(values: LeadFormValues) {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/lead-uri/${lead.id}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Eroare');
      setLead(json.lead);
      toast.success('Modificari salvate');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Eroare la salvare');
    } finally { setSaving(false); }
  }

  async function changeStatus(status: LeadStatus, lostReason?: string | null) {
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/lead-uri/${lead.id}/status`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status, lost_reason: lostReason ?? null }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Eroare');
      setLead(json.lead);
      toast.success('Status actualizat');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Eroare');
    } finally { setBusy(false); }
  }

  function markLost() {
    const reason = window.prompt('Motiv pierdere (optional):');
    if (reason === null) return; // anulat
    changeStatus('pierdut', reason);
  }

  async function convert() {
    if (!confirm('Convertesti lead-ul in client? Se creeaza un client nou, pre-populat din lead.')) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/lead-uri/${lead.id}/convert`, { method: 'POST' });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Eroare');
      toast.success('Lead convertit in client');
      router.push(`/admin/clienti/${json.client_id}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Eroare la conversie');
      setBusy(false);
    }
  }

  async function removeLead() {
    if (!confirm('Stergi lead-ul? Actiune ireversibila.')) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/lead-uri/${lead.id}`, { method: 'DELETE' });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Eroare');
      toast.success('Lead sters');
      router.push('/admin/lead-uri');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Eroare la stergere');
      setBusy(false);
    }
  }

  const col = LEAD_COLUMNS.find((c) => c.key === lead.status)!;
  const pm = lead.platform ? PLATFORM_META[lead.platform] : null;

  return (
    <div style={{ padding: '24px 32px' }}>
      <Link href="/admin/lead-uri" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#64748B', textDecoration: 'none', marginBottom: 14 }}>
        <ArrowLeft size={15} /> Inapoi la lead-uri
      </Link>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', color: '#0F172A', marginBottom: 6 }}>{lead.company || lead.name || 'Lead'}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span style={{ padding: '2px 10px', borderRadius: 999, fontSize: '0.72rem', fontWeight: 700, color: '#fff', background: col.color, fontFamily: 'var(--font-body)' }}>{STATUS_LABEL[lead.status]}</span>
            {pm && <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 700, color: '#fff', background: pm.color, borderRadius: 5, padding: '1px 7px' }}>{pm.label}</span>}
            {lead.estimated_value != null && <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 700, color: '#15803D' }}>{fmtMoney(lead.estimated_value, lead.currency)}</span>}
            {lead.converted_client_id && (
              <Link href={`/admin/clienti/${lead.converted_client_id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 600, color: '#2B8FCC', textDecoration: 'none' }}>
                <ExternalLink size={13} /> Client asociat
              </Link>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {!lead.converted_client_id && (
            <Button variant="outline" disabled={busy} onClick={convert} leftIcon={<UserPlus size={15} />}>Converteste in client</Button>
          )}
          {lead.status !== 'castigat' && (
            <Button variant="outline" disabled={busy} onClick={() => changeStatus('castigat')} leftIcon={<Trophy size={15} />} className="text-green-700 border-green-200 hover:bg-green-50">Castigat</Button>
          )}
          {lead.status !== 'pierdut' && (
            <Button variant="outline" disabled={busy} onClick={markLost} leftIcon={<XCircle size={15} />} className="text-red-600 border-red-200 hover:bg-red-50">Pierdut</Button>
          )}
          {canDelete && (
            <Button variant="ghost" size="icon" disabled={busy} onClick={removeLead} className="text-red-400 hover:text-red-600 hover:bg-red-50" title="Sterge lead"><Trash2 size={16} /></Button>
          )}
        </div>
      </div>

      {lead.status === 'pierdut' && lead.lost_reason && (
        <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: '10px 14px', marginBottom: 16, fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#B91C1C' }}>
          <strong>Motiv pierdere:</strong> {lead.lost_reason}
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid #E2E8F0', marginBottom: 20 }}>
        {(['detalii', 'activitate'] as Tab[]).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            style={{
              padding: '10px 16px', border: 'none', background: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 600,
              color: tab === t ? '#2B8FCC' : '#64748B',
              borderBottom: tab === t ? '2px solid #2B8FCC' : '2px solid transparent', marginBottom: -1,
            }}>
            {t === 'detalii' ? 'Detalii' : 'Activitate'}
          </button>
        ))}
      </div>

      {tab === 'detalii' ? (
        <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 14, padding: 24 }}>
          <LeadForm initial={lead} members={members} canAssign={canAssign} submitting={saving} submitLabel="Salveaza modificarile" onSubmit={save} />
        </div>
      ) : (
        <ActivityTimeline baseUrl={`/api/admin/lead-uri/${lead.id}`} members={members} />
      )}
    </div>
  );
}
