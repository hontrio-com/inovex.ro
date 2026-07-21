import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

/** POST /api/contract/[token]/view — logheaza o deschidere a linkului (public). */
export async function POST(req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const { data: c } = await supabaseAdmin.from('crm_contracts').select('id').eq('sign_token', token).single();
  if (!c) return NextResponse.json({ ok: false }, { status: 404 });

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? req.headers.get('x-real-ip') ?? null;
  const ua = req.headers.get('user-agent') ?? null;
  await supabaseAdmin.from('crm_contract_views').insert({ contract_id: c.id, ip_address: ip, user_agent: ua });

  return NextResponse.json({ ok: true });
}
