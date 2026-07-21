import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { ingestLead } from '@/lib/crm/ads/ingest';

export const runtime = 'nodejs';
export const maxDuration = 30;

/**
 * Webhook Google Ads Lead Form.
 * Se configureaza direct in Google Ads pe asset-ul de lead form:
 *   URL:   https://inovex.ro/api/webhooks/google
 *   Cheie: GOOGLE_LEAD_WEBHOOK_KEY (verificata din payload: google_key)
 * Payload: { lead_id, user_column_data[], campaign_id, gcl_id, is_test, google_key }
 */

interface GoogleColumn { column_id?: string; column_name?: string; string_value?: string }
interface GooglePayload {
  google_key?: string;
  lead_id?: string;
  user_column_data?: GoogleColumn[];
  campaign_id?: number | string;
  adgroup_id?: number | string;
  gcl_id?: string;
  is_test?: boolean;
}

export async function POST(req: NextRequest) {
  const key = process.env.GOOGLE_LEAD_WEBHOOK_KEY;
  if (!key) return NextResponse.json({ error: 'Webhook neconfigurat' }, { status: 503 });

  let body: GooglePayload;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'JSON invalid' }, { status: 400 }); }

  const given = String(body.google_key ?? '');
  const expected = Buffer.from(key);
  const provided = Buffer.from(given);
  if (provided.length !== expected.length || !crypto.timingSafeEqual(expected, provided)) {
    return NextResponse.json({ error: 'Cheie invalida' }, { status: 401 });
  }
  if (!body.lead_id) return NextResponse.json({ error: 'lead_id lipsa' }, { status: 400 });

  let name: string | null = null, firstName = '', lastName = '';
  let email: string | null = null, phone: string | null = null;
  const extra: string[] = [];

  for (const col of body.user_column_data ?? []) {
    const id = (col.column_id ?? '').toUpperCase();
    const value = (col.string_value ?? '').trim();
    if (!value) continue;
    if (id === 'FULL_NAME') name = value;
    else if (id === 'FIRST_NAME') firstName = value;
    else if (id === 'LAST_NAME') lastName = value;
    else if (id === 'EMAIL') email = value;
    else if (id === 'PHONE_NUMBER') phone = value;
    else extra.push(`${col.column_name ?? id}: ${value}`);
  }
  if (!name && (firstName || lastName)) name = `${firstName} ${lastName}`.trim();

  try {
    const result = await ingestLead({
      platform: 'google',
      platformLeadId: String(body.lead_id),
      name, email, phone,
      campaign: body.campaign_id != null ? `Campanie ${body.campaign_id}` : null,
      source: body.is_test ? 'Google Ads (test)' : 'Google Ads',
      notes: extra.length ? extra.join('\n') : null,
      gclid: body.gcl_id ?? null,
      raw: body,
    });
    return NextResponse.json({ success: true, created: result.created });
  } catch (e) {
    console.error('[webhook google] ingest error:', e instanceof Error ? e.message : e);
    return NextResponse.json({ error: 'Eroare interna' }, { status: 500 });
  }
}
