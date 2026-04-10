import {
  buildEmail, sectionHeading, dataRow, dataTable,
  paragraph, heading, separator, primaryButton, metadataFooter,
  quickActionButtons, timeline, contactDirect, smallDisclaimer, esc,
} from '@/lib/email/layout';

/* ── Cerere cumparare produs ── */

export interface MarketplaceBidData {
  productSlug: string;
  productTitle: string;
  name: string;
  email: string;
  phone: string;
  offeredPrice: number;
  message?: string;
  ip?: string;
}

export function bidInternSubject(d: MarketplaceBidData): string {
  return `[MARKETPLACE] ${d.productTitle} - ${d.offeredPrice} EUR - ${d.name}`;
}

export function bidInternHtml(d: MarketplaceBidData): string {
  const submittedAt = new Date().toLocaleString('ro-RO', { timeZone: 'Europe/Bucharest' });

  const content = `
    <div style="margin:24px 40px 8px;padding:20px 24px;border-radius:8px;background-color:#0D1117;">
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;
                  text-transform:uppercase;letter-spacing:1px;color:rgba(255,255,255,0.45);
                  margin-bottom:6px;">
        Produs solicitat
      </div>
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:18px;font-weight:bold;
                  color:#FFFFFF;margin-bottom:8px;">
        ${esc(d.productTitle)}
      </div>
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:24px;font-weight:bold;
                  color:#4AADE8;">
        ${d.offeredPrice.toLocaleString('ro-RO')} EUR
      </div>
    </div>

    ${sectionHeading('Date cumparator')}
    ${dataTable(
      dataRow('Nume', d.name) +
      dataRow('Email', d.email) +
      dataRow('Telefon', d.phone)
    )}

    ${quickActionButtons(d.phone, d.email)}

    ${d.message ? `
      ${sectionHeading('Mesaj')}
      <div style="margin:0 40px 24px;padding:16px 20px;background-color:#F8FAFB;
                  border:1px solid #E8ECF0;border-radius:8px;">
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;
                    color:#4A5568;line-height:1.75;white-space:pre-wrap;">
          ${esc(d.message)}
        </div>
      </div>
    ` : ''}

    ${separator()}

    <div style="text-align:center;padding:0 40px 28px;">
      ${primaryButton(`https://inovex.ro/admin/marketplace`, 'Deschide produsul in admin', '#10B981')}
    </div>

    ${metadataFooter(`Primit la: ${submittedAt} &nbsp;·&nbsp; Sursa: Marketplace &nbsp;·&nbsp; Slug: ${esc(d.productSlug)}${d.ip ? ` &nbsp;·&nbsp; IP: ${esc(d.ip)}` : ''}`)}
  `;

  return buildEmail({
    content,
    previewText: `Cerere noua pentru ${d.productTitle} - ${d.offeredPrice} EUR`,
    headerTag: 'Cerere marketplace',
  });
}

export function bidClientSubject(d: MarketplaceBidData): string {
  return `Cererea ta pentru "${d.productTitle}" a fost primita | Inovex`;
}

export function bidClientHtml(d: MarketplaceBidData): string {
  const content = `
    ${heading('Cererea ta a ajuns la noi!')}

    ${paragraph(`Buna, <strong>${esc(d.name)}</strong>! Am primit cererea ta pentru produsul de mai jos. Un specialist din echipa Inovex te va contacta in maximum <strong>24 de ore</strong> pentru a discuta detaliile si pasii urmatori.`)}

    <div style="margin:8px 40px 20px;padding:20px 24px;border-radius:8px;background-color:#0D1117;">
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;
                  text-transform:uppercase;letter-spacing:1px;color:rgba(255,255,255,0.45);
                  margin-bottom:6px;">
        Produs solicitat
      </div>
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:18px;font-weight:bold;
                  color:#FFFFFF;margin-bottom:8px;">
        ${esc(d.productTitle)}
      </div>
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:bold;
                  color:#4AADE8;">
        ${d.offeredPrice.toLocaleString('ro-RO')} EUR
      </div>
    </div>

    ${sectionHeading('Ce urmeaza?')}
    <div style="padding:0 40px 8px;">
      ${timeline([
        { title: 'Verificare disponibilitate', desc: 'Verificam disponibilitatea produsului si pregatim toate detaliile pentru tine.' },
        { title: 'Contactare si confirmare', desc: 'Un specialist te contacteaza in maximum 24 de ore pentru a confirma comanda.' },
        { title: 'Livrare si personalizare in 48h', desc: 'Produsul este personalizat cu datele afacerii tale si livrat in termenul convenit.' },
      ])}
    </div>

    ${separator()}
    ${contactDirect()}

    <div style="text-align:center;padding:16px 40px 8px;">
      ${primaryButton('https://inovex.ro/marketplace', 'Exploreaza alte produse')}
    </div>

    ${separator()}
    ${smallDisclaimer('Daca nu ai completat tu aceasta cerere sau e o greseala, ignora acest email. Nu ai niciun angajament.')}
  `;

  return buildEmail({
    content,
    previewText: `Cererea ta pentru ${d.productTitle} a fost primita.`,
    headerTag: 'Confirmare',
  });
}

/* ── Download resurs-a (lead magnet) ── */

export interface LearnDownloadData {
  name: string;
  email: string;
  resourceTitle: string;
  downloadUrl: string;
  downloadedAt?: string;
}

export function downloadClientSubject(): string {
  return 'Resursa ta este gata de descarcare | Inovex';
}

export function downloadClientHtml(d: LearnDownloadData): string {
  const date = d.downloadedAt
    ? new Date(d.downloadedAt).toLocaleDateString('ro-RO', { day: '2-digit', month: 'long', year: 'numeric' })
    : new Date().toLocaleDateString('ro-RO', { day: '2-digit', month: 'long', year: 'numeric' });

  const content = `
    ${heading('Resursa ta te asteapta!')}

    ${paragraph(`Buna, <strong>${esc(d.name)}</strong>! Resursa pe care ai solicitat-o este gata de descarcare. Apasa butonul de mai jos pentru a o accesa.`)}

    <div style="margin:8px 40px 20px;padding:16px 20px;background-color:#F0FDF4;
                border:1px solid #A7F3D0;border-radius:8px;">
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:bold;
                  text-transform:uppercase;letter-spacing:1px;color:#059669;margin-bottom:6px;">
        Resursa ta
      </div>
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:bold;
                  color:#065F46;">
        ${esc(d.resourceTitle)}
      </div>
    </div>

    <div style="text-align:center;padding:8px 40px 8px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
        <tr>
          <td style="border-radius:8px;background-color:#10B981;">
            <a href="${esc(d.downloadUrl)}"
               style="display:inline-block;padding:16px 40px;
                      font-family:Arial,Helvetica,sans-serif;font-size:16px;
                      font-weight:bold;color:#FFFFFF;text-decoration:none;border-radius:8px;">
              Descarca acum
            </a>
          </td>
        </tr>
      </table>
    </div>

    <div style="text-align:center;padding:8px 40px 16px;">
      <span style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#8A94A6;">
        Link-ul este valabil 7 zile de la primirea acestui email.
      </span>
    </div>

    ${separator()}

    ${paragraph('Vrei sa inveti mai mult? Sectiunea <strong>Invata Gratuit</strong> de pe site-ul nostru contine articole, ghiduri si resurse gratuite pentru antreprenori.')}

    <div style="text-align:center;padding:4px 40px 16px;">
      ${primaryButton('https://inovex.ro/invata-gratuit', 'Descopera resurse gratuite')}
    </div>

    ${separator()}
    ${contactDirect()}
    ${separator()}

    ${smallDisclaimer(`Ai descarcat aceasta resursa pe ${date}. Daca nu ai solicitat tu aceasta descarcare, ignora emailul.`)}
  `;

  return buildEmail({
    content,
    previewText: 'Link-ul tau de descarcare este activ.',
    headerTag: 'Descarcare',
  });
}
