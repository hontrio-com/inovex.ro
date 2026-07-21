import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireRole } from '@/lib/auth';
import { packageSchema } from '@/lib/crm/schemas';

/** PATCH /api/admin/pachete/[id] — editare pachet (doar owner/admin). */
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireRole(['owner', 'admin']);
  if (auth.error) return auth.error;
  const { id } = await params;

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Date invalide' }, { status: 400 }); }
  const parsed = packageSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Date invalide' }, { status: 400 });

  const { data, error } = await supabaseAdmin
    .from('crm_maintenance_packages')
    .update(parsed.data)
    .eq('id', id)
    .select('*')
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: 'Pachet inexistent' }, { status: 404 });

  return NextResponse.json({ item: data });
}

/** DELETE /api/admin/pachete/[id] — stergere pachet (doar owner/admin). Abonamentele raman (package_id -> null). */
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireRole(['owner', 'admin']);
  if (auth.error) return auth.error;
  const { id } = await params;

  const { error } = await supabaseAdmin.from('crm_maintenance_packages').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
