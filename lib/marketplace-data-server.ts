/**
 * Server-only marketplace data functions.
 * Citeste din Supabase (marketplace_products).
 * Fallback la datele statice TS daca tabela e goala.
 * DO NOT import this file from client components.
 */
import type { MarketplaceProduct } from '@/types/marketplace';
import { MARKETPLACE_PRODUCTS } from './marketplace-data';
import { supabaseAdmin } from './supabase';

async function getAllFromStorage(): Promise<MarketplaceProduct[]> {
  const { data, error } = await supabaseAdmin
    .from('marketplace_products')
    .select('*')
    .order('id');
  if (error || !data || data.length === 0) return MARKETPLACE_PRODUCTS;
  return data as MarketplaceProduct[];
}

export async function getAllProductsAsync(): Promise<MarketplaceProduct[]> {
  const all = await getAllFromStorage();
  return all.filter((p) => p.status === 'published');
}

export async function getProductBySlugAsync(slug: string): Promise<MarketplaceProduct | undefined> {
  const { data } = await supabaseAdmin
    .from('marketplace_products')
    .select('*')
    .eq('slug', slug)
    .single();
  if (data) return data as MarketplaceProduct;
  // fallback la date statice
  return MARKETPLACE_PRODUCTS.find((p) => p.slug === slug);
}

export async function getRelatedProductsAsync(product: MarketplaceProduct): Promise<MarketplaceProduct[]> {
  const all = await getAllFromStorage();
  return (product.relatedSlugs as string[])
    .map((s) => all.find((p) => p.slug === s))
    .filter((p): p is MarketplaceProduct => !!p && p.status === 'published');
}

export async function getFeaturedProductsAsync(limit?: number): Promise<MarketplaceProduct[]> {
  const all = await getAllFromStorage();
  const featured = all.filter((p) => p.featured && p.status === 'published');
  return limit ? featured.slice(0, limit) : featured;
}
