import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Wrench } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { ToolWrapper } from '@/components/learn/ToolWrapper'
import { ContentCard } from '@/components/learn/ContentCard'
import { ViewCounter } from '@/components/learn/ViewCounter'
import { getLearnContentBySlug, getRelatedContent } from '@/lib/learn-data'
import { supabase } from '@/lib/supabase'

export const revalidate = 0

export async function generateStaticParams() {
  const { data } = await supabase
    .from('learn_content')
    .select('slug')
    .eq('type', 'tool')
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
    alternates: { canonical: `https://inovex.ro/invata-gratuit/tool-uri/${slug}` },
    openGraph: {
      title: content.seo_title ?? content.title,
      description: content.seo_description ?? content.excerpt ?? undefined,
      url: `https://inovex.ro/invata-gratuit/tool-uri/${slug}`,
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

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const content = await getLearnContentBySlug(slug)

  if (!content || content.status !== 'published' || content.type !== 'tool') {
    notFound()
  }

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
            <Badge className="flex items-center gap-1.5 bg-[#F5F3FF] text-[#8B5CF6] border border-[#DDD6FE]">
              <Wrench size={12} />
              Tool Gratuit
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

          {(content.tool_description || content.excerpt) && (
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
              {content.tool_description ?? content.excerpt}
            </p>
          )}
        </div>
      </section>

      {/* TOOL */}
      <section className="bg-[#F8FAFB] py-14">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
          {content.tool_component_key ? (
            <ToolWrapper toolKey={content.tool_component_key} />
          ) : (
            <div
              style={{
                background: '#FFF5F5',
                border: '1px solid #FECACA',
                borderRadius: 12,
                padding: 24,
                fontFamily: 'var(--font-body)',
                color: '#EF4444',
                textAlign: 'center',
              }}
            >
              Tool indisponibil momentan.
            </div>
          )}
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-white border-t border-[#E8ECF0] py-12">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.375rem', color: '#0D1117', marginBottom: 24 }}>
              Resurse similare
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
