import type { ComponentType, ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  AppWindow,
  ArrowRight,
  LayoutDashboard,
  LayoutTemplate,
  ShoppingBag,
  Smartphone,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { AnimatieAplicatii } from './AnimatieAplicatii';
import { AnimatieCrm } from './AnimatieCrm';
import { AnimatieMagazin } from './AnimatieMagazin';
import { AnimatiePrezentare } from './AnimatiePrezentare';
import styles from './Servicii.module.css';

/* Serviciile de pe prima pagina (dupa exemplul dat de proprietar, 2026-10-18): randuri care
   alterneaza textul cu o animatie asezata pe un fundal gri, estompat. Animatiile sunt facute
   de proprietar, cate una pentru fiecare serviciu. Pe ecranele mari, tot blocul sta intr-un chenar
   ca al hero-ului (contur fin si rama de sticla); pe telefon si tableta, fiecare serviciu e un card.
   Fiecare are butoanele „Solicită ofertă” (cu serviciul deja ales in formular) si „Vezi portofoliul”. */

type Serviciu = {
  id: string;
  Icon: LucideIcon;
  titlu: string;
  descriere: string;
  // serviciul, asa cum apare in lista din formularul de oferta, si numele lui scurt
  oferta: string;
  scurt: string;
  puncte?: (string | Punct)[];
};

// un punct din lista si, unde e cazul, siglele celor cu care lucram
type Punct = { text: ReactNode; sigle?: Sigla[] };

// o sigla, cu marimea la care apare (fiecare are inaltimea ei, ca toate sa para la fel de mari)
type Sigla = { src: string; alt: string; w: number; h: number };

// animatia casutei si fundalul gri de sub ea
type Vizual = { fundal: string; Animatie: ComponentType };

const DIR = '/imagini/servicii/acasa';

// insigna de pe fiecare punct din lista
const VERIFICAT = `${DIR}/verificat.webp`;

// sigla din `integrari/`: fisierul, textul alternativ (gol daca numele e deja in text), inaltimea
// in pixeli si raportul latime / inaltime
const sigla = (fisier: string, alt: string, h: number, raport: number): Sigla => ({
  src: `${DIR}/integrari/${fisier}`,
  alt,
  w: Math.round(h * raport),
  h,
});

const PRINCIPALE: (Serviciu & { vizual: Vizual })[] = [
  {
    id: 'magazine-online',
    Icon: ShoppingBag,
    titlu: 'Magazin online la cheie, cu toate integrările',
    descriere:
      'Realizăm magazinul tău online complet, de la design și structură până la integrările de plată, curierat, facturare și automatizările necesare pentru a începe să vinzi online.',
    oferta: 'Magazin Online',
    scurt: 'magazine online',
    puncte: [
      {
        text: 'Plată cu cardul, ramburs sau în rate',
        sigle: [sigla('netopia.svg', 'Netopia', 15, 2.627), sigla('stripe.svg', 'Stripe', 16, 2.404), sigla('tbi.svg', 'TBI Bank', 19, 2.295)],
      },
      {
        text: 'Facturi automate în SmartBill, Oblio sau FGO',
        sigle: [sigla('smartbill.webp', '', 26, 0.833), sigla('fgo.svg', '', 16, 2.632)],
      },
      {
        text: 'Livrare cu Cargus, FAN Courier, Sameday sau DPD',
        sigle: [
          sigla('fan-courier.svg', '', 24, 1.639),
          sigla('cargus.webp', '', 24, 1.298),
          sigla('sameday.webp', '', 26, 0.988),
          sigla('dpd.svg', '', 16, 2.333),
        ],
      },
    ],
    vizual: { fundal: `${DIR}/fundaluri/magazine.webp`, Animatie: AnimatieMagazin },
  },
  {
    id: 'website-de-prezentare',
    Icon: LayoutTemplate,
    titlu: 'Website de prezentare care aduce clienți',
    descriere:
      'Am construit site-uri pentru stomatologi, avocați, firme de construcții, restaurante și zeci de alte domenii. Știm ce funcționează în fiecare industrie.',
    oferta: 'Website de Prezentare',
    scurt: 'website-uri de prezentare',
    puncte: [
      'Design creat de la zero pentru domeniul tău',
      {
        text: (
          <>
            Calendar de programări + <span className={styles.whatsapp}>WhatsApp</span> și{' '}
            <span className={styles.maps}>
              <Image src={`${DIR}/integrari/google-maps.webp`} alt="" width={12} height={16} unoptimized />
              Google Maps
            </span>
          </>
        ),
      },
      'SEO tehnic complet, configurat de la lansare',
    ],
    vizual: { fundal: `${DIR}/fundaluri/prezentare.webp`, Animatie: AnimatiePrezentare },
  },
  {
    id: 'aplicatii-web-saas',
    Icon: AppWindow,
    titlu: 'Aplicații web și SaaS, de la idee la lansare',
    descriere:
      'Ai o idee pentru o platformă online sau un instrument care rezolvă o problemă reală? Tu ne spui ce trebuie să facă, noi construim tot ce e în spate.',
    oferta: 'Aplicatie Web & SaaS',
    scurt: 'aplicații web și SaaS',
    puncte: [
      'Dashboard-uri cu date în timp real',
      'Abonamente și plăți recurente',
      'Portaluri pentru clienți și parteneri',
    ],
    vizual: { fundal: `${DIR}/fundaluri/aplicatii.webp`, Animatie: AnimatieAplicatii },
  },
  {
    id: 'cms-crm-erp',
    Icon: LayoutDashboard,
    titlu: 'CRM și ERP creat pentru afacerea ta',
    descriere:
      'Vedem cum funcționează afacerea ta și unde se pierd timp și bani, apoi construim sistemul care rezolvă exact acele probleme. Livrat complet, cu echipa instruită.',
    oferta: 'CMS, CRM & ERP',
    scurt: 'CMS, CRM și ERP',
    puncte: [
      'Toată echipa lucrează din același loc',
      'Stoc, comenzi și facturi în timp real',
      'Rapoarte generate automat, în câteva secunde',
    ],
    vizual: { fundal: `${DIR}/fundaluri/crm.webp`, Animatie: AnimatieCrm },
  },
];

// pe ultimul rand, cate o casuta doar cu text
const ALTELE: Serviciu[] = [
  {
    id: 'aplicatii-mobile',
    Icon: Smartphone,
    titlu: 'Aplicații mobile pentru iOS și Android',
    descriere:
      'Aplicații rapide și ușor de folosit, construite cu React Native sau Flutter, cu o experiență fluidă pe orice telefon.',
    oferta: 'Aplicatie Mobila',
    scurt: 'aplicații mobile',
  },
  {
    id: 'automatizari-ai',
    Icon: Sparkles,
    titlu: 'Automatizări cu AI',
    descriere:
      'Chatboți, procesarea emailurilor, calificarea lead-urilor și rapoarte generate automat, ca echipa ta să se ocupe de ce contează.',
    oferta: 'Automatizari AI',
    scurt: 'automatizări cu AI',
  },
];

export function Servicii() {
  return (
    <section id="servicii" className={styles.servicii} aria-labelledby="servicii-titlu">
      <div className={styles.cap}>
        <h2 id="servicii-titlu" className={styles.titlu}>
          Soluții construite pentru rezultate
        </h2>
        <p className={styles.lead}>
          Nu doar pentru aspect. Fiecare proiect are un obiectiv clar: mai mulți clienți, conversii mai mari
          sau operațiuni mai eficiente.
        </p>
      </div>

      <div className={styles.chenar}>
        <div className={styles.grila}>
          {PRINCIPALE.map((s, k) => (
            <div key={s.id} className={styles.rand} data-invers={k % 2 === 1 ? '' : undefined}>
              <TextServiciu s={s} />
              <AnimatiePeFundal v={s.vizual} />
            </div>
          ))}
          <div className={styles.altele}>
            {ALTELE.map((s) => (
              <TextServiciu key={s.id} s={s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TextServiciu({ s }: { s: Serviciu }) {
  const { Icon } = s;
  return (
    <div className={styles.text}>
      <span className={styles.icon}>
        <Icon strokeWidth={1.6} aria-hidden />
      </span>
      <h3 className={styles.numeServiciu}>
        {s.titlu}
      </h3>
      <p className={styles.descriere}>{s.descriere}</p>
      {s.puncte && (
        <ul className={styles.puncte}>
          {s.puncte.map((p, k) => {
            const { text, sigle } = typeof p === 'string' ? { text: p, sigle: undefined } : p;
            return (
              <li key={k}>
                <Image src={VERIFICAT} alt="" width={20} height={20} unoptimized className={styles.bifa} />
                <span>
                  {text}
                  {sigle && (
                    <span className={styles.sigle}>
                      {sigle.map((g) => (
                        <span key={g.src} className={styles.sigla}>
                          <Image src={g.src} alt={g.alt} width={g.w} height={g.h} unoptimized />
                        </span>
                      ))}
                    </span>
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      )}
      <div className={styles.actiuni}>
        <Link
          href={{ pathname: '/oferta', query: { serviciu: s.oferta } }}
          className={styles.primar}
          aria-label={'Solicită ofertă pentru ' + s.scurt}
        >
          Solicită ofertă
          <ArrowRight aria-hidden />
        </Link>
        <Link href="/portofoliu" className={styles.secundar}>
          Vezi portofoliul
        </Link>
      </div>
    </div>
  );
}

// animatia casutei, pe fundalul ei
function AnimatiePeFundal({ v }: { v: Vizual }) {
  return (
    <div className={styles.vizual}>
      <Image src={v.fundal} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" unoptimized className={styles.fundal} />
      <v.Animatie />
    </div>
  );
}
