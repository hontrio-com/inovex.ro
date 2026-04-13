'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Gavel, BookOpen, Tag, MessageSquare, Mail, Settings, ArrowRight, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const [marketplaceCount, setMarketplaceCount] = useState<number | null>(null);
  const [bidsCount,        setBidsCount]        = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/admin/marketplace').then((r) => r.json()).then((d: unknown[]) => setMarketplaceCount(d.length)).catch(() => {});
    fetch('/api/admin/generic/bids').then((r) => r.json()).then((d: unknown[]) => setBidsCount(d.length)).catch(() => {});
  }, []);

  const STATS = [
    { icon: ShoppingBag, label: 'Produse Marketplace', value: marketplaceCount ?? '–', href: '/admin/marketplace', color: '#2B8FCC' },
    { icon: Gavel,       label: 'Oferte primite',      value: bidsCount        ?? '–', href: '/admin/bids',        color: '#10B981' },
  ];

  const SECTIONS = [
    { icon: ShoppingBag,    label: 'Marketplace',       href: '/admin/marketplace',               desc: 'Gestioneaza produsele din catalog'           },
    { icon: Gavel,          label: 'Oferte',            href: '/admin/bids',                      desc: 'Ofertele trimise de clienti'                 },
    { icon: BookOpen,       label: 'Continut educativ', href: '/admin/invata-gratuit',             desc: 'Articole, videoclipuri si resurse'           },
    { icon: Tag,            label: 'Categorii',         href: '/admin/invata-gratuit/categorii',  desc: 'Categorii pentru continutul educativ'        },
    { icon: MessageSquare,  label: 'Comentarii',        href: '/admin/invata-gratuit/comentarii', desc: 'Modereaza comentariile utilizatorilor'       },
    { icon: Mail,           label: 'Lead-uri',          href: '/admin/invata-gratuit/leads',      desc: 'Abonati si lead-uri din sectiunea educativa' },
    { icon: Settings,       label: 'Setari site',       href: '/admin/settings',                  desc: 'Date companie, social, SEO global'           },
  ];

  return (
    <div style={{ padding: 'clamp(20px, 4vw, 32px)' }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.25rem,3vw,1.5rem)', color: '#0F172A', marginBottom: 4 }}>
          Bine ai revenit
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#64748B' }}>
          Panou de control Inovex. Control total asupra site-ului.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14, marginBottom: 32 }}>
        {STATS.map((s) => {
          const Icon = s.icon;
          return (
            <Link key={s.href} href={s.href} style={{ display: 'block', background: '#fff', border: '1px solid #E2E8F0', borderRadius: 14, padding: 20, textDecoration: 'none', transition: 'box-shadow 200ms ease, border-color 200ms ease' }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'; el.style.borderColor = s.color; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.boxShadow = 'none'; el.style.borderColor = '#E2E8F0'; }}
            >
              <div style={{ width: 40, height: 40, borderRadius: 10, background: s.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                <Icon size={18} color={s.color} />
              </div>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.75rem', color: '#0F172A', lineHeight: 1, marginBottom: 4 }}>{s.value}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: '#64748B' }}>{s.label}</p>
            </Link>
          );
        })}
      </div>

      {/* Sectiuni */}
      <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9375rem', color: '#0F172A', marginBottom: 14 }}>
        Sectiuni
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 10 }}>
        {SECTIONS.map((s) => {
          const Icon = s.icon;
          return (
            <Link key={s.href} href={s.href} style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12, padding: '15px 18px', textDecoration: 'none', transition: 'box-shadow 200ms ease, border-color 200ms ease' }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)'; el.style.borderColor = '#BFDBFE'; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.boxShadow = 'none'; el.style.borderColor = '#E2E8F0'; }}
            >
              <div style={{ width: 36, height: 36, borderRadius: 8, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={16} color="#2B8FCC" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem', color: '#0F172A', marginBottom: 2 }}>{s.label}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.desc}</p>
              </div>
              <ArrowRight size={14} color="#CBD5E1" style={{ flexShrink: 0 }} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
