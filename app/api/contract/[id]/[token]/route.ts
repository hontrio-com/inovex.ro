import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * GET /api/contract/[id]/[token] — endpoint PUBLIC (fara auth) pentru pagina de
 * semnare. Valideaza tokenul si returneaza continutul contractului.
 */
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string; token: string }> }) {
  const { id, token } = await params;

  const { data: c } = await supabaseAdmin
    .from('crm_contracts')
    .select('id, contract_number, title, content, status, sign_token, expires_at')
    .eq('id', id)
    .single();

  if (!c || !c.sign_token || c.sign_token !== token) {
    return NextResponse.json({ error: 'Link invalid sau expirat' }, { status: 404 });
  }

  const expired = !!c.expires_at && new Date(c.expires_at) < new Date();
  return NextResponse.json({
    contract: { contract_number: c.contract_number, title: c.title, content: c.content },
    status: c.status,
    expired,
    signed: c.status === 'semnat',
  });
}
