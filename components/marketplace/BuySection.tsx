'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Gavel, Clock, Shield, Truck, CheckCircle, Lock } from 'lucide-react';
import type { MarketplaceProduct } from '@/types/marketplace';
import { BidModal } from './BidModal';
import DeliveryTimer from './DeliveryTimer';

interface Props {
  product: MarketplaceProduct;
}

export function BuySection({ product }: Props) {
  const [bidOpen, setBidOpen] = useState(false);

  const isSold = product.status === 'sold' || product.isSold === true;

  return (
    <>
      <BidModal
        open={bidOpen}
        onClose={() => setBidOpen(false)}
        productSlug={product.slug}
        productTitle={product.title}
        listedPrice={product.price}
      />

      <div style={{
        background: '#fff',
        border: '1px solid #E8ECF0',
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      }}>

        {/* Header pret */}
        <div style={{ padding: '24px 24px 20px', borderBottom: '1px solid #F4F6F8' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#9CA3AF', marginBottom: 4, fontWeight: 500 }}>
            Pret complet, tot inclus
          </p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem', color: '#0D1117', lineHeight: 1 }}>
              {product.price.toLocaleString('ro-RO')} EUR
            </span>
          </div>

          {/* Quick info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
            {[
              { icon: Shield, text: 'Garantie 14 zile' },
              { icon: Truck,  text: 'Personalizat cu datele tale' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icon size={14} color="#2B8FCC" />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: '#374151', fontWeight: 500 }}>
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Ce este inclus — mini lista */}
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #F4F6F8', background: '#F8FAFB' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.75rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
            Tot ce primesti
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {[
              'Design complet personalizat',
              'Toate paginile configurate',
              'Integrari functionale activate',
              'SEO de baza configurat',
              'Training si documentatie',
              'Suport tehnic 14 zile',
            ].map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <CheckCircle size={13} color="#10B981" />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: '#374151' }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA-uri */}
        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>

          {/* Cronometru livrare — deasupra butonului principal */}
          {!isSold && (
            <DeliveryTimer workingDays={product.workingDaysDelivery ?? 2} />
          )}

          {isSold ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{
                width: '100%', height: 50, borderRadius: 12,
                background: '#F4F6F8', border: '1px solid #E8ECF0',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.9375rem', color: '#9CA3AF',
                cursor: 'not-allowed',
              }}>
                <Lock size={16} color="#9CA3AF" />
                Produs vandut
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#9CA3AF', textAlign: 'center', margin: 0 }}>
                Acest design nu mai este disponibil.
              </p>
              <Link
                href="/oferta"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  width: '100%', height: 44, borderRadius: 12, textDecoration: 'none',
                  background: '#fff', border: '1.5px solid #E8ECF0',
                  fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem', color: '#2B8FCC',
                }}
              >
                Solicita un design similar
              </Link>
            </div>
          ) : (
            <>
              {/* Cumpara */}
              <Link
                href={`/contact?produs=${product.slug}&actiune=cumparare`}
                data-purchase-intent="true"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  width: '100%', height: 50, borderRadius: 12,
                  background: '#2B8FCC', color: '#fff', textDecoration: 'none',
                  fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.9375rem',
                  transition: 'background 200ms ease, box-shadow 200ms ease',
                  boxShadow: '0 2px 12px rgba(43,143,204,0.28)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = '#1a6fa8';
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 24px rgba(43,143,204,0.38)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = '#2B8FCC';
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 2px 12px rgba(43,143,204,0.28)';
                }}
              >
                <ShoppingBag size={17} />
                Cumpara Acum
              </Link>

              {/* Fa o oferta */}
              <button
                onClick={() => setBidOpen(true)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  width: '100%', height: 44, borderRadius: 12,
                  background: 'transparent',
                  border: '1.5px solid #E8ECF0',
                  color: '#374151', cursor: 'pointer',
                  fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem',
                  transition: 'border-color 180ms ease, color 180ms ease, background 180ms ease',
                }}
                onMouseEnter={(e) => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.borderColor = '#2B8FCC';
                  btn.style.color = '#2B8FCC';
                  btn.style.background = '#F0F7FF';
                }}
                onMouseLeave={(e) => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  btn.style.borderColor = '#E8ECF0';
                  btn.style.color = '#374151';
                  btn.style.background = 'transparent';
                }}
              >
                <Gavel size={15} />
                Fa o oferta de pret
              </button>
            </>
          )}

          {/* Reminder exclusivitate */}
          {product.isExclusive && !isSold && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 7,
              background: '#F8FAFB', border: '1px solid #E8ECF0',
              borderRadius: 8, padding: '8px 12px',
            }}>
              <Lock size={12} color="#2B8FCC" style={{ flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: '#4A5568', fontWeight: 500, lineHeight: 1.4 }}>
                Exclusiv: disponibil pentru un singur cumparator
              </span>
            </div>
          )}

          {/* Demo */}
          {product.demoUrl && (
            <a
              href={product.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-purchase-intent="true"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '0.8125rem',
                color: '#9CA3AF', textDecoration: 'none', gap: 4,
                transition: 'color 180ms ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#2B8FCC'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#9CA3AF'; }}
            >
              Vizualizeaza demo live
            </a>
          )}
        </div>

        {/* Garantie footer */}
        <div style={{
          borderTop: '1px solid #F4F6F8', padding: '14px 24px',
          background: '#F8FAFB', textAlign: 'center',
        }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#6B7280', lineHeight: 1.5 }}>
            Garantie de returnare 14 zile daca nu esti multumit de livrare.
          </p>
        </div>
      </div>
    </>
  );
}
