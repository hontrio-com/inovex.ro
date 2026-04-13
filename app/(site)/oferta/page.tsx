import type { Metadata } from 'next';
import { Suspense } from 'react';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { FileSearch } from 'lucide-react';
import { OfertaFormWrapper } from './OfertaFormWrapper';
import { OfertaSidebar } from './OfertaSidebar';

export const metadata: Metadata = {
  title: 'Solicita Oferta Personalizata',
  description:
    'Completeaza formularul si un consultant Inovex te contacteaza in maximum 24 de ore cu o propunere personalizata.',
  robots: { index: false },
  alternates: { canonical: 'https://inovex.ro/oferta' },
};

export default function OfertaPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Acasa', url: 'https://inovex.ro' },
          { name: 'Solicita Oferta', url: 'https://inovex.ro/oferta' },
        ]}
      />

      {/* Hero */}
      <div className="bg-white border-b border-[#E8ECF0] pt-[120px] pb-12">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            className="flex items-center gap-2 mb-5"
            aria-label="Breadcrumb"
            style={{ fontSize: '13px', color: '#8A94A6' }}
          >
            <a href="/" className="hover:text-[#2B8FCC] transition-colors">
              Acasa
            </a>
            <span aria-hidden="true">/</span>
            <span style={{ color: '#0D1117' }}>Solicita Oferta</span>
          </nav>

          <div className="flex items-center gap-2 mb-4">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full"
              style={{
                background: '#EAF5FF',
                border: '1px solid #C8E6F8',
                fontSize: '13px',
                fontWeight: 600,
                color: '#2B8FCC',
              }}
            >
              <FileSearch size={13} />
              Solicita Oferta
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(2rem,4vw,2.75rem)',
              color: '#0D1117',
              lineHeight: 1.2,
              marginBottom: '12px',
            }}
          >
            Solicita o oferta{' '}
            <span style={{ fontStyle: 'italic', color: '#2B8FCC' }}>personalizata</span>
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.0625rem',
              color: '#4A5568',
              lineHeight: 1.7,
              maxWidth: '560px',
            }}
          >
            Completeaza formularul de mai jos si un consultant Inovex te contacteaza in maximum 24
            de ore.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-[#F8FAFB] py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">
            {/* Left — form */}
            <Suspense fallback={<OfertaFormSkeleton />}>
              <OfertaFormWrapper />
            </Suspense>

            {/* Right — sidebar */}
            <OfertaSidebar />
          </div>
        </div>
      </div>
    </>
  );
}

function OfertaFormSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-[#E8ECF0] p-8 animate-pulse">
      <div className="h-6 bg-[#E8ECF0] rounded w-1/3 mb-6" />
      <div className="h-10 bg-[#E8ECF0] rounded mb-4" />
      <div className="h-28 bg-[#E8ECF0] rounded mb-4" />
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="h-10 bg-[#E8ECF0] rounded" />
        <div className="h-10 bg-[#E8ECF0] rounded" />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="h-10 bg-[#E8ECF0] rounded" />
        <div className="h-10 bg-[#E8ECF0] rounded" />
      </div>
      <div className="h-10 bg-[#E8ECF0] rounded mb-4" />
      <div className="h-10 bg-[#E8ECF0] rounded mb-6" />
      <div className="h-4 bg-[#E8ECF0] rounded w-2/3 mb-6" />
      <div className="h-11 bg-[#E8ECF0] rounded" />
    </div>
  );
}
