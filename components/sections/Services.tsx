'use client';

import { useState, type ComponentType } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight, ChevronRight, Check,
  Smartphone, Cpu, Wrench, Globe2,
} from 'lucide-react';
import ServiceVideo from './ServiceVideo';
import type { ServiceRowJSON } from '@/lib/site-data';

/* ══════════════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════════════ */
type LucideIcon = ComponentType<{
  size?: number;
  color?: string;
  strokeWidth?: number;
  style?: React.CSSProperties;
}>;

interface ServiceFeature {
  text: string;
  logos?: string[]; // paths relative to /public
}

interface Service {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  titleItalicWord: string;
  description: string;
  features: ServiceFeature[];
  ctaText: string;
  ctaHref: string;
  detailsHref: string;
  videoSrc: string;
  hasVideoLeft: boolean;
}

/* ══════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════ */
const SERVICES: Service[] = [
  {
    id: 'magazine-online',
    number: '01',
    eyebrow: 'Magazin Online',
    title: 'Magazin online la cheie, integrat cu tot ce ai nevoie',
    titleItalicWord: 'cheie',
    description:
      'Integram tot ce are nevoie un magazin online sa functioneze: procesatori de plata, firme de curierat, soft de facturare si optimizare pentru Google. Un singur proiect, zero batai de cap.',
    features: [
      { text: 'Design 100% personalizat, creat de la zero pentru brandul tau' },
      {
        text: 'Integrare metode de plata: Cash, Card si altele',
        logos: [
          '/imagini/servicii/logo-companii/stripe.svg',
          '/imagini/servicii/logo-companii/netopia.svg',
        ],
      },
      {
        text: 'Integrare soft de facturare',
        logos: [
          '/imagini/servicii/logo-companii/smartbill.svg',
          '/imagini/servicii/logo-companii/oblio.webp',
          '/imagini/servicii/logo-companii/fgo.svg',
          '/imagini/servicii/logo-companii/saga.svg',
        ],
      },
      {
        text: 'Integrare curieri',
        logos: [
          '/imagini/servicii/logo-companii/cargus.svg',
          '/imagini/servicii/logo-companii/fan.svg',
          '/imagini/servicii/logo-companii/sameday.webp',
          '/imagini/servicii/logo-companii/dpd.svg',
        ],
      },
      { text: 'Panou de administrare intuitiv, fara cunostinte tehnice' },
    ],
    ctaText: 'Configureaza oferta',
    ctaHref: '/oferta',
    detailsHref: '/servicii/magazine-online',
    videoSrc: '/imagini/servicii/magazin-online.mp4',
    hasVideoLeft: true,
  },
  {
    id: 'website-prezentare',
    number: '02',
    eyebrow: 'Website de Prezentare',
    title: 'Website de prezentare profesional, pentru orice domeniu de activitate',
    titleItalicWord: 'profesional',
    description:
      'Am construit website-uri pentru stomatologi, avocati, firme de constructii, restaurante si zeci de alte domenii. Stim ce functioneaza in fiecare industrie si livram un site gata sa atraga clienti din prima zi.',
    features: [
      { text: 'Design 100% personalizat, adaptat specificului domeniului tau' },
      { text: 'Realizat pentru orice industrie: medical, juridic, constructii, HoReCa, servicii, retail' },
      { text: 'Formulare de contact cu notificari instant la fiecare mesaj primit' },
      { text: 'Integrare Google Maps, WhatsApp Business si programari online' },
      { text: 'SEO tehnic complet: schema markup, sitemap, Search Console configurat' },
    ],
    ctaText: 'Solicita oferta',
    ctaHref: '/oferta',
    detailsHref: '/servicii/website-de-prezentare',
    videoSrc: '/imagini/servicii/website-prezentare.mp4',
    hasVideoLeft: false,
  },
  {
    id: 'aplicatii-web-saas',
    number: '03',
    eyebrow: 'Aplicatii Web & SaaS',
    title: 'Construim aplicatia ta web complet, de la zero la lansare',
    titleItalicWord: 'complet',
    description:
      'Ai o idee pentru o platforma online sau un tool care sa rezolve o problema reala? Noi o construim complet. Tu ne explici ce trebuie sa faca, noi ne ocupam de tot ce e in spate.',
    features: [
      { text: 'Dashboard-uri cu date si rapoarte in timp real' },
      { text: 'Platforme SaaS cu planuri de subscriptie si billing recurent' },
      { text: 'Aplicatii de management intern: HR, logistica, productie' },
      { text: 'Portale clienti si extranet-uri B2B' },
      { text: 'Aplicatii de rezervari si programari cu calendar integrat' },
    ],
    ctaText: 'Solicita oferta',
    ctaHref: '/oferta',
    detailsHref: '/servicii/aplicatii-web-saas',
    videoSrc: '/imagini/servicii/aplicatie-web.mp4',
    hasVideoLeft: true,
  },
  {
    id: 'cms-crm-erp',
    number: '04',
    eyebrow: 'CMS, CRM & ERP',
    title: 'Sistemul tau de management, construit dupa cum lucrezi tu',
    titleItalicWord: 'tu',
    description:
      'Analizam cum functioneaza afacerea ta acum, identificam unde se pierde timp si bani, si construim un sistem care rezolva exact acele probleme. Livrat complet, cu echipa ta instruita.',
    features: [
      { text: 'Scapi de fisierele Excel imprastiate si de informatiile pierdute intre emailuri' },
      { text: 'Toata echipa lucreaza din acelasi loc, vede aceleasi date in timp real' },
      { text: 'Stii in orice moment ce stoc ai, ce comenzi sunt in lucru si ce facturi sunt neincasate' },
      { text: 'Rapoartele pe care le faceai manual in ore se genereaza automat in secunde' },
      { text: 'Fiecare angajat vede doar ce are nevoie, nu toata baza de date a firmei' },
    ],
    ctaText: 'Solicita oferta',
    ctaHref: '/oferta',
    detailsHref: '/servicii/cms-crm-erp',
    videoSrc: '/imagini/servicii/crm-cms-erp.mp4',
    hasVideoLeft: false,
  },
];

/* Logo-uri cu continut alb — necesita invert pentru a fi vizibile pe fundal deschis */
const INVERT_LOGOS = new Set(['netopia.svg', 'oblio.webp', 'fgo.svg']);

function logoFilter(src: string): string {
  const filename = src.split('/').pop() ?? '';
  return INVERT_LOGOS.has(filename)
    ? 'invert(1) grayscale(1) opacity(0.6)'
    : 'grayscale(1) opacity(0.6)';
}

const ALSO_AVAILABLE: { icon: LucideIcon; label: string; href: string }[] = [
  { icon: Smartphone, label: 'Aplicatii Mobile',    href: '/servicii/aplicatii-mobile' },
  { icon: Cpu,        label: 'Automatizari & AI',   href: '/servicii/automatizari-ai' },
  { icon: Globe2,     label: 'Integrari API',        href: '/servicii/integrari-api' },
  { icon: Wrench,     label: 'Mentenanta tehnica',  href: '/servicii/mentenanta' },
];

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];
const SPRING: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

/* ══════════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════════ */
function renderTitle(title: string, italicWord: string) {
  const idx = title.indexOf(italicWord);
  if (idx === -1) return <>{title}</>;
  return (
    <>
      {title.slice(0, idx)}
      <em style={{ fontStyle: 'italic' }}>{italicWord}</em>
      {title.slice(idx + italicWord.length)}
    </>
  );
}

/* ══════════════════════════════════════════════════════
   VIDEO COLUMN
══════════════════════════════════════════════════════ */
function VideoColumn({
  service,
  reduce,
  colOrder,
}: {
  service: Service;
  reduce: boolean;
  colOrder: number;
}) {
  const fromX = service.hasVideoLeft ? -40 : 40;

  return (
    <motion.div
      style={{ order: colOrder, position: 'relative' }}
      initial={reduce ? false : { opacity: 0, x: fromX }}
      whileInView={reduce ? {} : { opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      {/* Decorative number */}
      <div aria-hidden style={{
        position: 'absolute',
        top: -20,
        ...(!service.hasVideoLeft ? { right: -12, left: 'auto' } : { left: -12 }),
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: '5rem',
        lineHeight: 1,
        color: '#F4F6F8',
        pointerEvents: 'none',
        userSelect: 'none',
        zIndex: -1,
      }}>
        {service.number}
      </div>

      {/* Glow */}
      <div aria-hidden style={{
        position: 'absolute', inset: -1, borderRadius: 18,
        boxShadow: '0 24px 64px rgba(43,143,204,0.10), 0 8px 24px rgba(0,0,0,0.07)',
        zIndex: -1, pointerEvents: 'none',
      }} />

      {/* Video container */}
      <div style={{
        position: 'relative', width: '100%',
        aspectRatio: '16 / 10', borderRadius: 16,
        overflow: 'hidden', background: '#0D1117',
      }}>
        <ServiceVideo src={service.videoSrc} />
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          border: '1px solid rgba(0,0,0,0.08)', borderRadius: 16,
          pointerEvents: 'none', zIndex: 2,
        }} />
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════
   DETAILS COLUMN
══════════════════════════════════════════════════════ */
function DetailsColumn({
  service,
  reduce,
  colOrder,
}: {
  service: Service;
  reduce: boolean;
  colOrder: number;
}) {
  const [ctaHovered, setCtaHovered] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const fromX = service.hasVideoLeft ? 40 : -40;

  return (
    <motion.div
      style={{ order: colOrder, display: 'flex', flexDirection: 'column' }}
      initial={reduce ? false : { opacity: 0, x: fromX }}
      whileInView={reduce ? {} : { opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: 0.12, ease: EASE }}
    >
      {/* Number + eyebrow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <span style={{
          fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.75rem',
          color: '#2B8FCC', background: '#EAF5FF', borderRadius: 4, padding: '3px 8px',
        }}>
          {service.number}
        </span>
        <div style={{ width: 1, height: 14, background: '#E8ECF0' }} />
        <span style={{
          fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.6875rem',
          textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8A94A6',
        }}>
          {service.eyebrow}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'clamp(1.5rem, 2.2vw, 2.1rem)',
        lineHeight: 1.15,
        letterSpacing: '-0.025em',
        color: '#0D1117',
        margin: '0 0 16px 0',
      }}>
        {renderTitle(service.title, service.titleItalicWord)}
      </h3>

      {/* Description */}
      <p style={{
        fontFamily: 'var(--font-body)', fontWeight: 400,
        fontSize: '1rem', lineHeight: 1.75, color: '#4A5568',
        maxWidth: 440, margin: 0,
      }}>
        {service.description}
      </p>

      {/* Separator */}
      <div style={{ width: 40, height: 1, background: '#E8ECF0', margin: '28px 0' }} />

      {/* Features */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {service.features.map((feat, fi) => (
          <motion.div
            key={fi}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            whileInView={reduce ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.25 + fi * 0.06, ease: EASE }}
            style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}
          >
            <div style={{
              width: 18, height: 18, flexShrink: 0, marginTop: 2,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Check size={12} color="#2B8FCC" strokeWidth={2.5} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{
                fontFamily: 'var(--font-body)', fontWeight: 500,
                fontSize: '0.9375rem', lineHeight: 1.55, color: '#1A202C',
              }}>
                {feat.text}
              </span>
              {feat.logos && feat.logos.length > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                  {feat.logos.map((src) => (
                    <div
                      key={src}
                      style={{
                        background: '#F4F6F8',
                        border: '1px solid #E8ECF0',
                        borderRadius: 7,
                        padding: '5px 10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 32,
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt=""
                        aria-hidden
                        style={{
                          height: 16,
                          maxWidth: 52,
                          objectFit: 'contain',
                          filter: logoFilter(src),
                          display: 'block',
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Buttons */}
      <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <Link
          href={service.ctaHref}
          onMouseEnter={() => setCtaHovered(true)}
          onMouseLeave={() => setCtaHovered(false)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: ctaHovered ? '#1a2030' : '#0D1117',
            color: '#fff', textDecoration: 'none',
            fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem',
            padding: '11px 20px', borderRadius: 8,
            transition: 'background 200ms ease',
          }}
        >
          {service.ctaText}
          <ArrowRight
            size={14}
            style={{
              transform: ctaHovered ? 'translateX(3px)' : 'translateX(0)',
              transition: 'transform 200ms ease',
            }}
          />
        </Link>

        <Link
          href={service.detailsHref}
          onMouseEnter={() => setLinkHovered(true)}
          onMouseLeave={() => setLinkHovered(false)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            textDecoration: 'none',
            fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '0.875rem',
            color: linkHovered ? '#2B8FCC' : '#8A94A6',
            transition: 'color 150ms ease',
          }}
        >
          Vezi detalii
          <ChevronRight
            size={14}
            style={{
              transform: linkHovered ? 'translateX(2px)' : 'translateX(0)',
              transition: 'transform 150ms ease',
            }}
          />
        </Link>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════
   SERVICE ROW
══════════════════════════════════════════════════════ */
function ServiceRow({ service, reduce }: { service: Service; reduce: boolean }) {
  const videoDesktopOrder   = service.hasVideoLeft ? 1 : 2;
  const detailsDesktopOrder = service.hasVideoLeft ? 2 : 1;

  return (
    <div style={{ borderTop: '1px solid #F0F0F0', paddingTop: 'clamp(64px,8vw,100px)', paddingBottom: 'clamp(64px,8vw,100px)' }}>
      <div
        style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 'clamp(40px,6vw,80px)', alignItems: 'center' }}
        className="services-row-grid"
      >
        <VideoColumn   service={service} reduce={reduce} colOrder={videoDesktopOrder} />
        <DetailsColumn service={service} reduce={reduce} colOrder={detailsDesktopOrder} />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   ALSO AVAILABLE
══════════════════════════════════════════════════════ */
function AlsoAvailable({ reduce }: { reduce: boolean }) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={reduce ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: EASE }}
      style={{
        borderTop: '1px solid #F0F0F0',
        paddingTop: 40,
        paddingBottom: 8,
        display: 'flex',
        alignItems: 'center',
        gap: 24,
        flexWrap: 'wrap',
      }}
    >
      <span style={{
        fontFamily: 'var(--font-body)', fontWeight: 500,
        fontSize: '0.8125rem', color: '#9CA3AF', whiteSpace: 'nowrap',
      }}>
        De asemenea construim
      </span>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {ALSO_AVAILABLE.map(({ icon: Icon, label, href }, i) => (
          <motion.div
            key={label}
            initial={reduce ? false : { opacity: 0, scale: 0.95 }}
            whileInView={reduce ? {} : { opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05, ease: EASE }}
          >
            <Link
              href={href}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                background: '#F9FAFB', border: '1px solid #E8ECF0',
                borderRadius: 8, padding: '8px 14px',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)', fontWeight: 500,
                fontSize: '0.8125rem', color: '#374151',
                transition: 'border-color 150ms ease, background 150ms ease, color 150ms ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = '#BFDBFE';
                el.style.background = '#EFF6FF';
                el.style.color = '#2B8FCC';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = '#E8ECF0';
                el.style.background = '#F9FAFB';
                el.style.color = '#374151';
              }}
            >
              <Icon size={14} color="currentColor" />
              {label}
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION HEADER
══════════════════════════════════════════════════════ */
function SectionHeader({ reduce }: { reduce: boolean }) {
  return (
    <div
      style={{ display: 'grid', gridTemplateColumns: '55% 45%', gap: 'clamp(32px,4vw,64px)', marginBottom: 0 }}
      className="services-header-grid"
    >
      {/* Left */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={reduce ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{ position: 'relative' }}
      >
        <div aria-hidden style={{
          position: 'absolute', top: -20, left: -10,
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: '8rem', lineHeight: 1, color: '#F4F6F8',
          pointerEvents: 'none', userSelect: 'none', zIndex: 0,
        }}>
          02
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, position: 'relative', zIndex: 1 }}>
          <div style={{ width: 32, height: 1, background: '#2B8FCC' }} />
          <span style={{
            fontFamily: 'var(--font-body)', fontWeight: 600,
            fontSize: '0.6875rem', textTransform: 'uppercase',
            letterSpacing: '0.10em', color: '#2B8FCC',
          }}>
            Ce construim
          </span>
        </div>

        <h2
          id="services-heading"
          style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(2.4rem, 4vw, 3.6rem)',
            lineHeight: 1.08, letterSpacing: '-0.03em',
            color: '#0D1117', margin: 0, position: 'relative', zIndex: 1,
          }}
        >
          Solutii construite<br />
          pentru <em style={{ fontStyle: 'italic', color: '#2B8FCC' }}>rezultate</em>
        </h2>
      </motion.div>

      {/* Right */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={reduce ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
        style={{ paddingTop: 24, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
        className="services-header-right"
      >
        <p style={{
          fontFamily: 'var(--font-body)', fontWeight: 400,
          fontSize: '1.0625rem', lineHeight: 1.75, color: '#4A5568',
          maxWidth: 420, margin: '0 0 28px 0',
        }}>
          Nu facem website-uri ca sa bifam un task. Fiecare proiect are un obiectiv de business clar: mai multi clienti, conversii mai mari, operatiuni mai eficiente.
        </p>

        <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: '2rem', color: '#0D1117', lineHeight: 1,
          }}>
            200+
          </span>
          <span style={{
            fontFamily: 'var(--font-body)', fontWeight: 400,
            fontSize: '0.9375rem', color: '#8A94A6',
          }}>
            proiecte livrate
          </span>
        </div>
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════ */
export function Services({ data: _data }: { data?: ServiceRowJSON[] } = {}) {
  const reduce = useReducedMotion() ?? false;

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .services-header-grid { grid-template-columns: 1fr !important; }
          .services-header-right { padding-top: 0 !important; }
          .services-row-grid { grid-template-columns: 1fr !important; }
          .services-row-grid > *:first-child { order: 1 !important; }
          .services-row-grid > *:last-child  { order: 2 !important; }
        }
      `}</style>

      <section
        aria-labelledby="services-heading"
        className="relative overflow-hidden"
        style={{
          background: '#fff',
          paddingTop: 'clamp(80px,10vw,120px)',
          paddingBottom: 'clamp(80px,10vw,120px)',
        }}
      >
        <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" aria-hidden />
        <div className="absolute inset-0 bg-spotlight pointer-events-none" aria-hidden />
        <div style={{ maxWidth: 1200, margin: '0 auto', paddingLeft: 'clamp(24px,5vw,80px)', paddingRight: 'clamp(24px,5vw,80px)' }}>

          <SectionHeader reduce={reduce} />

          {SERVICES.map((service) => (
            <ServiceRow key={service.id} service={service} reduce={reduce} />
          ))}

          <AlsoAvailable reduce={reduce} />

        </div>
      </section>
    </>
  );
}
