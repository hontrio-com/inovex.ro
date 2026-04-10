'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Pencil, Trash2, ExternalLink } from 'lucide-react';
import { AdminHeader, A } from '@/app/admin/_components/AdminPage';
import type { MarketplaceProduct } from '@/types/marketplace';
import { CATEGORY_LABELS } from '@/types/marketplace';

const STATUS_BADGE: Record<string, { bg: string; color: string; label: string }> = {
  published: { bg: '#D1FAE5', color: '#065F46', label: 'Publicat'  },
  draft:     { bg: '#FEF9C3', color: '#78350F', label: 'Draft'     },
  sold:      { bg: '#FEE2E2', color: '#991B1B', label: 'Vandut'    },
};

export default function MarketplaceAdminPage() {
  const [products, setProducts] = useState<MarketplaceProduct[]>([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    fetch('/api/admin/marketplace')
      .then((r) => r.json())
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  async function deleteProduct(id: string, title: string) {
    if (!confirm(`Stergi "${title}"? Actiunea e ireversibila.`)) return;
    await fetch(`/api/admin/marketplace/${id}`, { method: 'DELETE' });
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div>
      <AdminHeader
        title="Marketplace"
        desc={`${products.length} produse totale`}
        action={
          <Link href="/admin/marketplace/new" style={A.btnPrimary}>
            <Plus size={15} />
            Adauga produs
          </Link>
        }
      />
      <div style={{ padding: '0 32px 32px' }}>
        {loading ? (
          <p style={{ fontFamily: 'var(--font-body)', color: '#64748B', padding: 40, textAlign: 'center' }}>Se incarca...</p>
        ) : (
          <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 14, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                  {['Titlu', 'Categorie', 'Platforma', 'Pret (EUR)', 'Badge', 'Status', 'Actiuni'].map((h) => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => {
                  const sb = STATUS_BADGE[p.status] ?? STATUS_BADGE.draft;
                  return (
                    <tr key={p.id} style={{ borderBottom: i < products.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                      <td style={{ padding: '14px 16px' }}>
                        <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem', color: '#0F172A', marginBottom: 2 }}>{p.title}</p>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#94A3B8' }}>{p.slug}</p>
                      </td>
                      <td style={{ padding: '14px 16px', fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: '#374151' }}>
                        {CATEGORY_LABELS[p.category]}
                      </td>
                      <td style={{ padding: '14px 16px', fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: '#374151' }}>
                        {p.platform}
                      </td>
                      <td style={{ padding: '14px 16px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', color: '#0F172A' }}>
                        {p.price.toLocaleString('ro-RO')}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        {p.badge ? (
                          <span style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 5, padding: '2px 8px', fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#2B8FCC', fontWeight: 600 }}>
                            {p.badge}
                          </span>
                        ) : <span style={{ color: '#CBD5E1', fontFamily: 'var(--font-body)', fontSize: '0.75rem' }}>-</span>}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ background: sb.bg, color: sb.color, borderRadius: 5, padding: '3px 10px', fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600 }}>
                          {sb.label}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <Link href={`/admin/marketplace/${p.id}`} style={{ ...A.btnOutline, gap: 5 }}>
                            <Pencil size={13} />
                            Editeaza
                          </Link>
                          {p.demoUrl && (
                            <a href={p.demoUrl} target="_blank" rel="noopener" style={{ ...A.btnOutline, gap: 5 }}>
                              <ExternalLink size={13} />
                            </a>
                          )}
                          <button onClick={() => deleteProduct(p.id, p.title)} style={A.btnDanger}>
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {products.length === 0 && (
              <div style={{ textAlign: 'center', padding: 48 }}>
                <p style={{ fontFamily: 'var(--font-body)', color: '#64748B', marginBottom: 16 }}>Niciun produs adaugat inca.</p>
                <Link href="/admin/marketplace/new" style={A.btnPrimary}><Plus size={15} />Adauga primul produs</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
