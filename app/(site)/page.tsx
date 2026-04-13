import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { TechMarquee } from '@/components/sections/TechMarquee';
import { Services } from '@/components/sections/Services';
import { Portfolio } from '@/components/sections/Portfolio';
import RomaniaMapBanner from '@/components/sections/RomaniaMapBanner';
import { Testimonials } from '@/components/sections/Testimonials';
import { FAQ } from '@/components/sections/FAQ';
import { CTA } from '@/components/sections/CTA';
import {
  OrganizationJsonLd,
  LocalBusinessJsonLd,
  WebsiteJsonLd,
} from '@/components/seo/JsonLd';
import {
  getServices, getPortfolioItems,
  getTestimonials, getFaqItems,
} from '@/lib/site-data';

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
  const [services, proiecte, testimonials, faqItems] = await Promise.all([
    getServices(),
    getPortfolioItems(),
    getTestimonials(),
    getFaqItems(),
  ]);

  return (
    <>
      <OrganizationJsonLd />
      <LocalBusinessJsonLd />
      <WebsiteJsonLd />
      <Hero />
      <TechMarquee />
      <Services data={services.length ? services : undefined} />
      <Portfolio proiecte={proiecte.length ? proiecte : undefined} />
      <RomaniaMapBanner />
      <Testimonials items={testimonials.length ? testimonials : undefined} />
      <FAQ items={faqItems.length ? faqItems : undefined} />
      <CTA />
    </>
  );
}
