import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireRole } from '@/lib/auth';
import { guardClient } from '@/lib/crm/guard';
import { websiteSchema } from '@/lib/crm/schemas';
import { encryptJson, decryptJson } from '@/lib/crm/crypto';
import type { WebsiteCredential } from '@/types/crm';

export const runtime = 'nodejs';

const STATUSES = ['activ', 'in_dezvoltare', 'suspendat', 'arhivat'];

/** GET /api/admin/website-uri — lista website-urilor (fara parole; doar numarul de logari). */
export async function GET(req: NextRequest) {
  const auth = await requireRole(['owner', 'admin']);
  if (auth.error) return auth.error;

  const sp = new URL(req.url).searchParams;
  const page = Math.max(1, parseInt(sp.get('page') ?? '1', 10) || 1);
  const perPage = Math.min(100, Math.max(1, parseInt(sp.get('perPage') ?? '50', 10) || 50));

  let query = supabaseAdmin
    .from('crm_websites')
    .select('*, client:crm_clients(id, name), subscription:crm_subscriptions(id, name, status)', { count: 'exact' });

  const status = sp.get('status');
  if (status && STATUSES.includes(status)) query = query.eq('status', status);
  const clientId = sp.get('client_id');
  if (clientId) query = query.eq('client_id', clientId);
  const raw = (sp.get('q') ?? '').trim().slice(0, 100).replace(/[,()%*\\"]/g, ' ').trim();
  if (raw) query = query.or(`domain.ilike.%${raw}%,label.ilike.%${raw}%,platform.ilike.%${raw}%`);

  const from = (page - 1) * perPage;
  const { data, error, count } = await query.order('created_at', { ascending: false }).range(from, from + perPage - 1);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const items = (data ?? []).map(({ credentials_enc, ...rest }) => {
    const creds = decryptJson<WebsiteCredential[]>(credentials_enc);
    return { ...rest, credentials_count: Array.isArray(creds) ? creds.length : 0 };
  });

  return NextResponse.json({ items, total: count ?? 0, page, perPage });
}

/** POST /api/admin/website-uri — creare website (datele de logare se cripteaza). */
export async function POST(req: NextRequest) {
  const auth = await requireRole(['owner', 'admin']);
  if (auth.error) return auth.error;

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Date invalide' }, { status: 400 }); }
  const parsed = websiteSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Date invalide' }, { status: 400 });

  const guard = await guardClient(parsed.data.client_id, auth.user);
  if (guard.error) return guard.error;

  const { credentials, ...rest } = parsed.data;
  const cleanCreds = (credentials ?? []).filter((c) => c.label || c.username || c.password || c.url);
  const credentials_enc = cleanCreds.length ? encryptJson(cleanCreds) : null;

  const { data, error } = await supabaseAdmin
    .from('crm_websites')
    .insert({ ...rest, credentials_enc, created_by: auth.user.id })
    .select('*, client:crm_clients(id, name), subscription:crm_subscriptions(id, name, status)')
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const safe = { ...data } as Record<string, unknown>;
  delete safe.credentials_enc;
  return NextResponse.json({ item: { ...safe, credentials_count: cleanCreds.length } }, { status: 201 });
}
