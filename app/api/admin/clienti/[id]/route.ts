import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireRole } from '@/lib/auth';
import { clientSchema } from '@/lib/crm/schemas';
import { canAccessClient, canDeleteClient } from '@/lib/crm/access';

const BUCKET = 'crm-files';

async function loadClient(id: string) {
  const { data } = await supabaseAdmin
    .from('crm_clients')
    .select('*')
    .eq('id', id)
    .single();
  return data;
}

/** GET /api/admin/clienti/[id] */
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireRole(['owner', 'admin']);
  if (auth.error) return auth.error;
  const { id } = await params;

  const client = await loadClient(id);
  if (!client) return NextResponse.json({ error: 'Client inexistent' }, { status: 404 });
  if (!canAccessClient(auth.user, client.assigned_to)) {
    return NextResponse.json({ error: 'Acces interzis' }, { status: 403 });
  }
  return NextResponse.json({ client });
}

/** PATCH /api/admin/clienti/[id] */
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireRole(['owner', 'admin']);
  if (auth.error) return auth.error;
  const { id } = await params;

  const existing = await loadClient(id);
  if (!existing) return NextResponse.json({ error: 'Client inexistent' }, { status: 404 });
  if (!canAccessClient(auth.user, existing.assigned_to)) {
    return NextResponse.json({ error: 'Acces interzis' }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Date invalide' }, { status: 400 });
  }

  const parsed = clientSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Date invalide' }, { status: 400 });
  }

  // Agentul nu poate reasigna clientul (ramane la el).
  const assigned_to = auth.user.role === 'agent' ? existing.assigned_to : parsed.data.assigned_to;

  const { data, error } = await supabaseAdmin
    .from('crm_clients')
    .update({ ...parsed.data, assigned_to })
    .eq('id', id)
    .select('*')
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Log schimbare de status in timeline.
  if (existing.status !== parsed.data.status) {
    await supabaseAdmin.from('crm_activities').insert({
      type: 'status_change',
      title: `Status: ${existing.status} → ${parsed.data.status}`,
      client_id: id,
      created_by: auth.user.id,
    });
  }

  return NextResponse.json({ client: data });
}

/** DELETE /api/admin/clienti/[id] — doar owner/admin. Curata si fisierele din Storage. */
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireRole(['owner', 'admin']);
  if (auth.error) return auth.error;
  const { id } = await params;

  if (!canDeleteClient(auth.user)) {
    return NextResponse.json({ error: 'Doar owner/admin pot sterge clienti' }, { status: 403 });
  }

  const existing = await loadClient(id);
  if (!existing) return NextResponse.json({ error: 'Client inexistent' }, { status: 404 });

  // Sterge fizic fisierele din bucket (randurile crm_client_files cascadeaza).
  const { data: files } = await supabaseAdmin
    .from('crm_client_files')
    .select('file_url')
    .eq('client_id', id);
  if (files && files.length > 0) {
    await supabaseAdmin.storage.from(BUCKET).remove(files.map((f) => f.file_url));
  }

  const { error } = await supabaseAdmin.from('crm_clients').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
