import type { Metadata } from 'next';

export const SITE_URL = 'https://inovex.ro';
export const SITE_NAME = 'Inovex';
export const SITE_DESCRIPTION =
  'Agentie de dezvoltare web premium din Romania. Magazine online, website-uri de prezentare, aplicatii web si mobile.';

export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og/inovex-og.jpg`;

/* ── Metadata factory ──────────────────────────────────────────── */
export function buildMetadata({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  noindex = false,
  keywords,
}: {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  noindex?: boolean;
  keywords?: string[];
}): Metadata {
  return {
    title,
    description,
    ...(keywords?.length && { keywords }),
    alternates: { canonical },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: 'ro_RO',
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

/* ── Article metadata factory ──────────────────────────────────── */
export function buildArticleMetadata({
  title,
  description,
  canonical,
  ogImage,
  publishedAt,
  modifiedAt,
  keywords,
}: {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  publishedAt?: string;
  modifiedAt?: string;
  keywords?: string[];
}): Metadata {
  const image = ogImage || DEFAULT_OG_IMAGE;
  return {
    title,
    description,
    ...(keywords?.length && { keywords }),
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: 'ro_RO',
      type: 'article',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      ...(publishedAt && { publishedTime: publishedAt }),
      ...(modifiedAt && { modifiedTime: modifiedAt }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

/* ── JSON-LD helpers ───────────────────────────────────────────── */
export function generateBreadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateArticleJsonLd({
  title,
  description,
  url,
  imageUrl,
  publishedAt,
  modifiedAt,
}: {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  publishedAt?: string;
  modifiedAt?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    ...(imageUrl && { image: imageUrl }),
    ...(publishedAt && { datePublished: publishedAt }),
    ...(modifiedAt && { dateModified: modifiedAt }),
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo/inovex-logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}

export function generateServiceJsonLd({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: { '@type': 'Country', name: 'Romania' },
    serviceType: 'Web Development',
  };
}

export function generateFaqJsonLd(
  items: { question: string; answer: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
