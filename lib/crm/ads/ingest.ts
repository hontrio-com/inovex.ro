import { supabaseAdmin } from '@/lib/supabase';

/**
 * Ingest comun pentru lead-urile venite din platformele de ads (webhook-uri).
 * - dedublare pe (platform, platform_lead_id) — un lead nu intra de doua ori
 * - salveaza payload-ul brut pentru audit
 * - logheaza activitatea "Lead primit din ..."
 */

export interface IngestInput {
  platform: 'meta' | 'tiktok' | 'google';
  platformLeadId: string;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  campaign?: string | null;
  source?: string | null;
  notes?: string | null;
  gclid?: string | null;
  fbclid?: string | null;
  ttclid?: string | null;
  raw?: unknown;
}

const PLATFORM_LABEL: Record<IngestInput['platform'], string> = {
  meta: 'Meta Ads', tiktok: 'TikTok Ads', google: 'Google Ads',
};

const trim = (v: string | null | undefined, max = 500) =>
  v == null ? null : String(v).trim().slice(0, max) || null;

export async function ingestLead(input: IngestInput): Promise<{ created: boolean; leadId: string | null }> {
  const platformLeadId = trim(input.platformLeadId, 200);
  if (!platformLeadId) return { created: false, leadId: null };

  // Dedublare: exista deja?
  const { data: existing } = await supabaseAdmin
    .from('crm_leads')
    .select('id')
    .eq('platform', input.platform)
    .eq('platform_lead_id', platformLeadId)
    .maybeSingle();
  if (existing) return { created: false, leadId: existing.id };

  const { data, error } = await supabaseAdmin
    .from('crm_leads')
    .insert({
      name: trim(input.name, 200),
      email: trim(input.email, 200)?.toLowerCase() ?? null,
      phone: trim(input.phone, 50),
      status: 'nou',
      platform: input.platform,
      source: trim(input.source, 120) ?? PLATFORM_LABEL[input.platform],
      campaign: trim(input.campaign, 200),
      notes: trim(input.notes, 5000),
      platform_lead_id: platformLeadId,
      gclid: trim(input.gclid, 200),
      fbclid: trim(input.fbclid, 200),
      ttclid: trim(input.ttclid, 200),
      raw_payload: input.raw ?? null,
    })
    .select('id')
    .single();

  if (error) {
    // Cursa de dedublare (23505 = unique violation) — lead-ul a intrat intre timp.
    if (error.code === '23505') return { created: false, leadId: null };
    throw new Error(error.message);
  }

  await supabaseAdmin.from('crm_activities').insert({
    type: 'system',
    title: `Lead primit din ${PLATFORM_LABEL[input.platform]}`,
    body: input.campaign ? `Campanie: ${input.campaign}` : null,
    lead_id: data.id,
  });

  return { created: true, leadId: data.id };
}
