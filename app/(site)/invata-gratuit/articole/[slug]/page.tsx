import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, Clock, Eye, Calendar, ChevronLeft, Tag } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { ArticleRenderer } from '@/components/learn/ArticleRenderer'
import { TableOfContents } from '@/components/learn/TableOfContents'
import { ShareButtons } from '@/components/learn/ShareButtons'
import { CommentSection } from '@/components/learn/CommentSection'
import { ContentCard } from '@/components/learn/ContentCard'
import { ReadingProgress } from '@/components/learn/ReadingProgress'
import { ViewCounter } from '@/components/learn/ViewCounter'
import {
  getLearnContent,
  getLearnContentBySlug,
  getRelatedContent,
  getPrevNextContent,
  getApprovedComments,
} from '@/lib/learn-data'
import { supabase } from '@/lib/supabase'

export const revalidate = 0

const fmt = new Intl.DateTimeFormat('ro-RO', { day: 'numeric', month: 'short', year: 'numeric' })

function formatDate(d: string | null): string {
  if (!d) return ''
  try { return fmt.format(new Date(d)) } catch { return '' }
}

export async function generateStaticParams() {
  const { data } = await supabase
    .from('learn_content')
    .select('slug')
    .eq('type', 'articol')
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
    alternates: { canonical: `https://inovex.ro/invata-gratuit/articole/${slug}` },
    openGraph: {
      type: 'article',
      title: content.seo_title ?? content.title,
      description: content.seo_description ?? content.excerpt ?? undefined,
      url: `https://inovex.ro/invata-gratuit/articole/${slug}`,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      publishedTime: content.published_at ?? content.created_at,
      modifiedTime: content.updated_at,
    },
    twitter: {
      card: 'summary_large_image',
      title: content.seo_title ?? content.title,
      description: content.seo_description ?? content.excerpt ?? undefined,
      images: [ogImage],
    },
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const content = await getLearnContentBySlug(slug)

  if (!content || content.status !== 'published' || content.type !== 'articol') {
    notFound()
  }

  const [related, prevNext, comments] = await Promise.all([
    content.category_id
      ? getRelatedContent(content.id, content.category_id, 3)
      : Promise.resolve([]),
    content.category_id
      ? getPrevNextContent(content.id, content.category_id)
      : Promise.resolve({ prev: null, next: null }),
    content.allow_comments ? getApprovedComments(content.id) : Promise.resolve([]),
  ])

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: content.title,
    description: content.excerpt ?? undefined,
    image: content.featured_image_url ?? undefined,
    datePublished: content.published_at ?? content.created_at,
    dateModified: content.updated_at,
    author: { '@type': 'Organization', name: 'Inovex', url: 'https://inovex.ro' },
    publisher: { '@type': 'Organization', name: 'Inovex', url: 'https://inovex.ro' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://inovex.ro/invata-gratuit/articole/${slug}` },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Acasa', item: 'https://inovex.ro' },
      { '@type': 'ListItem', position: 2, name: 'Invata Gratuit', item: 'https://inovex.ro/invata-gratuit' },
      { '@type': 'ListItem', position: 3, name: 'Articole', item: 'https://inovex.ro/invata-gratuit/articole' },
      { '@type': 'ListItem', position: 4, name: content.title, item: `https://inovex.ro/invata-gratuit/articole/${slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <ReadingProgress />
      <ViewCounter contentId={content.id} />

      {/* HEADER */}
      <section className="bg-white border-b border-[#E8ECF0] pt-[120px] pb-10 max-md:pt-20 max-md:pb-8">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="flex items-center gap-1 text-sm mb-6 flex-wrap">
            <Link href="/" className="text-[#4A5568] hover:text-[#0D1117] transition-colors">Acasa</Link>
            <ChevronRight size={14} className="text-[#8A94A6]" />
            <Link href="/invata-gratuit" className="text-[#4A5568] hover:text-[#0D1117] transition-colors">Invata Gratuit</Link>
            <ChevronRight size={14} className="text-[#8A94A6]" />
            <span className="text-[#0D1117] font-semibold truncate max-w-[240px]">{content.title}</span>
          </nav>

          {/* Badges */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <Badge className="bg-white text-[#374151] border border-[#E8ECF0]">Articol</Badge>
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
            {content.difficulty && (
              <Badge variant="outline">
                {content.difficulty.charAt(0).toUpperCase() + content.difficulty.slice(1)}
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
              maxWidth: 800,
            }}
            className="mb-5"
          >
            {content.title}
          </h1>

          {/* Meta row */}
          <div className="flex items-center gap-4 flex-wrap mb-6">
            {content.published_at && (
              <span className="flex items-center gap-1.5 text-[#8A94A6] text-[13px]">
                <Calendar size={13} />
                {formatDate(content.published_at)}
              </span>
            )}
            {content.read_time && (
              <span className="flex items-center gap-1.5 text-[#8A94A6] text-[13px]">
                <Clock size={13} />
                {content.read_time} min citire
              </span>
            )}
            <span className="flex items-center gap-1.5 text-[#8A94A6] text-[13px]">
              <Eye size={13} />
              {content.views.toLocaleString('ro-RO')} vizualizari
            </span>
          </div>

          <ShareButtons
            title={content.title}
            url={`https://inovex.ro/invata-gratuit/articole/${slug}`}
          />
        </div>
      </section>

      {/* Featured image */}
      {content.featured_image_url && (
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 -mb-6 relative" style={{ zIndex: 1 }}>
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ paddingTop: '40%' }}>
            <Image
              src={content.featured_image_url}
              alt={content.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        </div>
      )}

      {/* CONTENT */}
      <section className="bg-[#F8FAFB] py-14">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_320px] gap-10 items-start">

            {/* Article column */}
            <div>
              <TableOfContents content={content.content} />
              <div
                className="bg-white border border-[#E8ECF0] rounded-2xl p-8 md:p-10"
                style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}
              >
                <ArticleRenderer content={content.content} />
              </div>

              {/* Tags */}
              {content.tags.length > 0 && (
                <div className="flex items-center gap-2 mt-6 flex-wrap">
                  <Tag size={14} className="text-[#8A94A6]" />
                  {content.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.8125rem',
                        padding: '3px 10px',
                        borderRadius: 999,
                        background: '#F0F4F8',
                        color: '#4A5568',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Share */}
              <div className="mt-6">
                <ShareButtons
                  title={content.title}
                  url={`https://inovex.ro/invata-gratuit/articole/${slug}`}
                />
              </div>

              {/* Prev / Next */}
              {(prevNext.prev || prevNext.next) && (
                <div className="grid sm:grid-cols-2 gap-4 mt-8">
                  {prevNext.prev && (
                    <Link
                      href={`/invata-gratuit/articole/${prevNext.prev.slug}`}
                      className="flex items-center gap-3 p-4 bg-white border border-[#E8ECF0] rounded-xl no-underline group hover:border-[#2B8FCC] transition-colors"
                    >
                      <ChevronLeft size={18} className="text-[#2B8FCC] shrink-0" />
                      <div>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#8A94A6', marginBottom: 2 }}>
                          Articolul anterior
                        </p>
                        <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem', color: '#0D1117', lineClamp: 2 }}>
                          {prevNext.prev.title}
                        </p>
                      </div>
                    </Link>
                  )}
                  {prevNext.next && (
                    <Link
                      href={`/invata-gratuit/articole/${prevNext.next.slug}`}
                      className="flex items-center gap-3 p-4 bg-white border border-[#E8ECF0] rounded-xl no-underline group hover:border-[#2B8FCC] transition-colors sm:ml-auto"
                    >
                      <div className="text-right flex-1">
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#8A94A6', marginBottom: 2 }}>
                          Articolul urmator
                        </p>
                        <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem', color: '#0D1117' }}>
                          {prevNext.next.title}
                        </p>
                      </div>
                      <ChevronRight size={18} className="text-[#2B8FCC] shrink-0" />
                    </Link>
                  )}
                </div>
              )}

              {/* Comments */}
              {content.allow_comments && (
                <CommentSection contentId={content.id} initialComments={comments} />
              )}
            </div>

            {/* Sidebar */}
            <aside className="sticky top-28 flex flex-col gap-4">
              {/* Author widget */}
              <div className="bg-white border border-[#E8ECF0] rounded-2xl p-5" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                    style={{ background: '#2B8FCC' }}
                  >
                    I
                  </div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9375rem', color: '#0D1117' }}>
                      Echipa Inovex
                    </p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#8A94A6' }}>
                      Experti web & e-commerce
                    </p>
                  </div>
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#4A5568', lineHeight: 1.7 }}>
                  Peste 10 ani de experienta in dezvoltare web si strategii digitale pentru afaceri din Romania.
                </p>
              </div>

              {/* CTA widget */}
              <div
                style={{
                  background: 'linear-gradient(135deg, #EAF5FF 0%, #F0FAFB 100%)',
                  border: '1px solid #C8E6F8',
                  borderRadius: 16,
                  padding: 20,
                }}
              >
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: '#0D1117', marginBottom: 8 }}>
                  Ai nevoie de un site profesional?
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#4A5568', lineHeight: 1.7, marginBottom: 14 }}>
                  Construim magazine online si website-uri de prezentare optimizate pentru conversii.
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
                  Discuta cu noi
                </Link>
              </div>

              {/* Related articles */}
              {related.length > 0 && (
                <div>
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9375rem', color: '#0D1117', marginBottom: 12 }}>
                    Articole similare
                  </p>
                  <div className="flex flex-col gap-3">
                    {related.map((item) => (
                      <Link
                        key={item.id}
                        href={`/invata-gratuit/articole/${item.slug}`}
                        className="flex gap-3 p-3 bg-white border border-[#E8ECF0] rounded-xl no-underline hover:border-[#2B8FCC] transition-colors"
                      >
                        <div>
                          <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem', color: '#0D1117', lineHeight: 1.4, marginBottom: 4 }}>
                            {item.title}
                          </p>
                          {item.read_time && (
                            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#8A94A6' }}>
                              {item.read_time} min citire
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* Related articles at bottom */}
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
