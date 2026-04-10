import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans, Fraunces } from 'next/font/google';
import './globals.css';
import { GoogleTagManager } from '@/components/analytics/GoogleTagManager';

const inter = Inter({
  variable: '--font-body',
  subsets: ['latin'],
  display: 'swap',
});

const jakartaSans = Plus_Jakarta_Sans({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const fraunces = Fraunces({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['italic', 'normal'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Inovex | Agentie Web Premium | Magazine Online, Website-uri, Aplicatii',
    template: '%s | Inovex',
  },
  description:
    'Agentie de dezvoltare web din Romania. Construim magazine online, website-uri de prezentare si aplicatii web care performeaza, se incarca rapid si convertesc. 200+ proiecte livrate.',
  keywords: [
    'agentie web Romania',
    'dezvoltare web',
    'magazine online',
    'website de prezentare',
    'aplicatii web',
    'web design Romania',
    'WooCommerce Romania',
    'Shopify Romania',
    'SEO Romania',
    'Inovex',
  ],
  metadataBase: new URL('https://inovex.ro'),
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: 'Inovex',
    locale: 'ro_RO',
    images: [
      {
        url: '/images/og/inovex-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Inovex - Agentie Web Premium din Romania',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@inovex_ro',
    creator: '@inovex_ro',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
  alternates: {
    canonical: 'https://inovex.ro',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ro"
      className={`${inter.variable} ${jakartaSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <GoogleTagManager />
        {children}
      </body>
    </html>
  );
}
