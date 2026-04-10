'use client'

import { useEffect, useState } from 'react'
import { AdminHeader, A } from '@/app/admin/_components/AdminPage'
import { Download } from 'lucide-react'
import type { LearnLead } from '@/types/learn'

const fmt = new Intl.DateTimeFormat('ro-RO', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })

function formatDate(d: string | null): string {
  if (!d) return '-'
  try { return fmt.format(new Date(d)) } catch { return d }
}

export default function LearnLeadsAdminPage() {
  const [items, setItems] = useState<LearnLead[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const PER_PAGE = 50

  useEffect(() => {
    setLoading(true)
    fetch(`/api/admin/learn/leads?page=${page}&perPage=${PER_PAGE}`)
      .then((r) => r.json())
      .then((d: { items?: LearnLead[]; total?: number }) => {
        setItems(d.items ?? [])
        setTotal(d.total ?? 0)
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [page])

  function exportCsv() {
    const header = 'Nume,Email,Resursa,Data\n'
    const rows = items.map((l) =>
      [
        `"${l.name.replace(/"/g, '""')}"`,
        `"${l.email}"`,
        `"${(l.resource_title ?? '').replace(/"/g, '""')}"`,
        `"${formatDate(l.created_at)}"`,
      ].join(',')
    )
    const csv = header + rows.join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `leads-inovex-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const totalPages = Math.ceil(total / PER_PAGE)

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <AdminHeader
        title="Lead-uri - Descarcari"
        desc={`${total} lead-uri colectate din resursele gratuite.`}
        action={
          <button
            style={{ ...A.btnPrimary, background: '#10B981' }}
            onClick={exportCsv}
            disabled={items.length === 0}
          >
            <Download size={15} />
            Exporta CSV
          </button>
        }
      />

      <div style={{ padding: '0 32px 40px', overflowX: 'auto' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', fontFamily: 'var(--font-body)', color: '#94A3B8' }}>
            Se incarca...
          </div>
        ) : items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', fontFamily: 'var(--font-body)', color: '#94A3B8' }}>
            Niciun lead inregistrat inca.
          </div>
        ) : (
          <>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-body)', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ background: '#F1F5F9' }}>
                  {['Nume', 'Email', 'Resursa', 'GDPR', 'Data'].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: '10px 14px', textAlign: 'left',
                        fontWeight: 700, color: '#374151',
                        border: '1px solid #E2E8F0',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((lead, idx) => (
                  <tr key={lead.id} style={{ background: idx % 2 === 0 ? '#fff' : '#FAFBFC' }}>
                    <td style={{ padding: '10px 14px', border: '1px solid #E2E8F0', color: '#0F172A', fontWeight: 600 }}>
                      {lead.name}
                    </td>
                    <td style={{ padding: '10px 14px', border: '1px solid #E2E8F0', color: '#2B8FCC' }}>
                      <a href={`mailto:${lead.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {lead.email}
                      </a>
                    </td>
                    <td style={{ padding: '10px 14px', border: '1px solid #E2E8F0', color: '#4A5568', maxWidth: 280 }}>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
                        {lead.resource_title ?? '-'}
                      </span>
                    </td>
                    <td style={{ padding: '10px 14px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
                      <span
                        style={{
                          padding: '2px 8px', borderRadius: 4,
                          background: lead.gdpr_consent ? '#ECFDF5' : '#FFF5F5',
                          color: lead.gdpr_consent ? '#065F46' : '#DC2626',
                          fontWeight: 700, fontSize: '0.7rem',
                        }}
                      >
                        {lead.gdpr_consent ? 'DA' : 'NU'}
                      </span>
                    </td>
                    <td style={{ padding: '10px 14px', border: '1px solid #E2E8F0', color: '#64748B', whiteSpace: 'nowrap' }}>
                      {formatDate(lead.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 16 }}>
                <button
                  style={A.btnOutline}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                >
                  Anterior
                </button>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#64748B', lineHeight: '38px' }}>
                  {page} / {totalPages}
                </span>
                <button
                  style={A.btnOutline}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                >
                  Urmator
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
