import {
  buildEmail, sectionHeading, dataRow, dataTable, blueBox,
  paragraph, heading, separator, primaryButton, metadataFooter,
  quickActionButtons, timeline, contactDirect, smallDisclaimer, esc,
} from '@/lib/email/layout';
import { butonPortofoliu, CONFIGURATOR, etichetaLimba, OFERTA, sufixLimba, type LimbaEmail } from '@/lib/email/texte';
import { etichetaOptiune, textConfiguratoare, type Optiune } from '@/lib/i18n/pagini/configuratoare';

export interface MagazinOnlineData {
  tipEntitate: string;
  produseVandute: string;
  areProduse: string;
  nrProduse?: string;
  buget: string;
  nume: string;
  email: string;
  telefon: string;
  observatii?: string;
  ip?: string;
  /** limba paginii (din 2026-11-07): confirmarea pleaca in limba clientului; internul ramane in romana */
  limba?: LimbaEmail;
}

/** Bugetul cum l-a vazut clientul: in romana valoarea (in lei), in celelalte limbi eticheta in euro. */
export function bugetClient(buget: string, lang: LimbaEmail): string {
  return lang === 'ro' ? buget : etichetaOptiune(textConfiguratoare(lang).magazin.bugete, buget);
}

/** Pentru emailul intern si CRM: bugetul in lei, plus, in alte limbi, ce a vazut clientul (in euro). */
export function bugetIntern(buget: string, lang: LimbaEmail = 'ro'): string {
  return lang === 'ro' ? buget : `${buget} (${bugetClient(buget, lang)})`;
}

/* ── Email INTERN ── */

export function internSubject(d: MagazinOnlineData): string {
  return `${etichetaLimba(d.limba ?? 'ro')}[LEAD NOU] Magazin Online - ${d.nume}`;
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
      dataRow('Produse vandute', d.produseVandute) +
      dataRow('Are produse', d.areProduse) +
      (d.nrProduse ? dataRow('Numar produse', d.nrProduse) : '') +
      dataRow('Buget estimat', bugetIntern(d.buget, d.limba))
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

    ${metadataFooter(`Primit la: ${submittedAt} &nbsp;·&nbsp; Sursa: Configurator Magazine Online${sufixLimba(d.limba)}${d.ip ? ` &nbsp;·&nbsp; IP: ${esc(d.ip)}` : ''}`)}
  `;

  return buildEmail({
    content,
    previewText: 'Cerere noua pentru magazin online primita prin configurator.',
    headerTag: 'Cerere noua',
  });
}

/* ── Email CLIENT ── */

export function clientSubject(lang: LimbaEmail = 'ro'): string {
  return CONFIGURATOR[lang].subiect;
}

export function clientHtml(d: MagazinOnlineData, lang: LimbaEmail = 'ro'): string {
  const o = OFERTA[lang];
  const t = CONFIGURATOR[lang].magazin;
  const r = t.randuri;
  const p = textConfiguratoare(lang);
  // in romana, valorile din formular, ca pana acum; in celelalte limbi, etichetele de pe pagina
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
        ${dataRow(r.produse, d.produseVandute)}
        ${dataRow(r.areProduse, v(p.magazin.areProduse, d.areProduse))}
        ${d.nrProduse ? dataRow(r.nrProduse, v(p.magazin.nrProduse, d.nrProduse)) : ''}
        ${dataRow(r.buget, bugetClient(d.buget, lang))}
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
