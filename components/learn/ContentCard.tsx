'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { LearnContent } from '@/types/learn'
import { Play, Clock, Download, Wrench, BookOpen, ChevronRight } from 'lucide-react'

const fmt = new Intl.DateTimeFormat('ro-RO', { day: 'numeric', month: 'short', year: 'numeric' })

function formatDate(dateStr: string | null): string {
  if (!dateStr) return ''
  try { return fmt.format(new Date(dateStr)) } catch { return '' }
}

function getUrl(item: LearnContent): string {
  switch (item.type) {
    case 'articol': return `/invata-gratuit/articole/${item.slug}`
    case 'resursa': return `/invata-gratuit/resurse/${item.slug}`
    case 'tool':    return `/invata-gratuit/tool-uri/${item.slug}`
    case 'video':   return `/invata-gratuit/video/${item.slug}`
  }
}

const TYPE_BADGE: Record<string, { label: string; bg: string; color: string }> = {
  articol: { label: 'Articol',  bg: '#fff',    color: '#374151' },
  resursa: { label: 'Resursa',  bg: '#2B8FCC', color: '#fff'    },
  tool:    { label: 'Tool',     bg: '#8B5CF6', color: '#fff'    },
  video:   { label: 'Video',    bg: '#EF4444', color: '#fff'    },
}

const DIFFICULTY_LABEL: Record<string, string> = {
  incepator:   'Incepator',
  intermediar: 'Intermediar',
  avansat:     'Avansat',
}

function TypeBadge({ type }: { type: LearnContent['type'] }) {
  const conf = TYPE_BADGE[type]
  return (
    <span
      style={{
        background: conf.bg,
        color: conf.color,
        border: conf.bg === '#fff' ? '1px solid #E2E8F0' : 'none',
        fontFamily: 'var(--font-body)',
        fontWeight: 700,
        fontSize: '0.65rem',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        padding: '3px 8px',
        borderRadius: 4,
      }}
    >
      {conf.label}
    </span>
  )
}

function MetaInfo({ item }: { item: LearnContent }) {
  if (item.type === 'articol' && item.read_time) {
    return (
      <span className="flex items-center gap-1 text-[#8A94A6] text-[12px]">
        <Clock size={12} /> {item.read_time} min citire
      </span>
    )
  }
  if (item.type === 'resursa') {
    return (
      <span className="flex items-center gap-1 text-[#8A94A6] text-[12px]">
        <Download size={12} /> Descarcare gratuita
      </span>
    )
  }
  if (item.type === 'tool') {
    return (
      <span className="flex items-center gap-1 text-[#8A94A6] text-[12px]">
        <Wrench size={12} /> Tool interactiv
      </span>
    )
  }
  if (item.type === 'video' && item.video_duration) {
    return (
      <span className="flex items-center gap-1 text-[#8A94A6] text-[12px]">
        <Play size={12} /> {item.video_duration}
      </span>
    )
  }
  return null
}

function CtaLabel({ type }: { type: LearnContent['type'] }) {
  switch (type) {
    case 'articol': return 'Citeste articolul'
    case 'resursa': return 'Descarca gratuit'
    case 'tool':    return 'Deschide tool-ul'
    case 'video':   return 'Vizualizeaza'
  }
}

export function ContentCard({ item }: { item: LearnContent }) {
  const url = getUrl(item)

  return (
    <Link
      href={url}
      className="group flex flex-col bg-white border border-[#E8ECF0] rounded-2xl overflow-hidden no-underline"
      style={{
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        transition: 'transform 200ms ease, box-shadow 200ms ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.transform = 'translateY(-4px)'
        el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)'
      }}
    >
      {/* Image area 16:9 */}
      <div className="relative w-full overflow-hidden" style={{ paddingTop: '56.25%' }}>
        {item.featured_image_url ? (
          <Image
            src={item.featured_image_url}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: item.type === 'articol'
                ? 'linear-gradient(135deg, #EAF5FF 0%, #C8E6F8 100%)'
                : item.type === 'resursa'
                ? 'linear-gradient(135deg, #EFF6FF 0%, #BFDBFE 100%)'
                : item.type === 'tool'
                ? 'linear-gradient(135deg, #F5F3FF 0%, #DDD6FE 100%)'
                : 'linear-gradient(135deg, #FFF1F2 0%, #FECDD3 100%)',
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <BookOpen size={32} className="text-[#CBD5E1]" />
            </div>
          </div>
        )}

        {/* Overlay badges */}
        <div className="absolute top-3 left-3">
          <TypeBadge type={item.type} />
        </div>

        {item.difficulty && (
          <div className="absolute top-3 right-3">
            <span
              style={{
                background: 'rgba(0,0,0,0.6)',
                color: '#fff',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '0.6rem',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                padding: '3px 7px',
                borderRadius: 4,
              }}
            >
              {DIFFICULTY_LABEL[item.difficulty] ?? item.difficulty}
            </span>
          </div>
        )}

        {/* Video play overlay */}
        {item.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(239,68,68,0.9)' }}
            >
              <Play size={20} fill="white" className="text-white ml-0.5" />
            </div>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        {/* Category + meta */}
        <div className="flex items-center justify-between mb-3 gap-2">
          {item.category && (
            <span
              className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={{
                background: `${item.category.color}1a`,
                color: item.category.color,
              }}
            >
              {item.category.name}
            </span>
          )}
          <MetaInfo item={item} />
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: '1rem',
            lineHeight: 1.3,
            color: '#0D1117',
            marginBottom: 8,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {item.title}
        </h3>

        {/* Excerpt */}
        {item.excerpt && (
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              color: '#4A5568',
              lineHeight: 1.6,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              marginBottom: 0,
            }}
          >
            {item.excerpt}
          </p>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Separator */}
        <div className="border-t border-[#F0F4F8] mt-4 pt-4 flex items-center justify-between">
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#8A94A6' }}>
            {formatDate(item.published_at)}
          </span>
          <span
            className="flex items-center gap-1"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.8125rem', color: '#2B8FCC' }}
          >
            <CtaLabel type={item.type} />
            <ChevronRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  )
}
