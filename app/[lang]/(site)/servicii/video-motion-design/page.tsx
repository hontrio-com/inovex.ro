import type { Metadata } from 'next';
import { ServiceJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import HeroMotion from '@/components/servicii/motion/HeroMotion';
import BeneficiiMotion from '@/components/servicii/motion/BeneficiiMotion';
import PortfolioMotion from '@/components/servicii/motion/PortfolioMotion';
import ComandaMotion from '@/components/servicii/motion/ComandaMotion';
import StickyComandaMotion from '@/components/servicii/motion/StickyComandaMotion';
import MotionPixelEvent from '@/components/servicii/motion/MotionPixelEvent';
import { Intrebari } from '@/components/sections/intrebari/Intrebari';
import { SITE_URL, alternanteMetadata, cale, esteLimba, LIMBA_IMPLICITA, type Limba } from '@/lib/i18n/config';
import { completeaza, textMotion } from '@/lib/i18n/pagini/motion';
import { formatPret, monedaMotion, motionPrice, MOTION_PATH } from '@/lib/motion-design';
import type { FaqItem } from '@/lib/site-data';

/* Pagina Video Motion Design, in 4 limbi (2026-11-06). Textele: lib/i18n/pagini/motion.ts. In romana
   preturile sunt in lei, in rest in euro (cursul BNR, rotunjit: lib/motion-design.ts); plata Stripe se face
   in moneda paginii. */

type Props = { params: Promise<{ lang: string }> };

const limba = async (params: Props['params']): Promise<Limba> => {
  const { lang } = await params;
  return esteLimba(lang) ? lang : LIMBA_IMPLICITA;
};

const pretMinim = (lang: Limba) => {
  const moneda = monedaMotion(lang);
  return formatPret(motionPrice(1, moneda), moneda, lang);
};

const adresa = (lang: Limba, intern: string) => SITE_URL + (cale(lang, intern) === '/' ? '' : cale(lang, intern));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await limba(params);
  const t = textMotion(lang).meta;
  const pret = pretMinim(lang);
  const alternates = alternanteMetadata(lang, MOTION_PATH);
  return {
    title: t.titlu,
    description: completeaza(t.descriere, { pret }),
    alternates,
    openGraph: { title: t.titlu, description: completeaza(t.ogDescriere, { pret }), url: alternates.canonical },
  };
}

export default async function Page({ params }: Props) {
  const lang = await limba(params);
  const t = textMotion(lang);
  const moneda = monedaMotion(lang);
  const intrebari: FaqItem[] = t.intrebari.map((x, i) => ({ id: String(i + 1), ...x }));
  // in romana firimiturile trec si prin pagina „Servicii”, care nu exista (inca) in celelalte limbi
  const firimituri =
    lang === 'ro'
      ? [
          { name: t.meta.firimituri[0], url: SITE_URL },
          { name: t.meta.firimituri[1], url: `${SITE_URL}/servicii` },
          { name: t.meta.firimituri[2], url: adresa(lang, MOTION_PATH) },
        ]
      : [
          { name: t.meta.firimituri[0], url: adresa(lang, '/') },
          { name: t.meta.firimituri[1], url: adresa(lang, MOTION_PATH) },
        ];

  return (
    <>
      <ServiceJsonLd name={t.meta.serviciu} description={t.meta.serviciuDescriere} url={adresa(lang, MOTION_PATH)} />
      <BreadcrumbJsonLd items={firimituri} />
      <MotionPixelEvent
        event="ViewContent"
        params={{ content_name: 'motion-design', content_category: 'servicii', value: motionPrice(1, moneda), currency: moneda }}
      />
      <HeroMotion lang={lang} />
      <BeneficiiMotion lang={lang} />
      <PortfolioMotion lang={lang} />
      <ComandaMotion lang={lang} t={t.comanda} eticheta={t.eticheta} />
      <Intrebari items={intrebari} lang={lang} />
      <StickyComandaMotion t={t.lipit} pret={pretMinim(lang)} />
    </>
  );
}
