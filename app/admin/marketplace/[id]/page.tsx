'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { AdminHeader } from '@/app/admin/_components/AdminPage';
import { ProductForm, emptyProduct } from '../_ProductForm';
import type { MarketplaceProduct } from '@/types/marketplace';

export default function EditProductPage() {
  const { id } = useParams() as { id: string };
  const [product, setProduct] = useState<MarketplaceProduct | null>(null);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    fetch(`/api/admin/marketplace/${id}`)
      .then((r) => r.json())
      .then((p) => setProduct(p))
      .catch(() => setProduct(emptyProduct()))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div style={{ padding: 48, textAlign: 'center', fontFamily: 'var(--font-body)', color: '#64748B' }}>Se incarca...</div>;
  if (!product) return <div style={{ padding: 48, textAlign: 'center', fontFamily: 'var(--font-body)', color: '#EF4444' }}>Produsul nu a fost gasit.</div>;

  return (
    <div>
      <AdminHeader
        title={product.title || 'Editeaza Produs'}
        desc={`/${product.slug}`}
        action={
          <Link href="/admin/marketplace" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#64748B', textDecoration: 'none' }}>
            <ArrowLeft size={14} />
            Inapoi la lista
          </Link>
        }
      />
      <ProductForm initial={product} isNew={false} />
    </div>
  );
}
