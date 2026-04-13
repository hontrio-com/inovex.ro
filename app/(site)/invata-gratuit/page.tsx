import type { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import { ChevronRight, BookOpen, Download, Wrench, Play } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { ContentHub } from '@/components/learn/ContentHub'
import { ContentCard } from '@/components/learn/ContentCard'
import {
  getLearnCategories,
  getLearnContent,
  getContentStats,
  getFeaturedContent,
} from '@/lib/learn-data'

export const revalidate = 0

export const metadata: Metadata = {
  title: 'Invata Gratuit - Ghiduri, Resurse si Tool-uri',
  description:
    'Resurse gratuite pentru antreprenori si developeri: articole, ghiduri PDF, tool-uri interactive si video tutoriale despre e-commerce, web design si SEO.',
  keywords: [
    'resurse gratuite web',
    'ghiduri magazine online',
    'tool-uri SEO gratuite',
    'invata web design',
    'tutoriale e-commerce',
  ],
  alternates: { canonical: 'https://inovex.ro/invata-gratuit' },
  openGraph: {
    title: 'Invata Gratuit - Ghiduri, Resurse si Tool-uri',
    description:
      'Resurse gratuite: articole, ghiduri PDF, tool-uri interactive si tutoriale video despre e-commerce si web.',
    url: 'https://inovex.ro/invata-gratuit',
    images: [{ url: '/images/og/inovex-og.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Invata Gratuit',
    description: 'Resurse gratuite: articole, ghiduri PDF, tool-uri si tutoriale video.',
    images: ['/images/og/inovex-og.jpg'],
  },
}

export default async function InvataGratuitPage() {
  const [categories, contentResult, stats, featured] = await Promise.all([
    getLearnCategories(),
    getLearnContent({ perPage: 200 }),
    getContentStats(),
    getFeaturedContent(),
  ])

  const allItems = contentResult.items

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Invata Gratuit - Inovex',
    url: 'https://inovex.ro/invata-gratuit',
    numberOfItems: allItems.length,
    itemListElement: allItems.slice(0, 10).map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.title,
      url: `https://inovex.ro/invata-gratuit/${item.type === 'articol' ? 'articole' : item.type === 'resursa' ? 'resurse' : item.type === 'tool' ? 'tool-uri' : 'video'}/${item.slug}`,
    })),
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Acasa', item: 'https://inovex.ro' },
      { '@type': 'ListItem', position: 2, name: 'Invata Gratuit', item: 'https://inovex.ro/invata-gratuit' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* HERO */}
      <section className="bg-white border-b border-[#E8ECF0] pt-[120px] pb-16 max-md:pt-20 max-md:pb-12">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="flex items-center gap-1 text-sm mb-8">
            <Link href="/" className="text-[#4A5568] hover:text-[#0D1117] transition-colors">Acasa</Link>
            <ChevronRight size={14} className="text-[#8A94A6]" />
            <span className="text-[#0D1117] font-semibold">Invata Gratuit</span>
          </nav>

          <div className="max-w-[680px] mx-auto text-center">
            <Badge className="mb-5 inline-flex items-center gap-1.5 bg-[#EAF5FF] text-[#2B8FCC] border border-[#C8E6F8]">
              <BookOpen size={13} />
              Resurse educationale
            </Badge>

            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                lineHeight: 1.08,
                letterSpacing: '-0.022em',
                color: '#0D1117',
              }}
              className="mb-4"
            >
              Invata tot ce ai nevoie{' '}
              <span style={{ fontStyle: 'italic', color: '#2B8FCC' }}>gratuit</span>
            </h1>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.0625rem',
                lineHeight: 1.75,
                color: '#4A5568',
              }}
              className="mb-8"
            >
              Articole, ghiduri PDF descarcabile, tool-uri interactive si video-uri
              pentru a-ti construi prezenta online cu succes.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-[540px] mx-auto">
              {[
                { icon: BookOpen, label: 'Articole',   count: stats.articole,  color: '#2B8FCC' },
                { icon: Download, label: 'Resurse',    count: stats.resurse,   color: '#10B981' },
                { icon: Wrench,   label: 'Tool-uri',   count: stats.tooluri,   color: '#8B5CF6' },
                { icon: Play,     label: 'Video-uri',  count: stats.video,     color: '#EF4444' },
              ].map(({ icon: Icon, label, count, color }) => (
                <div
                  key={label}
                  className="bg-[#F8FAFB] border border-[#E8ECF0] rounded-xl p-4 text-center"
                >
                  <Icon size={20} style={{ color, margin: '0 auto 6px' }} />
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: '1.5rem',
                      color: '#0D1117',
                    }}
                  >
                    {count}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#8A94A6' }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      {featured.length > 0 && (
        <section className="bg-white border-b border-[#E8ECF0] py-12">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1.375rem',
                color: '#0D1117',
                marginBottom: 24,
              }}
            >
              Recomandate
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((item) => (
                <ContentCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CONTENT HUB */}
      <Suspense fallback={<div className="py-20 text-center text-[#8A94A6]" style={{ fontFamily: 'var(--font-body)' }}>Se incarca...</div>}>
        <ContentHub
          initialItems={allItems}
          categories={categories}
          stats={stats}
        />
      </Suspense>
    </>
  )
}
