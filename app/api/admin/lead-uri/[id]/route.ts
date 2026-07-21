import { NextRequest, NextResponse } from 'next/server';
import { after } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireAuth } from '@/lib/auth';
import { leadSchema } from '@/lib/crm/schemas';
import { canAccessAssigned, isPrivileged } from '@/lib/crm/access';
import { recordSignals, flushLeadSignals, SIGNAL_STAGES, type SignalStage } from '@/lib/crm/ads/signals';

async function loadLead(id: string) {
  const { data } = await supabaseAdmin.from('crm_leads').select('*').eq('id', id).single();
  return data;
}

/** GET /api/admin/lead-uri/[id] */
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const { id } = await params;

  const lead = await loadLead(id);
  if (!lead) return NextResponse.json({ error: 'Lead inexistent' }, { status: 404 });
  if (!canAccessAssigned(auth.user, lead.assigned_to)) {
    return NextResponse.json({ error: 'Acces interzis' }, { status: 403 });
  }
  return NextResponse.json({ lead });
}

/** PATCH /api/admin/lead-uri/[id] */
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const { id } = await params;

  const existing = await loadLead(id);
  if (!existing) return NextResponse.json({ error: 'Lead inexistent' }, { status: 404 });
  if (!canAccessAssigned(auth.user, existing.assigned_to)) {
    return NextResponse.json({ error: 'Acces interzis' }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Date invalide' }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Date invalide' }, { status: 400 });
  }

  const assigned_to = auth.user.role === 'agent' ? existing.assigned_to : parsed.data.assigned_to;

  const { data, error } = await supabaseAdmin
    .from('crm_leads')
    .update({ ...parsed.data, assigned_to })
    .eq('id', id)
    .select('*')
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (existing.status !== parsed.data.status) {
    await supabaseAdmin.from('crm_activities').insert({
      type: 'status_change',
      title: `Status: ${existing.status} → ${parsed.data.status}`,
      lead_id: id,
      created_by: auth.user.id,
    });

    if (SIGNAL_STAGES.includes(parsed.data.status as SignalStage)) {
      await recordSignals(id, parsed.data.status as SignalStage);
      after(() => flushLeadSignals(id));
    }
  }

  return NextResponse.json({ lead: data });
}

/** DELETE /api/admin/lead-uri/[id] — doar owner/admin. */
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const { id } = await params;

  if (!isPrivileged(auth.user)) {
    return NextResponse.json({ error: 'Doar owner/admin pot sterge lead-uri' }, { status: 403 });
  }

  const { error } = await supabaseAdmin.from('crm_leads').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
