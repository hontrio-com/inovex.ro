import {
  buildEmail, sectionHeading, dataRow, dataTable, blueBox,
  paragraph, heading, separator, primaryButton, metadataFooter,
  quickActionButtons, timeline, contactDirect, smallDisclaimer, esc,
} from '@/lib/email/layout';

export interface AutomatizariData {
  tipAfacere: string;
  proceseAutomatizare: string[];
  descriereAltceva?: string;
  numeComplet: string;
  email?: string;
  telefon: string;
  ip?: string;
}

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
  return `[LEAD NOU] Automatizari AI - ${d.numeComplet}`;
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

    ${metadataFooter(`Primit la: ${submittedAt} &nbsp;·&nbsp; Sursa: Configurator Automatizari AI${d.ip ? ` &nbsp;·&nbsp; IP: ${esc(d.ip)}` : ''}`)}
  `;

  return buildEmail({
    content,
    previewText: 'Cerere noua pentru automatizari AI primita prin configurator.',
    headerTag: 'Cerere noua',
  });
}

/* ── Email CLIENT ── */

export function clientSubject(): string {
  return 'Am primit cererea ta - te contactam in 24 de ore | Inovex';
}

export function clientHtml(d: AutomatizariData): string {
  const proceseList = d.proceseAutomatizare
    .map((p) => PROCES_LABEL[p] ?? p)
    .join(', ');

  const content = `
    ${heading(`Buna, ${d.numeComplet}!`)}

    ${paragraph('Am primit cererea ta pentru <strong>automatizari AI</strong> si ne-am apucat deja sa o analizam. Un specialist Inovex in automatizari te va contacta in maximum <strong>24 de ore</strong> pentru a discuta detaliile implementarii.')}

    <div style="margin:8px 40px 20px;padding:16px 20px;background-color:#F8FAFB;
                border:1px solid #E8ECF0;border-radius:8px;">
      <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;
                  color:#0D1117;margin-bottom:10px;">
        Rezumatul cererii tale
      </div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${dataRow('Tip afacere', AFACERE_LABEL[d.tipAfacere] ?? d.tipAfacere)}
        ${dataRow('Procese de automatizat', proceseList)}
        ${d.descriereAltceva ? dataRow('Descriere', d.descriereAltceva.slice(0, 120) + (d.descriereAltceva.length > 120 ? '...' : '')) : ''}
      </table>
    </div>

    ${sectionHeading('Ce urmeaza?')}
    <div style="padding:0 40px 8px;">
      ${timeline([
        { title: 'Analiza cerere', desc: 'Echipa noastra analizeaza procesele tale si identifica cele mai bune solutii de automatizare.' },
        { title: 'Te contactam', desc: 'Un specialist te suna sau iti trimite email in maximum 24 de ore.' },
        { title: 'Propunere detaliata', desc: 'Primesti o propunere completa cu solutiile recomandate si estimarea timpului de implementare.' },
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
    previewText: 'Multumim! Echipa Inovex analizeaza procesele tale acum.',
    headerTag: 'Confirmare',
  });
}
