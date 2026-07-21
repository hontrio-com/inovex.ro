import { cache } from 'react';
import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { supabaseAdmin } from '@/lib/supabase';

/** Rolurile din CRM. Vezi matricea de permisiuni din specificatie. */
export type Role = 'owner' | 'admin' | 'agent';

export interface SessionUser {
  id: string;
  email: string;
  role: Role;
  fullName: string | null;
  isActive: boolean;
}

/**
 * Returneaza utilizatorul autentificat impreuna cu profilul (rol) din tabelul
 * `profiles`, sau `null` daca nu e logat / profilul e dezactivat.
 *
 * Sesiunea e validata de Supabase (`getUser` verifica JWT-ul pe server), iar
 * profilul e citit cu service role (bypass RLS) ca sa evitam recursivitatea RLS.
 */
export const getSessionUser = cache(async (): Promise<SessionUser | null> => {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('email, full_name, role, is_active')
    .eq('id', user.id)
    .single();

  // Fara profil sau cont dezactivat => tratat ca neautentificat.
  if (!profile || profile.is_active === false) return null;

  return {
    id: user.id,
    email: profile.email ?? user.email ?? '',
    role: (profile.role ?? 'agent') as Role,
    fullName: profile.full_name ?? null,
    isActive: profile.is_active ?? true,
  };
});

type RequireRoleResult =
  | { user: SessionUser; error: null }
  | { user: null; error: NextResponse };

/**
 * Guard pentru rute API: verifica autentificarea si rolul pe server.
 * Utilizare:
 *   const { user, error } = await requireRole(['owner', 'admin']);
 *   if (error) return error;
 *   // ... user e garantat prezent si cu rol permis
 */
export async function requireRole(allowed: Role[]): Promise<RequireRoleResult> {
  const user = await getSessionUser();
  if (!user) {
    return {
      user: null,
      error: NextResponse.json({ error: 'Neautentificat' }, { status: 401 }),
    };
  }
  if (!allowed.includes(user.role)) {
    return {
      user: null,
      error: NextResponse.json({ error: 'Acces interzis' }, { status: 403 }),
    };
  }
  return { user, error: null };
}

/** Prescurtare: orice utilizator autentificat cu profil activ (orice rol). */
export function requireAuth(): Promise<RequireRoleResult> {
  return requireRole(['owner', 'admin', 'agent']);
}

/**
 * Guard pentru PAGINI (server components) rezervate staff-ului (owner/admin).
 * Neautentificat -> /admin/login; agent -> /admin/lead-uri (singura lui sectiune).
 * Returneaza userul (garantat owner/admin).
 */
export async function requireStaffPage(): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) redirect('/admin/login');
  if (user.role === 'agent') redirect('/admin/lead-uri');
  return user;
}
