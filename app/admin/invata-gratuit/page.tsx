'use client'

import { useEffect, useState } from 'react'
import {
  A, Field, Inp, Textarea, Sel, SaveBar, AdminHeader,
} from '@/app/admin/_components/AdminPage'
import { Plus, Trash2, X, Check, ChevronDown, ChevronUp, Eye, Download } from 'lucide-react'
import type { LearnContent, LearnType, LearnStatus } from '@/types/learn'

const TYPE_OPTIONS = [
  { value: 'articol', label: 'Articol' },
  { value: 'resursa', label: 'Resursa' },
  { value: 'tool',    label: 'Tool' },
  { value: 'video',   label: 'Video' },
]

const STATUS_OPTIONS = [
  { value: 'draft',     label: 'Draft' },
  { value: 'published', label: 'Publicat' },
  { value: 'archived',  label: 'Arhivat' },
]

const DIFFICULTY_OPTIONS = [
  { value: '',            label: '- Nivel -' },
  { value: 'incepator',   label: 'Incepator' },
  { value: 'intermediar', label: 'Intermediar' },
  { value: 'avansat',     label: 'Avansat' },
]

const EMPTY = (): Partial<LearnContent> => ({
  id: `new-${Date.now()}`,
  title: '',
  slug: '',
  type: 'articol' as LearnType,
  status: 'draft' as LearnStatus,
  tags: [],
  resource_preview_urls: [],
  resource_benefits: [],
  requires_email: false,
  tool_requires_email: false,
  featured: false,
  allow_comments: true,
  views: 0,
  downloads: 0,
  content: null,
  excerpt: '',
})

const STATUS_COLOR: Record<string, string> = {
  published: '#10B981',
  draft: '#F59E0B',
  archived: '#94A3B8',
}

const TYPE_COLOR: Record<string, string> = {
  articol: '#2B8FCC',
  resursa: '#10B981',
  tool:    '#8B5CF6',
  video:   '#EF4444',
}

export default function LearnContentAdminPage() {
  const [items, setItems] = useState<Partial<LearnContent>[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [drafts, setDrafts] = useState<Record<string, Partial<LearnContent>>>({})
  const [filter, setFilter] = useState('')

  useEffect(() => {
    fetch('/api/admin/learn/content?perPage=100')
      .then((r) => r.json())
      .then((d: { items?: Partial<LearnContent>[] }) => setItems(d.items ?? []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [])

  function patchDraft(id: string, key: keyof LearnContent, val: unknown) {
    setDrafts((prev) => ({ ...prev, [id]: { ...prev[id], [key]: val } }))
  }

  function commitDraft(id: string) {
    const d = drafts[id]
    if (!d) return
    const isNew = String(id).startsWith('new-')
    if (isNew) {
      // Create
      setSaving(true)
      fetch('/api/admin/learn/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(d),
      })
        .then((r) => r.json())
        .then((created: Partial<LearnContent>) => {
          setItems((prev) => prev.map((it) => it.id === id ? created : it))
          setExpandedId(null)
          setSaved(true)
          setTimeout(() => setSaved(false), 3000)
        })
        .catch(() => {})
        .finally(() => setSaving(false))
    } else {
      // Update
      setSaving(true)
      fetch(`/api/admin/learn/content/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(d),
      })
        .then((r) => r.json())
        .then((updated: Partial<LearnContent>) => {
          setItems((prev) => prev.map((it) => it.id === id ? updated : it))
          setExpandedId(null)
          setSaved(true)
          setTimeout(() => setSaved(false), 3000)
        })
        .catch(() => {})
        .finally(() => setSaving(false))
    }
  }

  function cancelDraft(id: string) {
    if (String(id).startsWith('new-')) {
      setItems((prev) => prev.filter((it) => it.id !== id))
    }
    setDrafts((prev) => { const c = { ...prev }; delete c[id]; return c })
    setExpandedId(null)
  }

  function removeItem(id: string) {
    if (String(id).startsWith('new-')) {
      setItems((prev) => prev.filter((it) => it.id !== id))
      return
    }
    if (!confirm('Stergi definitiv acest continut?')) return
    fetch(`/api/admin/learn/content/${id}`, { method: 'DELETE' })
      .then(() => setItems((prev) => prev.filter((it) => it.id !== id)))
      .catch(() => {})
  }

  function addNew() {
    const item = EMPTY()
    setItems((prev) => [item, ...prev])
    setExpandedId(item.id ?? null)
    setDrafts((prev) => ({ ...prev, [item.id!]: { ...item } }))
  }

  function toggleExpand(item: Partial<LearnContent>) {
    const id = item.id!
    if (expandedId === id) {
      setExpandedId(null)
    } else {
      setExpandedId(id)
      setDrafts((prev) => ({ ...prev, [id]: { ...item } }))
    }
  }

  const filtered = filter
    ? items.filter((it) => it.status === filter || it.type === filter)
    : items

  if (loading) {
    return <div style={{ padding: 32, fontFamily: 'var(--font-body)', color: '#64748B' }}>Se incarca...</div>
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <SaveBar saving={saving} onSave={() => {}} saved={saved} />

      <AdminHeader
        title="Invata Gratuit - Continut"
        desc="Gestioneaza articolele, resursele, tool-urile si video-urile."
        action={
          <button style={A.btnPrimary} onClick={addNew}>
            <Plus size={15} />
            Adauga continut
          </button>
        }
      />

      <div style={{ padding: '0 32px 40px' }}>
        {/* Filters */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          {['', 'published', 'draft', 'archived', 'articol', 'resursa', 'tool', 'video'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                ...A.btnOutline,
                height: 32,
                fontSize: '0.8125rem',
                background: filter === f ? '#2B8FCC' : '#fff',
                color: filter === f ? '#fff' : '#374151',
                border: filter === f ? '2px solid #2B8FCC' : '1px solid #E2E8F0',
              }}
            >
              {f || 'Toate'}
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', fontFamily: 'var(--font-body)', color: '#94A3B8' }}>
            Niciun element. Apasa &quot;Adauga continut&quot; pentru a incepe.
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map((item) => {
            const id = item.id!
            const isOpen = expandedId === id
            const d = drafts[id] ?? item

            return (
              <div
                key={id}
                style={{
                  border: isOpen ? '2px solid #2B8FCC' : '1px solid #E2E8F0',
                  borderRadius: 12,
                  overflow: 'hidden',
                  background: '#fff',
                  transition: 'border-color 150ms ease',
                }}
              >
                {/* Row header */}
                <div
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px 16px',
                    cursor: 'pointer',
                    borderBottom: isOpen ? '1px solid #E2E8F0' : 'none',
                    minHeight: 64,
                  }}
                  onClick={() => toggleExpand(item)}
                >
                  <span
                    style={{
                      padding: '2px 8px', borderRadius: 4,
                      background: `${TYPE_COLOR[item.type ?? 'articol']}1a`,
                      color: TYPE_COLOR[item.type ?? 'articol'],
                      fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.7rem',
                      textTransform: 'uppercase', letterSpacing: '0.04em', flexShrink: 0,
                    }}
                  >
                    {item.type}
                  </span>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.875rem', color: '#0F172A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.title || <span style={{ color: '#CBD5E1', fontWeight: 400 }}>Fara titlu</span>}
                    </div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#64748B', marginTop: 2 }}>
                      /{item.slug || '-'}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                    <span
                      style={{
                        padding: '2px 8px', borderRadius: 4,
                        background: `${STATUS_COLOR[item.status ?? 'draft']}1a`,
                        color: STATUS_COLOR[item.status ?? 'draft'],
                        fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.7rem',
                        textTransform: 'uppercase',
                      }}
                    >
                      {item.status}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#94A3B8' }}>
                      <Eye size={11} /> {item.views ?? 0}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#94A3B8' }}>
                      <Download size={11} /> {item.downloads ?? 0}
                    </span>
                    {isOpen ? <ChevronUp size={14} color="#94A3B8" /> : <ChevronDown size={14} color="#94A3B8" />}
                    <button
                      onClick={(e) => { e.stopPropagation(); removeItem(id) }}
                      style={A.btnDanger}
                      title="Sterge"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                {/* Edit form */}
                {isOpen && (
                  <div style={{ padding: 20 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 16 }}>
                      <Field label="Titlu">
                        <Inp value={String(d.title ?? '')} onChange={(v) => patchDraft(id, 'title', v)} placeholder="Titlul continutului" />
                      </Field>
                      <Field label="Slug">
                        <Inp value={String(d.slug ?? '')} onChange={(v) => patchDraft(id, 'slug', v)} placeholder="slug-url" />
                      </Field>
                      <Field label="Tip">
                        <Sel value={String(d.type ?? 'articol')} onChange={(v) => patchDraft(id, 'type', v)} options={TYPE_OPTIONS} />
                      </Field>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 16 }}>
                      <Field label="Status">
                        <Sel value={String(d.status ?? 'draft')} onChange={(v) => patchDraft(id, 'status', v)} options={STATUS_OPTIONS} />
                      </Field>
                      <Field label="Dificultate">
                        <Sel value={String(d.difficulty ?? '')} onChange={(v) => patchDraft(id, 'difficulty', v)} options={DIFFICULTY_OPTIONS} />
                      </Field>
                      <Field label="Data publicare">
                        <Inp type="datetime-local" value={String(d.published_at ?? '').slice(0, 16)} onChange={(v) => patchDraft(id, 'published_at', v)} />
                      </Field>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <Field label="Excerpt">
                        <Textarea value={String(d.excerpt ?? '')} onChange={(v) => patchDraft(id, 'excerpt', v)} placeholder="Scurta descriere..." rows={2} />
                      </Field>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                      <Field label="URL imagine principala">
                        <Inp value={String(d.featured_image_url ?? '')} onChange={(v) => patchDraft(id, 'featured_image_url', v)} placeholder="https://..." />
                      </Field>
                      <Field label="Taguri (separate prin virgula)">
                        <Inp
                          value={Array.isArray(d.tags) ? d.tags.join(', ') : ''}
                          onChange={(v) => patchDraft(id, 'tags', v.split(',').map((t) => t.trim()).filter(Boolean))}
                          placeholder="seo, wordpress, ..."
                        />
                      </Field>
                    </div>

                    {/* ── Câmpuri specifice tipului ── */}

                    {/* ARTICOL — corp HTML */}
                    {d.type === 'articol' && (
                      <div style={{ marginBottom: 16 }}>
                        <Field label="Continut articol (HTML)">
                          <Textarea
                            value={typeof (d.content as Record<string,unknown> | null)?.html === 'string' ? String((d.content as Record<string,unknown>).html) : ''}
                            onChange={(v) => patchDraft(id, 'content', { html: v })}
                            placeholder="<p>Scrie continutul articolului in HTML...</p>"
                            rows={12}
                          />
                        </Field>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
                          <Field label="Timp citire (minute)">
                            <Inp type="number" value={String(d.read_time ?? '')} onChange={(v) => patchDraft(id, 'read_time', v ? Number(v) : null)} placeholder="5" />
                          </Field>
                          <Field label="Permite comentarii">
                            <Sel
                              value={d.allow_comments ? 'da' : 'nu'}
                              onChange={(v) => patchDraft(id, 'allow_comments', v === 'da')}
                              options={[{ value: 'da', label: 'Da' }, { value: 'nu', label: 'Nu' }]}
                            />
                          </Field>
                        </div>
                      </div>
                    )}

                    {/* RESURSA — fisier download */}
                    {d.type === 'resursa' && (
                      <div style={{ marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <Field label="URL fisier download (PDF, ZIP, etc.)">
                          <Inp value={String(d.resource_file_url ?? '')} onChange={(v) => patchDraft(id, 'resource_file_url', v)} placeholder="https://..." />
                        </Field>
                        <Field label="Descriere resursa">
                          <Textarea value={String(d.resource_description ?? '')} onChange={(v) => patchDraft(id, 'resource_description', v)} placeholder="Ce contine aceasta resursa..." rows={3} />
                        </Field>
                        <Field label="Beneficii (unul per rand)">
                          <Textarea
                            value={Array.isArray(d.resource_benefits) ? (d.resource_benefits as string[]).join('\n') : ''}
                            onChange={(v) => patchDraft(id, 'resource_benefits', v.split('\n').map((s) => s.trim()).filter(Boolean))}
                            placeholder={"Economisesti 10 ore de munca\nTemplate gata de folosit\n..."}
                            rows={4}
                          />
                        </Field>
                        <Field label="Necesita email pentru download">
                          <Sel
                            value={d.requires_email ? 'da' : 'nu'}
                            onChange={(v) => patchDraft(id, 'requires_email', v === 'da')}
                            options={[{ value: 'da', label: 'Da — colecteaza emailul' }, { value: 'nu', label: 'Nu — download direct' }]}
                          />
                        </Field>
                      </div>
                    )}

                    {/* VIDEO — YouTube */}
                    {d.type === 'video' && (
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                        <Field label="URL YouTube (embed sau watch)">
                          <Inp value={String(d.youtube_url ?? '')} onChange={(v) => patchDraft(id, 'youtube_url', v)} placeholder="https://www.youtube.com/watch?v=..." />
                        </Field>
                        <Field label="Durata video (ex: 12:34)">
                          <Inp value={String(d.video_duration ?? '')} onChange={(v) => patchDraft(id, 'video_duration', v)} placeholder="12:34" />
                        </Field>
                      </div>
                    )}

                    {/* TOOL — component intern */}
                    {d.type === 'tool' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 16 }}>
                        <Field label="Component tool (cheie interna)">
                          <Sel
                            value={String(d.tool_component_key ?? '')}
                            onChange={(v) => patchDraft(id, 'tool_component_key', v || null)}
                            options={[
                              { value: '', label: '— Selecteaza —' },
                              { value: 'CostCalculatorMagazin', label: 'Calculator Cost Magazin Online' },
                              { value: 'CostCalculatorWebsite', label: 'Calculator Cost Website Prezentare' },
                              { value: 'ChecklistLansareMagazin', label: 'Checklist Lansare Magazin' },
                              { value: 'SeoAuditChecker', label: 'SEO Audit Checker' },
                            ]}
                          />
                        </Field>
                        <Field label="Descriere tool">
                          <Textarea value={String(d.tool_description ?? '')} onChange={(v) => patchDraft(id, 'tool_description', v)} placeholder="Ce face acest tool..." rows={3} />
                        </Field>
                        <Field label="Necesita email pentru acces">
                          <Sel
                            value={d.tool_requires_email ? 'da' : 'nu'}
                            onChange={(v) => patchDraft(id, 'tool_requires_email', v === 'da')}
                            options={[{ value: 'nu', label: 'Nu — acces liber' }, { value: 'da', label: 'Da — colecteaza emailul' }]}
                          />
                        </Field>
                      </div>
                    )}

                    {/* SEO + optiuni comune */}
                    <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: 16, marginBottom: 16 }}>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>SEO & Optiuni</p>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 12 }}>
                        <Field label="SEO Title">
                          <Inp value={String(d.seo_title ?? '')} onChange={(v) => patchDraft(id, 'seo_title', v)} placeholder="Titlu pentru Google..." />
                        </Field>
                        <Field label="Featured">
                          <Sel
                            value={d.featured ? 'da' : 'nu'}
                            onChange={(v) => patchDraft(id, 'featured', v === 'da')}
                            options={[{ value: 'nu', label: 'Nu' }, { value: 'da', label: 'Da — afisat in sectiunea Featured' }]}
                          />
                        </Field>
                      </div>
                      <Field label="SEO Description">
                        <Textarea value={String(d.seo_description ?? '')} onChange={(v) => patchDraft(id, 'seo_description', v)} placeholder="Descriere pentru Google (max 160 caractere)..." rows={2} />
                      </Field>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                      <button onClick={() => cancelDraft(id)} style={A.btnOutline}>
                        <X size={14} /> Anuleaza
                      </button>
                      <button onClick={() => commitDraft(id)} style={{ ...A.btnPrimary, background: '#10B981' }}>
                        <Check size={14} /> Salveaza
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
