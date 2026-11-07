import type { TextLegal } from './tipuri';

/* Paginile legale in franceza (2026-11-06): traducerea textului din ro.ts, care e versiunea care se aplica.
   Tipografie franceza, ca pe restul site-ului: spatiul ingust care nu se rupe (U+202F) inaintea semnelor
   de punctuatie duble si in interiorul ghilimelelor. Adresele interne raman cele romanesti (le traduce cale()). */

const COOKIE_GOOGLE = 'https://policies.google.com/privacy';
const COOKIE_TIKTOK = 'https://www.tiktok.com/legal/page/global/privacy-policy';
const COOKIE_LINKEDIN = 'https://www.linkedin.com/legal/cookie-policy';
const COOKIE_META = 'https://www.facebook.com/privacy/policies/cookies/';
const COOKIE_OPENAI = 'https://openai.com/policies/privacy-policy/';

export const fr: TextLegal = {
  ui: {
    acasa: 'Accueil',
    navigare: 'Fil d’Ariane',
    cuprins: 'Sommaire',
    sectiuni: '{n} sections',
    actualizat: 'Dernière mise à jour',
    traducere: 'Ceci est une traduction de l’original roumain. En cas de divergence, la [version roumaine](@ro) fait foi.',
    ancora: 'section',
    capTabel: ['Nom du cookie', 'Fournisseur', 'Finalité', 'Durée', 'Type'],
    telefon: 'Téléphone',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  confidentialitate: {
    meta: {
      titlu: 'Politique de confidentialité',
      descriere:
        'Politique de confidentialité d’Inovex (VOID SFT GAMES SRL, CUI RO43474393), conforme au RGPD et au droit roumain. Découvrez comment nous protégeons vos données.',
    },
    titlu: 'Politique de confidentialité',
    intro:
      'La confidentialité de vos données est une priorité pour Inovex. Ce document explique en toute transparence quelles données nous collectons, pourquoi et comment nous les protégeons, conformément au Règlement général sur la protection des données (RGPD).',
    actualizat: '7 novembre 2026',
    data: '2026-11-07',
    rezumat: {
      titlu: 'Résumé : les points clés',
      randuri: [
        ['Responsable du traitement', 'VOID SFT GAMES SRL (Inovex)'],
        ['Principales bases juridiques', 'Contrat, consentement, intérêt légitime'],
        ['Données collectées', 'Nom, e-mail, téléphone, informations sur le projet'],
        ['Finalité principale', 'Prestation des services contractés'],
        ['Durée de conservation', '2 ans (formulaires), 5 à 10 ans (contrats)'],
        ['Transferts internationaux', 'États-Unis (par exemple Google, Vercel, Supabase, Meta, OpenAI), avec clauses contractuelles types (CCT)'],
        ['Autorité de contrôle', 'ANSPDCP (autorité roumaine de protection des données), [dataprotection.ro](https://www.dataprotection.ro)'],
        ['Contact RGPD', '[contact@inovex.ro](mailto:contact@inovex.ro)'],
      ],
      nota: 'Vous trouverez tous les détails dans les sections ci-dessous.',
    },
    sectiuni: [
      {
        scurt: 'Qui nous sommes et comment nous contacter',
        titlu: 'Identité et coordonnées du responsable du traitement',
        continut: [
          { p: 'Le responsable du traitement des données à caractère personnel pour le site inovex.ro et les services associés est :' },
          {
            ul: [
              '**Raison sociale :** VOID SFT GAMES SRL',
              '**Nom commercial :** Inovex',
              '**Identifiant fiscal (CUI) :** RO43474393',
              '**Siège social :** Târgu Jiu, département de Gorj, Roumanie',
              '**E-mail :** [contact@inovex.ro](mailto:contact@inovex.ro)',
              '**Téléphone :** [+40 750 456 096](tel:+40750456096)',
              '**Site web :** [https://inovex.ro](https://inovex.ro)',
            ],
          },
          {
            p: 'Le délégué à la protection des données (DPO) peut être contacté à l’adresse e-mail [contact@inovex.ro](mailto:contact@inovex.ro), avec l’objet « RGPD – [votre demande] ».',
          },
          {
            p: 'Nous répondrons à toute demande relative à vos données personnelles dans un délai maximal de 30 (trente) jours calendaires à compter de sa réception, conformément à l’article 12 du RGPD.',
          },
        ],
      },
      {
        scurt: 'Les données que nous collectons et leur origine',
        titlu: 'Catégories de données à caractère personnel collectées',
        continut: [
          { p: 'Inovex collecte des données à caractère personnel dans les contextes suivants :' },
          { h3: '2.1. Données collectées via les formulaires du site' },
          { p: 'Lorsque vous remplissez les formulaires de contact, de configuration de devis ou de demande de services, nous collectons :' },
          {
            ul: [
              'Nom et prénom (ou raison sociale de l’entreprise)',
              'Adresse e-mail',
              'Numéro de téléphone',
              'Informations sur le projet ou le service souhaité',
              'Données saisies dans les configurateurs de services (secteur d’activité, type d’entité, spécifications du projet) et fichiers que vous choisissez de joindre (par exemple, un plan ou une maquette de votre application)',
            ],
          },
          { p: 'Vous fournissez ces données volontairement ; elles sont nécessaires pour que nous puissions vous répondre et vous fournir les services demandés.' },
          { h3: '2.2. Données collectées via la Marketplace' },
          { p: 'Lors de l’achat d’un produit sur la Marketplace Inovex, nous collectons :' },
          {
            ul: [
              'Nom et prénom ou raison sociale de l’entreprise',
              'Adresse e-mail, pour l’envoi de la confirmation',
              'Données de facturation (conformément aux obligations fiscales)',
            ],
          },
          { h3: '2.3. Données collectées via la section Învață gratuit (ressources d’apprentissage gratuites)' },
          { p: 'Lors du téléchargement de ressources gratuites (PDF, modèles), nous collectons :' },
          { ul: ['Prénom', 'Adresse e-mail', 'Votre consentement RGPD, donné en cochant la case prévue à cet effet'] },
          { h3: '2.4. Données collectées automatiquement lors de l’utilisation du site' },
          { p: 'Du simple fait de votre accès au site inovex.ro, nos systèmes collectent automatiquement certaines données techniques :' },
          {
            ul: [
              'Adresse IP (anonymisée via Google Analytics 4)',
              'Type et version du navigateur',
              'Système d’exploitation',
              'Pages consultées et durée de la visite',
              'Source de la visite (la manière dont vous avez accédé au site)',
              'Appareil utilisé (ordinateur, mobile, tablette)',
              'Le pays depuis lequel vous consultez le site (déduit de votre adresse IP par notre hébergeur, Vercel) et la langue de votre navigateur, utilisés uniquement pour afficher le site dans la bonne langue ; nous ne les conservons pas',
            ],
          },
          {
            p: 'Ces données sont collectées au moyen de cookies et d’outils d’analyse web (Google Analytics 4, Google Tag Manager), décrits en détail dans la [Politique de cookies](/politica-cookies).',
          },
          { h3: '2.5. Données collectées dans le cadre de la relation contractuelle' },
          { p: 'Pour les clients qui souscrivent des services Inovex, nous collectons également :' },
          {
            ul: [
              'Les données d’identification de la personne physique ou morale',
              'Les données de facturation et de paiement',
              'Les données d’accès aux systèmes du client (hébergement, nom de domaine, etc.), nécessaires à la prestation des services contractés',
              'La correspondance par e-mail pendant la durée du projet',
            ],
          },
          { h3: '2.6. Données que nous ne collectons pas' },
          {
            p: 'Inovex ne collecte ni ne traite de catégories particulières de données à caractère personnel au sens de l’article 9 du RGPD (données révélant l’origine raciale ou ethnique, les opinions politiques ou les convictions religieuses, données génétiques, données biométriques, données concernant la santé, la vie sexuelle ou l’orientation sexuelle).',
          },
          { p: 'Nous ne collectons pas de données concernant des mineurs de moins de 16 ans. Si vous êtes mineur, nous vous prions de ne pas remplir les formulaires du site sans l’accord de vos parents.' },
        ],
      },
      {
        scurt: 'Pourquoi nous traitons vos données',
        titlu: 'Finalités et bases juridiques du traitement',
        continut: [
          { p: 'Nous traitons vos données à caractère personnel sur les bases juridiques suivantes, conformément à l’article 6 du RGPD :' },
          { h3: '3.1. Exécution d’un contrat ou de mesures précontractuelles (art. 6, par. 1, point b), RGPD)' },
          { p: 'Nous traitons vos données pour :' },
          {
            ul: [
              'Répondre à vos demandes de devis et de conseil',
              'Signer et exécuter les contrats de prestation de services',
              'Facturer les services fournis',
              'Communiquer avec vous pendant la durée du projet',
              'Livrer et remettre les projets finalisés',
            ],
          },
          { h3: '3.2. Votre consentement (art. 6, par. 1, point a), RGPD)' },
          { p: 'Avec votre consentement explicite, recueilli lorsque vous cochez la case RGPD des formulaires, nous traitons vos données pour :' },
          {
            ul: [
              'Vous permettre de télécharger les ressources gratuites de la section Învață gratuit',
              'Vous envoyer des informations sur les services Inovex',
              'Mesurer la fréquentation du site (Google Analytics 4) et nos campagnes publicitaires (Google Ads, Meta, TikTok, LinkedIn, ChatGPT Ads), au moyen des cookies analytiques et marketing décrits dans la [Politique de cookies](/politica-cookies)',
            ],
          },
          {
            p: 'Vous pouvez retirer votre consentement à tout moment, sans frais, en envoyant un e-mail à [contact@inovex.ro](mailto:contact@inovex.ro) avec l’objet « Retrait du consentement ». Le retrait du consentement ne compromet pas la licéité du traitement fondé sur le consentement effectué avant ce retrait.',
          },
          { h3: '3.3. Intérêt légitime du responsable du traitement (art. 6, par. 1, point f), RGPD)' },
          { p: 'Sur la base de notre intérêt légitime, nous traitons des données pour :' },
          {
            ul: [
              'Améliorer nos services et l’expérience sur le site',
              'Assurer la sécurité du site et prévenir la fraude',
              'Défendre nos droits en cas de litige',
            ],
          },
          { h3: '3.4. Obligation légale (art. 6, par. 1, point c), RGPD)' },
          { p: 'Nous traitons des données pour respecter nos obligations légales, notamment :' },
          {
            ul: [
              'L’émission et l’archivage des factures conformément au Code fiscal roumain',
              'Le respect des obligations découlant de la loi roumaine sur la comptabilité n° 82/1991',
              'La réponse aux demandes des autorités compétentes',
            ],
          },
        ],
      },
      {
        scurt: 'Avec qui nous partageons vos données',
        titlu: 'Destinataires des données à caractère personnel',
        continut: [
          { p: 'Nous ne vendons ni ne commercialisons vos données à caractère personnel auprès d’aucun tiers. Les données peuvent être consultées ou traitées par :' },
          { h3: '4.1. Prestataires de services techniques (sous-traitants)' },
          {
            ul: [
              '**Vercel Inc.** (États-Unis) : infrastructure d’hébergement du site inovex.ro ; transferts encadrés par les clauses contractuelles types (CCT) prévues par le RGPD',
              '**Supabase Inc.** (États-Unis) : base de données du site (messages des formulaires, demandes de devis et suivi des clients) et stockage des fichiers ; transferts encadrés par les CCT',
              '**Stripe Payments Europe Ltd.** (Irlande) : traitement des paiements en ligne par carte (par exemple, les commandes Video Motion Design) ; Inovex ne reçoit ni ne conserve les données de votre carte ; les données peuvent être transférées à Stripe, Inc. (États-Unis), transfert encadré par les CCT',
              '**Google LLC** (États-Unis) : Google Analytics 4 (données anonymisées), Google Tag Manager, Google Ads ; transferts encadrés par les CCT',
              '**Meta Platforms Ireland Limited** (Irlande) : Meta Pixel, pour la mesure des campagnes Facebook et Instagram Ads ; les données peuvent être transférées à Meta Platforms, Inc. (États-Unis), transfert encadré par les CCT',
              '**TikTok** (TikTok Pixel) : mesure des campagnes TikTok Ads ; les données peuvent être transférées hors de l’Espace économique européen, transfert encadré par les CCT',
              '**LinkedIn Ireland Unlimited Company** (Irlande) : LinkedIn Insight Tag, pour la mesure des campagnes LinkedIn Ads ; les données peuvent être transférées à LinkedIn Corporation (États-Unis), transfert encadré par les CCT',
              '**OpenAI** (pixel ChatGPT Ads) : mesure de nos campagnes publicitaires dans ChatGPT ; les données peuvent être transférées aux États-Unis, transfert encadré par les CCT',
              'Le fournisseur d’hébergement cPanel de la messagerie contact@inovex.ro, que nous utilisons aussi pour envoyer les e-mails de confirmation automatiques (serveur situé en Europe)',
            ],
          },
          { h3: '4.2. Autorités publiques' },
          {
            p: 'Les données peuvent être communiquées aux autorités publiques, telles que l’administration fiscale roumaine (ANAF), les juridictions ou les organes de poursuite pénale, exclusivement en vertu d’obligations légales ou de décisions de justice.',
          },
          { h3: '4.3. Partenaires commerciaux' },
          { p: 'Nous ne partageons pas vos données avec des partenaires commerciaux ou des tiers à des fins de marketing sans votre consentement explicite.' },
          { h3: '4.4. Transferts internationaux de données' },
          {
            p: 'Certains prestataires de services sont établis aux États-Unis d’Amérique. Les transferts de données sont effectués moyennant des garanties appropriées, conformément au chapitre V du RGPD (clauses contractuelles types adoptées par la Commission européenne).',
          },
        ],
      },
      {
        scurt: 'Combien de temps nous conservons vos données',
        titlu: 'Durée du traitement et critères de détermination de la durée de conservation',
        continut: [
          { h3: '5.1. Données issues des formulaires (devis, contact, configurateurs)' },
          {
            p: 'Les données issues des formulaires du site sont conservées pendant 2 (deux) ans à compter de leur collecte ou jusqu’au retrait du consentement, lorsqu’aucun contrat n’a été conclu.',
          },
          { h3: '5.2. Données issues de la relation contractuelle' },
          {
            p: 'Les données des clients ayant souscrit des services sont conservées pendant 5 (cinq) ans à compter de la fin du contrat, conformément aux délais de prescription du droit civil roumain, et pendant 10 (dix) ans pour les documents comptables, conformément à la loi roumaine sur la comptabilité n° 82/1991.',
          },
          { h3: '5.3. Données issues de la section Învață gratuit (prospects)' },
          { p: 'Les adresses e-mail collectées lors du téléchargement des ressources gratuites sont conservées pendant 2 (deux) ans ou jusqu’au retrait du consentement.' },
          { h3: '5.4. Données techniques (journaux, adresses IP)' },
          { p: 'Les données techniques collectées automatiquement sont anonymisées ou supprimées dans un délai maximal de 14 (quatorze) mois, conformément aux paramètres de Google Analytics 4.' },
          { h3: '5.5. Données d’accès aux systèmes' },
          {
            p: 'Les données d’accès aux systèmes des clients (mots de passe, identifiants) sont supprimées immédiatement après la remise du projet, conformément à la pratique décrite dans nos [Conditions générales](/termeni-si-conditii).',
          },
        ],
      },
      {
        scurt: 'Vos droits selon le RGPD',
        titlu: 'Droits de la personne concernée',
        continut: [
          { p: 'En tant que personne concernée, vous disposez des droits suivants, garantis par le règlement (UE) 2016/679 :' },
          { h3: '6.1. Droit d’accès (art. 15 RGPD)' },
          {
            p: 'Vous avez le droit d’obtenir la confirmation que des données à caractère personnel vous concernant sont ou ne sont pas traitées et, lorsqu’elles le sont, l’accès à ces données ainsi qu’aux informations relatives à leur traitement.',
          },
          { h3: '6.2. Droit de rectification (art. 16 RGPD)' },
          { p: 'Vous avez le droit d’obtenir la rectification des données inexactes vous concernant ou que les données incomplètes soient complétées.' },
          { h3: '6.3. Droit à l’effacement (« droit à l’oubli ») (art. 17 RGPD)' },
          {
            p: 'Vous avez le droit d’obtenir l’effacement des données vous concernant lorsqu’elles ne sont plus nécessaires au regard de la finalité pour laquelle elles ont été collectées, lorsque vous avez retiré votre consentement ou lorsque les données ont fait l’objet d’un traitement illicite. Ce droit ne s’applique pas lorsque le traitement est nécessaire au respect d’une obligation légale ou à la défense d’un droit en justice.',
          },
          { h3: '6.4. Droit à la limitation du traitement (art. 18 RGPD)' },
          {
            p: 'Vous avez le droit d’obtenir la limitation du traitement de vos données dans certaines circonstances prévues par le RGPD (contestation de l’exactitude des données, traitement illicite, etc.).',
          },
          { h3: '6.5. Droit à la portabilité des données (art. 20 RGPD)' },
          {
            p: 'Vous avez le droit de recevoir les données vous concernant que vous nous avez fournies, dans un format structuré, couramment utilisé et lisible par machine (JSON, CSV, etc.), et de transmettre ces données à un autre responsable du traitement.',
          },
          { h3: '6.6. Droit d’opposition (art. 21 RGPD)' },
          {
            p: 'Vous avez le droit de vous opposer au traitement de vos données fondé sur l’intérêt légitime du responsable du traitement. Inovex cessera le traitement, à moins de démontrer l’existence de motifs légitimes et impérieux qui le justifient.',
          },
          { h3: '6.7. Droit de ne pas faire l’objet d’une décision individuelle automatisée, y compris le profilage (art. 22 RGPD)' },
          {
            p: 'Inovex n’utilise pas de systèmes de prise de décision automatisée ou de profilage produisant des effets juridiques à votre égard ou vous affectant de manière significative.',
          },
          { h3: '6.8. Comment exercer vos droits' },
          {
            p: 'Pour exercer l’un des droits ci-dessus, envoyez une demande écrite à [contact@inovex.ro](mailto:contact@inovex.ro), avec l’objet « Droits RGPD – [type de demande] ».',
          },
          {
            p: 'Nous vous répondrons dans un délai maximal de 30 jours calendaires. Si la demande est complexe ou si nous recevons un grand nombre de demandes, nous pouvons prolonger ce délai de 60 jours supplémentaires, en vous en informant dans les 30 premiers jours.',
          },
          {
            p: 'L’exercice de vos droits est gratuit. Si les demandes sont manifestement infondées ou excessives, nous pouvons exiger le paiement de frais administratifs raisonnables ou refuser d’y donner suite.',
          },
          { h3: '6.9. Droit d’introduire une réclamation auprès de l’autorité de contrôle' },
          { p: 'Vous avez le droit d’introduire une réclamation auprès de l’autorité roumaine de protection des données, l’Autorité nationale de surveillance du traitement des données à caractère personnel (ANSPDCP), dont les coordonnées figurent ci-dessous. Si vous résidez ou travaillez dans un autre pays de l’UE/EEE, vous pouvez également introduire une réclamation auprès de l’autorité de contrôle de ce pays (en France, la CNIL), conformément à l’article 77 du RGPD.' },
          {
            caseta: [
              '**ANSPDCP**',
              'B-dul G-ral. Gheorghe Magheru nr. 28-30, secteur 1, Bucarest',
              'E-mail : [anspdcp@dataprotection.ro](mailto:anspdcp@dataprotection.ro)',
              'Téléphone : +40 31 805 9211',
              'Site web : [www.dataprotection.ro](https://www.dataprotection.ro)',
            ],
          },
        ],
      },
      {
        scurt: 'Cookies et technologies similaires',
        titlu: 'Cookies et technologies de suivi',
        continut: [
          { p: 'Le site inovex.ro utilise des cookies et des technologies similaires pour assurer son bon fonctionnement et analyser le trafic.' },
          { h3: '7.1. Qu’est-ce qu’un cookie ?' },
          {
            p: 'Les cookies sont de petits fichiers texte stockés sur votre appareil lorsque vous accédez à un site web. Ils permettent au site de mémoriser vos préférences et d’analyser la manière dont vous l’utilisez.',
          },
          { h3: '7.2. Types de cookies utilisés' },
          {
            ol: [
              '**Cookies strictement nécessaires :** indispensables au fonctionnement de base du site (session, sécurité CSRF). Ils ne peuvent pas être désactivés.',
              '**Cookies analytiques :** nous utilisons Google Analytics 4 pour l’analyse anonymisée du trafic. Les adresses IP sont anonymisées. Vous pouvez désactiver ces cookies depuis le bandeau de cookies.',
              '**Cookies marketing :** nous utilisons Google Ads, Meta Pixel, TikTok Pixel, LinkedIn Insight Tag et le pixel ChatGPT Ads (OpenAI) pour mesurer l’efficacité de nos campagnes publicitaires. Vous pouvez désactiver ces cookies depuis le bandeau de cookies.',
            ],
          },
          { h3: '7.3. Gestion des cookies' },
          {
            p: 'Lors de votre première visite sur le site, un bandeau de consentement vous informe de l’utilisation des cookies. Vous pouvez accepter tous les cookies, les configurer individuellement ou refuser tous les cookies non essentiels.',
          },
          {
            p: 'Vous pouvez également gérer les cookies directement depuis les paramètres de votre navigateur. La désactivation des cookies peut affecter le fonctionnement de certaines pages du site.',
          },
          { p: 'Des informations détaillées sur chaque cookie utilisé sont disponibles dans la [Politique de cookies](/politica-cookies).' },
        ],
      },
      {
        scurt: 'Sécurité des données',
        titlu: 'Mesures de sécurité mises en œuvre',
        continut: [
          {
            p: 'Inovex met en œuvre des mesures techniques et organisationnelles appropriées pour protéger les données à caractère personnel contre l’accès non autorisé, la modification, la divulgation ou la destruction :',
          },
          {
            ol: [
              'Toutes les communications entre le navigateur et nos serveurs sont chiffrées au moyen du protocole HTTPS, avec un certificat SSL/TLS valide',
              'L’accès à la base de données et au panneau d’administration est restreint et protégé par une authentification avec mot de passe robuste',
              'Les mots de passe des utilisateurs sont stockés exclusivement sous forme chiffrée (hachage + sel), jamais en texte clair',
              'Les serveurs sont hébergés chez des prestataires disposant de certifications de sécurité reconnues (Vercel, qui opère sur l’infrastructure AWS)',
              'Les sauvegardes de la base de données sont réalisées automatiquement et stockées dans des emplacements distincts',
              'L’accès interne aux données personnelles est limité au personnel qui a besoin de ces données pour la prestation des services',
            ],
          },
          { h3: '8.1. Notification en cas d’incident de sécurité' },
          {
            p: 'En cas d’incident de sécurité impliquant des données à caractère personnel et présentant un risque pour les droits et libertés des personnes concernées, Inovex notifiera l’ANSPDCP dans un délai maximal de 72 heures après en avoir pris connaissance, conformément à l’article 33 du RGPD.',
          },
          {
            p: 'Les personnes concernées seront informées dans les meilleurs délais si l’incident présente un risque élevé pour leurs droits et libertés, conformément à l’article 34 du RGPD.',
          },
        ],
      },
      {
        scurt: 'Données des mineurs',
        titlu: 'Protection des données des mineurs',
        continut: [
          {
            p: 'Le site inovex.ro et les services Inovex ne s’adressent pas aux personnes âgées de moins de 16 (seize) ans. Nous ne collectons pas sciemment de données à caractère personnel concernant des mineurs.',
          },
          {
            p: 'Si vous êtes parent ou tuteur légal et que vous constatez que le mineur dont vous avez la charge a fourni des données personnelles sur notre site sans votre consentement, veuillez nous contacter à l’adresse [contact@inovex.ro](mailto:contact@inovex.ro). Nous supprimerons ces données dans les plus brefs délais.',
          },
        ],
      },
      {
        scurt: 'Liens vers des sites tiers',
        titlu: 'Sites tiers et responsabilité',
        continut: [
          {
            p: 'Le site inovex.ro peut contenir des liens vers des sites web exploités par des tiers (partenaires, clients, ressources externes). Inovex n’est pas responsable des pratiques de ces sites en matière de confidentialité et ne contrôle pas la manière dont ils collectent ou utilisent vos données personnelles.',
          },
          { p: 'Nous vous encourageons à lire la politique de confidentialité de tout site tiers que vous visitez au moyen des liens présents sur notre site.' },
        ],
      },
      {
        scurt: 'Modifications de la politique',
        titlu: 'Mise à jour du présent document',
        continut: [
          {
            p: 'Inovex peut mettre à jour périodiquement la présente Politique de confidentialité afin de refléter des évolutions législatives, des changements dans nos pratiques de traitement ou d’autres raisons opérationnelles.',
          },
          {
            p: 'La date de la dernière modification est indiquée au début du document. La poursuite de l’utilisation du site ou de nos services après la publication d’une version mise à jour vaut acceptation des nouvelles dispositions.',
          },
          {
            p: 'En cas de modifications importantes affectant vos droits, nous ferons des efforts raisonnables pour vous en informer par e-mail (si vous nous avez communiqué votre adresse) ou au moyen d’un bandeau bien visible sur le site.',
          },
        ],
      },
      {
        scurt: 'Contact et exercice de vos droits',
        titlu: 'Contact pour toute question relative à la confidentialité',
        continut: [
          { p: 'Pour toute question, demande ou réclamation relative au traitement de vos données à caractère personnel, vous pouvez nous contacter :' },
          { contact: { titlu: 'Nous contacter au sujet du RGPD', subiect: 'RGPD - Ma demande', buton: 'Envoyer une demande RGPD' } },
          {
            p: 'Délai de réponse : 30 (trente) jours calendaires au maximum à compter de la réception de votre demande, conformément à l’article 12, paragraphe 3, du RGPD.',
          },
          {
            p: 'Si notre réponse ne vous satisfait pas ou si vous estimez que vos données sont traitées de manière illicite, vous avez le droit d’introduire une réclamation auprès de l’ANSPDCP ([www.dataprotection.ro](https://www.dataprotection.ro)) ou de saisir les juridictions compétentes.',
          },
          {
            p: 'La présente Politique de confidentialité a été rédigée conformément au règlement (UE) 2016/679 (RGPD) et à la législation roumaine applicable, en vigueur au 7 novembre 2026.',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  cookies: {
    meta: {
      titlu: 'Politique de cookies',
      descriere:
        'Informations sur les cookies utilisés sur inovex.ro et sur la manière de gérer vos préférences : cookies nécessaires, analytiques et marketing.',
    },
    titlu: 'Politique de cookies',
    intro:
      'Cette page explique précisément quels cookies nous utilisons, pourquoi et comment vous pouvez les contrôler. Vous pouvez modifier vos préférences à tout moment depuis le bandeau de cookies ou les paramètres de votre navigateur.',
    actualizat: '7 novembre 2026',
    data: '2026-11-07',
    sectiuni: [
      {
        scurt: 'Qu’est-ce qu’un cookie ?',
        titlu: 'Qu’est-ce qu’un cookie ?',
        continut: [
          {
            p: 'Les cookies sont de petits fichiers texte qu’un site web enregistre sur votre appareil (ordinateur, téléphone, tablette) lorsque vous le consultez. Ils permettent au site de mémoriser vos actions et vos préférences pendant un certain temps, afin que vous n’ayez pas à les saisir de nouveau à chaque visite ou lorsque vous naviguez d’une page à l’autre.',
          },
          {
            p: 'Les cookies ne sont pas des programmes : ils ne peuvent pas exécuter de code, transmettre de virus ni accéder aux informations de votre disque dur. Ils contiennent exclusivement des données que vous avez vous-même fournies ou qui ont été collectées lors de votre utilisation du site.',
          },
          {
            p: 'Outre les cookies proprement dits, nous utilisons également des technologies similaires (local storage, session storage, pixels de suivi, balises web), qui fonctionnent de manière comparable. Le terme « cookies » employé dans le présent document couvre l’ensemble de ces technologies.',
          },
        ],
      },
      {
        scurt: 'Pourquoi nous utilisons des cookies',
        titlu: 'Pourquoi nous utilisons des cookies',
        continut: [
          { p: 'Nous utilisons des cookies et des technologies similaires pour :' },
          {
            ol: [
              'Assurer le bon fonctionnement du site inovex.ro (cookies essentiels)',
              'Comprendre comment les visiteurs utilisent notre site, afin de l’améliorer en continu (cookies analytiques)',
              'Mesurer l’efficacité de nos campagnes publicitaires sur Google Ads, Meta (Facebook et Instagram), TikTok Ads, LinkedIn Ads et ChatGPT Ads (cookies marketing)',
              'Mémoriser vos préférences en matière de cookies pour vos visites ultérieures',
            ],
          },
          {
            p: 'Nous n’utilisons pas de cookies pour vendre des données à des tiers ni pour établir des profils comportementaux à des fins autres que celles mentionnées.',
          },
        ],
      },
      {
        scurt: 'Types de cookies utilisés',
        titlu: 'Types de cookies utilisés sur inovex.ro',
        continut: [
          { p: 'Les cookies sont classés en fonction de leur finalité :' },
          { h3: '3.1. Cookies strictement nécessaires (essentiels)' },
          {
            p: 'Ces cookies sont indispensables au fonctionnement du site et ne peuvent pas être désactivés. Sans eux, le site ne peut pas fonctionner correctement. Ils ne nécessitent pas votre consentement, conformément à l’article 5, paragraphe 3, de la directive ePrivacy, transposée en droit roumain par la loi n° 506/2004.',
          },
          { p: 'Ils ne stockent aucune information permettant de vous identifier personnellement.' },
          { h3: '3.2. Cookies analytiques (statistiques)' },
          {
            p: 'Ces cookies nous aident à comprendre comment les visiteurs interagissent avec le site (pages consultées, temps passé, provenance). Toutes les données sont anonymisées ou pseudonymisées et ne peuvent pas être utilisées pour identifier directement des personnes.',
          },
          { p: 'Ils nécessitent votre consentement. Vous pouvez les refuser sans que cela affecte le fonctionnement du site.' },
          { h3: '3.3. Cookies marketing (publicité)' },
          {
            p: 'Ces cookies servent à mesurer l’efficacité de nos campagnes publicitaires sur Google Ads, Meta (Facebook et Instagram), TikTok Ads, LinkedIn Ads et ChatGPT Ads. Ils permettent aux plateformes publicitaires de savoir si vous avez visité notre site après avoir vu l’une de nos annonces.',
          },
          {
            p: 'Nous n’affichons pas de publicités personnalisées sur notre site. Ces cookies sont utilisés exclusivement pour l’attribution des conversions de nos campagnes payantes.',
          },
          { p: 'Ils nécessitent votre consentement. Vous pouvez les refuser sans que cela affecte le fonctionnement du site.' },
          { h3: '3.4. Cookies de préférences' },
          {
            p: 'Ces cookies mémorisent vos choix (y compris vos préférences en matière de cookies), afin que vous n’ayez pas à les indiquer de nouveau à chaque visite.',
          },
        ],
      },
      {
        scurt: 'Liste complète des cookies',
        titlu: 'Liste détaillée des cookies utilisés',
        continut: [
          { p: 'Vous trouverez ci-dessous l’ensemble des cookies et technologies similaires que nous utilisons, regroupés par catégorie.' },
          {
            setari: {
              titlu: 'Gérer vos préférences',
              text: 'Vous pouvez modifier à tout moment les cookies que vous acceptez : le bandeau de cookies s’ouvre à nouveau et vous pouvez refaire votre choix.',
              buton: 'Ouvrir les paramètres des cookies',
            },
          },
          {
            cookies: [
              {
                nume: 'Essentiels',
                descriere: 'Nécessaires au fonctionnement de base du site. Aucun consentement requis.',
                cookies: [
                  ['__Host-next-auth.csrf-token', 'inovex.ro', 'https://inovex.ro', 'Protection CSRF des formulaires', 'Session', 'HTTP'],
                  ['__Secure-next-auth.session-token', 'inovex.ro', 'https://inovex.ro', 'Maintien de la session authentifiée', '30 jours', 'HTTP'],
                  ['cookie_consent', 'inovex.ro', 'https://inovex.ro', 'Mémorise vos préférences en matière de cookies', '12 mois', 'localStorage'],
                  ['inovex_limba', 'inovex.ro', 'https://inovex.ro', 'Mémorise la langue du site : celle que vous avez choisie ou celle déterminée automatiquement lors de votre première visite, d’après votre pays (déduit de votre adresse IP, que nous ne conservons pas) et la langue de votre navigateur', '12 mois', 'HTTP'],
                ],
              },
              {
                nume: 'Analytiques',
                descriere: 'Google Analytics 4 : analyse anonymisée du trafic. Consentement requis.',
                cookies: [
                  ['_ga', 'google.com', COOKIE_GOOGLE, 'Identifie les sessions uniques des utilisateurs (anonymisé)', '13 mois', 'HTTP'],
                  ['_ga_*', 'google.com', COOKIE_GOOGLE, 'Maintient l’état de la session GA4', '13 mois', 'HTTP'],
                  ['_gid', 'google.com', COOKIE_GOOGLE, 'Distingue les utilisateurs (données supprimées après 24 heures)', '24 heures', 'HTTP'],
                ],
              },
              {
                nume: 'Marketing',
                descriere: 'Google Ads, Meta Pixel, TikTok Pixel, LinkedIn Insight Tag et pixel ChatGPT Ads (OpenAI) : mesure des conversions issues des campagnes. Consentement requis.',
                cookies: [
                  ['_gcl_au', 'google.com', COOKIE_GOOGLE, 'Google Ads : stocke les expérimentations de conversion', '90 jours', 'HTTP'],
                  ['IDE', 'doubleclick.net', COOKIE_GOOGLE, 'Google Ads : remarketing et mesure des conversions', '13 mois', 'HTTP'],
                  ['_fbp', 'facebook.com', COOKIE_META, 'Meta Pixel : identification du navigateur pour la mesure des campagnes Facebook et Instagram', '90 jours', 'HTTP'],
                  ['_fbc', 'facebook.com', COOKIE_META, 'Meta Pixel : conserve l’identifiant du clic lorsque vous arrivez depuis une publicité Meta', '90 jours', 'HTTP'],
                  ['fr', 'facebook.com', COOKIE_META, 'Meta : diffusion et mesure des publicités', '90 jours', 'HTTP'],
                  ['_ttp', 'tiktok.com', COOKIE_TIKTOK, 'TikTok Pixel : mesure des conversions issues des campagnes TikTok', '13 mois', 'HTTP'],
                  ['tt_webid_v2', 'tiktok.com', COOKIE_TIKTOK, 'TikTok Pixel : identification du visiteur à des fins d’attribution', '1 an', 'HTTP'],
                  ['li_sugr', 'linkedin.com', COOKIE_LINKEDIN, 'LinkedIn Insight Tag : identification du navigateur pour la mesure des campagnes LinkedIn', '3 mois', 'HTTP'],
                  ['bcookie', 'linkedin.com', COOKIE_LINKEDIN, 'LinkedIn : identifiant de navigateur', '1 an', 'HTTP'],
                  ['lidc', 'linkedin.com', COOKIE_LINKEDIN, 'LinkedIn : choix du centre de données qui traite les requêtes', '24 heures', 'HTTP'],
                  ['UserMatchHistory', 'linkedin.com', COOKIE_LINKEDIN, 'LinkedIn Ads : synchronisation de l’identifiant publicitaire', '30 jours', 'HTTP'],
                  ['AnalyticsSyncHistory', 'linkedin.com', COOKIE_LINKEDIN, 'LinkedIn : horodatage de la dernière synchronisation des données de mesure', '30 jours', 'HTTP'],
                  ['li_fat_id', 'linkedin.com', COOKIE_LINKEDIN, 'LinkedIn Ads : attribution des conversions issues des campagnes LinkedIn', '30 jours', 'HTTP'],
                  ['__oppref', 'openai.com', COOKIE_OPENAI, 'ChatGPT Ads : conserve la référence d’un clic sur une publicité dans ChatGPT, pour l’attribution des conversions', '30 jours', 'HTTP'],
                  ['__obref', 'openai.com', COOKIE_OPENAI, 'ChatGPT Ads : identifiant du navigateur pour la mesure des campagnes', '1 an', 'HTTP'],
                  ['__oaiq_consent', 'openai.com', COOKIE_OPENAI, 'ChatGPT Ads : mémorise votre choix de consentement pour le pixel', '30 jours', 'HTTP'],
                ],
              },
              {
                nume: 'Google Tag Manager',
                descriere: 'Gestion des balises de suivi.',
                cookies: [['_gtm_*', 'googletagmanager.com', COOKIE_GOOGLE, 'Google Tag Manager : gestion des balises', 'Session', 'HTTP']],
              },
            ],
          },
        ],
      },
      {
        scurt: 'Votre consentement et votre contrôle',
        titlu: 'Consentement et contrôle de vos préférences',
        continut: [
          { h3: '5.1. Le bandeau de cookies' },
          {
            p: 'Lors de votre première visite sur le site inovex.ro, nous affichons un bandeau qui vous permet de choisir les cookies que vous acceptez. Vous disposez de trois options :',
          },
          {
            ol: [
              '**« Tout accepter » :** vous acceptez toutes les catégories de cookies',
              '**« Tout refuser » :** vous n’acceptez que les cookies strictement nécessaires',
              '**« Personnaliser » :** vous choisissez chaque catégorie individuellement',
            ],
          },
          {
            p: 'Votre choix est mémorisé pendant 12 mois. Vous pouvez modifier vos préférences à tout moment au moyen du bouton « Paramètres des cookies » situé en pied de page du site.',
          },
          { h3: '5.2. Retrait du consentement' },
          { p: 'Vous pouvez retirer ou modifier votre consentement à tout moment :' },
          {
            ul: [
              'Au moyen du bouton « Paramètres des cookies » situé en pied de page du site',
              'Depuis les paramètres de votre navigateur (instructions ci-dessous)',
              'En envoyant un e-mail à [contact@inovex.ro](mailto:contact@inovex.ro)',
            ],
          },
          {
            p: 'Le retrait du consentement ne compromet pas la licéité du traitement fondé sur le consentement effectué avant ce retrait.',
          },
          { h3: '5.3. Contrôle via les paramètres du navigateur' },
          { p: 'Vous pouvez gérer ou désactiver les cookies directement depuis votre navigateur :' },
          {
            ul: [
              '**Google Chrome :** Paramètres › Confidentialité et sécurité › Cookies',
              '**Mozilla Firefox :** Paramètres › Vie privée et sécurité › Cookies et données de sites',
              '**Safari :** Préférences › Confidentialité › Cookies',
              '**Microsoft Edge :** Paramètres › Cookies et autorisations de site',
            ],
          },
          { p: 'Veuillez noter que la désactivation des cookies essentiels peut affecter le fonctionnement du site.' },
          { h3: '5.4. Désactivation par plateforme' },
          {
            ul: [
              '**Google Analytics :** [tools.google.com/dlpage/gaoptout](https://tools.google.com/dlpage/gaoptout)',
              '**Google Ads :** [adssettings.google.com](https://adssettings.google.com)',
              '**TikTok :** [tiktok.com/legal/page/global/privacy-policy](https://www.tiktok.com/legal/page/global/privacy-policy)',
            ],
          },
        ],
      },
      {
        scurt: 'Transferts de données',
        titlu: 'Transferts internationaux via les cookies',
        continut: [
          {
            p: 'Certains cookies sont déposés par des fournisseurs établis aux États-Unis d’Amérique (Google LLC, TikTok Inc., OpenAI) ou par des fournisseurs susceptibles de transférer des données aux États-Unis (Meta, LinkedIn). Les transferts de données sont effectués moyennant des garanties appropriées, conformément au Règlement général sur la protection des données (RGPD) :',
          },
          {
            ul: [
              '**Google LLC :** transferts encadrés par les clauses contractuelles types (CCT) adoptées par la Commission européenne, disponibles à l’adresse [privacy.google.com/businesses/processorterms](https://privacy.google.com/businesses/processorterms/)',
              '**TikTok Inc. :** transferts encadrés par les clauses contractuelles types (CCT), disponibles dans la politique de confidentialité de TikTok',
              '**LinkedIn Ireland Unlimited Company :** les données peuvent être transférées à LinkedIn Corporation (États-Unis) ; transfert encadré par les clauses contractuelles types (CCT)',
              '**Meta Platforms Ireland Limited :** les données peuvent être transférées à Meta Platforms, Inc. (États-Unis) ; transfert encadré par les clauses contractuelles types (CCT)',
              '**OpenAI :** les données peuvent être transférées aux États-Unis ; transfert encadré par les clauses contractuelles types (CCT)',
            ],
          },
        ],
      },
      {
        scurt: 'Mises à jour de la politique',
        titlu: 'Mises à jour de la présente politique',
        continut: [
          {
            p: 'La présente Politique de cookies peut être mise à jour périodiquement afin de refléter les modifications des cookies utilisés ou des exigences légales.',
          },
          {
            p: 'La date de la dernière modification est indiquée au début du document. Les modifications importantes seront communiquées au moyen du bandeau de cookies ou d’un affichage bien visible sur le site.',
          },
          { p: 'Nous vous invitons à consulter régulièrement cette page pour prendre connaissance de nos pratiques actuelles en matière de cookies.' },
        ],
      },
      {
        scurt: 'Contact',
        titlu: 'Contact',
        continut: [
          { p: 'Pour toute question sur l’utilisation des cookies sur inovex.ro :' },
          {
            ul: [
              '**E-mail :** [contact@inovex.ro](mailto:contact@inovex.ro) (objet : « Cookies – [votre question] »)',
              '**Téléphone :** [+40 750 456 096](tel:+40750456096), du lundi au vendredi, 9h–18h (heure de Roumanie)',
            ],
          },
          { p: 'Autorité compétente pour les réclamations relatives aux cookies : l’autorité roumaine de protection des données (ANSPDCP), [www.dataprotection.ro](https://www.dataprotection.ro).' },
          {
            p: 'La présente Politique de cookies a été rédigée conformément à la loi n° 506/2004 et au règlement (UE) 2016/679 (RGPD), en vigueur au 7 novembre 2026.',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  termeni: {
    meta: {
      titlu: 'Conditions générales',
      descriere:
        'Conditions générales d’utilisation des services et du site Inovex, exploité par VOID SFT GAMES SRL, CUI RO43474393. Droit applicable : droit roumain.',
    },
    titlu: 'Conditions générales',
    intro:
      'Veuillez lire attentivement ce document avant d’utiliser les services ou le site Inovex. En accédant au site ou en souscrivant un service, quel qu’il soit, vous acceptez les présentes conditions.',
    actualizat: '6 novembre 2026',
    data: '2026-11-06',
    sectiuni: [
      {
        scurt: 'Informations sur l’exploitant',
        titlu: 'Informations sur l’exploitant',
        continut: [
          {
            p: 'Le site inovex.ro est exploité par VOID SFT GAMES SRL, société à responsabilité limitée constituée conformément à la législation roumaine, dont le siège social est situé dans le département de Gorj, identifiant fiscal (CUI) RO43474393, immatriculée au registre du commerce.',
          },
          {
            ul: [
              '**Nom commercial :** Inovex',
              '**Personne morale :** VOID SFT GAMES SRL',
              '**Identifiant fiscal (CUI) :** RO43474393',
              '**Siège social :** Târgu Jiu, département de Gorj, Roumanie',
              '**E-mail :** [contact@inovex.ro](mailto:contact@inovex.ro)',
              '**Téléphone :** [+40 750 456 096](tel:+40750456096)',
              '**Site web :** [https://inovex.ro](https://inovex.ro)',
            ],
          },
          {
            p: 'Inovex propose des services de création et de développement web, notamment des boutiques en ligne, des sites vitrines, des applications web et mobiles, des systèmes CRM/ERP/CMS ainsi que la mise en place d’automatisations fondées sur l’intelligence artificielle, destinés aux personnes physiques et morales.',
          },
        ],
      },
      {
        scurt: 'Acceptation des conditions',
        titlu: 'Acceptation des conditions',
        continut: [
          {
            p: 'En accédant au site inovex.ro et en l’utilisant, ou en souscrivant un service proposé par VOID SFT GAMES SRL sous la marque Inovex, vous confirmez avoir lu et compris les présentes Conditions générales et acceptez de les respecter dans leur intégralité.',
          },
          {
            p: 'Si vous n’acceptez pas l’une quelconque des dispositions du présent document, nous vous prions de ne pas utiliser le site et de ne pas souscrire nos services.',
          },
          {
            p: 'Le présent document constitue un accord juridiquement valable entre vous (personne physique ou morale, ci-après le « Client ») et VOID SFT GAMES SRL (ci-après « Inovex » ou le « Prestataire »).',
          },
          {
            p: 'Inovex se réserve le droit de modifier les présentes conditions à tout moment, en informant les utilisateurs par la publication de la version mise à jour sur le site. La poursuite de l’utilisation des services après la publication des modifications vaut acceptation des nouvelles conditions.',
          },
        ],
      },
      {
        scurt: 'Services proposés',
        titlu: 'Services proposés',
        continut: [
          { p: 'Inovex propose notamment, sans que cette liste soit limitative, les catégories de services suivantes :' },
          {
            ol: [
              'Création de boutiques en ligne clés en main, comprenant un design personnalisé, l’intégration de prestataires de paiement, de transporteurs et de logiciels de facturation, ainsi qu’une optimisation SEO ;',
              'Création de sites vitrines, comprenant un design personnalisé, un système de gestion de contenu et une optimisation pour les moteurs de recherche ;',
              'Développement d’applications web et de plateformes SaaS, comprenant des systèmes d’authentification, des tableaux de bord, des API et une infrastructure cloud ;',
              'Mise en place de systèmes CRM, CMS et ERP personnalisés, adaptés aux processus internes du Client ;',
              'Développement d’applications mobiles pour les plateformes iOS et Android ;',
              'Mise en place d’automatisations fondées sur l’intelligence artificielle, comprenant des chatbots, le traitement automatisé de documents et des flux d’automatisation ;',
              'Produits numériques disponibles sur la Marketplace Inovex, comprenant des modèles et des solutions web préconfigurées.',
            ],
          },
          {
            p: 'Tous les services sont fournis sur la base d’un contrat individuel signé avec chaque Client, qui précise les spécifications techniques, les délais de livraison et les modalités de paiement applicables au projet concerné. Le présent document s’applique en complément du contrat individuel et ne le remplace pas.',
          },
        ],
      },
      {
        scurt: 'Prix et modalités de paiement',
        titlu: 'Prix et modalités de paiement',
        continut: [
          {
            p: '**4.1.** Les prix des projets sur mesure sont fixés individuellement, en fonction de leur complexité, du volume de travail et des spécifications techniques convenues, car chaque projet est unique et nécessite une évaluation individuelle. Pour les services dont le prix est affiché sur le site (par exemple, Video Motion Design) et pour les produits de la Marketplace, le prix affiché au moment de la commande s’applique.',
          },
          { p: '**4.2.** Modalités de paiement acceptées :' },
          {
            ol: [
              'Paiement intégral à l’avance, avant le début des travaux ;',
              'Paiement échelonné : un acompte d’au moins 20 % (vingt pour cent) de la valeur totale du contrat, versé avant le début des travaux, le solde étant payable à la livraison finale du projet, avant la remise des accès.',
            ],
          },
          {
            p: '**4.3.** Les factures émises par Inovex sont payables dans un délai de 5 (cinq) jours ouvrés à compter de leur date d’émission, sauf disposition contraire du contrat individuel.',
          },
          {
            p: '**4.4.** Tout retard de paiement des factures entraîne des pénalités de retard de 0,1 % (zéro virgule un pour cent) de la valeur de la facture impayée par jour de retard, à compter du premier jour suivant l’échéance.',
          },
          {
            p: '**4.5.** Inovex a le droit de suspendre les travaux en cas de non-paiement des factures à leur échéance, sans pouvoir être tenue responsable des éventuels préjudices résultant de cette suspension.',
          },
          {
            p: '**4.6.** La remise des livrables finaux, y compris des accès aux comptes, du code source et de la documentation, intervient exclusivement après le paiement intégral des sommes dues.',
          },
          {
            p: '**4.7.** Les prix affichés ou communiqués s’entendent hors TVA, sauf indication contraire. La TVA est appliquée conformément à la législation fiscale en vigueur.',
          },
        ],
      },
      {
        scurt: 'Livraison et délais',
        titlu: 'Livraison et délais',
        continut: [
          {
            p: '**5.1.** Les délais de livraison sont fixés dans le contrat individuel signé avec chaque Client et commencent à courir à compter de la date de paiement de l’acompte et de la réception de tous les éléments nécessaires fournis par le Client (textes, images, données d’accès, spécifications techniques, etc.).',
          },
          {
            p: '**5.2.** Inovex met en œuvre tous les efforts raisonnables pour respecter les délais de livraison convenus. Toutefois, ces délais peuvent être affectés par :',
          },
          {
            ol: [
              'Le retard du Client dans la fourniture des éléments ou des retours demandés ;',
              'Les modifications des spécifications techniques demandées par le Client en cours de projet ;',
              'Des facteurs externes, indépendants de la volonté d’Inovex (cas de force majeure, problèmes rencontrés par des fournisseurs tiers, etc.).',
            ],
          },
          {
            p: '**5.3.** Inovex informera le Client en temps utile de tout retard prévisible et proposera un nouveau délai de livraison raisonnable.',
          },
          {
            p: '**5.4.** Le Client dispose d’une période de vérification et de validation d’au moins 5 (cinq) jours ouvrés pour chaque livrable reçu. L’absence de réponse dans le délai de vérification convenu vaut acceptation tacite du livrable concerné.',
          },
          {
            p: '**5.5.** La livraison finale est réputée effectuée à la date de remise des accès et de la documentation complète, après le paiement intégral du montant du contrat.',
          },
        ],
      },
      {
        scurt: 'Garantie après la mise en ligne',
        titlu: 'Garantie après la mise en ligne',
        continut: [
          {
            p: '**6.1.** Inovex offre une période de garantie de 30 (trente) jours calendaires à compter de la date de livraison finale du projet, au cours de laquelle elle corrige gratuitement tout défaut ou dysfonctionnement constaté qui n’est pas causé par :',
          },
          {
            ol: [
              'Des modifications apportées par le Client ou par des tiers au code source ou à la configuration du système, sans l’accord préalable d’Inovex ;',
              'Des mises à jour de plateformes tierces (WordPress, WooCommerce, systèmes d’exploitation, navigateurs) effectuées après la livraison finale ;',
              'Une utilisation incorrecte du système par le Client ou par ses employés ;',
              'Des attaques informatiques, des logiciels malveillants ou un accès non autorisé aux systèmes du Client ;',
              'Des problèmes d’infrastructure relevant du fournisseur d’hébergement choisi par le Client.',
            ],
          },
          {
            p: '**6.2.** Les demandes de garantie sont adressées à [contact@inovex.ro](mailto:contact@inovex.ro), accompagnées d’une description détaillée du problème constaté. Inovex répondra dans un délai maximal de 2 (deux) jours ouvrés et corrigera le problème dans le délai communiqué.',
          },
          {
            p: '**6.3.** La garantie couvre exclusivement les fonctionnalités convenues dans le contrat initial. Les demandes de nouvelles fonctionnalités ou de modification des fonctionnalités existantes n’entrent pas dans le champ de la garantie et sont traitées comme de nouveaux projets.',
          },
          {
            p: '**6.4.** À l’expiration de la période de garantie, les services de maintenance et d’assistance sont proposés à titre payant, dans le cadre d’un contrat de maintenance distinct.',
          },
        ],
      },
      {
        scurt: 'Propriété intellectuelle',
        titlu: 'Propriété intellectuelle et droits d’auteur',
        continut: [
          {
            p: '**7.1.** Dès le paiement intégral du montant du contrat et la livraison finale du projet, le Client acquiert l’intégralité des droits d’utilisation sur l’ensemble des éléments créés par Inovex dans le cadre du projet, y compris le design graphique, le code source, la structure de la base de données et la documentation technique.',
          },
          {
            p: '**7.2.** Le transfert de droits prévu à l’article 7.1 porte exclusivement sur les éléments créés par Inovex spécialement pour le projet du Client. Il n’inclut pas :',
          },
          {
            ol: [
              'Les bibliothèques, frameworks et composants logiciels open source utilisés, qui restent soumis à leurs propres licences (MIT, GPL, Apache, etc.) ;',
              'Les thèmes, plugins ou composants tiers acquis séparément, qui restent soumis aux licences de leurs éditeurs respectifs ;',
              'Les éléments graphiques ou photographies acquis auprès de tiers (banques d’images, licences de polices, etc.), qui restent soumis aux conditions de licence des fournisseurs concernés.',
            ],
          },
          {
            p: '**7.3.** Inovex se réserve le droit de présenter les projets finalisés dans son propre portfolio (site, réseaux sociaux, supports marketing), sauf si le Client demande par écrit, avant la signature du contrat, que ces projets restent confidentiels.',
          },
          {
            p: '**7.4.** Le Client garantit que les éléments fournis à Inovex pour la réalisation du projet (textes, images, logos, éléments de marque) ne portent pas atteinte aux droits d’auteur de tiers. Toute responsabilité découlant de l’utilisation, sans droits légaux, d’éléments fournis par le Client incombe exclusivement au Client.',
          },
          {
            p: '**7.5.** Toute reproduction, distribution ou modification du contenu du site inovex.ro (textes, images, logo, design) est interdite sans l’accord écrit préalable de VOID SFT GAMES SRL.',
          },
        ],
      },
      {
        scurt: 'Confidentialité et données d’accès',
        titlu: 'Confidentialité et données d’accès',
        continut: [
          {
            p: '**8.1.** Pendant la prestation des services, Inovex peut avoir accès aux données d’accès du Client (hébergement, nom de domaine, comptes de messagerie, réseaux sociaux, prestataires de paiement, etc.). Ces données sont traitées comme strictement confidentielles et sont utilisées exclusivement aux fins de la réalisation du projet faisant l’objet du contrat.',
          },
          {
            p: '**8.2.** À la fin du projet, Inovex remet au Client l’ensemble des données d’accès créées ou gérées dans le cadre du projet. Il incombe au Client de modifier les mots de passe immédiatement après cette remise.',
          },
          {
            p: '**8.3.** Inovex ne stocke ni n’archive de données d’accès après la fin du projet et leur remise, et ne peut être tenue responsable des incidents de sécurité résultant du fait que le Client n’a pas modifié les mots de passe après la remise.',
          },
          {
            p: '**8.4.** Les deux parties s’engagent à préserver la confidentialité des informations commerciales, techniques et financières de l’autre partie dont elles prennent connaissance au cours de leur collaboration, tant pendant la durée du contrat que pendant une période de 2 (deux) ans après sa cessation.',
          },
          {
            p: '**8.5.** Le traitement des données à caractère personnel est effectué conformément à la [Politique de confidentialité](/politica-de-confidentialitate), qui fait partie intégrante du présent document.',
          },
        ],
      },
      {
        scurt: 'Résiliation du contrat',
        titlu: 'Résiliation du contrat',
        continut: [
          { p: '**9.1.** Le Client peut résilier le contrat à tout moment, moyennant une notification écrite adressée à Inovex. Dans ce cas :' },
          {
            ol: [
              'L’acompte versé est conservé intégralement par Inovex, à titre de dédommagement pour le travail fourni et les ressources allouées au projet ;',
              'Si les travaux ont dépassé le montant de l’acompte versé, le Client est redevable du paiement du travail effectué jusqu’à la date de résiliation, calculé au prorata de l’état d’avancement du projet ;',
              'Inovex remet au Client l’ensemble des éléments et livrables réalisés jusqu’à la date de résiliation, dans l’état où ils se trouvent à ce moment-là.',
            ],
          },
          {
            p: '**9.2.** Inovex peut résilier le contrat moyennant une notification écrite adressée au Client au moins 15 (quinze) jours calendaires à l’avance, dans des cas justifiés (impossibilité objective d’exécution, comportement abusif du Client, communication d’informations fausses lors de la conclusion du contrat). Dans ce cas, Inovex restitue l’acompte versé, déduction faite de la valeur du travail déjà effectué.',
          },
          {
            p: '**9.3.** Inovex peut résilier le contrat sans préavis et sans restitution de l’acompte si le Client demande la réalisation de contenus illicites, faisant la promotion d’activités illégales, portant atteinte aux droits de tiers ou contraires aux bonnes mœurs.',
          },
          { p: '**9.4.** La résiliation du contrat n’affecte pas les obligations de paiement échues avant la résiliation.' },
        ],
      },
      {
        scurt: 'Limitation de responsabilité',
        titlu: 'Limitation de responsabilité',
        continut: [
          {
            p: '**10.1.** Inovex répond des préjudices directs causés au Client par l’inexécution ou la mauvaise exécution de ses obligations contractuelles, dans la limite de la valeur totale du contrat concerné.',
          },
          { p: '**10.2.** Inovex ne répond pas :' },
          {
            ol: [
              'Des préjudices indirects, pertes de bénéfices, pertes de données ou pertes d’opportunités commerciales du Client ;',
              'Des défaillances ou de l’indisponibilité des services tiers dont dépend le fonctionnement du projet (hébergement, services de messagerie, prestataires de paiement, API tierces, CDN, etc.) ;',
              'Des préjudices résultant d’une utilisation inappropriée du projet livré par le Client ou par ses employés ;',
              'De la perte de données causée par l’absence de sauvegardes ou par une configuration inappropriée de l’infrastructure par le Client ;',
              'Des attaques informatiques, vulnérabilités de sécurité ou accès non autorisés aux systèmes du Client survenus après la livraison finale et la remise des accès ;',
              'Des modifications législatives ou des changements de politique des plateformes tierces (Google, Meta, Apple, Google Play, etc.) affectant le fonctionnement du projet livré.',
            ],
          },
          {
            p: '**10.3.** Le site inovex.ro peut contenir des liens vers des sites tiers. Inovex n’est pas responsable du contenu, des politiques de confidentialité ou des pratiques de ces sites.',
          },
          {
            p: '**10.4.** Inovex met en œuvre des efforts raisonnables pour maintenir le site inovex.ro disponible et fonctionnel, mais ne garantit pas sa disponibilité ininterrompue.',
          },
        ],
      },
      {
        scurt: 'Force majeure',
        titlu: 'Force majeure',
        continut: [
          {
            p: '**11.1.** Aucune des parties ne répond de l’inexécution ou de l’exécution tardive de ses obligations contractuelles lorsque celle-ci est causée par un événement de force majeure, au sens du Code civil roumain.',
          },
          {
            p: '**11.2.** Constituent notamment des cas de force majeure, sans que cette liste soit limitative : les catastrophes naturelles, les pandémies déclarées par les autorités compétentes, les conflits armés, les actes de terrorisme, les grèves générales, les interruptions de la fourniture d’énergie ou des services internet à l’échelle nationale ou régionale, ainsi que les actes des autorités publiques empêchant l’exécution du contrat.',
          },
          {
            p: '**11.3.** La partie affectée par la force majeure est tenue d’en informer l’autre partie par écrit, dans un délai maximal de 5 (cinq) jours calendaires à compter de la survenance de l’événement, en indiquant sa nature et sa durée estimée.',
          },
          {
            p: '**11.4.** Si l’événement de force majeure dure plus de 60 (soixante) jours calendaires, chacune des parties peut résilier le contrat, avec restitution proportionnelle des sommes versées pour les services non exécutés.',
          },
        ],
      },
      {
        scurt: 'Marketplace Inovex',
        titlu: 'Marketplace Inovex',
        continut: [
          {
            p: '**12.1.** La Marketplace Inovex propose des produits numériques préconfigurés (modèles de sites web et de boutiques en ligne), disponibles à l’achat et à la personnalisation.',
          },
          {
            p: '**12.2.** Les produits de la Marketplace sont vendus sous le régime d’une licence d’utilisation. Lors de l’achat, l’acheteur acquiert le droit d’utiliser le produit pour un seul projet/domaine, sauf indication contraire dans la description du produit.',
          },
          {
            p: '**12.3.** Les produits de la Marketplace sont fournis « en l’état », avec une personnalisation dans les limites précisées dans la description du produit. La garantie de 30 jours s’applique également aux produits de la Marketplace et couvre le bon fonctionnement des fonctionnalités décrites.',
          },
          {
            p: '**12.4.** Les produits portant la mention « Exclusif » ou faisant l’objet d’une licence exclusive ne sont vendus qu’une seule fois. Après la vente, le produit est signalé comme indisponible et ne peut plus être acheté par d’autres acheteurs.',
          },
          {
            p: '**12.5.** Les produits numériques de la Marketplace ne peuvent faire l’objet d’aucun retour, en application de l’exception prévue à l’article 16, point m), de l’ordonnance d’urgence du gouvernement roumain (OUG) n° 34/2014 (qui transpose l’article 16, point m), de la directive 2011/83/UE), pour les contenus numériques non fournis sur un support matériel dont l’exécution a commencé avec l’accord préalable du consommateur.',
          },
          {
            p: '**12.6.** Les prix de la Marketplace incluent la TVA, le cas échéant, et sont affichés en EUR. La facturation est effectuée en RON, au taux de change de la Banque nationale de Roumanie (BNR) en vigueur à la date de facturation.',
          },
        ],
      },
      {
        scurt: 'Règlement des litiges',
        titlu: 'Règlement des litiges',
        continut: [
          { p: '**13.1.** Le présent document est régi par le droit roumain et interprété conformément à celui-ci.' },
          {
            p: '**13.2.** Tout litige, différend ou réclamation découlant du présent document ou des services Inovex, ou en lien avec ceux-ci, sera réglé en priorité à l’amiable, par voie de négociation directe entre les parties.',
          },
          {
            p: '**13.3.** Le délai de règlement amiable est de 30 (trente) jours calendaires à compter de la date de la notification écrite du litige par l’une ou l’autre des parties.',
          },
          {
            p: '**13.4.** Si un règlement amiable n’est pas possible dans le délai prévu à l’article 13.3, le litige sera tranché par les juridictions compétentes du ressort du tribunal de Gorj (Tribunalul Gorj), dont le siège est à Târgu Jiu, département de Gorj, Roumanie.',
          },
          {
            p: '**13.5.** Les consommateurs personnes physiques peuvent également recourir au règlement extrajudiciaire des litiges, via la plateforme de l’autorité roumaine de protection des consommateurs, disponible à l’adresse [https://reclamatiisal.anpc.ro](https://reclamatiisal.anpc.ro).',
          },
          {
            p: '**13.6.** L’autorité roumaine de protection des consommateurs (ANPC) peut être saisie par les consommateurs à l’adresse [https://anpc.ro](https://anpc.ro) ou au numéro de téléphone +40 21 9551.',
          },
        ],
      },
      {
        scurt: 'Dispositions finales',
        titlu: 'Dispositions finales',
        continut: [
          {
            p: '**14.1.** Si l’une quelconque des dispositions du présent document est déclarée nulle ou inapplicable, les autres dispositions restent valables et continuent de produire leurs effets juridiques.',
          },
          { p: '**14.2.** Le fait qu’Inovex n’exerce pas l’un quelconque des droits prévus par le présent document ne constitue pas une renonciation à ce droit.' },
          {
            p: '**14.3.** Le présent document, ainsi que le contrat individuel signé et la Politique de confidentialité disponible sur le site, constituent l’intégralité de l’accord entre les parties concernant son objet et remplacent toutes négociations, ententes ou accords antérieurs.',
          },
          {
            p: '**14.4.** Toute communication officielle entre les parties est effectuée par écrit, par e-mail, aux adresses mentionnées dans le contrat individuel, ou par lettre recommandée avec accusé de réception.',
          },
          { p: '**14.5.** Le présent document a été rédigé conformément à la législation roumaine en vigueur au 6 novembre 2026.' },
        ],
      },
    ],
  },
};
