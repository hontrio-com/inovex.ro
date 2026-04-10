import {
  buildEmail, sectionHeading, dataRow, dataTable, blueBox,
  paragraph, heading, separator, primaryButton, metadataFooter,
  quickActionButtons, timeline, contactDirect, smallDisclaimer, esc,
} from '@/lib/email/layout';

export interface OfertaData {
  serviciu: string;
  descriereProiect: string;
  nume: string;
  email: string;
  telefon: string;
  websiteExistent?: string;
  cumAiAflat?: string;
  ip?: string;
}

const SERVICIU_COLORS: Record<string, string> = {
  'Magazin Online':      '#2B8FCC',
  'Website Prezentare':  '#10B981',
  'Aplicatie Web / SaaS':'#8B5CF6',
  'CRM / ERP':           '#F59E0B',
  'Mobile':              '#EF4444',
  'AI':                  '#06B6D4',
};

function getServiciuColor(serviciu: string): string {
  for (const [key, color] of Object.entries(SERVICIU_COLORS)) {
    if (serviciu.toLowerCase().includes(key.toLowerCase())) return color;
  }
  return '#6B7280';
}

/* ── Email INTERN ── */

export function internSubject(d: OfertaData): string {
  return `[OFERTA] ${d.serviciu} - ${d.nume}`;
}

export function internHtml(d: OfertaData): string {
  const submittedAt = new Date().toLocaleString('ro-RO', { timeZone: 'Europe/Bucharest' });
  const color = getServiciuColor(d.serviciu);

  const content = `
    <div style="margin:24px 40px 8px;padding:16px 20px;border-radius:8px;
                background-color:${color}18;border:1px solid ${color}44;">
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:bold;
                  text-transform:uppercase;letter-spacing:1px;color:${color};margin-bottom:6px;">
        Serviciu solicitat
      </div>
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:18px;font-weight:bold;
                  color:#0D1117;">
        ${esc(d.serviciu)}
      </div>
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#8A94A6;margin-top:4px;">
        ${submittedAt}${d.ip ? ` &nbsp;·&nbsp; IP: ${esc(d.ip)}` : ''}
      </div>
    </div>

    ${sectionHeading('Date de contact')}
    ${dataTable(
      dataRow('Nume', d.nume) +
      dataRow('Email', d.email) +
      dataRow('Telefon', d.telefon) +
      (d.websiteExistent ? dataRow('Website existent', d.websiteExistent) : '') +
      (d.cumAiAflat ? dataRow('Cum a aflat de noi', d.cumAiAflat) : '')
    )}

    ${quickActionButtons(d.telefon, d.email)}

    ${sectionHeading('Descriere proiect')}
    ${blueBox(`
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;
                  color:#1E40AF;line-height:1.75;white-space:pre-wrap;">
        ${esc(d.descriereProiect)}
      </div>
    `)}

    ${separator()}

    <div style="text-align:center;padding:0 40px 28px;">
      ${primaryButton('https://inovex.ro/admin/bids', 'Deschide in admin', '#10B981')}
    </div>

    ${metadataFooter(`Primit la: ${submittedAt} &nbsp;·&nbsp; Sursa: Formular Oferta${d.ip ? ` &nbsp;·&nbsp; IP: ${esc(d.ip)}` : ''}`)}
  `;

  return buildEmail({
    content,
    previewText: `Cerere oferta noua: ${d.serviciu} de la ${d.nume}`,
    headerTag: 'Oferta noua',
  });
}

/* ── Email CLIENT ── */

export function clientSubject(): string {
  return 'Cererea ta de oferta a fost primita | Inovex';
}

export function clientHtml(d: OfertaData): string {
  const preview = d.descriereProiect.length > 200
    ? d.descriereProiect.slice(0, 200) + '...'
    : d.descriereProiect;

  const content = `
    ${heading(`Buna, ${d.nume}!`)}

    ${paragraph(`Am primit cererea ta de oferta pentru <strong>${esc(d.serviciu)}</strong> si ne-am apucat deja sa o analizam. Un specialist din echipa Inovex te va contacta in maximum <strong>24 de ore</strong> cu o propunere tehnica personalizata.`)}

    <div style="margin:8px 40px 20px;padding:16px 20px;background-color:#F8FAFB;
                border:1px solid #E8ECF0;border-radius:8px;">
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;
                  color:#0D1117;margin-bottom:10px;">
        Rezumatul cererii tale
      </div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${dataRow('Serviciu solicitat', d.serviciu)}
        ${d.websiteExistent ? dataRow('Website existent', d.websiteExistent) : ''}
      </table>
      <div style="margin-top:12px;padding-top:12px;border-top:1px solid #E8ECF0;">
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#8A94A6;margin-bottom:6px;">
          Descrierea ta:
        </div>
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#4A5568;
                    line-height:1.7;font-style:italic;white-space:pre-wrap;">
          ${esc(preview)}
        </div>
      </div>
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
    previewText: 'Cererea ta a fost primita. Te contactam in 24 de ore.',
    headerTag: 'Confirmare',
  });
}
