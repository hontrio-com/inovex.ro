import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireRole } from '@/lib/auth';
import { templateSchema } from '@/lib/crm/schemas';

/** GET /api/admin/contracte/sabloane/[id] */
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireRole(['owner', 'admin']);
  if (error) return error;
  const { id } = await params;

  const { data, error: dbError } = await supabaseAdmin
    .from('crm_contract_templates').select('*').eq('id', id).single();
  if (dbError || !data) return NextResponse.json({ error: 'Sablon inexistent' }, { status: 404 });
  return NextResponse.json({ template: data });
}

/** PATCH /api/admin/contracte/sabloane/[id] */
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireRole(['owner', 'admin']);
  if (error) return error;
  const { id } = await params;

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Date invalide' }, { status: 400 }); }
  const parsed = templateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Date invalide' }, { status: 400 });

  const { data, error: dbError } = await supabaseAdmin
    .from('crm_contract_templates').update(parsed.data).eq('id', id).select('*').single();
  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 });
  return NextResponse.json({ template: data });
}

/** DELETE /api/admin/contracte/sabloane/[id] */
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireRole(['owner', 'admin']);
  if (error) return error;
  const { id } = await params;

  const { error: dbError } = await supabaseAdmin.from('crm_contract_templates').delete().eq('id', id);
  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
