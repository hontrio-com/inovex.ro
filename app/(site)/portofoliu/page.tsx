import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { PortfolioGrid } from '@/components/portofoliu/PortfolioGrid';
import { Badge } from '@/components/ui/badge';
import { Briefcase, ChevronRight, Info } from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '@/lib/portfolio-data';

export const metadata: Metadata = {
  title: 'Portofoliu - 200+ Proiecte Web Livrate',
  description:
    'Descopera proiectele realizate de echipa Inovex: magazine online, website-uri de prezentare, platforme SaaS si aplicatii web pentru clienti din toata Romania. 200+ proiecte livrate cu succes.',
  keywords: ['portofoliu web', 'proiecte magazine online', 'website realizat Romania', 'exemple website'],
  alternates: { canonical: 'https://inovex.ro/portofoliu' },
  openGraph: {
    title: 'Portofoliu - 200+ Proiecte Web Livrate',
    description: '200+ proiecte livrate: magazine online, website-uri, platforme SaaS pentru clienti din toata Romania.',
    url: 'https://inovex.ro/portofoliu',
    images: [{ url: '/images/og/inovex-og.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portofoliu Inovex - 200+ Proiecte',
    description: '200+ proiecte web livrate in Romania.',
    images: ['/images/og/inovex-og.jpg'],
  },
};

export default function PortofoliuPage(): React.ReactElement {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Acasa', url: 'https://inovex.ro' },
          { name: 'Portofoliu', url: 'https://inovex.ro/portofoliu' },
        ]}
      />

      {/* JSON-LD ItemList for first 10 projects */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Portofoliu Inovex',
            numberOfItems: 25,
            itemListElement: PORTFOLIO_PROJECTS.slice(0, 10).map((p, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: p.title,
              url: p.url,
            })),
          }),
        }}
      />

      {/* HERO */}
      <section className="bg-white border-b border-[#E8ECF0] pt-[120px] pb-16 max-md:pt-20 max-md:pb-12">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="flex items-center gap-1 text-sm mb-8">
            <a href="/" className="text-[#4A5568] hover:text-[#0D1117] transition-colors">
              Acasa
            </a>
            <ChevronRight size={14} className="text-[#8A94A6]" />
            <span className="text-[#0D1117] font-semibold">Portofoliu</span>
          </nav>

          <div className="max-w-[640px]">
            <Badge variant="outline" className="mb-5 inline-flex items-center gap-1.5">
              <Briefcase size={13} />
              Portofoliu
            </Badge>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: 'clamp(2.1rem, 3.6vw, 3.2rem)',
                lineHeight: 1.08,
                letterSpacing: '-0.022em',
                color: '#0D1117',
              }}
              className="mb-4"
            >
              Peste 200 de proiecte{' '}
              <span style={{ fontStyle: 'italic', color: '#2B8FCC' }}>realizate cu succes</span>
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.0625rem',
                lineHeight: 1.75,
                color: '#4A5568',
              }}
              className="mb-6"
            >
              Am ajutat companii din România și din afara țării să își dezvolte prezența online și să transforme vizitatorii în clienți, prin platforme gândite strategic pentru creștere.
            </p>
            {/* Disclaimer */}
            <div className="inline-flex items-start gap-2.5 bg-[#EAF5FF] border border-[#C8E6F8] rounded-lg px-4 py-3 max-w-[520px]">
              <Info size={15} className="text-[#2B8FCC] shrink-0 mt-0.5" />
              <p className="text-[13px] text-[#2B8FCC] leading-relaxed">
                Mai jos sunt prezentate <strong>cateva proiecte reprezentative</strong> din diferite
                domenii. Portofoliul complet include peste 200 de lucrari; contacteaza-ne pentru a
                vedea exemple relevante pentru industria ta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GRID with filters */}
      <PortfolioGrid />
    </>
  );
}
