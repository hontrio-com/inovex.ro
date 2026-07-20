import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import type { SessionUser } from '@/lib/auth';
import { canAccessClient } from './access';

type GuardResult =
  | { client: { id: string; assigned_to: string | null }; error: null }
  | { client: null; error: NextResponse };

/**
 * Incarca clientul si verifica accesul (agentul doar clientii alocati lui).
 * Utilizare in rutele de sub-resurse (fisiere, activitati, contracte...).
 */
export async function guardClient(clientId: string, user: SessionUser): Promise<GuardResult> {
  const { data: client } = await supabaseAdmin
    .from('crm_clients')
    .select('id, assigned_to')
    .eq('id', clientId)
    .single();

  if (!client) {
    return { client: null, error: NextResponse.json({ error: 'Client inexistent' }, { status: 404 }) };
  }
  if (!canAccessClient(user, client.assigned_to)) {
    return { client: null, error: NextResponse.json({ error: 'Acces interzis' }, { status: 403 }) };
  }
  return { client, error: null };
}
