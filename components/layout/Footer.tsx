'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';
import { trackConversions } from '@/lib/gtm';

/* ══════════════════════════════════════════════════════
   DATE
══════════════════════════════════════════════════════ */
const SERVICII = [
  { href: '/servicii/magazine-online',       label: 'Magazine Online'        },
  { href: '/servicii/website-de-prezentare', label: 'Website de Prezentare'  },
  { href: '/servicii/aplicatii-web-saas',    label: 'Aplicatii Web si SaaS'  },
  { href: '/servicii/cms-crm-erp',           label: 'CMS / CRM / ERP'        },
  { href: '/servicii/aplicatii-mobile',      label: 'Aplicatii Mobile'        },
  { href: '/servicii/automatizari-ai',       label: 'Automatizari AI'         },
];

const COMPANIE = [
  { href: '/portofoliu',                     label: 'Portofoliu'              },
  { href: '/marketplace',                    label: 'Marketplace'             },
  { href: 'https://www.novin.ro',            label: 'Audit Website Gratuit', external: true },
  { href: '/oferta',                         label: 'Solicita Oferta'         },
  { href: '/contact',                        label: 'Contact'                 },
];

const LEGAL = [
  { href: '/termeni-si-conditii',            label: 'Termeni si Conditii'         },
  { href: '/politica-de-confidentialitate',  label: 'Politica de Confidentialitate' },
  { href: '/politica-cookies',               label: 'Politica de Cookies'         },
];

/* ══════════════════════════════════════════════════════
   STYLES HELPERS
══════════════════════════════════════════════════════ */
const colTitle: React.CSSProperties = {
  fontFamily:    'var(--font-body)',
  fontWeight:    700,
  fontSize:      11,
  textTransform: 'uppercase',
  letterSpacing: '0.10em',
  color:         '#0D1117',
  marginBottom:  16,
};

const linkStyle: React.CSSProperties = {
  fontFamily:     'var(--font-body)',
  fontWeight:     400,
  fontSize:       14,
  color:          '#6B7280',
  textDecoration: 'none',
  lineHeight:     1,
  display:        'block',
  transition:     'color 150ms ease',
};

/* ══════════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════════ */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      aria-label="Footer"
      style={{ background: '#fff', borderTop: '1px solid #E8ECF0' }}
    >
      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
          gap: 64px;
        }
        .footer-link:hover { color: #0D1117!important; }
        @media (max-width: 1023px) {
          .footer-grid { grid-template-columns: 1fr 1fr 1fr; }
        }
        @media (max-width: 639px) {
          .footer-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      {/* Main */}
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: 'clamp(48px,7vw,80px) clamp(24px,4vw,64px)' }}>
        <div className="footer-grid">

          {/* ── Col 1: Brand ── */}
          <div>
            <Link href="/" aria-label="Inovex">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/imagini/logo_negru.png"
                alt="Inovex"
                style={{ height: 40, width: 'auto', display: 'block' }}
              />
            </Link>

            <p style={{
              fontFamily: 'var(--font-body)', fontWeight: 400,
              fontSize: 14, lineHeight: 1.7, color: '#6B7280',
              marginTop: 16, maxWidth: 280,
            }}>
              Construim magazine online, website-uri de prezentare si aplicatii web care se incarca rapid, arata profesional si aduc rezultate reale pentru afacerea ta.
            </p>

            {/* Social */}
            <div style={{ display: 'flex', gap: 8, marginTop: 24 }}>
              {[
                { href: 'https://www.facebook.com/inovex.ro',  label: 'Facebook Inovex',  icon: <FacebookIcon /> },
                { href: 'https://www.instagram.com/inovex.ro', label: 'Instagram Inovex', icon: <InstagramIcon /> },
                { href: 'https://www.tiktok.com/@inovex.ro',   label: 'TikTok Inovex',    icon: <TikTokIcon /> },
              ].map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: 36, height: 36, borderRadius: 8,
                    border: '1px solid #E8ECF0', background: '#F9FAFB',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#6B7280', transition: 'border-color 150ms ease, color 150ms ease',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = '#2B8FCC';
                    (e.currentTarget as HTMLAnchorElement).style.color       = '#2B8FCC';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = '#E8ECF0';
                    (e.currentTarget as HTMLAnchorElement).style.color       = '#6B7280';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Col 2: Servicii ── */}
          <div>
            <p style={colTitle}>Servicii</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {SERVICII.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="footer-link" style={linkStyle}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Companie ── */}
          <div>
            <p style={colTitle}>Companie</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {COMPANIE.map((l) => (
                <li key={l.href}>
                  {'external' in l && l.external ? (
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-link"
                      style={linkStyle}
                    >
                      {l.label}
                    </a>
                  ) : (
                    <Link href={l.href} className="footer-link" style={linkStyle}>{l.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 4: Legal + ANPC ── */}
          <div>
            <p style={colTitle}>Legal</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {LEGAL.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="footer-link" style={linkStyle}>{l.label}</Link>
                </li>
              ))}
            </ul>

            {/* ANPC */}
            <div style={{ display: 'flex', gap: 8, marginTop: 24, alignItems: 'center' }}>
              <a
                href="https://anpc.ro/ce-este-sal/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SAL ANPC"
              >
                <Image
                  src="/imagini/footer/SAL.png"
                  alt="SAL ANPC"
                  width={70}
                  height={35}
                  style={{ height: 35, width: 'auto', objectFit: 'contain' }}
                />
              </a>
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SOL ANPC"
              >
                <Image
                  src="/imagini/footer/SOL.png"
                  alt="SOL ANPC"
                  width={70}
                  height={35}
                  style={{ height: 35, width: 'auto', objectFit: 'contain' }}
                />
              </a>
            </div>
          </div>

          {/* ── Col 5: Contact ── */}
          <div>
            <p style={colTitle}>Contact</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li>
                <a
                  href="mailto:contact@inovex.ro"
                  className="footer-link"
                  style={{ ...linkStyle, display: 'flex', alignItems: 'center', gap: 8 }}
                >
                  <Mail size={15} style={{ color: '#2B8FCC', flexShrink: 0 }} />
                  contact@inovex.ro
                </a>
              </li>
              <li>
                <a
                  href="tel:+40750456096"
                  onClick={() => trackConversions.telefon()}
                  className="footer-link"
                  style={{ ...linkStyle, display: 'flex', alignItems: 'center', gap: 8 }}
                >
                  <Phone size={15} style={{ color: '#2B8FCC', flexShrink: 0 }} />
                  0750 456 096
                </a>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <MapPin size={15} style={{ color: '#2B8FCC', flexShrink: 0, marginTop: 1 }} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#6B7280', lineHeight: 1.6 }}>
                  Targu Jiu / Bucuresti
                </span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid #E8ECF0' }}>
        <div style={{
          maxWidth: 1440, margin: '0 auto',
          padding: '18px clamp(24px,4vw,64px)',
          display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'space-between',
          gap: 8,
        }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#9CA3AF', margin: 0 }}>
            &copy; {year} Inovex. Toate drepturile rezervate.
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#9CA3AF', margin: 0 }}>
            VOID SFT GAMES SRL &nbsp;|&nbsp; CUI: 43474393
          </p>
          <button
            onClick={() => {
              if (typeof window !== 'undefined') {
                localStorage.removeItem('cookie_consent');
                window.location.reload();
              }
            }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              fontSize: 12,
              color: '#9CA3AF',
              padding: 0,
              transition: 'color 150ms ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#6B7280'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#9CA3AF'; }}
          >
            Setari cookies
          </button>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════════════
   SOCIAL ICONS
══════════════════════════════════════════════════════ */
function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.81a8.18 8.18 0 004.78 1.52V6.88a4.85 4.85 0 01-1.01-.19z" />
    </svg>
  );
}
