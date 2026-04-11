'use client'

import { useState, useRef } from 'react'
import { Plus, Trash2, ChevronUp, ChevronDown, X, Upload, Bold, Italic, Link2 } from 'lucide-react'

/* ─── Types ─────────────────────────────────────────────── */
export type Block = { type: string; [key: string]: unknown }
export type BlockContent = { blocks: Block[] }

interface Props {
  value: BlockContent | null
  onChange: (v: BlockContent) => void
}

/* ─── Block catalogue ────────────────────────────────────── */
const BLOCK_DEFS = [
  { type: 'heading',         label: 'Titlu',            icon: 'H',    color: '#2B8FCC' },
  { type: 'paragraph',       label: 'Paragraf',         icon: '¶',    color: '#374151' },
  { type: 'image',           label: 'Imagine',          icon: '🖼',   color: '#8B5CF6' },
  { type: 'callout',         label: 'Callout / Notă',   icon: '💡',   color: '#F59E0B' },
  { type: 'list',            label: 'Listă',            icon: '≡',    color: '#10B981' },
  { type: 'codeBlock',       label: 'Bloc de cod',      icon: '</>',  color: '#0D1117' },
  { type: 'quote',           label: 'Citat',            icon: '"',    color: '#6B7280' },
  { type: 'separator',       label: 'Separator',        icon: '—',    color: '#D1D5DB' },
  { type: 'youtubeEmbed',    label: 'Video YouTube',    icon: '▶',    color: '#EF4444' },
  { type: 'inlineCta',       label: 'CTA',              icon: '↗',    color: '#2B8FCC' },
  { type: 'statsBlock',      label: 'Statistici',       icon: '📊',   color: '#2B8FCC' },
  { type: 'faqBlock',        label: 'FAQ',              icon: '?',    color: '#8B5CF6' },
  { type: 'comparisonTable', label: 'Tabel comparativ', icon: '⊞',   color: '#374151' },
]

function defaultBlock(type: string): Block {
  switch (type) {
    case 'heading':         return { type, text: 'Titlu nou', level: 2 }
    case 'paragraph':       return { type, text: '' }
    case 'image':           return { type, url: '', caption: '', alt: '' }
    case 'callout':         return { type, text: '', variant: 'info' }
    case 'list':            return { type, items: [''], ordered: false }
    case 'codeBlock':       return { type, code: '', language: 'javascript' }
    case 'quote':           return { type, text: '', author: '' }
    case 'separator':       return { type }
    case 'youtubeEmbed':    return { type, url: '', caption: '' }
    case 'inlineCta':       return { type, title: '', text: '', url: '', buttonText: 'Afla mai mult' }
    case 'statsBlock':      return { type, stats: [{ value: '', label: '' }] }
    case 'faqBlock':        return { type, items: [{ q: '', a: '' }] }
    case 'comparisonTable': return { type, headers: ['Coloana 1', 'Coloana 2'], rows: [['', '']] }
    default:                return { type }
  }
}

function blockPreview(block: Block): string {
  switch (block.type) {
    case 'heading':         return String(block.text || 'Titlu necompletat')
    case 'paragraph':       return (String(block.text || 'Paragraf necompletat')).replace(/<[^>]+>/g, '').slice(0, 80)
    case 'image':           return String(block.caption || block.url || 'Imagine')
    case 'callout':         return String(block.text || 'Callout').slice(0, 80)
    case 'list':            return `Listă: ${(block.items as string[])?.length ?? 0} elemente`
    case 'codeBlock':       return `Cod ${block.language || ''}`
    case 'quote':           return String(block.text || 'Citat').slice(0, 60)
    case 'separator':       return '──────────────'
    case 'youtubeEmbed':    return String(block.url || 'URL YouTube')
    case 'inlineCta':       return String(block.title || 'CTA')
    case 'statsBlock':      return `${(block.stats as unknown[])?.length ?? 0} statistici`
    case 'faqBlock':        return `${(block.items as unknown[])?.length ?? 0} întrebări`
    case 'comparisonTable': return `Tabel: ${(block.headers as string[])?.join(', ')}`
    default:                return block.type
  }
}

const blockColor = (type: string) => BLOCK_DEFS.find(d => d.type === type)?.color ?? '#94A3B8'
const blockLabel = (type: string) => BLOCK_DEFS.find(d => d.type === type)?.label ?? type

/* ─── Shared input styles ─────────────────────────────────── */
const INP: React.CSSProperties = {
  width: '100%', border: '1px solid #E2E8F0', borderRadius: 6,
  padding: '7px 10px', fontSize: '0.875rem', fontFamily: 'var(--font-body)',
  color: '#0F172A', background: '#fff', outline: 'none', boxSizing: 'border-box',
}
const TA = (rows = 4): React.CSSProperties => ({
  ...INP, resize: 'vertical', lineHeight: 1.6, minHeight: rows * 24,
})
const SEL: React.CSSProperties = { ...INP, cursor: 'pointer' }
const LBL: React.CSSProperties = {
  display: 'block', marginBottom: 4,
  fontSize: '0.75rem', fontWeight: 600, color: '#64748B', fontFamily: 'var(--font-body)',
}
const ROW: React.CSSProperties = { display: 'flex', gap: 10, marginBottom: 10 }
const COL = (flex = 1): React.CSSProperties => ({ flex, minWidth: 0 })

/* ─── Paragraph toolbar ───────────────────────────────────── */
function ParagraphToolbar({ textareaRef }: { textareaRef: React.RefObject<HTMLTextAreaElement | null> }) {
  function wrap(open: string, close: string) {
    const ta = textareaRef.current
    if (!ta) return
    const start = ta.selectionStart
    const end = ta.selectionEnd
    const sel = ta.value.slice(start, end)
    const newVal = ta.value.slice(0, start) + open + sel + close + ta.value.slice(end)
    const event = Object.assign(new Event('input', { bubbles: true }), {})
    Object.defineProperty(event, 'target', { value: { value: newVal } })
    ta.value = newVal
    ta.dispatchEvent(new Event('input', { bubbles: true }))
    ta.focus()
    ta.setSelectionRange(start + open.length, end + open.length)
  }
  const btnStyle: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 8px',
    border: '1px solid #E2E8F0', borderRadius: 5, background: '#F8FAFC',
    fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', color: '#374151',
  }
  return (
    <div style={{ display: 'flex', gap: 6, marginBottom: 6, flexWrap: 'wrap' }}>
      <button type="button" style={btnStyle} onClick={() => wrap('<strong>', '</strong>')}><Bold size={12} /> Bold</button>
      <button type="button" style={btnStyle} onClick={() => wrap('<em>', '</em>')}><Italic size={12} /> Italic</button>
      <button type="button" style={btnStyle} onClick={() => wrap('<a href="">', '</a>')}><Link2 size={12} /> Link</button>
      <button type="button" style={btnStyle} onClick={() => wrap('<code>', '</code>')}>{'<>'} Cod inline</button>
      <span style={{ fontSize: '0.7rem', color: '#94A3B8', alignSelf: 'center', marginLeft: 4 }}>Suportă HTML</span>
    </div>
  )
}

/* ─── Block edit form ─────────────────────────────────────── */
function BlockEditForm({ block, onChange }: { block: Block; onChange: (b: Block) => void }) {
  const p = (key: string, val: unknown) => onChange({ ...block, [key]: val })
  const taRef = useRef<HTMLTextAreaElement>(null)
  const [uploading, setUploading] = useState(false)

  async function uploadImage(file: File) {
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('dir', 'learn')
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const json = await res.json()
      if (json.url) p('url', json.url)
    } finally { setUploading(false) }
  }

  switch (block.type) {

    case 'heading': return (
      <div>
        <div style={ROW}>
          <div style={COL(3)}>
            <label style={LBL}>Text titlu</label>
            <input style={INP} value={String(block.text ?? '')} onChange={e => p('text', e.target.value)} placeholder="Titlu secțiune..." />
          </div>
          <div style={COL(1)}>
            <label style={LBL}>Nivel</label>
            <select style={SEL} value={String(block.level ?? 2)} onChange={e => p('level', Number(e.target.value))}>
              <option value="2">H2 — Titlu principal</option>
              <option value="3">H3 — Subtitlu</option>
              <option value="4">H4 — Titlu mic</option>
            </select>
          </div>
        </div>
      </div>
    )

    case 'paragraph': return (
      <div>
        <label style={LBL}>Text paragraf</label>
        <ParagraphToolbar textareaRef={taRef} />
        <textarea
          ref={taRef}
          style={TA(6)}
          value={String(block.text ?? '')}
          onChange={e => p('text', e.target.value)}
          placeholder="Scrie textul paragrafului... Suportă HTML: <strong>, <em>, <a href=''>, <ul><li>..."
        />
      </div>
    )

    case 'image': return (
      <div>
        <div style={{ marginBottom: 10 }}>
          <label style={LBL}>URL imagine</label>
          <div style={{ display: 'flex', gap: 8 }}>
            <input style={{ ...INP, flex: 1 }} value={String(block.url ?? '')} onChange={e => p('url', e.target.value)} placeholder="https://... sau /imagini/..." />
            <label style={{
              display: 'inline-flex', alignItems: 'center', gap: 5, padding: '7px 12px',
              border: '1px solid #E2E8F0', borderRadius: 6, background: '#F8FAFC',
              fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', color: '#374151', whiteSpace: 'nowrap',
            }}>
              <Upload size={13} /> {uploading ? 'Se uploadeaza...' : 'Upload'}
              <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { if (e.target.files?.[0]) uploadImage(e.target.files[0]) }} />
            </label>
          </div>
          {block.url != null && block.url !== '' && (
            <img src={String(block.url)} alt="" style={{ marginTop: 8, maxHeight: 120, borderRadius: 6, border: '1px solid #E2E8F0' }} />
          )}
        </div>
        <div style={ROW}>
          <div style={COL()}>
            <label style={LBL}>Caption (opțional)</label>
            <input style={INP} value={String(block.caption ?? '')} onChange={e => p('caption', e.target.value)} placeholder="Descriere imagine..." />
          </div>
          <div style={COL()}>
            <label style={LBL}>Alt text (SEO)</label>
            <input style={INP} value={String(block.alt ?? '')} onChange={e => p('alt', e.target.value)} placeholder="Alt text pentru motoare de cautare..." />
          </div>
        </div>
      </div>
    )

    case 'callout': return (
      <div>
        <div style={{ marginBottom: 10 }}>
          <label style={LBL}>Tip callout</label>
          <select style={SEL} value={String(block.variant ?? 'info')} onChange={e => p('variant', e.target.value)}>
            <option value="info">💡 Info (albastru)</option>
            <option value="warning">⚠️ Avertizare (portocaliu)</option>
            <option value="success">✅ Succes (verde)</option>
            <option value="danger">❌ Pericol (roșu)</option>
          </select>
        </div>
        <label style={LBL}>Text</label>
        <textarea style={TA(3)} value={String(block.text ?? '')} onChange={e => p('text', e.target.value)} placeholder="Textul notei / avertizării..." />
      </div>
    )

    case 'list': {
      const items = (block.items as string[]) ?? ['']
      return (
        <div>
          <div style={{ marginBottom: 10 }}>
            <label style={LBL}>Tip listă</label>
            <select style={SEL} value={block.ordered ? 'ordered' : 'unordered'} onChange={e => p('ordered', e.target.value === 'ordered')}>
              <option value="unordered">● Listă cu puncte</option>
              <option value="ordered">1. Listă numerotată</option>
            </select>
          </div>
          <label style={LBL}>Elemente</label>
          {items.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
              <input
                style={{ ...INP, flex: 1 }}
                value={item}
                onChange={e => { const next = [...items]; next[i] = e.target.value; p('items', next) }}
                placeholder={`Element ${i + 1}...`}
              />
              <button type="button" onClick={() => p('items', items.filter((_, j) => j !== i))} style={{ padding: '6px 8px', border: '1px solid #FECACA', borderRadius: 6, background: '#FEF2F2', color: '#EF4444', cursor: 'pointer' }}>
                <X size={13} />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => p('items', [...items, ''])} style={{ marginTop: 4, padding: '5px 12px', border: '1px dashed #CBD5E1', borderRadius: 6, background: 'transparent', cursor: 'pointer', fontSize: '0.8rem', color: '#64748B' }}>
            + Adaugă element
          </button>
        </div>
      )
    }

    case 'codeBlock': return (
      <div>
        <div style={{ marginBottom: 10 }}>
          <label style={LBL}>Limbaj</label>
          <select style={SEL} value={String(block.language ?? 'javascript')} onChange={e => p('language', e.target.value)}>
            {['javascript', 'typescript', 'php', 'html', 'css', 'bash', 'python', 'json', 'sql', 'other'].map(l => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
        <label style={LBL}>Cod</label>
        <textarea style={{ ...TA(8), fontFamily: 'monospace', fontSize: '0.8rem', background: '#0D1117', color: '#E2E8F0', border: '1px solid #374151' }}
          value={String(block.code ?? '')} onChange={e => p('code', e.target.value)} placeholder="// Scrie codul aici..." />
      </div>
    )

    case 'quote': return (
      <div>
        <label style={LBL}>Text citat</label>
        <textarea style={TA(3)} value={String(block.text ?? '')} onChange={e => p('text', e.target.value)} placeholder="Textul citatului..." />
        <div style={{ marginTop: 10 }}>
          <label style={LBL}>Autor (opțional)</label>
          <input style={INP} value={String(block.author ?? '')} onChange={e => p('author', e.target.value)} placeholder="Numele autorului..." />
        </div>
      </div>
    )

    case 'separator': return (
      <div style={{ textAlign: 'center', padding: '12px 0', color: '#94A3B8', fontSize: '0.8rem', fontFamily: 'var(--font-body)' }}>
        ─── Linie separatoare ─── (fără setări)
      </div>
    )

    case 'youtubeEmbed': return (
      <div>
        <label style={LBL}>URL YouTube</label>
        <input style={INP} value={String(block.url ?? '')} onChange={e => p('url', e.target.value)} placeholder="https://www.youtube.com/watch?v=... sau https://youtu.be/..." />
        <div style={{ marginTop: 10 }}>
          <label style={LBL}>Caption (opțional)</label>
          <input style={INP} value={String(block.caption ?? '')} onChange={e => p('caption', e.target.value)} placeholder="Descriere video..." />
        </div>
      </div>
    )

    case 'inlineCta': return (
      <div>
        <div style={{ ...ROW, marginBottom: 10 }}>
          <div style={COL()}>
            <label style={LBL}>Titlu</label>
            <input style={INP} value={String(block.title ?? '')} onChange={e => p('title', e.target.value)} placeholder="Titlu CTA..." />
          </div>
          <div style={COL()}>
            <label style={LBL}>Text buton</label>
            <input style={INP} value={String(block.buttonText ?? '')} onChange={e => p('buttonText', e.target.value)} placeholder="Afla mai mult" />
          </div>
        </div>
        <div style={{ marginBottom: 10 }}>
          <label style={LBL}>Text descriere</label>
          <textarea style={TA(2)} value={String(block.text ?? '')} onChange={e => p('text', e.target.value)} placeholder="Scurt text descriptiv..." />
        </div>
        <label style={LBL}>URL link</label>
        <input style={INP} value={String(block.url ?? '')} onChange={e => p('url', e.target.value)} placeholder="/oferta sau https://..." />
      </div>
    )

    case 'statsBlock': {
      const stats = (block.stats as { value: string; label: string }[]) ?? []
      return (
        <div>
          <label style={LBL}>Statistici</label>
          {stats.map((stat, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <input style={{ ...INP, width: 100 }} value={stat.value} onChange={e => { const next = [...stats]; next[i] = { ...stat, value: e.target.value }; p('stats', next) }} placeholder="200+" />
              <input style={{ ...INP, flex: 1 }} value={stat.label} onChange={e => { const next = [...stats]; next[i] = { ...stat, label: e.target.value }; p('stats', next) }} placeholder="Proiecte livrate..." />
              <button type="button" onClick={() => p('stats', stats.filter((_, j) => j !== i))} style={{ padding: '6px 8px', border: '1px solid #FECACA', borderRadius: 6, background: '#FEF2F2', color: '#EF4444', cursor: 'pointer' }}>
                <X size={13} />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => p('stats', [...stats, { value: '', label: '' }])} style={{ marginTop: 4, padding: '5px 12px', border: '1px dashed #CBD5E1', borderRadius: 6, background: 'transparent', cursor: 'pointer', fontSize: '0.8rem', color: '#64748B' }}>
            + Adaugă statistică
          </button>
        </div>
      )
    }

    case 'faqBlock': {
      const items = (block.items as { q: string; a: string }[]) ?? []
      return (
        <div>
          <label style={LBL}>Întrebări frecvente</label>
          {items.map((item, i) => (
            <div key={i} style={{ border: '1px solid #E2E8F0', borderRadius: 8, padding: 12, marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', fontFamily: 'var(--font-body)' }}>Întrebarea {i + 1}</span>
                <button type="button" onClick={() => p('items', items.filter((_, j) => j !== i))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444' }}>
                  <X size={13} />
                </button>
              </div>
              <input style={{ ...INP, marginBottom: 6 }} value={item.q} onChange={e => { const next = [...items]; next[i] = { ...item, q: e.target.value }; p('items', next) }} placeholder="Întrebarea..." />
              <textarea style={TA(2)} value={item.a} onChange={e => { const next = [...items]; next[i] = { ...item, a: e.target.value }; p('items', next) }} placeholder="Răspunsul..." />
            </div>
          ))}
          <button type="button" onClick={() => p('items', [...items, { q: '', a: '' }])} style={{ padding: '5px 12px', border: '1px dashed #CBD5E1', borderRadius: 6, background: 'transparent', cursor: 'pointer', fontSize: '0.8rem', color: '#64748B' }}>
            + Adaugă întrebare
          </button>
        </div>
      )
    }

    case 'comparisonTable': {
      const headers = (block.headers as string[]) ?? ['Coloana 1', 'Coloana 2']
      const rows = (block.rows as string[][]) ?? [[]]
      return (
        <div>
          <div style={{ marginBottom: 12 }}>
            <label style={LBL}>Coloane (titluri)</label>
            <div style={{ display: 'flex', gap: 6 }}>
              {headers.map((h, i) => (
                <input key={i} style={{ ...INP, flex: 1 }} value={h} onChange={e => { const next = [...headers]; next[i] = e.target.value; p('headers', next) }} placeholder={`Coloana ${i + 1}`} />
              ))}
              <button type="button" onClick={() => { p('headers', [...headers, `Coloana ${headers.length + 1}`]); p('rows', rows.map(r => [...r, ''])) }} style={{ padding: '7px 10px', border: '1px dashed #CBD5E1', borderRadius: 6, background: 'transparent', cursor: 'pointer', color: '#64748B', whiteSpace: 'nowrap' }}>
                + Col
              </button>
            </div>
          </div>
          <label style={LBL}>Rânduri</label>
          {rows.map((row, ri) => (
            <div key={ri} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
              {headers.map((_, ci) => (
                <input key={ci} style={{ ...INP, flex: 1 }} value={row[ci] ?? ''} onChange={e => { const next = rows.map(r => [...r]); next[ri][ci] = e.target.value; p('rows', next) }} placeholder={`R${ri + 1}C${ci + 1}`} />
              ))}
              <button type="button" onClick={() => p('rows', rows.filter((_, j) => j !== ri))} style={{ padding: '6px 8px', border: '1px solid #FECACA', borderRadius: 6, background: '#FEF2F2', color: '#EF4444', cursor: 'pointer' }}>
                <X size={13} />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => p('rows', [...rows, headers.map(() => '')])} style={{ marginTop: 4, padding: '5px 12px', border: '1px dashed #CBD5E1', borderRadius: 6, background: 'transparent', cursor: 'pointer', fontSize: '0.8rem', color: '#64748B' }}>
            + Adaugă rând
          </button>
        </div>
      )
    }

    default: return <p style={{ color: '#94A3B8', fontSize: '0.8rem' }}>Tip necunoscut: {block.type}</p>
  }
}

/* ─── Block picker modal ──────────────────────────────────── */
function BlockPicker({ onPick, onClose }: { onPick: (type: string) => void; onClose: () => void }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }} onClick={onClose}>
      <div style={{
        background: '#fff', borderRadius: 16, padding: 24, width: 520, maxWidth: '95vw',
        boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: '#0F172A', margin: 0 }}>
            Adaugă bloc
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}>
            <X size={18} />
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {BLOCK_DEFS.map(def => (
            <button
              key={def.type}
              type="button"
              onClick={() => { onPick(def.type); onClose() }}
              style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
                border: '1px solid #E2E8F0', borderRadius: 8, background: '#fff',
                cursor: 'pointer', textAlign: 'left',
                transition: 'border-color 150ms, background 150ms',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = def.color; (e.currentTarget as HTMLButtonElement).style.background = '#F8FAFC' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#E2E8F0'; (e.currentTarget as HTMLButtonElement).style.background = '#fff' }}
            >
              <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>{def.icon}</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', fontWeight: 600, color: '#374151' }}>{def.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Main BlockEditor ────────────────────────────────────── */
export function BlockEditor({ value, onChange }: Props) {
  const blocks: Block[] = (value?.blocks as Block[]) ?? []
  const [expanded, setExpanded] = useState<number | null>(null)
  const [showPicker, setShowPicker] = useState(false)

  function update(next: Block[]) {
    onChange({ blocks: next })
  }
  function addBlock(type: string) {
    const next = [...blocks, defaultBlock(type)]
    update(next)
    setExpanded(next.length - 1)
  }
  function updateBlock(i: number, b: Block) {
    const next = [...blocks]; next[i] = b; update(next)
  }
  function removeBlock(i: number) {
    if (!confirm('Stergi acest bloc?')) return
    const next = blocks.filter((_, j) => j !== i)
    update(next)
    if (expanded === i) setExpanded(null)
  }
  function moveUp(i: number) {
    if (i === 0) return
    const next = [...blocks];
    [next[i - 1], next[i]] = [next[i], next[i - 1]]
    update(next)
    setExpanded(i - 1)
  }
  function moveDown(i: number) {
    if (i === blocks.length - 1) return
    const next = [...blocks];
    [next[i], next[i + 1]] = [next[i + 1], next[i]]
    update(next)
    setExpanded(i + 1)
  }

  return (
    <div style={{ border: '1px solid #E2E8F0', borderRadius: 10, overflow: 'hidden', background: '#F8FAFC' }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 14px', background: '#fff', borderBottom: '1px solid #E2E8F0',
      }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', fontWeight: 700, color: '#374151' }}>
          Editor conținut — {blocks.length} {blocks.length === 1 ? 'bloc' : 'blocuri'}
        </span>
        <button
          type="button"
          onClick={() => setShowPicker(true)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '6px 14px', borderRadius: 7, border: 'none',
            background: '#2B8FCC', color: '#fff', cursor: 'pointer',
            fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.8125rem',
          }}
        >
          <Plus size={14} /> Adaugă bloc
        </button>
      </div>

      {/* Blocks list */}
      <div style={{ padding: blocks.length ? 10 : 0 }}>
        {blocks.length === 0 && (
          <div style={{
            textAlign: 'center', padding: '40px 20px',
            fontFamily: 'var(--font-body)', color: '#94A3B8', fontSize: '0.875rem',
          }}>
            Niciun bloc încă. Apasă <strong>Adaugă bloc</strong> pentru a începe.
          </div>
        )}

        {blocks.map((block, i) => {
          const isOpen = expanded === i
          const color = blockColor(block.type)
          return (
            <div key={i} style={{
              border: isOpen ? `2px solid ${color}` : '1px solid #E2E8F0',
              borderRadius: 8, background: '#fff', marginBottom: 8, overflow: 'hidden',
              transition: 'border-color 150ms',
            }}>
              {/* Block header row */}
              <div
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px',
                  cursor: 'pointer', borderBottom: isOpen ? '1px solid #E2E8F0' : 'none',
                  background: isOpen ? '#FAFBFC' : '#fff',
                }}
                onClick={() => setExpanded(isOpen ? null : i)}
              >
                <span style={{
                  padding: '2px 8px', borderRadius: 4, fontSize: '0.7rem', fontWeight: 700,
                  fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.04em',
                  background: `${color}18`, color, flexShrink: 0,
                }}>
                  {blockLabel(block.type)}
                </span>
                <span style={{
                  flex: 1, fontFamily: 'var(--font-body)', fontSize: '0.8125rem',
                  color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {blockPreview(block)}
                </span>
                <div style={{ display: 'flex', gap: 3, flexShrink: 0 }} onClick={e => e.stopPropagation()}>
                  <button type="button" onClick={() => moveUp(i)} disabled={i === 0} style={{ padding: '4px 6px', border: '1px solid #E2E8F0', borderRadius: 5, background: '#fff', cursor: 'pointer', opacity: i === 0 ? 0.3 : 1 }}><ChevronUp size={12} /></button>
                  <button type="button" onClick={() => moveDown(i)} disabled={i === blocks.length - 1} style={{ padding: '4px 6px', border: '1px solid #E2E8F0', borderRadius: 5, background: '#fff', cursor: 'pointer', opacity: i === blocks.length - 1 ? 0.3 : 1 }}><ChevronDown size={12} /></button>
                  <button type="button" onClick={() => removeBlock(i)} style={{ padding: '4px 6px', border: '1px solid #FECACA', borderRadius: 5, background: '#FEF2F2', cursor: 'pointer', color: '#EF4444' }}><Trash2 size={12} /></button>
                </div>
              </div>

              {/* Block edit form */}
              {isOpen && (
                <div style={{ padding: 16 }}>
                  <BlockEditForm block={block} onChange={b => updateBlock(i, b)} />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Block picker */}
      {showPicker && <BlockPicker onPick={addBlock} onClose={() => setShowPicker(false)} />}
    </div>
  )
}
