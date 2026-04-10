'use client'

import type { ReactNode } from 'react'

interface Block {
  type: string
  [key: string]: unknown
}

interface ArticleRendererProps {
  content: Record<string, unknown> | null
}

function renderBlock(block: Block, idx: number): ReactNode {
  switch (block.type) {
    case 'callout':
      return (
        <div
          key={idx}
          style={{
            background: '#EAF5FF',
            border: '1px solid #C8E6F8',
            borderLeft: '4px solid #2B8FCC',
            borderRadius: 8,
            padding: '14px 16px',
            marginBottom: 16,
            fontFamily: 'var(--font-body)',
            fontSize: '0.9375rem',
            color: '#1A365D',
            lineHeight: 1.7,
          }}
        >
          {String(block.text ?? '')}
        </div>
      )
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
