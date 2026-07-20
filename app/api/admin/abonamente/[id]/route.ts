import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireAuth } from '@/lib/auth';
import { guardClient } from '@/lib/crm/guard';
import { subscriptionSchema } from '@/lib/crm/schemas';

async function loadSub(id: string) {
  const { data } = await supabaseAdmin.from('crm_subscriptions').select('*').eq('id', id).single();
  return data;
}

/** GET /api/admin/abonamente/[id] */
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const { id } = await params;

  const sub = await loadSub(id);
  if (!sub) return NextResponse.json({ error: 'Abonament inexistent' }, { status: 404 });
  const guard = await guardClient(sub.client_id, auth.user);
  if (guard.error) return guard.error;

  return NextResponse.json({ subscription: sub });
}

/** PATCH /api/admin/abonamente/[id] */
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const { id } = await params;

  const existing = await loadSub(id);
  if (!existing) return NextResponse.json({ error: 'Abonament inexistent' }, { status: 404 });
  const guard = await guardClient(existing.client_id, auth.user);
  if (guard.error) return guard.error;

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Date invalide' }, { status: 400 }); }
  const parsed = subscriptionSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Date invalide' }, { status: 400 });

  // Clientul nu se schimba prin editarea abonamentului.
  const { data, error } = await supabaseAdmin
    .from('crm_subscriptions')
    .update({ ...parsed.data, client_id: existing.client_id })
    .eq('id', id)
    .select('*, client:crm_clients(id, name)')
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ subscription: data });
}

/** DELETE /api/admin/abonamente/[id] */
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const { id } = await params;

  const existing = await loadSub(id);
  if (!existing) return NextResponse.json({ error: 'Abonament inexistent' }, { status: 404 });
  const guard = await guardClient(existing.client_id, auth.user);
  if (guard.error) return guard.error;

  const { error } = await supabaseAdmin.from('crm_subscriptions').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
