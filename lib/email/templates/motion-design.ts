import {
  buildEmail, sectionHeading, dataRow, dataTable,
  paragraph, heading, separator, metadataFooter,
  contactDirect, quickActionButtons, esc,
} from '@/lib/email/layout';

export interface MotionOrderData {
  nume: string;
  email: string;
  telefon?: string | null;
  companie?: string | null;
  cui?: string | null;
  pachet: string;
  total: string;
  /** Brief-ul completat la comanda (descriere + link-uri catre materiale). */
  brief?: string | null;
  sessionId: string;
}

/* ── Email INTERN ── */

export function internSubject(d: MotionOrderData): string {
  return `[COMANDA PLATITA] Motion Design - ${d.pachet} - ${d.nume}`;
}

export function internHtml(d: MotionOrderData): string {
  const paidAt = new Date().toLocaleString('ro-RO', { timeZone: 'Europe/Bucharest' });

  const content = `
    ${sectionHeading('Comanda')}
    ${dataTable(
      dataRow('Serviciu', 'Video Motion Design') +
      dataRow('Pachet', esc(d.pachet)) +
      dataRow('Total platit', esc(d.total))
    )}

    ${sectionHeading('Client')}
    ${dataTable(
      dataRow('Nume', esc(d.nume)) +
      dataRow('Email', esc(d.email)) +
      (d.telefon ? dataRow('Telefon', esc(d.telefon)) : '') +
      (d.companie ? dataRow('Companie', esc(d.companie)) : '') +
      (d.cui ? dataRow('CUI', esc(d.cui)) : '')
    )}

    ${d.telefon ? quickActionButtons(d.telefon, d.email) : ''}

    ${d.brief ? `${sectionHeading('Brief')}
    <div style="margin:0 40px 24px;padding:20px;background-color:#F8FAFB;
                border:1px solid #E8ECF0;border-radius:8px;">
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;
                  color:#0D1117;line-height:1.75;white-space:pre-wrap;word-break:break-word;">${esc(d.brief)}</div>
    </div>` : ''}

    ${metadataFooter(`Platit la: ${paidAt} &nbsp;·&nbsp; Sursa: Stripe Checkout &nbsp;·&nbsp; Sesiune: ${esc(d.sessionId)}`)}
  `;

  return buildEmail({
    content,
    previewText: `Comanda platita: ${d.pachet} - ${d.total} - ${d.nume}`,
    headerTag: 'Comanda noua',
  });
}

/* ── Email CLIENT ── */

export function clientSubject(): string {
  return 'Am primit comanda ta de Motion Design | Inovex';
}

export function clientHtml(d: MotionOrderData): string {
  const content = `
    ${heading('Plata a fost confirmata!')}

    ${paragraph(`Multumim, <strong>${esc(d.nume)}</strong>. Am primit comanda ta si ne apucam de treaba.`)}

    ${dataTable(
      dataRow('Pachet', esc(d.pachet)) +
      dataRow('Total platit', esc(d.total))
    )}

    ${paragraph('Avem deja brief-ul si materialele trimise la comanda, asa ca incepem cu scenariul. Daca avem nevoie de lamuriri, te contactam in maximum <strong>24 de ore</strong>.')}

    ${separator()}
    ${contactDirect()}
  `;

  return buildEmail({
    content,
    previewText: 'Plata confirmata. Ne apucam de videoclipul tau.',
    headerTag: 'Confirmare comanda',
  });
}
