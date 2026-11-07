'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Package, ArrowRight, X, Lock } from 'lucide-react';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { ETICHETE_CATEGORII } from '@/components/marketplace/etichete';
import type { MarketplaceProduct, MarketplaceCategory } from '@/types/marketplace';
import { CATEGORY_LABELS, PLATFORM_OPTIONS } from '@/types/marketplace';
import styles from './marketplace.module.css';

/* Pagina de marketplace, in stilul redesign-ului (2026-10-29): titlu negru centrat, bara de filtre lipita sub antet (alegerea = negru), produsele in carduri ca portofoliul
   (ProductCard) si, la final, chemarea spre o oferta personalizata. Logica (produsele din
   /api/marketplace/products, filtrele, sortarea, bannerul de exclusivitate) e cea dinainte. */

const EASE: [number,number,number,number] = [0.4, 0, 0.2, 1];
const EXCLUSIVITY_BANNER_KEY = 'inovex_exclusivity_banner_dismissed';

type SortOption = 'recomandate' | 'pret-asc' | 'pret-desc' | 'cele-mai-noi';

const SORT_LABELS: Record<SortOption, string> = {
  'recomandate':  'Recomandate',
  'pret-asc':     'Preț crescător',
  'pret-desc':    'Preț descrescător',
  'cele-mai-noi': 'Cele mai noi',
};

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
  const [category, setCategory] = useState<MarketplaceCategory | 'toate'>('toate');
  const [platform, setPlatform] = useState<string>('toate');
  const [sort,     setSort]     = useState<SortOption>('recomandate');

  // Resetare platform cand se schimba categoria
  function handleCategoryChange(cat: MarketplaceCategory | 'toate') {
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
          CAP
      ══════════════════════════ */}
      <section className={styles.cap} aria-labelledby="marketplace-titlu">
        <h1 id="marketplace-titlu" className={styles.titlu}>
          Afaceri digitale complete, gata să vândă
        </h1>
        <p className={styles.lead}>
          Magazine online, website-uri de prezentare, aplicații web și platforme complete. Personalizate cu
          datele tale și livrate în maximum 48 de ore.
        </p>
      </section>

      {/* ══════════════════════════
          FILTRE
      ══════════════════════════ */}
      <div className={styles.filtre}>
        <div className={styles.filtreInterior}>
          <div className={styles.filtreRand}>
            {/* Categorii */}
            <div className={styles.categorii} role="group" aria-label="Categorie">
              <button
                type="button"
                onClick={() => handleCategoryChange('toate')}
                className={styles.categorie}
                aria-pressed={category === 'toate'}
              >
                Toate
              </button>
              {ALL_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryChange(cat)}
                  className={styles.categorie}
                  aria-pressed={category === cat}
                >
                  {ETICHETE_CATEGORII[cat]}
                </button>
              ))}
            </div>

            {/* Sortare */}
            <label className={styles.sortare}>
              <span className={styles.ascuns}>Sortează</span>
              <select value={sort} onChange={(e) => setSort(e.target.value as SortOption)}>
                {(Object.entries(SORT_LABELS) as [SortOption, string][]).map(([val, label]) => (
                  <option key={val} value={val}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Platforma (doar cand e aleasa o categorie) */}
          {category !== 'toate' && platformOptions.length > 0 && (
            <div className={styles.platforme} role="group" aria-label="Platformă">
              <span className={styles.platformeEticheta}>Platformă:</span>
              <button
                type="button"
                onClick={() => setPlatform('toate')}
                className={styles.platforma}
                aria-pressed={platform === 'toate'}
              >
                Toate
              </button>
              {platformOptions.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPlatform(p)}
                  className={styles.platforma}
                  aria-pressed={platform === p}
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {/* Rezultate + resetare */}
          {hasActiveFilters && (
            <div className={styles.rezultate}>
              <span>
                {filtered.length} {filtered.length === 1 ? 'produs găsit' : 'produse găsite'}
              </span>
              <button
                type="button"
                onClick={() => { setCategory('toate'); setPlatform('toate'); }}
                className={styles.reset}
              >
                <X aria-hidden />
                Resetează filtrele
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ══════════════════════════
          PRODUSE
      ══════════════════════════ */}
      <section className={styles.produse} aria-label="Produse">
        {/* Banner exclusivitate: afisat o singura data */}
        {exclusivityBannerVisible && (
          <div className={styles.exclusiv}>
            <span className={styles.exclusivIcon}>
              <Lock aria-hidden />
            </span>
            <div className={styles.exclusivText}>
              <p className={styles.exclusivTitlu}>Fiecare produs se vinde o singură dată</p>
              <p>
                Nu vindem același design de două ori. Fiecare proiect este exclusiv pentru un singur client. La
                cumpărare, primești drepturi depline și nimeni altcineva nu va deține același site.
              </p>
            </div>
            <button type="button" onClick={dismissExclusivityBanner} aria-label="Închide" className={styles.inchide}>
              <X aria-hidden />
            </button>
          </div>
        )}

        {filtered.length > 0 ? (
          <motion.ul layout className={styles.grila}>
            {filtered.map((p) => (
              <motion.li
                key={p.id}
                layout
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <ProductCard product={p} />
              </motion.li>
            ))}
          </motion.ul>
        ) : (
          <div className={styles.gol}>
            <span className={styles.golIcon}>
              <Package strokeWidth={1.6} aria-hidden />
            </span>
            {hasActiveFilters ? (
              <>
                <p className={styles.golTitlu}>Niciun produs găsit</p>
                <p className={styles.golText}>Încearcă să modifici filtrele sau să le resetezi.</p>
                <button
                  type="button"
                  onClick={() => { setCategory('toate'); setPlatform('toate'); }}
                  className={styles.secundar}
                >
                  Resetează filtrele
                </button>
              </>
            ) : (
              <>
                <p className={styles.golTitlu}>Produse noi în curând</p>
                <p className={styles.golText}>
                  Pregătim următoarele afaceri digitale. Până atunci, îți construim una personalizată.
                </p>
                <Link href="/oferta" className={styles.primar}>
                  Solicită ofertă
                  <ArrowRight aria-hidden />
                </Link>
              </>
            )}
          </div>
        )}
      </section>

      {/* ══════════════════════════
          FINAL
      ══════════════════════════ */}
      <section className={styles.final} aria-labelledby="marketplace-final">
        <div className={styles.finalCard}>
          <h2 id="marketplace-final" className={styles.finalTitlu}>
            Nu găsești ce cauți în marketplace?
          </h2>
          <p className={styles.finalText}>
            Construim orice afacere digitală complet personalizată, de la zero, exact pe specificațiile tale.
          </p>
          <Link href="/oferta" className={styles.primar}>
            Solicită ofertă personalizată
            <ArrowRight aria-hidden />
          </Link>
        </div>
      </section>
    </>
  );
}
