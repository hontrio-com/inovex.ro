'use client'

import { useEffect, useState } from 'react'
import { AdminHeader, A } from '@/app/admin/_components/AdminPage'
import { Check, X, Trash2 } from 'lucide-react'
import type { LearnComment } from '@/types/learn'

const fmt = new Intl.DateTimeFormat('ro-RO', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })

function formatDate(d: string): string {
  try { return fmt.format(new Date(d)) } catch { return d }
}

export default function LearnCommentsAdminPage() {
  const [items, setItems] = useState<LearnComment[]>([])
  const [loading, setLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  function load() {
    const url = showAll
      ? '/api/admin/learn/comments?perPage=100'
      : '/api/admin/learn/comments?approved=false&perPage=100'
    fetch(url)
      .then((r) => r.json())
      .then((d: { items?: LearnComment[] }) => setItems(d.items ?? []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [showAll]) // eslint-disable-line react-hooks/exhaustive-deps

  async function approve(id: string) {
    setActionLoading(id)
    await fetch(`/api/admin/learn/comments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ approved: true }),
    })
    setItems((prev) => prev.filter((c) => c.id !== id || showAll))
    setItems((prev) => prev.map((c) => c.id === id ? { ...c, approved: true } : c))
    setActionLoading(null)
  }

  async function reject(id: string) {
    setActionLoading(id)
    await fetch(`/api/admin/learn/comments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ approved: false }),
    })
    setItems((prev) => prev.map((c) => c.id === id ? { ...c, approved: false } : c))
    setActionLoading(null)
  }

  async function remove(id: string) {
    if (!confirm('Stergi acest comentariu?')) return
    setActionLoading(id)
    await fetch(`/api/admin/learn/comments/${id}`, { method: 'DELETE' })
    setItems((prev) => prev.filter((c) => c.id !== id))
    setActionLoading(null)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <AdminHeader
        title="Moderare Comentarii"
        desc="Aproba sau sterge comentariile din sectiunea Invata Gratuit."
        action={
          <button
            style={{
              ...A.btnOutline,
              background: showAll ? '#2B8FCC' : '#fff',
              color: showAll ? '#fff' : '#374151',
              border: showAll ? '2px solid #2B8FCC' : '1px solid #E2E8F0',
            }}
            onClick={() => setShowAll((v) => !v)}
          >
            {showAll ? 'Arata neaprobate' : 'Arata toate'}
          </button>
        }
      />

      <div style={{ padding: '0 32px 40px' }}>
        {loading && (
          <div style={{ textAlign: 'center', padding: '40px', fontFamily: 'var(--font-body)', color: '#94A3B8' }}>
            Se incarca...
          </div>
        )}

        {!loading && items.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', fontFamily: 'var(--font-body)', color: '#94A3B8' }}>
            {showAll ? 'Niciun comentariu.' : 'Niciun comentariu in asteptare. '}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {items.map((comment) => (
            <div
              key={comment.id}
              style={{
                background: '#fff',
                border: '1px solid #E2E8F0',
                borderRadius: 12,
                padding: '16px',
                borderLeft: `4px solid ${comment.approved ? '#10B981' : '#F59E0B'}`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.875rem', color: '#0F172A' }}>
                      {comment.author_name}
                    </span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#94A3B8' }}>
                      {comment.author_email}
                    </span>
                    <span
                      style={{
                        padding: '2px 7px', borderRadius: 4,
                        background: comment.approved ? '#ECFDF5' : '#FFFBEB',
                        color: comment.approved ? '#065F46' : '#92400E',
                        fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase',
                      }}
                    >
                      {comment.approved ? 'Aprobat' : 'In asteptare'}
                    </span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#94A3B8', marginLeft: 'auto' }}>
                      {formatDate(comment.created_at)}
                    </span>
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#374151', lineHeight: 1.6, margin: 0 }}>
                    {comment.content}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                  {!comment.approved && (
                    <button
                      onClick={() => approve(comment.id)}
                      disabled={actionLoading === comment.id}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 5,
                        padding: '6px 12px', borderRadius: 8,
                        border: 'none', background: '#ECFDF5', color: '#10B981',
                        fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.8125rem',
                        cursor: 'pointer',
                      }}
                    >
                      <Check size={13} /> Aproba
                    </button>
                  )}
                  {comment.approved && (
                    <button
                      onClick={() => reject(comment.id)}
                      disabled={actionLoading === comment.id}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 5,
                        padding: '6px 12px', borderRadius: 8,
                        border: 'none', background: '#FFFBEB', color: '#92400E',
                        fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.8125rem',
                        cursor: 'pointer',
                      }}
                    >
                      <X size={13} /> Respinge
                    </button>
                  )}
                  <button
                    onClick={() => remove(comment.id)}
                    disabled={actionLoading === comment.id}
                    style={A.btnDanger}
                    title="Sterge"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
