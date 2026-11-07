import {
  buildEmail, sectionHeading, dataRow, dataTable, blueBox,
  paragraph, heading, separator, primaryButton, metadataFooter,
  quickActionButtons, timeline, contactDirect, smallDisclaimer, esc,
} from '@/lib/email/layout';
import { butonPortofoliu, CONFIGURATOR, etichetaLimba, OFERTA, sufixLimba, type LimbaEmail } from '@/lib/email/texte';
import { etichetaOptiune, textConfiguratoare, type Optiune } from '@/lib/i18n/pagini/configuratoare';

export interface WebsitePrezentareData {
  tipEntitate: string;
  industrie: string;
  nrPagini: string;
  obiectiv: string;
  nume: string;
  email: string;
  telefon: string;
  observatii?: string;
  ip?: string;
  /** limba paginii (din 2026-11-07): confirmarea pleaca in limba clientului; internul ramane in romana */
  limba?: LimbaEmail;
}

/* ── Email INTERN ── */

export function internSubject(d: WebsitePrezentareData): string {
  return `${etichetaLimba(d.limba ?? 'ro')}[LEAD NOU] Website Prezentare - ${d.nume}`;
}

export function internHtml(d: WebsitePrezentareData): string {
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
      dataRow('Numar pagini', d.nrPagini) +
      dataRow('Obiectiv principal', d.obiectiv)
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

    ${metadataFooter(`Primit la: ${submittedAt} &nbsp;·&nbsp; Sursa: Configurator Website Prezentare${sufixLimba(d.limba)}${d.ip ? ` &nbsp;·&nbsp; IP: ${esc(d.ip)}` : ''}`)}
  `;

  return buildEmail({
    content,
    previewText: 'Cerere noua pentru website de prezentare primita prin configurator.',
    headerTag: 'Cerere noua',
  });
}

/* ── Email CLIENT ── */

export function clientSubject(lang: LimbaEmail = 'ro'): string {
  return CONFIGURATOR[lang].subiect;
}

export function clientHtml(d: WebsitePrezentareData, lang: LimbaEmail = 'ro'): string {
  const o = OFERTA[lang];
  const t = CONFIGURATOR[lang].website;
  const r = t.randuri;
  const p = textConfiguratoare(lang);
  // in romana, valorile din formular, ca pana acum; in celelalte limbi, etichetele de pe pagina
  // (industria scrisa de mana, la „Alt domeniu”, ramane cum a scris-o clientul)
  const v = (lista: Optiune[], valoare: string) => (lang === 'ro' ? valoare : etichetaOptiune(lista, valoare));

  const content = `
    ${heading(o.salut(d.nume))}

    ${paragraph(t.primit)}

    <div style="margin:8px 40px 20px;padding:16px 20px;background-color:#F8FAFB;
                border:1px solid #E8ECF0;border-radius:8px;">
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;
                  color:#0D1117;margin-bottom:10px;">
        ${o.rezumat}
      </div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${dataRow(r.entitate, v(p.comun.entitate.optiuni, d.tipEntitate))}
        ${dataRow(r.industrie, v(p.website.industrii, d.industrie))}
        ${dataRow(r.nrPagini, v(p.website.nrPagini, d.nrPagini))}
        ${dataRow(r.obiectiv, v(p.website.obiective, d.obiectiv))}
      </table>
    </div>

    ${sectionHeading(o.urmeaza)}
    <div style="padding:0 40px 8px;">
      ${timeline(o.pasi)}
    </div>

    ${separator()}
    ${contactDirect(lang)}

    <div style="text-align:center;padding:16px 40px 8px;">
      ${primaryButton(...butonPortofoliu(lang))}
    </div>

    ${separator()}
    ${smallDisclaimer(o.avertisment)}
  `;

  return buildEmail({
    content,
    previewText: t.previzualizare,
    headerTag: o.eticheta,
    lang,
  });
}
