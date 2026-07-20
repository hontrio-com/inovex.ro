'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { ArrowLeft, Upload, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OrgSettings {
  company_name: string | null; company_cui: string | null; company_reg_com: string | null;
  company_address: string | null; company_iban: string | null; company_bank: string | null;
  email: string | null; signer_name: string | null; signature_url: string | null;
  reminder_days: number; expiry_days: number;
}

const inp: React.CSSProperties = { width: '100%', height: 40, border: '1px solid #E2E8F0', borderRadius: 8, padding: '0 12px', fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#0F172A', background: '#fff', outline: 'none', boxSizing: 'border-box' };
const lbl: React.CSSProperties = { display: 'block', marginBottom: 6, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.8rem', color: '#374151' };
const card: React.CSSProperties = { background: '#fff', border: '1px solid #E2E8F0', borderRadius: 14, padding: 24, marginBottom: 20 };
const sectionTitle: React.CSSProperties = { fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#94A3B8', margin: '0 0 14px' };

export function SetariClient() {
  const [v, setV] = useState<OrgSettings | null>(null);
  const [sigUrl, setSigUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/admin/contracte/setari').then((r) => r.json()).then((j) => { setV(j.settings); setSigUrl(j.signature_signed_url ?? null); }).catch(() => toast.error('Eroare la incarcare'));
  }, []);

  function set<K extends keyof OrgSettings>(k: K, val: OrgSettings[K]) { setV((p) => (p ? { ...p, [k]: val } : p)); }

  async function save() {
    if (!v) return;
    setSaving(true);
    try {
      const res = await fetch('/api/admin/contracte/setari', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(v) });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setV(json.settings);
      toast.success('Setari salvate');
    } catch (e) { toast.error(e instanceof Error ? e.message : 'Eroare'); }
    finally { setSaving(false); }
  }

  async function uploadSignature(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData(); fd.append('file', file);
      const res = await fetch('/api/admin/contracte/setari/signature', { method: 'POST', body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setSigUrl(json.signature_signed_url);
      set('signature_url', json.signature_url);
      toast.success('Semnatura incarcata');
    } catch (err) { toast.error(err instanceof Error ? err.message : 'Eroare'); }
    finally { setUploading(false); if (fileRef.current) fileRef.current.value = ''; }
  }

  async function removeSignature() {
    if (!confirm('Elimini semnatura firmei?')) return;
    try {
      const res = await fetch('/api/admin/contracte/setari/signature', { method: 'DELETE' });
      if (!res.ok) throw new Error((await res.json()).error);
      setSigUrl(null); set('signature_url', null);
      toast.success('Semnatura eliminata');
    } catch (e) { toast.error(e instanceof Error ? e.message : 'Eroare'); }
  }

  if (!v) return <div style={{ padding: 60, textAlign: 'center', color: '#64748B' }}><Loader2 size={18} className="animate-spin" style={{ display: 'inline' }} /> Se incarca...</div>;

  const grid2: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 };

  return (
    <div style={{ padding: '24px 32px', maxWidth: 820 }}>
      <Link href="/admin/contracte" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#64748B', textDecoration: 'none', marginBottom: 14 }}><ArrowLeft size={15} /> Inapoi la contracte</Link>
      <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.35rem', color: '#0F172A', marginBottom: 4 }}>Setari firma</h1>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#64748B', marginBottom: 20 }}>Datele firmei alimenteaza variabilele din contracte; semnatura se aplica automat pe PDF-ul semnat.</p>

      <div style={card}>
        <div style={sectionTitle}>Date firma</div>
        <div style={grid2}>
          <div><label style={lbl}>Denumire firma</label><input style={inp} value={v.company_name ?? ''} onChange={(e) => set('company_name', e.target.value)} /></div>
          <div><label style={lbl}>CUI</label><input style={inp} value={v.company_cui ?? ''} onChange={(e) => set('company_cui', e.target.value)} /></div>
          <div><label style={lbl}>Reg. Comertului</label><input style={inp} value={v.company_reg_com ?? ''} onChange={(e) => set('company_reg_com', e.target.value)} /></div>
          <div><label style={lbl}>Email firma</label><input style={inp} type="email" value={v.email ?? ''} onChange={(e) => set('email', e.target.value)} /></div>
          <div style={{ gridColumn: '1 / -1' }}><label style={lbl}>Adresa</label><input style={inp} value={v.company_address ?? ''} onChange={(e) => set('company_address', e.target.value)} /></div>
          <div><label style={lbl}>IBAN</label><input style={inp} value={v.company_iban ?? ''} onChange={(e) => set('company_iban', e.target.value)} /></div>
          <div><label style={lbl}>Banca</label><input style={inp} value={v.company_bank ?? ''} onChange={(e) => set('company_bank', e.target.value)} /></div>
        </div>
      </div>

      <div style={card}>
        <div style={sectionTitle}>Semnatura firmei</div>
        <div style={grid2}>
          <div><label style={lbl}>Nume semnatar</label><input style={inp} value={v.signer_name ?? ''} onChange={(e) => set('signer_name', e.target.value)} placeholder="Ex: Robert Popescu, Administrator" /></div>
        </div>
        <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 16 }}>
          {sigUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={sigUrl} alt="semnatura" style={{ height: 60, maxWidth: 200, objectFit: 'contain', border: '1px solid #E2E8F0', borderRadius: 8, background: '#fff', padding: 6 }} />
          ) : (
            <div style={{ height: 60, width: 200, border: '1.5px dashed #CBD5E1', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8', fontFamily: 'var(--font-body)', fontSize: '0.78rem' }}>Nicio semnatura</div>
          )}
          <div style={{ display: 'flex', gap: 8 }}>
            <label><Button asChild loading={uploading} leftIcon={<Upload size={14} />}><span style={{ cursor: 'pointer' }}>Incarca (PNG)</span></Button><input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={uploadSignature} style={{ display: 'none' }} /></label>
            {sigUrl && <Button variant="ghost" size="icon" onClick={removeSignature} className="text-red-400 hover:text-red-600 hover:bg-red-50"><Trash2 size={16} /></Button>}
          </div>
        </div>
      </div>

      <div style={card}>
        <div style={sectionTitle}>Remindere & expirare</div>
        <div style={grid2}>
          <div><label style={lbl}>Reminder dupa (zile)</label><input style={inp} type="number" min="1" max="90" value={v.reminder_days} onChange={(e) => set('reminder_days', Number(e.target.value))} /></div>
          <div><label style={lbl}>Expira dupa (zile)</label><input style={inp} type="number" min="1" max="365" value={v.expiry_days} onChange={(e) => set('expiry_days', Number(e.target.value))} /></div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={save} loading={saving}>Salveaza setarile</Button>
      </div>
    </div>
  );
}
