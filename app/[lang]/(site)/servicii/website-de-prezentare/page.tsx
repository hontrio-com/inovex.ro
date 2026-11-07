import type { Metadata } from 'next';
import { ServiceJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import WebsitePrezentareClient from './_WebsitePrezentareClient';

export const metadata: Metadata = {
  title: 'Website de Prezentare Profesional - Design 100% Personalizat',
  description: 'Construim website-uri de prezentare complete pentru orice domeniu de activitate. Design personalizat, SEO tehnic, CMS inclus si viteza garantata. Solicita oferta gratuita.',
  alternates: { canonical: 'https://inovex.ro/servicii/website-de-prezentare' },
  openGraph: {
    title: 'Website de Prezentare Profesional',
    description: 'Website-uri de prezentare complete, livrate la termen, pentru orice industrie.',
    images: [{ url: '/images/og/website-prezentare.jpg', width: 1200, height: 630 }],
  },
};

export default function WebsitePrezentarePage() {
  return (
    <>
      <ServiceJsonLd
        name="Dezvoltare Website de Prezentare"
        description="Construim website-uri de prezentare profesionale pentru orice domeniu de activitate."
        url="https://inovex.ro/servicii/website-de-prezentare"
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Acasa', url: 'https://inovex.ro' },
          { name: 'Servicii', url: 'https://inovex.ro/servicii' },
          { name: 'Website de Prezentare', url: 'https://inovex.ro/servicii/website-de-prezentare' },
        ]}
      />
      <WebsitePrezentareClient />
    </>
  );
}
