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
import { cale, linkPagina, type Limba } from '@/lib/i18n/config';
import { dictionar, format } from '@/lib/i18n/dictionare';
import { textAcasa, type TextAcasa } from '@/lib/i18n/pagini/acasa';
import { AnimatieAplicatii } from './AnimatieAplicatii';
import { AnimatieCrm } from './AnimatieCrm';
import { AnimatieMagazin } from './AnimatieMagazin';
import { AnimatiePrezentare } from './AnimatiePrezentare';
import styles from './Servicii.module.css';

/* Serviciile de pe prima pagina (dupa exemplul dat de proprietar, 2026-10-18): randuri care
   alterneaza textul cu o animatie asezata pe un fundal gri, estompat. Animatiile sunt facute
   de proprietar, cate una pentru fiecare serviciu. Pe ecranele mari, tot blocul sta intr-un chenar
   ca al hero-ului (contur fin si rama de sticla); pe telefon si tableta, fiecare serviciu e un card.
   Fiecare are butoanele „Solicită ofertă” (cu serviciul deja ales in formular) si „Vezi portofoliul”.
   Textele, in fiecare limba, sunt in lib/i18n/pagini/acasa.ts (2026-11-05); la magazinul online,
   siglele de langa puncte sunt in romana firmele din Romania, iar in celelalte limbi echivalentele
   internationale (cu care am lucrat in proiectele din portofoliu). */

type IdServiciu = keyof TextAcasa['servicii']['lista'];

type Serviciu = {
  id: IdServiciu;
  Icon: LucideIcon;
  // serviciul, asa cum apare in lista din formularul de oferta (aceeasi valoare in toate limbile)
  oferta: string;
};

// un punct din lista si, unde e cazul, siglele celor cu care lucram
type Punct = { text: ReactNode; sigle?: Sigla[] };

// o sigla, cu marimea la care apare (fiecare are inaltimea ei, ca toate sa para la fel de mari)
type Sigla = { src: string; alt: string; w: number; h: number };

// animatia casutei (in limba paginii) si fundalul gri de sub ea
type Vizual = { fundal: string; Animatie: ComponentType<{ lang?: Limba }> };

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

// siglele de langa cele trei puncte ale magazinului online
const SIGLE_MAGAZIN: Record<'ro' | 'int', (Sigla[] | undefined)[]> = {
  ro: [
    [sigla('netopia.svg', 'Netopia', 15, 2.627), sigla('stripe.svg', 'Stripe', 16, 2.404), sigla('tbi.svg', 'TBI Bank', 19, 2.295)],
    [sigla('smartbill.webp', '', 26, 0.833), sigla('fgo.svg', '', 16, 2.632)],
    [
      sigla('fan-courier.svg', '', 24, 1.639),
      sigla('cargus.webp', '', 24, 1.298),
      sigla('sameday.webp', '', 26, 0.988),
      sigla('dpd.svg', '', 16, 2.333),
    ],
  ],
  int: [
    [
      sigla('stripe.svg', 'Stripe', 16, 2.404),
      sigla('paypal.svg', '', 14, 3.758),
      sigla('apple-pay.svg', '', 17, 2.436),
      sigla('google-pay.svg', '', 16, 2.667),
    ],
    undefined,
    [sigla('dhl.svg', '', 13, 3.235), sigla('ups.svg', '', 22, 0.843), sigla('dpd.svg', '', 16, 2.333)],
  ],
};

const PRINCIPALE: (Serviciu & { vizual: Vizual })[] = [
  {
    id: 'magazine-online',
    Icon: ShoppingBag,
    oferta: 'Magazin Online',
    vizual: { fundal: `${DIR}/fundaluri/magazine.webp`, Animatie: AnimatieMagazin },
  },
  {
    id: 'website-de-prezentare',
    Icon: LayoutTemplate,
    oferta: 'Website de Prezentare',
    vizual: { fundal: `${DIR}/fundaluri/prezentare.webp`, Animatie: AnimatiePrezentare },
  },
  {
    id: 'aplicatii-web-saas',
    Icon: AppWindow,
    oferta: 'Aplicatie Web & SaaS',
    vizual: { fundal: `${DIR}/fundaluri/aplicatii.webp`, Animatie: AnimatieAplicatii },
  },
  {
    id: 'cms-crm-erp',
    Icon: LayoutDashboard,
    oferta: 'CMS, CRM & ERP',
    vizual: { fundal: `${DIR}/fundaluri/crm.webp`, Animatie: AnimatieCrm },
  },
];

// pe ultimul rand, cate o casuta doar cu text
const ALTELE: Serviciu[] = [
  { id: 'aplicatii-mobile', Icon: Smartphone, oferta: 'Aplicatie Mobila' },
  { id: 'automatizari-ai', Icon: Sparkles, oferta: 'Automatizari AI' },
];

// punctele unui serviciu, cu siglele si randul cu calendarul (WhatsApp si Google Maps) acolo unde e cazul
function puncte(lang: Limba, t: TextAcasa['servicii'], id: IdServiciu): Punct[] {
  const lista = t.lista[id].puncte;
  if (id === 'magazine-online') {
    const sigle = SIGLE_MAGAZIN[lang === 'ro' ? 'ro' : 'int'];
    return lista.map((text, k) => ({ text, sigle: sigle[k] }));
  }
  if (id === 'website-de-prezentare') {
    return lista.map((text, k) =>
      k === 1
        ? {
            text: (
              <>
                {t.calendar.inainte}
                <span className={styles.whatsapp}>WhatsApp</span>
                {t.calendar.si}
                <span className={styles.maps}>
                  <Image src={`${DIR}/integrari/google-maps.webp`} alt="" width={12} height={16} unoptimized />
                  Google Maps
                </span>
              </>
            ),
          }
        : { text },
    );
  }
  return lista.map((text) => ({ text }));
}

export function Servicii({ lang = 'ro' }: { lang?: Limba }) {
  const t = textAcasa(lang).servicii;
  return (
    <section id="servicii" className={styles.servicii} aria-labelledby="servicii-titlu">
      <div className={styles.cap}>
        <h2 id="servicii-titlu" className={styles.titlu}>
          {t.titlu}
        </h2>
        <p className={styles.lead}>{t.lead}</p>
      </div>

      <div className={styles.chenar}>
        <div className={styles.grila}>
          {PRINCIPALE.map((s, k) => (
            <div key={s.id} className={styles.rand} data-invers={k % 2 === 1 ? '' : undefined}>
              <TextServiciu lang={lang} t={t} s={s} />
              <AnimatiePeFundal v={s.vizual} lang={lang} />
            </div>
          ))}
          <div className={styles.altele}>
            {ALTELE.map((s) => (
              <TextServiciu key={s.id} lang={lang} t={t} s={s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TextServiciu({ lang, t, s }: { lang: Limba; t: TextAcasa['servicii']; s: Serviciu }) {
  const { Icon } = s;
  const text = t.lista[s.id];
  const d = dictionar(lang);
  const lista = puncte(lang, t, s.id);
  return (
    <div className={styles.text}>
      <span className={styles.icon}>
        <Icon strokeWidth={1.6} aria-hidden />
      </span>
      <h3 className={styles.numeServiciu}>{text.titlu}</h3>
      <p className={styles.descriere}>{text.descriere}</p>
      {lista.length > 0 && (
        <ul className={styles.puncte}>
          {lista.map(({ text: p, sigle }, k) => (
            <li key={k}>
              <Image src={VERIFICAT} alt="" width={20} height={20} unoptimized className={styles.bifa} />
              <span>
                {p}
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
          ))}
        </ul>
      )}
      <div className={styles.actiuni}>
        <Link
          href={{ pathname: cale(lang, '/oferta'), query: { serviciu: s.oferta } }}
          className={styles.primar}
          aria-label={format(t.ofertaPentru, { serviciu: text.scurt })}
        >
          {d.antet.oferta}
          <ArrowRight aria-hidden />
        </Link>
        <Link href={linkPagina(lang, '/portofoliu') ?? cale(lang, '/')} className={styles.secundar}>
          {d.servicii.veziPortofoliul}
        </Link>
      </div>
    </div>
  );
}

// animatia casutei, pe fundalul ei
function AnimatiePeFundal({ v, lang }: { v: Vizual; lang: Limba }) {
  return (
    <div className={styles.vizual}>
      <Image src={v.fundal} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" unoptimized className={styles.fundal} />
      <v.Animatie lang={lang} />
    </div>
  );
}
