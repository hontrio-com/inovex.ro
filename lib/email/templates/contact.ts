import {
  buildEmail, sectionHeading, dataRow, dataTable,
  paragraph, heading, separator, metadataFooter,
  contactDirect, smallDisclaimer, esc,
} from '@/lib/email/layout';
import { CONTACT, etichetaLimba, type LimbaEmail } from '@/lib/email/texte';

export interface ContactData {
  nume: string;
  email: string;
  telefon: string;
  companie?: string;
  mesaj: string;
  ip?: string;
  /** limba paginii de pe care a venit mesajul */
  limba?: LimbaEmail;
}

/* ── Email INTERN ── */

export function internSubject(d: ContactData): string {
  const preview = d.mesaj.slice(0, 50).replace(/\n/g, ' ');
  return `${etichetaLimba(d.limba ?? 'ro')}[CONTACT] ${preview}${d.mesaj.length > 50 ? '...' : ''} - ${d.nume}`;
}

export function internHtml(d: ContactData): string {
  const submittedAt = new Date().toLocaleString('ro-RO', { timeZone: 'Europe/Bucharest' });

  const content = `
    ${sectionHeading('Expeditor')}
    ${dataTable(
      dataRow('Nume', d.nume) +
      dataRow('Email', d.email) +
      dataRow('Telefon', d.telefon) +
      (d.companie ? dataRow('Companie', d.companie) : '')
    )}

    <div style="text-align:center;padding:12px 40px 8px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
        <tr>
          <td style="padding-right:8px;">
            <a href="tel:+${d.telefon.replace(/\D/g, '').replace(/^0/, '40')}"
               style="display:inline-block;padding:10px 18px;border-radius:6px;
                      background-color:#2B8FCC;color:#fff;text-decoration:none;
                      font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;">
              Suna acum
            </a>
          </td>
          <td>
            <a href="mailto:${esc(d.email)}"
               style="display:inline-block;padding:10px 18px;border-radius:6px;
                      background-color:#0D1117;color:#fff;text-decoration:none;
                      font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;">
              Raspunde email
            </a>
          </td>
        </tr>
      </table>
    </div>

    ${sectionHeading('Mesajul primit')}
    <div style="margin:0 40px 24px;padding:20px;background-color:#F8FAFB;
                border:1px solid #E8ECF0;border-radius:8px;">
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;
                  color:#0D1117;line-height:1.75;white-space:pre-wrap;">
        ${esc(d.mesaj)}
      </div>
    </div>

    ${metadataFooter(`Primit la: ${submittedAt} &nbsp;·&nbsp; Sursa: Formular Contact${d.limba && d.limba !== 'ro' ? ` (${d.limba.toUpperCase()})` : ''}${d.ip ? ` &nbsp;·&nbsp; IP: ${esc(d.ip)}` : ''}`)}
  `;

  return buildEmail({
    content,
    previewText: `Mesaj nou de la ${d.nume} - ${d.mesaj.slice(0, 60)}`,
    headerTag: 'Mesaj nou',
  });
}

/* ── Email CLIENT ── */

export function clientSubject(lang: LimbaEmail = 'ro'): string {
  return CONTACT[lang].subiect;
}

export function clientHtml(d: ContactData, lang: LimbaEmail = 'ro'): string {
  const t = CONTACT[lang];
  const preview = d.mesaj.length > 200 ? d.mesaj.slice(0, 200) + '...' : d.mesaj;

  const content = `
    ${heading(t.titlu)}

    ${paragraph(t.multumim(esc(d.nume)))}

    <div style="margin:8px 40px 20px;padding:16px 20px;background-color:#F8FAFB;
                border:1px solid #E8ECF0;border-radius:8px;">
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:bold;
                  text-transform:uppercase;letter-spacing:1px;color:#8A94A6;margin-bottom:8px;">
        ${t.aiScris}
      </div>
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;
                  color:#4A5568;line-height:1.75;font-style:italic;white-space:pre-wrap;">
        ${esc(preview)}
      </div>
    </div>

    ${separator()}
    ${contactDirect(lang)}
    ${separator()}

    ${smallDisclaimer(t.avertisment)}
  `;

  return buildEmail({
    content,
    previewText: t.previzualizare,
    headerTag: t.eticheta,
    lang,
  });
}
