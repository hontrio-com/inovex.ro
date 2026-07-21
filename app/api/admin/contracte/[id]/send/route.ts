import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase';
import { requireAuth } from '@/lib/auth';
import { canAccessAssigned } from '@/lib/crm/access';
import { shortToken } from '@/lib/crm/token';
import { sendEmail } from '@/lib/email/send';
import { signRequestHtml, signRequestSubject } from '@/lib/email/templates/contract';

const schema = z.object({ email: z.union([z.string().email('Email invalid'), z.literal('')]).optional() });

/** POST /api/admin/contracte/[id]/send — activeaza linkul de semnare (+ email optional). */
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;
  const { id } = await params;

  const { data: contract } = await supabaseAdmin.from('crm_contracts').select('*').eq('id', id).single();
  if (!contract) return NextResponse.json({ error: 'Contract inexistent' }, { status: 404 });
  if (!canAccessAssigned(auth.user, contract.assigned_to)) return NextResponse.json({ error: 'Acces interzis' }, { status: 403 });
  if (contract.status === 'semnat') return NextResponse.json({ error: 'Contractul e deja semnat' }, { status: 400 });
  if (contract.status === 'anulat') return NextResponse.json({ error: 'Contract anulat' }, { status: 400 });

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Date invalide' }, { status: 400 }); }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Date invalide' }, { status: 400 });

  const { data: org } = await supabaseAdmin.from('crm_org_settings').select('company_name').eq('id', 1).single();

  // Token permanent (generat de la creare); nu se regenereaza, nu expira.
  const token = contract.sign_token ?? shortToken();

  const { data: updated, error } = await supabaseAdmin
    .from('crm_contracts')
    .update({ sign_token: token, status: 'trimis', sent_at: new Date().toISOString(), expires_at: null })
    .eq('id', id)
    .select('*, client:crm_clients(id, name, email)')
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://inovex.ro';
  const signUrl = `${siteUrl}/contract/${token}`;

  const recipient = parsed.data.email || '';
  let emailSent = false;
  let emailError: string | null = null;
  if (recipient) {
    const emailRes = await sendEmail({
      to: recipient,
      subject: signRequestSubject(contract.contract_number || ''),
      html: signRequestHtml({
        contractNumber: contract.contract_number || '',
        title: contract.title,
        companyName: org?.company_name,
        signUrl,
        expires: null,
      }),
    });
    emailSent = emailRes.success;
    emailError = emailRes.error ?? null;
  }

  await supabaseAdmin.from('crm_activities').insert({
    type: 'system',
    title: recipient ? `Contract trimis spre semnare catre ${recipient}` : 'Link de semnare generat',
    contract_id: id,
    client_id: contract.client_id,
    created_by: auth.user.id,
  });

  return NextResponse.json({ contract: updated, emailSent, emailError });
}
