import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireRole } from '@/lib/auth';
import { templateSchema } from '@/lib/crm/schemas';

/** GET /api/admin/contracte/sabloane — lista sabloanelor. */
export async function GET() {
  const { error } = await requireRole(['owner', 'admin']);
  if (error) return error;

  const { data, error: dbError } = await supabaseAdmin
    .from('crm_contract_templates')
    .select('*')
    .order('created_at', { ascending: false });
  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 });
  return NextResponse.json({ items: data ?? [] });
}

/** POST /api/admin/contracte/sabloane — creare sablon. */
export async function POST(req: NextRequest) {
  const auth = await requireRole(['owner', 'admin']);
  if (auth.error) return auth.error;

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Date invalide' }, { status: 400 }); }
  const parsed = templateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Date invalide' }, { status: 400 });

  const { data, error } = await supabaseAdmin
    .from('crm_contract_templates')
    .insert({ ...parsed.data, created_by: auth.user.id })
    .select('*')
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ template: data }, { status: 201 });
}
