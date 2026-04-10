'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, ChevronRight } from 'lucide-react'

const FEATURES = [
  { id: 'plati',      label: 'Plati online' },
  { id: 'curierat',   label: 'Curierat integrat' },
  { id: 'facturare',  label: 'Facturare automata' },
  { id: 'blog',       label: 'Blog' },
  { id: 'fidelitate', label: 'Program fidelitate' },
  { id: 'multilingv', label: 'Multilingv' },
]

const PLATFORMS = [
  { value: 'woocommerce',   label: 'WooCommerce' },
  { value: 'shopify',       label: 'Shopify' },
  { value: 'custom',        label: 'Custom (la comanda)' },
  { value: 'no_preference', label: 'Fara preferinta' },
]

const URGENCY = [
  { value: 'sub1',    label: 'Sub 1 luna' },
  { value: '1_3',     label: '1-3 luni' },
  { value: 'peste3',  label: 'Peste 3 luni' },
  { value: 'unknown', label: 'Nu stiu' },
]

type Complexity = 'Simpla' | 'Medie' | 'Complexa' | 'Enterprise'

function calcComplexity(products: number, featuresCount: number): { level: Complexity; description: string } {
  if (products > 1000 || featuresCount >= 5) {
    return {
      level: 'Enterprise',
      description: 'Proiectul tau necesita o solutie enterprise cu arhitectura scalabila, integrari complexe si suport dedicat.',
    }
  }
  if (products > 200 || featuresCount >= 3) {
    return {
      level: 'Complexa',
      description: 'Magazinul tau are nevoie de o platforma robusta, cu multiple integrari si functionalitati avansate.',
    }
  }
  if (products > 50 || featuresCount >= 2) {
    return {
      level: 'Medie',
      description: 'Un magazin cu functionalitati medii, potrivit pentru afaceri in crestere care au nevoie de mai mult decat basic.',
    }
  }
  return {
    level: 'Simpla',
    description: 'Un magazin online de baza, ideal pentru a incepe. Rapid de lansat, usor de administrat.',
  }
}

const COMPLEXITY_COLORS: Record<Complexity, { bg: string; color: string }> = {
  Simpla:    { bg: '#ECFDF5', color: '#065F46' },
  Medie:     { bg: '#EFF6FF', color: '#1E40AF' },
  Complexa:  { bg: '#FFF7ED', color: '#9A3412' },
  Enterprise: { bg: '#F5F3FF', color: '#5B21B6' },
}

export function CostCalculatorMagazin() {
  const [products, setProducts] = useState(100)
  const [features, setFeatures] = useState<string[]>([])
  const [platform, setPlatform] = useState('')
  const [urgency, setUrgency] = useState('')
  const [showResult, setShowResult] = useState(false)

  function toggleFeature(id: string) {
    setFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    )
  }

  const canCompute = platform !== '' && urgency !== ''
  const result = calcComplexity(products, features.length)
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
          <ShoppingCart size={20} className="text-[#2B8FCC]" />
        </div>
        <div>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.125rem', color: '#0D1117' }}>
            Calculator Complexitate Magazin
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: '#8A94A6' }}>
            Estimeaza complexitatea proiectului tau
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Nr produse */}
        <div>
          <label style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9rem', color: '#374151', display: 'block', marginBottom: 8 }}>
            Numar de produse: <span style={{ color: '#2B8FCC', fontWeight: 700 }}>{products.toLocaleString('ro-RO')}</span>
          </label>
          <input
            type="range"
            min={1}
            max={5000}
            value={products}
            onChange={(e) => setProducts(parseInt(e.target.value, 10))}
            style={{ width: '100%', accentColor: '#2B8FCC' }}
          />
          <div className="flex justify-between mt-1">
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#8A94A6' }}>1</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#8A94A6' }}>5.000</span>
          </div>
          <div className="flex gap-2 mt-2 flex-wrap">
            {[10, 50, 200, 500, 1000, 2000].map((n) => (
              <button
                key={n}
                onClick={() => setProducts(n)}
                style={{
                  padding: '3px 10px',
                  borderRadius: 999,
                  border: products === n ? '2px solid #2B8FCC' : '1px solid #E8ECF0',
                  background: products === n ? '#EAF5FF' : '#fff',
                  color: products === n ? '#2B8FCC' : '#4A5568',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  fontSize: '0.8125rem',
                  cursor: 'pointer',
                }}
              >
                {n.toLocaleString('ro-RO')}
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
              <label
                key={f.id}
                className="flex items-center gap-2.5 cursor-pointer"
              >
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

        {/* Platforma */}
        <div>
          <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9rem', color: '#374151', marginBottom: 10 }}>
            Platforma preferata
          </p>
          <div className="grid grid-cols-2 gap-2">
            {PLATFORMS.map((p) => (
              <button
                key={p.value}
                onClick={() => setPlatform(p.value)}
                style={{
                  padding: '10px 14px',
                  borderRadius: 10,
                  border: platform === p.value ? '2px solid #2B8FCC' : '1px solid #E8ECF0',
                  background: platform === p.value ? '#EAF5FF' : '#F8FAFB',
                  color: platform === p.value ? '#2B8FCC' : '#4A5568',
                  fontFamily: 'var(--font-body)',
                  fontWeight: platform === p.value ? 700 : 500,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 150ms ease',
                }}
              >
                {p.label}
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

        {/* Compute button */}
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

        {/* Result */}
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
              href="/configurare-magazin-online"
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
