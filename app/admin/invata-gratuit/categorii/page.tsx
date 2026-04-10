'use client'

import { useEffect, useState } from 'react'
import { A, Field, Inp, Textarea, SaveBar, AdminHeader } from '@/app/admin/_components/AdminPage'
import { Plus, Trash2, X, Check, ChevronDown, ChevronUp } from 'lucide-react'
import type { LearnCategory } from '@/types/learn'

const EMPTY = (): Partial<LearnCategory> => ({
  id: `new-${Date.now()}`,
  name: '',
  slug: '',
  description: '',
  color: '#2B8FCC',
  icon_name: 'BookOpen',
  order: 0,
})

export default function LearnCategoriesAdminPage() {
  const [items, setItems] = useState<Partial<LearnCategory>[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [drafts, setDrafts] = useState<Record<string, Partial<LearnCategory>>>({})

  useEffect(() => {
    fetch('/api/admin/learn/categories')
      .then((r) => r.json())
      .then((d: Partial<LearnCategory>[]) => setItems(d))
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [])

  function patchDraft(id: string, key: keyof LearnCategory, val: unknown) {
    setDrafts((prev) => ({ ...prev, [id]: { ...prev[id], [key]: val } }))
  }

  function commitDraft(id: string) {
    const d = drafts[id]
    if (!d) return
    const isNew = String(id).startsWith('new-')
    setSaving(true)
    const url = isNew ? '/api/admin/learn/categories' : `/api/admin/learn/categories/${id}`
    const method = isNew ? 'POST' : 'PUT'

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(d),
    })
      .then((r) => r.json())
      .then((result: Partial<LearnCategory>) => {
        setItems((prev) => prev.map((it) => it.id === id ? result : it))
        setExpandedId(null)
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      })
      .catch(() => {})
      .finally(() => setSaving(false))
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
    if (!confirm('Stergi aceasta categorie?')) return
    fetch(`/api/admin/learn/categories/${id}`, { method: 'DELETE' })
      .then(() => setItems((prev) => prev.filter((it) => it.id !== id)))
      .catch(() => {})
  }

  function addNew() {
    const item = EMPTY()
    setItems((prev) => [...prev, item])
    setExpandedId(item.id ?? null)
    setDrafts((prev) => ({ ...prev, [item.id!]: { ...item } }))
  }

  function toggleExpand(item: Partial<LearnCategory>) {
    const id = item.id!
    if (expandedId === id) {
      setExpandedId(null)
    } else {
      setExpandedId(id)
      setDrafts((prev) => ({ ...prev, [id]: { ...item } }))
    }
  }

  if (loading) {
    return <div style={{ padding: 32, fontFamily: 'var(--font-body)', color: '#64748B' }}>Se incarca...</div>
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <SaveBar saving={saving} onSave={() => {}} saved={saved} />

      <AdminHeader
        title="Categorii - Invata Gratuit"
        desc="Gestioneaza categoriile pentru sectiunea Invata Gratuit."
        action={
          <button style={A.btnPrimary} onClick={addNew}>
            <Plus size={15} />
            Categorie noua
          </button>
        }
      />

      <div style={{ padding: '0 32px 40px' }}>
        {items.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', fontFamily: 'var(--font-body)', color: '#94A3B8' }}>
            Nicio categorie. Apasa &quot;Categorie noua&quot; pentru a incepe.
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {items.map((item) => {
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
                }}
              >
                <div
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px 16px', cursor: 'pointer',
                    borderBottom: isOpen ? '1px solid #E2E8F0' : 'none',
                    minHeight: 56,
                  }}
                  onClick={() => toggleExpand(item)}
                >
                  <div
                    style={{
                      width: 12, height: 12, borderRadius: '50%',
                      background: item.color ?? '#2B8FCC', flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.875rem', color: '#0F172A' }}>
                      {item.name || <span style={{ color: '#CBD5E1', fontWeight: 400 }}>Categorie fara nume</span>}
                    </div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#64748B' }}>
                      /{item.slug ?? '-'} - Ordine: {item.order ?? 0}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {isOpen ? <ChevronUp size={14} color="#94A3B8" /> : <ChevronDown size={14} color="#94A3B8" />}
                    <button
                      onClick={(e) => { e.stopPropagation(); removeItem(id) }}
                      style={A.btnDanger}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                {isOpen && (
                  <div style={{ padding: 20 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 16 }}>
                      <Field label="Nume">
                        <Inp value={String(d.name ?? '')} onChange={(v) => patchDraft(id, 'name', v)} placeholder="Nume categorie" />
                      </Field>
                      <Field label="Slug">
                        <Inp value={String(d.slug ?? '')} onChange={(v) => patchDraft(id, 'slug', v)} placeholder="slug-categorie" />
                      </Field>
                      <Field label="Ordine">
                        <Inp value={String(d.order ?? 0)} onChange={(v) => patchDraft(id, 'order', parseInt(v, 10) || 0)} placeholder="0" />
                      </Field>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                      <Field label="Icon (lucide-react)">
                        <Inp value={String(d.icon_name ?? '')} onChange={(v) => patchDraft(id, 'icon_name', v)} placeholder="BookOpen" />
                      </Field>
                      <div>
                        <label style={A.label}>Culoare</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <input
                            type="color"
                            value={String(d.color ?? '#2B8FCC')}
                            onChange={(e) => patchDraft(id, 'color', e.target.value)}
                            style={{ width: 42, height: 42, padding: 3, border: '1px solid #E2E8F0', borderRadius: 8, cursor: 'pointer' }}
                          />
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: '#64748B' }}>
                            {d.color ?? '#2B8FCC'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <Field label="Descriere">
                        <Textarea value={String(d.description ?? '')} onChange={(v) => patchDraft(id, 'description', v)} placeholder="Descriere scurta..." rows={2} />
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
