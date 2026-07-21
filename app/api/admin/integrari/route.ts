import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireRole } from '@/lib/auth';
import { metaOutboundConfigured, tiktokOutboundConfigured, googleOutboundConfigured } from '@/lib/crm/ads/signals';

export const runtime = 'nodejs';

type Platform = 'meta' | 'tiktok' | 'google';
const PLATFORMS: Platform[] = ['meta', 'tiktok', 'google'];

const has = (name: string) => Boolean(process.env[name]?.trim());

/** GET /api/admin/integrari — starea integrarilor ads (env, lead-uri primite, semnale). */
export async function GET() {
  const auth = await requireRole(['owner', 'admin']);
  if (auth.error) return auth.error;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://inovex.ro';

  // Lead-uri per platforma (count + ultimul primit) — interogari mici in paralel.
  const leadStats = await Promise.all(
    PLATFORMS.map(async (p) => {
      const [{ count }, { data: last }] = await Promise.all([
        supabaseAdmin.from('crm_leads').select('*', { count: 'exact', head: true }).eq('platform', p).not('platform_lead_id', 'is', null),
        supabaseAdmin.from('crm_leads').select('created_at').eq('platform', p).not('platform_lead_id', 'is', null)
          .order('created_at', { ascending: false }).limit(1),
      ]);
      return { platform: p, count: count ?? 0, lastAt: last?.[0]?.created_at ?? null };
    }),
  );

  // Semnale per platforma + status.
  const { data: signalRows } = await supabaseAdmin
    .from('crm_lead_signals').select('platform, status').limit(10000);
  const signals: Record<string, { sent: number; pending: number; failed: number; skipped: number }> = {};
  PLATFORMS.forEach((p) => { signals[p] = { sent: 0, pending: 0, failed: 0, skipped: 0 }; });
  (signalRows ?? []).forEach((r) => {
    const s = signals[r.platform];
    if (s && r.status in s) s[r.status as keyof typeof s]++;
  });

  const leadMap = new Map(leadStats.map((l) => [l.platform, l]));

  return NextResponse.json({
    meta: {
      inbound: {
        configured: has('META_VERIFY_TOKEN') && has('META_APP_SECRET') && has('META_PAGE_TOKEN'),
        env: {
          META_VERIFY_TOKEN: has('META_VERIFY_TOKEN'),
          META_APP_SECRET: has('META_APP_SECRET'),
          META_PAGE_TOKEN: has('META_PAGE_TOKEN'),
        },
        webhookUrl: `${siteUrl}/api/webhooks/meta`,
        // Necesar la configurarea webhook-ului in aplicatia Meta (nu e un secret de cont).
        verifyToken: process.env.META_VERIFY_TOKEN?.trim() || null,
        leads: leadMap.get('meta'),
      },
      outbound: {
        configured: metaOutboundConfigured(),
        env: {
          META_DATASET_ID: has('META_DATASET_ID'),
          'META_CAPI_TOKEN (sau META_PAGE_TOKEN)': has('META_CAPI_TOKEN') || has('META_PAGE_TOKEN'),
        },
        signals: signals.meta,
      },
    },
    tiktok: {
      inbound: {
        configured: has('TIKTOK_WEBHOOK_KEY'),
        env: { TIKTOK_WEBHOOK_KEY: has('TIKTOK_WEBHOOK_KEY') },
        webhookUrl: has('TIKTOK_WEBHOOK_KEY')
          ? `${siteUrl}/api/webhooks/tiktok?key=${process.env.TIKTOK_WEBHOOK_KEY!.trim()}`
          : `${siteUrl}/api/webhooks/tiktok?key=<TIKTOK_WEBHOOK_KEY>`,
        leads: leadMap.get('tiktok'),
      },
      outbound: {
        configured: tiktokOutboundConfigured(),
        env: {
          TIKTOK_ACCESS_TOKEN: has('TIKTOK_ACCESS_TOKEN'),
          'TIKTOK_EVENT_SOURCE_ID (CRM)': has('TIKTOK_EVENT_SOURCE_ID'),
          'TIKTOK_PIXEL_CODE (web, optional)': has('TIKTOK_PIXEL_CODE'),
        },
        signals: signals.tiktok,
      },
    },
    google: {
      inbound: {
        configured: has('GOOGLE_LEAD_WEBHOOK_KEY'),
        env: { GOOGLE_LEAD_WEBHOOK_KEY: has('GOOGLE_LEAD_WEBHOOK_KEY') },
        webhookUrl: `${siteUrl}/api/webhooks/google`,
        webhookKey: process.env.GOOGLE_LEAD_WEBHOOK_KEY?.trim() || null,
        leads: leadMap.get('google'),
      },
      outbound: {
        configured: googleOutboundConfigured(),
        env: {
          GOOGLE_ADS_DEVELOPER_TOKEN: has('GOOGLE_ADS_DEVELOPER_TOKEN'),
          GOOGLE_ADS_CLIENT_ID: has('GOOGLE_ADS_CLIENT_ID'),
          GOOGLE_ADS_CLIENT_SECRET: has('GOOGLE_ADS_CLIENT_SECRET'),
          GOOGLE_ADS_REFRESH_TOKEN: has('GOOGLE_ADS_REFRESH_TOKEN'),
          GOOGLE_ADS_CUSTOMER_ID: has('GOOGLE_ADS_CUSTOMER_ID'),
          'GOOGLE_ADS_CA_QUALIFIED (id actiune conversie)': has('GOOGLE_ADS_CA_QUALIFIED'),
          'GOOGLE_ADS_CA_CONVERTED (id actiune conversie)': has('GOOGLE_ADS_CA_CONVERTED'),
        },
        signals: signals.google,
      },
    },
  });
}
