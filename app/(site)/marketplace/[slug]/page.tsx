import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllProductsAsync, getProductBySlugAsync, getRelatedProductsAsync } from '@/lib/marketplace-data-server';
import { BuySection } from '@/components/marketplace/BuySection';
import { ProductTabs } from '@/components/marketplace/ProductTabs';
import { DeliveryTimeline } from '@/components/marketplace/DeliveryTimeline';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { FAQAccordion } from '@/components/marketplace/FAQAccordion';
import ExclusivityBox from '@/components/marketplace/ExclusivityBox';
import ProactiveChatWidget from '@/components/marketplace/ProactiveChatWidget';
import { CATEGORY_LABELS } from '@/types/marketplace';
import { Zap, Shield, Settings, ExternalLink, ChevronRight } from 'lucide-react';

/* ── ISR ── */
export const revalidate = 1800;

export async function generateStaticParams() {
  const products = await getAllProductsAsync();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlugAsync(slug);
  if (!product) return {};
  const ogImage = product.mainImage ?? '/images/og/marketplace-og.jpg';
  return {
    title: product.seo.metaTitle,
    description: product.seo.metaDescription,
    alternates: { canonical: `https://inovex.ro/marketplace/${product.slug}` },
    openGraph: {
      title: product.title,
      description: product.description,
      url: `https://inovex.ro/marketplace/${product.slug}`,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description: product.description,
      images: [ogImage],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlugAsync(slug);
  if (!product) notFound();

  const related = await getRelatedProductsAsync(product);

  /* JSON-LD Product */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    brand: { '@type': 'Brand', name: 'Inovex' },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'EUR',
      availability: product.status === 'sold'
        ? 'https://schema.org/SoldOut'
        : 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: 'Inovex' },
    },
  };

  const gradientBg =
    product.category === 'magazin-online'    ? 'linear-gradient(135deg,#EFF6FF 0%,#DBEAFE 50%,#EFF6FF 100%)' :
    product.category === 'website-prezentare' ? 'linear-gradient(135deg,#F0FDF4 0%,#D1FAE5 50%,#F0FDF4 100%)' :
    product.category === 'aplicatie-web'     ? 'linear-gradient(135deg,#FFF7ED 0%,#FED7AA 50%,#FFF7ED 100%)' :
    'linear-gradient(135deg,#F5F3FF 0%,#DDD6FE 50%,#F5F3FF 100%)';

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div style={{ background: '#fff', paddingTop: 'clamp(80px,8vw,100px)', paddingBottom: 'clamp(64px,8vw,96px)' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 24, flexWrap: 'wrap' }}>
            {[
              { label: 'Acasa', href: '/' },
              { label: 'Marketplace', href: '/marketplace' },
              { label: CATEGORY_LABELS[product.category], href: '/marketplace' },
            ].map((crumb, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Link href={crumb.href} style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#9CA3AF', textDecoration: 'none' }}>
                  {crumb.label}
                </Link>
                <ChevronRight size={12} color="#D1D5DB" />
              </span>
            ))}
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#374151', fontWeight: 500 }}>
              {product.title}
            </span>
          </nav>

          {/* Header produs */}
          <div style={{ marginBottom: 32 }}>
            {/* Badges */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
              <span style={{
                background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 6,
                padding: '4px 12px', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 12, color: '#2B8FCC',
              }}>
                {CATEGORY_LABELS[product.category]}
              </span>
              <span style={{
                background: '#F0F7FF', border: '1px solid #BFDBFE', borderRadius: 6,
                padding: '4px 12px', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 12, color: '#2B8FCC',
              }}>
                {product.platform}
              </span>
              <span style={{
                background: '#F4F6F8', border: '1px solid #E8ECF0', borderRadius: 6,
                padding: '4px 12px', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 12, color: '#4A5568',
              }}>
                {product.niche}
              </span>
              {product.badge && (
                <span style={{
                  background: '#2B8FCC', color: '#fff', borderRadius: 6,
                  padding: '4px 12px', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 12,
                  textTransform: 'uppercase', letterSpacing: '0.05em',
                }}>
                  {product.badge}
                </span>
              )}
            </div>

            <h1 style={{
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1.1,
              letterSpacing: '-0.03em', color: '#0D1117', marginBottom: 10,
            }}>
              {product.title}
            </h1>

            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.0625rem', color: '#4A5568', marginBottom: 20, lineHeight: 1.6 }}>
              {product.tagline}
            </p>

            {/* Badges rapide */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[
                { icon: Zap,      text: `Livrare in ${product.deliveryDays * 24}h`, color: '#2B8FCC', bg: '#EFF6FF', border: '#BFDBFE' },
                { icon: Shield,   text: 'Garantie 14 zile',                          color: '#10B981', bg: '#F0FDF4', border: '#BBF7D0' },
                { icon: Settings, text: 'Personalizat cu datele tale',                color: '#2B8FCC', bg: '#EFF6FF', border: '#BFDBFE' },
              ].map((b, i) => {
                const Icon = b.icon;
                return (
                  <div key={i} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    background: b.bg, border: `1px solid ${b.border}`, borderRadius: 7, padding: '5px 12px',
                  }}>
                    <Icon size={13} color={b.color} />
                    <span style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 12, color: '#0D1117' }}>
                      {b.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Layout principal: stanga + sidebar */}
          <div className="flex flex-col lg:flex-row lg:items-start gap-12">

            {/* ── Coloana stanga ── */}
            <div className="w-full lg:w-[62%]">

              {/* Imagine / mockup placeholder */}
              <div style={{
                aspectRatio: '16/10', borderRadius: 16, overflow: 'hidden',
                background: gradientBg,
                border: '1px solid #E8ECF0', marginBottom: 16,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem', color: '#2B8FCC', marginBottom: 8 }}>
                    {product.title}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#4A5568', marginBottom: 16 }}>
                    Screenshot disponibil dupa achizitie
                  </div>
                  {product.demoUrl && (
                    <a
                      href={product.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-purchase-intent="true"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        background: '#2B8FCC', color: '#fff', borderRadius: 8,
                        padding: '10px 20px', textDecoration: 'none',
                        fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14,
                      }}
                    >
                      <ExternalLink size={15} />
                      Vizualizeaza Demo Live
                    </a>
                  )}
                </div>
              </div>

              {/* Thumbnails galerie */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 28, overflowX: 'auto', scrollbarWidth: 'none' }}>
                {product.gallery.map((item, i) => (
                  <div key={i} style={{ flexShrink: 0, textAlign: 'center' }}>
                    <div style={{
                      width: 88, aspectRatio: '16/10', borderRadius: 8,
                      background: '#F0F7FF', border: i === 0 ? '2px solid #2B8FCC' : '2px solid #E8ECF0',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer',
                    }}>
                      <div style={{ width: 40, height: 4, background: '#BFDBFE', borderRadius: 2 }} />
                    </div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: '#6B7280', marginTop: 4 }}>
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Exclusivitate box — dupa galerie, inainte de garantie */}
              {product.isExclusive && (
                <ExclusivityBox
                  isSold={product.isSold ?? false}
                  soldToBusinessName={product.soldToBusinessName}
                />
              )}

              {/* Garantie banner */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32,
                background: '#F0FDF4', border: '1px solid #A7F3D0', borderRadius: 10, padding: '12px 16px',
              }}>
                <Shield size={18} color="#10B981" style={{ flexShrink: 0 }} />
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#065F46', lineHeight: 1.5 }}>
                  <strong>Garantie 14 zile.</strong> Daca nu esti multumit de livrare, returnam integral suma platita.
                  Conform OUG 34/2014.
                </p>
              </div>

              {/* Tabs ce include */}
              <div style={{ paddingTop: 'clamp(32px,4vw,48px)', borderTop: '1px solid #E8ECF0' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', color: '#0D1117', marginBottom: 20 }}>
                  Ce este inclus
                </h2>
                <ProductTabs product={product} />
              </div>

              {/* Timeline livrare */}
              <div id="livrare" style={{ paddingTop: 'clamp(32px,4vw,48px)', borderTop: '1px solid #E8ECF0', marginTop: 'clamp(32px,4vw,48px)' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', color: '#0D1117', marginBottom: 28 }}>
                  Cum decurge livrarea
                </h2>
                <DeliveryTimeline product={product} />
              </div>

              {/* Demo live */}
              {product.demoUrl && (
                <div style={{
                  marginTop: 'clamp(32px,4vw,48px)', borderTop: '1px solid #E8ECF0', paddingTop: 'clamp(32px,4vw,48px)',
                }}>
                  <div style={{ background: '#F8FAFB', borderRadius: 16, padding: 32, border: '1px solid #E8ECF0' }}>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', color: '#0D1117', marginBottom: 8 }}>
                      Vezi produsul in actiune
                    </h2>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#4A5568', marginBottom: 16, lineHeight: 1.65 }}>
                      Demo-ul este complet functional. Poti naviga, testa toate functionalitatile si vedea designul real.
                    </p>
                    <a
                      href={product.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        background: '#2B8FCC', color: '#fff', borderRadius: 8, padding: '12px 24px',
                        textDecoration: 'none', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9375rem',
                      }}
                    >
                      <ExternalLink size={16} />
                      Deschide Demo Live
                    </a>
                  </div>
                </div>
              )}

              {/* FAQ */}
              {product.faq.length > 0 && (
                <div style={{ marginTop: 'clamp(32px,4vw,48px)', borderTop: '1px solid #E8ECF0', paddingTop: 'clamp(32px,4vw,48px)' }}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', color: '#0D1117', marginBottom: 24 }}>
                    Intrebari frecvente
                  </h2>
                  <FAQAccordion items={product.faq} />
                </div>
              )}

              {/* Produse similare */}
              {related.length > 0 && (
                <div style={{ marginTop: 'clamp(32px,4vw,48px)', borderTop: '1px solid #E8ECF0', paddingTop: 'clamp(32px,4vw,48px)' }}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', color: '#0D1117', marginBottom: 24 }}>
                    Poate te intereseaza si
                  </h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
                    {related.map((p) => (
                      <ProductCard key={p.id} product={p} compact />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── Sidebar drept (sticky) ── */}
            <div
              className="w-full lg:w-[38%]"
              style={{ position: 'sticky', top: 96, alignSelf: 'flex-start' }}
            >
              <BuySection product={product} />
            </div>

          </div>
        </div>
      </div>
      {/* Chat proactiv WhatsApp */}
      <ProactiveChatWidget
        productTitle={product.title}
        productSlug={product.slug}
        agentName="Vlad"
        agentRole="Inovex"
        triggerAfterSeconds={45}
        whatsappNumber="40750456096"
      />
    </>
  );
}
