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

export const metadata: Metadata = {
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

export default async function HomePage() {
  const faqItems = await getFaqItems();

  return (
    <>
      <OrganizationJsonLd />
      <LocalBusinessJsonLd />
      <WebsiteJsonLd />
      <Hero />
      <TechMarquee />
      <Servicii />
      <Portofoliu />
      <Prezenta />
      <Recenzii />
      <Intrebari items={faqItems} />
      <Final />
    </>
  );
}
