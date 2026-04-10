'use client'

import { useState, useEffect } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { RotateCcw, Copy, Check, ShoppingCart } from 'lucide-react'

interface ChecklistItem {
  id: string
  text: string
  category: string
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  // Design
  { id: 'design_1', category: 'Design', text: 'Logo si identitate vizuala finalizata' },
  { id: 'design_2', category: 'Design', text: 'Paleta de culori si fonturi alese' },
  { id: 'design_3', category: 'Design', text: 'Design homepage aprobat' },
  { id: 'design_4', category: 'Design', text: 'Design pagina produs aprobat' },
  { id: 'design_5', category: 'Design', text: 'Mobile responsive verificat' },
  // Produse
  { id: 'produse_1', category: 'Produse', text: 'Toate produsele adaugate in catalog' },
  { id: 'produse_2', category: 'Produse', text: 'Fotografii produse de calitate' },
  { id: 'produse_3', category: 'Produse', text: 'Descrieri produse complete si SEO' },
  { id: 'produse_4', category: 'Produse', text: 'Preturi si stocuri configurate' },
  { id: 'produse_5', category: 'Produse', text: 'Categorii si filtre create' },
  { id: 'produse_6', category: 'Produse', text: 'Variante produse (marime, culoare) testate' },
  // Plati
  { id: 'plati_1', category: 'Plati', text: 'Gateway de plata integrat si testat' },
  { id: 'plati_2', category: 'Plati', text: 'Plata cu cardul functionala' },
  { id: 'plati_3', category: 'Plati', text: 'Ramburs la livrare configurat' },
  { id: 'plati_4', category: 'Plati', text: 'Emailuri de confirmare comanda active' },
  // Curierat
  { id: 'curierat_1', category: 'Curierat', text: 'Integrat cu firma de curierat' },
  { id: 'curierat_2', category: 'Curierat', text: 'Costuri de livrare configurate' },
  { id: 'curierat_3', category: 'Curierat', text: 'Livrare gratuita (prag setat)' },
  { id: 'curierat_4', category: 'Curierat', text: 'Tracking livrat clientilor' },
  // SEO
  { id: 'seo_1', category: 'SEO', text: 'Google Analytics 4 instalat' },
  { id: 'seo_2', category: 'SEO', text: 'Google Search Console configurat' },
  { id: 'seo_3', category: 'SEO', text: 'Sitemap XML generat si trimis' },
  { id: 'seo_4', category: 'SEO', text: 'Meta title si description setate' },
  { id: 'seo_5', category: 'SEO', text: 'Schema markup produs activ' },
  // Legal
  { id: 'legal_1', category: 'Legal', text: 'Termeni si conditii publicate' },
  { id: 'legal_2', category: 'Legal', text: 'Politica de confidentialitate' },
  { id: 'legal_3', category: 'Legal', text: 'Politica retur si garantii' },
  { id: 'legal_4', category: 'Legal', text: 'Banner GDPR / cookies activ' },
  // Marketing
  { id: 'marketing_1', category: 'Marketing', text: 'Facebook Pixel instalat' },
  { id: 'marketing_2', category: 'Marketing', text: 'Google Ads tag configurat' },
  { id: 'marketing_3', category: 'Marketing', text: 'Newsletter integrat' },
  { id: 'marketing_4', category: 'Marketing', text: 'Pagina Facebook / Instagram creata' },
  { id: 'marketing_5', category: 'Marketing', text: 'Prima campanie de marketing pregatita' },
]

const CATEGORIES = Array.from(new Set(CHECKLIST_ITEMS.map((i) => i.category)))
const STORAGE_KEY = 'inovex_checklist_magazin'

const CATEGORY_COLORS: Record<string, string> = {
  Design:     '#8B5CF6',
  Produse:    '#2B8FCC',
  Plati:      '#10B981',
  Curierat:   '#F59E0B',
  SEO:        '#EF4444',
  Legal:      '#6366F1',
  Marketing:  '#EC4899',
}

export function ChecklistLansareMagazin() {
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [copied, setCopied] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setChecked(JSON.parse(stored) as Record<string, boolean>)
    } catch { /* ignore */ }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checked))
    } catch { /* ignore */ }
  }, [checked, hydrated])

  function toggle(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  function reset() {
    setChecked({})
  }

  async function exportAsText() {
    const lines: string[] = ['CHECKLIST LANSARE MAGAZIN ONLINE - Inovex.ro', '']
    for (const cat of CATEGORIES) {
      lines.push(`## ${cat}`)
      const items = CHECKLIST_ITEMS.filter((i) => i.category === cat)
      for (const item of items) {
        lines.push(`${checked[item.id] ? '[x]' : '[ ]'} ${item.text}`)
      }
      lines.push('')
    }
    const total = CHECKLIST_ITEMS.length
    const done = CHECKLIST_ITEMS.filter((i) => checked[i.id]).length
    lines.push(`Progres: ${done}/${total} (${Math.round((done / total) * 100)}%)`)

    try {
      await navigator.clipboard.writeText(lines.join('\n'))
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch { /* ignore */ }
  }

  const totalItems = CHECKLIST_ITEMS.length
  const checkedCount = CHECKLIST_ITEMS.filter((i) => checked[i.id]).length
  const overallProgress = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0

  if (!hydrated) {
    return (
      <div className="flex items-center justify-center py-16">
        <span style={{ fontFamily: 'var(--font-body)', color: '#8A94A6' }}>Se incarca...</span>
      </div>
    )
  }

  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #E8ECF0',
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
      }}
    >
      {/* Header */}
      <div style={{ padding: '24px 28px', borderBottom: '1px solid #E8ECF0', background: '#FAFBFC' }}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#EAF5FF' }}>
              <ShoppingCart size={20} className="text-[#2B8FCC]" />
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.125rem', color: '#0D1117' }}>
                Checklist Lansare Magazin Online
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: '#8A94A6' }}>
                {checkedCount} din {totalItems} bifate
              </p>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={exportAsText}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '7px 14px', borderRadius: 8,
                border: '1px solid #E8ECF0', background: '#fff',
                fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.8125rem',
                color: copied ? '#10B981' : '#4A5568', cursor: 'pointer',
              }}
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? 'Copiat!' : 'Exporta'}
            </button>
            <button
              onClick={reset}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '7px 14px', borderRadius: 8,
                border: '1px solid #FECACA', background: '#FFF5F5',
                fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.8125rem',
                color: '#EF4444', cursor: 'pointer',
              }}
            >
              <RotateCcw size={13} />
              Reset
            </button>
          </div>
        </div>

        {/* Overall progress */}
        <div className="mt-4">
          <div className="flex justify-between mb-1.5">
            <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.8125rem', color: '#374151' }}>
              Progres general
            </span>
            <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.8125rem', color: '#2B8FCC' }}>
              {overallProgress}%
            </span>
          </div>
          <div style={{ background: '#E8ECF0', borderRadius: 999, height: 8, overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${overallProgress}%`,
                background: overallProgress === 100 ? '#10B981' : '#2B8FCC',
                borderRadius: 999,
                transition: 'width 300ms ease',
              }}
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div style={{ padding: '20px 28px' }} className="space-y-8">
        {CATEGORIES.map((cat) => {
          const catItems = CHECKLIST_ITEMS.filter((i) => i.category === cat)
          const catChecked = catItems.filter((i) => checked[i.id]).length
          const catProgress = Math.round((catChecked / catItems.length) * 100)
          const catColor = CATEGORY_COLORS[cat] ?? '#2B8FCC'

          return (
            <div key={cat}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span
                    style={{
                      display: 'inline-block',
                      width: 10,
                      height: 10,
                      borderRadius: 3,
                      background: catColor,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '0.9375rem',
                      color: '#0D1117',
                    }}
                  >
                    {cat}
                  </span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#8A94A6' }}>
                    {catChecked}/{catItems.length}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 700,
                    fontSize: '0.8125rem',
                    color: catColor,
                  }}
                >
                  {catProgress}%
                </span>
              </div>

              {/* Category progress bar */}
              <div style={{ background: '#F0F4F8', borderRadius: 999, height: 4, marginBottom: 12 }}>
                <div
                  style={{
                    height: '100%',
                    width: `${catProgress}%`,
                    background: catProgress === 100 ? '#10B981' : catColor,
                    borderRadius: 999,
                    transition: 'width 300ms ease',
                  }}
                />
              </div>

              <div className="space-y-2.5">
                {catItems.map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <Checkbox
                      checked={!!checked[item.id]}
                      onCheckedChange={() => toggle(item.id)}
                    />
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9rem',
                        color: checked[item.id] ? '#8A94A6' : '#374151',
                        textDecoration: checked[item.id] ? 'line-through' : 'none',
                        transition: 'color 150ms ease',
                      }}
                    >
                      {item.text}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer CTA */}
      {overallProgress === 100 && (
        <div
          style={{
            margin: '0 28px 28px',
            background: 'linear-gradient(135deg, #EAF5FF 0%, #F0FAFB 100%)',
            border: '1px solid #C8E6F8',
            borderRadius: 14,
            padding: '20px 24px',
            textAlign: 'center',
          }}
        >
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: '#0D1117', marginBottom: 8 }}>
            Felicitari! Esti gata de lansare.
          </p>
          <Button
            href="/contact"
            style={{ background: '#2B8FCC', fontFamily: 'var(--font-body)' }}
          >
            Contacteaza-ne pentru suport
          </Button>
        </div>
      )}
    </div>
  )
}
