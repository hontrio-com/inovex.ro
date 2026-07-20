import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireAuth } from '@/lib/auth';
import { canAccessAssigned } from '@/lib/crm/access';

/**
 * POST /api/admin/lead-uri/[id]/convert — converteste lead-ul intr-un client.
 * Idempotent: daca lead-ul e deja convertit, intoarce clientul existent.
 */
export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const { id } = await params;

  const { data: lead } = await supabaseAdmin.from('crm_leads').select('*').eq('id', id).single();
  if (!lead) return NextResponse.json({ error: 'Lead inexistent' }, { status: 404 });
  if (!canAccessAssigned(auth.user, lead.assigned_to)) {
    return NextResponse.json({ error: 'Acces interzis' }, { status: 403 });
  }

  if (lead.converted_client_id) {
    return NextResponse.json({ client_id: lead.converted_client_id, already: true });
  }

  // Creaza clientul, pre-populat din lead.
  const { data: client, error: cErr } = await supabaseAdmin
    .from('crm_clients')
    .insert({
      name: lead.company || lead.name || 'Client nou',
      type: 'PJ',
      email: lead.email,
      phone: lead.phone,
      contact_person: lead.company ? lead.name : null,
      source: lead.source || lead.platform,
      status: 'activ',
      assigned_to: lead.assigned_to,
      created_by: auth.user.id,
    })
    .select('id')
    .single();
  if (cErr) return NextResponse.json({ error: cErr.message }, { status: 500 });

  await supabaseAdmin
    .from('crm_leads')
    .update({
      converted_client_id: client.id,
      converted_at: new Date().toISOString(),
      status: 'castigat',
    })
    .eq('id', id);

  await supabaseAdmin.from('crm_activities').insert([
    { type: 'system', title: 'Client creat din lead', client_id: client.id, created_by: auth.user.id },
    { type: 'system', title: 'Lead convertit in client', lead_id: id, created_by: auth.user.id },
  ]);

  return NextResponse.json({ client_id: client.id }, { status: 201 });
}
