import {
  buildEmail, sectionHeading, dataRow, dataTable,
  paragraph, heading, separator, metadataFooter,
  contactDirect, smallDisclaimer, esc,
} from '@/lib/email/layout';

export interface ContactData {
  nume: string;
  email: string;
  telefon: string;
  companie?: string;
  mesaj: string;
  ip?: string;
}

/* ── Email INTERN ── */

export function internSubject(d: ContactData): string {
  const preview = d.mesaj.slice(0, 50).replace(/\n/g, ' ');
  return `[CONTACT] ${preview}${d.mesaj.length > 50 ? '...' : ''} - ${d.nume}`;
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

    ${metadataFooter(`Primit la: ${submittedAt} &nbsp;·&nbsp; Sursa: Formular Contact${d.ip ? ` &nbsp;·&nbsp; IP: ${esc(d.ip)}` : ''}`)}
  `;

  return buildEmail({
    content,
    previewText: `Mesaj nou de la ${d.nume} - ${d.mesaj.slice(0, 60)}`,
    headerTag: 'Mesaj nou',
  });
}

/* ── Email CLIENT ── */

export function clientSubject(): string {
  return 'Mesajul tau a ajuns la noi | Inovex';
}

export function clientHtml(d: ContactData): string {
  const preview = d.mesaj.length > 200 ? d.mesaj.slice(0, 200) + '...' : d.mesaj;

  const content = `
    ${heading('Am primit mesajul tau!')}

    ${paragraph(`Multumim ca ne-ai contactat, <strong>${esc(d.nume)}</strong>. Unul dintre membrii echipei noastre iti va raspunde in maximum <strong>24 de ore</strong>.`)}

    <div style="margin:8px 40px 20px;padding:16px 20px;background-color:#F8FAFB;
                border:1px solid #E8ECF0;border-radius:8px;">
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:bold;
                  text-transform:uppercase;letter-spacing:1px;color:#8A94A6;margin-bottom:8px;">
        Ai scris:
      </div>
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;
                  color:#4A5568;line-height:1.75;font-style:italic;white-space:pre-wrap;">
        ${esc(preview)}
      </div>
    </div>

    ${separator()}
    ${contactDirect()}
    ${separator()}

    ${smallDisclaimer('Daca nu ai trimis tu acest mesaj, ignora acest email.')}
  `;

  return buildEmail({
    content,
    previewText: 'Multumim! Iti raspundem in maximum 24 de ore.',
    headerTag: 'Confirmare',
  });
}
