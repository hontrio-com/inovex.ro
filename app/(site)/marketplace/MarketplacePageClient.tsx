'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Package, Clock, Shield, Headphones, ArrowRight, ChevronDown, SlidersHorizontal, X, Lock } from 'lucide-react';
import { ProductCard } from '@/components/marketplace/ProductCard';
import type { MarketplaceProduct, MarketplaceCategory } from '@/types/marketplace';
import { CATEGORY_LABELS, PLATFORM_OPTIONS } from '@/types/marketplace';

const EASE: [number,number,number,number] = [0.4, 0, 0.2, 1];
const EXCLUSIVITY_BANNER_KEY = 'inovex_exclusivity_banner_dismissed';

type SortOption = 'recomandate' - 'pret-asc' - 'pret-desc' - 'cele-mai-noi';

const SORT_LABELS: Record<SortOption, string> = {
  'recomandate':  'Recomandate',
  'pret-asc':     'Pret crescator',
  'pret-desc':    'Pret descrescator',
  'cele-mai-noi': 'Cele mai noi',
};

const TRUST = [
  { icon: Package,    text: '20+ produse disponibile' },
  { icon: Clock,      text: 'Livrare in 48 de ore'    },
  { icon: Shield,     text: 'Garantie 14 zile'        },
  { icon: Headphones, text: 'Suport inclus'           },
];

const ALL_CATEGORIES = Object.keys(CATEGORY_LABELS) as MarketplaceCategory[];

export function MarketplacePageClient() {
  const reduce  = useReducedMotion() ?? false;

  const [products, setProducts] = useState<MarketplaceProduct[]>([]);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch('/api/marketplace/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch {
      // silently fail — products stays []
    }
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const [exclusivityBannerVisible, setExclusivityBannerVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(EXCLUSIVITY_BANNER_KEY)) {
      setExclusivityBannerVisible(true);
    }
  }, []);

  function dismissExclusivityBanner() {
    localStorage.setItem(EXCLUSIVITY_BANNER_KEY, 'true');
    setExclusivityBannerVisible(false);
  }

  // Filtre
  const [category, setCategory] = useState<MarketplaceCategory - 'toate'>('toate');
  const [platform, setPlatform] = useState<string>('toate');
  const [sort,     setSort]     = useState<SortOption>('recomandate');

  // Resetare platform cand se schimba categoria
  function handleCategoryChange(cat: MarketplaceCategory - 'toate') {
    setCategory(cat);
    setPlatform('toate');
  }

  // Optiunile de platforma disponibile pentru categoria selectata
  const platformOptions: string[] = category !== 'toate'
    ? PLATFORM_OPTIONS[category]
    : [];

  // Produse filtrate + sortate
  const filtered = useMemo(() => {
    let list = [...products];

    if (category !== 'toate') {
      list = list.filter((p) => p.category === category);
    }
    if (platform !== 'toate') {
      list = list.filter((p) => p.platform === platform);
    }

    switch (sort) {
      case 'pret-asc':     list.sort((a, b) => a.price - b.price); break;
      case 'pret-desc':    list.sort((a, b) => b.price - a.price); break;
      case 'cele-mai-noi': list.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)); break;
      default:             list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)); break;
    }
    return list;
  }, [products, category, platform, sort]);

  const hasActiveFilters = category !== 'toate' || platform !== 'toate';

  return (
    <>
      {/* ══════════════════════════
          HERO
      ══════════════════════════ */}
      <section style={{ background: 'linear-gradient(180deg, #fff 0%, #F0F7FF 100%)', paddingTop: 'clamp(64px,8vw,96px)', paddingBottom: 'clamp(48px,6vw,72px)' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8" style={{ textAlign: 'center' }}>
          {/* Eyebrow */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={reduce ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20,
              background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 20, padding: '6px 16px',
            }}
          >
            <Package size={14} color="#2B8FCC" />
            <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.7rem', letterSpacing: '0.10em', textTransform: 'uppercase', color: '#2B8FCC' }}>
              Marketplace
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={reduce ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
            style={{
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', lineHeight: 1.08,
              letterSpacing: '-0.035em', color: '#0D1117',
              maxWidth: 860, margin: '0 auto 20px',
            }}
          >
            Afaceri digitale{' '}
            <em style={{ fontStyle: 'italic', color: '#2B8FCC' }}>complete</em>
            {', '}gata sa vanda
          </motion.h1>

          {/* Subtitlu */}
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={reduce ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15, ease: EASE }}
            style={{
              fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: '1.125rem',
              lineHeight: 1.68, color: '#4A5568', maxWidth: 620, margin: '0 auto 40px',
            }}
          >
            Magazine online, website-uri de prezentare, aplicatii web si platforme complete.
            Personalizate cu datele tale si livrate in maximum 48 de ore.
          </motion.p>

          {/* Trust bar */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={reduce ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.22, ease: EASE }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 0 }}
          >
            {TRUST.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 18px' }}>
                    <Icon size={15} color="#2B8FCC" />
                    <span style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 14, color: '#4A5568', whiteSpace: 'nowrap' }}>
                      {item.text}
                    </span>
                  </div>
                  {i < TRUST.length - 1 && <div style={{ width: 1, height: 18, background: '#E8ECF0' }} />}
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════
          FILTRE
      ══════════════════════════ */}
      <div style={{
        position: 'sticky', top: 66, zIndex: 40,
        background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid #E8ECF0',
      }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div style={{ paddingTop: 12, paddingBottom: 12 }}>

            {/* Rand 1: Categorii + Sort */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <SlidersHorizontal size={15} color="#9CA3AF" style={{ flexShrink: 0 }} />

              {/* Tabs categorii */}
              <div style={{ display: 'flex', gap: 4, overflowX: 'auto', scrollbarWidth: 'none', flex: 1 }}>
                <button
                  onClick={() => handleCategoryChange('toate')}
                  style={{
                    flexShrink: 0, padding: '6px 14px', borderRadius: 6, border: 'none',
                    background: category === 'toate' ? '#0D1117' : '#F4F6F8',
                    color: category === 'toate' ? '#fff' : '#4A5568',
                    fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13,
                    cursor: 'pointer', whiteSpace: 'nowrap',
                    transition: 'background 180ms ease, color 180ms ease',
                  }}
                >
                  Toate
                </button>
                {ALL_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    style={{
                      flexShrink: 0, padding: '6px 14px', borderRadius: 6, border: 'none',
                      background: category === cat ? '#2B8FCC' : '#F4F6F8',
                      color: category === cat ? '#fff' : '#4A5568',
                      fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13,
                      cursor: 'pointer', whiteSpace: 'nowrap',
                      transition: 'background 180ms ease, color 180ms ease',
                    }}
                  >
                    {CATEGORY_LABELS[cat]}
                  </button>
                ))}
              </div>

              {/* Sort dropdown */}
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  style={{
                    appearance: 'none', background: '#fff',
                    border: '1px solid #E8ECF0', borderRadius: 8,
                    padding: '6px 32px 6px 12px',
                    fontFamily: 'var(--font-body)', fontSize: 13, color: '#0D1117',
                    cursor: 'pointer', outline: 'none',
                  }}
                >
                  {(Object.entries(SORT_LABELS) as [SortOption, string][]).map(([val, label]) => (
                    <option key={val} value={val}>{label}</option>
                  ))}
                </select>
                <ChevronDown size={13} color="#9CA3AF" style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              </div>
            </div>

            {/* Rand 2: Sub-filtre platforma (apare doar cand e selectata o categorie) */}
            {category !== 'toate' && platformOptions.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#9CA3AF', fontWeight: 500, whiteSpace: 'nowrap' }}>
                  Platforma:
                </span>
                <button
                  onClick={() => setPlatform('toate')}
                  style={{
                    padding: '4px 12px', borderRadius: 20,
                    border: `1px solid ${platform === 'toate' ? '#2B8FCC' : '#E8ECF0'}`,
                    background: platform === 'toate' ? '#EFF6FF' : '#fff',
                    color: platform === 'toate' ? '#2B8FCC' : '#4A5568',
                    fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 12,
                    cursor: 'pointer', whiteSpace: 'nowrap',
                    transition: 'all 150ms ease',
                  }}
                >
                  Toate
                </button>
                {platformOptions.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPlatform(p)}
                    style={{
                      padding: '4px 12px', borderRadius: 20,
                      border: `1px solid ${platform === p ? '#2B8FCC' : '#E8ECF0'}`,
                      background: platform === p ? '#EFF6FF' : '#fff',
                      color: platform === p ? '#2B8FCC' : '#4A5568',
                      fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 12,
                      cursor: 'pointer', whiteSpace: 'nowrap',
                      transition: 'all 150ms ease',
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}

            {/* Active filters summary + reset */}
            {hasActiveFilters && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: '#9CA3AF' }}>
                  {filtered.length} {filtered.length === 1 ? 'produs' : 'produse'} gasite
                </span>
                <button
                  onClick={() => { setCategory('toate'); setPlatform('toate'); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 3,
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: 'var(--font-body)', fontSize: 11, color: '#6B7280',
                    padding: '2px 6px', borderRadius: 4,
                    transition: 'color 150ms ease',
                  }}
                >
                  <X size={11} />
                  Reseteaza filtrele
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ══════════════════════════
          GRID PRODUSE (unificat)
      ══════════════════════════ */}
      <section style={{ background: '#fff', paddingTop: 'clamp(48px,6vw,72px)', paddingBottom: 'clamp(48px,6vw,80px)' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">

          {/* Banner exclusivitate — afisat o singura data */}
          {exclusivityBannerVisible && (
            <div style={{
              display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 32,
              background: '#F0F7FF', border: '1px solid #C8E6F8', borderRadius: 12, padding: '16px 20px',
            }}>
              <Lock size={18} color="#2B8FCC" style={{ flexShrink: 0, marginTop: 1 }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: '#0D1117', marginBottom: 2 }}>
                  Fiecare produs se vinde o singura data
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#4A5568', margin: 0, lineHeight: 1.6 }}>
                  Nu vindem acelasi design de doua ori. Fiecare proiect este exclusiv pentru un singur client.
                  La cumparare, primesti drepturi depline si nimeni altcineva nu va detine acelasi site.
                </p>
              </div>
              <button
                onClick={dismissExclusivityBanner}
                aria-label="Inchide"
                style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.5, padding: 0, flexShrink: 0 }}
              >
                <X size={16} color="#4A5568" />
              </button>
            </div>
          )}
          {filtered.length > 0 ? (
            <motion.div
              layout
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}
            >
              {filtered.map((p) => (
                <motion.div key={p.id} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: EASE }}>
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div style={{ textAlign: 'center', paddingTop: 64, paddingBottom: 64 }}>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem', color: '#0D1117', marginBottom: 8 }}>
                Niciun produs gasit
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#6B7280', marginBottom: 20 }}>
                Incearca sa modifici filtrele sau sa resetezi cautarea.
              </p>
              <button
                onClick={() => { setCategory('toate'); setPlatform('toate'); }}
                style={{
                  background: '#2B8FCC', color: '#fff', border: 'none', borderRadius: 8,
                  padding: '10px 24px', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem',
                  cursor: 'pointer',
                }}
              >
                Reseteaza filtrele
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════
          SOCIAL PROOF BAR
      ══════════════════════════ */}
      <section aria-label="Statistici" style={{ background: '#0D1117', paddingTop: 48, paddingBottom: 48 }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(24px,5vw,64px)', flexWrap: 'wrap' }}>
            {[
              { value: '200+',    label: 'Proiecte livrate total' },
              { value: '48h',     label: 'Timp maxim de livrare'  },
              { value: '98%',     label: 'Clienti multumiti'      },
              { value: '14 zile', label: 'Garantie returnare'     },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '2rem', color: '#fff', lineHeight: 1, marginBottom: 6 }}>
                  {stat.value}
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════
          CTA FINAL
      ══════════════════════════ */}
      <section style={{ background: '#F8FAFB', paddingTop: 64, paddingBottom: 80 }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', color: '#0D1117', marginBottom: 12, letterSpacing: '-0.025em' }}>
            Nu gasesti ce cauti in marketplace?
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: '#5A6475', maxWidth: 480, margin: '0 auto 28px' }}>
            Construim orice afacere digitala complet personalizata, de la zero, exact pe specificatiile tale.
          </p>
          <Link
            href="/oferta"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              height: 50, padding: '0 28px',
              background: '#0D1117', color: '#fff', borderRadius: 10, textDecoration: 'none',
              fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9375rem',
              transition: 'background 200ms ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = '#1a2035'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = '#0D1117'; }}
          >
            Solicita Oferta Custom
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
