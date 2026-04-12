'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag, CheckCircle, Clock, Shield, ArrowRight, Settings,
  Palette, Package, CreditCard, Zap, Check, ChevronDown,
  MessageSquare, FileText, FilePen, Code2, Rocket, Phone,
} from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import ServiceVideo from '@/components/sections/ServiceVideo';
import { ProjectCard } from '@/components/portofoliu/ProjectCard';
import { PORTFOLIO_PROJECTS } from '@/lib/portfolio-data';
import { trackConversions } from '@/lib/gtm';

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

/* ══════════════════════════════════════════════════════
   DATE
══════════════════════════════════════════════════════ */

type LogoEntry = { src: string; alt: string };
type LogoGroup = { label: string; logos: LogoEntry[] };
type FeatureItem = { bold: string; rest: string };

const FEATURES: { icon: React.ElementType; titlu: string; logoGroups?: LogoGroup[]; items: FeatureItem[] }[] = [
  {
    icon: Palette,
    titlu: 'Design & Dezvoltare',
    items: [
      { bold: 'Design 100% personalizat', rest: ', creat de la zero pentru brandul tau' },
      { bold: 'Responsive perfect', rest: ' pe orice dispozitiv si browser' },
      { bold: 'Pagini produs', rest: ' cu galerie foto, zoom, variante culoare si marime' },
      { bold: 'Filtrare si cautare avansata', rest: ' in catalog' },
      { bold: 'Cos persistent', rest: ' si checkout simplificat in minim de pasi' },
      { bold: 'Panou de administrare intuitiv', rest: ', fara cunostinte tehnice' },
      { bold: 'Optimizare viteza', rest: ': sub 2 secunde, Core Web Vitals verzi' },
    ],
  },
  {
    icon: Package,
    titlu: 'Produse & Continut',
    items: [
      { bold: 'Import produse in masa', rest: ' din Excel sau CSV' },
      { bold: 'Produse cu variante', rest: ': culoare, marime, material, orice atribut' },
      { bold: 'Gestionare stoc', rest: ' cu alerta automata la cantitate scazuta' },
      { bold: 'Produse la comanda', rest: ', precomanda si produse digitale' },
      { bold: 'Badge-uri automate', rest: ': Nou, Reducere, Bestseller, Stoc limitat' },
      { bold: 'Wishlist', rest: ', comparare produse si produse vizualizate recent' },
      { bold: 'SEO tehnic per produs', rest: ': schema markup, meta editabile, URL-uri prietenoase' },
    ],
  },
  {
    icon: CreditCard,
    titlu: 'Plati & Curierat',
    logoGroups: [
      {
        label: 'Procesatori de plata',
        logos: [
          { src: '/imagini/alte-logouri/stripe.svg',   alt: 'Stripe'   },
          { src: '/imagini/alte-logouri/payu.svg',     alt: 'PayU'     },
          { src: '/imagini/alte-logouri/netopia.svg',  alt: 'Netopia'  },
          { src: '/imagini/alte-logouri/tbibank.svg',  alt: 'TBI Bank' },
        ],
      },
      {
        label: 'Firme de curierat',
        logos: [
          { src: '/imagini/alte-logouri/fancourier.svg',  alt: 'FanCourier' },
          { src: '/imagini/alte-logouri/cargus.svg',      alt: 'Cargus'     },
          { src: '/imagini/alte-logouri/dpd.svg',         alt: 'DPD'        },
          { src: '/imagini/alte-logouri/sameday.webp',    alt: 'Sameday'    },
        ],
      },
    ],
    items: [
      { bold: 'Card bancar', rest: ': Stripe, PayU, Netopia / mobilPay, EuPlatesc' },
      { bold: 'Plata la livrare', rest: ', transfer bancar, rate TBI Bank' },
      { bold: 'Apple Pay si Google Pay', rest: '' },
      { bold: 'FanCourier, Cargus, DPD, Sameday', rest: ', DHL, Urgent Cargus' },
      { bold: 'AWB generat automat', rest: ' la confirmarea comenzii' },
      { bold: 'Calcul automat cost livrare', rest: ' dupa greutate si judet' },
      { bold: 'Tracking colet', rest: ' trimis automat clientului pe email' },
    ],
  },
  {
    icon: Zap,
    titlu: 'Automatizari & Integari',
    logoGroups: [
      {
        label: 'Soft de facturare',
        logos: [
          { src: '/imagini/alte-logouri/smartbill.svg', alt: 'SmartBill' },
          { src: '/imagini/alte-logouri/oblio.webp',    alt: 'Oblio'     },
          { src: '/imagini/alte-logouri/fgo.svg',       alt: 'fGo'       },
          { src: '/imagini/alte-logouri/saga.svg',      alt: 'SAGA'      },
        ],
      },
    ],
    items: [
      { bold: 'Facturare automata', rest: ': SmartBill, Oblio, fGo, SAGA' },
      { bold: 'Email marketing', rest: ': cos abandonat, confirmare, urmarire livrare' },
      { bold: 'Google Merchant Center', rest: ', Facebook Shop, TikTok Shop' },
      { bold: 'Integrare Klaviyo', rest: ', MailerLite sau ActiveCampaign' },
      { bold: 'Coduri de reducere', rest: ', upsell si cross-sell automat' },
      { bold: 'Google Analytics 4', rest: ', Meta Pixel, TikTok Pixel configurate' },
      { bold: 'Conformitate GDPR completa', rest: ' cu cookie banner si politici legale' },
    ],
  },
];

const PLATFORME = [
  {
    id: 'woocommerce',
    featured: true,
    titlu: 'WooCommerce',
    tag: 'WordPress + PHP',
    logo: '/imagini/alte-logouri/woocommerce.svg',
    descriere: 'Cea mai flexibila solutie open-source. Potrivit pentru magazine de orice dimensiune, cu control complet asupra fiecarui aspect.',
    cand: [
      'Magazine cu 10 la 10.000+ produse',
      'Ai nevoie de functionalitati personalizate',
      'Vrei costuri recurente minime',
    ],
  },
  {
    id: 'shopify',
    featured: false,
    titlu: 'Shopify',
    tag: 'SaaS / Hosted',
    logo: '/imagini/alte-logouri/shopify.svg',
    descriere: 'Platforma hosted, rapida de lansat. Ideala cand vrei sa te concentrezi pe vanzari, nu pe tehnic.',
    cand: [
      'Magazine care vor sa lanseze rapid',
      'Afaceri care vand si international',
      'Buget lunar acceptat pentru abonament',
    ],
  },
  {
    id: 'nextjs',
    featured: false,
    titlu: 'Next.js Commerce',
    tag: 'Custom / Headless',
    logo: '/imagini/alte-logouri/nextjs.svg',
    descriere: 'Solutie custom de inalta performanta pentru magazine mari sau cu cerinte tehnice speciale.',
    cand: [
      'Volume mari de trafic (zeci de mii de vizitatori/zi)',
      'Integrariri complexe cu sisteme ERP sau PIM',
      'Viteza maxima ca prioritate absoluta',
    ],
  },
];

const MAGAZINE_PROJECTS = PORTFOLIO_PROJECTS.filter(p => p.filterKey === 'magazine-online').slice(0, 3);

const PROCESS_STEPS = [
  { icon: MessageSquare, nr: '01', titlu: 'Consultatie gratuita',    descriere: 'Discutam proiectul, intelegem nisa si obiectivele tale de vanzare.' },
  { icon: FileText,      nr: '02', titlu: 'Oferta de pret',          descriere: 'Primesti o oferta detaliata cu tot ce include proiectul, fara surprize.' },
  { icon: FilePen,       nr: '03', titlu: 'Semnare contract',        descriere: 'Semnam contractul si stabilim termenele clare de livrare.' },
  { icon: Code2,         nr: '04', titlu: 'Dezvoltare & Testare',    descriere: 'Construim si testam pe toate dispozitivele. Urmaresti progresul live.' },
  { icon: Rocket,        nr: '05', titlu: 'Lansare & Suport',        descriere: 'Lansam, configuram tot si oferim suport 30 zile post-lansare.' },
];

const REVIEWS = [
  {
    initiale: 'CD',
    culoare: '#2B8FCC',
    nume: 'Cosmin Danila',
    website: 'stupinamaria.ro',
    text: 'Colaborarea a fost peste asteptari. Rabdare, solutii rapide si un rezultat final foarte bine pus la punct. Se vede experienta si pasiunea pentru ceea ce face. Recomand!',
  },
  {
    initiale: 'RS',
    culoare: '#7C3AED',
    nume: 'Romina Somicescu',
    website: 'romagcooking.ro',
    text: 'Sunt foarte multumita de rezultatele colaborarii mele cu ei. Recomand cu incredere!',
  },
  {
    initiale: 'ET',
    culoare: '#059669',
    nume: 'Export Trans Ultimate',
    website: 'exporttrans.ro',
    text: 'Recomand cu toata increderea! Site-ul de prezentare a fost realizat exact asa cum mi-am dorit: modern, clar, bine structurat si usor de folosit. Comunicarea a fost foarte buna, a fost receptiv la toate cerintele mele si a respectat termenele stabilite. Se vede ca este implicat si atent la detalii. Multumesc pentru profesionalism!',
  },
];

const FAQ_ITEMS = [
  {
    q: 'Cat dureaza realizarea unui magazin online?',
    a: 'Un magazin online standard cu pana la 500 de produse se livreaza in 4 pana la 6 saptamani de la aprobarea designului. Proiectele mai complexe au un timeline stabilit clar in propunerea tehnica, inainte sa incepem.',
  },
  {
    q: 'Pot sa imi administrez singur magazinul dupa lansare?',
    a: 'Da, absolut. Integram un panou de administrare intuitiv si oferim o sesiune de training inclusa in proiect. Vei putea adauga produse, gestiona comenzi si modifica orice continut fara cunostinte tehnice.',
  },
  {
    q: 'Ce se intampla daca am nevoie de modificari dupa lansare?',
    a: 'Toate proiectele includ 30 de zile de suport post-lansare. Orice problema aparuta din vina noastra este remediata gratuit in aceasta perioada. Putem continua colaborarea cu un pachet de mentenanta lunara.',
  },
  {
    q: 'Lucrati cu orice tip de produse?',
    a: 'Da. Am construit magazine pentru fashion, cosmetice, suplimente, mobila, electronice, produse alimentare si zeci de alte categorii. Abordam fiecare nisa cu specificul ei.',
  },
  {
    q: 'Pot migra produsele din magazinul meu actual?',
    a: 'Da. Daca ai deja un magazin online, importam produsele existente in noul magazin. Procesul de migrare este inclus sau cotat separat in functie de volumul si complexitatea datelor.',
  },
  {
    q: 'Oferiti si servicii de hosting?',
    a: 'Nu oferim direct servicii de hosting, insa colaboram cu Hostico.ro, unul dintre cei mai de incredere furnizori de hosting din Romania. Ii recomandam clientilor nostri si ii ajutam cu configurarea completa a domeniului, certificatului SSL si mediului de hosting optim pentru magazinul online.',
  },
  {
    q: 'Exista costuri lunare ascunse dupa lansare?',
    a: 'Nu exista costuri ascunse. Te informam transparent din start despre toate costurile recurente: hosting, domeniu, eventuale licente plugin-uri sau abonamente platforma. Nu exista surprize dupa lansare.',
  },
];

/* ══════════════════════════════════════════════════════
   SUBCOMPONENTE
══════════════════════════════════════════════════════ */

function StarIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#F59E0B" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-label="Google" role="img">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

function AccordionItem({ item, isOpen, onToggle }: {
  item: { q: string; a: string };
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div style={{ borderBottom: '1px solid #E8ECF0' }}>
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
          padding: '20px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 600,
          fontSize: '1rem',
          color: '#0D1117',
          lineHeight: 1.5,
        }}>
          {item.q}
        </span>
        <ChevronDown
          size={20}
          style={{
            flexShrink: 0,
            color: '#8A94A6',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 250ms ease',
          }}
          aria-hidden="true"
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
              fontSize: '0.9375rem',
              color: '#4A5568',
              lineHeight: 1.7,
              paddingBottom: 20,
            }}>
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════ */

export default function MagazineOnlineClient() {
  const reduce = useReducedMotion() ?? false;
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: '-60px' });
  const processRef = useRef<HTMLElement>(null);
  const processInView = useInView(processRef, { once: true, margin: '-80px' });

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      {/* ══ HERO ══ */}
      <section
        aria-labelledby="hero-h1"
        style={{
          background: '#fff',
          paddingTop:    'clamp(80px, 10vw, 120px)',
          paddingBottom: 'clamp(56px, 7vw, 80px)',
          borderBottom: '1px solid #E8ECF0',
        }}
      >
        <div ref={heroRef} style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(24px,5vw,48px)' }}>

          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              marginBottom: 48,
              fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 13,
              color: '#9CA3AF',
            }}
          >
            <Link href="/" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Acasa</Link>
            <span style={{ fontSize: 12 }}>›</span>
            <Link href="/servicii" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Servicii</Link>
            <span style={{ fontSize: 12 }}>›</span>
            <span style={{ color: '#374151' }}>Magazin Online</span>
          </nav>

          {/* Grid doua coloane */}
          <style>{`
            @media (max-width: 900px) {
              .hero-grid { grid-template-columns: 1fr !important; }
              .hero-visual { display: none !important; }
            }
          `}</style>
          <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '13fr 12fr', gap: 'clamp(32px,5vw,64px)', alignItems: 'center' }}>

            {/* Coloana text */}
            <motion.div
              initial={reduce ? false : { opacity: 0, x: -24 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, ease: EASE }}
            >
              {/* Badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#EAF5FF', border: '1px solid #BFDFFF',
                borderRadius: 20, padding: '6px 14px', marginBottom: 24,
              }}>
                <ShoppingBag size={14} style={{ color: '#2B8FCC' }} aria-hidden="true" />
                <span style={{
                  fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 12,
                  textTransform: 'uppercase', letterSpacing: '0.06em', color: '#2B8FCC',
                }}>
                  Magazin Online
                </span>
              </div>

              {/* H1 */}
              <h1
                id="hero-h1"
                style={{
                  fontFamily: 'var(--font-display)', fontWeight: 600,
                  fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
                  lineHeight: 1.08, letterSpacing: '-0.022em',
                  color: '#0D1117', margin: '0 0 20px',
                }}
              >
                Magazin online la cheie,{' '}
                <span style={{ color: '#2B8FCC' }}>integrat cu tot ce ai nevoie</span>
              </h1>

              {/* Paragraf */}
              <p style={{
                fontFamily: 'var(--font-body)', fontWeight: 400,
                fontSize: '1.0625rem', lineHeight: 1.75,
                color: '#4A5568', maxWidth: 500, margin: '0 0 36px',
              }}>
                Integram tot ce are nevoie un magazin online sa functioneze: procesatori de plata, firme de curierat, soft de facturare si optimizare pentru Google. Un singur proiect, zero batai de cap.
              </p>

              {/* Trust indicators */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginBottom: 40 }}>
                {[
                  { icon: CheckCircle, text: '80+ magazine online livrate' },
                  { icon: Clock,       text: 'Livrare in 4-6 saptamani' },
                  { icon: Shield,      text: 'Garantie 30 zile post-lansare' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <Icon size={15} style={{ color: '#2B8FCC', flexShrink: 0 }} aria-hidden="true" />
                    <span style={{
                      fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 13,
                      color: '#4A5568',
                    }}>
                      {text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Butoane */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                <Link
                  href="/oferta"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: '#2B8FCC', color: '#fff', textDecoration: 'none',
                    fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9375rem',
                    padding: '14px 28px', borderRadius: 8, transition: 'background 200ms ease',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = '#1a6fa8'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = '#2B8FCC'; }}
                >
                  Solicita oferta gratuita
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link
                  href="/configurare-magazin-online"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: '#fff', border: '1px solid #D1D5DB',
                    color: '#374151', textDecoration: 'none',
                    fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9375rem',
                    padding: '14px 24px', borderRadius: 8, transition: 'border-color 200ms ease, background 200ms ease',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = '#9CA3AF';
                    el.style.background = '#F9FAFB';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = '#D1D5DB';
                    el.style.background = '#fff';
                  }}
                >
                  <Settings size={15} aria-hidden="true" />
                  Configureaza Oferta
                </Link>
              </div>
            </motion.div>

            {/* Coloana dreapta — video */}
            <motion.div
              className="hero-visual"
              initial={reduce ? false : { opacity: 0, x: 24 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
              style={{ position: 'relative' }}
            >
              <div style={{
                borderRadius: 16, overflow: 'hidden',
                border: '1px solid #E8ECF0',
                boxShadow: '0 20px 60px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)',
                aspectRatio: '16/10',
                background: '#F8FAFB',
              }}>
                <ServiceVideo
                  src="/imagini/servicii/magazin-online.mp4"
                  loop={false}
                  style={{ borderRadius: 16 }}
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══ CE INCLUDEM ══ */}
      <section
        aria-labelledby="features-h2"
        style={{ background: '#fff', padding: 'clamp(64px,8vw,100px) 0' }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(24px,5vw,48px)' }}>

          {/* Header */}
          <ScrollReveal className="text-center" style={{ maxWidth: 640, margin: '0 auto 64px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 28, height: 1, background: '#2B8FCC' }} />
              <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.10em', color: '#2B8FCC' }}>
                Serviciu complet
              </span>
              <div style={{ width: 28, height: 1, background: '#2B8FCC' }} />
            </div>
            <h2
              id="features-h2"
              style={{
                fontFamily: 'var(--font-display)', fontWeight: 600,
                fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
                lineHeight: 1.15, letterSpacing: '-0.022em',
                color: '#0D1117', margin: '0 0 14px',
              }}
            >
              Ne ocupam de{' '}
              <span style={{ color: '#2B8FCC' }}>absolut tot</span>
              , de la A la Z
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.0625rem', color: '#4A5568', lineHeight: 1.7, margin: 0 }}>
              Nu primesti un site de completat. Primesti un magazin functional, cu tot configurat si gata sa primeasca comenzi din prima zi.
            </p>
          </ScrollReveal>

          {/* Grid features */}
          <style>{`
            .features-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
            @media (max-width: 767px) { .features-grid { grid-template-columns: 1fr !important; } }
          `}</style>
          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <ScrollReveal key={f.titlu} delay={i * 0.08}>
                <div
                  style={{
                    background: '#fff', border: '1px solid #E8ECF0',
                    borderRadius: 16, padding: 32,
                    transition: 'transform 280ms ease, box-shadow 280ms ease',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = 'translateY(-3px)';
                    el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = 'translateY(0)';
                    el.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: f.logoGroups ? 16 : 24 }}>
                    <div style={{
                      width: 44, height: 44, background: '#EAF5FF', borderRadius: 10,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <f.icon size={20} style={{ color: '#2B8FCC' }} aria-hidden="true" />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1rem', color: '#0D1117', margin: 0 }}>
                      {f.titlu}
                    </h3>
                  </div>
                  {f.logoGroups && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20, padding: '14px 16px', background: '#F8FAFB', borderRadius: 10, border: '1px solid #EEF0F3' }}>
                      {f.logoGroups.map((group) => (
                        <div key={group.label} style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8A94A6', whiteSpace: 'nowrap', minWidth: 130 }}>
                            {group.label}:
                          </span>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
                            {group.logos.map((logo) => (
                              <div key={logo.alt} style={{ background: '#fff', border: '1px solid #E8ECF0', borderRadius: 8, padding: '5px 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: 34 }}>
                                <img src={logo.src} alt={logo.alt} style={{ height: 18, width: 'auto', maxWidth: 64, objectFit: 'contain', display: 'block', opacity: 0.85 }} />
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {f.items.map((item) => (
                      <li key={item.bold} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                        <Check size={14} style={{ color: '#2B8FCC', flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
                        <span style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 14, color: '#4A5568', lineHeight: 1.5 }}>
                          <strong>{item.bold}</strong>{item.rest}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PLATFORME ══ */}
      <section
        aria-labelledby="platforme-h2"
        style={{ background: '#F8FAFB', padding: 'clamp(56px,7vw,80px) 0' }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(24px,5vw,48px)' }}>

          <ScrollReveal style={{ maxWidth: 520 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 28, height: 1, background: '#2B8FCC' }} />
              <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.10em', color: '#2B8FCC' }}>
                Tehnologii
              </span>
            </div>
            <h2
              id="platforme-h2"
              style={{
                fontFamily: 'var(--font-display)', fontWeight: 600,
                fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                lineHeight: 1.15, letterSpacing: '-0.022em',
                color: '#0D1117', margin: '0 0 14px',
              }}
            >
              Platforma potrivita pentru afacerea ta
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.0625rem', color: '#4A5568', lineHeight: 1.7, margin: 0 }}>
              Nu recomandam aceeasi platforma tuturor. Alegem in functie de volumul de produse, buget si planurile tale de crestere.
            </p>
          </ScrollReveal>

          <style>{`
            .platforme-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-top: 48px; }
            @media (max-width: 1023px) { .platforme-grid { grid-template-columns: 1fr !important; } }
          `}</style>
          <div className="platforme-grid">
            {PLATFORME.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 0.1}>
                <div
                  style={{
                    position: 'relative',
                    background: '#fff',
                    border: p.featured ? '2px solid #2B8FCC' : '1px solid #E8ECF0',
                    borderRadius: 14, padding: 28,
                    transition: 'transform 280ms ease, box-shadow 280ms ease',
                    height: '100%',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = 'translateY(-3px)';
                    el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = 'translateY(0)';
                    el.style.boxShadow = 'none';
                  }}
                >
                  {p.featured && (
                    <div style={{
                      position: 'absolute', top: -12, left: 24,
                      background: '#2B8FCC', color: '#fff',
                      fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 11,
                      textTransform: 'uppercase', letterSpacing: '0.05em',
                      padding: '3px 12px', borderRadius: 20,
                    }}>
                      Recomandat
                    </div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                    <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1.0625rem', color: '#0D1117', margin: 0 }}>
                      {p.titlu}
                    </h3>
                    {p.logo && (
                      <img src={p.logo} alt={p.titlu} style={{ height: 22, width: 'auto', filter: 'grayscale(1) opacity(0.5)' }} />
                    )}
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#4A5568', lineHeight: 1.6, margin: '0 0 16px' }}>
                    {p.descriere}
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8A94A6', margin: '0 0 8px' }}>
                    Recomandat cand:
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {p.cand.map((item) => (
                      <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 7 }}>
                        <Check size={12} style={{ color: '#2B8FCC', flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#4A5568' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <span style={{
                    display: 'inline-block',
                    background: '#F4F6F8', borderRadius: 6,
                    padding: '4px 10px',
                    fontFamily: 'var(--font-body)', fontSize: 11, color: '#4A5568',
                  }}>
                    {p.tag}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PORTOFOLIU ══ */}
      <section
        aria-labelledby="portofoliu-h2"
        style={{ background: '#fff', padding: 'clamp(64px,8vw,100px) 0' }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(24px,5vw,48px)' }}>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24, marginBottom: 16, flexWrap: 'wrap' }}>
            <ScrollReveal>
              <h2
                id="portofoliu-h2"
                style={{
                  fontFamily: 'var(--font-display)', fontWeight: 600,
                  fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                  lineHeight: 1.1, letterSpacing: '-0.022em',
                  color: '#0D1117', margin: 0,
                }}
              >
                Magazine online{' '}
                <span style={{ color: '#2B8FCC' }}>create</span>
                {' '}pentru clientii nostri
              </h2>
            </ScrollReveal>
            <Link
              href="/portofoliu"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem',
                color: '#2B8FCC', textDecoration: 'none', whiteSpace: 'nowrap',
                alignSelf: 'center',
              }}
            >
              Vezi toate proiectele
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>

          <ScrollReveal>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 15, color: '#4A5568',
              maxWidth: 520, lineHeight: 1.7, margin: '0 0 48px',
            }}>
              Fiecare magazin din portofoliul nostru este unic, construit de la zero pentru nisa si obiectivele specifice ale clientului.
            </p>
          </ScrollReveal>

          <style>{`
            .serviciu-portfolio-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
            @media (max-width: 1023px) { .serviciu-portfolio-grid { grid-template-columns: repeat(2, 1fr) !important; } }
            @media (max-width: 639px)  { .serviciu-portfolio-grid { grid-template-columns: 1fr !important; } }
          `}</style>
          <div className="serviciu-portfolio-grid">
            {MAGAZINE_PROJECTS.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROCES ══ */}
      <section
        ref={processRef}
        aria-labelledby="proces-h2"
        style={{ background: '#0D1117', padding: 'clamp(64px,8vw,100px) 0' }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(24px,5vw,48px)' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', maxWidth: 580, margin: '0 auto 64px' }}>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={processInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 28, height: 1, background: '#2B8FCC' }} />
                <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.10em', color: '#2B8FCC' }}>
                  Cum lucram
                </span>
                <div style={{ width: 28, height: 1, background: '#2B8FCC' }} />
              </div>
              <h2
                id="proces-h2"
                style={{
                  fontFamily: 'var(--font-display)', fontWeight: 600,
                  fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
                  lineHeight: 1.1, letterSpacing: '-0.022em',
                  color: '#fff', margin: 0,
                }}
              >
                De la prima discutie la{' '}
                <span style={{ color: '#4AADE8' }}>primul client</span>
              </h2>
            </motion.div>
          </div>

          {/* Steps */}
          <style>{`
            .process-grid {
              display: grid;
              grid-template-columns: repeat(5, 1fr);
              gap: 16px;
              position: relative;
            }
            @media (max-width: 1023px) {
              .process-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
              .process-connector { display: none !important; }
              .process-step { flex-direction: row !important; text-align: left !important; align-items: flex-start !important; padding: 20px 0 !important; border-bottom: 1px solid rgba(255,255,255,0.06) !important; }
              .process-icon-wrap { margin-bottom: 0 !important; margin-right: 16px !important; flex-shrink: 0 !important; }
              .process-desc { max-width: 100% !important; }
            }
          `}</style>

          <div className="process-grid">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.titlu}
                className="process-step"
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={processInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, ease: EASE, delay: 0.2 + i * 0.15 }}
                style={{
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', textAlign: 'center',
                  position: 'relative',
                }}
              >
                {/* Connector */}
                {i < PROCESS_STEPS.length - 1 && (
                  <div
                    className="process-connector"
                    aria-hidden="true"
                    style={{
                      position: 'absolute', top: 22, left: '50%', right: '-50%',
                      height: 1, borderTop: '1px dashed rgba(255,255,255,0.12)',
                      zIndex: 0,
                    }}
                  />
                )}

                {/* Icon */}
                <div
                  className="process-icon-wrap"
                  style={{
                    width: 44, height: 44, borderRadius: '50%',
                    background: 'rgba(43,143,204,0.15)',
                    border: '1px solid rgba(43,143,204,0.35)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 16, position: 'relative', zIndex: 1,
                    flexShrink: 0,
                  }}
                >
                  <step.icon size={18} style={{ color: '#4AADE8' }} aria-hidden="true" />
                </div>

                <div>
                  <div style={{
                    fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.9375rem',
                    color: '#fff', marginBottom: 8,
                  }}>
                    {step.titlu}
                  </div>
                  <div
                    className="process-desc"
                    style={{
                      fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 13,
                      color: 'rgba(255,255,255,0.50)', lineHeight: 1.6, maxWidth: 160,
                    }}
                  >
                    {step.descriere}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ RECENZII ══ */}
      <section
        aria-labelledby="recenzii-h2"
        style={{ background: '#F8FAFB', padding: 'clamp(64px,8vw,100px) 0' }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(24px,5vw,48px)' }}>

          <ScrollReveal style={{ textAlign: 'center', maxWidth: 620, margin: '0 auto 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 28, height: 1, background: '#2B8FCC' }} />
              <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.10em', color: '#2B8FCC' }}>
                Ce spun clientii
              </span>
              <div style={{ width: 28, height: 1, background: '#2B8FCC' }} />
            </div>
            <h2
              id="recenzii-h2"
              style={{
                fontFamily: 'var(--font-display)', fontWeight: 600,
                fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                lineHeight: 1.1, letterSpacing: '-0.022em',
                color: '#0D1117', margin: 0,
              }}
            >
              Recenzii de la{' '}
              <span style={{ color: '#2B8FCC' }}>clientii nostri</span>
            </h2>
          </ScrollReveal>

          {/* Rating summary */}
          <ScrollReveal>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 40, flexWrap: 'wrap', margin: '24px 0 56px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '2.5rem', color: '#0D1117', lineHeight: 1 }}>4.9</span>
                <div>
                  <div style={{ display: 'flex', gap: 2, marginBottom: 4 }}>
                    {[...Array(5)].map((_, i) => <StarIcon key={i} size={14} />)}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#6B7280' }}>din 5</div>
                </div>
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#4A5568' }}>
                Recenzii Google verificate
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <GoogleIcon />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#4A5568' }}>Recenzii verificate</span>
              </div>
            </div>
          </ScrollReveal>

          <style>{`
            .reviews-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }
            @media (max-width: 1023px) { .reviews-grid { grid-template-columns: 1fr 1fr !important; } }
            @media (max-width: 639px)  { .reviews-grid { grid-template-columns: 1fr !important; } }
          `}</style>
          <div className="reviews-grid">
            {REVIEWS.map((r, i) => (
              <ScrollReveal key={r.nume} delay={i * 0.1}>
                <div
                  style={{
                    background: '#fff', border: '1px solid #E8ECF0',
                    borderRadius: 14, padding: 24,
                    transition: 'transform 280ms ease, box-shadow 280ms ease',
                    height: '100%',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = 'translateY(-2px)';
                    el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.07)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = 'translateY(0)';
                    el.style.boxShadow = 'none';
                  }}
                >
                  {/* Stars */}
                  <div style={{ display: 'flex', gap: 2, marginBottom: 14 }}>
                    {[...Array(5)].map((_, si) => <StarIcon key={si} size={14} />)}
                  </div>

                  {/* Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: '50%',
                      background: r.culoare, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 14, color: '#fff' }}>
                        {r.initiale}
                      </span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 15, color: '#0D1117' }}>{r.nume}</div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#8A94A6' }}>{r.website}</div>
                    </div>
                    <GoogleIcon />
                  </div>

                  {/* Text */}
                  <div style={{ position: 'relative' }}>
                    <div aria-hidden="true" style={{
                      fontFamily: 'var(--font-display)', fontSize: '3rem',
                      color: '#EAF5FF', lineHeight: 1, marginBottom: -16,
                      userSelect: 'none',
                    }}>
                      &ldquo;
                    </div>
                    <p style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.9375rem', color: '#1A202C', lineHeight: 1.75,
                      margin: 0,
                    }}>
                      {r.text}
                    </p>
                  </div>

                  {/* Data */}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section
        aria-labelledby="faq-h2"
        style={{ background: '#fff', padding: 'clamp(64px,8vw,100px) 0' }}
      >
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 clamp(24px,5vw,48px)' }}>

          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 28, height: 1, background: '#2B8FCC' }} />
              <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.10em', color: '#2B8FCC' }}>
                Intrebari frecvente
              </span>
              <div style={{ width: 28, height: 1, background: '#2B8FCC' }} />
            </div>
            <h2
              id="faq-h2"
              style={{
                fontFamily: 'var(--font-display)', fontWeight: 600,
                fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                lineHeight: 1.1, letterSpacing: '-0.022em',
                color: '#0D1117', margin: 0,
              }}
            >
              Raspunsuri{' '}
              <span style={{ color: '#2B8FCC' }}>clare</span>
              {' '}la intrebarile tale
            </h2>
          </div>

          <div>
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem
                key={i}
                item={item}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA FINAL ══ */}
      <section
        aria-labelledby="cta-h2"
        style={{
          background: 'linear-gradient(135deg, #1a3548 0%, #0f1e2e 100%)',
          padding: 'clamp(56px,7vw,80px) 0',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glow */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(43,143,204,0.08), transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 clamp(24px,5vw,48px)', position: 'relative', zIndex: 1 }}>
          <ScrollReveal direction="none">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 28, height: 1, background: '#2B8FCC' }} />
              <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.10em', color: '#4AADE8' }}>
                Hai sa incepem
              </span>
              <div style={{ width: 28, height: 1, background: '#2B8FCC' }} />
            </div>

            <h2
              id="cta-h2"
              style={{
                fontFamily: 'var(--font-display)', fontWeight: 600,
                fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
                lineHeight: 1.1, letterSpacing: '-0.022em',
                color: '#fff', margin: '0 0 16px',
              }}
            >
              Gata sa iti{' '}
              <span style={{ color: '#4AADE8' }}>lansezi</span>
              {' '}magazinul online?
            </h2>

            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '1.0625rem',
              color: 'rgba(255,255,255,0.60)', lineHeight: 1.7,
              maxWidth: 480, margin: '0 auto 40px',
            }}>
              Suna-ne acum sau completeaza formularul de oferta. Primesti raspuns in maximum 24 de ore.
            </p>

            {/* Butoane */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginBottom: 32 }}>
              <Link
                href="/oferta"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: '#2B8FCC', color: '#fff', textDecoration: 'none',
                  fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9375rem',
                  padding: '14px 28px', borderRadius: 8, transition: 'background 200ms ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = '#1a6fa8'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = '#2B8FCC'; }}
              >
                Solicita oferta gratuita
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <a
                href="tel:+40750456096"
                onClick={() => trackConversions.telefon()}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                  color: 'rgba(255,255,255,0.85)', textDecoration: 'none',
                  fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9375rem',
                  padding: '14px 24px', borderRadius: 8, transition: 'background 200ms ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.12)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.08)'; }}
              >
                <Phone size={15} aria-hidden="true" />
                0750 456 096
              </a>
            </div>

            {/* Trust */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
              {[
                { icon: Shield,       text: 'Garantie 30 zile' },
                { icon: Clock,        text: 'Raspuns in 24h' },
                { icon: CheckCircle,  text: 'Fara angajamente' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Icon size={14} style={{ color: 'rgba(255,255,255,0.40)' }} aria-hidden="true" />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(255,255,255,0.40)' }}>{text}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
