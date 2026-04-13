'use client';

import { useRef, useState, type ElementType, type ReactNode } from 'react';
import Link from 'next/link';
import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion';
import {
  Globe, CheckCircle, Clock, ArrowRight, ExternalLink, Phone,
  Palette, Image as ImageIcon, Sparkles, Search,
  Check, ChevronDown, ChevronRight,
  MessageSquare, FileText, Layers, Code2, Rocket,
  Heart, Scale, HardHat, UtensilsCrossed, Building2, Scissors,
  Calculator, Truck, Dumbbell, Plane, Car, GraduationCap,
  XCircle, X, Shield,
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

const MARQUEE_ROW1 = ['Medical', 'Juridic', 'Constructii', 'Retail', 'HoReCa', 'Educatie', 'Fitness', 'Imobiliare', 'Beauty'];
const MARQUEE_ROW2 = ['Arhitectura', 'Auto', 'Fotografie', 'Evenimente', 'Consultanta', 'IT', 'Stomatologie', 'Turism', 'Sport'];

const FEATURES: { icon: ElementType; titlu: string; items: ReactNode[] }[] = [
  {
    icon: Palette,
    titlu: 'Design & Dezvoltare',
    items: [
      <><strong>Design 100% personalizat</strong>, creat de la zero, adaptat brandului tau</>,
      <><strong>Responsive</strong> perfect pe orice dispozitiv, browser si dimensiune de ecran</>,
      <><strong>Animatii si micro-interactiuni</strong> premium, fara impact asupra vitezei</>,
      <><strong>Revizii nelimitate</strong> in faza de design, inainte de orice linie de cod</>,
      <><strong>Mockup complet in Figma</strong> inainte sa incepem dezvoltarea</>,
      <><strong>Pagina 404 personalizata</strong> si toate paginile legale incluse</>,
      <><strong>Dark mode</strong> optional, implementat corect pe toate componentele</>,
    ],
  },
  {
    icon: ImageIcon,
    titlu: 'Imagini & Fisiere',
    items: [
      <><strong>Optimizare automata imagini</strong> in format WebP si AVIF la build</>,
      <><strong>Lazy loading</strong> pe toate imaginile si componentele non-critice</>,
      <><strong>Galerie foto si video</strong> integrata, usor de administrat</>,
      <><strong>Formulare cu upload fisiere</strong> (oferte, CV-uri, documente)</>,
      <><strong>CDN global</strong> pentru livrare rapida a oricarui fisier</>,
      <><strong>Favicon, Open Graph image</strong> si toate meta-imaginile incluse</>,
      <><strong>Compresie automata</strong> fara pierdere de calitate vizibila</>,
    ],
  },
  {
    icon: Sparkles,
    titlu: 'AI & Automatizari',
    items: [
      <><strong>Chatbot AI integrat</strong>, antrenat pe serviciile si FAQ-ul tau</>,
      <><strong>Formulare inteligente</strong> care califica lead-urile automat</>,
      <><strong>Email automat de confirmare</strong> personalizat la fiecare mesaj primit</>,
      <><strong>Integrare calendar</strong> pentru programari online fara apeluri telefonice</>,
      <><strong>Notificari automate</strong> pe WhatsApp sau email la fiecare lead nou</>,
      <><strong>Traducere automata</strong> a continutului pentru versiunea multilingva</>,
      <><strong>Generare automata texte SEO</strong> cu AI</>,
    ],
  },
  {
    icon: Search,
    titlu: 'SEO & Conformitate',
    items: [
      <><strong>Viteza garantata:</strong> LCP sub 1.2 secunde, Core Web Vitals verzi</>,
      <><strong>Schema markup complet:</strong> Organization, LocalBusiness, BreadcrumbList</>,
      <><strong>Sitemap XML dinamic</strong> si Robots.txt configurat corect</>,
      <><strong>Google Search Console</strong> integrat cu verificare inclusa</>,
      <><strong>Analytics 4, Meta Pixel, TikTok Pixel</strong> configurate</>,
      <><strong>Conformitate GDPR</strong> completa: cookie banner si politici legale</>,
      <><strong>SSL, backup zilnic</strong>, monitorizare uptime 24/7</>,
    ],
  },
];

const DOMENII = [
  { icon: Heart,          titlu: 'Stomatologie & Medical',    descriere: 'Clinici, cabinete, laboratoare' },
  { icon: Scale,          titlu: 'Juridic & Avocatura',       descriere: 'Firme de avocatura, notariate' },
  { icon: HardHat,        titlu: 'Constructii & Renovari',    descriere: 'Firme de constructii, amenajari' },
  { icon: UtensilsCrossed,titlu: 'Restaurant & HoReCa',       descriere: 'Restaurante, cafenele, hoteluri' },
  { icon: Building2,      titlu: 'Imobiliare',                descriere: 'Agentii, dezvoltatori imobiliari' },
  { icon: Scissors,       titlu: 'Salon & Infrumusetare',     descriere: 'Saloane, spa, centre estetice' },
  { icon: Calculator,     titlu: 'Contabilitate & Financiar', descriere: 'Firme contabilitate, audit' },
  { icon: Truck,          titlu: 'Transport & Logistica',     descriere: 'Curierat, transport marfa' },
  { icon: Dumbbell,       titlu: 'Fitness & Sport',           descriere: 'Sali fitness, antrenori, cluburi' },
  { icon: Plane,          titlu: 'Turism & Vacante',          descriere: 'Agentii turism, pensiuni' },
  { icon: Car,            titlu: 'Servicii Auto',             descriere: 'Service, dealeri, vulcanizare' },
  { icon: GraduationCap,  titlu: 'Educatie & Cursuri',        descriere: 'Scoli, tutori, platforme cursuri' },
];

const WP_PROJECTS = PORTFOLIO_PROJECTS.filter(p => p.filterKey === 'website-prezentare').slice(0, 4);

const PROCESS_STEPS = [
  { icon: MessageSquare, nr: '01', titlu: 'Consultatie gratuita',    descriere: 'Discutam afacerea ta, domeniul, publicul tinta si obiectivele website-ului.' },
  { icon: FileText,      nr: '02', titlu: 'Propunere si structura',  descriere: 'Primesti o propunere detaliata cu structura site-ului, timeline si tot ce include.' },
  { icon: Layers,        nr: '03', titlu: 'Design in Figma',         descriere: 'Designul complet inainte de orice cod. Revizii nelimitate pana la aprobare.' },
  { icon: Code2,         nr: '04', titlu: 'Dezvoltare si testare',   descriere: 'Construim si testam pe toate dispozitivele. Urmaresti progresul pe un link de staging.' },
  { icon: Rocket,        nr: '05', titlu: 'Lansare si predare',      descriere: 'Lansam pe domeniul tau, configuram Analytics si Search Console, sesiune training inclusa.' },
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
    initiale: 'ET',
    culoare: '#059669',
    nume: 'Export Trans Ultimate',
    website: 'exporttrans.ro',
    text: 'Recomand cu toata increderea! Site-ul de prezentare a fost realizat exact asa cum mi-am dorit: modern, clar, bine structurat si usor de folosit. Comunicarea a fost foarte buna, a fost receptiv la toate cerintele mele si a respectat termenele stabilite. Multumesc pentru profesionalism!',
  },
  {
    initiale: 'CA',
    culoare: '#7C3AED',
    nume: 'Craus Armand',
    website: 'fumgreuiasi.ro',
    text: 'Mi-au facut un website de nota 10 pentru firma mea de evenimente. Recomand cu cea mai mare incredere daca doriti ceva profesional si modern.',
  },
];

const PROBLEME_SITE_SLAB = [
  'Se incarca in 8-12 secunde pe mobil',
  'Nu apare pe Google pentru cautarile relevante',
  'Arata diferit pe telefon fata de desktop',
  'Formularul de contact nu trimite email-uri',
  'Nu poate fi editat fara ajutor tehnic',
  'Fara SSL, browserul afiseaza "nesigur"',
  'Nu are politici GDPR, risc de amenda',
  'Clientii nu gasesc informatiile de care au nevoie',
];

const BENEFICII_INOVEX = [
  'LCP sub 1.2 secunde, Core Web Vitals verzi garantat',
  'SEO tehnic complet, schema markup, sitemap, Search Console',
  'Responsive perfect pe orice dispozitiv, testat pe 15+ browsere',
  'Formulare functionale cu notificari instant pe email si WhatsApp',
  'Panou administrare intuitiv, editezi singur orice continut',
  'SSL inclus, backup zilnic, uptime monitorizat 24/7',
  'Conformitate GDPR completa cu toate politicile legale',
  'Structura clara, clientul gaseste tot in maxim 3 clickuri',
];

const FAQ_ITEMS = [
  {
    q: 'Cat dureaza realizarea unui website de prezentare?',
    a: 'Un website de prezentare standard se livreaza in 3 pana la 5 saptamani de la aprobarea designului. Daca ai nevoie de functionalitati suplimentare, timeline-ul este stabilit clar in propunerea initiala.',
  },
  {
    q: 'Pot sa editez singur textele si imaginile dupa lansare?',
    a: 'Da, absolut. Integram un panou de administrare intuitiv si oferim o sesiune de training la predare. Vei putea modifica orice text, adauga articole de blog sau actualiza galeria foto fara cunostinte tehnice.',
  },
  {
    q: 'Furnizati si textele pentru website?',
    a: 'Daca ai deja textele, le integram si le optimizam pentru SEO. Daca nu, putem asigura copywriting-ul pentru paginile principale, acesta este un serviciu separat, cotat in functie de volumul de continut.',
  },
  {
    q: 'Trebuie sa am deja un domeniu si hosting?',
    a: 'Nu este obligatoriu. Nu oferim direct servicii de hosting, insa colaboram cu Hostico.ro, unul dintre cei mai de incredere furnizori din Romania. Ii recomandam clientilor nostri si ii ajutam cu configurarea completa a domeniului, certificatului SSL si mediului de hosting. Sau lucram cu furnizorul tau actual daca preferi.',
  },
  {
    q: 'Website-ul va aparea pe Google dupa lansare?',
    a: 'Construim cu SEO tehnic complet: schema markup, sitemap, viteza optimizata si toate setarile necesare pentru indexare. Submitam sitemap-ul la Google Search Console la lansare. Pozitiile in rezultate depind de concurenta si de continut, dar fundatia tehnica este impecabila de la start.',
  },
  {
    q: 'Pot adauga functionalitati ulterior?',
    a: 'Da. Construim cu o arhitectura care permite extindere usoara. Putem adauga ulterior un magazin online, un sistem de programari, un blog sau orice alta functionalitate de care ai nevoie pe masura ce afacerea creste.',
  },
  {
    q: 'Ce se intampla daca nu imi place designul propus?',
    a: 'Procesul nostru include revizii nelimitate in faza de design, inainte de orice linie de cod. Iteram pana cand esti 100% multumit de aspectul vizual. Nu trecem la dezvoltare fara aprobarea ta explicita.',
  },
];

/* ══════════════════════════════════════════════════════
   HELPERS
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

export default function WebsitePrezentareClient() {
  const reduce = useReducedMotion() ?? false;
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: '-60px' });
  const compareRef = useRef<HTMLElement>(null);
  const compareInView = useInView(compareRef, { once: true, margin: '-80px' });
  const processRef = useRef<HTMLElement>(null);
  const processInView = useInView(processRef, { once: true, margin: '-80px' });

  const [openFaq, setOpenFaq] = useState<number - null>(0);
  const [hoveredDomeniu, setHoveredDomeniu] = useState<number - null>(null);

  return (
    <>
      {/* ══ HERO ══ */}
      <section
        aria-labelledby="hero-h1"
        style={{
          background: '#FFFFFF',
          paddingTop: 'clamp(80px, 10vw, 120px)',
          paddingBottom: 'clamp(56px, 7vw, 80px)',
          borderBottom: '1px solid #F0F0F0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Cerc blur decorativ */}
        <div aria-hidden style={{
          position: 'absolute', top: -200, right: -200,
          width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(43,143,204,0.04), transparent 70%)',
          pointerEvents: 'none', zIndex: 0,
        }} />

        <div ref={heroRef} style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(24px,5vw,48px)', position: 'relative', zIndex: 1 }}>

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{
            display: 'flex', alignItems: 'center', gap: 6,
            marginBottom: 48,
            fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 13,
            color: '#8A94A6',
          }}>
            <Link href="/" style={{ color: '#8A94A6', textDecoration: 'none' }}>Acasa</Link>
            <ChevronRight size={14} style={{ color: '#D0D6DE' }} aria-hidden="true" />
            <Link href="/servicii" style={{ color: '#8A94A6', textDecoration: 'none' }}>Servicii</Link>
            <ChevronRight size={14} style={{ color: '#D0D6DE' }} aria-hidden="true" />
            <span style={{ color: '#4A5568' }}>Website de Prezentare</span>
          </nav>

          {/* Grid doua coloane */}
          <style>{`
            @media (max-width: 900px) {
              .hero-wp-grid { grid-template-columns: 1fr !important; }
              .hero-wp-visual { display: none !important; }
            }
          `}</style>
          <div className="hero-wp-grid" style={{ display: 'grid', gridTemplateColumns: '11fr 9fr', gap: 'clamp(32px,5vw,64px)', alignItems: 'center' }}>

            {/* Coloana text */}
            <motion.div
              initial={reduce ? false : { opacity: 0, x: -24 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, ease: EASE }}
              style={{ minWidth: 0, overflow: 'hidden' }}
            >
              {/* Badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#EAF5FF', border: '1px solid #C8E6F8',
                borderRadius: 20, padding: '6px 14px', marginBottom: 24,
              }}>
                <Globe size={14} style={{ color: '#2B8FCC' }} aria-hidden="true" />
                <span style={{
                  fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 12,
                  textTransform: 'uppercase', letterSpacing: '0.06em', color: '#2B8FCC',
                }}>
                  Website de Prezentare
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
                Website profesional la cheie,{' '}
                pentru{' '}
                <span style={{ color: '#2B8FCC' }}>orice domeniu</span>{' '}
                de activitate
              </h1>

              {/* Paragraf */}
              <p style={{
                fontFamily: 'var(--font-body)', fontWeight: 400,
                fontSize: '1.0625rem', lineHeight: 1.75,
                color: '#4A5568', maxWidth: 500, margin: '0 0 32px',
              }}>
                De la cabinete medicale la firme de avocatura, de la saloane de infrumusetare la companii de constructii. Livram website-uri profesionale, complete si optimizate pentru domeniul tau specific.
              </p>

              {/* Marquee industrii */}
              <style>{`
                @keyframes marquee-wp-left { from { transform: translateX(0) } to { transform: translateX(-50%) } }
                @keyframes marquee-wp-right { from { transform: translateX(-50%) } to { transform: translateX(0) } }
                .marquee-wp-left { animation: marquee-wp-left 25s linear infinite; display: flex; }
                .marquee-wp-right { animation: marquee-wp-right 25s linear infinite; display: flex; }
              `}</style>
              <div style={{ overflow: 'hidden', marginBottom: 36 }}>
                <div className="marquee-wp-left" style={{ gap: 8, width: 'max-content', marginBottom: 8 }}>
                  {[...MARQUEE_ROW1, ...MARQUEE_ROW1].map((item, i) => (
                    <span key={i} style={{ background: '#EAF5FF', border: '1px solid #BFDFFF', borderRadius: 20, padding: '4px 14px', fontSize: 13, fontWeight: 500, color: '#2B8FCC', whiteSpace: 'nowrap' }}>
                      {item}
                    </span>
                  ))}
                </div>
                <div className="marquee-wp-right" style={{ gap: 8, width: 'max-content' }}>
                  {[...MARQUEE_ROW2, ...MARQUEE_ROW2].map((item, i) => (
                    <span key={i} style={{ background: '#EAF5FF', border: '1px solid #BFDFFF', borderRadius: 20, padding: '4px 14px', fontSize: 13, fontWeight: 500, color: '#2B8FCC', whiteSpace: 'nowrap' }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Trust indicators */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginBottom: 36 }}>
                {[
                  { icon: CheckCircle, text: '200+ website-uri livrate' },
                  { icon: Clock,       text: 'Livrare in 7-14 zile' },
                  { icon: Phone,       text: 'Asistenta gratuita' },
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
                    minWidth: 240, justifyContent: 'center',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = '#1a6fa8'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = '#2B8FCC'; }}
                >
                  Solicita oferta gratuita
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link
                  href="/configurare-website-prezentare"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: 'transparent', border: '1px solid #E8ECF0',
                    color: '#4A5568', textDecoration: 'none',
                    fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9375rem',
                    padding: '14px 24px', borderRadius: 8, transition: 'all 200ms ease',
                    minWidth: 240, justifyContent: 'center',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = '#F4F6F8';
                    el.style.borderColor = '#D0D6DE';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = 'transparent';
                    el.style.borderColor = '#E8ECF0';
                  }}
                >
                  <ExternalLink size={15} aria-hidden="true" />
                  Configureaza website-ul tau
                </Link>
              </div>
            </motion.div>

            {/* Coloana dreapta - video */}
            <motion.div
              className="hero-wp-visual"
              initial={reduce ? false : { opacity: 0, x: 24 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
              style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {/* Video mockup */}
              <div style={{
                width: '100%',
                aspectRatio: '16 / 10',
                borderRadius: 16,
                overflow: 'hidden',
                background: '#F4F6F8',
                boxShadow: '0 24px 64px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.06)',
              }}>
                <ServiceVideo src="/imagini/servicii/website-prezentare.mp4" loop={false} />
              </div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* ══ FEATURES ══ */}
      <section
        aria-labelledby="features-h2"
        style={{ background: '#FFFFFF', padding: 'clamp(64px,8vw,100px) 0' }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(24px,5vw,48px)' }}>
          {/* Header */}
          <ScrollReveal>
            <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 64px' }}>
              <p style={{
                fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 11,
                textTransform: 'uppercase', letterSpacing: '0.10em',
                color: '#2B8FCC', marginBottom: 12,
              }}>
                Serviciu complet
              </p>
              <h2
                id="features-h2"
                style={{
                  fontFamily: 'var(--font-display)', fontWeight: 700,
                  fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
                  lineHeight: 1.1, letterSpacing: '-0.025em',
                  color: '#0D1117', margin: '0 0 16px',
                }}
              >
                Website profesional adaptat{' '}
                <span style={{ color: '#2B8FCC' }}>100%</span>{' '}
                nevoilor tale
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '1.0625rem',
                lineHeight: 1.7, color: '#4A5568', margin: 0,
              }}>
                Nu primesti un template modificat. Primesti un website construit de la zero pentru brandul, domeniul si obiectivele tale specifice.
              </p>
            </div>
          </ScrollReveal>

          {/* Grid 4 carduri */}
          <style>{`
            .features-wp-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
            @media (max-width: 1023px) { .features-wp-grid { grid-template-columns: repeat(2, 1fr); } }
            @media (max-width: 599px)  { .features-wp-grid { grid-template-columns: 1fr; } }
          `}</style>
          <div className="features-wp-grid">
            {FEATURES.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <ScrollReveal key={feat.titlu} delay={i * 0.08}>
                  <div style={{
                    background: '#fff',
                    border: '1px solid #E8ECF0',
                    borderRadius: 16,
                    padding: 24,
                    height: '100%',
                    transition: 'box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease',
                  }}
                  className="card-glow"
                  >
                    <div style={{
                      width: 44, height: 44, borderRadius: 10,
                      background: '#EAF5FF',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: 16,
                    }}>
                      <Icon size={20} style={{ color: '#2B8FCC' }} aria-hidden="true" />
                    </div>
                    <h3 style={{
                      fontFamily: 'var(--font-body)', fontWeight: 700,
                      fontSize: '1rem', color: '#0D1117', margin: '0 0 16px',
                    }}>
                      {feat.titlu}
                    </h3>
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {feat.items.map((item, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                          <Check size={13} style={{ color: '#2B8FCC', flexShrink: 0, marginTop: 3 }} aria-hidden="true" />
                          <span style={{
                            fontFamily: 'var(--font-body)', fontSize: '0.8125rem',
                            lineHeight: 1.55, color: '#4A5568',
                          }}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ DOMENII ══ */}
      <section
        aria-labelledby="domenii-h2"
        style={{ background: '#F8FAFB', padding: 'clamp(64px,8vw,100px) 0' }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(24px,5vw,48px)' }}>
          <ScrollReveal>
            <div style={{ maxWidth: 520 }}>
              <p style={{
                fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 11,
                textTransform: 'uppercase', letterSpacing: '0.10em',
                color: '#2B8FCC', marginBottom: 12,
              }}>
                Experienta dovedita
              </p>
              <h2
                id="domenii-h2"
                style={{
                  fontFamily: 'var(--font-display)', fontWeight: 700,
                  fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
                  lineHeight: 1.1, letterSpacing: '-0.025em',
                  color: '#0D1117', margin: '0 0 16px',
                }}
              >
                Construim pentru{' '}
                <span style={{ color: '#2B8FCC' }}>orice industrie</span>
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '1.0625rem',
                lineHeight: 1.7, color: '#4A5568', margin: 0,
              }}>
                Am construit website-uri pentru zeci de domenii de activitate. Stim ce functioneaza in fiecare industrie si adaptam structura, textele si designul la specificul clientului tau.
              </p>
            </div>
          </ScrollReveal>

          {/* Grid domenii */}
          <style>{`
            .domenii-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 48px; }
            @media (max-width: 1023px) { .domenii-grid { grid-template-columns: repeat(3, 1fr); } }
            @media (max-width: 599px)  { .domenii-grid { grid-template-columns: repeat(2, 1fr); } }
          `}</style>
          <div className="domenii-grid">
            {DOMENII.map((d, i) => {
              const Icon = d.icon;
              const hovered = hoveredDomeniu === i;
              return (
                <motion.div
                  key={d.titlu}
                  initial={reduce ? false : { opacity: 0, scale: 0.97 }}
                  whileInView={reduce ? {} : { opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.3, delay: i * 0.05, ease: EASE }}
                  onMouseEnter={() => setHoveredDomeniu(i)}
                  onMouseLeave={() => setHoveredDomeniu(null)}
                  style={{
                    background: '#fff',
                    border: `1px solid ${hovered ? 'rgba(43,143,204,0.30)' : '#E8ECF0'}`,
                    borderRadius: 12,
                    padding: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 12,
                    transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
                    boxShadow: hovered ? '0 4px 20px rgba(43,143,204,0.10)' : 'none',
                    transition: 'all 250ms ease',
                    cursor: 'default',
                  }}
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: hovered ? '#2B8FCC' : '#EAF5FF',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 250ms ease',
                    flexShrink: 0,
                  }}>
                    <Icon size={20} style={{ color: hovered ? '#fff' : '#2B8FCC', transition: 'color 250ms ease' }} aria-hidden="true" />
                  </div>
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-body)', fontWeight: 700,
                      fontSize: '0.9375rem', color: '#0D1117', marginBottom: 4,
                    }}>
                      {d.titlu}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-body)', fontWeight: 400,
                      fontSize: 12, color: '#8A94A6', lineHeight: 1.5,
                    }}>
                      {d.descriere}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Nota sub grid */}
          <p style={{
            fontFamily: 'var(--font-body)', fontWeight: 400,
            fontSize: 14, color: '#8A94A6',
            textAlign: 'center', marginTop: 32,
          }}>
            Nu gasesti domeniul tau? Lucram cu orice tip de afacere.{' '}
            <Link href="/contact" style={{
              color: '#2B8FCC', textDecoration: 'none',
              borderBottom: '1px solid transparent',
              transition: 'border-color 150ms ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = '#2B8FCC'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = 'transparent'; }}
            >
              Contacteaza-ne
            </Link>
          </p>
        </div>
      </section>

      {/* ══ PORTOFOLIU ══ */}
      <section
        aria-labelledby="portofoliu-h2"
        style={{ background: '#FFFFFF', padding: 'clamp(64px,8vw,100px) 0' }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(24px,5vw,48px)' }}>
          {/* Header */}
          <ScrollReveal>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 16 }}>
              <h2
                id="portofoliu-h2"
                style={{
                  fontFamily: 'var(--font-display)', fontWeight: 700,
                  fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                  lineHeight: 1.1, letterSpacing: '-0.025em',
                  color: '#0D1117', margin: 0,
                }}
              >
                Website-uri{' '}
                <span style={{ color: '#2B8FCC' }}>create</span>{' '}
                pentru clientii nostri
              </h2>
              <Link
                href="/portofoliu?categorie=website-prezentare"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem',
                  color: '#2B8FCC', textDecoration: 'none',
                  transition: 'color 150ms ease',
                }}
              >
                Vezi toate proiectele
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '0.9375rem',
              lineHeight: 1.7, color: '#4A5568', maxWidth: 520, margin: '0 0 48px',
            }}>
              Fiecare website este unic, construit de la zero pentru domeniul si obiectivele specifice ale clientului. Niciun template, nicio solutie generica.
            </p>
          </ScrollReveal>

          {/* Grid proiecte */}
          <style>{`
            .portfolio-wp-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
            @media (max-width: 1023px) { .portfolio-wp-grid { grid-template-columns: repeat(2, 1fr); } }
            @media (max-width: 599px)  { .portfolio-wp-grid { grid-template-columns: 1fr; } }
          `}</style>
          <div className="portfolio-wp-grid">
            {WP_PROJECTS.map((project, i) => (
              <ScrollReveal key={project.id} delay={i * 0.07}>
                <ProjectCard project={project} index={i} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ COMPARATIE ══ */}
      <section
        ref={compareRef}
        aria-labelledby="comparatie-h2"
        style={{ background: '#fff', border: '1px solid #E8ECF0', padding: 'clamp(64px,8vw,100px) 0' }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(24px,5vw,48px)' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 64px' }}>
            <p style={{
              fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 11,
              textTransform: 'uppercase', letterSpacing: '0.10em',
              color: '#2B8FCC', marginBottom: 12,
            }}>
              Diferenta conteaza
            </p>
            <h2
              id="comparatie-h2"
              style={{
                fontFamily: 'var(--font-display)', fontWeight: 700,
                fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
                lineHeight: 1.1, letterSpacing: '-0.025em',
                color: '#0D1117', margin: '0 0 16px',
              }}
            >
              De ce conteaza{' '}
              <span style={{ color: '#2B8FCC' }}>cum arata</span>{' '}
              website-ul tau
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '1.0625rem',
              lineHeight: 1.7, color: '#4A5568',
              margin: 0,
            }}>
              Vizitatorii iti judeca afacerea in primele 3 secunde. Un website prost pierde clienti inainte ca acestia sa citeasca prima fraza.
            </p>
          </div>

          {/* Cele 2 coloane */}
          <style>{`
            .compare-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
            @media (max-width: 767px) { .compare-grid { grid-template-columns: 1fr; } }
          `}</style>
          <div className="compare-grid">
            {/* Coloana stanga - website slab */}
            <motion.div
              initial={reduce ? false : { opacity: 0, x: -32 }}
              animate={compareInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, ease: EASE }}
              style={{
                background: 'rgba(239,68,68,0.04)',
                border: '1px solid rgba(239,68,68,0.15)',
                borderRadius: 16,
                padding: 32,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <XCircle size={22} style={{ color: '#EF4444', flexShrink: 0 }} aria-hidden="true" />
                <span style={{
                  fontFamily: 'var(--font-body)', fontWeight: 700,
                  fontSize: '1rem', color: '#EF4444',
                }}>
                  Website slab
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {PROBLEME_SITE_SLAB.map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <X size={14} style={{ color: '#EF4444', flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
                    <span style={{
                      fontFamily: 'var(--font-body)', fontWeight: 400,
                      fontSize: '0.875rem', color: '#4A5568',
                      lineHeight: 1.5,
                    }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Coloana dreapta - website Inovex */}
            <motion.div
              initial={reduce ? false : { opacity: 0, x: 32 }}
              animate={compareInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, ease: EASE }}
              style={{
                background: 'rgba(43,143,204,0.05)',
                border: '1px solid rgba(43,143,204,0.20)',
                borderRadius: 16,
                padding: 32,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <CheckCircle size={22} style={{ color: '#2B8FCC', flexShrink: 0 }} aria-hidden="true" />
                <span style={{
                  fontFamily: 'var(--font-body)', fontWeight: 700,
                  fontSize: '1rem', color: '#2B8FCC',
                }}>
                  Website Inovex
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {BENEFICII_INOVEX.map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <Check size={14} style={{ color: '#2B8FCC', flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
                    <span style={{
                      fontFamily: 'var(--font-body)', fontWeight: 400,
                      fontSize: '0.875rem', color: '#0D1117',
                      lineHeight: 1.5,
                    }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
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
                <span style={{ color: '#4AADE8' }}>website-ul live</span>
              </h2>
            </motion.div>
          </div>

          {/* Steps */}
          <style>{`
            .process-wp-grid {
              display: grid;
              grid-template-columns: repeat(5, 1fr);
              gap: 16px;
              position: relative;
            }
            @media (max-width: 1023px) {
              .process-wp-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
              .process-wp-connector { display: none !important; }
              .process-wp-step { flex-direction: row !important; text-align: left !important; align-items: flex-start !important; padding: 20px 0 !important; border-bottom: 1px solid rgba(255,255,255,0.06) !important; }
              .process-wp-icon-wrap { margin-bottom: 0 !important; margin-right: 16px !important; flex-shrink: 0 !important; }
              .process-wp-desc { max-width: 100% !important; }
            }
          `}</style>

          <div className="process-wp-grid">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.titlu}
                className="process-wp-step"
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
                    className="process-wp-connector"
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
                  className="process-wp-icon-wrap"
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
                    className="process-wp-desc"
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
        style={{ background: '#FFFFFF', padding: 'clamp(64px,8vw,100px) 0' }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(24px,5vw,48px)' }}>
          {/* Header */}
          <ScrollReveal>
            <div style={{ textAlign: 'center', maxWidth: 580, margin: '0 auto 56px' }}>
              <p style={{
                fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 11,
                textTransform: 'uppercase', letterSpacing: '0.10em',
                color: '#2B8FCC', marginBottom: 12,
              }}>
                Ce spun clientii
              </p>
              <h2
                id="recenzii-h2"
                style={{
                  fontFamily: 'var(--font-display)', fontWeight: 700,
                  fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                  lineHeight: 1.1, letterSpacing: '-0.025em',
                  color: '#0D1117', margin: 0,
                }}
              >
                Rezultate{' '}
                <span style={{ color: '#2B8FCC' }}>reale</span>,{' '}
                confirmate de clienti reali
              </h2>
            </div>
          </ScrollReveal>

          {/* Grid recenzii */}
          <style>{`
            .reviews-wp-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
            @media (max-width: 1023px) { .reviews-wp-grid { grid-template-columns: repeat(2, 1fr); } }
            @media (max-width: 599px)  { .reviews-wp-grid { grid-template-columns: 1fr; } }
          `}</style>
          <div className="reviews-wp-grid">
            {REVIEWS.map((review, i) => (
              <ScrollReveal key={review.nume} delay={i * 0.1}>
                <div className="card-glow" style={{
                  background: '#fff', border: '1px solid #E8ECF0',
                  borderRadius: 16, padding: 24,
                  display: 'flex', flexDirection: 'column', gap: 16,
                  height: '100%',
                }}>
                  {/* Stele */}
                  <div style={{ display: 'flex', gap: 3 }} aria-label="5 stele">
                    {Array.from({ length: 5 }).map((_, si) => <StarIcon key={si} />)}
                  </div>
                  {/* Text */}
                  <p style={{
                    fontFamily: 'var(--font-body)', fontWeight: 400,
                    fontSize: '0.9375rem', lineHeight: 1.7,
                    color: '#374151', flex: 1, margin: 0,
                  }}>
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div style={{ height: 1, background: '#F3F4F6' }} />
                  {/* Footer */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: '50%',
                        background: review.culoare,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <span style={{
                          fontFamily: 'var(--font-body)', fontWeight: 700,
                          fontSize: 13, color: '#fff', letterSpacing: '0.02em',
                        }}>
                          {review.initiale}
                        </span>
                      </div>
                      <div>
                        <div style={{
                          fontFamily: 'var(--font-body)', fontWeight: 700,
                          fontSize: 13, color: '#0D1117', lineHeight: 1.3,
                        }}>
                          {review.nume}
                        </div>
                        <div style={{
                          fontFamily: 'var(--font-body)', fontWeight: 400,
                          fontSize: 12, color: '#6B7280',
                        }}>
                          {review.website}
                        </div>
                      </div>
                    </div>
                    <GoogleIcon />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section
        aria-labelledby="faq-h2"
        style={{ background: '#F8FAFB', padding: 'clamp(64px,8vw,100px) 0' }}
      >
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 clamp(24px,5vw,48px)' }}>
          {/* Header */}
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <p style={{
                fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 11,
                textTransform: 'uppercase', letterSpacing: '0.10em',
                color: '#2B8FCC', marginBottom: 12,
              }}>
                Intrebari frecvente
              </p>
              <h2
                id="faq-h2"
                style={{
                  fontFamily: 'var(--font-display)', fontWeight: 700,
                  fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                  lineHeight: 1.1, letterSpacing: '-0.025em',
                  color: '#0D1117', margin: 0,
                }}
              >
                Raspunsuri la cele mai{' '}
                <span style={{ color: '#2B8FCC' }}>comune</span>{' '}
                intrebari
              </h2>
            </div>
          </ScrollReveal>

          {/* Accordion */}
          <div style={{ borderTop: '1px solid #E8ECF0' }}>
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

      {/* ══ CTA ══ */}
      <section
        aria-labelledby="cta-h2"
        style={{
          background: '#2B8FCC',
          padding: 'clamp(56px,8vw,80px) 0',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorativ */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.10), transparent 60%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 clamp(24px,5vw,48px)', position: 'relative', zIndex: 1 }}>
          <ScrollReveal>
            {/* Eyebrow */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 10, marginBottom: 20,
            }}>
              <div style={{ width: 28, height: 1, background: 'rgba(255,255,255,0.50)' }} aria-hidden />
              <span style={{
                fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 11,
                textTransform: 'uppercase', letterSpacing: '0.08em',
                color: 'rgba(255,255,255,0.70)',
              }}>
                Hai sa incepem
              </span>
              <div style={{ width: 28, height: 1, background: 'rgba(255,255,255,0.50)' }} aria-hidden />
            </div>

            {/* H2 */}
            <h2
              id="cta-h2"
              style={{
                fontFamily: 'var(--font-display)', fontWeight: 600,
                fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
                lineHeight: 1.1, letterSpacing: '-0.025em',
                color: '#FFFFFF', margin: '0 0 16px',
              }}
            >
              Gata sa ai o prezenta online care{' '}
              <span>aduce clienti</span>?
            </h2>

            {/* Subtitlu */}
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '1.0625rem',
              lineHeight: 1.7, color: 'rgba(255,255,255,0.75)',
              margin: '0 0 40px',
            }}>
              Solicita o oferta gratuita acum. Primesti raspuns in maximum 24 de ore, fara angajamente.
            </p>

            {/* Butoane */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
              <Link
                href="/configurare-website-prezentare"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: '#FFFFFF', color: '#2B8FCC',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.9375rem',
                  padding: '14px 32px', borderRadius: 8,
                  transition: 'background 200ms ease, transform 200ms ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = 'rgba(255,255,255,0.92)';
                  el.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = '#FFFFFF';
                  el.style.transform = 'scale(1)';
                }}
              >
                Configureaza website-ul tau
                <ArrowRight size={16} style={{ color: '#2B8FCC' }} aria-hidden="true" />
              </Link>
              <a
                href="tel:+40750456096"
                onClick={() => trackConversions.telefon()}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.30)',
                  color: '#FFFFFF', textDecoration: 'none',
                  fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9375rem',
                  padding: '14px 24px', borderRadius: 8,
                  transition: 'background 200ms ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.22)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.15)'; }}
              >
                <Phone size={15} aria-hidden="true" />
                0750 456 096
              </a>
            </div>

            {/* Trust */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 24, flexWrap: 'wrap', marginTop: 32,
            }}>
              {[
                { icon: Shield,       text: 'Garantie design nelimitata' },
                { icon: Clock,        text: 'Raspuns in 24h' },
                { icon: CheckCircle,  text: 'Fara angajamente' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Icon size={14} style={{ color: 'rgba(255,255,255,0.60)' }} aria-hidden="true" />
                  <span style={{
                    fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 13,
                    color: 'rgba(255,255,255,0.60)',
                  }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
