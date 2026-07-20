import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireRole } from '@/lib/auth';

const BUCKET = 'crm-files';
const ALLOWED = ['.png', '.jpg', '.jpeg', '.webp'];

/** POST — upload semnatura firmei (imagine) in crm-files. */
export async function POST(req: NextRequest) {
  const { error } = await requireRole(['owner', 'admin']);
  if (error) return error;

  const form = await req.formData();
  const file = form.get('file') as File | null;
  if (!file) return NextResponse.json({ error: 'Niciun fisier' }, { status: 400 });
  if (file.size > 2 * 1024 * 1024) return NextResponse.json({ error: 'Imaginea depaseste 2 MB' }, { status: 400 });
  const dot = file.name.lastIndexOf('.');
  const ext = dot >= 0 ? file.name.slice(dot).toLowerCase() : '.png';
  if (!ALLOWED.includes(ext)) return NextResponse.json({ error: 'Format imagine nepermis (PNG/JPG/WEBP)' }, { status: 400 });

  // Sterge semnatura veche, daca exista.
  const { data: cur } = await supabaseAdmin.from('crm_org_settings').select('signature_url').eq('id', 1).single();
  if (cur?.signature_url) await supabaseAdmin.storage.from(BUCKET).remove([cur.signature_url]);

  const path = `company/signature-${crypto.randomUUID()}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const { error: upErr } = await supabaseAdmin.storage.from(BUCKET).upload(path, buffer, { contentType: file.type || 'image/png', upsert: false });
  if (upErr) return NextResponse.json({ error: upErr.message }, { status: 500 });

  await supabaseAdmin.from('crm_org_settings').update({ signature_url: path }).eq('id', 1);
  const { data: signed } = await supabaseAdmin.storage.from(BUCKET).createSignedUrl(path, 3600);
  return NextResponse.json({ signature_url: path, signature_signed_url: signed?.signedUrl ?? null });
}

/** DELETE — elimina semnatura firmei. */
export async function DELETE() {
  const { error } = await requireRole(['owner', 'admin']);
  if (error) return error;

  const { data: cur } = await supabaseAdmin.from('crm_org_settings').select('signature_url').eq('id', 1).single();
  if (cur?.signature_url) await supabaseAdmin.storage.from(BUCKET).remove([cur.signature_url]);
  await supabaseAdmin.from('crm_org_settings').update({ signature_url: null }).eq('id', 1);
  return NextResponse.json({ success: true });
}
