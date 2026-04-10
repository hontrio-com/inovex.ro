'use client';

import { AdminHeader } from '@/app/admin/_components/AdminPage';
import { ProductForm, emptyProduct } from '../_ProductForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NewProductPage() {
  return (
    <div>
      <AdminHeader
        title="Produs Nou"
        desc="Adauga un produs nou in Marketplace"
        action={
          <Link href="/admin/marketplace" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#64748B', textDecoration: 'none' }}>
            <ArrowLeft size={14} />
            Inapoi la lista
          </Link>
        }
      />
      <ProductForm initial={emptyProduct()} isNew={true} />
    </div>
  );
}
