'use client'

import { useMemo, useState } from 'react'
import { List, ChevronDown, ChevronUp } from 'lucide-react'

interface TocItem {
  id: string
  text: string
  level: 2 | 3
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

function extractFromHtml(html: string): TocItem[] {
  const items: TocItem[] = []
  const regex = /<h([23])[^>]*>([\s\S]*?)<\/h[23]>/gi
  let match
  while ((match = regex.exec(html)) !== null) {
    const level = parseInt(match[1], 10) as 2 | 3
    const text = match[2].replace(/<[^>]+>/g, '').trim()
    if (text) {
      items.push({ id: slugify(text), text, level })
    }
  }
  return items
}

interface Block {
  type: string
  text?: string
  level?: number
}

function extractFromBlocks(blocks: Block[]): TocItem[] {
  return blocks
    .filter((b) => b.type === 'heading' && (b.level === 2 || b.level === 3))
    .map((b) => ({
      id: slugify(String(b.text ?? '')),
      text: String(b.text ?? ''),
      level: (b.level as 2 | 3) ?? 2,
    }))
    .filter((item) => item.text)
}

function handleTocClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
  e.preventDefault()
  const el = document.getElementById(id)
  if (el) {
    const offset = 88
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

export function TableOfContents({ content }: { content: Record<string, unknown> | null }) {
  const [collapsed, setCollapsed] = useState(false)

  const items = useMemo<TocItem[]>(() => {
    if (!content) return []
    if (typeof content.html === 'string') return extractFromHtml(content.html)
    if (Array.isArray(content.blocks)) return extractFromBlocks(content.blocks as Block[])
    return []
  }, [content])

  if (items.length < 2) return null

  return (
    <div
      style={{
        background: '#F8FAFB',
        border: '1px solid #E8ECF0',
        borderRadius: 12,
        marginBottom: 24,
        overflow: 'hidden',
      }}
    >
      <button
        onClick={() => setCollapsed((c) => !c)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          width: '100%',
          padding: '12px 16px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '0.9rem',
          color: '#0D1117',
          textAlign: 'left',
        }}
      >
        <List size={15} className="text-[#2B8FCC]" />
        Cuprins
        <span style={{ marginLeft: 'auto' }}>
          {collapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
        </span>
      </button>

      {!collapsed && (
        <div style={{ padding: '0 16px 14px' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {items.map((item) => (
              <li
                key={item.id}
                style={{
                  paddingLeft: item.level === 3 ? 20 : 0,
                  marginBottom: 6,
                }}
              >
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleTocClick(e, item.id)}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: item.level === 3 ? '0.8125rem' : '0.875rem',
                    fontWeight: item.level === 2 ? 600 : 400,
                    color: '#4A5568',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    transition: 'color 150ms ease',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#2B8FCC' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#4A5568' }}
                >
                  <span style={{ color: '#CBD5E1' }}>{item.level === 2 ? '#' : '-'}</span>
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
