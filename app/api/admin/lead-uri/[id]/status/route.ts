import { NextRequest, NextResponse } from 'next/server';
import { after } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireAuth } from '@/lib/auth';
import { guardLead } from '@/lib/crm/guard';
import { leadStatusSchema } from '@/lib/crm/schemas';
import { recordSignals, flushLeadSignals, SIGNAL_STAGES, type SignalStage } from '@/lib/crm/ads/signals';

/**
 * PATCH /api/admin/lead-uri/[id]/status — schimbare rapida de status
 * (drag & drop Kanban, marcare castigat/pierdut). Logheaza in timeline.
 */
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const { id } = await params;

  const guard = await guardLead(id, auth.user);
  if (guard.error) return guard.error;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Date invalide' }, { status: 400 });
  }

  const parsed = leadStatusSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Date invalide' }, { status: 400 });
  }

  const { data: current } = await supabaseAdmin.from('crm_leads').select('status').eq('id', id).single();

  const update: Record<string, unknown> = { status: parsed.data.status };
  // Motivul pierderii se pastreaza doar pentru status 'pierdut'.
  update.lost_reason = parsed.data.status === 'pierdut' ? parsed.data.lost_reason ?? null : null;
  // Valoarea contractului se seteaza la conversie (pleaca in semnalul lead_converted).
  if (parsed.data.status === 'convertit' && parsed.data.estimated_value != null) {
    update.estimated_value = parsed.data.estimated_value;
  }

  const { data, error } = await supabaseAdmin
    .from('crm_leads')
    .update(update)
    .eq('id', id)
    .select('*')
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (current && current.status !== parsed.data.status) {
    await supabaseAdmin.from('crm_activities').insert({
      type: 'status_change',
      title: `Status: ${current.status} → ${parsed.data.status}`,
      body: parsed.data.status === 'pierdut' && parsed.data.lost_reason ? `Motiv: ${parsed.data.lost_reason}` : null,
      lead_id: id,
      created_by: auth.user.id,
    });

    // Semnal de calitate catre platforma de ads (dupa raspuns, fara sa blocheze UI-ul).
    if (SIGNAL_STAGES.includes(parsed.data.status as SignalStage)) {
      await recordSignals(id, parsed.data.status as SignalStage);
      after(() => flushLeadSignals(id));
    }
  }

  return NextResponse.json({ lead: data });
}
