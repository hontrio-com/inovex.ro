'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Send, Loader2 } from 'lucide-react';
import { A, Field, Inp, Textarea, SaveBar, AdminHeader, ImageField } from '@/app/admin/_components/AdminPage';

type SocialSettings = {
  instagram: string;
  facebook: string;
  tiktok: string;
};

type SeoSettings = {
  defaultTitle: string;
  defaultDescription: string;
  canonicalBase: string;
  googleAnalyticsId: string;
  googleTagManagerId: string;
};

type LogoSettings = {
  light: string;
  dark: string;
};

type SmtpSettings = {
  host: string;
  port: string;
  user: string;
  pass: string;
  secure: boolean;
  fromName: string;
  fromEmail: string;
};

type Settings = {
  companyName: string;
  legalName: string;
  cui: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  social: SocialSettings;
  seo: SeoSettings;
  logo: LogoSettings;
  smtp: SmtpSettings;
};

const DEFAULT_SETTINGS: Settings = {
  companyName: '',
  legalName: '',
  cui: '',
  phone: '',
  email: '',
  addressLine1: '',
  addressLine2: '',
  social: { instagram: '', facebook: '', tiktok: '' },
  seo: {
    defaultTitle: '',
    defaultDescription: '',
    canonicalBase: '',
    googleAnalyticsId: '',
    googleTagManagerId: '',
  },
  logo: { light: '', dark: '' },
  smtp: {
    host: '',
    port: '465',
    user: '',
    pass: '',
    secure: true,
    fromName: 'Inovex',
    fromEmail: '',
  },
};

function SectionCard({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div style={A.section}>
      <div style={A.sectionTitle}>{title}</div>
      {description && (
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: '#94A3B8', marginBottom: 16, marginTop: -4 }}>
          {description}
        </p>
      )}
      {children}
    </div>
  );
}

type SmtpTestStatus = 'idle' | 'testing' | 'success' | 'error';

export default function SettingsPage() {
  const [data, setData] = useState<Settings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  /* SMTP test state */
  const [testEmail, setTestEmail] = useState('');
  const [testStatus, setTestStatus] = useState<SmtpTestStatus>('idle');
  const [testMessage, setTestMessage] = useState('');
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    fetch('/api/admin/generic/settings')
      .then((r) => r.json())
      .then((d: Partial<Settings>) => setData({
        ...DEFAULT_SETTINGS,
        ...d,
        social: { ...DEFAULT_SETTINGS.social, ...d.social },
        seo: { ...DEFAULT_SETTINGS.seo, ...d.seo },
        logo: { ...DEFAULT_SETTINGS.logo, ...d.logo },
        smtp: { ...DEFAULT_SETTINGS.smtp, ...d.smtp },
      }))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    try {
      await fetch('/api/admin/generic/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  }

  async function handleSmtpTest() {
    if (!testEmail) {
      setTestStatus('error');
      setTestMessage('Introdu un email de test mai intai.');
      return;
    }
    setTestStatus('testing');
    setTestMessage('');
    try {
      const res = await fetch('/api/admin/smtp-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ smtp: data.smtp, to: testEmail }),
      });
      const json = await res.json() as { ok: boolean; error?: string };
      if (json.ok) {
        setTestStatus('success');
        setTestMessage(`Email trimis cu succes catre ${testEmail}`);
      } else {
        setTestStatus('error');
        setTestMessage(json.error ?? 'Eroare necunoscuta la trimitere.');
      }
    } catch (err) {
      setTestStatus('error');
      setTestMessage('Eroare de retea. Verifica ca serverul ruleaza.');
    }
    setTimeout(() => { setTestStatus('idle'); setTestMessage(''); }, 8000);
  }

  function set<K extends keyof Settings>(key: K, val: Settings[K]) {
    setData((prev) => ({ ...prev, [key]: val }));
  }

  function setSocial(key: keyof SocialSettings, val: string) {
    setData((prev) => ({ ...prev, social: { ...prev.social, [key]: val } }));
  }

  function setSeo(key: keyof SeoSettings, val: string) {
    setData((prev) => ({ ...prev, seo: { ...prev.seo, [key]: val } }));
  }

  function setLogo(key: keyof LogoSettings, val: string) {
    setData((prev) => ({ ...prev, logo: { ...prev.logo, [key]: val } }));
  }

  function setSmtp(key: keyof SmtpSettings, val: string | boolean) {
    setData((prev) => ({ ...prev, smtp: { ...prev.smtp, [key]: val } }));
  }

  if (loading) {
    return (
      <div style={{ padding: 32, fontFamily: 'var(--font-body)', color: '#64748B' }}>
        Se incarca...
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <SaveBar saving={saving} onSave={handleSave} saved={saved} />

      <AdminHeader
        title="Setari generale"
        desc="Informatii despre companie, SEO global, retele sociale, logo si configurare email."
      />

      <div style={{ padding: '0 32px 40px', maxWidth: 860 }}>

        {/* Informatii Companie */}
        <SectionCard title="Informatii companie">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <Field label="Nume comercial">
              <Inp value={data.companyName} onChange={(v) => set('companyName', v)} placeholder="ex: Inovex" />
            </Field>
            <Field label="Denumire legala">
              <Inp value={data.legalName} onChange={(v) => set('legalName', v)} placeholder="ex: Inovex Solutions SRL" />
            </Field>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 16, marginBottom: 16 }}>
            <Field label="CUI">
              <Inp value={data.cui} onChange={(v) => set('cui', v)} placeholder="ex: RO12345678" />
            </Field>
            <Field label="Telefon">
              <Inp value={data.phone} onChange={(v) => set('phone', v)} placeholder="ex: +40 7XX XXX XXX" />
            </Field>
          </div>
          <div style={{ marginBottom: 16 }}>
            <Field label="Email contact">
              <Inp value={data.email} onChange={(v) => set('email', v)} placeholder="ex: contact@inovex.ro" type="email" />
            </Field>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Field label="Adresa (linia 1)">
              <Inp value={data.addressLine1} onChange={(v) => set('addressLine1', v)} placeholder="ex: Str. Exemplu nr. 10" />
            </Field>
            <Field label="Adresa (linia 2)">
              <Inp value={data.addressLine2} onChange={(v) => set('addressLine2', v)} placeholder="ex: Cluj-Napoca, Romania" />
            </Field>
          </div>
        </SectionCard>

        {/* Retele Sociale */}
        <SectionCard title="Retele sociale">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            <Field label="Instagram">
              <Inp value={data.social.instagram} onChange={(v) => setSocial('instagram', v)} placeholder="https://instagram.com/..." />
            </Field>
            <Field label="Facebook">
              <Inp value={data.social.facebook} onChange={(v) => setSocial('facebook', v)} placeholder="https://facebook.com/..." />
            </Field>
            <Field label="TikTok">
              <Inp value={data.social.tiktok} onChange={(v) => setSocial('tiktok', v)} placeholder="https://tiktok.com/@..." />
            </Field>
          </div>
        </SectionCard>

        {/* SEO Global */}
        <SectionCard title="SEO global">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <Field label="Titlu implicit">
              <Inp value={data.seo.defaultTitle} onChange={(v) => setSeo('defaultTitle', v)} placeholder="ex: Inovex | Agentie Web" />
            </Field>
            <Field label="URL canonic de baza">
              <Inp value={data.seo.canonicalBase} onChange={(v) => setSeo('canonicalBase', v)} placeholder="ex: https://inovex.ro" />
            </Field>
          </div>
          <div style={{ marginBottom: 16 }}>
            <Field label="Descriere implicita">
              <Inp value={data.seo.defaultDescription} onChange={(v) => setSeo('defaultDescription', v)} placeholder="Scurta descriere a site-ului..." />
            </Field>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Field label="Google Analytics ID">
              <Inp value={data.seo.googleAnalyticsId} onChange={(v) => setSeo('googleAnalyticsId', v)} placeholder="ex: G-XXXXXXXXXX" />
            </Field>
            <Field label="Google Tag Manager ID">
              <Inp value={data.seo.googleTagManagerId} onChange={(v) => setSeo('googleTagManagerId', v)} placeholder="ex: GTM-XXXXXXX" />
            </Field>
          </div>
        </SectionCard>

        {/* Logo */}
        <SectionCard title="Logo">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <ImageField
              value={data.logo.light}
              onChange={(url) => setLogo('light', url)}
              dir="logo"
              label="Logo varianta luminoasa (light)"
            />
            <ImageField
              value={data.logo.dark}
              onChange={(url) => setLogo('dark', url)}
              dir="logo"
              label="Logo varianta intunecata (dark)"
            />
          </div>
          <p style={{ marginTop: 12, fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#94A3B8' }}>
            Recomandat: SVG sau PNG transparent, minim 400px latime.
          </p>
        </SectionCard>

        {/* SMTP */}
        <SectionCard
          title="Configurare email (SMTP)"
          description="Setarile folosite pentru trimiterea emailurilor de notificare si confirmare. Salveaza inainte sa testezi."
        >
          {/* Row 1 - host + port + secure */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 120px', gap: 16, marginBottom: 16 }}>
            <Field label="Host SMTP">
              <Inp
                value={data.smtp.host}
                onChange={(v) => setSmtp('host', v)}
                placeholder="ex: smtp.gmail.com"
              />
            </Field>
            <Field label="Port">
              <Inp
                value={data.smtp.port}
                onChange={(v) => setSmtp('port', v)}
                placeholder="465"
                type="number"
              />
            </Field>
            <Field label="Conexiune securizata">
              <label style={{
                display: 'flex', alignItems: 'center', gap: 10, marginTop: 2,
                cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#374151',
              }}>
                <div
                  onClick={() => setSmtp('secure', !data.smtp.secure)}
                  style={{
                    width: 40, height: 22, borderRadius: 11, cursor: 'pointer', flexShrink: 0,
                    background: data.smtp.secure ? '#2B8FCC' : '#CBD5E1',
                    position: 'relative', transition: 'background 200ms ease',
                  }}
                >
                  <div style={{
                    position: 'absolute', top: 3, left: data.smtp.secure ? 21 : 3,
                    width: 16, height: 16, borderRadius: '50%', background: '#fff',
                    transition: 'left 200ms ease', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                  }} />
                </div>
                {data.smtp.secure ? 'SSL/TLS' : 'STARTTLS'}
              </label>
            </Field>
          </div>

          {/* Row 2 - user + pass */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <Field label="Utilizator (email)">
              <Inp
                value={data.smtp.user}
                onChange={(v) => setSmtp('user', v)}
                placeholder="ex: contact@inovex.ro"
                type="email"
              />
            </Field>
            <Field label="Parola SMTP">
              <div style={{ position: 'relative' }}>
                <Inp
                  value={data.smtp.pass}
                  onChange={(v) => setSmtp('pass', v)}
                  placeholder="Parola sau App Password"
                  type={showPass ? 'text' : 'password'}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((s) => !s)}
                  style={{
                    position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#94A3B8',
                  }}
                >
                  {showPass ? 'Ascunde' : 'Arata'}
                </button>
              </div>
            </Field>
          </div>

          {/* Row 3 - fromName + fromEmail */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
            <Field label="Nume expeditor">
              <Inp
                value={data.smtp.fromName}
                onChange={(v) => setSmtp('fromName', v)}
                placeholder="ex: Inovex"
              />
            </Field>
            <Field label="Email expeditor (From)">
              <Inp
                value={data.smtp.fromEmail}
                onChange={(v) => setSmtp('fromEmail', v)}
                placeholder="ex: noreply@inovex.ro"
                type="email"
              />
            </Field>
          </div>

          {/* Test section */}
          <div style={{
            background: '#F8FAFC', border: '1px solid #E8ECF0', borderRadius: 10, padding: 20,
          }}>
            <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem', color: '#0D1117', marginBottom: 12 }}>
              Testeaza conexiunea SMTP
            </p>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
              <div style={{ flex: 1 }}>
                <Field label="Trimite email de test catre">
                  <Inp
                    value={testEmail}
                    onChange={setTestEmail}
                    placeholder="email@tine.ro"
                    type="email"
                  />
                </Field>
              </div>
              <button
                onClick={handleSmtpTest}
                disabled={testStatus === 'testing'}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '9px 18px', borderRadius: 8, border: 'none', cursor: 'pointer',
                  background: testStatus === 'testing' ? '#E2E8F0' : '#2B8FCC',
                  color: testStatus === 'testing' ? '#94A3B8' : '#fff',
                  fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem',
                  transition: 'background 200ms ease', whiteSpace: 'nowrap', marginBottom: 0,
                }}
              >
                {testStatus === 'testing' ? (
                  <Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} />
                ) : (
                  <Send size={15} />
                )}
                {testStatus === 'testing' ? 'Se trimite...' : 'Trimite test'}
              </button>
            </div>

            {/* Feedback */}
            {testMessage && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8, marginTop: 12,
                padding: '10px 14px', borderRadius: 8,
                background: testStatus === 'success' ? '#F0FDF4' : '#FFF2F2',
                border: `1px solid ${testStatus === 'success' ? '#BBF7D0' : '#FECACA'}`,
              }}>
                {testStatus === 'success'
                  ? <CheckCircle size={16} color="#10B981" />
                  : <XCircle size={16} color="#EF4444" />
                }
                <span style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.8125rem',
                  color: testStatus === 'success' ? '#065F46' : '#991B1B',
                }}>
                  {testMessage}
                </span>
              </div>
            )}

            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#94A3B8', marginTop: 12 }}>
              Salveaza setarile inainte de test. Emailul de test este trimis cu setarile introduse mai sus, nu cu variabilele de mediu.
            </p>
          </div>
        </SectionCard>

      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
