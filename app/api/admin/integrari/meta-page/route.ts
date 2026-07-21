import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireRole } from '@/lib/auth';

export const runtime = 'nodejs';

const schema = z.object({
  pageId: z.string().trim().regex(/^\d{5,20}$/, 'ID-ul paginii trebuie sa fie numeric'),
});

/**
 * POST /api/admin/integrari/meta-page — aboneaza aplicatia Meta la evenimentele
 * "leadgen" ale paginii de Facebook (pasul care altfel se face din Graph API
 * Explorer). Necesita META_PAGE_TOKEN (system user cu acces la pagina).
 */
export async function POST(req: NextRequest) {
  const auth = await requireRole(['owner', 'admin']);
  if (auth.error) return auth.error;

  const token = process.env.META_PAGE_TOKEN;
  if (!token) {
    return NextResponse.json({ error: 'META_PAGE_TOKEN nu e configurat in Vercel' }, { status: 400 });
  }

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Date invalide' }, { status: 400 }); }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Date invalide' }, { status: 400 });
  const { pageId } = parsed.data;

  // 1) Daca token-ul e de system user, obtinem token-ul de PAGINA (necesar la subscribed_apps).
  let pageToken = token;
  try {
    const info = await fetch(
      `https://graph.facebook.com/v23.0/${pageId}?fields=access_token&access_token=${encodeURIComponent(token)}`,
    );
    const infoJson = await info.json().catch(() => null);
    if (info.ok && infoJson?.access_token) pageToken = infoJson.access_token;
  } catch { /* folosim token-ul original */ }

  // 2) Abonare la campul leadgen.
  const res = await fetch(`https://graph.facebook.com/v23.0/${pageId}/subscribed_apps`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ subscribed_fields: 'leadgen', access_token: pageToken }),
  });
  const json = await res.json().catch(() => null);

  if (!res.ok || !json?.success) {
    const detail = JSON.stringify(json?.error?.message ?? json?.error ?? json ?? res.status).slice(0, 300);
    return NextResponse.json({ error: `Meta a refuzat abonarea: ${detail}` }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
