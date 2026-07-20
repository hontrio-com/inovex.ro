import {
  buildEmail, heading, paragraph, primaryButton, dataTable, dataRow,
  separator, metadataFooter, esc,
} from '@/lib/email/layout';

/* ── Cerere de semnare (catre client) ── */
export interface SignRequestData {
  contractNumber: string;
  title?: string | null;
  companyName?: string | null;
  signUrl: string;
  expires?: string | null;
}

export function signRequestSubject(n: string): string {
  return `Contract ${n} - spre semnare | Inovex`;
}

export function signRequestHtml(d: SignRequestData): string {
  const content = `
    ${heading('Contract pregatit pentru semnare')}
    ${paragraph(`Ai primit un contract de la <strong>${esc(d.companyName || 'Inovex')}</strong>. Il poti citi si semna online, in cateva secunde.`)}
    ${dataTable(dataRow('Numar contract', d.contractNumber) + (d.title ? dataRow('Obiect', d.title) : ''))}
    <div style="text-align:center;padding:12px 40px 24px;">${primaryButton(d.signUrl, 'Citeste si semneaza')}</div>
    ${d.expires ? paragraph(`<span style="color:#8A94A6;font-size:13px;">Linkul expira la ${esc(d.expires)}.</span>`) : ''}
    ${separator()}
    ${metadataFooter('Semnatura electronica simpla (eIDAS). Daca nu recunosti acest contract, ignora acest email.')}
  `;
  return buildEmail({ content, previewText: `Contract ${d.contractNumber} spre semnare`, headerTag: 'Semnare' });
}

/* ── Confirmare contract semnat (catre ambele parti; PDF atasat) ── */
export interface SignedData {
  contractNumber: string;
  signerName: string;
  signedAt: string;
  forClient: boolean;
}

export function signedSubject(n: string): string {
  return `Contract ${n} semnat | Inovex`;
}

export function signedHtml(d: SignedData): string {
  const content = `
    ${heading('Contract semnat cu succes')}
    ${paragraph(d.forClient
      ? `Multumim, <strong>${esc(d.signerName)}</strong>! Contractul a fost semnat. Gasesti PDF-ul semnat atasat acestui email.`
      : `Contractul a fost semnat de <strong>${esc(d.signerName)}</strong>. PDF-ul semnat e atasat.`)}
    ${dataTable(dataRow('Numar contract', d.contractNumber) + dataRow('Semnat de', d.signerName) + dataRow('Data', d.signedAt))}
    ${separator()}
    ${metadataFooter('PDF-ul atasat contine semnatura si metadatele de audit.')}
  `;
  return buildEmail({ content, previewText: `Contract ${d.contractNumber} semnat`, headerTag: 'Semnat' });
}

/* ── Reminder de semnare (catre client) ── */
export interface ReminderData {
  contractNumber: string;
  companyName?: string | null;
  signUrl: string;
  expires?: string | null;
}

export function reminderSubject(n: string): string {
  return `Reminder: contract ${n} in asteptare | Inovex`;
}

export function reminderHtml(d: ReminderData): string {
  const content = `
    ${heading('Contractul tau asteapta semnatura')}
    ${paragraph(`Contractul <strong>${esc(d.contractNumber)}</strong> de la ${esc(d.companyName || 'Inovex')} nu a fost inca semnat.`)}
    <div style="text-align:center;padding:12px 40px 24px;">${primaryButton(d.signUrl, 'Semneaza acum')}</div>
    ${d.expires ? paragraph(`<span style="color:#8A94A6;font-size:13px;">Linkul expira la ${esc(d.expires)}.</span>`) : ''}
    ${metadataFooter('Daca ai semnat deja, ignora acest email.')}
  `;
  return buildEmail({ content, previewText: `Reminder contract ${d.contractNumber}`, headerTag: 'Reminder' });
}
