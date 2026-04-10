import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { MARKETPLACE_PRODUCTS } from '@/lib/marketplace-data';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('marketplace_products')
      .select('*')
      .eq('status', 'published')
      .order('id');

    if (error || !data || data.length === 0) {
      return NextResponse.json(MARKETPLACE_PRODUCTS.filter((p) => p.status === 'published'));
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(MARKETPLACE_PRODUCTS.filter((p) => p.status === 'published'));
  }
}
