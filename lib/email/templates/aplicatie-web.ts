import {
  buildEmail, sectionHeading, dataRow, dataTable, blueBox,
  paragraph, heading, separator, primaryButton, metadataFooter,
  quickActionButtons, timeline, contactDirect, smallDisclaimer, esc,
} from '@/lib/email/layout';
import { butonPortofoliu, CONFIGURATOR, etichetaLimba, OFERTA, sufixLimba, type LimbaEmail } from '@/lib/email/texte';
import { etichetaOptiune, textConfiguratoare } from '@/lib/i18n/pagini/configuratoare';

export interface AplicatieWebData {
  ideaClaritate: string;
  tipAplicatie: string;
  descriereIdeea?: string;
  numeComplet: string;
  email?: string;
  telefon: string;
  ip?: string;
  /** limba paginii (din 2026-11-07): confirmarea pleaca in limba clientului; internul ramane in romana */
  limba?: LimbaEmail;
  /** atasamentele (din 2026-11-07): numele si linkul din admin (deschis doar de cei logati) */
  atasamente?: { nume: string; link: string }[];
}

// etichetele din emailurile in romana (internul si confirmarea romaneasca), ca pana acum
const IDEE_LABEL: Record<string, string> = {
  'da-stiu-exact':        'Da, stiu exact ce vreau',
  'am-o-idee':            'Am o idee, dar nu este inca bine definita',
  'am-nevoie-de-ajutor':  'Nu, am nevoie de ajutor',
};

const TIP_LABEL: Record<string, string> = {
  'platforma-utilizatori': 'Platforma cu utilizatori',
  'marketplace':           'Marketplace',
  'aplicatie-servicii':    'Aplicatie de servicii',
  'sistem-intern':         'Sistem intern pentru business',
  'alt-tip':               'Alt tip',
};

/* ── Email INTERN ── */

export function internSubject(d: AplicatieWebData): string {
  return `${etichetaLimba(d.limba ?? 'ro')}[LEAD NOU] Aplicatie Web - ${d.numeComplet}`;
}

export function internHtml(d: AplicatieWebData): string {
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
      dataRow('Nume', d.numeComplet) +
      (d.email ? dataRow('Email', d.email) : '') +
      dataRow('Telefon', d.telefon)
    )}

    ${quickActionButtons(d.telefon, d.email ?? '')}

    ${sectionHeading('Detalii proiect')}
    ${dataTable(
      dataRow('Claritate idee', IDEE_LABEL[d.ideaClaritate] ?? d.ideaClaritate) +
      dataRow('Tip aplicatie', TIP_LABEL[d.tipAplicatie] ?? d.tipAplicatie)
    )}

    ${d.descriereIdeea ? `
      ${sectionHeading('Descriere idee')}
      ${blueBox(`
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;
                    color:#4A5568;line-height:1.75;font-style:italic;">
          ${esc(d.descriereIdeea)}
        </div>
      `)}
    ` : ''}

    ${d.atasamente?.length ? `${sectionHeading('Atasamente')}
      <div style="padding:0 40px 8px;">
        ${d.atasamente.map((a) => `
          <div style="padding:8px 0;border-bottom:1px solid #F0F0F0;font-family:Arial,Helvetica,sans-serif;font-size:14px;">
            <a href="${esc(a.link)}" style="color:#2B8FCC;font-weight:bold;text-decoration:none;">${esc(a.nume)}</a>
          </div>`).join('')}
        <div style="padding-top:8px;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#8A94A6;">
          Fisierele se deschid doar daca esti logat in admin.
        </div>
      </div>

    ` : ''}${separator()}

    <div style="text-align:center;padding:0 40px 28px;">
      ${primaryButton('https://inovex.ro/admin/bids', 'Deschide in admin', '#10B981')}
    </div>

    ${metadataFooter(`Primit la: ${submittedAt} &nbsp;·&nbsp; Sursa: Configurator Aplicatie Web${sufixLimba(d.limba)}${d.ip ? ` &nbsp;·&nbsp; IP: ${esc(d.ip)}` : ''}`)}
  `;

  return buildEmail({
    content,
    previewText: 'Cerere noua pentru aplicatie web / SaaS primita prin configurator.',
    headerTag: 'Cerere noua',
  });
}

/* ── Email CLIENT ── */

export function clientSubject(lang: LimbaEmail = 'ro'): string {
  return CONFIGURATOR[lang].subiect;
}

export function clientHtml(d: AplicatieWebData, lang: LimbaEmail = 'ro'): string {
  const o = OFERTA[lang];
  const t = CONFIGURATOR[lang].aplicatie;
  const r = t.randuri;
  const p = textConfiguratoare(lang).aplicatie;
  // in romana, etichetele de pana acum; in celelalte limbi, cele de pe pagina
  const idee = lang === 'ro' ? IDEE_LABEL[d.ideaClaritate] ?? d.ideaClaritate : etichetaOptiune(p.claritate, d.ideaClaritate);
  const tip = lang === 'ro' ? TIP_LABEL[d.tipAplicatie] ?? d.tipAplicatie : etichetaOptiune(p.tipuri, d.tipAplicatie);

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
        ${dataRow(r.claritate, idee)}
        ${dataRow(r.tip, tip)}
        ${d.descriereIdeea ? dataRow(r.descriere, d.descriereIdeea.slice(0, 120) + (d.descriereIdeea.length > 120 ? '...' : '')) : ''}${d.atasamente?.length ? dataRow(r.atasamente, d.atasamente.map((a) => a.nume).join(', ')) : ''}
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
