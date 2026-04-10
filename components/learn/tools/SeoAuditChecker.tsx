'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, CheckCircle, XCircle, Loader2, ChevronRight } from 'lucide-react'
import type { SeoCheckResult } from '@/app/api/learn/seo-check/route'

export function SeoAuditChecker() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<SeoCheckResult[] | null>(null)
  const [score, setScore] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleCheck(e: React.FormEvent) {
    e.preventDefault()
    if (!url.trim()) return

    setLoading(true)
    setError(null)
    setResults(null)
    setScore(null)

    try {
      // Ensure URL has protocol
      const fullUrl = url.startsWith('http') ? url : `https://${url}`
      const res = await fetch('/api/learn/seo-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: fullUrl }),
      })
      const data = await res.json() as { results?: SeoCheckResult[]; score?: number; error?: string }
      if (!res.ok) {
        setError(data.error ?? 'Eroare la verificare')
        return
      }
      setResults(data.results ?? [])
      setScore(data.score ?? 0)
    } catch {
      setError('Eroare de retea. Verifica URL-ul si incearca din nou.')
    } finally {
      setLoading(false)
    }
  }

  function getScoreColor(s: number): string {
    if (s >= 80) return '#10B981'
    if (s >= 50) return '#F59E0B'
    return '#EF4444'
  }

  function getScoreLabel(s: number): string {
    if (s >= 80) return 'Bun'
    if (s >= 50) return 'Mediu'
    return 'Slab'
  }

  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #E8ECF0',
        borderRadius: 20,
        padding: 32,
        boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
      }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#EAF5FF' }}>
          <Search size={20} className="text-[#2B8FCC]" />
        </div>
        <div>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.125rem', color: '#0D1117' }}>
            Verificare SEO Rapida
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: '#8A94A6' }}>
            Analizeaza elementele SEO de baza ale oricarui site web
          </p>
        </div>
      </div>

      <form onSubmit={handleCheck} className="flex gap-3 mb-6">
        <Input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="exemplu: https://site-ul-tau.ro"
          style={{ fontFamily: 'var(--font-body)' }}
          className="flex-1"
        />
        <Button
          type="submit"
          loading={loading}
          leftIcon={loading ? <Loader2 size={15} className="animate-spin" /> : <Search size={15} />}
          style={{ background: '#2B8FCC', fontFamily: 'var(--font-body)', flexShrink: 0 }}
        >
          Verifica
        </Button>
      </form>

      {error && (
        <div
          style={{
            background: '#FFF5F5',
            border: '1px solid #FECACA',
            borderRadius: 10,
            padding: '12px 16px',
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            color: '#EF4444',
            marginBottom: 16,
          }}
        >
          {error}
        </div>
      )}

      {results && score !== null && (
        <div>
          {/* Score */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: '16px 20px',
              background: '#F8FAFB',
              borderRadius: 12,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                border: `4px solid ${getScoreColor(score)}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '1.25rem',
                  color: getScoreColor(score),
                }}
              >
                {score}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: '#0D1117',
                  }}
                >
                  Scor SEO:
                </span>
                <Badge
                  style={{
                    background: getScoreColor(score),
                    color: '#fff',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 700,
                  }}
                >
                  {getScoreLabel(score)}
                </Badge>
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#4A5568' }}>
                {results.filter((r) => r.passed).length} din {results.length} verificari au trecut.
              </p>
            </div>
          </div>

          {/* Checks list */}
          <div className="space-y-3">
            {results.map((check) => (
              <div
                key={check.id}
                style={{
                  display: 'flex',
                  gap: 12,
                  padding: '12px 16px',
                  borderRadius: 10,
                  border: '1px solid',
                  borderColor: check.passed ? '#6EE7B733' : '#FECACA',
                  background: check.passed ? '#ECFDF5' : '#FFF5F5',
                }}
              >
                <div className="shrink-0 mt-0.5">
                  {check.passed
                    ? <CheckCircle size={18} className="text-[#10B981]" />
                    : <XCircle size={18} className="text-[#EF4444]" />
                  }
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 700,
                      fontSize: '0.875rem',
                      color: '#0D1117',
                      marginBottom: 2,
                    }}
                  >
                    {check.label}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.8125rem',
                      color: '#4A5568',
                      lineHeight: 1.6,
                    }}
                  >
                    {check.recommendation}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            style={{
              marginTop: 24,
              padding: '20px 24px',
              background: 'linear-gradient(135deg, #EAF5FF 0%, #F0FAFB 100%)',
              border: '1px solid #C8E6F8',
              borderRadius: 14,
              textAlign: 'center',
            }}
          >
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: '#0D1117', marginBottom: 8 }}>
              Vrei un audit SEO complet?
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#4A5568', marginBottom: 14 }}>
              Analizele noastre manuale identifica zeci de probleme pe care tool-urile automate le rateza.
            </p>
            <Button
              href="/contact"
              rightIcon={<ChevronRight size={15} />}
              style={{ background: '#2B8FCC', fontFamily: 'var(--font-body)' }}
            >
              Solicita audit SEO
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
