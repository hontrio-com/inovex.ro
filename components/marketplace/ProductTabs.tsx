'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Check, AlertCircle, X } from 'lucide-react';
import type { MarketplaceProduct } from '@/types/marketplace';

const TABS = [
  { id: 'pagini',   label: 'Pagini incluse' },
  { id: 'features', label: 'Functionalitati' },
  { id: 'specs',    label: 'Specificatii tehnice' },
  { id: 'exclude',  label: 'Ce NU include' },
] as const;

type TabId = typeof TABS[number]['id'];

interface Props { product: MarketplaceProduct }

const EASE: [number,number,number,number] = [0.4, 0, 0.2, 1];

export function ProductTabs({ product }: Props) {
  const [active, setActive] = useState<TabId>('pagini');

  return (
    <div>
      {/* Tab bar */}
      <div style={{
        display: 'flex', gap: 0, borderBottom: '1px solid #E8ECF0',
        overflowX: 'auto', scrollbarWidth: 'none',
      }}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            style={{
              flexShrink: 0, padding: '12px 16px', border: 'none', background: 'transparent',
              fontFamily: 'var(--font-body)', fontWeight: active === tab.id ? 600 : 400,
              fontSize: 14, cursor: 'pointer', whiteSpace: 'nowrap',
              color: active === tab.id ? '#2B8FCC' : '#6B7280',
              borderBottom: active === tab.id ? '2px solid #2B8FCC' : '2px solid transparent',
              marginBottom: -1,
              transition: 'color 150ms ease, border-color 150ms ease',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Continut */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.18, ease: EASE }}
          style={{ paddingTop: 24 }}
        >
          {/* TAB 1 — Pagini incluse */}
          {active === 'pagini' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
              {product.includedPages.map((pg, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <FileText size={16} color="#2B8FCC" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14, color: '#0D1117', marginBottom: 3 }}>
                      {pg.pageName}
                    </p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#4A5568', lineHeight: 1.5 }}>
                      {pg.pageDescription}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2 — Functionalitati */}
          {active === 'features' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {product.includedFeatures.map((cat, ci) => (
                <div key={ci}>
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.07em', color: '#9CA3AF',
                    marginBottom: 10,
                  }}>
                    {cat.category}
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 8 }}>
                    {cat.features.map((f, fi) => (
                      <div key={fi} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                        <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: 2 }} />
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500, color: '#1A202C' }}>
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3 — Specificatii tehnice */}
          {active === 'specs' && (
            <div>
              <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #F0F2F5' }}>
                {[
                  { label: 'Platforma', value: product.techSpecs.platform },
                  { label: 'PHP minim', value: product.techSpecs.phpVersion ?? 'N/A' },
                  { label: 'Cerinte hosting', value: product.techSpecs.hostingRequirements },
                  { label: 'Browsere', value: product.techSpecs.browserCompatibility },
                  { label: 'Limba', value: product.techSpecs.language },
                ].map((row, i) => (
                  <div key={i} style={{
                    display: 'flex', padding: '12px 16px',
                    background: i % 2 === 0 ? '#F8FAFB' : '#fff',
                    borderBottom: i < 4 ? '1px solid #F0F2F5' : 'none',
                  }}>
                    <span style={{ flex: '0 0 160px', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: '#6B7280' }}>
                      {row.label}
                    </span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#0D1117' }}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Tehnologii */}
              <div style={{ marginTop: 20 }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: '#6B7280', marginBottom: 10 }}>
                  Tehnologii
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {product.techSpecs.technologies.map((tech) => (
                    <span key={tech} style={{
                      background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 6,
                      padding: '5px 12px', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 13, color: '#2B8FCC',
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4 — Ce NU include */}
          {active === 'exclude' && (
            <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 12, padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <AlertCircle size={18} color="#F59E0B" />
                <p style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 15, color: '#92400E' }}>
                  Transparenta completa
                </p>
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#78350F', marginBottom: 20, lineHeight: 1.6 }}>
                Inainte de a cumpara, citeste ce nu este inclus in acest produs.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {product.notIncluded.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <X size={14} color="#F59E0B" style={{ flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14, color: '#0D1117' }}>
                        {item.item}
                      </span>
                      {item.explanation && (
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#6B7280', marginTop: 2, lineHeight: 1.5 }}>
                          {item.explanation}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #FDE68A' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#78350F' }}>
                  Ai nevoie de ceva din lista de mai sus?{' '}
                  <a href="/oferta" style={{ color: '#2B8FCC', fontWeight: 600, textDecoration: 'none' }}>
                    Solicita o oferta custom.
                  </a>
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
