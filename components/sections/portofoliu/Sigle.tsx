import Image from 'next/image';
import styles from './Sigle.module.css';

/* Siglele si steagurile din fisele de pe pagina /portofoliu.
   - Sigle: integrarile si tehnologiile unui proiect, fiecare intr-o casuta alba, intr-o grila cu casute
     egale (cele late, cu nume scris sau cu sigla lunga, iau doua locuri), ca randurile sa fie pline si
     golurile sa ramana doar la capat. Sunt siglele reale ale firmelor (cele de la servicii, cele din Edinio
     si cele oficiale descarcate pe 2026-11-05: Wikimedia Commons, simple-icons in culoarea marcii,
     TecAlliance, arhiva de presa Crisp). Cele care sunt doar un semn au si numele scris langa; un nume care
     nu e aici apare doar scris.
   - Steaguri: limbile site-ului, cu steagurile din flag-icons (MIT); cand site-ul are mai multe limbi decat
     steagurile aratate, la capat apare „+N”. */

type Sigla = { src: string; h: number; raport: number; text?: string };

const I = '/imagini/servicii/acasa/integrari';
const T = '/imagini/portofoliu/tehnologii';
const S = '/imagini/portofoliu/steaguri';

// inaltimea in pixeli (aleasa ca siglele sa para la fel de mari), raportul latime / inaltime al fisierului si,
// la cele care sunt doar un semn, numele scris langa
const SIGLE: Record<string, Sigla> = {
  // plati
  Netopia: { src: `${I}/netopia.svg`, h: 14, raport: 2.627 },
  Stripe: { src: `${I}/stripe.svg`, h: 14, raport: 2.404 },
  PayPal: { src: `${I}/paypal.svg`, h: 14, raport: 3.758 },
  'Apple Pay': { src: `${I}/apple-pay.svg`, h: 16, raport: 2.436 },
  'Google Pay': { src: `${I}/google-pay.svg`, h: 17, raport: 2.667 },
  'Banca Transilvania': { src: `${I}/bt-epos.webp`, h: 20, raport: 1.684 },
  'TBI Bank': { src: `${I}/tbi.svg`, h: 16, raport: 2.295 },
  // facturare
  SmartBill: { src: `${I}/smartbill.webp`, h: 24, raport: 0.833 },
  Oblio: { src: `${I}/oblio.webp`, h: 14, raport: 3.905 },
  FGO: { src: `${I}/fgo.svg`, h: 13, raport: 2.632 },
  SAGA: { src: `${I}/saga.svg`, h: 12, raport: 5.968 },
  // livrare
  Sameday: { src: `${I}/sameday.webp`, h: 24, raport: 0.988 },
  Cargus: { src: `${I}/cargus.webp`, h: 22, raport: 1.298 },
  DPD: { src: `${I}/dpd.svg`, h: 14, raport: 2.333 },
  'FAN Courier': { src: `${I}/fan-courier.svg`, h: 20, raport: 1.639 },
  DHL: { src: `${I}/dhl.svg`, h: 15, raport: 3.235 },
  UPS: { src: `${I}/ups.svg`, h: 22, raport: 0.843 },
  Woot: { src: `${I}/woot.webp`, h: 24, raport: 1.137 },
  // vanzare, marketing si comunicare
  eMAG: { src: `${I}/emag.webp`, h: 14, raport: 3.738 },
  'Google Merchant': { src: `${I}/google-merchant.svg`, h: 16, raport: 1, text: 'Google Merchant' },
  'Google Ads': { src: `${I}/google-ads.svg`, h: 15, raport: 1.092, text: 'Google Ads' },
  Klaviyo: { src: `${I}/klaviyo.svg`, h: 13, raport: 3.378 },
  OptinMonster: { src: `${I}/optinmonster.webp`, h: 12, raport: 6.667 },
  SMSO: { src: `${I}/smso.svg`, h: 10, raport: 4.413 },
  Tidio: { src: `${I}/tidio.webp`, h: 15, raport: 3.202 },
  Crisp: { src: `${I}/crisp.svg`, h: 15, raport: 3.375 },
  WhatsApp: { src: `${I}/whatsapp.svg`, h: 15, raport: 1, text: 'WhatsApp' },
  // alte servicii
  TecDoc: { src: `${I}/tecdoc.svg`, h: 22, raport: 1 },
  Booking: { src: `${I}/booking.svg`, h: 12, raport: 5.894 },
  // tehnologii
  PHP: { src: `${T}/php.svg`, h: 26, raport: 1 },
  Laravel: { src: `${T}/laravel.svg`, h: 15, raport: 1, text: 'Laravel' },
  WordPress: { src: `${T}/wordpress.svg`, h: 15, raport: 1, text: 'WordPress' },
  'Next.js': { src: `${T}/nextjs.svg`, h: 15, raport: 1, text: 'Next.js' },
  React: { src: `${T}/react.svg`, h: 15, raport: 1, text: 'React' },
  Supabase: { src: `${T}/supabase.svg`, h: 15, raport: 1, text: 'Supabase' },
  Shopify: { src: `${T}/shopify.svg`, h: 16, raport: 0.877, text: 'Shopify' },
};

// cat incape intr-o casuta de un loc (vezi .sigle in Sigle.module.css: 74px, din care 16px margini)
const LOC = 74 - 16;

export function Sigle({ nume }: { nume: string[] }) {
  return (
    <span className={styles.sigle}>
      {nume.map((n) => {
        const g = SIGLE[n];
        if (!g) {
          return (
            <span key={n} className={`${styles.casuta} ${styles.text}`} data-lat="">
              {n}
            </span>
          );
        }
        const w = Math.round(g.h * g.raport);
        // marimea e fixata si in stil: altfel `height: auto` din stilurile de baza o rotunjeste altfel decat
        // atributele, iar Next avertizeaza in consola
        return (
          <span key={n} className={styles.casuta} data-lat={g.text || w > LOC ? '' : undefined}>
            <Image src={g.src} alt={g.text ? '' : n} width={w} height={g.h} style={{ width: w, height: g.h }} unoptimized />
            {g.text && <span className={styles.text}>{g.text}</span>}
          </span>
        );
      })}
    </span>
  );
}

// limba: numele si steagul (engleza cu steagul Marii Britanii)
const LIMBI: Record<string, { nume: string; src: string }> = {
  ro: { nume: 'Română', src: `${S}/ro.svg` },
  en: { nume: 'Engleză', src: `${S}/gb.svg` },
  de: { nume: 'Germană', src: `${S}/de.svg` },
  fr: { nume: 'Franceză', src: `${S}/fr.svg` },
  it: { nume: 'Italiană', src: `${S}/it.svg` },
  es: { nume: 'Spaniolă', src: `${S}/es.webp` },
  tr: { nume: 'Turcă', src: `${S}/tr.svg` },
};

export function Steaguri({ coduri, total }: { coduri: string[]; total?: number }) {
  const inPlus = total && total > coduri.length ? total - coduri.length : 0;
  return (
    <span className={styles.steaguri}>
      {coduri.map((c) => {
        const l = LIMBI[c];
        return l ? (
          <Image
            key={c}
            src={l.src}
            alt={l.nume}
            title={l.nume}
            width={24}
            height={18}
            style={{ width: 24, height: 18 }}
            unoptimized
            className={styles.steag}
          />
        ) : (
          <span key={c} className={styles.inPlus}>
            {c}
          </span>
        );
      })}
      {inPlus > 0 && (
        <span className={styles.inPlus} title={`Încă ${inPlus} limbi`}>
          +{inPlus}
          <span className={styles.ascuns}> limbi</span>
        </span>
      )}
    </span>
  );
}
