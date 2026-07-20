import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireAuth } from '@/lib/auth';
import { guardClient } from '@/lib/crm/guard';

const BUCKET = 'crm-files';
const MAX_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED_EXT = [
  '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx',
  '.png', '.jpg', '.jpeg', '.webp', '.gif', '.txt', '.csv', '.zip',
];

/** GET /api/admin/clienti/[id]/files — lista fisierelor cu URL-uri semnate (bucket privat). */
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const { id } = await params;

  const guard = await guardClient(id, auth.user);
  if (guard.error) return guard.error;

  const { data: rows, error } = await supabaseAdmin
    .from('crm_client_files')
    .select('*')
    .eq('client_id', id)
    .order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const paths = (rows ?? []).map((r) => r.file_url);
  const signedMap = new Map<string, string>();
  if (paths.length > 0) {
    const { data: signed } = await supabaseAdmin.storage.from(BUCKET).createSignedUrls(paths, 3600);
    (signed ?? []).forEach((s) => {
      if (s.path && s.signedUrl) signedMap.set(s.path, s.signedUrl);
    });
  }
  const items = (rows ?? []).map((r) => ({ ...r, signed_url: signedMap.get(r.file_url) ?? null }));
  return NextResponse.json({ items });
}

/** POST /api/admin/clienti/[id]/files — upload fisier in bucketul privat crm-files. */
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const { id } = await params;

  const guard = await guardClient(id, auth.user);
  if (guard.error) return guard.error;

  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  if (!file) return NextResponse.json({ error: 'Niciun fisier furnizat' }, { status: 400 });

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'Fisierul depaseste 10 MB' }, { status: 400 });
  }

  const dot = file.name.lastIndexOf('.');
  const ext = dot >= 0 ? file.name.slice(dot).toLowerCase() : '';
  if (!ALLOWED_EXT.includes(ext)) {
    return NextResponse.json({ error: 'Tip de fisier nepermis' }, { status: 400 });
  }

  const path = `clients/${id}/${crypto.randomUUID()}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error: upErr } = await supabaseAdmin.storage
    .from(BUCKET)
    .upload(path, buffer, { contentType: file.type || 'application/octet-stream', upsert: false });
  if (upErr) return NextResponse.json({ error: upErr.message }, { status: 500 });

  const { data: row, error } = await supabaseAdmin
    .from('crm_client_files')
    .insert({
      client_id: id,
      file_name: file.name,
      file_url: path,
      mime_type: file.type || null,
      size_bytes: file.size,
      uploaded_by: auth.user.id,
    })
    .select('*')
    .single();
  if (error) {
    // Rollback fisier orfan din storage
    await supabaseAdmin.storage.from(BUCKET).remove([path]);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await supabaseAdmin.from('crm_activities').insert({
    type: 'system',
    title: `Fisier adaugat: ${file.name}`,
    client_id: id,
    created_by: auth.user.id,
  });

  const { data: signed } = await supabaseAdmin.storage.from(BUCKET).createSignedUrl(path, 3600);
  return NextResponse.json({ file: { ...row, signed_url: signed?.signedUrl ?? null } }, { status: 201 });
}
