import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireRole } from '@/lib/auth';
import { orgSettingsSchema } from '@/lib/crm/schemas';

const BUCKET = 'crm-files';

/** GET /api/admin/contracte/setari — setarile firmei + URL semnat pt. semnatura. */
export async function GET() {
  const { error } = await requireRole(['owner', 'admin']);
  if (error) return error;

  const { data, error: dbError } = await supabaseAdmin
    .from('crm_org_settings').select('*').eq('id', 1).single();
  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 });

  let signatureSigned: string | null = null;
  if (data?.signature_url) {
    const { data: s } = await supabaseAdmin.storage.from(BUCKET).createSignedUrl(data.signature_url, 3600);
    signatureSigned = s?.signedUrl ?? null;
  }
  return NextResponse.json({ settings: data, signature_signed_url: signatureSigned });
}

/** PUT /api/admin/contracte/setari — actualizare setari firma. */
export async function PUT(req: NextRequest) {
  const { error } = await requireRole(['owner', 'admin']);
  if (error) return error;

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Date invalide' }, { status: 400 }); }
  const parsed = orgSettingsSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Date invalide' }, { status: 400 });

  const { data, error: dbError } = await supabaseAdmin
    .from('crm_org_settings').update(parsed.data).eq('id', 1).select('*').single();
  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 });
  return NextResponse.json({ settings: data });
}
