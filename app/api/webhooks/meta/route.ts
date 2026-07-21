import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { ingestLead } from '@/lib/crm/ads/ingest';

export const runtime = 'nodejs';
export const maxDuration = 30;

/**
 * Webhook Meta Lead Ads.
 *  GET  — verificarea abonarii (hub.challenge, META_VERIFY_TOKEN).
 *  POST — evenimente leadgen; semnatura X-Hub-Signature-256 (META_APP_SECRET),
 *         apoi detaliile lead-ului se iau din Graph API (META_PAGE_TOKEN).
 * Raspunde mereu 200 la POST-uri valide ca Meta sa nu dezactiveze webhook-ul.
 */

export async function GET(req: NextRequest) {
  const sp = new URL(req.url).searchParams;
  if (
    sp.get('hub.mode') === 'subscribe' &&
    process.env.META_VERIFY_TOKEN &&
    sp.get('hub.verify_token') === process.env.META_VERIFY_TOKEN
  ) {
    return new NextResponse(sp.get('hub.challenge') ?? '', { status: 200 });
  }
  return NextResponse.json({ error: 'Verificare esuata' }, { status: 403 });
}

function validSignature(raw: string, header: string | null): boolean {
  const secret = process.env.META_APP_SECRET;
  if (!secret || !header?.startsWith('sha256=')) return false;
  const expected = crypto.createHmac('sha256', secret).update(raw).digest('hex');
  const given = header.slice('sha256='.length);
  try {
    return crypto.timingSafeEqual(Buffer.from(expected, 'hex'), Buffer.from(given, 'hex'));
  } catch {
    return false;
  }
}

interface MetaFieldData { name?: string; values?: unknown[] }

/** Mapeaza field_data (raspunsurile formularului) pe campurile lead-ului. */
function mapFieldData(fieldData: MetaFieldData[]) {
  let name: string | null = null, firstName = '', lastName = '';
  let email: string | null = null, phone: string | null = null;
  const extra: string[] = [];

  for (const f of fieldData) {
    const key = (f.name ?? '').toLowerCase();
    const value = String(f.values?.[0] ?? '').trim();
    if (!value) continue;
    if (key === 'full_name' || key === 'name' || key === 'nume' || key === 'nume_complet') name = value;
    else if (key === 'first_name' || key === 'prenume') firstName = value;
    else if (key === 'last_name') lastName = value;
    else if (key === 'email' || key === 'work_email') email = value;
    else if (key === 'phone_number' || key === 'phone' || key === 'telefon') phone = value;
    else extra.push(`${f.name}: ${value}`);
  }
  if (!name && (firstName || lastName)) name = `${firstName} ${lastName}`.trim();
  return { name, email, phone, notes: extra.length ? extra.join('\n') : null };
}

async function fetchLeadDetails(leadgenId: string) {
  const token = process.env.META_PAGE_TOKEN;
  if (!token) return null;
  const fields = 'id,created_time,field_data,ad_id,ad_name,adset_name,campaign_name,form_id,is_organic';
  const res = await fetch(
    `https://graph.facebook.com/v23.0/${leadgenId}?fields=${encodeURIComponent(fields)}&access_token=${encodeURIComponent(token)}`,
  );
  if (!res.ok) return null;
  return res.json() as Promise<{
    field_data?: MetaFieldData[]; campaign_name?: string; ad_name?: string; is_organic?: boolean;
  } & Record<string, unknown>>;
}

export async function POST(req: NextRequest) {
  const raw = await req.text();
  if (!validSignature(raw, req.headers.get('x-hub-signature-256'))) {
    return NextResponse.json({ error: 'Semnatura invalida' }, { status: 401 });
  }

  let body: { object?: string; entry?: { changes?: { field?: string; value?: Record<string, unknown> }[] }[] };
  try { body = JSON.parse(raw); } catch { return NextResponse.json({ error: 'JSON invalid' }, { status: 400 }); }

  let created = 0;
  for (const entry of body.entry ?? []) {
    for (const change of entry.changes ?? []) {
      if (change.field !== 'leadgen') continue;
      const leadgenId = String(change.value?.leadgen_id ?? '');
      if (!leadgenId) continue;

      const details = await fetchLeadDetails(leadgenId);
      const mapped = details?.field_data ? mapFieldData(details.field_data) : { name: null, email: null, phone: null, notes: null };

      try {
        const result = await ingestLead({
          platform: 'meta',
          platformLeadId: leadgenId,
          ...mapped,
          campaign: (details?.campaign_name as string | undefined) ?? null,
          source: details?.is_organic ? 'Meta Lead Ads (organic)' : 'Meta Lead Ads',
          raw: details ?? change.value,
        });
        if (result.created) created++;
      } catch (e) {
        console.error('[webhook meta] ingest error:', e instanceof Error ? e.message : e);
      }
    }
  }

  return NextResponse.json({ success: true, created });
}
