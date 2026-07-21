import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireRole } from '@/lib/auth';
import { packageSchema } from '@/lib/crm/schemas';

/** GET /api/admin/pachete — lista pachetelor de mentenanta (+ nr. abonamente care le folosesc). */
export async function GET() {
  const auth = await requireRole(['owner', 'admin']);
  if (auth.error) return auth.error;

  const { data, error } = await supabaseAdmin
    .from('crm_maintenance_packages')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: subs } = await supabaseAdmin.from('crm_subscriptions').select('package_id');
  const usage = new Map<string, number>();
  (subs ?? []).forEach((s) => { if (s.package_id) usage.set(s.package_id, (usage.get(s.package_id) ?? 0) + 1); });

  const items = (data ?? []).map((p) => ({ ...p, usage_count: usage.get(p.id) ?? 0 }));
  return NextResponse.json({ items });
}

/** POST /api/admin/pachete — creare pachet (doar owner/admin). */
export async function POST(req: NextRequest) {
  const auth = await requireRole(['owner', 'admin']);
  if (auth.error) return auth.error;

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Date invalide' }, { status: 400 }); }
  const parsed = packageSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Date invalide' }, { status: 400 });

  const { data, error } = await supabaseAdmin
    .from('crm_maintenance_packages')
    .insert({ ...parsed.data, created_by: auth.user.id })
    .select('*')
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ item: { ...data, usage_count: 0 } }, { status: 201 });
}
