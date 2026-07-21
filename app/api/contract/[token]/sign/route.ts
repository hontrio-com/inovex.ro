import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase';
import { renderSignedContractPdf } from '@/lib/crm/contract-pdf';
import { sendEmail } from '@/lib/email/send';
import { signedHtml, signedSubject } from '@/lib/email/templates/contract';

export const runtime = 'nodejs';
export const maxDuration = 60;

const BUCKET = 'crm-files';

const schema = z.object({ signature: z.string().min(50, 'Semnatura lipseste') });

function dataUrlToBuffer(dataUrl: string): { buffer: Buffer; ext: string } | null {
  const m = /^data:image\/(png|jpeg|jpg|webp);base64,(.+)$/.exec(dataUrl);
  if (!m) return null;
  return { buffer: Buffer.from(m[2], 'base64'), ext: m[1] === 'jpeg' ? 'jpg' : m[1] };
}

/** POST /api/contract/[token]/sign — semnare PUBLICA (fara auth). Doar semnatura. */
export async function POST(req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  const { data: contract } = await supabaseAdmin.from('crm_contracts').select('*').eq('sign_token', token).single();
  if (!contract) return NextResponse.json({ error: 'Link invalid' }, { status: 404 });
  if (contract.status === 'semnat') return NextResponse.json({ error: 'Contractul e deja semnat' }, { status: 400 });
  if (contract.status !== 'trimis') return NextResponse.json({ error: 'Contract indisponibil pentru semnare' }, { status: 400 });

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Date invalide' }, { status: 400 }); }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Date invalide' }, { status: 400 });

  const sig = dataUrlToBuffer(parsed.data.signature);
  if (!sig) return NextResponse.json({ error: 'Semnatura invalida' }, { status: 400 });

  // Numele semnatarului = numele clientului din contract.
  let signerName = 'Beneficiar';
  if (contract.client_id) {
    const { data: cl } = await supabaseAdmin.from('crm_clients').select('name').eq('id', contract.client_id).single();
    if (cl?.name) signerName = cl.name;
  }

  const sigPath = `contracts/${contract.id}/signature-${crypto.randomUUID()}.${sig.ext}`;
  const { error: sigUpErr } = await supabaseAdmin.storage.from(BUCKET).upload(sigPath, sig.buffer, { contentType: `image/${sig.ext === 'jpg' ? 'jpeg' : sig.ext}` });
  if (sigUpErr) return NextResponse.json({ error: 'Eroare la salvarea semnaturii' }, { status: 500 });

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? req.headers.get('x-real-ip') ?? null;
  const ua = req.headers.get('user-agent') ?? null;
  const signedAt = new Date().toISOString();

  await supabaseAdmin.from('crm_contract_signatures').insert({
    contract_id: contract.id, signer_name: signerName, signature_url: sigPath, ip_address: ip, user_agent: ua, signed_at: signedAt,
  });

  // Semnatura firmei (optional, aplicata automat).
  const { data: org } = await supabaseAdmin.from('crm_org_settings').select('signature_url, signer_name, company_name, company_cui, company_reg_com').eq('id', 1).single();
  let companySig: string | null = null;
  if (org?.signature_url) {
    const { data: blob } = await supabaseAdmin.storage.from(BUCKET).download(org.signature_url);
    if (blob) {
      const buf = Buffer.from(await blob.arrayBuffer());
      const ext = org.signature_url.endsWith('.webp') ? 'webp' : /\.jpe?g$/.test(org.signature_url) ? 'jpeg' : 'png';
      companySig = `data:image/${ext};base64,${buf.toString('base64')}`;
    }
  }

  const pdf = await renderSignedContractPdf({
    contractNumber: contract.contract_number || '',
    contentHtml: contract.content,
    clientSignature: parsed.data.signature,
    clientName: signerName,
    signedAt, ip, userAgent: ua,
    companySignature: companySig,
    companySigner: org?.signer_name,
    companyName: org?.company_name,
    companyCui: org?.company_cui,
    companyRegCom: org?.company_reg_com,
  });

  const pdfPath = `contracts/${contract.id}/contract-${(contract.contract_number || contract.id).replace(/[^A-Za-z0-9-]/g, '_')}.pdf`;
  await supabaseAdmin.storage.from(BUCKET).upload(pdfPath, pdf, { contentType: 'application/pdf', upsert: true });

  await supabaseAdmin.from('crm_contracts').update({ status: 'semnat', signed_at: signedAt, signed_pdf_url: pdfPath }).eq('id', contract.id);

  await supabaseAdmin.from('crm_activities').insert({
    type: 'system', title: `Contract semnat de ${signerName}`, contract_id: contract.id, client_id: contract.client_id,
  });

  // Copie interna la contact@inovex.ro (ca la formularele site-ului), cu PDF atasat.
  const companyEmail = process.env.SMTP_TO || 'contact@inovex.ro';
  await sendEmail({
    to: companyEmail,
    subject: signedSubject(contract.contract_number || ''),
    html: signedHtml({ contractNumber: contract.contract_number || '', signerName, signedAt: new Date(signedAt).toLocaleString('ro-RO'), forClient: false }),
    attachments: [{ filename: `Contract-${contract.contract_number || contract.id}.pdf`, content: pdf, contentType: 'application/pdf' }],
  });

  // URL semnat pentru descarcarea PDF-ului de catre client.
  const { data: dl } = await supabaseAdmin.storage.from(BUCKET).createSignedUrl(pdfPath, 3600);
  return NextResponse.json({ success: true, pdfUrl: dl?.signedUrl ?? null });
}
