import type { TextLegal } from './tipuri';

/* Paginile legale in engleza britanica: traducerea lui ro.ts. Romana ramane versiunea care se aplica. */

const COOKIE_GOOGLE = 'https://policies.google.com/privacy';
const COOKIE_TIKTOK = 'https://www.tiktok.com/legal/page/global/privacy-policy';
const COOKIE_LINKEDIN = 'https://www.linkedin.com/legal/cookie-policy';
const COOKIE_META = 'https://www.facebook.com/privacy/policies/cookies/';
const COOKIE_OPENAI = 'https://openai.com/policies/privacy-policy/';

export const en: TextLegal = {
  ui: {
    acasa: 'Home',
    navigare: 'Breadcrumb',
    cuprins: 'Contents',
    sectiuni: '{n} sections',
    actualizat: 'Last updated',
    traducere:
      'This is a translation of the Romanian original, provided for convenience. In case of any discrepancy, the [Romanian version](@ro) prevails.',
    ancora: 'section',
    capTabel: ['Cookie name', 'Provider', 'Purpose', 'Duration', 'Type'],
    telefon: 'Phone',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  confidentialitate: {
    meta: {
      titlu: 'Privacy policy',
      descriere:
        'Privacy policy of Inovex (VOID SFT GAMES SRL, Tax ID RO43474393): how we process your personal data under the GDPR and Romanian law, and how we protect it.',
    },
    titlu: 'Privacy policy',
    intro:
      'The privacy of your data is a priority for Inovex. This document explains transparently what data we collect, why we collect it and how we protect it, in accordance with the EU General Data Protection Regulation (GDPR).',
    actualizat: '7 November 2026',
    data: '2026-11-07',
    rezumat: {
      titlu: 'Summary: key points',
      randuri: [
        ['Controller', 'VOID SFT GAMES SRL (Inovex)'],
        ['Main legal bases', 'Contract, consent, legitimate interest'],
        ['Data collected', 'Name, email, phone number, project details'],
        ['Main purpose', 'Providing the contracted services'],
        ['Retention period', '2 years (forms), 5–10 years (contracts)'],
        ['International transfers', 'USA (for example Google, Vercel, Supabase, Meta, OpenAI), under Standard Contractual Clauses (SCCs)'],
        [
          'Supervisory authority',
          'Romanian National Supervisory Authority for Personal Data Processing (ANSPDCP), [dataprotection.ro](https://www.dataprotection.ro)',
        ],
        ['GDPR contact', '[contact@inovex.ro](mailto:contact@inovex.ro)'],
      ],
      nota: 'Full details are set out in the sections below.',
    },
    sectiuni: [
      {
        scurt: 'Who we are and how to contact us',
        titlu: 'Identity and contact details of the controller',
        continut: [
          { p: 'The controller of personal data for the inovex.ro website and its associated services is:' },
          {
            ul: [
              '**Company name:** VOID SFT GAMES SRL',
              '**Trading name:** Inovex',
              '**Tax ID (CUI):** RO43474393',
              '**Registered office:** Târgu Jiu, Gorj County, Romania',
              '**Email:** [contact@inovex.ro](mailto:contact@inovex.ro)',
              '**Phone:** [+40 750 456 096](tel:+40750456096)',
              '**Website:** [https://inovex.ro](https://inovex.ro)',
            ],
          },
          {
            p: 'The data protection officer (DPO) can be contacted by email at [contact@inovex.ro](mailto:contact@inovex.ro), with the subject line ‘GDPR – [your request]’.',
          },
          {
            p: 'We will respond to any request concerning your personal data within a maximum of 30 (thirty) calendar days of receipt, in accordance with Art. 12 GDPR.',
          },
        ],
      },
      {
        scurt: 'What data we collect and where from',
        titlu: 'Categories of personal data collected',
        continut: [
          { p: 'Inovex collects personal data in the following contexts:' },
          { h3: '2.1. Data collected through the forms on the website' },
          { p: 'When you complete the contact, quote configuration or service request forms, we collect:' },
          {
            ul: [
              'Full name (or company name)',
              'Email address',
              'Phone number',
              'Information about the project or service you are interested in',
              'The details entered in the service configurators (industry, type of entity, project specifications) and any files you choose to attach (for example, a plan or a sketch of your app)',
            ],
          },
          { p: 'You provide this data voluntarily, and we need it in order to respond to you and provide the services you have requested.' },
          { h3: '2.2. Data collected through the Marketplace' },
          { p: 'When you purchase a product from the Inovex Marketplace, we collect:' },
          {
            ul: [
              'Full name or company name',
              'Email address, to send you the confirmation',
              'Billing details (as required by our tax obligations)',
            ],
          },
          { h3: '2.3. Data collected through the Învață gratuit section (free learning resources)' },
          { p: 'When you download free resources (PDFs, templates), we collect:' },
          { ul: ['First name', 'Email address', 'The GDPR consent you give by ticking the box'] },
          { h3: '2.4. Data collected automatically when you use the website' },
          { p: 'When you simply visit the inovex.ro website, our systems automatically collect certain technical data:' },
          {
            ul: [
              'IP address (anonymised by Google Analytics 4)',
              'Browser type and version',
              'Operating system',
              'Pages visited and length of visit',
              'Traffic source (how you arrived at the website)',
              'Device used (desktop, mobile, tablet)',
              'The country you are visiting from (derived from your IP address by our hosting provider, Vercel) and your browser language, used only to show you the website in the right language; we do not store them',
            ],
          },
          {
            p: 'This data is collected through cookies and web analytics tools (Google Analytics 4, Google Tag Manager), described in detail in our [Cookie Policy](/politica-cookies).',
          },
          { h3: '2.5. Data collected in the course of the contractual relationship' },
          { p: 'For clients who contract for Inovex services, we also collect:' },
          {
            ul: [
              'Identification details of the individual or legal entity',
              'Billing and payment details',
              'Access details for the client’s systems (hosting, domain, etc.), needed to provide the contracted services',
              'Email correspondence during the project',
            ],
          },
          { h3: '2.6. Data we do not collect' },
          {
            p: 'Inovex does not collect or process special categories of personal data within the meaning of Art. 9 GDPR (data concerning racial or ethnic origin, political opinions or religious beliefs, genetic or biometric data, or data concerning health, sex life or sexual orientation).',
          },
          { p: 'We do not collect data about minors under the age of 16. If you are a minor, please do not fill in the forms on the website without your parents’ consent.' },
        ],
      },
      {
        scurt: 'Why we process your data',
        titlu: 'Purposes and legal bases of processing',
        continut: [
          { p: 'We process your personal data on the following legal bases, in accordance with Art. 6 GDPR:' },
          { h3: '3.1. Performance of a contract or pre-contractual steps (Art. 6(1)(b) GDPR)' },
          { p: 'We process your data for:' },
          {
            ul: [
              'Responding to requests for quotes and consultancy',
              'Signing and performing service contracts',
              'Invoicing the services provided',
              'Communicating with you during the project',
              'Delivering and handing over completed projects',
            ],
          },
          { h3: '3.2. Your consent (Art. 6(1)(a) GDPR)' },
          { p: 'With your explicit consent, given by ticking the GDPR box on our forms, we process your data for:' },
          {
            ul: [
              'Downloading free resources from the Învață gratuit section',
              'Receiving information about Inovex services',
              'Measuring website traffic (Google Analytics 4) and our advertising campaigns (Google Ads, Meta, TikTok, LinkedIn, ChatGPT Ads) through the analytics and marketing cookies described in our [Cookie Policy](/politica-cookies)',
            ],
          },
          {
            p: 'You can withdraw your consent at any time, free of charge, by emailing [contact@inovex.ro](mailto:contact@inovex.ro) with the subject line ‘Withdrawal of consent’. Withdrawing your consent does not affect the lawfulness of processing carried out before the withdrawal.',
          },
          { h3: '3.3. Legitimate interest of the controller (Art. 6(1)(f) GDPR)' },
          { p: 'On the basis of our legitimate interest, we process data for:' },
          {
            ul: [
              'Improving our services and the website experience',
              'Website security and fraud prevention',
              'Defending our rights in the event of a dispute',
            ],
          },
          { h3: '3.4. Legal obligation (Art. 6(1)(c) GDPR)' },
          { p: 'We process data to comply with our legal obligations, including:' },
          {
            ul: [
              'Issuing and archiving invoices in accordance with the Romanian Tax Code',
              'Complying with the obligations under Accounting Law no. 82/1991',
              'Responding to requests from the competent authorities',
            ],
          },
        ],
      },
      {
        scurt: 'Who we share your data with',
        titlu: 'Recipients of personal data',
        continut: [
          { p: 'We do not sell your personal data to, or trade it with, any third party. Your data may be accessed or processed by:' },
          { h3: '4.1. Technical service providers (processors)' },
          {
            ul: [
              '**Vercel Inc.** (USA): hosting infrastructure for the inovex.ro website, covered by the Standard Contractual Clauses (SCCs) provided for by the GDPR',
              '**Supabase Inc.** (USA): the website’s database (form messages, quote requests and client records) and file storage; covered by SCCs',
              '**Stripe Payments Europe Ltd.** (Ireland): processing of online card payments (for example, Video Motion Design orders); Inovex never receives or stores your card details; data may be transferred to Stripe, Inc. (USA), a transfer covered by SCCs',
              '**Google LLC** (USA): Google Analytics 4 (anonymised data), Google Tag Manager, Google Ads; covered by SCCs',
              '**Meta Platforms Ireland Limited** (Ireland): Meta Pixel, used to measure Facebook and Instagram Ads campaigns; data may be transferred to Meta Platforms, Inc. (USA), a transfer covered by SCCs',
              '**TikTok** (TikTok Pixel): measuring TikTok Ads campaigns; data may be transferred outside the European Economic Area, a transfer covered by SCCs',
              '**LinkedIn Ireland Unlimited Company** (Ireland): LinkedIn Insight Tag, used to measure LinkedIn Ads campaigns; data may be transferred to LinkedIn Corporation (USA), a transfer covered by SCCs',
              '**OpenAI** (ChatGPT Ads pixel): measuring our advertising campaigns in ChatGPT; data may be transferred to the USA, a transfer covered by SCCs',
              'The cPanel hosting provider for the contact@inovex.ro mailbox, which we also use to send automatic confirmation emails (server located in Europe)',
            ],
          },
          { h3: '4.2. Public authorities' },
          {
            p: 'Data may be disclosed to public authorities, such as the Romanian tax authority (ANAF), the courts or criminal investigation bodies, solely on the basis of legal obligations or court decisions.',
          },
          { h3: '4.3. Business partners' },
          { p: 'We do not share your data with business partners or third parties for marketing purposes without your explicit consent.' },
          { h3: '4.4. International data transfers' },
          {
            p: 'Some service providers are located in the United States of America. Data transfers are carried out with appropriate safeguards, in accordance with Chapter V GDPR (the Standard Contractual Clauses adopted by the European Commission).',
          },
        ],
      },
      {
        scurt: 'How long we keep your data',
        titlu: 'Duration of processing and criteria for determining the retention period',
        continut: [
          { h3: '5.1. Data from forms (quote, contact, configurators)' },
          {
            p: 'Where no contract has been concluded, data from the forms on the website is kept for 2 (two) years from the date of collection or until consent is withdrawn.',
          },
          { h3: '5.2. Data from the contractual relationship' },
          {
            p: 'Data of clients who have contracted for services is kept for 5 (five) years after the contract has been completed, in line with the limitation periods under Romanian civil law, and for 10 (ten) years in the case of accounting documents, in accordance with Accounting Law no. 82/1991.',
          },
          { h3: '5.3. Data from the Învață gratuit section (leads)' },
          { p: 'Email addresses collected when free resources are downloaded are kept for 2 (two) years or until consent is withdrawn.' },
          { h3: '5.4. Technical data (logs, IP addresses)' },
          { p: 'Technical data collected automatically is anonymised or deleted within a maximum of 14 (fourteen) months, in line with the Google Analytics 4 settings.' },
          { h3: '5.5. System access details' },
          {
            p: 'Access details for clients’ systems (passwords, credentials) are deleted immediately after the project is handed over, in line with the practice described in our [Terms and Conditions](/termeni-si-conditii).',
          },
        ],
      },
      {
        scurt: 'Your rights under the GDPR',
        titlu: 'Rights of the data subject',
        continut: [
          { p: 'As a data subject, you have the following rights guaranteed by Regulation (EU) 2016/679:' },
          { h3: '6.1. Right of access (Art. 15 GDPR)' },
          {
            p: 'You have the right to obtain confirmation as to whether or not we process personal data concerning you and, where that is the case, access to that data and to information about how it is processed.',
          },
          { h3: '6.2. Right to rectification (Art. 16 GDPR)' },
          { p: 'You have the right to have inaccurate data concerning you rectified and incomplete data completed.' },
          { h3: '6.3. Right to erasure (‘right to be forgotten’) (Art. 17 GDPR)' },
          {
            p: 'You have the right to obtain the erasure of data concerning you where it is no longer necessary for the purpose for which it was collected, where you have withdrawn your consent or where the data has been processed unlawfully. This right does not apply where the processing is necessary to comply with a legal obligation or for the defence of legal claims.',
          },
          { h3: '6.4. Right to restriction of processing (Art. 18 GDPR)' },
          {
            p: 'You have the right to obtain restriction of the processing of your data in certain circumstances provided for by the GDPR (where you contest the accuracy of the data, where the processing is unlawful, etc.).',
          },
          { h3: '6.5. Right to data portability (Art. 20 GDPR)' },
          {
            p: 'You have the right to receive the data concerning you that you have provided to us in a structured, commonly used and machine-readable format (JSON, CSV, etc.), and to transmit that data to another controller.',
          },
          { h3: '6.6. Right to object (Art. 21 GDPR)' },
          {
            p: 'You have the right to object to the processing of your data based on the controller’s legitimate interest. Inovex will stop the processing unless it demonstrates compelling legitimate grounds that justify it.',
          },
          { h3: '6.7. Right not to be subject to automated decision-making (Art. 22 GDPR)' },
          {
            p: 'Inovex does not use automated decision-making or profiling systems that produce legal effects concerning you or otherwise significantly affect you.',
          },
          { h3: '6.8. How to exercise your rights' },
          {
            p: 'To exercise any of the rights above, send a written request to [contact@inovex.ro](mailto:contact@inovex.ro) with the subject line ‘GDPR rights – [type of request]’.',
          },
          {
            p: 'We will respond within a maximum of 30 calendar days. If your request is complex or we receive a large number of requests, we may extend this period by a further 60 days, in which case we will notify you within the first 30 days.',
          },
          {
            p: 'Exercising your rights is free of charge. If requests are manifestly unfounded or excessive, we may charge a reasonable administrative fee or refuse to act on them.',
          },
          { h3: '6.9. Right to lodge a complaint with a supervisory authority' },
          {
            p: 'You have the right to lodge a complaint with the Romanian National Supervisory Authority for Personal Data Processing (ANSPDCP). If you live or work in another EU/EEA country, you can also lodge a complaint with the data protection authority there (Art. 77 GDPR). In the United Kingdom, you can contact the Information Commissioner’s Office (ICO).',
          },
          {
            caseta: [
              '**ANSPDCP**',
              'B-dul G-ral. Gheorghe Magheru nr. 28-30, Sector 1, Bucharest',
              'Email: [anspdcp@dataprotection.ro](mailto:anspdcp@dataprotection.ro)',
              'Phone: +40 31 805 9211',
              'Website: [www.dataprotection.ro](https://www.dataprotection.ro)',
            ],
          },
        ],
      },
      {
        scurt: 'Cookies and similar technologies',
        titlu: 'Cookies and tracking technologies',
        continut: [
          { p: 'The inovex.ro website uses cookies and similar technologies to ensure that the website works properly and to analyse traffic.' },
          { h3: '7.1. What cookies are' },
          {
            p: 'Cookies are small text files stored on your device when you visit a website. They allow the website to remember your preferences and to analyse how you use it.',
          },
          { h3: '7.2. Types of cookies we use' },
          {
            ol: [
              '**Strictly necessary cookies:** required for the basic functioning of the website (session, CSRF security). They cannot be disabled.',
              '**Analytics cookies:** we use Google Analytics 4 for anonymised traffic analysis. IP addresses are anonymised. You can disable these cookies in the cookie banner.',
              '**Marketing cookies:** we use Google Ads, the Meta Pixel, the TikTok Pixel, the LinkedIn Insight Tag and the ChatGPT Ads pixel (OpenAI) to measure the effectiveness of our advertising campaigns. You can disable these cookies in the cookie banner.',
            ],
          },
          { h3: '7.3. Managing cookies' },
          {
            p: 'When you first visit the website, a consent banner informs you about the use of cookies. You can accept all cookies, configure them individually or reject all non-essential cookies.',
          },
          {
            p: 'You can also manage cookies directly in your browser settings. Disabling cookies may affect how some pages of the website work.',
          },
          { p: 'Detailed information about each cookie we use is available in our [Cookie Policy](/politica-cookies).' },
        ],
      },
      {
        scurt: 'Data security',
        titlu: 'Security measures implemented',
        continut: [
          {
            p: 'Inovex implements appropriate technical and organisational measures to protect personal data against unauthorised access, alteration, disclosure or destruction:',
          },
          {
            ol: [
              'All communications between your browser and our servers are encrypted using the HTTPS protocol, with a valid SSL/TLS certificate',
              'Access to the database and the administration panel is restricted and protected by strong password authentication',
              'User passwords are stored only in encrypted form (hash + salt), never in plain text',
              'Servers are hosted by providers with recognised security certifications (Vercel, which operates on AWS infrastructure)',
              'Database backups are made automatically and stored in separate locations',
              'Internal access to personal data is limited to staff who need that data to provide the services',
            ],
          },
          { h3: '8.1. Notification in the event of a security incident' },
          {
            p: 'In the event of a security incident involving personal data that poses a risk to the rights and freedoms of data subjects, Inovex will notify ANSPDCP within a maximum of 72 hours of becoming aware of the incident, in accordance with Art. 33 GDPR.',
          },
          {
            p: 'Data subjects will be notified without undue delay if the incident poses a high risk to their rights and freedoms, in accordance with Art. 34 GDPR.',
          },
        ],
      },
      {
        scurt: 'Minors’ data',
        titlu: 'Protection of minors’ data',
        continut: [
          {
            p: 'The inovex.ro website and Inovex services are not intended for persons under the age of 16 (sixteen). We do not knowingly collect personal data from minors.',
          },
          {
            p: 'If you are a parent or legal guardian and you discover that a minor in your care has provided personal data on our website without your consent, please contact us at [contact@inovex.ro](mailto:contact@inovex.ro). We will delete that data as soon as possible.',
          },
        ],
      },
      {
        scurt: 'Links to third-party websites',
        titlu: 'Third-party websites and responsibility',
        continut: [
          {
            p: 'The inovex.ro website may contain links to websites operated by third parties (partners, clients, external resources). Inovex is not responsible for the privacy practices of these websites and does not control how they collect or use your personal data.',
          },
          { p: 'We encourage you to read the privacy policy of any third-party website you visit through the links on our website.' },
        ],
      },
      {
        scurt: 'Changes to this policy',
        titlu: 'Updates to this document',
        continut: [
          {
            p: 'Inovex may update this Privacy Policy from time to time to reflect legislative changes, changes in our processing practices or other operational reasons.',
          },
          {
            p: 'The date of the last update is shown at the top of this document. Continuing to use the website or our services after an updated version has been published constitutes acceptance of the new provisions.',
          },
          {
            p: 'For significant changes that affect your rights, we will make reasonable efforts to notify you by email (if you have given us your address) or by displaying a prominent banner on the website.',
          },
        ],
      },
      {
        scurt: 'Contact and exercising your rights',
        titlu: 'Contact for privacy matters',
        continut: [
          { p: 'For any question, request or complaint relating to the processing of your personal data, you can contact us:' },
          { contact: { titlu: 'Contact us about GDPR', subiect: 'GDPR - My request', buton: 'Send a GDPR request' } },
          {
            p: 'Response time: a maximum of 30 (thirty) calendar days from receipt of your request, in accordance with Art. 12(3) GDPR.',
          },
          {
            p: 'If you are not satisfied with our response or believe that your data is being processed unlawfully, you have the right to lodge a complaint with ANSPDCP ([www.dataprotection.ro](https://www.dataprotection.ro)) or to bring an action before the competent courts.',
          },
          {
            p: 'This Privacy Policy has been drafted in accordance with Regulation (EU) 2016/679 (GDPR) and the applicable Romanian legislation in force on 7 November 2026.',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  cookies: {
    meta: {
      titlu: 'Cookie policy',
      descriere:
        'Information about the cookies used on inovex.ro and how you can manage your preferences: strictly necessary, analytics and marketing cookies.',
    },
    titlu: 'Cookie policy',
    intro:
      'This page explains exactly which cookies we use, why we use them and how you can control them. You can change your preferences at any time via the cookie banner or in your browser settings.',
    actualizat: '7 November 2026',
    data: '2026-11-07',
    sectiuni: [
      {
        scurt: 'What cookies are',
        titlu: 'What cookies are',
        continut: [
          {
            p: 'Cookies are small text files that a website stores on your device (computer, phone, tablet) when you visit it. They allow the website to remember your actions and preferences over a period of time, so that you do not have to re-enter them on every visit or when you move from one page to another.',
          },
          {
            p: 'Cookies are not programs and cannot execute code, transmit viruses or access information on your hard drive. They contain only data that you have provided or that has been collected while you use the website.',
          },
          {
            p: 'In addition to cookies themselves, we also use similar technologies (local storage, session storage, tracking pixels, web beacons), which work in a similar way. The term ‘cookies’ in this document covers all of these technologies.',
          },
        ],
      },
      {
        scurt: 'Why we use cookies',
        titlu: 'Why we use cookies',
        continut: [
          { p: 'We use cookies and similar technologies for:' },
          {
            ol: [
              'The proper functioning of the inovex.ro website (essential cookies)',
              'Understanding how visitors use our website, so that we can keep improving it (analytics cookies)',
              'Measuring the effectiveness of our advertising campaigns on Google Ads, Meta (Facebook and Instagram), TikTok Ads, LinkedIn Ads and ChatGPT Ads (marketing cookies)',
              'Remembering your cookie preferences for future visits',
            ],
          },
          {
            p: 'We do not use cookies to sell data to third parties or to build behavioural profiles for purposes other than those mentioned above.',
          },
        ],
      },
      {
        scurt: 'Types of cookies used',
        titlu: 'Types of cookies used on inovex.ro',
        continut: [
          { p: 'Cookies are classified according to their purpose:' },
          { h3: '3.1. Strictly necessary (essential) cookies' },
          {
            p: 'These cookies are essential for the website to work and cannot be disabled. Without them, the website cannot function properly. They do not require your consent, under Article 5(3) of the ePrivacy Directive, as transposed into Romanian law by Law no. 506/2004.',
          },
          { p: 'They do not store information that can identify you personally.' },
          { h3: '3.2. Analytics (statistics) cookies' },
          {
            p: 'These cookies help us understand how visitors interact with the website (which pages they visit, how long they stay, where they come from). All data is anonymised or pseudonymised and cannot be used to identify individuals directly.',
          },
          { p: 'They require your consent. You can refuse them without affecting how the website works.' },
          { h3: '3.3. Marketing (advertising) cookies' },
          {
            p: 'These cookies are used to measure the effectiveness of our advertising campaigns on Google Ads, Meta (Facebook and Instagram), TikTok Ads, LinkedIn Ads and ChatGPT Ads. They let advertising platforms know whether you visited our website after seeing one of our ads.',
          },
          {
            p: 'We do not display personalised ads on our website. These cookies are used solely to attribute conversions in our paid campaigns.',
          },
          { p: 'They require your consent. You can refuse them without affecting how the website works.' },
          { h3: '3.4. Preference cookies' },
          {
            p: 'These cookies remember your choices (including your cookie preferences), so that you do not have to re-enter them on every visit.',
          },
        ],
      },
      {
        scurt: 'Full list of cookies',
        titlu: 'Detailed list of the cookies we use',
        continut: [
          { p: 'Below you will find all the cookies and similar technologies we use, grouped by category.' },
          {
            setari: {
              titlu: 'Manage your preferences',
              text: 'You can change which cookies you accept at any time: the cookie banner reopens so that you can make your choice again.',
              buton: 'Open cookie settings',
            },
          },
          {
            cookies: [
              {
                nume: 'Essential',
                descriere: 'Required for the basic functioning of the website. No consent required.',
                cookies: [
                  ['__Host-next-auth.csrf-token', 'inovex.ro', 'https://inovex.ro', 'CSRF protection for forms', 'Session', 'HTTP'],
                  ['__Secure-next-auth.session-token', 'inovex.ro', 'https://inovex.ro', 'Maintaining the authenticated session', '30 days', 'HTTP'],
                  ['cookie_consent', 'inovex.ro', 'https://inovex.ro', 'Stores your cookie preferences', '12 months', 'localStorage'],
                  ['inovex_limba', 'inovex.ro', 'https://inovex.ro', 'Remembers the website language: the one you chose, or the one matched automatically on your first visit from your country (derived from your IP address, which we do not store) and your browser language', '12 months', 'HTTP'],
                ],
              },
              {
                nume: 'Analytics',
                descriere: 'Google Analytics 4: anonymised traffic analysis. Consent required.',
                cookies: [
                  ['_ga', 'google.com', COOKIE_GOOGLE, 'Identifies unique user sessions (anonymised)', '13 months', 'HTTP'],
                  ['_ga_*', 'google.com', COOKIE_GOOGLE, 'Maintains the GA4 session state', '13 months', 'HTTP'],
                  ['_gid', 'google.com', COOKIE_GOOGLE, 'Distinguishes users (data deleted after 24 hours)', '24 hours', 'HTTP'],
                ],
              },
              {
                nume: 'Marketing',
                descriere: 'Google Ads, Meta Pixel, TikTok Pixel, LinkedIn Insight Tag and the ChatGPT Ads pixel (OpenAI): measuring campaign conversions. Consent required.',
                cookies: [
                  ['_gcl_au', 'google.com', COOKIE_GOOGLE, 'Google Ads: stores conversion experiments', '90 days', 'HTTP'],
                  ['IDE', 'doubleclick.net', COOKIE_GOOGLE, 'Google Ads: remarketing and conversion measurement', '13 months', 'HTTP'],
                  ['_fbp', 'facebook.com', COOKIE_META, 'Meta Pixel: identifying the browser to measure Facebook and Instagram campaigns', '90 days', 'HTTP'],
                  ['_fbc', 'facebook.com', COOKIE_META, 'Meta Pixel: stores the click identifier when you arrive from a Meta ad', '90 days', 'HTTP'],
                  ['fr', 'facebook.com', COOKIE_META, 'Meta: delivering and measuring ads', '90 days', 'HTTP'],
                  ['_ttp', 'tiktok.com', COOKIE_TIKTOK, 'TikTok Pixel: measuring conversions from TikTok campaigns', '13 months', 'HTTP'],
                  ['tt_webid_v2', 'tiktok.com', COOKIE_TIKTOK, 'TikTok Pixel: identifying the visitor for attribution', '1 year', 'HTTP'],
                  ['li_sugr', 'linkedin.com', COOKIE_LINKEDIN, 'LinkedIn Insight Tag: identifying the browser to measure LinkedIn campaigns', '3 months', 'HTTP'],
                  ['bcookie', 'linkedin.com', COOKIE_LINKEDIN, 'LinkedIn: browser identifier', '1 year', 'HTTP'],
                  ['lidc', 'linkedin.com', COOKIE_LINKEDIN, 'LinkedIn: selecting the data centre that handles requests', '24 hours', 'HTTP'],
                  ['UserMatchHistory', 'linkedin.com', COOKIE_LINKEDIN, 'LinkedIn Ads: synchronising the advertising identifier', '30 days', 'HTTP'],
                  ['AnalyticsSyncHistory', 'linkedin.com', COOKIE_LINKEDIN, 'LinkedIn: time of the last synchronisation of measurement data', '30 days', 'HTTP'],
                  ['li_fat_id', 'linkedin.com', COOKIE_LINKEDIN, 'LinkedIn Ads: attributing conversions from LinkedIn campaigns', '30 days', 'HTTP'],
                  ['__oppref', 'openai.com', COOKIE_OPENAI, 'ChatGPT Ads: stores the reference of a click on a ChatGPT ad, for conversion attribution', '30 days', 'HTTP'],
                  ['__obref', 'openai.com', COOKIE_OPENAI, 'ChatGPT Ads: browser identifier for campaign measurement', '1 year', 'HTTP'],
                  ['__oaiq_consent', 'openai.com', COOKIE_OPENAI, 'ChatGPT Ads: remembers your consent choice for the pixel', '30 days', 'HTTP'],
                ],
              },
              {
                nume: 'Google Tag Manager',
                descriere: 'Management of tracking tags.',
                cookies: [['_gtm_*', 'googletagmanager.com', COOKIE_GOOGLE, 'Google Tag Manager: tag management', 'Session', 'HTTP']],
              },
            ],
          },
        ],
      },
      {
        scurt: 'Your consent and control',
        titlu: 'Consent and control over your preferences',
        continut: [
          { h3: '5.1. The cookie banner' },
          {
            p: 'On your first visit to the inovex.ro website, we show you a banner that lets you choose which cookies you accept. You have three options:',
          },
          {
            ol: [
              '**‘Accept all’:** you accept all categories of cookies',
              '**‘Reject all’:** you accept only strictly necessary cookies',
              '**‘Customise’:** you choose each category individually',
            ],
          },
          {
            p: 'Your choice is remembered for 12 months. You can change your preferences at any time using the ‘Cookie settings’ button in the website footer.',
          },
          { h3: '5.2. Withdrawing your consent' },
          { p: 'You can withdraw or change your consent at any time:' },
          {
            ul: [
              'Using the ‘Cookie settings’ button in the website footer',
              'In your browser settings (instructions below)',
              'By emailing [contact@inovex.ro](mailto:contact@inovex.ro)',
            ],
          },
          {
            p: 'Withdrawing your consent does not affect the lawfulness of processing based on consent before its withdrawal.',
          },
          { h3: '5.3. Control through your browser settings' },
          { p: 'You can manage or disable cookies directly in your browser:' },
          {
            ul: [
              '**Google Chrome:** Settings › Privacy and security › Third-party cookies',
              '**Mozilla Firefox:** Settings › Privacy & Security › Cookies and Site Data',
              '**Safari:** Settings › Privacy › Manage Website Data',
              '**Microsoft Edge:** Settings › Cookies and site permissions',
            ],
          },
          { p: 'Please note that disabling essential cookies may affect how the website works.' },
          { h3: '5.4. Opting out on each platform' },
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
        scurt: 'Data transfers',
        titlu: 'International transfers through cookies',
        continut: [
          {
            p: 'Some cookies are set by providers based in the United States of America (Google LLC, TikTok Inc., OpenAI) or by providers that may transfer data to the USA (Meta, LinkedIn). Data transfers are carried out with appropriate safeguards, in accordance with the GDPR:',
          },
          {
            ul: [
              '**Google LLC:** covered by the Standard Contractual Clauses (SCCs) adopted by the European Commission, available at [privacy.google.com/businesses/processorterms](https://privacy.google.com/businesses/processorterms/)',
              '**TikTok Inc.:** covered by Standard Contractual Clauses (SCCs), as set out in TikTok’s Privacy Policy',
              '**LinkedIn Ireland Unlimited Company:** data may be transferred to LinkedIn Corporation (USA); this transfer is covered by Standard Contractual Clauses (SCCs)',
              '**Meta Platforms Ireland Limited:** data may be transferred to Meta Platforms, Inc. (USA); this transfer is covered by Standard Contractual Clauses (SCCs)',
              '**OpenAI:** data may be transferred to the USA; this transfer is covered by Standard Contractual Clauses (SCCs)',
            ],
          },
        ],
      },
      {
        scurt: 'Policy updates',
        titlu: 'Updates to this policy',
        continut: [
          {
            p: 'This Cookie Policy may be updated from time to time to reflect changes in the cookies we use or in legal requirements.',
          },
          {
            p: 'The date of the last update is shown at the top of this document. Significant changes will be communicated through the cookie banner or by a prominent notice on the website.',
          },
          { p: 'Please check this page regularly to stay informed about our cookie practices.' },
        ],
      },
      {
        scurt: 'Contact',
        titlu: 'Contact',
        continut: [
          { p: 'For questions about the use of cookies on inovex.ro:' },
          {
            ul: [
              '**Email:** [contact@inovex.ro](mailto:contact@inovex.ro) (subject: ‘Cookies – [your question]’)',
              '**Phone:** [+40 750 456 096](tel:+40750456096) (Monday–Friday, 09:00–18:00, Romanian time)',
            ],
          },
          {
            p: 'Competent authority for complaints about cookies: the Romanian National Supervisory Authority for Personal Data Processing (ANSPDCP), [www.dataprotection.ro](https://www.dataprotection.ro).',
          },
          {
            p: 'This Cookie Policy has been drafted in accordance with Law no. 506/2004 and Regulation (EU) 2016/679 (GDPR), as in force on 7 November 2026.',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  termeni: {
    meta: {
      titlu: 'Terms and conditions',
      descriere:
        'Terms and conditions for the use of Inovex services and the inovex.ro website, operated by VOID SFT GAMES SRL, Tax ID RO43474393. Governing law: Romanian law.',
    },
    titlu: 'Terms and conditions',
    intro:
      'Please read this document carefully before using the Inovex services or website. By accessing the website or contracting for any service, you agree to these terms.',
    actualizat: '6 November 2026',
    data: '2026-11-06',
    sectiuni: [
      {
        scurt: 'Information about the operator',
        titlu: 'Information about the operator',
        continut: [
          {
            p: 'The inovex.ro website is operated by VOID SFT GAMES SRL, a limited liability company incorporated under Romanian law, with its registered office in Gorj County, unique registration code (CUI) RO43474393, registered with the Trade Register.',
          },
          {
            ul: [
              '**Trading name:** Inovex',
              '**Legal entity:** VOID SFT GAMES SRL',
              '**Tax ID (CUI):** RO43474393',
              '**Registered office:** Târgu Jiu, Gorj County, Romania',
              '**Email:** [contact@inovex.ro](mailto:contact@inovex.ro)',
              '**Phone:** [+40 750 456 096](tel:+40750456096)',
              '**Website:** [https://inovex.ro](https://inovex.ro)',
            ],
          },
          {
            p: 'Inovex provides website creation and web development services, including online stores, business websites, web and mobile applications, CRM/ERP/CMS systems and the implementation of artificial intelligence automation, for individuals and legal entities.',
          },
        ],
      },
      {
        scurt: 'Acceptance of the terms',
        titlu: 'Acceptance of the terms',
        continut: [
          {
            p: 'By accessing and using the inovex.ro website or by contracting for any service offered by VOID SFT GAMES SRL under the Inovex brand, you confirm that you have read and understood these Terms and Conditions and agree to comply with them in their entirety.',
          },
          {
            p: 'If you do not agree with any of the provisions of this document, please do not use the website or contract for our services.',
          },
          {
            p: 'This document constitutes a legally valid agreement between you (an individual or a legal entity, hereinafter the ‘Client’) and VOID SFT GAMES SRL (hereinafter ‘Inovex’ or the ‘Provider’).',
          },
          {
            p: 'Inovex reserves the right to amend these terms at any time, notifying users by publishing the updated version on the website. Continued use of the services after the changes have been published constitutes acceptance of the new terms.',
          },
        ],
      },
      {
        scurt: 'Services offered',
        titlu: 'Services offered',
        continut: [
          { p: 'Inovex offers, without limitation, the following categories of services:' },
          {
            ol: [
              'Creation of turnkey online stores, including custom design, integration with payment processors, courier companies and invoicing software, as well as SEO;',
              'Creation of business websites, including custom design, a content management system and search engine optimisation;',
              'Development of web applications and SaaS platforms, including authentication systems, dashboards, APIs and cloud infrastructure;',
              'Implementation of custom CRM, CMS and ERP systems, tailored to the Client’s internal processes;',
              'Development of mobile applications for the iOS and Android platforms;',
              'Implementation of artificial intelligence automation, including chatbots, automated document processing and automation workflows;',
              'Digital products available in the Inovex Marketplace, including templates and pre-configured web solutions.',
            ],
          },
          {
            p: 'All services are provided under an individual contract signed with each Client, which sets out the technical specifications, delivery deadlines and payment terms applicable to the project concerned. This document supplements the individual contract and does not replace it.',
          },
        ],
      },
      {
        scurt: 'Prices and payment methods',
        titlu: 'Prices and payment methods',
        continut: [
          {
            p: '**4.1.** Prices for custom projects are set individually, according to their complexity, the workload and the agreed technical specifications, as every project is unique and requires an individual assessment. For services with a price shown on the website (for example, Video Motion Design) and for Marketplace products, the price shown at the time of the order applies.',
          },
          { p: '**4.2.** Accepted payment methods:' },
          {
            ol: [
              'Full payment in advance, before work begins;',
              'Payment in instalments: an advance payment of at least 20% (twenty per cent) of the total contract value, paid before work begins, with the balance payable on final delivery of the project, before the access details are handed over.',
            ],
          },
          {
            p: '**4.3.** Invoices issued by Inovex are payable within 5 (five) working days of the date of issue, unless otherwise provided in the individual contract.',
          },
          {
            p: '**4.4.** Failure to pay invoices on time incurs late-payment penalties of 0.1% (zero point one per cent) of the unpaid invoice amount for each day of delay, starting from the first day after the due date.',
          },
          {
            p: '**4.5.** Inovex is entitled to suspend work if invoices are not paid on time, without being held liable for any loss or damage resulting from such suspension.',
          },
          {
            p: '**4.6.** The final deliverables, including account access details, source code and documentation, are handed over only after all amounts due have been paid in full.',
          },
          {
            p: '**4.7.** Prices displayed or communicated are exclusive of VAT, unless otherwise specified. VAT is applied in accordance with the tax legislation in force.',
          },
        ],
      },
      {
        scurt: 'Delivery and deadlines',
        titlu: 'Delivery and deadlines',
        continut: [
          {
            p: '**5.1.** Delivery deadlines are set in the individual contract signed with each Client and start to run from the date on which the advance payment is made and all the necessary materials have been received from the Client (texts, images, access details, technical specifications, etc.).',
          },
          {
            p: '**5.2.** Inovex makes all reasonable efforts to meet the agreed delivery deadlines. However, deadlines may be affected by:',
          },
          {
            ol: [
              'Delays by the Client in providing the materials or feedback requested;',
              'Changes to the technical specifications requested by the Client during the project;',
              'External factors beyond Inovex’s control (cases of force majeure, problems with third-party suppliers, etc.).',
            ],
          },
          {
            p: '**5.3.** Inovex will notify the Client in good time of any foreseeable delay and will propose a reasonable new delivery date.',
          },
          {
            p: '**5.4.** The Client has a review and approval period of at least 5 (five) working days for each deliverable received. Failure to respond within the agreed review period constitutes tacit acceptance of the deliverable concerned.',
          },
          {
            p: '**5.5.** Final delivery is deemed to have taken place on the date on which the access details and the complete documentation are handed over, after the contract value has been paid in full.',
          },
        ],
      },
      {
        scurt: 'Post-launch warranty',
        titlu: 'Post-launch warranty',
        continut: [
          {
            p: '**6.1.** Inovex provides a warranty period of 30 (thirty) calendar days from the date of final delivery of the project, during which it remedies free of charge any defect or malfunction found that is not caused by:',
          },
          {
            ol: [
              'Changes made by the Client or by third parties to the source code or the system configuration without Inovex’s prior consent;',
              'Updates to third-party platforms (WordPress, WooCommerce, operating systems, browsers) made after final delivery;',
              'Incorrect use of the system by the Client or its employees;',
              'Cyber attacks, malware or unauthorised access to the Client’s systems;',
              'Problems with the infrastructure of the hosting provider chosen by the Client.',
            ],
          },
          {
            p: '**6.2.** Warranty claims must be sent to [contact@inovex.ro](mailto:contact@inovex.ro), with a detailed description of the problem found. Inovex will respond within a maximum of 2 (two) working days and will remedy the problem within the timeframe communicated.',
          },
          {
            p: '**6.3.** The warranty covers only the functionality agreed in the original contract. Requests for new functionality or for changes to existing functionality fall outside the scope of the warranty and are treated as new projects.',
          },
          {
            p: '**6.4.** After the warranty period has expired, maintenance and support services are available for a fee, under a separate maintenance contract.',
          },
        ],
      },
      {
        scurt: 'Intellectual property',
        titlu: 'Intellectual property and copyright',
        continut: [
          {
            p: '**7.1.** Upon full payment of the contract value and final delivery of the project, the Client acquires full rights of use over all the elements created by Inovex as part of the project, including the graphic design, source code, database structure and technical documentation.',
          },
          {
            p: '**7.2.** The transfer of rights provided for in clause 7.1 applies only to the elements created by Inovex specifically for the Client’s project. It does not include:',
          },
          {
            ol: [
              'The open-source libraries, frameworks and software components used, which remain subject to their own licences (MIT, GPL, Apache, etc.);',
              'Third-party themes, plugins or components purchased separately, which remain subject to the licences of their respective licensors;',
              'Graphic elements or photographs purchased from third parties (stock image libraries, font licences, etc.), which remain subject to the licensing terms of the respective providers.',
            ],
          },
          {
            p: '**7.3.** Inovex reserves the right to showcase completed projects in its own portfolio (website, social media, marketing materials), unless the Client requests confidentiality regarding them in writing before the contract is signed.',
          },
          {
            p: '**7.4.** The Client warrants that the materials provided to Inovex for the project (texts, images, logos, brand elements) do not infringe the copyright of third parties. Any liability arising from the use of materials supplied by the Client without the legal right to do so lies solely with the Client.',
          },
          {
            p: '**7.5.** The reproduction, distribution or modification of the content of the inovex.ro website (texts, images, logo, design) without the prior written consent of VOID SFT GAMES SRL is prohibited.',
          },
        ],
      },
      {
        scurt: 'Confidentiality and access details',
        titlu: 'Confidentiality and access details',
        continut: [
          {
            p: '**8.1.** While providing the services, Inovex may be given the Client’s access details (hosting, domain, email accounts, social media, payment processors, etc.). These details are treated as strictly confidential and are used solely for the purpose of carrying out the contracted project.',
          },
          {
            p: '**8.2.** On completion of the project, Inovex hands over to the Client all access details created or managed as part of the project. The Client is responsible for changing the passwords immediately after handover.',
          },
          {
            p: '**8.3.** Inovex does not store or archive access details after the project has been completed and the details have been handed over, and cannot be held liable for security incidents resulting from the Client’s failure to change the passwords after handover.',
          },
          {
            p: '**8.4.** Both parties undertake to keep confidential the commercial, technical and financial information of the other party that comes to their knowledge during the collaboration, both for the term of the contract and for a period of 2 (two) years after its termination.',
          },
          {
            p: '**8.5.** Personal data is processed in accordance with the [Privacy Policy](/politica-de-confidentialitate), which forms an integral part of this document.',
          },
        ],
      },
      {
        scurt: 'Termination of the contract',
        titlu: 'Termination of the contract',
        continut: [
          { p: '**9.1.** The Client may terminate the contract at any time by giving Inovex written notice. In this case:' },
          {
            ol: [
              'The advance payment is retained in full by Inovex as compensation for the work performed and the resources allocated to the project;',
              'If the value of the work performed exceeds the advance paid, the Client must pay for the work carried out up to the date of termination, calculated in proportion to the project’s stage of completion;',
              'Inovex hands over to the Client all materials and deliverables produced up to the date of termination, in the state they are in at that time.',
            ],
          },
          {
            p: '**9.2.** Inovex may terminate the contract by giving the Client at least 15 (fifteen) calendar days’ written notice in justified cases (objective impossibility of performance, abusive behaviour by the Client, provision of false information when the contract was concluded). In this case, Inovex refunds the advance paid, less the value of the work already performed.',
          },
          {
            p: '**9.3.** Inovex may terminate the contract without notice and without refunding the advance if the Client requests the creation of content that is illegal, promotes illegal activities, infringes the rights of third parties or is contrary to public morals.',
          },
          { p: '**9.4.** Termination of the contract does not affect payment obligations that fell due before termination.' },
        ],
      },
      {
        scurt: 'Limitation of liability',
        titlu: 'Limitation of liability',
        continut: [
          {
            p: '**10.1.** Inovex is liable for direct loss or damage caused to the Client by the non-performance or improper performance of its contractual obligations, up to the total value of the contract concerned.',
          },
          { p: '**10.2.** Inovex is not liable for:' },
          {
            ol: [
              'Indirect loss or damage, loss of profit, loss of data or loss of business opportunities suffered by the Client;',
              'Faults in, or unavailability of, the third-party services on which the functioning of the project depends (hosting, email services, payment processors, third-party APIs, CDN, etc.);',
              'Loss or damage resulting from improper use of the delivered project by the Client or its employees;',
              'Loss of data caused by a lack of backups or by improper configuration of the infrastructure by the Client;',
              'Cyber attacks, security vulnerabilities or unauthorised access to the Client’s systems occurring after final delivery and the handover of access details;',
              'Changes in legislation or in the policies of third-party platforms (Google, Meta, Apple, Google Play, etc.) that affect the functioning of the delivered project.',
            ],
          },
          {
            p: '**10.3.** The inovex.ro website may contain links to third-party websites. Inovex is not responsible for the content, privacy policies or practices of these websites.',
          },
          {
            p: '**10.4.** Inovex makes reasonable efforts to keep the inovex.ro website available and functional, but does not guarantee its uninterrupted availability.',
          },
        ],
      },
      {
        scurt: 'Force majeure',
        titlu: 'Force majeure',
        continut: [
          {
            p: '**11.1.** Neither party is liable for non-performance or delayed performance of its contractual obligations if this is caused by a force majeure event, as defined in the Romanian Civil Code.',
          },
          {
            p: '**11.2.** Force majeure includes, without limitation: natural disasters, pandemics declared by the competent authorities, armed conflicts, acts of terrorism, general strikes, national or regional interruptions to the energy supply or to internet services, and acts of public authorities that prevent performance of the contract.',
          },
          {
            p: '**11.3.** The party affected by force majeure must notify the other party in writing within a maximum of 5 (five) calendar days of the event occurring, stating its nature and estimated duration.',
          },
          {
            p: '**11.4.** If the force majeure event lasts for more than 60 (sixty) calendar days, either party may terminate the contract, with a proportional refund of the amounts paid for services not performed.',
          },
        ],
      },
      {
        scurt: 'Inovex Marketplace',
        titlu: 'Inovex Marketplace',
        continut: [
          {
            p: '**12.1.** The Inovex Marketplace offers pre-configured digital products (website and online store templates), available for purchase and customisation.',
          },
          {
            p: '**12.2.** Marketplace products are sold under a licence of use. On purchase, the buyer acquires the right to use the product for a single project/domain, unless otherwise specified in the product description.',
          },
          {
            p: '**12.3.** Marketplace products are provided ‘as is’, with customisation to the extent specified in the product description. The 30-day warranty also applies to Marketplace products, covering the correct operation of the features described.',
          },
          {
            p: '**12.4.** Products marked ‘Exclusiv’ (exclusive) or sold under an exclusive licence are sold only once. After the sale, the product is marked as unavailable and can no longer be purchased by other buyers.',
          },
          {
            p: '**12.5.** Returns are not accepted for digital products from the Marketplace, under the exception provided for in Art. 16(m) of Government Emergency Ordinance (OUG) no. 34/2014 (which transposes Art. 16(m) of Directive 2011/83/EU) for digital content not supplied on a tangible medium, where performance has begun with the consumer’s prior consent.',
          },
          {
            p: '**12.6.** Marketplace prices include VAT, where applicable, and are displayed in EUR. Invoicing is carried out in RON, at the National Bank of Romania (BNR) exchange rate on the invoice date.',
          },
        ],
      },
      {
        scurt: 'Dispute resolution',
        titlu: 'Dispute resolution',
        continut: [
          { p: '**13.1.** This document is governed by, and interpreted in accordance with, the laws of Romania.' },
          {
            p: '**13.2.** Any dispute, controversy or claim arising out of or in connection with this document or the Inovex services will be settled amicably as a priority, through direct negotiation between the parties.',
          },
          {
            p: '**13.3.** The period for amicable settlement is 30 (thirty) calendar days from the date on which either party gives written notice of the dispute.',
          },
          {
            p: '**13.4.** If amicable settlement is not possible within the period set out in clause 13.3, the dispute will be settled by the competent courts within the jurisdiction of the Gorj County Court (Tribunalul Gorj), based in Târgu Jiu, Gorj County, Romania.',
          },
          {
            p: '**13.5.** Consumers who are natural persons may also use alternative dispute resolution (ADR) through the platform of the Romanian National Authority for Consumer Protection, available at [https://reclamatiisal.anpc.ro](https://reclamatiisal.anpc.ro).',
          },
          {
            p: '**13.6.** Consumers can lodge complaints with the Romanian National Authority for Consumer Protection (ANPC) at [https://anpc.ro](https://anpc.ro) or by phone on +40 21 9551.',
          },
        ],
      },
      {
        scurt: 'Final provisions',
        titlu: 'Final provisions',
        continut: [
          {
            p: '**14.1.** If any provision of this document is declared null and void or unenforceable, the remaining provisions remain valid and continue to have legal effect.',
          },
          { p: '**14.2.** Failure by Inovex to exercise any right provided for in this document does not constitute a waiver of that right.' },
          {
            p: '**14.3.** This document, together with the signed individual contract and the Privacy Policy available on the website, constitutes the entire agreement between the parties regarding its subject matter and supersedes any prior negotiations, understandings or agreements.',
          },
          {
            p: '**14.4.** All official communications between the parties must be made in writing, by email to the addresses stated in the individual contract, or by registered letter with acknowledgement of receipt.',
          },
          { p: '**14.5.** This document has been drafted in accordance with the Romanian legislation in force on 6 November 2026.' },
        ],
      },
    ],
  },
};
