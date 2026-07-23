import crypto from 'crypto';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * Semnale de calitate catre platformele de ads — bucla de feedback care invata
 * algoritmii cine e clientul ideal:
 *   calificat   -> lead_qualified
 *   convertit   -> lead_converted (+ valoare)
 *   edinio      -> lead_edinio (eveniment separat, sa nu polueze optimizarea custom)
 *   necalificat -> lead_not_qualified (lead care NU a fost niciodata un fit —
 *                  semnal de targetare gresita)
 *   pierdut     -> lead_disqualified (lead CALIFICAT, urmarit, dar pierdut la
 *                  inchidere — profilul era totusi potrivit, semnal separat de
 *                  cel de mai sus ca sa nu strice targetarea pe cei care chiar
 *                  se califica)
 * Google nu are conversii negative -> necalificat si pierdut se sar (skip).
 *
 * Fluxul: recordSignals() insereaza randuri 'pending' (rapid, in request), iar
 * flushLeadSignals() trimite efectiv (apelat cu after() dupa raspuns + cron retry).
 */

export type SignalStage = 'calificat' | 'convertit' | 'edinio' | 'necalificat' | 'pierdut';
export const SIGNAL_STAGES: SignalStage[] = ['calificat', 'convertit', 'edinio', 'necalificat', 'pierdut'];

const EVENT_NAME: Record<SignalStage, string> = {
  calificat: 'lead_qualified',
  convertit: 'lead_converted',
  edinio: 'lead_edinio',
  necalificat: 'lead_not_qualified',
  pierdut: 'lead_disqualified',
};

interface LeadRow {
  id: string;
  platform: string | null;
  platform_lead_id: string | null;
  email: string | null;
  phone: string | null;
  fbclid: string | null;
  gclid: string | null;
  ttclid: string | null;
  fbp: string | null;
  estimated_value: number | null;
  currency: string | null;
  created_at: string;
}

const LEAD_FIELDS = 'id, platform, platform_lead_id, email, phone, fbclid, gclid, ttclid, fbp, estimated_value, currency, created_at';

/* ── Hashing (cerut de toate platformele pentru date personale) ── */
const sha256 = (v: string) => crypto.createHash('sha256').update(v).digest('hex');
const hashEmail = (email: string) => sha256(email.trim().toLowerCase());

/** Normalizeaza telefonul la cifre cu prefix de tara (implicit RO: 07... -> 407...). */
function phoneDigits(phone: string): string {
  let d = phone.replace(/\D/g, '');
  if (d.startsWith('00')) d = d.slice(2);
  else if (d.startsWith('0')) d = `4${d}`; // 07xx -> 407xx
  return d;
}
const hashPhone = (phone: string) => sha256(phoneDigits(phone));
const hashPhoneE164 = (phone: string) => sha256(`+${phoneDigits(phone)}`);

/* ── Ce platforme primesc semnale pentru un lead ── */
function targetPlatforms(lead: LeadRow): ('meta' | 'tiktok' | 'google')[] {
  const t: ('meta' | 'tiktok' | 'google')[] = [];
  if (lead.platform === 'meta' || lead.fbclid || lead.fbp) t.push('meta');
  if (lead.platform === 'tiktok' || lead.ttclid) t.push('tiktok');
  if (lead.platform === 'google' || lead.gclid) t.push('google');
  return t;
}

/* ── Configurare din env (per platforma) ── */
export function metaOutboundConfigured() {
  return Boolean(process.env.META_DATASET_ID && (process.env.META_CAPI_TOKEN || process.env.META_PAGE_TOKEN));
}
export function tiktokOutboundConfigured() {
  return Boolean(process.env.TIKTOK_ACCESS_TOKEN && (process.env.TIKTOK_EVENT_SOURCE_ID || process.env.TIKTOK_PIXEL_CODE));
}
export function googleOutboundConfigured() {
  // Data Manager API (inlocuieste ConversionUploadService de la 2026-06-15) nu
  // mai cere developer token — doar OAuth + ID-urile de cont.
  return Boolean(
    process.env.GOOGLE_ADS_CLIENT_ID && process.env.GOOGLE_ADS_CLIENT_SECRET &&
    process.env.GOOGLE_ADS_REFRESH_TOKEN && process.env.GOOGLE_ADS_CUSTOMER_ID,
  );
}

function googleConversionAction(stage: SignalStage): string | null {
  const id =
    stage === 'calificat' ? process.env.GOOGLE_ADS_CA_QUALIFIED :
    stage === 'convertit' ? process.env.GOOGLE_ADS_CA_CONVERTED :
    stage === 'edinio'    ? process.env.GOOGLE_ADS_CA_EDINIO : null;
  return id?.trim() || null;
}

/**
 * Inregistreaza semnalele pentru un lead ajuns intr-o etapa noua (idempotent —
 * unique pe lead+platforma+etapa). Rapid: doar insert-uri, fara HTTP.
 */
export async function recordSignals(leadId: string, stage: SignalStage): Promise<void> {
  const { data: lead } = await supabaseAdmin.from('crm_leads').select(LEAD_FIELDS).eq('id', leadId).single();
  if (!lead) return;
  const platforms = targetPlatforms(lead as LeadRow);
  if (platforms.length === 0) return;

  await supabaseAdmin.from('crm_lead_signals').upsert(
    platforms.map((platform) => ({ lead_id: leadId, platform, stage })),
    { onConflict: 'lead_id,platform,stage', ignoreDuplicates: true },
  );
}

/* ── Trimiterea efectiva ── */
interface SendResult { ok: boolean; error?: string; unconfigured?: boolean; skip?: boolean }

async function sendMeta(lead: LeadRow, stage: SignalStage, occurredAt: string): Promise<SendResult> {
  const dataset = process.env.META_DATASET_ID;
  const token = process.env.META_CAPI_TOKEN || process.env.META_PAGE_TOKEN;
  if (!dataset || !token) return { ok: false, unconfigured: true };

  const user_data: Record<string, unknown> = {};
  if (lead.platform === 'meta' && lead.platform_lead_id) user_data.lead_id = lead.platform_lead_id;
  if (lead.email) user_data.em = [hashEmail(lead.email)];
  if (lead.phone) user_data.ph = [hashPhone(lead.phone)];
  if (lead.fbp) user_data.fbp = lead.fbp;
  if (lead.fbclid) user_data.fbc = `fb.1.${Date.parse(lead.created_at)}.${lead.fbclid}`;
  if (Object.keys(user_data).length === 0) return { ok: false, skip: true, error: 'Fara identificatori (lead_id/email/telefon)' };

  const event = {
    event_name: EVENT_NAME[stage],
    event_time: Math.floor(Date.parse(occurredAt) / 1000),
    action_source: 'system_generated',
    user_data,
    custom_data: {
      lead_event_source: 'Inovex CRM',
      event_source: 'crm',
      ...(stage === 'convertit' && lead.estimated_value != null
        ? { currency: (lead.currency || 'RON').toLowerCase(), value: lead.estimated_value }
        : {}),
    },
  };

  const res = await fetch(`https://graph.facebook.com/v23.0/${dataset}/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: [event], access_token: token }),
  });
  const json = await res.json().catch(() => null);
  if (!res.ok) return { ok: false, error: JSON.stringify(json?.error ?? json ?? res.status).slice(0, 500) };
  return { ok: true };
}

async function sendTikTok(lead: LeadRow, stage: SignalStage, occurredAt: string): Promise<SendResult> {
  const token = process.env.TIKTOK_ACCESS_TOKEN;
  const crmSourceId = process.env.TIKTOK_EVENT_SOURCE_ID;
  const pixelCode = process.env.TIKTOK_PIXEL_CODE;
  if (!token || (!crmSourceId && !pixelCode)) return { ok: false, unconfigured: true };

  const user: Record<string, unknown> = {};
  if (lead.email) user.email = hashEmail(lead.email);
  if (lead.phone) user.phone = hashPhoneE164(lead.phone);

  // Lead din TikTok Lead Gen -> eveniment CRM cu lead_id; altfel web cu ttclid.
  let event_source: 'crm' | 'web';
  let event_source_id: string;
  if (lead.platform === 'tiktok' && lead.platform_lead_id && crmSourceId) {
    event_source = 'crm';
    event_source_id = crmSourceId;
    user.lead_id = lead.platform_lead_id;
  } else if (lead.ttclid && pixelCode) {
    event_source = 'web';
    event_source_id = pixelCode;
    user.ttclid = lead.ttclid;
  } else {
    return { ok: false, skip: true, error: 'Fara identificatori TikTok (lead_id/ttclid)' };
  }

  const body = {
    event_source,
    event_source_id,
    data: [{
      event: EVENT_NAME[stage],
      event_time: Math.floor(Date.parse(occurredAt) / 1000),
      user,
      ...(stage === 'convertit' && lead.estimated_value != null
        ? { properties: { currency: lead.currency || 'RON', value: lead.estimated_value } }
        : {}),
    }],
  };

  const res = await fetch('https://business-api.tiktok.com/open_api/v1.3/event/track/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Access-Token': token },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => null);
  if (!res.ok || (json && json.code !== 0)) {
    return { ok: false, error: JSON.stringify(json ?? res.status).slice(0, 500) };
  }
  return { ok: true };
}

async function googleAccessToken(): Promise<{ token: string | null; error?: string }> {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: (process.env.GOOGLE_ADS_CLIENT_ID ?? '').trim(),
      client_secret: (process.env.GOOGLE_ADS_CLIENT_SECRET ?? '').trim(),
      refresh_token: (process.env.GOOGLE_ADS_REFRESH_TOKEN ?? '').trim(),
      grant_type: 'refresh_token',
    }),
  });
  const json = await res.json().catch(() => null);
  if (!res.ok) {
    return { token: null, error: `oauth2.googleapis.com/token ${res.status}: ${JSON.stringify(json ?? {}).slice(0, 300)}` };
  }
  return { token: json?.access_token ?? null };
}

/**
 * Trimite conversia offline prin Data Manager API (datamanager.googleapis.com),
 * singura cale acceptata pentru integrari noi incepand cu 2026-06-15 — Google a
 * blocat adoptatorii noi pe vechiul ConversionUploadService.uploadClickConversions.
 * Nu mai necesita developer token; doar OAuth (scope datamanager) + ID-urile de cont.
 * Docs: https://developers.google.com/data-manager/api/devguides/events
 */
async function sendGoogle(lead: LeadRow, stage: SignalStage, occurredAt: string): Promise<SendResult> {
  if (!googleOutboundConfigured()) return { ok: false, unconfigured: true };
  // Google nu are conversii "negative" — pierdut/necalificat nu se trimit.
  if (stage === 'pierdut' || stage === 'necalificat') {
    return { ok: false, skip: true, error: 'Google nu suporta conversii negative' };
  }
  const caId = googleConversionAction(stage);
  if (!caId) return { ok: false, unconfigured: true }; // actiunea de conversie nu e configurata inca

  if (!lead.gclid && !lead.email && !lead.phone) {
    return { ok: false, skip: true, error: 'Fara identificatori Google (gclid/email/telefon)' };
  }

  const { token, error: tokenError } = await googleAccessToken();
  if (!token) return { ok: false, error: tokenError ?? 'OAuth: nu s-a putut obtine access token' };

  const cid = process.env.GOOGLE_ADS_CUSTOMER_ID!.replace(/-/g, '');
  const loginCid = (process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID || process.env.GOOGLE_ADS_CUSTOMER_ID)!.replace(/-/g, '');

  const userIdentifiers: Record<string, unknown>[] = [];
  if (lead.email) userIdentifiers.push({ emailAddress: hashEmail(lead.email) });
  if (lead.phone) userIdentifiers.push({ phoneNumber: hashPhoneE164(lead.phone) });

  const event: Record<string, unknown> = {
    eventTimestamp: new Date(occurredAt).toISOString(),
    // Stabil pe lead+etapa: Data Manager API dedubleaza pe transactionId, deci
    // reincercarile noastre (cron retry) nu creeaza conversii duplicate.
    transactionId: `${lead.id}-${stage}`,
    eventSource: 'WEB',
    ...(lead.gclid ? { adIdentifiers: { gclid: lead.gclid } } : {}),
    ...(userIdentifiers.length > 0 ? { userData: { userIdentifiers } } : {}),
    ...(stage === 'convertit' && lead.estimated_value != null
      ? { conversionValue: lead.estimated_value, currency: lead.currency || 'RON' }
      : {}),
  };

  const body = {
    destinations: [{
      operatingAccount: { accountType: 'GOOGLE_ADS', accountId: cid },
      loginAccount: { accountType: 'GOOGLE_ADS', accountId: loginCid },
      productDestinationId: caId,
    }],
    encoding: 'HEX',
    // Lead-urile provin din formulare cu consimtamant explicit (acordPrivacitate/gdprConsent).
    consent: { adPersonalization: 'CONSENT_GRANTED', adUserData: 'CONSENT_GRANTED' },
    events: [event],
  };

  const res = await fetch('https://datamanager.googleapis.com/v1/events:ingest', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => null);
  if (!res.ok) return { ok: false, error: JSON.stringify(json?.error ?? json ?? res.status).slice(0, 500) };
  return { ok: true };
}

/* ── Procesarea randurilor pending ── */
interface SignalRow { id: string; lead_id: string; platform: string; stage: string; attempts: number; created_at: string }

async function processSignal(row: SignalRow, lead: LeadRow): Promise<void> {
  const stage = row.stage as SignalStage;
  let result: SendResult;
  try {
    if (row.platform === 'meta') result = await sendMeta(lead, stage, row.created_at);
    else if (row.platform === 'tiktok') result = await sendTikTok(lead, stage, row.created_at);
    else if (row.platform === 'google') result = await sendGoogle(lead, stage, row.created_at);
    else result = { ok: false, skip: true, error: 'Platforma necunoscuta' };
  } catch (e) {
    result = { ok: false, error: e instanceof Error ? e.message : 'Eroare necunoscuta' };
  }

  // Chei lipsa: ramane pending (fara attempts) — se trimite cand se configureaza.
  if (!result.ok && result.unconfigured) return;

  const update: Record<string, unknown> = result.ok
    ? { status: 'sent', sent_at: new Date().toISOString(), attempts: row.attempts + 1, last_error: null }
    : result.skip
      ? { status: 'skipped', attempts: row.attempts + 1, last_error: result.error ?? null }
      : { status: 'failed', attempts: row.attempts + 1, last_error: result.error ?? null };

  await supabaseAdmin.from('crm_lead_signals').update(update).eq('id', row.id);
}

/** Trimite semnalele in asteptare pentru UN lead (apelat cu after() dupa raspuns). */
export async function flushLeadSignals(leadId: string): Promise<void> {
  const [{ data: rows }, { data: lead }] = await Promise.all([
    supabaseAdmin.from('crm_lead_signals').select('*').eq('lead_id', leadId).eq('status', 'pending'),
    supabaseAdmin.from('crm_leads').select(LEAD_FIELDS).eq('id', leadId).single(),
  ]);
  if (!rows?.length || !lead) return;
  for (const row of rows) await processSignal(row as SignalRow, lead as LeadRow);
}

/** Retry global (cron): pending + failed cu < 8 incercari. Returneaza cate au fost procesate. */
export async function flushPendingSignals(limit = 100): Promise<number> {
  const { data: rows } = await supabaseAdmin
    .from('crm_lead_signals')
    .select('*')
    .in('status', ['pending', 'failed'])
    .lt('attempts', 8)
    .order('created_at', { ascending: true })
    .limit(limit);
  if (!rows?.length) return 0;

  const leadIds = [...new Set(rows.map((r) => r.lead_id))];
  const { data: leads } = await supabaseAdmin.from('crm_leads').select(LEAD_FIELDS).in('id', leadIds);
  const leadMap = new Map((leads ?? []).map((l) => [l.id, l as LeadRow]));

  let processed = 0;
  for (const row of rows) {
    const lead = leadMap.get(row.lead_id);
    if (!lead) continue;
    await processSignal(row as SignalRow, lead);
    processed++;
  }
  return processed;
}
