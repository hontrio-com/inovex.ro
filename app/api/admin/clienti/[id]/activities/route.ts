import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireAuth } from '@/lib/auth';
import { guardClient } from '@/lib/crm/guard';
import { activityCreateSchema } from '@/lib/crm/schemas';

/** GET /api/admin/clienti/[id]/activities — timeline activitati. */
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const { id } = await params;

  const guard = await guardClient(id, auth.user);
  if (guard.error) return guard.error;

  const { data, error } = await supabaseAdmin
    .from('crm_activities')
    .select('*')
    .eq('client_id', id)
    .order('created_at', { ascending: false })
    .limit(200);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ items: data ?? [] });
}

/** POST /api/admin/clienti/[id]/activities — adauga nota/apel/email/meeting/task. */
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const { id } = await params;

  const guard = await guardClient(id, auth.user);
  if (guard.error) return guard.error;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Date invalide' }, { status: 400 });
  }

  const parsed = activityCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Date invalide' }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from('crm_activities')
    .insert({
      type: parsed.data.type,
      title: parsed.data.title,
      body: parsed.data.body,
      client_id: id,
      created_by: auth.user.id,
    })
    .select('*')
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ activity: data }, { status: 201 });
}
