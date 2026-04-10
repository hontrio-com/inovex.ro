import {
  buildEmail, sectionHeading, dataRow, dataTable, blueBox,
  paragraph, heading, separator, primaryButton, metadataFooter,
  quickActionButtons, timeline, contactDirect, smallDisclaimer, esc,
} from '@/lib/email/layout';

export interface MagazinOnlineData {
  tipEntitate: string;
  industrie: string;
  areProduse: string;
  nrProduse?: string;
  nume: string;
  email: string;
  telefon: string;
  observatii?: string;
  ip?: string;
}

/* ── Email INTERN ── */

export function internSubject(d: MagazinOnlineData): string {
  return `[LEAD NOU] Magazin Online - ${d.nume}`;
}

export function internHtml(d: MagazinOnlineData): string {
  const submittedAt = new Date().toLocaleString('ro-RO', { timeZone: 'Europe/Bucharest' });

  const content = `
    ${blueBox(`
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;color:#1E40AF;margin-bottom:4px;">
        Cerere noua primita
      </div>
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#1D4ED8;">
        ${submittedAt}${d.ip ? ` &nbsp;·&nbsp; IP: ${esc(d.ip)}` : ''}
      </div>
    `)}

    ${sectionHeading('Date de contact')}
    ${dataTable(
      dataRow('Nume', d.nume) +
      dataRow('Email', d.email) +
      dataRow('Telefon', d.telefon)
    )}

    ${quickActionButtons(d.telefon, d.email)}

    ${sectionHeading('Detalii proiect')}
    ${dataTable(
      dataRow('Tip entitate', d.tipEntitate) +
      dataRow('Industrie', d.industrie) +
      dataRow('Are produse', d.areProduse) +
      (d.nrProduse ? dataRow('Numar produse', d.nrProduse) : '')
    )}

    ${d.observatii ? `
      ${sectionHeading('Observatii')}
      ${blueBox(`
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;
                    color:#4A5568;line-height:1.75;font-style:italic;">
          ${esc(d.observatii)}
        </div>
      `)}
    ` : ''}

    ${separator()}

    <div style="text-align:center;padding:0 40px 28px;">
      ${primaryButton('https://inovex.ro/admin/bids', 'Deschide in admin', '#10B981')}
    </div>

    ${metadataFooter(`Primit la: ${submittedAt} &nbsp;·&nbsp; Sursa: Configurator Magazine Online${d.ip ? ` &nbsp;·&nbsp; IP: ${esc(d.ip)}` : ''}`)}
  `;

  return buildEmail({
    content,
    previewText: 'Cerere noua pentru magazin online primita prin configurator.',
    headerTag: 'Cerere noua',
  });
}

/* ── Email CLIENT ── */

export function clientSubject(): string {
  return 'Am primit cererea ta - te contactam in 24 de ore | Inovex';
}

export function clientHtml(d: MagazinOnlineData): string {
  const content = `
    ${heading(`Buna, ${d.nume}!`)}

    ${paragraph('Am primit cererea ta pentru un <strong>magazin online</strong> si ne-am apucat deja sa o analizam. Un specialist din echipa Inovex te va contacta in maximum <strong>24 de ore</strong> pentru a discuta proiectul tau in detaliu.')}

    <div style="margin:8px 40px 20px;padding:16px 20px;background-color:#F8FAFB;
                border:1px solid #E8ECF0;border-radius:8px;">
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;
                  color:#0D1117;margin-bottom:10px;">
        Rezumatul cererii tale
      </div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${dataRow('Tip entitate', d.tipEntitate)}
        ${dataRow('Industrie', d.industrie)}
        ${dataRow('Are produse', d.areProduse)}
        ${d.nrProduse ? dataRow('Numar produse', d.nrProduse) : ''}
      </table>
    </div>

    ${sectionHeading('Ce urmeaza?')}
    <div style="padding:0 40px 8px;">
      ${timeline([
        { title: 'Analiza cerere', desc: 'Echipa noastra analizeaza detaliile proiectului tau si pregateste intrebarile relevante.' },
        { title: 'Te contactam', desc: 'Un specialist te suna sau iti trimite email in maximum 24 de ore.' },
        { title: 'Propunere detaliata', desc: 'Primesti o propunere tehnica completa cu tot ce include proiectul si termenul de livrare.' },
      ])}
    </div>

    ${separator()}
    ${contactDirect()}

    <div style="text-align:center;padding:16px 40px 8px;">
      ${primaryButton('https://inovex.ro/portofoliu', 'Exploreaza portofoliul nostru')}
    </div>

    ${separator()}
    ${smallDisclaimer('Daca nu ai completat tu aceasta cerere sau e o greseala, ignora acest email. Nu ai niciun angajament.')}
  `;

  return buildEmail({
    content,
    previewText: 'Multumim! Echipa Inovex analizeaza proiectul tau acum.',
    headerTag: 'Confirmare',
  });
}
