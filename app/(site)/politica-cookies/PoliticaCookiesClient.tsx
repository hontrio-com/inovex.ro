'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Settings2, Download, Link2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  getCookieConsent,
  setCookieConsent,
} from '@/lib/cookies';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TocSection {
  id: string;
  label: string;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const TOC_SECTIONS: TocSection[] = [
  { id: 'sectiunea-1', label: 'Ce sunt cookie-urile' },
  { id: 'sectiunea-2', label: 'De ce folosim cookie-uri' },
  { id: 'sectiunea-3', label: 'Tipurile de cookie-uri folosite' },
  { id: 'sectiunea-4', label: 'Lista completa a cookie-urilor' },
  { id: 'sectiunea-5', label: 'Consimtamantul si controlul tau' },
  { id: 'sectiunea-6', label: 'Transferuri de date' },
  { id: 'sectiunea-7', label: 'Actualizari ale politicii' },
  { id: 'sectiunea-8', label: 'Contact' },
];

// ---------------------------------------------------------------------------
// Cookie table data
// ---------------------------------------------------------------------------

type CookieRow = {
  name: string;
  provider: string;
  providerUrl: string;
  purpose: string;
  duration: string;
  type: string;
};

type CookieCategory = {
  label: string;
  color: string;
  borderColor: string;
  textColor: string;
  description: string;
  rows: CookieRow[];
};

const COOKIE_CATEGORIES: CookieCategory[] = [
  {
    label: 'Esentiale',
    color: '#F0FDF4',
    borderColor: '#10B981',
    textColor: '#065F46',
    description: 'Necesare pentru functionarea de baza a site-ului. Nu necesita consimtamant.',
    rows: [
      {
        name: '__Host-next-auth.csrf-token',
        provider: 'inovex.ro',
        providerUrl: 'https://inovex.ro',
        purpose: 'Protectie CSRF pentru formulare',
        duration: 'Sesiune',
        type: 'HTTP',
      },
      {
        name: '__Secure-next-auth.session-token',
        provider: 'inovex.ro',
        providerUrl: 'https://inovex.ro',
        purpose: 'Mentinerea sesiunii autentificate',
        duration: '30 zile',
        type: 'HTTP',
      },
      {
        name: 'cookie_consent',
        provider: 'inovex.ro',
        providerUrl: 'https://inovex.ro',
        purpose: 'Memoreaza preferintele tale de cookie-uri',
        duration: '12 luni',
        type: 'localStorage',
      },
    ],
  },
  {
    label: 'Analitice',
    color: '#EAF5FF',
    borderColor: '#2B8FCC',
    textColor: '#1e40af',
    description: 'Google Analytics 4 - analiza anonimizata a traficului. Necesita consimtamant.',
    rows: [
      {
        name: '_ga',
        provider: 'google.com',
        providerUrl: 'https://policies.google.com/privacy',
        purpose: 'Identifica sesiunile unice de utilizator (anonimizat)',
        duration: '13 luni',
        type: 'HTTP',
      },
      {
        name: '_ga_*',
        provider: 'google.com',
        providerUrl: 'https://policies.google.com/privacy',
        purpose: 'Mentine starea sesiunii GA4',
        duration: '13 luni',
        type: 'HTTP',
      },
      {
        name: '_gid',
        provider: 'google.com',
        providerUrl: 'https://policies.google.com/privacy',
        purpose: 'Distinge utilizatorii (date sterse dupa 24h)',
        duration: '24 ore',
        type: 'HTTP',
      },
    ],
  },
  {
    label: 'Marketing',
    color: '#FFF9F0',
    borderColor: '#F59E0B',
    textColor: '#92400E',
    description:
      'Google Ads si TikTok Pixel - masurare conversii campanii. Necesita consimtamant.',
    rows: [
      {
        name: '_gcl_au',
        provider: 'google.com',
        providerUrl: 'https://policies.google.com/privacy',
        purpose: 'Google Ads - stocheaza experimentele de conversie',
        duration: '90 zile',
        type: 'HTTP',
      },
      {
        name: 'IDE',
        provider: 'doubleclick.net',
        providerUrl: 'https://policies.google.com/privacy',
        purpose: 'Google Ads - remarketing si masurare conversii',
        duration: '13 luni',
        type: 'HTTP',
      },
      {
        name: '_ttp',
        provider: 'tiktok.com',
        providerUrl: 'https://www.tiktok.com/legal/page/global/privacy-policy',
        purpose: 'TikTok Pixel - masurare conversii campanii TikTok',
        duration: '13 luni',
        type: 'HTTP',
      },
      {
        name: 'tt_webid_v2',
        provider: 'tiktok.com',
        providerUrl: 'https://www.tiktok.com/legal/page/global/privacy-policy',
        purpose: 'TikTok Pixel - identificare vizitator pentru atribuire',
        duration: '1 an',
        type: 'HTTP',
      },
    ],
  },
  {
    label: 'GTM',
    color: '#F8FAFB',
    borderColor: '#8B5CF6',
    textColor: '#4C1D95',
    description: 'Google Tag Manager - gestionarea etichetelor de tracking.',
    rows: [
      {
        name: '_gtm_*',
        provider: 'googletagmanager.com',
        providerUrl: 'https://policies.google.com/privacy',
        purpose: 'Google Tag Manager - gestionare etichete',
        duration: 'Sesiune',
        type: 'HTTP',
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// PreferenceManager component
// ---------------------------------------------------------------------------

function PreferenceManager() {
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const c = getCookieConsent();
    if (c) {
      setAnalytics(c.analytics);
      setMarketing(c.marketing);
    }
  }, []);

  function update(newAnalytics: boolean, newMarketing: boolean) {
    setAnalytics(newAnalytics);
    setMarketing(newMarketing);
    setCookieConsent({ analytics: newAnalytics, marketing: newMarketing });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div
      style={{
        background: '#F8FAFB',
        border: '1px solid #E8ECF0',
        borderRadius: 12,
        padding: '20px 24px',
        marginBottom: 32,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 4,
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 700,
            fontSize: '0.9375rem',
            color: '#0D1117',
            margin: 0,
          }}
        >
          Gestioneaza preferintele tale
        </p>
        {saved && (
          <span
            style={{
              fontSize: 12,
              color: '#059669',
              fontWeight: 600,
              fontFamily: 'var(--font-body)',
            }}
          >
            Preferinte salvate
          </span>
        )}
      </div>
      <p
        style={{
          fontSize: 13,
          color: '#64748B',
          marginBottom: 16,
          fontFamily: 'var(--font-body)',
        }}
      >
        Modificarile sunt salvate automat.
      </p>

      {/* Essential - always on */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 0',
          borderTop: '1px solid #F1F5F9',
        }}
      >
        <div>
          <p
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: '#0D1117',
              margin: '0 0 2px',
              fontFamily: 'var(--font-body)',
            }}
          >
            Cookie-uri esentiale
          </p>
          <p
            style={{ fontSize: 12, color: '#64748B', margin: 0, fontFamily: 'var(--font-body)' }}
          >
            Intotdeauna active - necesare pentru functionarea site-ului
          </p>
        </div>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            padding: '3px 10px',
            borderRadius: 20,
            background: '#ECFDF5',
            color: '#059669',
            border: '1px solid #A7F3D0',
          }}
        >
          Activ
        </span>
      </div>

      {/* Analytics */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 0',
          borderTop: '1px solid #F1F5F9',
        }}
      >
        <div>
          <p
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: '#0D1117',
              margin: '0 0 2px',
              fontFamily: 'var(--font-body)',
            }}
          >
            Cookie-uri analitice
          </p>
          <p
            style={{ fontSize: 12, color: '#64748B', margin: 0, fontFamily: 'var(--font-body)' }}
          >
            Google Analytics 4 - date anonimizate
          </p>
        </div>
        <button
          role="switch"
          aria-checked={analytics}
          onClick={() => update(!analytics, marketing)}
          style={{
            position: 'relative',
            flexShrink: 0,
            width: 42,
            height: 24,
            borderRadius: 12,
            background: analytics ? '#2B8FCC' : '#CBD5E1',
            border: 'none',
            cursor: 'pointer',
            transition: 'background 200ms ease',
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: 3,
              left: analytics ? 21 : 3,
              width: 18,
              height: 18,
              borderRadius: '50%',
              background: '#fff',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
              transition: 'left 200ms ease',
            }}
          />
        </button>
      </div>

      {/* Marketing */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 0',
          borderTop: '1px solid #F1F5F9',
        }}
      >
        <div>
          <p
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: '#0D1117',
              margin: '0 0 2px',
              fontFamily: 'var(--font-body)',
            }}
          >
            Cookie-uri de marketing
          </p>
          <p
            style={{ fontSize: 12, color: '#64748B', margin: 0, fontFamily: 'var(--font-body)' }}
          >
            Google Ads, TikTok Pixel
          </p>
        </div>
        <button
          role="switch"
          aria-checked={marketing}
          onClick={() => update(analytics, !marketing)}
          style={{
            position: 'relative',
            flexShrink: 0,
            width: 42,
            height: 24,
            borderRadius: 12,
            background: marketing ? '#2B8FCC' : '#CBD5E1',
            border: 'none',
            cursor: 'pointer',
            transition: 'background 200ms ease',
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: 3,
              left: marketing ? 21 : 3,
              width: 18,
              height: 18,
              borderRadius: '50%',
              background: '#fff',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
              transition: 'left 200ms ease',
            }}
          />
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// CookieTable component
// ---------------------------------------------------------------------------

function CookieTable() {
  return (
    <>
      {COOKIE_CATEGORIES.map((cat) => (
        <div key={cat.label} style={{ marginBottom: 24 }}>
          {/* Category header */}
          <div
            style={{
              background: cat.color,
              borderLeft: `4px solid ${cat.borderColor}`,
              padding: '12px 16px',
              borderRadius: '8px 8px 0 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
            }}
          >
            <div>
              <span style={{ fontWeight: 700, fontSize: 13, color: cat.textColor }}>
                {cat.label}
              </span>
              <p
                style={{
                  fontSize: 12,
                  color: cat.textColor,
                  opacity: 0.8,
                  margin: '2px 0 0',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {cat.description}
              </p>
            </div>
          </div>

          {/* Table */}
          <div
            style={{
              overflowX: 'auto',
              border: '1px solid #E8ECF0',
              borderTop: 'none',
              borderRadius: '0 0 8px 8px',
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr style={{ background: '#F8FAFB' }}>
                  {['Nume cookie', 'Furnizor', 'Scop', 'Durata', 'Tip'].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: '8px 12px',
                        textAlign: 'left',
                        fontWeight: 600,
                        color: '#374151',
                        borderBottom: '1px solid #E8ECF0',
                        fontFamily: 'var(--font-body)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cat.rows.map((row, i) => (
                  <tr key={row.name} style={{ background: i % 2 === 0 ? '#fff' : '#F8FAFB' }}>
                    <td
                      style={{
                        padding: '8px 12px',
                        fontFamily: 'monospace',
                        fontSize: 11,
                        color: '#1A202C',
                        borderBottom: '1px solid #F1F5F9',
                      }}
                    >
                      {row.name}
                    </td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #F1F5F9' }}>
                      <a
                        href={row.providerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#2B8FCC', fontSize: 12, fontFamily: 'var(--font-body)' }}
                      >
                        {row.provider}
                      </a>
                    </td>
                    <td
                      style={{
                        padding: '8px 12px',
                        color: '#374151',
                        fontFamily: 'var(--font-body)',
                        lineHeight: 1.5,
                        borderBottom: '1px solid #F1F5F9',
                      }}
                    >
                      {row.purpose}
                    </td>
                    <td
                      style={{
                        padding: '8px 12px',
                        color: '#374151',
                        fontFamily: 'var(--font-body)',
                        whiteSpace: 'nowrap',
                        borderBottom: '1px solid #F1F5F9',
                      }}
                    >
                      {row.duration}
                    </td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #F1F5F9' }}>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: 4,
                          background: row.type === 'HTTP' ? '#EAF5FF' : '#F5F3FF',
                          color: row.type === 'HTTP' ? '#2B8FCC' : '#7C3AED',
                        }}
                      >
                        {row.type}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </>
  );
}

// ---------------------------------------------------------------------------
// Sub-components (layout helpers)
// ---------------------------------------------------------------------------

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      data-section={id}
      style={{
        fontFamily: 'var(--font-serif)',
        fontWeight: 600,
        fontSize: '1.5rem',
        color: '#0D1117',
        borderBottom: '2px solid #2B8FCC',
        paddingBottom: 12,
        marginBottom: 24,
      }}
    >
      {children}
    </h2>
  );
}

function Para({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: '1rem',
        lineHeight: 1.85,
        color: '#1A202C',
        marginBottom: 16,
      }}
    >
      {children}
    </p>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontWeight: 600,
        color: '#0D1117',
        marginTop: 20,
        marginBottom: 8,
        fontSize: '0.9375rem',
        lineHeight: 1.6,
      }}
    >
      {children}
    </p>
  );
}

function ItemList({ children }: { children: React.ReactNode }) {
  return (
    <ul
      style={{
        paddingLeft: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        marginBottom: 16,
        listStyleType: 'disc',
      }}
    >
      {children}
    </ul>
  );
}

function Item({ children }: { children: React.ReactNode }) {
  return (
    <li
      style={{
        lineHeight: 1.75,
        color: '#1A202C',
        fontSize: '1rem',
      }}
    >
      {children}
    </li>
  );
}

function SectionDivider() {
  return (
    <hr
      style={{
        border: 'none',
        borderTop: '1px solid #F0F0F0',
        margin: '0',
      }}
    />
  );
}

function TocLinks({ activeSection }: { activeSection: string }) {
  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <>
      {TOC_SECTIONS.map((s, idx) => (
        <button
          key={s.id}
          onClick={() => scrollTo(s.id)}
          style={{
            display: 'flex',
            gap: 8,
            alignItems: 'center',
            cursor: 'pointer',
            padding: '5px 0',
            background: 'none',
            border: 'none',
            textAlign: 'left',
            width: '100%',
          }}
        >
          <span
            style={{
              fontSize: 11,
              color: '#94A3B8',
              minWidth: 18,
              fontVariantNumeric: 'tabular-nums',
              flexShrink: 0,
            }}
          >
            {idx + 1}
          </span>
          <span
            style={{
              fontSize: 13,
              color: activeSection === s.id ? '#2B8FCC' : '#4A5568',
              fontWeight: activeSection === s.id ? 600 : 400,
              lineHeight: 1.4,
            }}
          >
            {s.label}
          </span>
        </button>
      ))}
    </>
  );
}

// ---------------------------------------------------------------------------
// JSON-LD
// ---------------------------------------------------------------------------

function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Politica de Cookies Inovex',
    url: 'https://inovex.ro/politica-cookies',
    dateModified: '2026-04-01',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ---------------------------------------------------------------------------
// Main client component
// ---------------------------------------------------------------------------

export default function PoliticaCookiesClient() {
  const [activeSection, setActiveSection] = useState<string>('sectiunea-1');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) {
          const id = (visible.target as HTMLElement).dataset.section;
          if (id) setActiveSection(id);
        }
      },
      { rootMargin: '-80px 0px -60% 0px' },
    );

    const headings = document.querySelectorAll<HTMLElement>('h2[data-section]');
    headings.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  function handleDownload() {
    window.print();
  }

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href);
  }

  return (
    <>
      <JsonLd />

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { font-size: 12pt; }
          h2 { page-break-before: always; }
          h2:first-of-type { page-break-before: avoid; }
        }
        li::marker { color: #2B8FCC; }
      `}</style>

      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: 'clamp(80px,10vw,100px) clamp(20px,5vw,48px)',
        }}
      >
        {/* Breadcrumb */}
        <nav
          className="no-print"
          style={{ fontSize: 13, color: '#64748B', marginBottom: 20 }}
          aria-label="Breadcrumb"
        >
          <Link href="/" style={{ color: '#2B8FCC', textDecoration: 'none' }}>
            Acasa
          </Link>
          <span style={{ margin: '0 6px' }}>&#8250;</span>
          <span>Politica de Cookies</span>
        </nav>

        {/* Badge */}
        <div style={{ marginBottom: 16 }}>
          <Badge variant="outline" className="no-print">
            <Settings2 size={13} />
            Cookies
          </Badge>
        </div>

        {/* H1 */}
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 600,
            fontSize: 'clamp(2rem,3.5vw,3rem)',
            color: '#0D1117',
            marginBottom: 16,
            lineHeight: 1.15,
          }}
        >
          Politica de Cookies
        </h1>

        {/* Meta row + buttons */}
        <div
          className="no-print"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 12,
            marginBottom: 24,
          }}
        >
          <span style={{ fontSize: 13, color: '#64748B' }}>
            Ultima actualizare: 1 aprilie 2026
          </span>
          <span style={{ fontSize: 13, color: '#64748B' }}>Versiunea 1.0</span>

          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download size={14} />
            Descarca PDF
          </Button>
          <Button variant="ghost" size="sm" onClick={handleCopyLink}>
            <Link2 size={14} />
            Copiaza link
          </Button>
        </div>

        {/* Alert */}
        <div
          className="no-print"
          style={{
            background: '#EAF5FF',
            border: '1px solid #C8E6F8',
            borderRadius: 8,
            padding: '12px 16px',
            display: 'flex',
            gap: 10,
            alignItems: 'flex-start',
            marginBottom: 40,
          }}
        >
          <Settings2 size={16} color="#2B8FCC" style={{ flexShrink: 0, marginTop: 2 }} />
          <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: '#1e40af', margin: 0 }}>
            Aceasta pagina explica exact ce cookie-uri folosim, de ce si cum le poti controla. Poti
            modifica preferintele oricand din bannerul de cookie-uri sau din setarile browserului.
          </p>
        </div>

        {/* Mobile accordion TOC */}
        <div className="lg:hidden no-print" style={{ marginBottom: 32 }}>
          <Accordion type="single" collapsible>
            <AccordionItem value="toc">
              <AccordionTrigger>Cuprins (8 sectiuni)</AccordionTrigger>
              <AccordionContent>
                <div style={{ display: 'flex', flexDirection: 'column', paddingTop: 4 }}>
                  <TocLinks activeSection={activeSection} />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Two-column layout */}
        <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>

          {/* Sidebar (desktop) */}
          <aside
            className="hidden lg:block no-print"
            style={{
              width: 260,
              flexShrink: 0,
              position: 'sticky',
              top: 100,
              maxHeight: 'calc(100vh - 120px)',
              overflowY: 'auto',
            }}
          >
            <Card style={{ padding: 20 }}>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#64748B',
                  marginBottom: 12,
                }}
              >
                Cuprins
              </p>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <TocLinks activeSection={activeSection} />
              </div>
            </Card>
          </aside>

          {/* Main content */}
          <main style={{ flex: 1, minWidth: 0 }}>

            {/* Section 1 */}
            <section
              id="sectiunea-1"
              style={{ paddingBottom: 40, display: 'flex', flexDirection: 'column', gap: 0 }}
            >
              <SectionHeading id="sectiunea-1">1. Ce sunt cookie-urile</SectionHeading>
              <Para>
                Cookie-urile sunt fisiere text de mici dimensiuni pe care un site web le stocheaza pe
                dispozitivul tau (computer, telefon, tableta) atunci cand il vizitezi. Ele permit
                site-ului sa memoreze actiunile si preferintele tale pe o perioada de timp, astfel incat
                sa nu fie nevoie sa le reintroduci la fiecare vizita sau la navigarea de pe o pagina pe
                alta.
              </Para>
              <Para>
                Cookie-urile nu sunt programe si nu pot executa cod, nu pot transmite virusi si nu pot
                accesa informatii de pe hard disk-ul tau. Ele contin exclusiv date pe care le-ai
                furnizat tu sau care au fost colectate in cadrul utilizarii site-ului.
              </Para>
              <Para>
                Pe langa cookie-urile propriu-zise, folosim si tehnologii similare (local storage,
                session storage, pixel tracking, web beacons) care functioneaza in mod similar.
                Termenul &quot;cookie-uri&quot; din acest document acopera toate aceste tehnologii.
              </Para>
            </section>

            <SectionDivider />

            {/* Section 2 */}
            <section
              id="sectiunea-2"
              style={{ paddingTop: 40, paddingBottom: 40, display: 'flex', flexDirection: 'column', gap: 0 }}
            >
              <SectionHeading id="sectiunea-2">2. De ce folosim cookie-uri</SectionHeading>
              <Para>Folosim cookie-uri si tehnologii similare pentru:</Para>
              <ItemList>
                <Item>a) Functionarea corecta a site-ului inovex.ro (cookie-uri esentiale)</Item>
                <Item>
                  b) Intelegerea modului in care vizitatorii utilizeaza site-ul nostru, pentru a-l
                  imbunatati continuu (cookie-uri analitice)
                </Item>
                <Item>
                  c) Masurarea eficientei campaniilor noastre publicitare pe Google Ads si TikTok Ads
                  (cookie-uri de marketing)
                </Item>
                <Item>
                  d) Memorarea preferintelor tale de cookie-uri pentru vizitele ulterioare
                </Item>
              </ItemList>
              <Para>
                Nu folosim cookie-uri pentru a-ti vinde date tertilor sau pentru a crea profiluri de
                comportament in alte scopuri decat cele mentionate.
              </Para>
            </section>

            <SectionDivider />

            {/* Section 3 */}
            <section
              id="sectiunea-3"
              style={{ paddingTop: 40, paddingBottom: 40, display: 'flex', flexDirection: 'column', gap: 0 }}
            >
              <SectionHeading id="sectiunea-3">
                3. Tipurile de cookie-uri utilizate pe inovex.ro
              </SectionHeading>
              <Para>Cookie-urile sunt clasificate in functie de scopul lor:</Para>

              <SubHeading>3.1. Cookie-uri strict necesare (Esentiale)</SubHeading>
              <Para>
                Aceste cookie-uri sunt indispensabile pentru functionarea site-ului si nu pot fi
                dezactivate. Fara ele, site-ul nu poate functiona corect. Nu necesita consimtamantul
                tau, conform art. 5 alin. 3 din Directiva ePrivacy, implementata prin Legea 506/2004.
              </Para>
              <Para>Nu stocheaza informatii care te pot identifica personal.</Para>

              <SubHeading>3.2. Cookie-uri analitice (Statistici)</SubHeading>
              <Para>
                Aceste cookie-uri ne ajuta sa intelegem cum interactioneaza vizitatorii cu site-ul (ce
                pagini viziteaza, cat timp petrec, de unde vin). Toate datele sunt anonimizate sau
                pseudoanonimizate si nu pot fi folosite pentru identificarea directa a persoanelor.
              </Para>
              <Para>
                Necesita consimtamantul tau. Le poti refuza fara a afecta functionarea site-ului.
              </Para>

              <SubHeading>3.3. Cookie-uri de marketing (Publicitate)</SubHeading>
              <Para>
                Aceste cookie-uri sunt folosite pentru masurarea eficientei campaniilor noastre
                publicitare pe Google Ads si TikTok Ads. Ele permit platformelor publicitare sa stie
                daca ai vizitat site-ul nostru dupa ce ai vazut un anunt al nostru.
              </Para>
              <Para>
                Nu afisam reclame personalizate pe site-ul nostru. Aceste cookie-uri sunt folosite
                exclusiv pentru atribuirea conversiilor in campaniile noastre platite.
              </Para>
              <Para>
                Necesita consimtamantul tau. Le poti refuza fara a afecta functionarea site-ului.
              </Para>

              <SubHeading>3.4. Cookie-uri de preferinte</SubHeading>
              <Para>
                Aceste cookie-uri memoreaza alegerile tale (inclusiv preferintele de cookie-uri) pentru
                a nu fi nevoie sa le reintroduci la fiecare vizita.
              </Para>
            </section>

            <SectionDivider />

            {/* Section 4 */}
            <section
              id="sectiunea-4"
              style={{ paddingTop: 40, paddingBottom: 40, display: 'flex', flexDirection: 'column', gap: 0 }}
            >
              <SectionHeading id="sectiunea-4">
                4. Lista detaliata a cookie-urilor utilizate
              </SectionHeading>
              <Para>
                Mai jos gasesti toate cookie-urile si tehnologiile similare pe care le folosim, grupate
                pe categorii.
              </Para>
              <PreferenceManager />
              <CookieTable />
            </section>

            <SectionDivider />

            {/* Section 5 */}
            <section
              id="sectiunea-5"
              style={{ paddingTop: 40, paddingBottom: 40, display: 'flex', flexDirection: 'column', gap: 0 }}
            >
              <SectionHeading id="sectiunea-5">
                5. Consimtamantul si controlul preferintelor tale
              </SectionHeading>

              <SubHeading>5.1. Bannerul de cookie-uri</SubHeading>
              <Para>
                La prima vizitare a site-ului inovex.ro, iti afisam un banner care iti permite sa alegi
                ce cookie-uri accepti. Ai trei optiuni:
              </Para>
              <ItemList>
                <Item>
                  a) &quot;Accepta toate&quot; - accepti toate categoriile de cookie-uri
                </Item>
                <Item>
                  b) &quot;Refuza toate&quot; - accepti doar cookie-urile strict necesare
                </Item>
                <Item>
                  c) &quot;Personalizeaza&quot; - alegi individual fiecare categorie
                </Item>
              </ItemList>
              <Para>
                Alegerea ta este memorata timp de 12 luni. Poti modifica preferintele oricand
                accesand butonul &quot;Setari cookies&quot; din footer-ul site-ului.
              </Para>

              <SubHeading>5.2. Retragerea consimtamantului</SubHeading>
              <Para>Poti retrage sau modifica consimtamantul in orice moment:</Para>
              <ItemList>
                <Item>Click pe &quot;Setari cookies&quot; din footer</Item>
                <Item>Din setarile browserului tau (instructiuni mai jos)</Item>
                <Item>Trimitand un email la contact@inovex.ro</Item>
              </ItemList>
              <Para>
                Retragerea consimtamantului nu afecteaza legalitatea prelucrarilor efectuate in baza
                consimtamantului inainte de retragere.
              </Para>

              <SubHeading>5.3. Controlul prin setarile browserului</SubHeading>
              <Para>Poti gestiona sau dezactiva cookie-urile direct din browserul tau:</Para>
              <ItemList>
                <Item>
                  Google Chrome: Setari &gt; Confidentialitate si securitate &gt; Cookie-uri
                </Item>
                <Item>
                  Mozilla Firefox: Setari &gt; Confidentialitate si securitate &gt; Cookie-uri
                </Item>
                <Item>Safari: Preferinte &gt; Confidentialitate &gt; Cookie-uri</Item>
                <Item>
                  Microsoft Edge: Setari &gt; Cookie-uri si permisiuni site
                </Item>
              </ItemList>
              <Para>
                Retine ca dezactivarea cookie-urilor esentiale poate afecta functionarea site-ului.
              </Para>

              <SubHeading>5.4. Opt-out specific per platforma</SubHeading>
              <ItemList>
                <Item>Google Analytics: https://tools.google.com/dlpage/gaoptout</Item>
                <Item>Google Ads: https://adssettings.google.com</Item>
                <Item>TikTok: https://www.tiktok.com/legal/page/global/privacy-policy</Item>
              </ItemList>
            </section>

            <SectionDivider />

            {/* Section 6 */}
            <section
              id="sectiunea-6"
              style={{ paddingTop: 40, paddingBottom: 40, display: 'flex', flexDirection: 'column', gap: 0 }}
            >
              <SectionHeading id="sectiunea-6">
                6. Transferuri internationale prin cookie-uri
              </SectionHeading>
              <Para>
                Unele cookie-uri sunt setate de furnizori cu sediul in Statele Unite ale Americii
                (Google LLC, TikTok Inc.). Transferurile de date sunt realizate cu garantii adecvate
                conform GDPR:
              </Para>
              <ItemList>
                <Item>
                  Google LLC: acoperit de Standard Contractual Clauses (SCC) adoptate de Comisia
                  Europeana, disponibile la https://privacy.google.com/businesses/processorterms/
                </Item>
                <Item>
                  TikTok Inc.: acoperit de Standard Contractual Clauses (SCC), disponibile in
                  Politica de Confidentialitate TikTok
                </Item>
              </ItemList>
            </section>

            <SectionDivider />

            {/* Section 7 */}
            <section
              id="sectiunea-7"
              style={{ paddingTop: 40, paddingBottom: 40, display: 'flex', flexDirection: 'column', gap: 0 }}
            >
              <SectionHeading id="sectiunea-7">
                7. Actualizari ale prezentei politici
              </SectionHeading>
              <Para>
                Aceasta Politica de Cookies poate fi actualizata periodic pentru a reflecta modificari
                in cookie-urile utilizate sau in cerintele legale.
              </Para>
              <Para>
                Data ultimei modificari este afisata la inceputul documentului. Modificarile
                semnificative vor fi comunicate prin bannerul de cookie-uri sau prin afisare prominenta
                pe site.
              </Para>
              <Para>
                Te rugam sa verifici periodic aceasta pagina pentru a fi la curent cu practicile
                noastre privind cookie-urile.
              </Para>
            </section>

            <SectionDivider />

            {/* Section 8 */}
            <section
              id="sectiunea-8"
              style={{ paddingTop: 40, paddingBottom: 40, display: 'flex', flexDirection: 'column', gap: 0 }}
            >
              <SectionHeading id="sectiunea-8">8. Contact</SectionHeading>
              <Para>Pentru intrebari despre utilizarea cookie-urilor pe inovex.ro:</Para>
              <ItemList>
                <Item>
                  Email: contact@inovex.ro (subiect: &quot;Cookie-uri - [intrebarea ta]&quot;)
                </Item>
                <Item>Telefon: 0750 456 096 (Luni-Vineri, 09:00-18:00)</Item>
              </ItemList>
              <Para>
                Autoritatea competenta pentru plangeri privind cookie-urile: ANSPDCP -
                https://www.dataprotection.ro
              </Para>
              <Para>
                Prezenta Politica de Cookies a fost redactata conform Legii 506/2004 si
                Regulamentului (UE) 2016/679 (GDPR), in vigoare la data: 1 aprilie 2026.
              </Para>
            </section>

          </main>
        </div>
      </div>
    </>
  );
}
