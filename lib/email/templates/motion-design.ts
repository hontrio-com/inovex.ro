import {
  buildEmail, sectionHeading, dataRow, dataTable,
  paragraph, heading, separator, metadataFooter,
  contactDirect, quickActionButtons, esc,
} from '@/lib/email/layout';
import { etichetaLimba, MOTION, type LimbaEmail } from '@/lib/email/texte';

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
  /** limba clientului (din metadata sesiunii); emailul intern ramane in romana, cu [EN] in subiect */
  limba?: LimbaEmail;
}

/* ── Email INTERN ── */

export function internSubject(d: MotionOrderData): string {
  return `${etichetaLimba(d.limba ?? 'ro')}[COMANDA PLATITA] Motion Design - ${d.pachet} - ${d.nume}`;
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

    ${metadataFooter(`Platit la: ${paidAt} &nbsp;·&nbsp; Sursa: Stripe Checkout${d.limba && d.limba !== 'ro' ? ` (${d.limba.toUpperCase()})` : ''} &nbsp;·&nbsp; Sesiune: ${esc(d.sessionId)}`)}
  `;

  return buildEmail({
    content,
    previewText: `Comanda platita: ${d.pachet} - ${d.total} - ${d.nume}`,
    headerTag: 'Comanda noua',
  });
}

/* ── Email CLIENT ── */

export function clientSubject(lang: LimbaEmail = 'ro'): string {
  return MOTION[lang].subiect;
}

/** Confirmarea pentru client, in limba lui; `pachet` si `total` vin deja scrise in limba lui. */
export function clientHtml(d: MotionOrderData, lang: LimbaEmail = 'ro'): string {
  const t = MOTION[lang];
  const content = `
    ${heading(t.titlu)}

    ${paragraph(t.multumim(esc(d.nume)))}

    ${dataTable(
      dataRow(t.pachet, esc(d.pachet)) +
      dataRow(t.total, esc(d.total))
    )}

    ${paragraph(t.text)}

    ${separator()}
    ${contactDirect(lang)}
  `;

  return buildEmail({
    content,
    previewText: t.previzualizare,
    headerTag: t.eticheta,
    lang,
  });
}
