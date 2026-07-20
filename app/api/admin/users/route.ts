import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase';
import { requireRole } from '@/lib/auth';

const createSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Parola trebuie sa aiba minim 8 caractere'),
  full_name: z.string().trim().min(1).optional(),
  role: z.enum(['owner', 'admin', 'agent']),
});

/** GET /api/admin/crm/users — listare utilizatori (doar owner) */
export async function GET() {
  const { error: authError } = await requireRole(['owner']);
  if (authError) return authError;

  const { data, error } = await supabaseAdmin
    .from('profiles')
    .select('id, email, full_name, role, is_active, created_at')
    .order('created_at', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ users: data ?? [] });
}

/** POST /api/admin/crm/users — creare utilizator (doar owner) */
export async function POST(req: NextRequest) {
  const { error: authError } = await requireRole(['owner']);
  if (authError) return authError;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Date invalide' }, { status: 400 });
  }

  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Date invalide' }, { status: 400 });
  }
  const { email, password, full_name, role } = parsed.data;

  // Cream userul in Supabase Auth. Trigger-ul on_auth_user_created creeaza
  // automat profilul (rol implicit 'agent'); il actualizam la rolul dorit.
  const { data: created, error: createErr } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: full_name ? { full_name } : undefined,
  });

  if (createErr || !created.user) {
    return NextResponse.json({ error: createErr?.message ?? 'Eroare la crearea utilizatorului' }, { status: 400 });
  }

  const { data: profile, error: updErr } = await supabaseAdmin
    .from('profiles')
    .update({ role, full_name: full_name ?? null })
    .eq('id', created.user.id)
    .select('id, email, full_name, role, is_active, created_at')
    .single();

  if (updErr) return NextResponse.json({ error: updErr.message }, { status: 500 });
  return NextResponse.json({ user: profile }, { status: 201 });
}
