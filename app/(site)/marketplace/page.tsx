import type { Metadata } from 'next';
import { MarketplacePageClient } from './MarketplacePageClient';

export const metadata: Metadata = {
  title: 'Marketplace | Magazine Online si Website-uri Gata de Folosit | Inovex',
  description: 'Cumpara un magazin online sau website de prezentare complet functional, personalizat cu datele tale si livrat in 48 de ore. Peste 20 de nise disponibile.',
  openGraph: {
    title: 'Marketplace Inovex | Afaceri Digitale Gata de Vanzare',
    description: 'Magazine online si website-uri complete, functionale din prima zi. Livrare in 48h.',
    url: 'https://inovex.ro/marketplace',
    images: [{ url: '/images/og/marketplace-og.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marketplace Inovex | Afaceri Digitale',
    description: 'Magazine online si website-uri complete. Livrare in 48h.',
    images: ['/images/og/marketplace-og.jpg'],
  },
  alternates: { canonical: 'https://inovex.ro/marketplace' },
};

export default function MarketplacePage() {
  return <MarketplacePageClient />;
}
