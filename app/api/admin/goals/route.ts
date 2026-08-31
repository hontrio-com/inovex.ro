import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireAuth, requireRole } from '@/lib/auth';
import { goalSchema } from '@/lib/crm/schemas';
import { getActiveGoal, computeGoalProgress, type CrmGoal } from '@/lib/crm/goal';

/**
 * Obiectivul activ de conversii + progresul calculat din date reale.
 * Un singur obiectiv activ (index unic partial pe metric), cele vechi raman ca istoric.
 */

/** GET — obiectivul activ si progresul. Vizibil pentru tot staff-ul. */
export async function GET() {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  const goal = await getActiveGoal();
  if (!goal) return NextResponse.json({ goal: null, progress: null });

  const progress = await computeGoalProgress(goal);
  return NextResponse.json({ goal, progress });
}

/** POST — seteaza un obiectiv nou; cel activ anterior se arhiveaza. Doar owner/admin. */
export async function POST(req: NextRequest) {
  const auth = await requireRole(['owner', 'admin']);
  if (auth.error) return auth.error;

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Date invalide' }, { status: 400 }); }
  const parsed = goalSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Date invalide' }, { status: 400 });

  // Indexul unic accepta un singur rand activ per metrica, deci dezactivam intai.
  await supabaseAdmin.from('crm_goals').update({ is_active: false })
    .eq('metric', 'leads_converted').eq('is_active', true);

  const { data, error } = await supabaseAdmin.from('crm_goals')
    .insert({ ...parsed.data, metric: 'leads_converted', is_active: true, created_by: auth.user.id })
    .select('*')
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const progress = await computeGoalProgress(data as CrmGoal);
  return NextResponse.json({ goal: data, progress }, { status: 201 });
}

/** PATCH — modifica obiectivul activ. Doar owner/admin. */
export async function PATCH(req: NextRequest) {
  const auth = await requireRole(['owner', 'admin']);
  if (auth.error) return auth.error;

  const current = await getActiveGoal();
  if (!current) return NextResponse.json({ error: 'Niciun obiectiv activ' }, { status: 404 });

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Date invalide' }, { status: 400 }); }
  const parsed = goalSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Date invalide' }, { status: 400 });

  const { data, error } = await supabaseAdmin.from('crm_goals')
    .update(parsed.data).eq('id', current.id).select('*').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const progress = await computeGoalProgress(data as CrmGoal);
  return NextResponse.json({ goal: data, progress });
}

/** DELETE — arhiveaza obiectivul activ (nu se sterge, ramane in istoric). Doar owner/admin. */
export async function DELETE() {
  const auth = await requireRole(['owner', 'admin']);
  if (auth.error) return auth.error;

  const current = await getActiveGoal();
  if (!current) return NextResponse.json({ error: 'Niciun obiectiv activ' }, { status: 404 });

  const { error } = await supabaseAdmin.from('crm_goals').update({ is_active: false }).eq('id', current.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
