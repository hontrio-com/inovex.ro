import type { Metadata } from 'next';
import { ServiceJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import MagazineOnlineClient from './_MagazineOnlineClient';

export const metadata: Metadata = {
  title: 'Magazin Online la Cheie | Dezvoltare WooCommerce & Shopify | Inovex',
  description: 'Construim magazine online complete: design personalizat, plati integrate, curierat, facturare automata si SEO. Peste 80 de magazine online livrate. Solicita oferta gratuita.',
  alternates: { canonical: 'https://inovex.ro/servicii/magazine-online' },
  openGraph: {
    title: 'Magazin Online la Cheie | Inovex',
    description: 'Magazine online complete, functionale din prima zi. WooCommerce, Shopify, Next.js Commerce.',
    images: [{ url: '/images/og/magazin-online.jpg', width: 1200, height: 630 }],
  },
};

export default function MagazineOnlinePage() {
  return (
    <>
      <ServiceJsonLd
        name="Dezvoltare Magazine Online"
        description="Construim magazine online complete, personalizate 100%, integrate cu plati, curierat si facturare."
        url="https://inovex.ro/servicii/magazine-online"
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Acasa', url: 'https://inovex.ro' },
          { name: 'Servicii', url: 'https://inovex.ro/servicii' },
          { name: 'Magazin Online', url: 'https://inovex.ro/servicii/magazine-online' },
        ]}
      />
      <MagazineOnlineClient />
    </>
  );
}
