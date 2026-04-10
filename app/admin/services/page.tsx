'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { AdminHeader, SaveBar, A, Field, Inp, Textarea, ArrayItem } from '@/app/admin/_components/AdminPage';

const ICONS = ['ShoppingCart','Globe','Code2','Database','Smartphone','Zap','Settings','Search','Bell',
  'CreditCard','Truck','FileSpreadsheet','TrendingUp','Shield','BarChart3','GitBranch','Layers',
  'Kanban','Package','BarChart2','FileCheck','Wifi','Lock','Star','Send','MessageSquare','FileText','Rocket'];

interface ServiceFeature { iconName: string; label: string; desc: string; }
interface ServiceRow {
  id: string; iconName: string; eyebrow: string;
  headlinePlain: string; headlineBold: string; subtitle: string;
  features: ServiceFeature[];
  badge: string; badgeColor: string; ctaText: string; ctaHref: string; detailsHref: string;
}

function emptyService(): ServiceRow {
  return { id: Date.now().toString(), iconName: 'Globe', eyebrow: '', headlinePlain: '', headlineBold: '',
    subtitle: '', features: [], badge: '', badgeColor: '#2B8FCC', ctaText: 'Solicita oferta', ctaHref: '/oferta', detailsHref: '/servicii' };
}
function emptyFeature(): ServiceFeature { return { iconName: 'Star', label: '', desc: '' }; }

export default function ServicesAdminPage() {
  const [services, setServices] = useState<ServiceRow[]>([]);
  const [saving,   setSaving]   = useState(false);
  const [saved,    setSaved]    = useState(false);
  const [collapsed, setCollapsed] = useState<Record<number, boolean>>({});

  useEffect(() => {
    fetch('/api/admin/generic/services').then((r) => r.json()).then((d) => {
      setServices(d);
      // collapse all by default
      const c: Record<number, boolean> = {};
      (d as ServiceRow[]).forEach((_, i) => { c[i] = true; });
      setCollapsed(c);
    });
  }, []);

  async function save() {
    setSaving(true);
    await fetch('/api/admin/generic/services', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(services),
    });
    setSaving(false); setSaved(true);
  }

  function upd(i: number, key: keyof ServiceRow, val: unknown) {
    setServices((prev) => { const a = [...prev]; a[i] = { ...a[i], [key]: val }; return a; });
    setSaved(false);
  }
  function updFeature(si: number, fi: number, key: keyof ServiceFeature, val: string) {
    const s = [...services];
    const feats = [...s[si].features];
    feats[fi] = { ...feats[fi], [key]: val };
    s[si] = { ...s[si], features: feats };
    setServices(s); setSaved(false);
  }
  function addFeature(si: number) {
    const s = [...services];
    s[si] = { ...s[si], features: [...s[si].features, emptyFeature()] };
    setServices(s); setSaved(false);
  }
  function removeFeature(si: number, fi: number) {
    const s = [...services];
    s[si] = { ...s[si], features: s[si].features.filter((_, idx) => idx !== fi) };
    setServices(s); setSaved(false);
  }
  function addService() {
    setServices((prev) => [...prev, emptyService()]);
    setSaved(false);
  }
  function removeService(i: number) {
    if (!confirm('Stergi acest serviciu?')) return;
    setServices((prev) => prev.filter((_, idx) => idx !== i));
    setSaved(false);
  }
  function toggle(i: number) { setCollapsed((prev) => ({ ...prev, [i]: !prev[i] })); }

  const sel: React.CSSProperties = { ...A.input, height: 42, cursor: 'pointer', appearance: 'none' as never };

  return (
    <div>
      <AdminHeader
        title="Servicii"
        desc="Editeaza serviciile afisate pe pagina principala"
        action={
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={addService} style={A.btnOutline}><Plus size={13} />Adauga serviciu</button>
            <button onClick={save} disabled={saving} style={A.btnPrimary}>{saving ? 'Se salveaza...' : 'Salveaza'}</button>
          </div>
        }
      />
      <SaveBar saving={saving} onSave={save} saved={saved} />
      <div style={{ padding: '24px 32px 48px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {services.map((s, i) => (
          <div key={s.id} style={{ border: '1px solid #E2E8F0', borderRadius: 14, overflow: 'hidden', background: '#fff' }}>
            {/* Header */}
            <div
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', background: '#F8FAFC', cursor: 'pointer', borderBottom: collapsed[i] ? 'none' : '1px solid #E2E8F0' }}
              onClick={() => toggle(i)}
            >
              <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.875rem', color: '#0F172A', flex: 1 }}>
                {s.eyebrow || 'Serviciu nou'}: {s.headlinePlain} <em>{s.headlineBold}</em>
              </span>
              <button onClick={(e) => { e.stopPropagation(); removeService(i); }} style={A.btnDanger}><Trash2 size={13} /></button>
            </div>
            {!collapsed[i] && (
              <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Row 1 */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
                  <Field label="Icona serviciu">
                    <select value={s.iconName} onChange={(e) => upd(i, 'iconName', e.target.value)} style={sel}>
                      {ICONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
                    </select>
                  </Field>
                  <Field label="Eyebrow (ex: E-Commerce)">
                    <Inp value={s.eyebrow} onChange={(v) => upd(i, 'eyebrow', v)} />
                  </Field>
                  <Field label="Badge text (ex: Cel mai solicitat)">
                    <Inp value={s.badge} onChange={(v) => upd(i, 'badge', v)} />
                  </Field>
                </div>
                {/* Row 2 */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <Field label="Headline (parte simpla)">
                    <Inp value={s.headlinePlain} onChange={(v) => upd(i, 'headlinePlain', v)} placeholder="Magazine care vand," />
                  </Field>
                  <Field label="Headline (parte italic/albastru)">
                    <Inp value={s.headlineBold} onChange={(v) => upd(i, 'headlineBold', v)} placeholder="nu doar afiseaza produse." />
                  </Field>
                </div>
                {/* Subtitlu */}
                <Field label="Subtitlu">
                  <Textarea value={s.subtitle} onChange={(v) => upd(i, 'subtitle', v)} rows={2} />
                </Field>
                {/* Badge color + CTA */}
                <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr 1fr 1fr', gap: 14 }}>
                  <Field label="Culoare badge">
                    <input type="color" value={s.badgeColor} onChange={(e) => upd(i, 'badgeColor', e.target.value)}
                      style={{ ...A.input, padding: 4, cursor: 'pointer' }} />
                  </Field>
                  <Field label="Text buton CTA">
                    <Inp value={s.ctaText} onChange={(v) => upd(i, 'ctaText', v)} />
                  </Field>
                  <Field label="Link CTA">
                    <Inp value={s.ctaHref} onChange={(v) => upd(i, 'ctaHref', v)} />
                  </Field>
                  <Field label="Link detalii">
                    <Inp value={s.detailsHref} onChange={(v) => upd(i, 'detailsHref', v)} />
                  </Field>
                </div>
                {/* Features */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <label style={A.label}>Functionalitati (max 4)</label>
                    <button onClick={() => addFeature(i)} style={A.btnOutline}><Plus size={12} />Adauga</button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {s.features.map((f, fi) => (
                      <div key={fi} style={{ display: 'grid', gridTemplateColumns: '150px 1fr 2fr auto', gap: 10, alignItems: 'end' }}>
                        <Field label={fi === 0 ? 'Icona' : ''}>
                          <select value={f.iconName} onChange={(e) => updFeature(i, fi, 'iconName', e.target.value)} style={sel}>
                            {ICONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
                          </select>
                        </Field>
                        <Field label={fi === 0 ? 'Label (bold)' : ''}>
                          <input type="text" value={f.label} onChange={(e) => updFeature(i, fi, 'label', e.target.value)} placeholder="Plati complete." style={A.input} />
                        </Field>
                        <Field label={fi === 0 ? 'Descriere' : ''}>
                          <input type="text" value={f.desc} onChange={(e) => updFeature(i, fi, 'desc', e.target.value)} placeholder="Stripe, PayU..." style={A.input} />
                        </Field>
                        <button onClick={() => removeFeature(i, fi)} style={{ ...A.btnDanger, marginTop: fi === 0 ? 22 : 0 }}><Trash2 size={13} /></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
