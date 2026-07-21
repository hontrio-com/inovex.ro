import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

/** GET /api/contract/[token] — endpoint PUBLIC pentru pagina de semnare (lookup dupa token). */
export async function GET(_req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  const { data: c } = await supabaseAdmin
    .from('crm_contracts')
    .select('id, contract_number, title, content, status, client_id, signed_pdf_url')
    .eq('sign_token', token)
    .single();

  if (!c) return NextResponse.json({ error: 'Link invalid' }, { status: 404 });

  let clientName = '';
  if (c.client_id) {
    const { data: cl } = await supabaseAdmin.from('crm_clients').select('name').eq('id', c.client_id).single();
    clientName = cl?.name ?? '';
  }

  let pdfUrl: string | null = null;
  if (c.status === 'semnat' && c.signed_pdf_url) {
    const { data: s } = await supabaseAdmin.storage.from('crm-files').createSignedUrl(c.signed_pdf_url, 3600);
    pdfUrl = s?.signedUrl ?? null;
  }

  return NextResponse.json({
    contract: { contract_number: c.contract_number, title: c.title, content: c.content, client_name: clientName },
    status: c.status,
    signed: c.status === 'semnat',
    pdfUrl,
  });
}
