'use client'

import type { ReactNode } from 'react'

interface Block {
  type: string
  [key: string]: unknown
}

interface ArticleRendererProps {
  content: Record<string, unknown> | null
}

function extractYoutubeId(url: string): string {
  const m = url.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/)
  return m?.[1] ?? ''
}

function renderBlock(block: Block, idx: number): ReactNode {
  switch (block.type) {

    case 'heading': {
      const level = Number(block.level ?? 2)
      const sizes: Record<number, string> = { 2: '1.5rem', 3: '1.25rem', 4: '1.0625rem' }
      const Tag = `h${level}` as 'h2' | 'h3' | 'h4'
      return (
        <Tag key={idx} style={{
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: sizes[level] ?? '1.25rem', color: '#0D1117',
          marginTop: 32, marginBottom: 12, lineHeight: 1.25, letterSpacing: '-0.02em',
        }}>
          {String(block.text ?? '')}
        </Tag>
      )
    }

    case 'paragraph':
      return (
        <p key={idx}
          style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.8, color: '#2D3748', marginBottom: 16 }}
          dangerouslySetInnerHTML={{ __html: String(block.text ?? '') }}
        />
      )

    case 'image':
      return (
        <figure key={idx} style={{ marginBottom: 24, textAlign: 'center' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={String(block.url ?? '')} alt={String(block.alt ?? block.caption ?? '')}
            style={{ maxWidth: '100%', borderRadius: 10, border: '1px solid #E8ECF0' }} />
          {block.caption != null && (
            <figcaption style={{ fontFamily: 'var(--font-body)', fontSize: '0.825rem', color: '#8A94A6', marginTop: 8 }}>
              {String(block.caption)}
            </figcaption>
          )}
        </figure>
      )

    case 'list': {
      const items = Array.isArray(block.items) ? (block.items as string[]) : []
      const Tag = block.ordered ? 'ol' : 'ul'
      return (
        <Tag key={idx} style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.8, color: '#2D3748', marginBottom: 16, paddingLeft: 24 }}>
          {items.map((item, i) => <li key={i} style={{ marginBottom: 4 }} dangerouslySetInnerHTML={{ __html: item }} />)}
        </Tag>
      )
    }

    case 'quote':
      return (
        <blockquote key={idx} style={{
          borderLeft: '4px solid #2B8FCC', margin: '24px 0', padding: '12px 20px',
          background: '#F0F7FF', borderRadius: '0 8px 8px 0',
        }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.0625rem', fontStyle: 'italic', color: '#1A365D', marginBottom: block.author ? 8 : 0, lineHeight: 1.7 }}>
            {String(block.text ?? '')}
          </p>
          {block.author != null && (
            <cite style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 600, color: '#2B8FCC', fontStyle: 'normal' }}>
              — {String(block.author)}
            </cite>
          )}
        </blockquote>
      )

    case 'separator':
      return <hr key={idx} style={{ border: 'none', borderTop: '1px solid #E8ECF0', margin: '32px 0' }} />

    case 'youtubeEmbed': {
      const videoId = extractYoutubeId(String(block.url ?? ''))
      if (!videoId) return null
      return (
        <figure key={idx} style={{ marginBottom: 24 }}>
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, borderRadius: 10, overflow: 'hidden', border: '1px solid #E8ECF0' }}>
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={String(block.caption ?? 'Video')}
            />
          </div>
          {block.caption != null && (
            <figcaption style={{ fontFamily: 'var(--font-body)', fontSize: '0.825rem', color: '#8A94A6', marginTop: 8, textAlign: 'center' }}>
              {String(block.caption)}
            </figcaption>
          )}
        </figure>
      )
    }

    case 'callout': {
      const CALLOUT_STYLES: Record<string, { bg: string; border: string; accent: string; color: string; prefix: string }> = {
        info:    { bg: '#EAF5FF', border: '#C8E6F8', accent: '#2B8FCC', color: '#1A365D', prefix: '💡 ' },
        warning: { bg: '#FFFBEB', border: '#FDE68A', accent: '#F59E0B', color: '#78350F', prefix: '⚠️ ' },
        success: { bg: '#F0FDF4', border: '#BBF7D0', accent: '#10B981', color: '#065F46', prefix: '✅ ' },
        danger:  { bg: '#FEF2F2', border: '#FECACA', accent: '#EF4444', color: '#7F1D1D', prefix: '❌ ' },
      }
      const cs = CALLOUT_STYLES[String(block.variant ?? 'info')] ?? CALLOUT_STYLES.info
      return (
        <div key={idx} style={{
          background: cs.bg, border: `1px solid ${cs.border}`,
          borderLeft: `4px solid ${cs.accent}`, borderRadius: 8,
          padding: '14px 16px', marginBottom: 16,
          fontFamily: 'var(--font-body)', fontSize: '0.9375rem',
          color: cs.color, lineHeight: 1.7,
        }}>
          {cs.prefix}{String(block.text ?? '')}
        </div>
      )
    }
    case 'codeBlock':
      return (
        <pre
          key={idx}
          style={{
            background: '#0D1117',
            color: '#E2E8F0',
            borderRadius: 10,
            padding: '16px 20px',
            overflowX: 'auto',
            fontFamily: 'monospace',
            fontSize: '0.875rem',
            lineHeight: 1.7,
            marginBottom: 16,
          }}
        >
          <code>{String(block.code ?? '')}</code>
        </pre>
      )
    case 'inlineCta':
      return (
        <div
          key={idx}
          style={{
            background: 'linear-gradient(135deg, #EAF5FF 0%, #F0FAFB 100%)',
            border: '1px solid #C8E6F8',
            borderRadius: 12,
            padding: '20px 24px',
            marginBottom: 16,
            textAlign: 'center',
          }}
        >
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.0625rem', color: '#0D1117', marginBottom: 8 }}>
            {String(block.title ?? '')}
          </p>
          <p style={{ fontFamily: 'var(--font-body)', color: '#4A5568', fontSize: '0.9rem', marginBottom: 12 }}>
            {String(block.text ?? '')}
          </p>
          {!!block.url && (
            <a
              href={String(block.url)}
              style={{
                display: 'inline-block',
                background: '#2B8FCC',
                color: '#fff',
                padding: '10px 24px',
                borderRadius: 8,
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                fontSize: '0.9rem',
                textDecoration: 'none',
              }}
            >
              {String(block.buttonText ?? 'Afla mai mult')}
            </a>
          )}
        </div>
      )
    case 'comparisonTable': {
      const rows = Array.isArray(block.rows) ? (block.rows as string[][]) : []
      const headers = Array.isArray(block.headers) ? (block.headers as string[]) : []
      return (
        <div key={idx} style={{ overflowX: 'auto', marginBottom: 16 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-body)', fontSize: '0.9rem' }}>
            {headers.length > 0 && (
              <thead>
                <tr style={{ background: '#F8FAFB' }}>
                  {headers.map((h, hi) => (
                    <th key={hi} style={{ padding: '10px 12px', textAlign: 'left', border: '1px solid #E8ECF0', fontWeight: 700, color: '#0D1117' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} style={{ background: ri % 2 === 0 ? '#fff' : '#FAFBFC' }}>
                  {row.map((cell, ci) => (
                    <td key={ci} style={{ padding: '9px 12px', border: '1px solid #E8ECF0', color: '#4A5568' }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }
    case 'faqBlock': {
      const items = Array.isArray(block.items) ? (block.items as Array<{ q: string; a: string }>) : []
      return (
        <div key={idx} style={{ marginBottom: 16 }}>
          {items.map((item, ii) => (
            <details
              key={ii}
              style={{
                border: '1px solid #E8ECF0',
                borderRadius: 8,
                marginBottom: 8,
                fontFamily: 'var(--font-body)',
              }}
            >
              <summary
                style={{
                  padding: '12px 16px',
                  fontWeight: 600,
                  fontSize: '0.9375rem',
                  color: '#0D1117',
                  cursor: 'pointer',
                  listStyle: 'none',
                }}
              >
                {item.q}
              </summary>
              <div style={{ padding: '0 16px 12px', color: '#4A5568', fontSize: '0.9rem', lineHeight: 1.7 }}>
                {item.a}
              </div>
            </details>
          ))}
        </div>
      )
    }
    case 'statsBlock': {
      const stats = Array.isArray(block.stats) ? (block.stats as Array<{ value: string; label: string }>) : []
      return (
        <div
          key={idx}
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(stats.length, 3)}, 1fr)`,
            gap: 16,
            marginBottom: 16,
          }}
        >
          {stats.map((stat, si) => (
            <div
              key={si}
              style={{
                background: '#EAF5FF',
                borderRadius: 10,
                padding: '16px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.75rem', color: '#2B8FCC' }}>
                {stat.value}
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#4A5568', marginTop: 4 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      )
    }
    case 'imageWithCaption':
      return (
        <figure key={idx} style={{ marginBottom: 16, textAlign: 'center' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={String(block.url ?? '')}
            alt={String(block.caption ?? '')}
            style={{ maxWidth: '100%', borderRadius: 10, border: '1px solid #E8ECF0' }}
          />
          {!!block.caption && (
            <figcaption style={{ fontFamily: 'var(--font-body)', fontSize: '0.825rem', color: '#8A94A6', marginTop: 8 }}>
              {String(block.caption)}
            </figcaption>
          )}
        </figure>
      )
    default:
      return null
  }
}

export function ArticleRenderer({ content }: ArticleRendererProps) {
  if (!content) {
    return null
  }

  // HTML mode
  if (typeof content.html === 'string') {
    return (
      <div
        className="article-prose"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1rem',
          lineHeight: 1.8,
          color: '#2D3748',
        }}
        dangerouslySetInnerHTML={{ __html: content.html }}
      />
    )
  }

  // Blocks mode
  if (Array.isArray(content.blocks)) {
    const blocks = content.blocks as Block[]
    return (
      <div
        className="article-prose"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1rem',
          lineHeight: 1.8,
          color: '#2D3748',
        }}
      >
        {blocks.map((block, idx) => renderBlock(block, idx))}
      </div>
    )
  }

  return null
}
