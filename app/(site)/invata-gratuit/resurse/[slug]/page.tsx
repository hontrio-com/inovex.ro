import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, Check, Eye, Download } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DownloadGate } from '@/components/learn/DownloadGate'
import { ArticleRenderer } from '@/components/learn/ArticleRenderer'
import { ViewCounter } from '@/components/learn/ViewCounter'
import { getLearnContentBySlug } from '@/lib/learn-data'
import { supabase } from '@/lib/supabase'

export const revalidate = 0

export async function generateStaticParams() {
  const { data } = await supabase
    .from('learn_content')
    .select('slug')
    .eq('type', 'resursa')
    .eq('status', 'published')
  return (data ?? []).map((row: { slug: string }) => ({ slug: row.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const content = await getLearnContentBySlug(slug)
  if (!content) return {}
  const ogImage = content.featured_image_url ?? 'https://inovex.ro/images/og/inovex-og.jpg'
  return {
    title: content.seo_title ?? content.title,
    description: content.seo_description ?? content.excerpt ?? undefined,
    alternates: { canonical: `https://inovex.ro/invata-gratuit/resurse/${slug}` },
    openGraph: {
      title: content.seo_title ?? content.title,
      description: content.seo_description ?? content.excerpt ?? undefined,
      url: `https://inovex.ro/invata-gratuit/resurse/${slug}`,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: content.seo_title ?? content.title,
      description: content.seo_description ?? content.excerpt ?? undefined,
      images: [ogImage],
    },
  }
}

export default async function ResursaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const content = await getLearnContentBySlug(slug)

  if (!content || content.status !== 'published' || content.type !== 'resursa') {
    notFound()
  }

  return (
    <>
      <ViewCounter contentId={content.id} />

      {/* HEADER */}
      <section className="bg-white border-b border-[#E8ECF0] pt-[120px] pb-10 max-md:pt-20 max-md:pb-8">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="breadcrumb" className="flex items-center gap-1 text-sm mb-6 flex-wrap">
            <Link href="/" className="text-[#4A5568] hover:text-[#0D1117] transition-colors">Acasa</Link>
            <ChevronRight size={14} className="text-[#8A94A6]" />
            <Link href="/invata-gratuit" className="text-[#4A5568] hover:text-[#0D1117] transition-colors">Invata Gratuit</Link>
            <ChevronRight size={14} className="text-[#8A94A6]" />
            <span className="text-[#0D1117] font-semibold truncate max-w-[240px]">{content.title}</span>
          </nav>

          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <Badge className="bg-[#EAF5FF] text-[#2B8FCC] border border-[#C8E6F8]">Resursa Gratuita</Badge>
            {content.category && (
              <Badge
                style={{
                  background: `${content.category.color}1a`,
                  color: content.category.color,
                  border: `1px solid ${content.category.color}33`,
                }}
              >
                {content.category.name}
              </Badge>
            )}
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)',
              lineHeight: 1.12,
              letterSpacing: '-0.018em',
              color: '#0D1117',
              maxWidth: 720,
            }}
          >
            {content.title}
          </h1>

          {content.excerpt && (
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.0625rem',
                lineHeight: 1.75,
                color: '#4A5568',
                maxWidth: 600,
                marginTop: 12,
              }}
            >
              {content.excerpt}
            </p>
          )}

          <div className="flex items-center gap-4 mt-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-[#8A94A6] text-[13px]">
              <Download size={13} />
              {content.downloads.toLocaleString('ro-RO')} descarcari
            </span>
            <span className="flex items-center gap-1.5 text-[#8A94A6] text-[13px]">
              <Eye size={13} />
              {content.views.toLocaleString('ro-RO')} vizualizari
            </span>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="bg-[#F8FAFB] py-14">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_380px] gap-10 items-start">

            {/* Left column */}
            <div className="flex flex-col gap-6">
              {/* Featured image */}
              {content.featured_image_url && (
                <div className="relative w-full rounded-2xl overflow-hidden" style={{ paddingTop: '56.25%' }}>
                  <Image
                    src={content.featured_image_url}
                    alt={content.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1200px) 100vw, 720px"
                  />
                </div>
              )}

              {/* Benefits */}
              {content.resource_benefits.length > 0 && (
                <div className="bg-white border border-[#E8ECF0] rounded-2xl p-6" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: '#0D1117', marginBottom: 14 }}>
                    Ce vei gasi in aceasta resursa
                  </p>
                  <ul className="space-y-2.5">
                    {content.resource_benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-[#ECFDF5] flex items-center justify-center shrink-0 mt-0.5">
                          <Check size={11} className="text-[#10B981]" />
                        </div>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#374151', lineHeight: 1.6 }}>
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Description / Content */}
              {content.resource_description && (
                <div className="bg-white border border-[#E8ECF0] rounded-2xl p-6 md:p-8" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                  <ArticleRenderer content={{ html: content.resource_description }} />
                </div>
              )}

              {content.content && (
                <div className="bg-white border border-[#E8ECF0] rounded-2xl p-6 md:p-8" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                  <ArticleRenderer content={content.content} />
                </div>
              )}

              {/* Preview images */}
              {content.resource_preview_urls.length > 0 && (
                <div>
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: '#0D1117', marginBottom: 12 }}>
                    Previzualizare
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {content.resource_preview_urls.map((url, i) => (
                      <div key={i} className="relative rounded-xl overflow-hidden border border-[#E8ECF0]" style={{ paddingTop: '75%' }}>
                        <Image
                          src={url}
                          alt={`Preview ${i + 1}`}
                          fill
                          className="object-cover"
                          sizes="200px"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right column - Download gate */}
            <aside className="sticky top-28">
              {content.requires_email ? (
                <DownloadGate contentId={content.id} downloads={content.downloads} />
              ) : content.resource_file_url ? (
                <div className="bg-white border border-[#E8ECF0] rounded-2xl p-6" style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.0625rem', color: '#0D1117', marginBottom: 12 }}>
                    Descarca gratuit
                  </p>
                  {content.downloads > 0 && (
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: '#8A94A6', marginBottom: 16 }}>
                      {content.downloads.toLocaleString('ro-RO')} descarcari
                    </p>
                  )}
                  <Button
                    href={content.resource_file_url}
                    leftIcon={<Download size={15} />}
                    className="w-full"
                    style={{ background: '#2B8FCC', height: 44, fontFamily: 'var(--font-body)' }}
                  >
                    Descarca acum
                  </Button>
                </div>
              ) : null}
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
