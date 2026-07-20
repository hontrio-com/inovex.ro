import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireAuth } from '@/lib/auth';
import { guardClient } from '@/lib/crm/guard';

/** GET /api/admin/clienti/[id]/abonamente — abonamentele clientului (read-only; gestionate in Faza F). */
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const { id } = await params;

  const guard = await guardClient(id, auth.user);
  if (guard.error) return guard.error;

  const { data, error } = await supabaseAdmin
    .from('crm_subscriptions')
    .select('id, name, status, price, currency, billing_cycle, next_renewal_date')
    .eq('client_id', id)
    .order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ items: data ?? [] });
}
