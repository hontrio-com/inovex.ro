import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireRole } from '@/lib/auth';
import { guardClient } from '@/lib/crm/guard';

/** GET /api/admin/clienti/[id]/contracte — contractele clientului (read-only; gestionate in Faza E). */
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireRole(['owner', 'admin']);
  if (auth.error) return auth.error;
  const { id } = await params;

  const guard = await guardClient(id, auth.user);
  if (guard.error) return guard.error;

  const { data, error } = await supabaseAdmin
    .from('crm_contracts')
    .select('id, contract_number, title, status, value, currency, created_at, signed_at')
    .eq('client_id', id)
    .order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ items: data ?? [] });
}
