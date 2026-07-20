import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireAuth } from '@/lib/auth';
import { guardClient } from '@/lib/crm/guard';

const BUCKET = 'crm-files';

/** DELETE /api/admin/clienti/[id]/files/[fileId] — sterge fisierul (storage + rand). */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string; fileId: string }> },
) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const { id, fileId } = await params;

  const guard = await guardClient(id, auth.user);
  if (guard.error) return guard.error;

  const { data: fileRow } = await supabaseAdmin
    .from('crm_client_files')
    .select('id, file_url, client_id')
    .eq('id', fileId)
    .single();
  if (!fileRow || fileRow.client_id !== id) {
    return NextResponse.json({ error: 'Fisier inexistent' }, { status: 404 });
  }

  await supabaseAdmin.storage.from(BUCKET).remove([fileRow.file_url]);
  const { error } = await supabaseAdmin.from('crm_client_files').delete().eq('id', fileId);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
