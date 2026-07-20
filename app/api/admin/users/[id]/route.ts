import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase';
import { requireRole } from '@/lib/auth';

const patchSchema = z
  .object({
    role: z.enum(['owner', 'admin', 'agent']).optional(),
    is_active: z.boolean().optional(),
    full_name: z.string().trim().min(1).nullable().optional(),
  })
  .refine((d) => d.role !== undefined || d.is_active !== undefined || d.full_name !== undefined, {
    message: 'Nimic de actualizat',
  });

/** PATCH /api/admin/crm/users/[id] — actualizare rol / status / nume (doar owner) */
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireRole(['owner']);
  if (auth.error) return auth.error;
  const { id } = await params;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Date invalide' }, { status: 400 });
  }

  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Date invalide' }, { status: 400 });
  }

  // Protectie anti auto-blocare: owner-ul nu-si poate schimba propriul rol
  // sau dezactiva propriul cont (ar risca sa piarda accesul).
  if (id === auth.user.id) {
    if (parsed.data.role && parsed.data.role !== 'owner') {
      return NextResponse.json({ error: 'Nu iti poti schimba propriul rol de owner' }, { status: 400 });
    }
    if (parsed.data.is_active === false) {
      return NextResponse.json({ error: 'Nu iti poti dezactiva propriul cont' }, { status: 400 });
    }
  }

  const update: Record<string, unknown> = {};
  if (parsed.data.role !== undefined) update.role = parsed.data.role;
  if (parsed.data.is_active !== undefined) update.is_active = parsed.data.is_active;
  if (parsed.data.full_name !== undefined) update.full_name = parsed.data.full_name;

  const { data: profile, error } = await supabaseAdmin
    .from('profiles')
    .update(update)
    .eq('id', id)
    .select('id, email, full_name, role, is_active, created_at')
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ user: profile });
}

/** DELETE /api/admin/crm/users/[id] — stergere utilizator (doar owner) */
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireRole(['owner']);
  if (auth.error) return auth.error;
  const { id } = await params;

  if (id === auth.user.id) {
    return NextResponse.json({ error: 'Nu iti poti sterge propriul cont' }, { status: 400 });
  }

  // Stergerea userului din auth.users cascadeaza si profilul (FK on delete cascade).
  const { error } = await supabaseAdmin.auth.admin.deleteUser(id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
