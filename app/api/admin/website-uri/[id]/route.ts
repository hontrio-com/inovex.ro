import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireRole } from '@/lib/auth';
import { guardClient } from '@/lib/crm/guard';
import { websiteSchema } from '@/lib/crm/schemas';
import { encryptJson, decryptJson } from '@/lib/crm/crypto';
import type { WebsiteCredential } from '@/types/crm';

export const runtime = 'nodejs';

function stripEnc<T extends Record<string, unknown>>(row: T): Omit<T, 'credentials_enc'> {
  const copy = { ...row };
  delete (copy as Record<string, unknown>).credentials_enc;
  return copy;
}

/** GET /api/admin/website-uri/[id] — detaliu cu datele de logare DECRIPTATE (owner/admin). */
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireRole(['owner', 'admin']);
  if (auth.error) return auth.error;
  const { id } = await params;

  const { data, error } = await supabaseAdmin
    .from('crm_websites')
    .select('*, client:crm_clients(id, name), subscription:crm_subscriptions(id, name, status)')
    .eq('id', id)
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: 'Website inexistent' }, { status: 404 });

  const credentials = decryptJson<WebsiteCredential[]>(data.credentials_enc) ?? [];
  return NextResponse.json({ item: { ...stripEnc(data), credentials } });
}

/** PATCH /api/admin/website-uri/[id] — editare (re-cripteaza datele de logare). */
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireRole(['owner', 'admin']);
  if (auth.error) return auth.error;
  const { id } = await params;

  const { data: existing } = await supabaseAdmin.from('crm_websites').select('id, client_id').eq('id', id).single();
  if (!existing) return NextResponse.json({ error: 'Website inexistent' }, { status: 404 });
  const guard = await guardClient(existing.client_id, auth.user);
  if (guard.error) return guard.error;

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Date invalide' }, { status: 400 }); }
  const parsed = websiteSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Date invalide' }, { status: 400 });

  const { credentials, ...rest } = parsed.data;
  const cleanCreds = (credentials ?? []).filter((c) => c.label || c.username || c.password || c.url);
  const credentials_enc = cleanCreds.length ? encryptJson(cleanCreds) : null;

  const { data, error } = await supabaseAdmin
    .from('crm_websites')
    .update({ ...rest, client_id: existing.client_id, credentials_enc })
    .eq('id', id)
    .select('*, client:crm_clients(id, name), subscription:crm_subscriptions(id, name, status)')
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ item: { ...stripEnc(data), credentials: cleanCreds } });
}

/** DELETE /api/admin/website-uri/[id] */
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireRole(['owner', 'admin']);
  if (auth.error) return auth.error;
  const { id } = await params;

  const { error } = await supabaseAdmin.from('crm_websites').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
