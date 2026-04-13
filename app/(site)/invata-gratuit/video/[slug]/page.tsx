import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Play, Clock, Eye } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { ContentCard } from '@/components/learn/ContentCard'
import { ViewCounter } from '@/components/learn/ViewCounter'
import { ArticleRenderer } from '@/components/learn/ArticleRenderer'
import { getLearnContentBySlug, getRelatedContent } from '@/lib/learn-data'
import { supabase } from '@/lib/supabase'

export const revalidate = 0

export async function generateStaticParams() {
  const { data } = await supabase
    .from('learn_content')
    .select('slug')
    .eq('type', 'video')
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
    alternates: { canonical: `https://inovex.ro/invata-gratuit/video/${slug}` },
    openGraph: {
      type: 'video.other',
      title: content.seo_title ?? content.title,
      description: content.seo_description ?? content.excerpt ?? undefined,
      url: `https://inovex.ro/invata-gratuit/video/${slug}`,
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

function extractYouTubeId(url: string - null): string - null {
  if (!url) return null
  // watch?v= format
  const watchMatch = url.match(/[?&]v=([^&]+)/)
  if (watchMatch) return watchMatch[1]
  // youtu.be/ format
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/)
  if (shortMatch) return shortMatch[1]
  // embed format
  const embedMatch = url.match(/embed\/([^?&]+)/)
  if (embedMatch) return embedMatch[1]
  return null
}

export default async function VideoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const content = await getLearnContentBySlug(slug)

  if (!content || content.status !== 'published' || content.type !== 'video') {
    notFound()
  }

  const videoId = extractYouTubeId(content.youtube_url)
  const related = content.category_id
    ? await getRelatedContent(content.id, content.category_id, 3)
    : []

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

          <div className="flex items-center gap-2 mb-4">
            <Badge className="flex items-center gap-1.5 bg-[#FFF1F2] text-[#EF4444] border border-[#FECDD3]">
              <Play size={12} fill="currentColor" />
              Video
            </Badge>
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
            {content.video_duration && (
              <span className="flex items-center gap-1.5 text-[#8A94A6] text-[13px]">
                <Clock size={13} />
                {content.video_duration}
              </span>
            )}
            <span className="flex items-center gap-1.5 text-[#8A94A6] text-[13px]">
              <Eye size={13} />
              {content.views.toLocaleString('ro-RO')} vizualizari
            </span>
          </div>
        </div>
      </section>

      {/* VIDEO + CONTENT */}
      <section className="bg-[#F8FAFB] py-14">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_320px] gap-10 items-start">

            {/* Video + description */}
            <div className="flex flex-col gap-6">
              {/* YouTube embed */}
              {videoId ? (
                <div
                  className="relative w-full rounded-2xl overflow-hidden"
                  style={{ paddingTop: '56.25%', background: '#000' }}
                >
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                    title={content.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 'none',
                    }}
                  />
                </div>
              ) : content.youtube_url ? (
                <div
                  className="flex items-center justify-center bg-[#0D1117] rounded-2xl"
                  style={{ aspectRatio: '16/9' }}
                >
                  <p style={{ fontFamily: 'var(--font-body)', color: '#64748B' }}>
                    Video indisponibil
                  </p>
                </div>
              ) : null}

              {/* Article content below video */}
              {content.content && (
                <div className="bg-white border border-[#E8ECF0] rounded-2xl p-6 md:p-8" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                  <ArticleRenderer content={content.content} />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="sticky top-28 flex flex-col gap-4">
              {/* Related articles */}
              {related.length > 0 && (
                <div>
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9375rem', color: '#0D1117', marginBottom: 12 }}>
                    Video-uri similare
                  </p>
                  <div className="flex flex-col gap-3">
                    {related.map((item) => (
                      <Link
                        key={item.id}
                        href={`/invata-gratuit/video/${item.slug}`}
                        className="flex gap-3 p-3 bg-white border border-[#E8ECF0] rounded-xl no-underline hover:border-[#EF4444] transition-colors"
                      >
                        <div>
                          <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem', color: '#0D1117', lineHeight: 1.4, marginBottom: 4 }}>
                            {item.title}
                          </p>
                          {item.video_duration && (
                            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#8A94A6' }}>
                              {item.video_duration}
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div
                style={{
                  background: 'linear-gradient(135deg, #EAF5FF 0%, #F0FAFB 100%)',
                  border: '1px solid #C8E6F8',
                  borderRadius: 16,
                  padding: 20,
                }}
              >
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: '#0D1117', marginBottom: 8 }}>
                  Ai nevoie de ajutor?
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#4A5568', lineHeight: 1.7, marginBottom: 14 }}>
                  Echipa Inovex este disponibila pentru consultanta si implementare.
                </p>
                <Link
                  href="/contact"
                  style={{
                    display: 'inline-block',
                    background: '#2B8FCC',
                    color: '#fff',
                    padding: '10px 18px',
                    borderRadius: 8,
                    fontFamily: 'var(--font-body)',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    textDecoration: 'none',
                  }}
                >
                  Contacteaza-ne
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related at bottom */}
      {related.length > 0 && (
        <section className="bg-white border-t border-[#E8ECF0] py-12">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.375rem', color: '#0D1117', marginBottom: 24 }}>
              Poate te intereseaza si
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((item) => (
                <ContentCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
