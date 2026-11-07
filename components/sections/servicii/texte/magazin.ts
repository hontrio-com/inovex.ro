import type { Limba } from '@/lib/i18n/config';
import type { Tr } from '.';

/* Animatia magazinului online (filmMagazin.ts) in engleza, germana, franceza. Preturile in euro, rotunjite
   (cosul pastreaza socoteala: cupon de 20%, prag pentru reducere), furnizorul si clientul din tara limbii
   (Londra/Manchester, München/Hamburg, Lyon/Paris), factura si AWB-ul fara mentiunile legale romanesti. */

export const STATIC: Record<string, Tr> = {
  'magazinul-tau.ro': ['yourstore.com', 'deinshop.de', 'votreboutique.fr'],
  'Caută produse, camere sau stiluri': ['Search products, rooms or styles', 'Produkte, Räume oder Stile suchen', 'Rechercher produits, pièces ou styles'],
  'Relații clienți': ['Customer service', 'Kundenservice', 'Service client'],
  '0750 456 096': ['+44 20 7946 0000', '+49 89 0000000', '+33 4 00 00 00 00'],
  'Contul meu': ['My account', 'Mein Konto', 'Mon compte'],
  'Intră în cont': ['Sign in', 'Anmelden', 'Se connecter'],
  Promoții: ['Deals', 'Angebote', 'Promos'],
  Produse: ['Products', 'Produkte', 'Produits'],
  Living: ['Living room', 'Wohnzimmer', 'Salon'],
  Dormitor: ['Bedroom', 'Schlafzimmer', 'Chambre'],
  Bucătărie: ['Kitchen', 'Küche', 'Cuisine'],
  Birou: ['Office', 'Büro', 'Bureau'],
  Hol: ['Hallway', 'Flur', 'Entrée'],
  Baie: ['Bathroom', 'Bad', 'Salle de bain'],
  'Copii & Tineret': ['Kids & Teens', 'Kinder & Jugend', 'Enfants & Ados'],
  'Grădină & Terasă': ['Garden & Patio', 'Garten & Terrasse', 'Jardin & Terrasse'],
  'Info utile': ['Useful info', 'Infos', 'Infos utiles'],
  'Set living Alb + Stejar': ['White + Oak living set', 'Wohnzimmer-Set Weiß + Eiche', 'Ensemble salon Blanc + Chêne'],
  '1.729 lei': ['€349', '349 €', '349 €'],
  'Set living Maro': ['Brown living set', 'Wohnzimmer-Set Braun', 'Ensemble salon Marron'],
  '3.222 lei': ['€649', '649 €', '649 €'],
  'Set living Alb + Marmură': ['White + Marble living set', 'Wohnzimmer-Set Weiß + Marmor', 'Ensemble salon Blanc + Marbre'],
  '6.523 lei': ['€1,299', '1.299 €', '1 299 €'],
  'Set living Bej': ['Beige living set', 'Wohnzimmer-Set Beige', 'Ensemble salon Beige'],
  '3.223 lei': ['€659', '659 €', '659 €'],
  'Coșul tău': ['Your cart', 'Ihr Warenkorb', 'Votre panier'],
  'Doriți montaj? Avem o propunere!': ['Need assembly? We have an offer!', 'Montage gewünscht? Wir haben ein Angebot!', 'Besoin d’un montage ? Nous avons une offre !'],
  '250,00 lei': ['€49.00', '49,00 €', '49,00 €'],
  'Alege județ': ['Choose region', 'Bundesland wählen', 'Choisir la région'],
  'Alege localitatea': ['Choose city', 'Ort wählen', 'Choisir la ville'],
  'Adaugă montajul': ['Add assembly', 'Montage hinzufügen', 'Ajouter le montage'],
  'Comanzi mult, plătești mai puțin': ['Buy more, pay less', 'Mehr kaufen, weniger zahlen', 'Achetez plus, payez moins'],
  'Adaugă produse de încă 1.271,00 lei și primești automat o reducere de 450 lei.': [
    'Add €251.00 more in products and automatically get €90 off.',
    'Fügen Sie Produkte für weitere 251,00 € hinzu und erhalten Sie automatisch 90 € Rabatt.',
    'Ajoutez encore 251,00 € de produits et recevez automatiquement une remise de 90 €.',
  ],
  PRODUS: ['PRODUCT', 'PRODUKT', 'PRODUIT'],
  PREȚ: ['PRICE', 'PREIS', 'PRIX'],
  CANTITATE: ['QUANTITY', 'MENGE', 'QUANTITÉ'],
  'SUB-TOTAL': ['SUBTOTAL', 'ZWISCHENSUMME', 'SOUS-TOTAL'],
  '1.729,00 lei': ['€349.00', '349,00 €', '349,00 €'],
  '(inclusiv TVA)': ['(incl. VAT)', '(inkl. MwSt.)', '(TVA incluse)'],
  'Aplică cuponul': ['Apply coupon', 'Gutschein einlösen', 'Appliquer le code'],
  'Total coș': ['Cart total', 'Warenkorb gesamt', 'Total du panier'],
  'Sub-total': ['Subtotal', 'Zwischensumme', 'Sous-total'],
  'Cupon: reducere20': ['Coupon: save20', 'Gutschein: rabatt20', 'Code promo : promo20'],
  '−345,80 lei': ['−€69.80', '−69,80 €', '−69,80 €'],
  Livrare: ['Shipping', 'Versand', 'Livraison'],
  'Livrare gratuită': ['Free shipping', 'Kostenloser Versand', 'Livraison gratuite'],
  Total: ['Total', 'Gesamt', 'Total'],
  '(include TVA)': ['(incl. VAT)', '(inkl. MwSt.)', '(TVA incluse)'],
  'Continuă cu finalizarea comenzii': ['Proceed to checkout', 'Weiter zur Kasse', 'Passer la commande'],
  'Plată cu cardul': ['Card payment', 'Kartenzahlung', 'Paiement par carte'],
  'Plătește 1.383,20 lei': ['Pay €279.20', '279,20 € bezahlen', 'Payer 279,20 €'],
  'Plăți securizate prin': ['Secure payments by', 'Sichere Zahlung über', 'Paiements sécurisés par'],
  FACTURA: ['INVOICE', 'RECHNUNG', 'FACTURE'],
  'Data emiterii: 18/10/2026': ['Issue date: 18/10/2026', 'Rechnungsdatum: 18.10.2026', 'Date d’émission : 18/10/2026'],
  'TOTAL PLATA': ['TOTAL DUE', 'GESAMTBETRAG', 'TOTAL À PAYER'],
  '1383.20 Lei': ['279.20 EUR', '279,20 EUR', '279,20 EUR'],
  Furnizor: ['Supplier', 'Verkäufer', 'Fournisseur'],
  'MOBILA DESIGN S.R.L.': ['HOME DESIGN LTD', 'MÖBEL DESIGN GMBH', 'MOBILIER DESIGN SARL'],
  'CIF: RO12345678': ['VAT no.: GB123456789', 'USt-IdNr.: DE123456789', 'N° TVA : FR12345678901'],
  'Reg. com.: J40/1234/2020': ['Company no.: 12345678', 'HRB 123456, AG München', 'RCS Lyon 123 456 789'],
  'Adresa: Str. Exemplului nr. 10, București': ['Address: 10 Example Street, London', 'Adresse: Beispielstraße 10, München', 'Adresse : 10 rue de l’Exemple, Lyon'],
  'Banca: Banca Exemplu': ['Bank: Example Bank', 'Bank: Beispielbank', 'Banque : Banque Exemple'],
  Client: ['Customer', 'Kunde', 'Client'],
  'Andrei Ionescu': ['Andrew Miller', 'Andreas Schmidt', 'Antoine Martin'],
  'Adresa: Str. Florilor nr. 7,': ['Address: 7 Flower Street,', 'Adresse: Blumenstraße 7,', 'Adresse : 7 rue des Fleurs,'],
  'Cluj-Napoca, Jud. Cluj': ['Manchester M1 1AA', '20095 Hamburg', '75001 Paris'],
  'Tel.: 0740 000 000': ['Tel.: +44 7700 900000', 'Tel.: +49 151 00000000', 'Tél. : +33 6 00 00 00 00'],
  'Nr. crt': ['No.', 'Pos.', 'N°'],
  'Denumirea produselor sau a serviciilor': ['Description of goods or services', 'Bezeichnung der Waren oder Leistungen', 'Désignation des produits ou services'],
  'U.M.': ['Unit', 'Einh.', 'Unité'],
  'Cant.': ['Qty', 'Menge', 'Qté'],
  'Preț unitar': ['Unit price', 'Einzelpreis', 'Prix unitaire'],
  Valoarea: ['Amount', 'Betrag', 'Montant'],
  buc: ['pcs', 'Stk.', 'pce'],
  '1729.00': ['349.00', '349,00', '349,00'],
  '-345.80': ['-69.80', '-69,80', '-69,80'],
  '1729': ['349', '349', '349'],
  'Discount cupon reducere20': ['Coupon discount save20', 'Gutscheinrabatt rabatt20', 'Remise code promo20'],
  'Întocmit de: Magazin online': ['Issued by: Online store', 'Erstellt von: Online-Shop', 'Établie par : Boutique en ligne'],
  'Emisă automat': ['Issued automatically', 'Automatisch erstellt', 'Émise automatiquement'],
  'Capital social: 200 Lei': ['Share capital: €1,000', 'Stammkapital: 25.000 €', 'Capital social : 1 000 €'],
  'Adresa web: magazinul-tau.ro; Tel.: 0750 456 096': [
    'Website: yourstore.com; Tel.: +44 20 7946 0000',
    'Web: deinshop.de; Tel.: +49 89 0000000',
    'Site web : votreboutique.fr ; Tél. : +33 4 00 00 00 00',
  ],
  'Factura este valabilă fără semnătură și ștampilă, conform art. 319 alin. 29 din Legea 227/2015.': [
    'This invoice is valid without signature or stamp.',
    'Diese Rechnung ist ohne Unterschrift und Stempel gültig.',
    'Facture valable sans signature ni cachet.',
  ],
  'Facturez cu SmartBill.ro   Cod document: MBKZA': [
    'Invoiced automatically   Document code: MBKZA',
    'Automatisch erstellt   Belegnummer: MBKZA',
    'Facturé automatiquement   Code document : MBKZA',
  ],
  'CURIER EXPRES': ['EXPRESS COURIER', 'EXPRESSKURIER', 'COURSIER EXPRESS'],
  'Transport rapid colete și documente': ['Fast parcel and document delivery', 'Schneller Paket- und Dokumentenversand', 'Livraison rapide de colis et documents'],
  'Livrare în toată țara, 24–48 ore': ['Nationwide delivery, 24–48 hours', 'Bundesweite Lieferung, 24–48 Stunden', 'Livraison partout en France, 24–48 h'],
  'Banca:': ['Bank:', 'Bank:', 'Banque :'],
  'IBAN:': ['IBAN:', 'IBAN:', 'IBAN :'],
  'Valoare declarată': ['Declared value', 'Deklarierter Wert', 'Valeur déclarée'],
  'Ramburs: 0 LEI': ['COD: 0 EUR', 'Nachnahme: 0 EUR', 'Contre-remb. : 0 EUR'],
  'din 1': ['of 1', 'von 1', 'sur 1'],
  Data: ['Date', 'Datum', 'Date'],
  Ora: ['Time', 'Uhrzeit', 'Heure'],
  'AWB Air Way Bill': ['AWB Air Waybill', 'Frachtbrief (AWB)', 'Lettre de transport (AWB)'],
  EXPEDITOR: ['SENDER', 'ABSENDER', 'EXPÉDITEUR'],
  ADRESĂ: ['ADDRESS', 'ADRESSE', 'ADRESSE'],
  'Str. Exemplului nr. 10': ['10 Example Street', 'Beispielstraße 10', '10 rue de l’Exemple'],
  'TEL / FAX': ['TEL / FAX', 'TEL / FAX', 'TÉL / FAX'],
  'București – 0 km': ['London – 0 km', 'München – 0 km', 'Lyon – 0 km'],
  București: ['London', 'München', 'Lyon'],
  DESTINATAR: ['RECIPIENT', 'EMPFÄNGER', 'DESTINATAIRE'],
  'Str. Florilor nr. 7': ['7 Flower Street', 'Blumenstraße 7', '7 rue des Fleurs'],
  'Cluj-Napoca – 0 km': ['Manchester – 0 km', 'Hamburg – 0 km', 'Paris – 0 km'],
  'Cluj-Napoca': ['Manchester', 'Hamburg', 'Paris'],
  PLIC: ['ENVELOPE', 'UMSCHLAG', 'ENVELOPPE'],
  COLET: ['PARCEL', 'PAKET', 'COLIS'],
  SERVICIU: ['SERVICE', 'SERVICE', 'SERVICE'],
  OPȚIUNI: ['OPTIONS', 'OPTIONEN', 'OPTIONS'],
  'Deschidere la livrare': ['Open on delivery', 'Öffnen bei Zustellung', 'Ouverture à la livraison'],
  'PLATA LA': ['PAID BY', 'ZAHLUNG DURCH', 'PAYÉ PAR'],
  expeditor: ['sender', 'Absender', 'expéditeur'],
  'DOCUMENT DE PLATĂ': ['PAYMENT DOCUMENT', 'ZAHLUNGSBELEG', 'DOCUMENT DE PAIEMENT'],
  CONFIRMARE: ['CONFIRMATION', 'BESTÄTIGUNG', 'CONFIRMATION'],
  'Nume în clar:': ['Name in full:', 'Name in Druckschrift:', 'Nom en clair :'],
  'Data      Ora': ['Date      Time', 'Datum      Uhrzeit', 'Date      Heure'],
  Ștampila: ['Stamp', 'Stempel', 'Cachet'],
  CONȚINUT: ['CONTENTS', 'INHALT', 'CONTENU'],
  OBSERVAȚII: ['NOTES', 'BEMERKUNGEN', 'OBSERVATIONS'],
  'Fragil – mobilier, a se manipula cu grijă': ['Fragile – furniture, handle with care', 'Zerbrechlich – Möbel, vorsichtig behandeln', 'Fragile – mobilier, à manipuler avec soin'],
  'Specificație de conținut': ['Contents specification', 'Inhaltsangabe', 'Détail du contenu'],
  '- Packing list -': ['- Packing list -', '- Packliste -', '- Liste de colisage -'],
  'Număr: PL5824109305179': ['Number: PL5824109305179', 'Nummer: PL5824109305179', 'Numéro : PL5824109305179'],
  NrCrt: ['No.', 'Pos.', 'N°'],
  Produs: ['Product', 'Produkt', 'Produit'],
  Descriere: ['Description', 'Beschreibung', 'Description'],
  'Cod/serie': ['Code/serial', 'Code/Serie', 'Code/série'],
  Buc: ['Pcs', 'Stk.', 'Pce'],
  'Val.': ['Value', 'Wert', 'Val.'],
  'Mobilier living, 3 colete': ['Living room furniture, 3 parcels', 'Wohnzimmermöbel, 3 Pakete', 'Mobilier de salon, 3 colis'],
  'Predat curierului': ['Handed to courier', 'An Kurier übergeben', 'Remis au coursier'],
  reducere20: ['save20', 'rabatt20', 'promo20'],
  '1.383,20 lei': ['€279.20', '279,20 €', '279,20 €'],
  'Plată confirmată': ['Payment confirmed', 'Zahlung bestätigt', 'Paiement confirmé'],
};

// textele schimbate in timpul animatiei si sumele din cos
export const DINAMIC: Record<
  Limba,
  { adresa: string; cupon: string; codCupon: string; plataA: string; plataB: string; subtotal: number; total: number }
> = {
  ro: { adresa: 'magazinul-tau.ro', cupon: 'reducere20', codCupon: 'Cod cupon', plataA: 'Plătește 1.383,20 lei', plataB: 'Plată confirmată', subtotal: 1729, total: 1383.2 },
  en: { adresa: 'yourstore.com', cupon: 'save20', codCupon: 'Coupon code', plataA: 'Pay €279.20', plataB: 'Payment confirmed', subtotal: 349, total: 279.2 },
  de: { adresa: 'deinshop.de', cupon: 'rabatt20', codCupon: 'Gutscheincode', plataA: '279,20 € bezahlen', plataB: 'Zahlung bestätigt', subtotal: 349, total: 279.2 },
  fr: { adresa: 'votreboutique.fr', cupon: 'promo20', codCupon: 'Code promo', plataA: 'Payer 279,20 €', plataB: 'Paiement confirmé', subtotal: 349, total: 279.2 },
};

/* Bannerele din slider au textul romanesc in imagine. In celelalte limbi, partea din stanga (cu textul)
   e acoperita de un panou in culoarea peretelui din poza, cu textul tradus deasupra; mobila ramane. */
export type Banner = { titlu: [string, string]; reducere: string; buton: string };
export const BANNERE: Record<Exclude<Limba, 'ro'>, [Banner, Banner, Banner]> = {
  en: [
    { titlu: ['Mega', 'sale'], reducere: 'Up to -40%', buton: 'Shop the deals' },
    { titlu: ['Deal of', 'the month'], reducere: 'Up to -35%', buton: 'Discover the collection' },
    { titlu: ['New home,', 'small prices…'], reducere: 'Up to -30%', buton: 'Shop now' },
  ],
  de: [
    { titlu: ['Mega-', 'Sale'], reducere: 'Bis zu -40%', buton: 'Angebote ansehen' },
    { titlu: ['Angebot', 'des Monats'], reducere: 'Bis zu -35%', buton: 'Kollektion entdecken' },
    { titlu: ['Neues Zuhause,', 'kleine Preise…'], reducere: 'Bis zu -30%', buton: 'Jetzt auswählen' },
  ],
  fr: [
    { titlu: ['Méga', 'soldes'], reducere: 'Jusqu’à -40 %', buton: 'Voir les offres' },
    { titlu: ['Offre', 'du mois'], reducere: 'Jusqu’à -35 %', buton: 'Découvrir la collection' },
    { titlu: ['Nouvelle maison,', 'petits prix…'], reducere: 'Jusqu’à -30 %', buton: 'Choisir maintenant' },
  ],
};

// culoarea peretelui din fiecare banner (sus, jos), pentru panou, si culoarea titlului
export const PANOURI = [
  { sus: '#eadccc', jos: '#d6c7ba', titlu: '#ffffff', contur: '#2b2420' },
  { sus: '#1d1c1b', jos: '#352d26', titlu: '#f6e7d3', contur: '#c2502a' },
  { sus: '#d8bea3', jos: '#b9987a', titlu: '#fff7ef', contur: '#c2502a' },
];

/* Panoul tradus de peste un banner (latimea w: 996 in magazin, 582 in CRM): culoarea peretelui din poza,
   care se stinge spre mobila, si textul in stilul bannerelor (majuscule groase, reducerea pe o eticheta
   alba, butonul portocaliu). Titlul se micsoreaza cat sa incapa pe doua randuri. */
export function panouBanner(lang: Limba, i: number, w: number) {
  if (lang === 'ro') return '';
  const b = BANNERE[lang][i];
  const c = PANOURI[i];
  const k = w / 996;
  const px = (v: number) => (v * k).toFixed(1) + 'px';
  const lung = Math.max(b.titlu[0].length, b.titlu[1].length);
  const marime = Math.min(54, 400 / (lung * 0.68));
  const masca = 'linear-gradient(90deg,#000 0%,#000 47%,transparent 63%)';
  return (
    '<div style="position:absolute;inset:0;background:linear-gradient(180deg,' + c.sus + ',' + c.jos + ');-webkit-mask-image:' + masca + ';mask-image:' + masca + '"></div>' +
    '<div style="position:absolute;left:' + px(46) + ';top:0;bottom:0;width:' + px(410) + ';display:flex;flex-direction:column;justify-content:center;align-items:flex-start;gap:' + px(16) + ';font-family:var(--font-display),system-ui,sans-serif;text-transform:uppercase">' +
    '<div style="font-size:' + px(marime) + ';font-weight:800;line-height:.98;letter-spacing:-.01em;color:' + c.titlu + ';-webkit-text-stroke:' + px(1.6) + ' ' + c.contur + ';paint-order:stroke fill;text-shadow:0 ' + px(3) + ' 0 ' + c.contur + '">' + b.titlu[0] + '<br>' + b.titlu[1] + '</div>' +
    '<div style="padding:' + px(6) + ' ' + px(14) + ';border-radius:' + px(10) + ';background:#fff;color:#d9532a;font-size:' + px(28) + ';font-weight:800;line-height:1.1;transform:rotate(-2deg);box-shadow:0 ' + px(4) + ' ' + px(14) + ' rgba(0,0,0,.12)">' + b.reducere + '</div>' +
    '<div style="padding:' + px(10) + ' ' + px(20) + ';border-radius:999px;background:#d9532a;color:#fff;font-size:' + px(14) + ';font-weight:800;letter-spacing:.02em">' + b.buton + ' ›</div>' +
    '</div>'
  );
}
