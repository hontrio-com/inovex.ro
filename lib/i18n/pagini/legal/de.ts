import type { TextLegal } from './tipuri';

/* Paginile legale in germana (adresare formala, cu Sie): traducerea textului din ro.ts, care ramane
   versiunea care se aplica. Adresele interne raman cele romanesti; pagina le traduce la afisare. */

const COOKIE_GOOGLE = 'https://policies.google.com/privacy';
const COOKIE_TIKTOK = 'https://www.tiktok.com/legal/page/global/privacy-policy';
const COOKIE_LINKEDIN = 'https://www.linkedin.com/legal/cookie-policy';
const COOKIE_META = 'https://www.facebook.com/privacy/policies/cookies/';
const COOKIE_OPENAI = 'https://openai.com/policies/privacy-policy/';

export const de: TextLegal = {
  ui: {
    acasa: 'Startseite',
    navigare: 'Brotkrumennavigation',
    cuprins: 'Inhalt',
    sectiuni: '{n} Abschnitte',
    actualizat: 'Zuletzt aktualisiert',
    traducere:
      'Dies ist eine Übersetzung des rumänischen Originals. Bei Abweichungen ist die [rumänische Fassung](@ro) maßgeblich.',
    ancora: 'abschnitt',
    capTabel: ['Cookie-Name', 'Anbieter', 'Zweck', 'Speicherdauer', 'Typ'],
    telefon: 'Telefon',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  confidentialitate: {
    meta: {
      titlu: 'Datenschutzerklärung',
      descriere:
        'Datenschutzerklärung von Inovex (VOID SFT GAMES SRL, CUI RO43474393) gemäß DSGVO und rumänischem Recht. Erfahren Sie, wie wir Ihre Daten schützen.',
    },
    titlu: 'Datenschutzerklärung',
    intro:
      'Die Vertraulichkeit Ihrer Daten hat für Inovex Priorität. Dieses Dokument erläutert transparent, welche Daten wir erheben, warum wir dies tun und wie wir sie schützen – gemäß der europäischen Datenschutz-Grundverordnung (DSGVO).',
    actualizat: '7. November 2026',
    data: '2026-11-07',
    rezumat: {
      titlu: 'Zusammenfassung: die wichtigsten Punkte',
      randuri: [
        ['Verantwortlicher', 'VOID SFT GAMES SRL (Inovex)'],
        ['Wichtigste Rechtsgrundlagen', 'Vertrag, Einwilligung, berechtigtes Interesse'],
        ['Erhobene Daten', 'Name, E-Mail-Adresse, Telefonnummer, Angaben zum Projekt'],
        ['Hauptzweck', 'Erbringung der vertraglich vereinbarten Leistungen'],
        ['Speicherdauer', '2 Jahre (Formulare), 5–10 Jahre (Verträge)'],
        ['Internationale Datenübermittlungen', 'USA (z. B. Google, Vercel, Supabase, Meta, OpenAI), abgesichert durch Standardvertragsklauseln (SCC)'],
        ['Aufsichtsbehörde', 'Rumänische Datenschutzaufsichtsbehörde (ANSPDCP), [dataprotection.ro](https://www.dataprotection.ro)'],
        ['Datenschutzkontakt', '[contact@inovex.ro](mailto:contact@inovex.ro)'],
      ],
      nota: 'Ausführliche Informationen finden Sie in den folgenden Abschnitten.',
    },
    sectiuni: [
      {
        scurt: 'Wer wir sind und wie Sie uns erreichen',
        titlu: 'Name und Kontaktdaten des Verantwortlichen',
        continut: [
          {
            p: 'Verantwortlicher für die Verarbeitung personenbezogener Daten im Zusammenhang mit der Website inovex.ro und den damit verbundenen Leistungen ist:',
          },
          {
            ul: [
              '**Firma:** VOID SFT GAMES SRL',
              '**Handelsname:** Inovex',
              '**Steuer-ID (CUI):** RO43474393',
              '**Sitz:** Târgu Jiu, Kreis Gorj, Rumänien',
              '**E-Mail:** [contact@inovex.ro](mailto:contact@inovex.ro)',
              '**Telefon:** [+40 750 456 096](tel:+40750456096)',
              '**Website:** [https://inovex.ro](https://inovex.ro)',
            ],
          },
          {
            p: 'Unseren Datenschutzbeauftragten erreichen Sie per E-Mail an [contact@inovex.ro](mailto:contact@inovex.ro) mit dem Betreff „DSGVO – [Ihr Anliegen]“.',
          },
          {
            p: 'Wir beantworten jede Anfrage zu Ihren personenbezogenen Daten innerhalb von höchstens 30 (dreißig) Kalendertagen nach Eingang, gemäß Art. 12 DSGVO.',
          },
        ],
      },
      {
        scurt: 'Welche Daten wir erheben und woher',
        titlu: 'Kategorien der erhobenen personenbezogenen Daten',
        continut: [
          { p: 'Inovex erhebt personenbezogene Daten in folgenden Zusammenhängen:' },
          { h3: '2.1. Über die Formulare der Website erhobene Daten' },
          {
            p: 'Wenn Sie die Formulare für Kontaktanfragen, für die Angebotskonfiguration oder für die Anfrage von Leistungen ausfüllen, erheben wir:',
          },
          {
            ul: [
              'Vor- und Nachname (oder Firmenname)',
              'E-Mail-Adresse',
              'Telefonnummer',
              'Informationen über das gewünschte Projekt oder die gewünschte Leistung',
              'Angaben, die Sie in den Leistungskonfiguratoren machen (Branche, Art der Organisation, Projektspezifikationen), und Dateien, die Sie freiwillig anhängen (zum Beispiel ein Plan oder eine Skizze Ihrer App)',
            ],
          },
          {
            p: 'Diese Daten stellen Sie uns freiwillig zur Verfügung; sie sind erforderlich, damit wir Ihnen antworten und Ihnen die angefragten Leistungen anbieten können.',
          },
          { h3: '2.2. Über den Marketplace erhobene Daten' },
          { p: 'Beim Kauf eines Produkts im Inovex Marketplace erheben wir:' },
          {
            ul: [
              'Vor- und Nachname oder Firmenname',
              'E-Mail-Adresse, für den Versand der Bestätigung',
              'Rechnungsdaten (gemäß den steuerrechtlichen Pflichten)',
            ],
          },
          { h3: '2.3. Über den Bereich Învață gratuit (kostenlose Lernressourcen) erhobene Daten' },
          { p: 'Beim Herunterladen kostenloser Ressourcen (PDFs, Templates) erheben wir:' },
          { ul: ['Vorname', 'E-Mail-Adresse', 'Ihre durch Anklicken des Kontrollkästchens erteilte Einwilligung nach der DSGVO'] },
          { h3: '2.4. Bei der Nutzung der Website automatisch erhobene Daten' },
          { p: 'Bereits beim bloßen Aufruf der Website inovex.ro erheben unsere Systeme automatisch bestimmte technische Daten:' },
          {
            ul: [
              'IP-Adresse (durch Google Analytics 4 anonymisiert)',
              'Browsertyp und -version',
              'Betriebssystem',
              'Besuchte Seiten und Dauer des Besuchs',
              'Herkunftsquelle (wie Sie auf die Website gelangt sind)',
              'Verwendetes Gerät (Desktop, Mobilgerät, Tablet)',
              'Das Land, aus dem Sie die Website aufrufen (von unserem Hosting-Anbieter Vercel aus der IP-Adresse abgeleitet), und die Sprache Ihres Browsers, ausschließlich um Ihnen die Website in der passenden Sprache anzuzeigen; wir speichern sie nicht',
            ],
          },
          {
            p: 'Diese Daten werden über Cookies und Webanalyse-Tools (Google Analytics 4, Google Tag Manager) erhoben, die in unserer [Cookie-Richtlinie](/politica-cookies) ausführlich beschrieben sind.',
          },
          { h3: '2.5. Im Rahmen des Vertragsverhältnisses erhobene Daten' },
          { p: 'Bei Kunden, die Leistungen von Inovex in Auftrag geben, erheben wir zusätzlich:' },
          {
            ul: [
              'Identifikationsdaten der natürlichen oder juristischen Person',
              'Rechnungs- und Zahlungsdaten',
              'Zugangsdaten zu den Systemen des Kunden (Hosting, Domain usw.), die für die Erbringung der vertraglich vereinbarten Leistungen erforderlich sind',
              'E-Mail-Korrespondenz während der Projektlaufzeit',
            ],
          },
          { h3: '2.6. Daten, die wir nicht erheben' },
          {
            p: 'Inovex erhebt und verarbeitet keine besonderen Kategorien personenbezogener Daten im Sinne von Art. 9 DSGVO (Daten, aus denen die rassische oder ethnische Herkunft oder politische bzw. religiöse Überzeugungen hervorgehen, genetische und biometrische Daten, Gesundheitsdaten sowie Daten zum Sexualleben oder zur sexuellen Orientierung).',
          },
          {
            p: 'Wir erheben keine Daten von Minderjährigen unter 16 Jahren. Wenn Sie minderjährig sind, füllen Sie die Formulare auf der Website bitte nicht ohne die Zustimmung Ihrer Eltern aus.',
          },
        ],
      },
      {
        scurt: 'Warum wir Ihre Daten verarbeiten',
        titlu: 'Zwecke und Rechtsgrundlagen der Verarbeitung',
        continut: [
          { p: 'Wir verarbeiten Ihre personenbezogenen Daten auf den folgenden Rechtsgrundlagen nach Art. 6 DSGVO:' },
          { h3: '3.1. Vertragserfüllung oder vorvertragliche Maßnahmen (Art. 6 Abs. 1 lit. b DSGVO)' },
          { p: 'Wir verarbeiten Ihre Daten zu folgenden Zwecken:' },
          {
            ul: [
              'Beantwortung von Angebots- und Beratungsanfragen',
              'Unterzeichnung und Durchführung von Dienstleistungsverträgen',
              'Abrechnung der erbrachten Leistungen',
              'Kommunikation während der Projektlaufzeit',
              'Lieferung und Übergabe der fertiggestellten Projekte',
            ],
          },
          { h3: '3.2. Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO)' },
          {
            p: 'Mit Ihrer ausdrücklichen Einwilligung, die Sie durch Anklicken des DSGVO-Kontrollkästchens in den Formularen erteilen, verarbeiten wir Ihre Daten zu folgenden Zwecken:',
          },
          {
            ul: [
              'Herunterladen kostenloser Ressourcen aus dem Bereich Învață gratuit',
              'Zusendung von Informationen über die Leistungen von Inovex',
              'Messung der Website-Nutzung (Google Analytics 4) und unserer Werbekampagnen (Google Ads, Meta, TikTok, LinkedIn, ChatGPT Ads) mithilfe der in der [Cookie-Richtlinie](/politica-cookies) beschriebenen Analyse- und Marketing-Cookies',
            ],
          },
          {
            p: 'Sie können Ihre Einwilligung jederzeit kostenlos widerrufen, indem Sie eine E-Mail an [contact@inovex.ro](mailto:contact@inovex.ro) mit dem Betreff „Widerruf der Einwilligung“ senden. Der Widerruf der Einwilligung berührt nicht die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung.',
          },
          { h3: '3.3. Berechtigtes Interesse des Verantwortlichen (Art. 6 Abs. 1 lit. f DSGVO)' },
          { p: 'Auf Grundlage unseres berechtigten Interesses verarbeiten wir Daten zu folgenden Zwecken:' },
          {
            ul: [
              'Verbesserung unserer Leistungen und der Nutzererfahrung auf der Website',
              'Sicherheit der Website und Betrugsprävention',
              'Verteidigung unserer Rechte im Falle eines Rechtsstreits',
            ],
          },
          { h3: '3.4. Rechtliche Verpflichtung (Art. 6 Abs. 1 lit. c DSGVO)' },
          { p: 'Wir verarbeiten Daten zur Erfüllung rechtlicher Verpflichtungen, darunter:' },
          {
            ul: [
              'Ausstellung und Archivierung von Rechnungen gemäß dem rumänischen Steuergesetzbuch',
              'Erfüllung der Pflichten aus dem rumänischen Rechnungslegungsgesetz Nr. 82/1991',
              'Beantwortung von Anfragen der zuständigen Behörden',
            ],
          },
        ],
      },
      {
        scurt: 'An wen wir Ihre Daten weitergeben',
        titlu: 'Empfänger der personenbezogenen Daten',
        continut: [
          {
            p: 'Wir verkaufen Ihre personenbezogenen Daten nicht an Dritte und vermarkten sie auch nicht anderweitig. Folgende Empfänger können auf die Daten zugreifen oder sie verarbeiten:',
          },
          { h3: '4.1. Technische Dienstleister (Auftragsverarbeiter)' },
          {
            ul: [
              '**Vercel Inc.** (USA): Hosting-Infrastruktur der Website inovex.ro; abgesichert durch die in der DSGVO vorgesehenen Standardvertragsklauseln (SCC)',
              '**Supabase Inc.** (USA): Datenbank der Website (Nachrichten aus Formularen, Angebotsanfragen und Kundendaten) sowie Dateispeicher; abgesichert durch SCC',
              '**Stripe Payments Europe Ltd.** (Irland): Abwicklung von Online-Kartenzahlungen (z. B. Bestellungen für Video Motion Design); Inovex erhält und speichert keine Kartendaten; die Daten können an Stripe, Inc. (USA) übermittelt werden, wobei die Übermittlung durch SCC abgesichert ist',
              '**Google LLC** (USA): Google Analytics 4 (anonymisierte Daten), Google Tag Manager, Google Ads; abgesichert durch SCC',
              '**Meta Platforms Ireland Limited** (Irland): Meta Pixel zur Messung von Facebook- und Instagram-Ads-Kampagnen; die Daten können an Meta Platforms, Inc. (USA) übermittelt werden, wobei die Übermittlung durch SCC abgesichert ist',
              '**TikTok** (TikTok Pixel): Messung von TikTok-Ads-Kampagnen; die Daten können in Länder außerhalb des Europäischen Wirtschaftsraums übermittelt werden, wobei die Übermittlung durch SCC abgesichert ist',
              '**LinkedIn Ireland Unlimited Company** (Irland): LinkedIn Insight Tag zur Messung von LinkedIn-Ads-Kampagnen; die Daten können an die LinkedIn Corporation (USA) übermittelt werden, wobei die Übermittlung durch SCC abgesichert ist',
              '**OpenAI** (ChatGPT-Ads-Pixel): Messung unserer Werbekampagnen in ChatGPT; die Daten können in die USA übermittelt werden, wobei die Übermittlung durch SCC abgesichert ist',
              'Der cPanel-Hosting-Anbieter für das E-Mail-Postfach contact@inovex.ro, über den wir auch die automatischen Bestätigungs-E-Mails versenden (Server mit Standort in Europa)',
            ],
          },
          { h3: '4.2. Behörden' },
          {
            p: 'Daten können öffentlichen Stellen – etwa der rumänischen Steuerbehörde (ANAF), Gerichten oder Strafverfolgungsbehörden – ausschließlich aufgrund gesetzlicher Verpflichtungen oder gerichtlicher Entscheidungen offengelegt werden.',
          },
          { h3: '4.3. Geschäftspartner' },
          {
            p: 'Ohne Ihre ausdrückliche Einwilligung geben wir Ihre Daten nicht zu Marketingzwecken an Geschäftspartner oder sonstige Dritte weiter.',
          },
          { h3: '4.4. Internationale Datenübermittlungen' },
          {
            p: 'Einige Dienstleister haben ihren Sitz in den Vereinigten Staaten von Amerika. Datenübermittlungen erfolgen unter geeigneten Garantien gemäß Kapitel V DSGVO (von der Europäischen Kommission erlassene Standardvertragsklauseln).',
          },
        ],
      },
      {
        scurt: 'Wie lange wir Ihre Daten speichern',
        titlu: 'Dauer der Verarbeitung und Kriterien für die Festlegung der Speicherdauer',
        continut: [
          { h3: '5.1. Daten aus Formularen (Angebot, Kontakt, Konfiguratoren)' },
          {
            p: 'Daten aus den Formularen auf der Website werden – sofern kein Vertrag geschlossen wurde – für 2 (zwei) Jahre ab dem Zeitpunkt der Erhebung oder bis zum Widerruf der Einwilligung gespeichert.',
          },
          { h3: '5.2. Daten aus dem Vertragsverhältnis' },
          {
            p: 'Daten von Kunden, die Leistungen in Auftrag gegeben haben, werden entsprechend den Verjährungsfristen nach rumänischem Zivilrecht für 5 (fünf) Jahre nach Beendigung des Vertrags gespeichert; Buchhaltungsunterlagen werden gemäß dem rumänischen Rechnungslegungsgesetz Nr. 82/1991 für 10 (zehn) Jahre aufbewahrt.',
          },
          { h3: '5.3. Daten aus dem Bereich Învață gratuit (Leads)' },
          {
            p: 'Die beim Herunterladen kostenloser Ressourcen erhobenen E-Mail-Adressen werden für 2 (zwei) Jahre oder bis zum Widerruf der Einwilligung gespeichert.',
          },
          { h3: '5.4. Technische Daten (Protokolldateien, IP-Adressen)' },
          {
            p: 'Automatisch erhobene technische Daten werden gemäß den Einstellungen von Google Analytics 4 spätestens nach 14 (vierzehn) Monaten anonymisiert oder gelöscht.',
          },
          { h3: '5.5. Zugangsdaten zu Systemen' },
          {
            p: 'Zugangsdaten zu den Systemen der Kunden (Passwörter, Anmeldedaten) werden unmittelbar nach der Projektübergabe gelöscht, entsprechend der in unseren [Allgemeinen Geschäftsbedingungen](/termeni-si-conditii) beschriebenen Praxis.',
          },
        ],
      },
      {
        scurt: 'Ihre Rechte nach der DSGVO',
        titlu: 'Rechte der betroffenen Person',
        continut: [
          { p: 'Als betroffene Person stehen Ihnen folgende durch die Verordnung (EU) 2016/679 garantierte Rechte zu:' },
          { h3: '6.1. Auskunftsrecht (Art. 15 DSGVO)' },
          {
            p: 'Sie haben das Recht, eine Bestätigung darüber zu verlangen, ob wir Sie betreffende personenbezogene Daten verarbeiten; ist dies der Fall, haben Sie ein Recht auf Auskunft über diese Daten und auf Informationen über deren Verarbeitung.',
          },
          { h3: '6.2. Recht auf Berichtigung (Art. 16 DSGVO)' },
          {
            p: 'Sie haben das Recht, die Berichtigung Sie betreffender unrichtiger Daten oder die Vervollständigung unvollständiger Daten zu verlangen.',
          },
          { h3: '6.3. Recht auf Löschung („Recht auf Vergessenwerden“) (Art. 17 DSGVO)' },
          {
            p: 'Sie haben das Recht, die Löschung Sie betreffender Daten zu verlangen, wenn diese für den Zweck, für den sie erhoben wurden, nicht mehr erforderlich sind, wenn Sie Ihre Einwilligung widerrufen haben oder wenn die Daten unrechtmäßig verarbeitet wurden. Dieses Recht besteht nicht, soweit die Verarbeitung zur Erfüllung einer rechtlichen Verpflichtung oder zur Verteidigung von Rechtsansprüchen vor Gericht erforderlich ist.',
          },
          { h3: '6.4. Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)' },
          {
            p: 'Sie haben das Recht, unter bestimmten in der DSGVO vorgesehenen Voraussetzungen die Einschränkung der Verarbeitung Ihrer Daten zu verlangen (Bestreiten der Richtigkeit der Daten, unrechtmäßige Verarbeitung usw.).',
          },
          { h3: '6.5. Recht auf Datenübertragbarkeit (Art. 20 DSGVO)' },
          {
            p: 'Sie haben das Recht, die Sie betreffenden Daten, die Sie uns bereitgestellt haben, in einem strukturierten, gängigen und maschinenlesbaren Format (JSON, CSV usw.) zu erhalten und diese Daten einem anderen Verantwortlichen zu übermitteln.',
          },
          { h3: '6.6. Widerspruchsrecht (Art. 21 DSGVO)' },
          {
            p: 'Sie haben das Recht, der Verarbeitung Ihrer Daten, die auf Grundlage des berechtigten Interesses des Verantwortlichen erfolgt, zu widersprechen. Inovex stellt die Verarbeitung in diesem Fall ein, es sei denn, Inovex weist zwingende schutzwürdige Gründe nach, die die Verarbeitung rechtfertigen.',
          },
          { h3: '6.7. Automatisierte Entscheidungen im Einzelfall einschließlich Profiling (Art. 22 DSGVO)' },
          {
            p: 'Inovex setzt keine Systeme zur automatisierten Entscheidungsfindung oder zum Profiling ein, die Ihnen gegenüber rechtliche Wirkung entfalten oder Sie in erheblicher Weise beeinträchtigen.',
          },
          { h3: '6.8. Wie Sie Ihre Rechte ausüben' },
          {
            p: 'Um eines der oben genannten Rechte auszuüben, senden Sie bitte eine schriftliche Anfrage an [contact@inovex.ro](mailto:contact@inovex.ro) mit dem Betreff „DSGVO-Rechte – [Art der Anfrage]“.',
          },
          {
            p: 'Wir antworten innerhalb von höchstens 30 Kalendertagen. Ist die Anfrage komplex oder liegt uns eine große Zahl von Anfragen vor, können wir die Frist um weitere 60 Tage verlängern; hierüber informieren wir Sie innerhalb der ersten 30 Tage.',
          },
          {
            p: 'Die Ausübung Ihrer Rechte ist unentgeltlich. Bei offenkundig unbegründeten oder exzessiven Anfragen können wir ein angemessenes Verwaltungsentgelt verlangen oder uns weigern, ihnen nachzukommen.',
          },
          { h3: '6.9. Beschwerderecht bei einer Aufsichtsbehörde' },
          {
            p: 'Sie haben das Recht, bei der rumänischen Datenschutzaufsichtsbehörde (ANSPDCP) Beschwerde einzulegen. Wenn Sie in einem anderen EU-/EWR-Staat wohnen oder arbeiten, können Sie sich auch an die dortige Datenschutzaufsichtsbehörde wenden (Art. 77 DSGVO).',
          },
          {
            caseta: [
              '**ANSPDCP**',
              'B-dul G-ral. Gheorghe Magheru nr. 28-30, Sektor 1, Bukarest',
              'E-Mail: [anspdcp@dataprotection.ro](mailto:anspdcp@dataprotection.ro)',
              'Telefon: +40 31 805 9211',
              'Website: [www.dataprotection.ro](https://www.dataprotection.ro)',
            ],
          },
        ],
      },
      {
        scurt: 'Cookies und ähnliche Technologien',
        titlu: 'Cookies und Tracking-Technologien',
        continut: [
          {
            p: 'Die Website inovex.ro verwendet Cookies und ähnliche Technologien, um die ordnungsgemäße Funktion der Website sicherzustellen und den Datenverkehr zu analysieren.',
          },
          { h3: '7.1. Was sind Cookies?' },
          {
            p: 'Cookies sind kleine Textdateien, die beim Aufruf einer Website auf Ihrem Gerät gespeichert werden. Diese Dateien ermöglichen es der Website, Ihre Präferenzen zu speichern und zu analysieren, wie Sie die Website nutzen.',
          },
          { h3: '7.2. Arten der verwendeten Cookies' },
          {
            ol: [
              '**Unbedingt erforderliche Cookies:** Diese Cookies sind für die grundlegenden Funktionen der Website notwendig (Sitzung, CSRF-Schutz) und können nicht deaktiviert werden.',
              '**Analyse-Cookies:** Wir verwenden Google Analytics 4 zur anonymisierten Analyse des Datenverkehrs. IP-Adressen werden anonymisiert. Sie können diese Cookies über das Cookie-Banner deaktivieren.',
              '**Marketing-Cookies:** Wir verwenden Google Ads, Meta Pixel, TikTok Pixel, LinkedIn Insight Tag und das ChatGPT-Ads-Pixel (OpenAI), um die Wirksamkeit unserer Werbekampagnen zu messen. Sie können diese Cookies über das Cookie-Banner deaktivieren.',
            ],
          },
          { h3: '7.3. Verwaltung von Cookies' },
          {
            p: 'Beim ersten Aufruf der Website werden Sie über ein Einwilligungsbanner über die Verwendung von Cookies informiert. Sie können alle Cookies akzeptieren, sie einzeln konfigurieren oder alle nicht notwendigen Cookies ablehnen.',
          },
          {
            p: 'Sie können Cookies auch direkt in den Einstellungen Ihres Browsers verwalten. Die Deaktivierung von Cookies kann die Funktion einzelner Seiten der Website beeinträchtigen.',
          },
          { p: 'Ausführliche Informationen zu jedem verwendeten Cookie finden Sie in unserer [Cookie-Richtlinie](/politica-cookies).' },
        ],
      },
      {
        scurt: 'Datensicherheit',
        titlu: 'Umgesetzte Sicherheitsmaßnahmen',
        continut: [
          {
            p: 'Inovex setzt geeignete technische und organisatorische Maßnahmen um, um personenbezogene Daten vor unbefugtem Zugriff, Veränderung, Offenlegung oder Vernichtung zu schützen:',
          },
          {
            ol: [
              'Die gesamte Kommunikation zwischen dem Browser und unseren Servern wird über das HTTPS-Protokoll mit einem gültigen SSL/TLS-Zertifikat verschlüsselt',
              'Der Zugriff auf die Datenbank und den Administrationsbereich ist beschränkt und durch eine Authentifizierung mit starkem Passwort geschützt',
              'Passwörter von Nutzern werden ausschließlich verschlüsselt (Hash + Salt) gespeichert, niemals im Klartext',
              'Die Server werden bei Anbietern mit anerkannten Sicherheitszertifizierungen gehostet (Vercel, das auf der Infrastruktur von AWS betrieben wird)',
              'Sicherungskopien der Datenbank werden automatisch erstellt und an getrennten Standorten gespeichert',
              'Der interne Zugriff auf personenbezogene Daten ist auf das Personal beschränkt, das diese Daten für die Erbringung der Leistungen benötigt',
            ],
          },
          { h3: '8.1. Meldung und Benachrichtigung bei Sicherheitsvorfällen' },
          {
            p: 'Im Falle eines Sicherheitsvorfalls, der personenbezogene Daten betrifft und ein Risiko für die Rechte und Freiheiten der betroffenen Personen darstellt, meldet Inovex den Vorfall gemäß Art. 33 DSGVO der ANSPDCP, und zwar binnen höchstens 72 Stunden, nachdem Inovex davon Kenntnis erlangt hat.',
          },
          {
            p: 'Stellt der Vorfall ein hohes Risiko für die Rechte und Freiheiten der betroffenen Personen dar, werden diese gemäß Art. 34 DSGVO unverzüglich benachrichtigt.',
          },
        ],
      },
      {
        scurt: 'Daten von Minderjährigen',
        titlu: 'Schutz der Daten von Minderjährigen',
        continut: [
          {
            p: 'Die Website inovex.ro und die Leistungen von Inovex richten sich nicht an Personen unter 16 (sechzehn) Jahren. Wir erheben nicht wissentlich personenbezogene Daten von Minderjährigen.',
          },
          {
            p: 'Wenn Sie ein Elternteil oder gesetzlicher Vertreter sind und feststellen, dass ein Minderjähriger, für den Sie verantwortlich sind, ohne Ihre Einwilligung personenbezogene Daten auf unserer Website angegeben hat, kontaktieren Sie uns bitte unter [contact@inovex.ro](mailto:contact@inovex.ro). Wir werden diese Daten so schnell wie möglich löschen.',
          },
        ],
      },
      {
        scurt: 'Links zu Websites Dritter',
        titlu: 'Websites Dritter und Verantwortlichkeit',
        continut: [
          {
            p: 'Die Website inovex.ro kann Links zu Websites enthalten, die von Dritten betrieben werden (Partner, Kunden, externe Ressourcen). Inovex ist für die Datenschutzpraktiken dieser Websites nicht verantwortlich und hat keinen Einfluss darauf, wie diese Ihre personenbezogenen Daten erheben oder verwenden.',
          },
          {
            p: 'Wir empfehlen Ihnen, die Datenschutzerklärung jeder Website Dritter zu lesen, die Sie über Links auf unserer Website besuchen.',
          },
        ],
      },
      {
        scurt: 'Änderungen dieser Erklärung',
        titlu: 'Aktualisierung dieses Dokuments',
        continut: [
          {
            p: 'Inovex kann diese Datenschutzerklärung von Zeit zu Zeit aktualisieren, um Gesetzesänderungen, Änderungen unserer Verarbeitungspraktiken oder sonstigen betrieblichen Gründen Rechnung zu tragen.',
          },
          {
            p: 'Das Datum der letzten Änderung ist am Anfang des Dokuments angegeben. Die weitere Nutzung der Website oder unserer Leistungen nach Veröffentlichung einer aktualisierten Fassung gilt als Annahme der neuen Bestimmungen.',
          },
          {
            p: 'Bei wesentlichen Änderungen, die Ihre Rechte berühren, werden wir uns in angemessener Weise bemühen, Sie per E-Mail (sofern Sie uns Ihre Adresse mitgeteilt haben) oder durch ein gut sichtbares Banner auf der Website zu informieren.',
          },
        ],
      },
      {
        scurt: 'Kontakt und Ausübung Ihrer Rechte',
        titlu: 'Kontakt bei Datenschutzanliegen',
        continut: [
          {
            p: 'Bei Fragen, Anliegen oder Beschwerden im Zusammenhang mit der Verarbeitung Ihrer personenbezogenen Daten können Sie uns wie folgt kontaktieren:',
          },
          { contact: { titlu: 'Kontakt in Datenschutzfragen', subiect: 'DSGVO - Meine Anfrage', buton: 'Datenschutzanfrage senden' } },
          {
            p: 'Antwortfrist: höchstens 30 (dreißig) Kalendertage ab Eingang Ihrer Anfrage, gemäß Art. 12 Abs. 3 DSGVO.',
          },
          {
            p: 'Wenn Sie mit unserer Antwort nicht zufrieden sind oder der Ansicht sind, dass Ihre Daten unrechtmäßig verarbeitet werden, haben Sie das Recht, bei der ANSPDCP ([www.dataprotection.ro](https://www.dataprotection.ro)) Beschwerde einzulegen oder sich an die zuständigen Gerichte zu wenden.',
          },
          {
            p: 'Diese Datenschutzerklärung wurde in Übereinstimmung mit der Verordnung (EU) 2016/679 (DSGVO) und den anwendbaren rumänischen Rechtsvorschriften in der am 7. November 2026 geltenden Fassung erstellt.',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  cookies: {
    meta: {
      titlu: 'Cookie-Richtlinie',
      descriere:
        'Informationen zu den auf inovex.ro verwendeten Cookies und dazu, wie Sie Ihre Einstellungen verwalten: notwendige, Analyse- und Marketing-Cookies.',
    },
    titlu: 'Cookie-Richtlinie',
    intro:
      'Auf dieser Seite erfahren Sie genau, welche Cookies wir verwenden, warum wir dies tun und wie Sie sie steuern können. Sie können Ihre Einstellungen jederzeit über das Cookie-Banner oder in den Einstellungen Ihres Browsers ändern.',
    actualizat: '7. November 2026',
    data: '2026-11-07',
    sectiuni: [
      {
        scurt: 'Was sind Cookies?',
        titlu: 'Was sind Cookies?',
        continut: [
          {
            p: 'Cookies sind kleine Textdateien, die eine Website bei Ihrem Besuch auf Ihrem Gerät (Computer, Smartphone, Tablet) speichert. Cookies ermöglichen es der Website, sich Ihre Aktionen und Präferenzen für einen bestimmten Zeitraum zu merken, sodass Sie diese nicht bei jedem Besuch oder beim Wechsel von einer Seite zur anderen erneut eingeben müssen.',
          },
          {
            p: 'Cookies sind keine Programme und können weder Code ausführen noch Viren übertragen oder auf Informationen auf Ihrer Festplatte zugreifen. Diese Dateien enthalten ausschließlich Daten, die Sie selbst angegeben haben oder die bei der Nutzung der Website erhoben wurden.',
          },
          {
            p: 'Neben Cookies im eigentlichen Sinne verwenden wir auch ähnliche Technologien (Local Storage, Session Storage, Tracking-Pixel, Web Beacons), die auf vergleichbare Weise funktionieren. Der Begriff „Cookies“ umfasst in diesem Dokument alle diese Technologien.',
          },
        ],
      },
      {
        scurt: 'Warum wir Cookies verwenden',
        titlu: 'Warum wir Cookies verwenden',
        continut: [
          { p: 'Wir verwenden Cookies und ähnliche Technologien zu folgenden Zwecken:' },
          {
            ol: [
              'Sicherstellung der ordnungsgemäßen Funktion der Website inovex.ro (notwendige Cookies)',
              'Analyse, wie Besucher unsere Website nutzen, um sie kontinuierlich zu verbessern (Analyse-Cookies)',
              'Messung der Wirksamkeit unserer Werbekampagnen auf Google Ads, Meta (Facebook und Instagram), TikTok Ads, LinkedIn Ads und ChatGPT Ads (Marketing-Cookies)',
              'Speicherung Ihrer Cookie-Einstellungen für spätere Besuche',
            ],
          },
          {
            p: 'Wir verwenden Cookies weder, um Daten an Dritte zu verkaufen, noch, um Verhaltensprofile zu anderen als den genannten Zwecken zu erstellen.',
          },
        ],
      },
      {
        scurt: 'Arten der verwendeten Cookies',
        titlu: 'Auf inovex.ro verwendete Cookie-Arten',
        continut: [
          { p: 'Cookies werden nach ihrem Zweck eingeteilt:' },
          { h3: '3.1. Unbedingt erforderliche (notwendige) Cookies' },
          {
            p: 'Diese Cookies sind für den Betrieb der Website unverzichtbar und können nicht deaktiviert werden. Ohne sie kann die Website nicht ordnungsgemäß funktionieren. Gemäß Art. 5 Abs. 3 der ePrivacy-Richtlinie, die in Rumänien durch das Gesetz Nr. 506/2004 umgesetzt wurde, ist für sie keine Einwilligung erforderlich.',
          },
          { p: 'Diese Cookies speichern keine Informationen, anhand derer Sie persönlich identifiziert werden können.' },
          { h3: '3.2. Analyse-Cookies (Statistik)' },
          {
            p: 'Diese Cookies helfen uns zu verstehen, wie Besucher mit der Website interagieren (welche Seiten sie aufrufen, wie lange sie verweilen, woher sie kommen). Alle Daten werden anonymisiert oder pseudonymisiert und können nicht zur direkten Identifizierung von Personen verwendet werden.',
          },
          { p: 'Für diese Cookies ist Ihre Einwilligung erforderlich. Sie können sie ablehnen, ohne dass dies die Funktion der Website beeinträchtigt.' },
          { h3: '3.3. Marketing-Cookies (Werbung)' },
          {
            p: 'Diese Cookies dienen dazu, die Wirksamkeit unserer Werbekampagnen auf Google Ads, Meta (Facebook und Instagram), TikTok Ads, LinkedIn Ads und ChatGPT Ads zu messen. Damit können die Werbeplattformen erkennen, ob Sie unsere Website besucht haben, nachdem Sie eine unserer Anzeigen gesehen haben.',
          },
          {
            p: 'Auf unserer Website wird keine personalisierte Werbung angezeigt. Diese Cookies werden ausschließlich dazu verwendet, Conversions unseren bezahlten Kampagnen zuzuordnen.',
          },
          { p: 'Für diese Cookies ist Ihre Einwilligung erforderlich. Sie können sie ablehnen, ohne dass dies die Funktion der Website beeinträchtigt.' },
          { h3: '3.4. Präferenz-Cookies' },
          {
            p: 'Diese Cookies speichern Ihre Auswahl (einschließlich Ihrer Cookie-Einstellungen), damit Sie diese nicht bei jedem Besuch erneut vornehmen müssen.',
          },
        ],
      },
      {
        scurt: 'Vollständige Cookie-Liste',
        titlu: 'Detaillierte Liste der verwendeten Cookies',
        continut: [
          { p: 'Nachfolgend finden Sie alle Cookies und ähnlichen Technologien, die wir verwenden, nach Kategorien geordnet.' },
          {
            setari: {
              titlu: 'Ihre Einstellungen verwalten',
              text: 'Sie können jederzeit ändern, welche Cookies Sie akzeptieren: Das Cookie-Banner wird erneut geöffnet, und Sie können Ihre Auswahl neu treffen.',
              buton: 'Cookie-Einstellungen öffnen',
            },
          },
          {
            cookies: [
              {
                nume: 'Notwendige Cookies',
                descriere: 'Für die grundlegenden Funktionen der Website notwendig. Keine Einwilligung erforderlich.',
                cookies: [
                  ['__Host-next-auth.csrf-token', 'inovex.ro', 'https://inovex.ro', 'CSRF-Schutz für Formulare', 'Sitzung', 'HTTP'],
                  ['__Secure-next-auth.session-token', 'inovex.ro', 'https://inovex.ro', 'Aufrechterhaltung der angemeldeten Sitzung', '30 Tage', 'HTTP'],
                  ['cookie_consent', 'inovex.ro', 'https://inovex.ro', 'Speichert Ihre Cookie-Einstellungen', '12 Monate', 'localStorage'],
                  ['inovex_limba', 'inovex.ro', 'https://inovex.ro', 'Speichert die Sprache der Website: die von Ihnen gewählte oder die beim ersten Besuch automatisch passende, anhand Ihres Landes (aus der IP-Adresse abgeleitet, die wir nicht speichern) und der Sprache Ihres Browsers', '12 Monate', 'HTTP'],
                ],
              },
              {
                nume: 'Analyse-Cookies',
                descriere: 'Google Analytics 4: anonymisierte Analyse des Datenverkehrs. Einwilligung erforderlich.',
                cookies: [
                  ['_ga', 'google.com', COOKIE_GOOGLE, 'Identifiziert eindeutige Nutzersitzungen (anonymisiert)', '13 Monate', 'HTTP'],
                  ['_ga_*', 'google.com', COOKIE_GOOGLE, 'Speichert den Sitzungsstatus von GA4', '13 Monate', 'HTTP'],
                  ['_gid', 'google.com', COOKIE_GOOGLE, 'Unterscheidet Nutzer (Daten werden nach 24 Stunden gelöscht)', '24 Stunden', 'HTTP'],
                ],
              },
              {
                nume: 'Marketing-Cookies',
                descriere: 'Google Ads, Meta Pixel, TikTok Pixel, LinkedIn Insight Tag und ChatGPT-Ads-Pixel (OpenAI): Messung von Conversions aus Kampagnen. Einwilligung erforderlich.',
                cookies: [
                  ['_gcl_au', 'google.com', COOKIE_GOOGLE, 'Google Ads: speichert Conversion-Experimente', '90 Tage', 'HTTP'],
                  ['IDE', 'doubleclick.net', COOKIE_GOOGLE, 'Google Ads: Remarketing und Conversion-Messung', '13 Monate', 'HTTP'],
                  ['_fbp', 'facebook.com', COOKIE_META, 'Meta Pixel: Identifizierung des Browsers zur Messung von Facebook- und Instagram-Kampagnen', '90 Tage', 'HTTP'],
                  ['_fbc', 'facebook.com', COOKIE_META, 'Meta Pixel: speichert die Klick-ID, wenn Sie über eine Meta-Anzeige auf die Website kommen', '90 Tage', 'HTTP'],
                  ['fr', 'facebook.com', COOKIE_META, 'Meta: Auslieferung und Messung von Anzeigen', '90 Tage', 'HTTP'],
                  ['_ttp', 'tiktok.com', COOKIE_TIKTOK, 'TikTok Pixel: Messung von Conversions aus TikTok-Kampagnen', '13 Monate', 'HTTP'],
                  ['tt_webid_v2', 'tiktok.com', COOKIE_TIKTOK, 'TikTok Pixel: Identifizierung des Besuchers zur Zuordnung von Conversions', '1 Jahr', 'HTTP'],
                  ['li_sugr', 'linkedin.com', COOKIE_LINKEDIN, 'LinkedIn Insight Tag: Identifizierung des Browsers zur Messung von LinkedIn-Kampagnen', '3 Monate', 'HTTP'],
                  ['bcookie', 'linkedin.com', COOKIE_LINKEDIN, 'LinkedIn: Browser-Kennung', '1 Jahr', 'HTTP'],
                  ['lidc', 'linkedin.com', COOKIE_LINKEDIN, 'LinkedIn: Auswahl des Rechenzentrums, das die Anfragen bearbeitet', '24 Stunden', 'HTTP'],
                  ['UserMatchHistory', 'linkedin.com', COOKIE_LINKEDIN, 'LinkedIn Ads: Synchronisierung der Werbe-Kennung', '30 Tage', 'HTTP'],
                  ['AnalyticsSyncHistory', 'linkedin.com', COOKIE_LINKEDIN, 'LinkedIn: Zeitpunkt der letzten Synchronisierung der Messdaten', '30 Tage', 'HTTP'],
                  ['li_fat_id', 'linkedin.com', COOKIE_LINKEDIN, 'LinkedIn Ads: Zuordnung von Conversions aus LinkedIn-Kampagnen', '30 Tage', 'HTTP'],
                  ['__oppref', 'openai.com', COOKIE_OPENAI, 'ChatGPT Ads: speichert die Referenz eines Klicks auf eine Anzeige in ChatGPT zur Zuordnung von Conversions', '30 Tage', 'HTTP'],
                  ['__obref', 'openai.com', COOKIE_OPENAI, 'ChatGPT Ads: Browser-Kennung zur Messung von Kampagnen', '1 Jahr', 'HTTP'],
                  ['__oaiq_consent', 'openai.com', COOKIE_OPENAI, 'ChatGPT Ads: speichert Ihre Einwilligungsentscheidung für das Pixel', '30 Tage', 'HTTP'],
                ],
              },
              {
                nume: 'Google Tag Manager',
                descriere: 'Verwaltung der Tracking-Tags.',
                cookies: [['_gtm_*', 'googletagmanager.com', COOKIE_GOOGLE, 'Google Tag Manager: Verwaltung der Tags', 'Sitzung', 'HTTP']],
              },
            ],
          },
        ],
      },
      {
        scurt: 'Ihre Einwilligung und Kontrolle',
        titlu: 'Einwilligung und Kontrolle über Ihre Einstellungen',
        continut: [
          { h3: '5.1. Das Cookie-Banner' },
          {
            p: 'Bei Ihrem ersten Besuch auf der Website inovex.ro zeigen wir Ihnen ein Banner an, über das Sie auswählen können, welche Cookies Sie akzeptieren. Sie haben drei Möglichkeiten:',
          },
          {
            ol: [
              '**„Alle akzeptieren“:** Sie akzeptieren alle Cookie-Kategorien',
              '**„Alle ablehnen“:** Sie akzeptieren nur die unbedingt erforderlichen Cookies',
              '**„Anpassen“:** Sie wählen jede Kategorie einzeln aus',
            ],
          },
          {
            p: 'Ihre Auswahl wird 12 Monate lang gespeichert. Sie können Ihre Einstellungen jederzeit über die Schaltfläche „Cookie-Einstellungen“ in der Fußzeile der Website ändern.',
          },
          { h3: '5.2. Widerruf der Einwilligung' },
          { p: 'Sie können Ihre Einwilligung jederzeit widerrufen oder ändern:' },
          {
            ul: [
              'Über die Schaltfläche „Cookie-Einstellungen“ in der Fußzeile der Website',
              'In den Einstellungen Ihres Browsers (Anleitung siehe unten)',
              'Per E-Mail an [contact@inovex.ro](mailto:contact@inovex.ro)',
            ],
          },
          {
            p: 'Der Widerruf der Einwilligung berührt nicht die Rechtmäßigkeit der aufgrund der Einwilligung bis zum Widerruf erfolgten Verarbeitung.',
          },
          { h3: '5.3. Kontrolle über die Browsereinstellungen' },
          { p: 'Sie können Cookies direkt in Ihrem Browser verwalten oder deaktivieren:' },
          {
            ul: [
              '**Google Chrome:** Einstellungen › Datenschutz und Sicherheit › Cookies',
              '**Mozilla Firefox:** Einstellungen › Datenschutz & Sicherheit › Cookies und Website-Daten',
              '**Safari:** Einstellungen › Datenschutz › Cookies',
              '**Microsoft Edge:** Einstellungen › Cookies und Websiteberechtigungen',
            ],
          },
          { p: 'Bitte beachten Sie, dass die Deaktivierung notwendiger Cookies die Funktion der Website beeinträchtigen kann.' },
          { h3: '5.4. Deaktivierung auf den einzelnen Plattformen' },
          {
            ul: [
              '**Google Analytics:** [tools.google.com/dlpage/gaoptout](https://tools.google.com/dlpage/gaoptout)',
              '**Google Ads:** [adssettings.google.com](https://adssettings.google.com)',
              '**TikTok:** [tiktok.com/legal/page/global/privacy-policy](https://www.tiktok.com/legal/page/global/privacy-policy)',
            ],
          },
        ],
      },
      {
        scurt: 'Datenübermittlungen',
        titlu: 'Internationale Datenübermittlungen durch Cookies',
        continut: [
          {
            p: 'Einige Cookies werden von Anbietern mit Sitz in den Vereinigten Staaten von Amerika gesetzt (Google LLC, TikTok Inc., OpenAI) oder von Anbietern, die Daten in die USA übermitteln können (Meta, LinkedIn). Die Datenübermittlungen erfolgen unter geeigneten Garantien gemäß der Datenschutz-Grundverordnung (DSGVO):',
          },
          {
            ul: [
              '**Google LLC:** abgesichert durch die von der Europäischen Kommission erlassenen Standardvertragsklauseln (SCC), abrufbar unter [privacy.google.com/businesses/processorterms](https://privacy.google.com/businesses/processorterms/)',
              '**TikTok Inc.:** abgesichert durch Standardvertragsklauseln (SCC), abrufbar über die Datenschutzrichtlinie von TikTok',
              '**LinkedIn Ireland Unlimited Company:** Die Daten können an die LinkedIn Corporation (USA) übermittelt werden; die Übermittlung ist durch Standardvertragsklauseln (SCC) abgesichert',
              '**Meta Platforms Ireland Limited:** Die Daten können an Meta Platforms, Inc. (USA) übermittelt werden; die Übermittlung ist durch Standardvertragsklauseln (SCC) abgesichert',
              '**OpenAI:** Die Daten können in die USA übermittelt werden; die Übermittlung ist durch Standardvertragsklauseln (SCC) abgesichert',
            ],
          },
        ],
      },
      {
        scurt: 'Änderungen dieser Richtlinie',
        titlu: 'Aktualisierungen dieser Richtlinie',
        continut: [
          {
            p: 'Diese Cookie-Richtlinie kann von Zeit zu Zeit aktualisiert werden, um Änderungen der verwendeten Cookies oder der gesetzlichen Anforderungen Rechnung zu tragen.',
          },
          {
            p: 'Das Datum der letzten Änderung wird am Anfang des Dokuments angezeigt. Wesentliche Änderungen teilen wir über das Cookie-Banner oder durch einen gut sichtbaren Hinweis auf der Website mit.',
          },
          { p: 'Bitte besuchen Sie diese Seite regelmäßig, um über unseren Umgang mit Cookies auf dem Laufenden zu bleiben.' },
        ],
      },
      {
        scurt: 'Kontakt',
        titlu: 'Kontakt',
        continut: [
          { p: 'Bei Fragen zur Verwendung von Cookies auf inovex.ro:' },
          {
            ul: [
              '**E-Mail:** [contact@inovex.ro](mailto:contact@inovex.ro) (Betreff: „Cookies – [Ihre Frage]“)',
              '**Telefon:** [+40 750 456 096](tel:+40750456096), Montag–Freitag, 09:00–18:00 Uhr (rumänische Zeit)',
            ],
          },
          {
            p: 'Zuständige Behörde für Beschwerden im Zusammenhang mit Cookies: die rumänische Datenschutzaufsichtsbehörde (ANSPDCP), [www.dataprotection.ro](https://www.dataprotection.ro).',
          },
          {
            p: 'Diese Cookie-Richtlinie wurde gemäß dem rumänischen Gesetz Nr. 506/2004 und der Verordnung (EU) 2016/679 (DSGVO) in der am 7. November 2026 geltenden Fassung erstellt.',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  termeni: {
    meta: {
      titlu: 'Allgemeine Geschäftsbedingungen (AGB)',
      descriere:
        'AGB für die Nutzung der Leistungen und der Website von Inovex, betrieben von der VOID SFT GAMES SRL (CUI RO43474393). Anwendbares Recht: rumänisches Recht.',
    },
    titlu: 'Allgemeine Geschäftsbedingungen',
    intro:
      'Bitte lesen Sie dieses Dokument sorgfältig durch, bevor Sie die Leistungen oder die Website von Inovex nutzen. Mit dem Aufruf der Website oder der Beauftragung einer Leistung erklären Sie sich mit diesen Bedingungen einverstanden.',
    actualizat: '6. November 2026',
    data: '2026-11-06',
    sectiuni: [
      {
        scurt: 'Angaben zum Betreiber',
        titlu: 'Angaben zum Betreiber',
        continut: [
          {
            p: 'Die Website inovex.ro wird von der VOID SFT GAMES SRL betrieben, einer nach rumänischem Recht registrierten Gesellschaft mit beschränkter Haftung mit Sitz im Kreis Gorj, Steuer-ID (CUI) RO43474393, eingetragen im Handelsregister.',
          },
          {
            ul: [
              '**Handelsname:** Inovex',
              '**Firma:** VOID SFT GAMES SRL',
              '**Steuer-ID (CUI):** RO43474393',
              '**Sitz:** Târgu Jiu, Kreis Gorj, Rumänien',
              '**E-Mail:** [contact@inovex.ro](mailto:contact@inovex.ro)',
              '**Telefon:** [+40 750 456 096](tel:+40750456096)',
              '**Website:** [https://inovex.ro](https://inovex.ro)',
            ],
          },
          {
            p: 'Inovex bietet natürlichen und juristischen Personen Dienstleistungen in der Erstellung und Entwicklung von Web-Lösungen an, darunter Online-Shops, Unternehmenswebsites, Web- und Mobilanwendungen, CRM-/ERP-/CMS-Systeme sowie die Implementierung von Automatisierungen mit künstlicher Intelligenz.',
          },
        ],
      },
      {
        scurt: 'Annahme der Bedingungen',
        titlu: 'Annahme der Bedingungen',
        continut: [
          {
            p: 'Mit dem Aufruf und der Nutzung der Website inovex.ro oder mit der Beauftragung einer von der VOID SFT GAMES SRL unter der Marke Inovex angebotenen Leistung bestätigen Sie, dass Sie diese Allgemeinen Geschäftsbedingungen gelesen und verstanden haben und damit einverstanden sind, sie in vollem Umfang einzuhalten.',
          },
          {
            p: 'Wenn Sie mit einer der Bestimmungen dieses Dokuments nicht einverstanden sind, bitten wir Sie, die Website nicht zu nutzen und unsere Leistungen nicht in Auftrag zu geben.',
          },
          {
            p: 'Dieses Dokument stellt eine rechtsgültige Vereinbarung zwischen Ihnen (natürliche oder juristische Person, nachfolgend „Kunde“) und der VOID SFT GAMES SRL (nachfolgend „Inovex“ oder „Anbieter“) dar.',
          },
          {
            p: 'Inovex behält sich das Recht vor, diese Bedingungen jederzeit zu ändern; die Nutzer werden durch die Veröffentlichung der aktualisierten Fassung auf der Website informiert. Die weitere Nutzung der Leistungen nach Veröffentlichung der Änderungen gilt als Annahme der neuen Bedingungen.',
          },
        ],
      },
      {
        scurt: 'Angebotene Leistungen',
        titlu: 'Angebotene Leistungen',
        continut: [
          { p: 'Inovex bietet insbesondere, jedoch nicht ausschließlich, folgende Kategorien von Leistungen an:' },
          {
            ol: [
              'Erstellung schlüsselfertiger Online-Shops, einschließlich individuellen Designs, der Anbindung von Zahlungsdienstleistern, Kurierdiensten und Rechnungsprogrammen sowie der Suchmaschinenoptimierung (SEO);',
              'Erstellung von Unternehmenswebsites, einschließlich individuellen Designs, eines Systems zur Inhaltsverwaltung und der Optimierung für Suchmaschinen;',
              'Entwicklung von Webanwendungen und SaaS-Plattformen, einschließlich Authentifizierungssystemen, Dashboards, APIs und Cloud-Infrastruktur;',
              'Implementierung individueller CRM-, CMS- und ERP-Systeme, die auf die internen Prozesse des Kunden zugeschnitten sind;',
              'Entwicklung mobiler Apps für die Plattformen iOS und Android;',
              'Implementierung von Automatisierungen mit künstlicher Intelligenz, einschließlich Chatbots, automatisierter Dokumentenverarbeitung und automatisierter Arbeitsabläufe;',
              'Digitale Produkte im Inovex Marketplace, einschließlich Templates und vorkonfigurierter Web-Lösungen.',
            ],
          },
          {
            p: 'Alle Leistungen werden auf Grundlage eines mit jedem Kunden unterzeichneten Einzelvertrags erbracht, der die technischen Spezifikationen, Lieferfristen und Zahlungsmodalitäten für das jeweilige Projekt im Einzelnen festlegt. Dieses Dokument gilt ergänzend zum Einzelvertrag und ersetzt diesen nicht.',
          },
        ],
      },
      {
        scurt: 'Preise und Zahlungsbedingungen',
        titlu: 'Preise und Zahlungsbedingungen',
        continut: [
          {
            p: '**4.1.** Die Preise für individuelle Projekte werden je nach Komplexität, Arbeitsaufwand und vereinbarten technischen Spezifikationen individuell festgelegt, da jedes Projekt einzigartig ist und eine individuelle Prüfung erfordert. Für Leistungen mit auf der Website angegebenem Preis (z. B. Video Motion Design) und für Produkte aus dem Marketplace gilt der zum Zeitpunkt der Bestellung angegebene Preis.',
          },
          { p: '**4.2.** Akzeptierte Zahlungsmodalitäten:' },
          {
            ol: [
              'Vollständige Vorauszahlung vor Beginn der Arbeiten;',
              'Zahlung in Teilbeträgen: eine Anzahlung von mindestens 20 % (zwanzig Prozent) des Gesamtvertragswerts, die vor Beginn der Arbeiten zu leisten ist, während der Restbetrag bei der endgültigen Lieferung des Projekts vor der Übergabe der Zugangsdaten zu zahlen ist.',
            ],
          },
          {
            p: '**4.3.** Die von Inovex ausgestellten Rechnungen sind innerhalb von 5 (fünf) Arbeitstagen ab Rechnungsdatum zu bezahlen, sofern im Einzelvertrag nichts anderes vereinbart ist.',
          },
          {
            p: '**4.4.** Bei nicht fristgerechter Zahlung fällt für jeden Tag des Verzugs eine Verzugsstrafe in Höhe von 0,1 % (null Komma eins Prozent) des offenen Rechnungsbetrags an, beginnend mit dem ersten Tag nach Fälligkeit.',
          },
          {
            p: '**4.5.** Inovex ist berechtigt, die Arbeiten bei nicht fristgerechter Bezahlung der Rechnungen auszusetzen, ohne für etwaige aus dieser Aussetzung entstehende Schäden verantwortlich gemacht werden zu können.',
          },
          {
            p: '**4.6.** Die Übergabe der endgültigen Liefergegenstände, einschließlich der Kontozugänge, des Quellcodes und der Dokumentation, erfolgt ausschließlich nach vollständiger Bezahlung der geschuldeten Beträge.',
          },
          {
            p: '**4.7.** Die angezeigten oder mitgeteilten Preise verstehen sich ohne Mehrwertsteuer (MwSt.), sofern nicht anders angegeben. Die MwSt. wird gemäß den geltenden steuerrechtlichen Vorschriften berechnet.',
          },
        ],
      },
      {
        scurt: 'Lieferung und Fristen',
        titlu: 'Lieferung und Fristen',
        continut: [
          {
            p: '**5.1.** Die Lieferfristen werden in dem mit dem jeweiligen Kunden unterzeichneten Einzelvertrag festgelegt und beginnen an dem Tag, an dem die Anzahlung geleistet wurde und alle erforderlichen Materialien des Kunden (Texte, Bilder, Zugangsdaten, technische Spezifikationen usw.) eingegangen sind.',
          },
          {
            p: '**5.2.** Inovex unternimmt alle zumutbaren Anstrengungen, um die vereinbarten Lieferfristen einzuhalten. Die Fristen können jedoch beeinflusst werden durch:',
          },
          {
            ol: [
              'Verzögerungen des Kunden bei der Bereitstellung der Materialien oder der angeforderten Rückmeldungen;',
              'Vom Kunden im Projektverlauf verlangte Änderungen der technischen Spezifikationen;',
              'Externe Faktoren, die außerhalb des Einflussbereichs von Inovex liegen (Fälle höherer Gewalt, Probleme bei Drittanbietern usw.).',
            ],
          },
          {
            p: '**5.3.** Inovex wird den Kunden rechtzeitig über jede absehbare Verzögerung informieren und eine neue angemessene Lieferfrist vorschlagen.',
          },
          {
            p: '**5.4.** Dem Kunden steht für jeden erhaltenen Liefergegenstand eine Prüf- und Freigabefrist von mindestens 5 (fünf) Arbeitstagen zu. Erfolgt innerhalb der vereinbarten Prüffrist keine Rückmeldung, gilt der betreffende Liefergegenstand als stillschweigend abgenommen.',
          },
          {
            p: '**5.5.** Die endgültige Lieferung gilt mit dem Tag der Übergabe der Zugangsdaten und der vollständigen Dokumentation nach vollständiger Bezahlung des Vertragswerts als erfolgt.',
          },
        ],
      },
      {
        scurt: 'Gewährleistung nach dem Livegang',
        titlu: 'Gewährleistung nach dem Livegang',
        continut: [
          {
            p: '**6.1.** Inovex gewährt eine Gewährleistungsfrist von 30 (dreißig) Kalendertagen ab dem Tag der endgültigen Lieferung des Projekts. Innerhalb dieser Frist behebt Inovex kostenlos jeden festgestellten Mangel oder Funktionsfehler, sofern dieser nicht verursacht wurde durch:',
          },
          {
            ol: [
              'Änderungen, die der Kunde oder Dritte ohne vorherige Zustimmung von Inovex am Quellcode oder an der Systemkonfiguration vorgenommen haben;',
              'Aktualisierungen von Plattformen Dritter (WordPress, WooCommerce, Betriebssysteme, Browser), die nach der endgültigen Lieferung durchgeführt wurden;',
              'Unsachgemäße Nutzung des Systems durch den Kunden oder dessen Mitarbeiter;',
              'Cyberangriffe, Schadsoftware oder unbefugten Zugriff auf die Systeme des Kunden;',
              'Infrastrukturprobleme beim vom Kunden gewählten Hosting-Anbieter.',
            ],
          },
          {
            p: '**6.2.** Gewährleistungsansprüche sind per E-Mail an [contact@inovex.ro](mailto:contact@inovex.ro) unter ausführlicher Beschreibung des festgestellten Problems geltend zu machen. Inovex antwortet innerhalb von höchstens 2 (zwei) Arbeitstagen und behebt das Problem innerhalb der mitgeteilten Frist.',
          },
          {
            p: '**6.3.** Die Gewährleistung umfasst ausschließlich die im ursprünglichen Vertrag vereinbarten Funktionen. Wünsche nach neuen Funktionen oder nach Änderungen bestehender Funktionen fallen nicht unter die Gewährleistung und werden als neue Projekte behandelt.',
          },
          {
            p: '**6.4.** Nach Ablauf der Gewährleistungsfrist sind Wartungs- und Supportleistungen kostenpflichtig auf Grundlage eines gesonderten Wartungsvertrags erhältlich.',
          },
        ],
      },
      {
        scurt: 'Geistiges Eigentum',
        titlu: 'Geistiges Eigentum und Urheberrechte',
        continut: [
          {
            p: '**7.1.** Mit vollständiger Bezahlung des Vertragswerts und endgültiger Lieferung des Projekts erwirbt der Kunde die vollständigen Nutzungsrechte an allen von Inovex im Rahmen des Projekts geschaffenen Elementen, einschließlich des grafischen Designs, des Quellcodes, der Datenbankstruktur und der technischen Dokumentation.',
          },
          {
            p: '**7.2.** Die in Ziffer 7.1 vorgesehene Rechteübertragung bezieht sich ausschließlich auf die Elemente, die Inovex eigens für das Projekt des Kunden geschaffen hat. Nicht umfasst sind:',
          },
          {
            ol: [
              'Die verwendeten Open-Source-Bibliotheken, -Frameworks und -Softwarekomponenten, die weiterhin ihren eigenen Lizenzen unterliegen (MIT, GPL, Apache usw.);',
              'Separat erworbene Themes, Plugins oder Komponenten Dritter, die weiterhin den Lizenzen der jeweiligen Herausgeber unterliegen;',
              'Von Dritten erworbene grafische Elemente oder Fotos (Bilddatenbanken, Schriftlizenzen usw.), die weiterhin den Lizenzbedingungen der jeweiligen Anbieter unterliegen.',
            ],
          },
          {
            p: '**7.3.** Inovex behält sich das Recht vor, abgeschlossene Projekte im eigenen Portfolio (Website, soziale Netzwerke, Marketingmaterialien) zu präsentieren, es sei denn, der Kunde verlangt vor Vertragsunterzeichnung schriftlich die vertrauliche Behandlung dieser Projekte.',
          },
          {
            p: '**7.4.** Der Kunde garantiert, dass die Materialien, die er Inovex für die Umsetzung des Projekts zur Verfügung stellt (Texte, Bilder, Logos, Markenelemente), keine Urheberrechte Dritter verletzen. Jegliche Haftung, die sich aus der Verwendung von Materialien ergibt, die der Kunde ohne die erforderlichen Rechte bereitgestellt hat, liegt ausschließlich beim Kunden.',
          },
          {
            p: '**7.5.** Die Vervielfältigung, Verbreitung oder Änderung der Inhalte der Website inovex.ro (Texte, Bilder, Logo, Design) ohne vorherige schriftliche Zustimmung der VOID SFT GAMES SRL ist untersagt.',
          },
        ],
      },
      {
        scurt: 'Vertraulichkeit und Zugangsdaten',
        titlu: 'Vertraulichkeit und Zugangsdaten',
        continut: [
          {
            p: '**8.1.** Während der Leistungserbringung kann Inovex Zugang zu den Zugangsdaten des Kunden haben (Hosting, Domain, E-Mail-Konten, soziale Netzwerke, Zahlungsdienstleister usw.). Diese Daten werden streng vertraulich behandelt und ausschließlich zur Umsetzung des beauftragten Projekts verwendet.',
          },
          {
            p: '**8.2.** Nach Abschluss des Projekts übergibt Inovex dem Kunden alle im Rahmen des Projekts erstellten oder verwalteten Zugangsdaten. Der Kunde ist dafür verantwortlich, die Passwörter unmittelbar nach der Übergabe zu ändern.',
          },
          {
            p: '**8.3.** Inovex speichert und archiviert nach Abschluss des Projekts und Übergabe der Zugangsdaten keine Zugangsdaten und kann nicht für Sicherheitsvorfälle verantwortlich gemacht werden, die darauf zurückzuführen sind, dass der Kunde die Passwörter nach der Übergabe nicht geändert hat.',
          },
          {
            p: '**8.4.** Beide Parteien verpflichten sich, die geschäftlichen, technischen und finanziellen Informationen der jeweils anderen Partei, von denen sie während der Zusammenarbeit Kenntnis erlangen, vertraulich zu behandeln, und zwar sowohl während der Laufzeit des Vertrags als auch für einen Zeitraum von 2 (zwei) Jahren nach dessen Beendigung.',
          },
          {
            p: '**8.5.** Die Verarbeitung personenbezogener Daten erfolgt gemäß der [Datenschutzerklärung](/politica-de-confidentialitate), die integraler Bestandteil dieses Dokuments ist.',
          },
        ],
      },
      {
        scurt: 'Kündigung des Vertrags',
        titlu: 'Kündigung des Vertrags',
        continut: [
          { p: '**9.1.** Der Kunde kann den Vertrag jederzeit durch schriftliche Mitteilung an Inovex kündigen. In diesem Fall gilt:' },
          {
            ol: [
              'Die geleistete Anzahlung wird von Inovex als Entschädigung für die geleistete Arbeit und die für das Projekt bereitgestellten Ressourcen vollständig einbehalten;',
              'Übersteigt der Wert der erbrachten Arbeiten die geleistete Anzahlung, schuldet der Kunde die Vergütung der bis zum Tag der Kündigung erbrachten Arbeiten, berechnet anteilig nach dem Fortschritt des Projekts;',
              'Inovex übergibt dem Kunden alle bis zum Tag der Kündigung erstellten Materialien und Liefergegenstände in dem Zustand, in dem sie sich zu diesem Zeitpunkt befinden.',
            ],
          },
          {
            p: '**9.2.** Inovex kann den Vertrag in begründeten Fällen (objektive Unmöglichkeit der Leistungserbringung, missbräuchliches Verhalten des Kunden, Angabe falscher Informationen bei Vertragsschluss) durch schriftliche Mitteilung an den Kunden mit einer Frist von mindestens 15 (fünfzehn) Kalendertagen kündigen. In diesem Fall erstattet Inovex die geleistete Anzahlung abzüglich des Werts der bereits erbrachten Arbeiten.',
          },
          {
            p: '**9.3.** Inovex kann den Vertrag fristlos und ohne Rückzahlung der Anzahlung kündigen, wenn der Kunde die Erstellung von Inhalten verlangt, die rechtswidrig sind, rechtswidrige Tätigkeiten fördern, Rechte Dritter verletzen oder gegen die guten Sitten verstoßen.',
          },
          { p: '**9.4.** Die Kündigung des Vertrags lässt die vor der Kündigung fällig gewordenen Zahlungsverpflichtungen unberührt.' },
        ],
      },
      {
        scurt: 'Haftungsbeschränkung',
        titlu: 'Haftungsbeschränkung',
        continut: [
          {
            p: '**10.1.** Inovex haftet für unmittelbare Schäden, die dem Kunden durch die Nichterfüllung oder nicht ordnungsgemäße Erfüllung vertraglicher Pflichten entstehen, begrenzt auf den Gesamtwert des betreffenden Vertrags.',
          },
          { p: '**10.2.** Inovex haftet nicht für:' },
          {
            ol: [
              'Mittelbare Schäden, entgangenen Gewinn, Datenverluste oder entgangene Geschäftsmöglichkeiten des Kunden;',
              'Störungen oder die Nichtverfügbarkeit von Diensten Dritter, von denen der Betrieb des Projekts abhängt (Hosting, E-Mail-Dienste, Zahlungsdienstleister, APIs Dritter, CDN usw.);',
              'Schäden infolge einer unsachgemäßen Nutzung des gelieferten Projekts durch den Kunden oder dessen Mitarbeiter;',
              'Datenverluste aufgrund fehlender Sicherungskopien oder einer unsachgemäßen Konfiguration der Infrastruktur durch den Kunden;',
              'Cyberangriffe, Sicherheitslücken oder unbefugten Zugriff auf die Systeme des Kunden, die nach der endgültigen Lieferung und der Übergabe der Zugangsdaten auftreten;',
              'Gesetzesänderungen oder Änderungen der Richtlinien von Plattformen Dritter (Google, Meta, Apple, Google Play usw.), die den Betrieb des gelieferten Projekts beeinträchtigen.',
            ],
          },
          {
            p: '**10.3.** Die Website inovex.ro kann Links zu Websites Dritter enthalten. Inovex ist für die Inhalte, Datenschutzrichtlinien oder Praktiken dieser Websites nicht verantwortlich.',
          },
          {
            p: '**10.4.** Inovex unternimmt angemessene Anstrengungen, um die Website inovex.ro verfügbar und funktionsfähig zu halten, garantiert jedoch keine ununterbrochene Verfügbarkeit.',
          },
        ],
      },
      {
        scurt: 'Höhere Gewalt',
        titlu: 'Höhere Gewalt',
        continut: [
          {
            p: '**11.1.** Keine der Parteien haftet für die Nichterfüllung oder verspätete Erfüllung vertraglicher Pflichten, sofern diese auf ein Ereignis höherer Gewalt im Sinne des rumänischen Zivilgesetzbuchs zurückzuführen ist.',
          },
          {
            p: '**11.2.** Als höhere Gewalt gelten insbesondere, jedoch nicht ausschließlich: Naturkatastrophen, von den zuständigen Behörden ausgerufene Pandemien, bewaffnete Konflikte, Terrorakte, Generalstreiks, landesweite oder regionale Unterbrechungen der Energieversorgung oder der Internetdienste sowie behördliche Maßnahmen, die die Vertragserfüllung verhindern.',
          },
          {
            p: '**11.3.** Die von höherer Gewalt betroffene Partei ist verpflichtet, die andere Partei innerhalb von höchstens 5 (fünf) Kalendertagen nach Eintritt des Ereignisses schriftlich unter Angabe seiner Art und voraussichtlichen Dauer zu benachrichtigen.',
          },
          {
            p: '**11.4.** Dauert das Ereignis höherer Gewalt länger als 60 (sechzig) Kalendertage, kann jede Partei den Vertrag kündigen; in diesem Fall werden die für nicht erbrachte Leistungen gezahlten Beträge anteilig erstattet.',
          },
        ],
      },
      {
        scurt: 'Inovex Marketplace',
        titlu: 'Inovex Marketplace',
        continut: [
          {
            p: '**12.1.** Der Inovex Marketplace bietet vorkonfigurierte digitale Produkte (Templates für Websites und Online-Shops) an, die erworben und individuell angepasst werden können.',
          },
          {
            p: '**12.2.** Die Produkte im Marketplace werden auf Basis einer Nutzungslizenz verkauft. Mit dem Kauf erwirbt der Käufer das Recht, das Produkt für ein einziges Projekt/eine einzige Domain zu nutzen, sofern in der Produktbeschreibung nichts anderes angegeben ist.',
          },
          {
            p: '**12.3.** Die Produkte im Marketplace werden „wie besehen“ (as-is) bereitgestellt, mit Anpassungen in dem in der Produktbeschreibung angegebenen Umfang. Die Gewährleistung von 30 Tagen gilt auch für Produkte aus dem Marketplace und umfasst die ordnungsgemäße Funktion der beschriebenen Funktionalitäten.',
          },
          {
            p: '**12.4.** Produkte, die als „Exklusiv“ gekennzeichnet sind oder mit einer exklusiven Lizenz angeboten werden, werden nur ein einziges Mal verkauft. Nach dem Verkauf wird das Produkt als nicht verfügbar gekennzeichnet und kann von anderen Käufern nicht mehr erworben werden.',
          },
          {
            p: '**12.5.** Für digitale Produkte aus dem Marketplace sind Rückgaben ausgeschlossen. Es gilt die Ausnahme vom Widerrufsrecht nach Art. 16 Buchst. m der Dringlichkeitsverordnung der rumänischen Regierung (OUG) Nr. 34/2014 (mit der Art. 16 Buchst. m der Richtlinie 2011/83/EU umgesetzt wird) für die Lieferung digitaler Inhalte, die sich nicht auf einem körperlichen Datenträger befinden, wenn die Ausführung mit vorheriger Zustimmung des Verbrauchers begonnen hat.',
          },
          {
            p: '**12.6.** Die Preise im Marketplace verstehen sich inklusive MwSt., sofern anwendbar, und werden in EUR angezeigt. Die Rechnungsstellung erfolgt in RON zum Wechselkurs der Rumänischen Nationalbank (BNR) am Tag der Rechnungsstellung.',
          },
        ],
      },
      {
        scurt: 'Streitbeilegung',
        titlu: 'Streitbeilegung',
        continut: [
          { p: '**13.1.** Dieses Dokument unterliegt dem Recht Rumäniens und ist in Übereinstimmung mit diesem auszulegen.' },
          {
            p: '**13.2.** Streitigkeiten, Meinungsverschiedenheiten oder Ansprüche aus oder im Zusammenhang mit diesem Dokument oder den Leistungen von Inovex werden vorrangig gütlich durch direkte Verhandlungen zwischen den Parteien beigelegt.',
          },
          {
            p: '**13.3.** Die Frist für die gütliche Beilegung beträgt 30 (dreißig) Kalendertage ab dem Tag, an dem eine der Parteien die Streitigkeit schriftlich angezeigt hat.',
          },
          {
            p: '**13.4.** Ist eine gütliche Beilegung innerhalb der in Ziffer 13.3 genannten Frist nicht möglich, wird die Streitigkeit von den zuständigen Gerichten im Bezirk des Landgerichts Gorj (Tribunalul Gorj) mit Sitz in Târgu Jiu, Kreis Gorj, Rumänien, entschieden.',
          },
          {
            p: '**13.5.** Verbraucher (natürliche Personen) können zudem die alternative Streitbeilegung über die Plattform der rumänischen Verbraucherschutzbehörde nutzen, die unter [https://reclamatiisal.anpc.ro](https://reclamatiisal.anpc.ro) erreichbar ist.',
          },
          {
            p: '**13.6.** Verbraucher können sich an die rumänische Verbraucherschutzbehörde (ANPC) wenden, unter [https://anpc.ro](https://anpc.ro) oder telefonisch unter +40 21 9551.',
          },
        ],
      },
      {
        scurt: 'Schlussbestimmungen',
        titlu: 'Schlussbestimmungen',
        continut: [
          {
            p: '**14.1.** Sollte eine Bestimmung dieses Dokuments für nichtig oder undurchführbar erklärt werden, bleiben die übrigen Bestimmungen gültig und entfalten weiterhin Rechtswirkung.',
          },
          { p: '**14.2.** Übt Inovex ein in diesem Dokument vorgesehenes Recht nicht aus, stellt dies keinen Verzicht auf dieses Recht dar.' },
          {
            p: '**14.3.** Dieses Dokument bildet zusammen mit dem unterzeichneten Einzelvertrag und der auf der Website verfügbaren Datenschutzerklärung die vollständige Vereinbarung zwischen den Parteien über seinen Gegenstand und ersetzt alle früheren Verhandlungen, Absprachen oder Vereinbarungen.',
          },
          {
            p: '**14.4.** Jede offizielle Kommunikation zwischen den Parteien erfolgt schriftlich per E-Mail an die im Einzelvertrag genannten Adressen oder per Einschreiben mit Rückschein.',
          },
          { p: '**14.5.** Dieses Dokument wurde in Übereinstimmung mit den am 6. November 2026 geltenden rumänischen Rechtsvorschriften erstellt.' },
        ],
      },
    ],
  },
};
