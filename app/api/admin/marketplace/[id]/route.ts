import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { MARKETPLACE_PRODUCTS } from '@/lib/marketplace-data';
import type { MarketplaceProduct } from '@/types/marketplace';

async function getById(id: string): Promise<MarketplaceProduct | null> {
  const { data } = await supabaseAdmin
    .from('marketplace_products')
    .select('*')
    .or(`id.eq.${id},slug.eq.${id}`)
    .single();
  if (data) return data as MarketplaceProduct;
  return MARKETPLACE_PRODUCTS.find((p) => p.id === id || p.slug === id) ?? null;
}

/** GET /api/admin/marketplace/[id] */
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = await getById(id);
  if (!p) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(p);
}

/** PUT /api/admin/marketplace/[id] */
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body   = await req.json() as MarketplaceProduct;
  const { data, error } = await supabaseAdmin
    .from('marketplace_products')
    .upsert({ ...body, id })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

/** DELETE /api/admin/marketplace/[id] */
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { error } = await supabaseAdmin
    .from('marketplace_products')
    .delete()
    .eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
