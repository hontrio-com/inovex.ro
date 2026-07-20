import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import type { SessionUser } from '@/lib/auth';
import { canAccessClient, canAccessAssigned } from './access';

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

type LeadGuardResult =
  | { lead: { id: string; assigned_to: string | null }; error: null }
  | { lead: null; error: NextResponse };

/** Incarca lead-ul si verifica accesul (agentul doar lead-urile alocate lui). */
export async function guardLead(leadId: string, user: SessionUser): Promise<LeadGuardResult> {
  const { data: lead } = await supabaseAdmin
    .from('crm_leads')
    .select('id, assigned_to')
    .eq('id', leadId)
    .single();

  if (!lead) {
    return { lead: null, error: NextResponse.json({ error: 'Lead inexistent' }, { status: 404 }) };
  }
  if (!canAccessAssigned(user, lead.assigned_to)) {
    return { lead: null, error: NextResponse.json({ error: 'Acces interzis' }, { status: 403 }) };
  }
  return { lead, error: null };
}
