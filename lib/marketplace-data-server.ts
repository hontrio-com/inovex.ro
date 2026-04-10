/**
 * Server-only marketplace data functions.
 * Citeste din Supabase (marketplace_products).
 * Fallback la datele statice TS daca tabela e goala.
 * DO NOT import this file from client components.
 */
import type { MarketplaceProduct } from '@/types/marketplace';
import { MARKETPLACE_PRODUCTS } from './marketplace-data';
import { supabase } from './supabase';

async function getAllFromStorage(): Promise<MarketplaceProduct[]> {
  try {
    const { data, error } = await supabase
      .from('marketplace_products')
      .select('*')
      .eq('status', 'published')
      .order('id');
    if (error) return MARKETPLACE_PRODUCTS;
    if (!data || data.length === 0) return [];
    return data as MarketplaceProduct[];
  } catch {
    return MARKETPLACE_PRODUCTS;
  }
}

export async function getAllProductsAsync(): Promise<MarketplaceProduct[]> {
  return getAllFromStorage();
}

export async function getProductBySlugAsync(slug: string): Promise<MarketplaceProduct | undefined> {
  try {
    const { data } = await supabase
      .from('marketplace_products')
      .select('*')
      .eq('slug', slug)
      .single();
    if (data) return data as MarketplaceProduct;
  } catch {
    // fallback
  }
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
