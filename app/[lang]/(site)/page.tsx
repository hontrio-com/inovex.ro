import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { TechMarquee } from '@/components/sections/TechMarquee';
import { Servicii } from '@/components/sections/servicii/Servicii';
import { Portofoliu } from '@/components/sections/portofoliu/Portofoliu';
import { Prezenta } from '@/components/sections/prezenta/Prezenta';
import { Recenzii } from '@/components/sections/recenzii/Recenzii';
import { Intrebari } from '@/components/sections/intrebari/Intrebari';
import { Final } from '@/components/sections/final/Final';
import {
  OrganizationJsonLd,
  LocalBusinessJsonLd,
  WebsiteJsonLd,
} from '@/components/seo/JsonLd';
import { getFaqItems } from '@/lib/site-data';
import { alternanteMetadata, esteLimba, LIMBA_IMPLICITA } from '@/lib/i18n/config';
import { dictionar } from '@/lib/i18n/dictionare';
import { textAcasa } from '@/lib/i18n/pagini/acasa';

type Props = { params: Promise<{ lang: string }> };

const METADATA_RO: Metadata = {
  title: 'Inovex - Agentie Web Premium - Magazine Online, Website-uri, Aplicatii',
  description:
    'Agentie de dezvoltare web din Romania. Construim magazine online, website-uri de prezentare si aplicatii web care performeaza, se incarca rapid si convertesc. 200+ proiecte livrate.',
  keywords: [
    'agentie web Romania',
    'magazine online',
    'website de prezentare',
    'aplicatii web',
    'web design',
    'WooCommerce',
    'Shopify',
    'dezvoltare web Romania',
  ],
  alternates: { canonical: 'https://inovex.ro' },
  openGraph: {
    title: 'Inovex - Agentie Web Premium - Magazine Online, Website-uri, Aplicatii',
    description:
      'Agentie de dezvoltare web din Romania. 200+ proiecte livrate. Magazine online, website-uri de prezentare si aplicatii web.',
    url: 'https://inovex.ro',
    images: [{ url: '/images/og/inovex-og.jpg', width: 1200, height: 630, alt: 'Inovex - Agentie Web' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Inovex - Agentie Web Premium',
    description: 'Magazine online, website-uri de prezentare si aplicatii web din Romania.',
    images: ['/images/og/inovex-og.jpg'],
  },
};

// Romana pastreaza metadatele de mai sus; celelalte limbi (pana la traducerea paginii) pe cele din layout.
// Toate primesc canonical + hreflang catre celelalte limbi.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: l } = await params;
  const lang = esteLimba(l) ? l : LIMBA_IMPLICITA;
  const alternates = alternanteMetadata(lang, '/');
  if (lang === 'ro') return { ...METADATA_RO, alternates };

  const t = dictionar(lang).meta;
  return {
    title: { absolute: t.titlu },
    description: t.descriere,
    keywords: t.cuvinte,
    alternates,
    openGraph: {
      title: t.titlu,
      description: t.descriere,
      url: alternates.canonical,
      images: [{ url: '/images/og/inovex-og.jpg', width: 1200, height: 630, alt: t.ogAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.titlu,
      description: t.descriere,
      images: ['/images/og/inovex-og.jpg'],
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { lang: l } = await params;
  const lang = esteLimba(l) ? l : LIMBA_IMPLICITA;
  const t = textAcasa(lang);
  // intrebarile din admin sunt in romana; celelalte limbi au traducerile lor
  const faqItems = lang === 'ro' ? await getFaqItems() : undefined;

  return (
    <>
      <OrganizationJsonLd />
      <LocalBusinessJsonLd />
      <WebsiteJsonLd />
      <Hero lang={lang} />
      <TechMarquee titlu={t.tehnologii.titlu} aria={t.tehnologii.aria} />
      <Servicii lang={lang} />
      <Portofoliu lang={lang} />
      <Prezenta lang={lang} />
      <Recenzii lang={lang} />
      <Intrebari items={faqItems} lang={lang} />
      <Final lang={lang} />
    </>
  );
}
