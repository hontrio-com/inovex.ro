import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase';
import { renderSignedContractPdf } from '@/lib/crm/contract-pdf';
import { sendEmail } from '@/lib/email/send';
import { signedHtml, signedSubject } from '@/lib/email/templates/contract';

export const runtime = 'nodejs';
export const maxDuration = 60;

const BUCKET = 'crm-files';

const schema = z.object({
  signer_name: z.string().trim().min(2, 'Introdu numele complet').max(120),
  signer_email: z.string().email('Email invalid').optional().or(z.literal('')),
  signature: z.string().min(50, 'Semnatura lipseste'),
  gdpr: z.literal(true),
});

function dataUrlToBuffer(dataUrl: string): { buffer: Buffer; ext: string } | null {
  const m = /^data:image\/(png|jpeg|jpg|webp);base64,(.+)$/.exec(dataUrl);
  if (!m) return null;
  return { buffer: Buffer.from(m[2], 'base64'), ext: m[1] === 'jpeg' ? 'jpg' : m[1] };
}

/** POST /api/contract/[id]/[token]/sign — semnare PUBLICA (fara auth). */
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string; token: string }> }) {
  const { id, token } = await params;

  const { data: contract } = await supabaseAdmin.from('crm_contracts').select('*').eq('id', id).single();
  if (!contract || contract.sign_token !== token) return NextResponse.json({ error: 'Link invalid' }, { status: 404 });
  if (contract.status === 'semnat') return NextResponse.json({ error: 'Contractul e deja semnat' }, { status: 400 });
  if (contract.status !== 'trimis') return NextResponse.json({ error: 'Contract indisponibil pentru semnare' }, { status: 400 });
  if (contract.expires_at && new Date(contract.expires_at) < new Date()) {
    await supabaseAdmin.from('crm_contracts').update({ status: 'expirat' }).eq('id', id);
    return NextResponse.json({ error: 'Linkul a expirat' }, { status: 400 });
  }

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Date invalide' }, { status: 400 }); }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Date invalide' }, { status: 400 });

  const sig = dataUrlToBuffer(parsed.data.signature);
  if (!sig) return NextResponse.json({ error: 'Semnatura invalida' }, { status: 400 });

  // Salveaza imaginea semnaturii clientului.
  const sigPath = `contracts/${id}/signature-${crypto.randomUUID()}.${sig.ext}`;
  const { error: sigUpErr } = await supabaseAdmin.storage.from(BUCKET).upload(sigPath, sig.buffer, { contentType: `image/${sig.ext === 'jpg' ? 'jpeg' : sig.ext}` });
  if (sigUpErr) return NextResponse.json({ error: 'Eroare la salvarea semnaturii' }, { status: 500 });

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? req.headers.get('x-real-ip') ?? null;
  const ua = req.headers.get('user-agent') ?? null;
  const signedAt = new Date().toISOString();

  await supabaseAdmin.from('crm_contract_signatures').insert({
    contract_id: id, signer_name: parsed.data.signer_name, signer_email: parsed.data.signer_email || null,
    signature_url: sigPath, ip_address: ip, user_agent: ua, signed_at: signedAt,
  });

  // Semnatura firmei (optional, aplicata automat).
  const { data: org } = await supabaseAdmin.from('crm_org_settings').select('signature_url, signer_name, email').eq('id', 1).single();
  let companySig: string | null = null;
  if (org?.signature_url) {
    const { data: blob } = await supabaseAdmin.storage.from(BUCKET).download(org.signature_url);
    if (blob) {
      const buf = Buffer.from(await blob.arrayBuffer());
      const ext = org.signature_url.endsWith('.webp') ? 'webp' : /\.jpe?g$/.test(org.signature_url) ? 'jpeg' : 'png';
      companySig = `data:image/${ext};base64,${buf.toString('base64')}`;
    }
  }

  // Genereaza PDF-ul semnat.
  const pdf = await renderSignedContractPdf({
    contractNumber: contract.contract_number || '',
    contentHtml: contract.content,
    clientSignature: parsed.data.signature,
    clientName: parsed.data.signer_name,
    signedAt, ip, userAgent: ua,
    companySignature: companySig,
    companySigner: org?.signer_name,
  });

  const pdfPath = `contracts/${id}/contract-${(contract.contract_number || id).replace(/[^A-Za-z0-9-]/g, '_')}.pdf`;
  await supabaseAdmin.storage.from(BUCKET).upload(pdfPath, pdf, { contentType: 'application/pdf', upsert: true });

  await supabaseAdmin.from('crm_contracts').update({ status: 'semnat', signed_at: signedAt, signed_pdf_url: pdfPath }).eq('id', id);

  await supabaseAdmin.from('crm_activities').insert({
    type: 'system', title: `Contract semnat de ${parsed.data.signer_name}`, contract_id: id, client_id: contract.client_id,
  });

  // Email catre ambele parti, cu PDF-ul atasat.
  const attachments = [{ filename: `Contract-${contract.contract_number || id}.pdf`, content: pdf, contentType: 'application/pdf' }];
  const signedAtStr = new Date(signedAt).toLocaleString('ro-RO');
  const subject = signedSubject(contract.contract_number || '');
  const clientEmail = parsed.data.signer_email || null;
  const companyEmail = org?.email || process.env.SMTP_TO || process.env.SMTP_USER || null;

  if (clientEmail) {
    await sendEmail({ to: clientEmail, subject, html: signedHtml({ contractNumber: contract.contract_number || '', signerName: parsed.data.signer_name, signedAt: signedAtStr, forClient: true }), attachments });
  }
  if (companyEmail) {
    await sendEmail({ to: companyEmail, subject, html: signedHtml({ contractNumber: contract.contract_number || '', signerName: parsed.data.signer_name, signedAt: signedAtStr, forClient: false }), attachments });
  }

  return NextResponse.json({ success: true });
}
