import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import '../globals.css';
import { clasaHtml } from '../fonturi';
import { Pixeli } from '@/components/analytics/Pixeli';
import { LIMBI, NUME_LIMBI, SITE_URL, cale, esteLimba } from '@/lib/i18n/config';
import { dictionar } from '@/lib/i18n/dictionare';

/* Layout-ul radacina al site-ului public, pe limbi (2026-11-05): romana la adresele de pana acum, iar
   engleza, germana si franceza sub /en, /de, /fr (vezi lib/i18n/config.ts si proxy.ts). Adminul si
   semnarea contractelor au layout-uri radacina proprii, cu aceleasi fonturi si pixeli. */

type Props = { children: React.ReactNode; params: Promise<{ lang: string }> };

export function generateStaticParams() {
  return LIMBI.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!esteLimba(lang)) return {};
  const t = dictionar(lang).meta;
  const acasa = cale(lang, '/');

  return {
    title: {
      default: t.titlu,
      template: '%s - Inovex',
    },
    description: t.descriere,
    keywords: t.cuvinte,
    metadataBase: new URL(SITE_URL),
    robots: { index: true, follow: true },
    openGraph: {
      type: 'website',
      siteName: 'Inovex',
      locale: NUME_LIMBI[lang].og,
      images: [
        {
          url: '/images/og/inovex-og.jpg',
          width: 1200,
          height: 630,
          alt: t.ogAlt,
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
      canonical: acasa === '/' ? SITE_URL : `${SITE_URL}${acasa}`,
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
      other: [
        { rel: 'manifest', url: '/site.webmanifest' },
      ],
    },
  };
}

export default async function LayoutLimba({ children, params }: Props) {
  const { lang } = await params;
  if (!esteLimba(lang)) notFound();

  return (
    <html lang={lang} className={clasaHtml}>
      <body className="min-h-full flex flex-col">
        <Pixeli />
        {children}
      </body>
    </html>
  );
}
