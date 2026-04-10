import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { MARKETPLACE_PRODUCTS } from '@/lib/marketplace-data';
import type { MarketplaceProduct } from '@/types/marketplace';

async function getAll(): Promise<MarketplaceProduct[]> {
  const { data, error } = await supabaseAdmin.from('marketplace_products').select('*').order('id');
  if (error || !data || data.length === 0) return MARKETPLACE_PRODUCTS;
  return data as MarketplaceProduct[];
}

/** GET /api/admin/marketplace — all products (including draft) */
export async function GET() {
  const products = await getAll();
  return NextResponse.json(products);
}

/** POST /api/admin/marketplace — create product */
export async function POST(req: NextRequest) {
  const body    = await req.json() as MarketplaceProduct;
  const newId   = String(Date.now());
  const product = { ...body, id: newId, publishedAt: body.publishedAt || new Date().toISOString().split('T')[0] };
  const { error } = await supabaseAdmin.from('marketplace_products').insert(product);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(product, { status: 201 });
}
