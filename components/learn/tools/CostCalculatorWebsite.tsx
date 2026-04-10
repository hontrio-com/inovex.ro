'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Globe, ChevronRight } from 'lucide-react'

const FEATURES = [
  { id: 'blog',        label: 'Blog' },
  { id: 'contact',     label: 'Formular contact' },
  { id: 'galerie',     label: 'Galerie foto' },
  { id: 'multilingv',  label: 'Multilingv' },
  { id: 'rezervari',   label: 'Rezervari online' },
  { id: 'chat',        label: 'Chat live' },
  { id: 'seo_avansat', label: 'SEO avansat' },
]

const SITE_TYPES = [
  { value: 'simpla',    label: 'Prezentare simpla' },
  { value: 'avansata',  label: 'Prezentare avansata' },
  { value: 'landing',   label: 'Landing page' },
  { value: 'portal',    label: 'Portal web' },
]

const URGENCY = [
  { value: 'sub1',    label: 'Sub 1 luna' },
  { value: '1_3',     label: '1-3 luni' },
  { value: 'peste3',  label: 'Peste 3 luni' },
  { value: 'unknown', label: 'Nu stiu' },
]

type Complexity = 'Simpla' | 'Medie' | 'Complexa' | 'Enterprise'

function calcComplexity(pages: number, featuresCount: number, siteType: string): { level: Complexity; description: string } {
  const isPortal = siteType === 'portal'
  if (isPortal || pages > 30 || featuresCount >= 5) {
    return {
      level: 'Enterprise',
      description: 'Proiectul tau este un portal web complex care necesita o arhitectura speciala, integrari multiple si o echipa dedicata.',
    }
  }
  if (pages > 15 || featuresCount >= 3 || siteType === 'avansata') {
    return {
      level: 'Complexa',
      description: 'Un website de prezentare avansat cu mai multe sectiuni, functionalitati si integrari. Potrivit pentru companii in crestere.',
    }
  }
  if (pages > 5 || featuresCount >= 2) {
    return {
      level: 'Medie',
      description: 'Un website de prezentare mediu, cu mai multe pagini si cateva functionalitati specifice afacerii tale.',
    }
  }
  return {
    level: 'Simpla',
    description: 'Un website de prezentare simplu, rapid de realizat si usor de administrat. Ideal pentru incepatori.',
  }
}

const COMPLEXITY_COLORS: Record<Complexity, { bg: string; color: string }> = {
  Simpla:    { bg: '#ECFDF5', color: '#065F46' },
  Medie:     { bg: '#EFF6FF', color: '#1E40AF' },
  Complexa:  { bg: '#FFF7ED', color: '#9A3412' },
  Enterprise: { bg: '#F5F3FF', color: '#5B21B6' },
}

export function CostCalculatorWebsite() {
  const [pages, setPages] = useState(5)
  const [features, setFeatures] = useState<string[]>([])
  const [siteType, setSiteType] = useState('')
  const [urgency, setUrgency] = useState('')
  const [showResult, setShowResult] = useState(false)

  function toggleFeature(id: string) {
    setFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    )
  }

  const canCompute = siteType !== '' && urgency !== ''
  const result = calcComplexity(pages, features.length, siteType)
  const colorConf = COMPLEXITY_COLORS[result.level]

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
          <Globe size={20} className="text-[#2B8FCC]" />
        </div>
        <div>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.125rem', color: '#0D1117' }}>
            Calculator Complexitate Website
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: '#8A94A6' }}>
            Estimeaza complexitatea proiectului tau
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Nr pagini */}
        <div>
          <label style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9rem', color: '#374151', display: 'block', marginBottom: 8 }}>
            Numar de pagini: <span style={{ color: '#2B8FCC', fontWeight: 700 }}>{pages}</span>
          </label>
          <input
            type="range"
            min={1}
            max={50}
            value={pages}
            onChange={(e) => setPages(parseInt(e.target.value, 10))}
            style={{ width: '100%', accentColor: '#2B8FCC' }}
          />
          <div className="flex justify-between mt-1">
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#8A94A6' }}>1</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#8A94A6' }}>50</span>
          </div>
          <div className="flex gap-2 mt-2 flex-wrap">
            {[1, 3, 5, 10, 20, 50].map((n) => (
              <button
                key={n}
                onClick={() => setPages(n)}
                style={{
                  padding: '3px 10px',
                  borderRadius: 999,
                  border: pages === n ? '2px solid #2B8FCC' : '1px solid #E8ECF0',
                  background: pages === n ? '#EAF5FF' : '#fff',
                  color: pages === n ? '#2B8FCC' : '#4A5568',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  fontSize: '0.8125rem',
                  cursor: 'pointer',
                }}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Functionalitati */}
        <div>
          <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9rem', color: '#374151', marginBottom: 12 }}>
            Functionalitati dorite
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {FEATURES.map((f) => (
              <label key={f.id} className="flex items-center gap-2.5 cursor-pointer">
                <Checkbox
                  checked={features.includes(f.id)}
                  onCheckedChange={() => toggleFeature(f.id)}
                />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#374151' }}>
                  {f.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Tip site */}
        <div>
          <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9rem', color: '#374151', marginBottom: 10 }}>
            Tipul site-ului
          </p>
          <div className="grid grid-cols-2 gap-2">
            {SITE_TYPES.map((s) => (
              <button
                key={s.value}
                onClick={() => setSiteType(s.value)}
                style={{
                  padding: '10px 14px',
                  borderRadius: 10,
                  border: siteType === s.value ? '2px solid #2B8FCC' : '1px solid #E8ECF0',
                  background: siteType === s.value ? '#EAF5FF' : '#F8FAFB',
                  color: siteType === s.value ? '#2B8FCC' : '#4A5568',
                  fontFamily: 'var(--font-body)',
                  fontWeight: siteType === s.value ? 700 : 500,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 150ms ease',
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Urgenta */}
        <div>
          <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9rem', color: '#374151', marginBottom: 10 }}>
            Urgenta proiectului
          </p>
          <div className="grid grid-cols-2 gap-2">
            {URGENCY.map((u) => (
              <button
                key={u.value}
                onClick={() => setUrgency(u.value)}
                style={{
                  padding: '10px 14px',
                  borderRadius: 10,
                  border: urgency === u.value ? '2px solid #2B8FCC' : '1px solid #E8ECF0',
                  background: urgency === u.value ? '#EAF5FF' : '#F8FAFB',
                  color: urgency === u.value ? '#2B8FCC' : '#4A5568',
                  fontFamily: 'var(--font-body)',
                  fontWeight: urgency === u.value ? 700 : 500,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 150ms ease',
                }}
              >
                {u.label}
              </button>
            ))}
          </div>
        </div>

        {!showResult && (
          <Button
            onClick={() => { if (canCompute) setShowResult(true) }}
            disabled={!canCompute}
            className="w-full"
            style={{ height: 46, fontFamily: 'var(--font-body)', fontSize: '0.9375rem' }}
          >
            Calculeaza complexitatea
          </Button>
        )}

        {showResult && (
          <div
            style={{
              background: colorConf.bg,
              border: `2px solid ${colorConf.color}33`,
              borderRadius: 14,
              padding: 24,
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Badge
                style={{
                  background: colorConf.color,
                  color: '#fff',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  padding: '4px 12px',
                }}
              >
                Complexitate: {result.level}
              </Badge>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#374151', lineHeight: 1.7 }}>
              {result.description}
            </p>
            <Button
              href="/configurare-website-prezentare"
              className="mt-4"
              rightIcon={<ChevronRight size={15} />}
              style={{ background: '#2B8FCC', fontFamily: 'var(--font-body)' }}
            >
              Solicita oferta personalizata
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
