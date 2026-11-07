import {
  buildEmail, sectionHeading, dataRow, dataTable, blueBox,
  paragraph, heading, separator, primaryButton, metadataFooter,
  quickActionButtons, timeline, contactDirect, smallDisclaimer, esc,
} from '@/lib/email/layout';
import { butonPortofoliu, CONFIGURATOR, etichetaLimba, OFERTA, sufixLimba, type LimbaEmail } from '@/lib/email/texte';
import { etichetaOptiune, textConfiguratoare } from '@/lib/i18n/pagini/configuratoare';

export interface AutomatizariData {
  tipAfacere: string;
  proceseAutomatizare: string[];
  descriereAltceva?: string;
  numeComplet: string;
  email?: string;
  telefon: string;
  ip?: string;
  /** limba paginii (din 2026-11-07): confirmarea pleaca in limba clientului; internul ramane in romana */
  limba?: LimbaEmail;
}

// etichetele din emailurile in romana (internul si confirmarea romaneasca), ca pana acum
const AFACERE_LABEL: Record<string, string> = {
  'magazin-online':     'Magazin online',
  'prestari-servicii':  'Prestari servicii',
  'afacere-locala':     'Afacere locala',
  'alt-tip':            'Alt tip',
};

const PROCES_LABEL: Record<string, string> = {
  'comunicare-clienti':  'Comunicarea cu clientii',
  'confirmare-comenzi':  'Confirmarea comenzilor',
  'gestionare-date':     'Introducerea / gestionarea datelor',
  'taskuri-interne':     'Taskuri repetitive interne',
  'facturi-documente':   'Facturi / documente',
  'altceva':             'Altceva',
};

/* ── Email INTERN ── */

export function internSubject(d: AutomatizariData): string {
  return `${etichetaLimba(d.limba ?? 'ro')}[LEAD NOU] Automatizari AI - ${d.numeComplet}`;
}

export function internHtml(d: AutomatizariData): string {
  const submittedAt = new Date().toLocaleString('ro-RO', { timeZone: 'Europe/Bucharest' });
  const proceseList = d.proceseAutomatizare
    .map((p) => PROCES_LABEL[p] ?? p)
    .join(', ');

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
      dataRow('Nume', d.numeComplet) +
      (d.email ? dataRow('Email', d.email) : '') +
      dataRow('Telefon', d.telefon)
    )}

    ${quickActionButtons(d.telefon, d.email ?? '')}

    ${sectionHeading('Detalii proiect')}
    ${dataTable(
      dataRow('Tip afacere', AFACERE_LABEL[d.tipAfacere] ?? d.tipAfacere) +
      dataRow('Procese de automatizat', proceseList)
    )}

    ${d.descriereAltceva ? `
      ${sectionHeading('Descriere proces (Altceva)')}
      ${blueBox(`
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;
                    color:#4A5568;line-height:1.75;font-style:italic;">
          ${esc(d.descriereAltceva)}
        </div>
      `)}
    ` : ''}

    ${separator()}

    <div style="text-align:center;padding:0 40px 28px;">
      ${primaryButton('https://inovex.ro/admin/bids', 'Deschide in admin', '#10B981')}
    </div>

    ${metadataFooter(`Primit la: ${submittedAt} &nbsp;·&nbsp; Sursa: Configurator Automatizari AI${sufixLimba(d.limba)}${d.ip ? ` &nbsp;·&nbsp; IP: ${esc(d.ip)}` : ''}`)}
  `;

  return buildEmail({
    content,
    previewText: 'Cerere noua pentru automatizari AI primita prin configurator.',
    headerTag: 'Cerere noua',
  });
}

/* ── Email CLIENT ── */

export function clientSubject(lang: LimbaEmail = 'ro'): string {
  return CONFIGURATOR[lang].subiect;
}

export function clientHtml(d: AutomatizariData, lang: LimbaEmail = 'ro'): string {
  const o = OFERTA[lang];
  const t = CONFIGURATOR[lang].automatizari;
  const r = t.randuri;
  const p = textConfiguratoare(lang).automatizari;
  // in romana, etichetele de pana acum; in celelalte limbi, cele de pe pagina
  const afacere = lang === 'ro' ? AFACERE_LABEL[d.tipAfacere] ?? d.tipAfacere : etichetaOptiune(p.tipuri, d.tipAfacere);
  const proceseList = d.proceseAutomatizare
    .map((v) => (lang === 'ro' ? PROCES_LABEL[v] ?? v : etichetaOptiune(p.listaProcese, v)))
    .join(', ');

  const content = `
    ${heading(o.salut(d.numeComplet))}

    ${paragraph(t.primit)}

    <div style="margin:8px 40px 20px;padding:16px 20px;background-color:#F8FAFB;
                border:1px solid #E8ECF0;border-radius:8px;">
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;
                  color:#0D1117;margin-bottom:10px;">
        ${o.rezumat}
      </div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${dataRow(r.tip, afacere)}
        ${dataRow(r.procese, proceseList)}
        ${d.descriereAltceva ? dataRow(r.descriere, d.descriereAltceva.slice(0, 120) + (d.descriereAltceva.length > 120 ? '...' : '')) : ''}
      </table>
    </div>

    ${sectionHeading(o.urmeaza)}
    <div style="padding:0 40px 8px;">
      ${timeline(t.pasi)}
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
