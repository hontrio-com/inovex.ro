// Componente pentru structured data JSON-LD

export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Inovex',
    legalName: 'VOID SFT GAMES SRL',
    url: 'https://inovex.ro',
    logo: 'https://inovex.ro/images/logo/inovex-logo.png',
    description: 'Agenție de dezvoltare web premium din România. Magazine online, website-uri de prezentare, aplicații web și mobile.',
    foundingDate: '2018',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Târgu Jiu',
      addressRegion: 'Gorj',
      addressCountry: 'RO',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+40750456096',
      email: 'contact@inovex.ro',
      contactType: 'customer service',
      availableLanguage: 'Romanian',
      hoursAvailable: 'Mo-Fr 08:00-20:00',
    },
    sameAs: [
      'https://www.facebook.com/inovex.ro',
      'https://www.instagram.com/inovex.ro',
      'https://www.tiktok.com/@inovex.ro',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocalBusinessJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://inovex.ro/#localbusiness',
    name: 'Inovex',
    image: 'https://inovex.ro/og-image.jpg',
    url: 'https://inovex.ro',
    telephone: '+40750456096',
    email: 'contact@inovex.ro',
    priceRange: '€€',
    currenciesAccepted: 'RON, EUR',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Târgu Jiu',
      addressLocality: 'Târgu Jiu',
      addressRegion: 'Gorj',
      postalCode: '210000',
      addressCountry: 'RO',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '44.9200',
      longitude: '23.2736',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '20:00',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Romania',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Inovex',
    url: 'https://inovex.ro',
    description: 'Agenție de dezvoltare web premium din România',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://inovex.ro/blog?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceJsonLd({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    provider: {
      '@type': 'Organization',
      name: 'Inovex',
      url: 'https://inovex.ro',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Romania',
    },
    serviceType: 'Web Development',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
