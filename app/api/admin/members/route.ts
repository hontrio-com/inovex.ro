import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireAuth } from '@/lib/auth';

/**
 * GET /api/admin/members — membrii echipei (pentru dropdown-uri de alocare
 * si afisarea numelor). Info minima, accesibil oricarui utilizator autentificat.
 */
export async function GET() {
  const { error } = await requireAuth();
  if (error) return error;

  const { data, error: dbError } = await supabaseAdmin
    .from('profiles')
    .select('id, full_name, email, role, is_active')
    .eq('is_active', true)
    .order('full_name', { ascending: true, nullsFirst: false });

  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 });
  return NextResponse.json({ members: data ?? [] });
}
