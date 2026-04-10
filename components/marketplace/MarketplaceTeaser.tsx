'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Package, Clock, Shield, Headphones } from 'lucide-react';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { getFeaturedProducts } from '@/lib/marketplace-data';

const EASE: [number,number,number,number] = [0.4, 0, 0.2, 1];

const TRUST = [
  { icon: Package,     text: '20+ produse disponibile' },
  { icon: Clock,       text: 'Livrare in 48 de ore'     },
  { icon: Shield,      text: 'Garantie 14 zile'         },
  { icon: Headphones,  text: 'Suport inclus'            },
];

export function MarketplaceTeaser() {
  const reduce   = useReducedMotion() ?? false;
  const products = getFeaturedProducts(3);

  return (
    <section
      aria-labelledby="marketplace-teaser-heading"
      style={{ background: '#F8FAFB', paddingTop: 'clamp(64px,8vw,96px)', paddingBottom: 'clamp(64px,8vw,96px)' }}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto', marginBottom: 'clamp(40px,5vw,56px)' }}>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={reduce ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: EASE }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}
          >
            <div style={{ width: 22, height: 2, background: '#2B8FCC', borderRadius: 2 }} />
            <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.7rem', letterSpacing: '0.10em', textTransform: 'uppercase', color: '#2B8FCC' }}>
              Marketplace
            </span>
          </motion.div>

          <motion.h2
            id="marketplace-teaser-heading"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={reduce ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
            style={{
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', lineHeight: 1.1,
              letterSpacing: '-0.03em', color: '#0D1117', margin: '0 0 14px 0',
            }}
          >
            Website-uri gata sa lucreze pentru tine{' '}
            <em style={{ fontStyle: 'italic', color: '#2B8FCC' }}>din prima zi</em>
          </motion.h2>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={reduce ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.16, ease: EASE }}
            style={{
              fontFamily: 'var(--font-body)', fontWeight: 400,
              fontSize: '1.0625rem', lineHeight: 1.65, color: '#5A6475',
              maxWidth: 520, margin: '0 auto 28px',
            }}
          >
            Alegi nisa, noi personalizam cu datele tale si livram in 48 de ore.
            Fara asteptari de luni, fara costuri uriase.
          </motion.p>

          {/* Trust bar */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={reduce ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.22, ease: EASE }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 0 }}
          >
            {TRUST.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0 16px' }}>
                    <Icon size={14} color="#2B8FCC" />
                    <span style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 13, color: '#4A5568', whiteSpace: 'nowrap' }}>
                      {item.text}
                    </span>
                  </div>
                  {i < TRUST.length - 1 && (
                    <div style={{ width: 1, height: 16, background: '#E8ECF0' }} />
                  )}
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Grid produse */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={reduce ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24, marginBottom: 40 }}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} compact />
          ))}
        </motion.div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <Link
            href="/marketplace"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              height: 50, padding: '0 28px',
              background: '#2B8FCC', color: '#fff', borderRadius: 10,
              textDecoration: 'none',
              fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9375rem',
              boxShadow: '0 2px 10px rgba(43,143,204,0.22)',
              transition: 'background 200ms ease, box-shadow 200ms ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = '#1a6fa8';
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 24px rgba(43,143,204,0.35)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = '#2B8FCC';
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 2px 10px rgba(43,143,204,0.22)';
            }}
          >
            Exploreaza Marketplace-ul
            <ArrowRight size={16} />
          </Link>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#9CA3AF', marginTop: 10 }}>
            20+ afaceri digitale disponibile, livrare garantata in 48 de ore
          </p>
        </div>

      </div>
    </section>
  );
}
