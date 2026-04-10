'use client';

import { useEffect, useState } from 'react';
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
};

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={A.section}>
      <div style={A.sectionTitle}>{title}</div>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const [data, setData] = useState<Settings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/admin/generic/settings')
      .then((r) => r.json())
      .then((d: Settings) => setData({ ...DEFAULT_SETTINGS, ...d, social: { ...DEFAULT_SETTINGS.social, ...d.social }, seo: { ...DEFAULT_SETTINGS.seo, ...d.seo }, logo: { ...DEFAULT_SETTINGS.logo, ...d.logo } }))
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
        desc="Informatii despre companie, SEO global, retele sociale si logo."
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
              <Inp
                value={data.social.instagram}
                onChange={(v) => setSocial('instagram', v)}
                placeholder="https://instagram.com/..."
              />
            </Field>
            <Field label="Facebook">
              <Inp
                value={data.social.facebook}
                onChange={(v) => setSocial('facebook', v)}
                placeholder="https://facebook.com/..."
              />
            </Field>
            <Field label="TikTok">
              <Inp
                value={data.social.tiktok}
                onChange={(v) => setSocial('tiktok', v)}
                placeholder="https://tiktok.com/@..."
              />
            </Field>
          </div>
        </SectionCard>

        {/* SEO Global */}
        <SectionCard title="SEO global">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <Field label="Titlu implicit (defaultTitle)">
              <Inp
                value={data.seo.defaultTitle}
                onChange={(v) => setSeo('defaultTitle', v)}
                placeholder="ex: Inovex | Agentie Web"
              />
            </Field>
            <Field label="URL canonic de baza">
              <Inp
                value={data.seo.canonicalBase}
                onChange={(v) => setSeo('canonicalBase', v)}
                placeholder="ex: https://inovex.ro"
              />
            </Field>
          </div>
          <div style={{ marginBottom: 16 }}>
            <Field label="Descriere implicita (defaultDescription)">
              <Inp
                value={data.seo.defaultDescription}
                onChange={(v) => setSeo('defaultDescription', v)}
                placeholder="Scurta descriere a site-ului pentru motoarele de cautare..."
              />
            </Field>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Field label="Google Analytics ID">
              <Inp
                value={data.seo.googleAnalyticsId}
                onChange={(v) => setSeo('googleAnalyticsId', v)}
                placeholder="ex: G-XXXXXXXXXX"
              />
            </Field>
            <Field label="Google Tag Manager ID">
              <Inp
                value={data.seo.googleTagManagerId}
                onChange={(v) => setSeo('googleTagManagerId', v)}
                placeholder="ex: GTM-XXXXXXX"
              />
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
          <p style={{
            marginTop: 12, fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#94A3B8',
          }}>
            Recomandat: SVG sau PNG transparent, minim 400px latime.
          </p>
        </SectionCard>

      </div>
    </div>
  );
}
