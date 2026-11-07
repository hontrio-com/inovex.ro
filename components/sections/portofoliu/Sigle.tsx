import Image from 'next/image';
import { completeaza } from '@/lib/i18n/completeaza';
import type { Limba } from '@/lib/i18n/config';
import { textPortofoliu } from '@/lib/i18n/pagini/portofoliu';
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
  // portofoliul international (2026-11-07): simple-icons in culoarea marcii; OpenAI de pe Wikimedia Commons
  // (domeniu public). Clearpay are acelasi semn ca Afterpay (aceeasi firma), cu numele scris langa.
  Klarna: { src: `${I}/klarna.svg`, h: 15, raport: 1, text: 'Klarna' },
  Clearpay: { src: `${I}/clearpay.svg`, h: 15, raport: 1, text: 'Clearpay' },
  Trustpilot: { src: `${I}/trustpilot.svg`, h: 15, raport: 1, text: 'Trustpilot' },
  ChatGPT: { src: `${I}/openai.svg`, h: 15, raport: 1.009, text: 'ChatGPT' },
  OpenAI: { src: `${I}/openai.svg`, h: 15, raport: 1.009, text: 'OpenAI' },
  Anthropic: { src: `${I}/anthropic.svg`, h: 15, raport: 1, text: 'Anthropic' },
  Claude: { src: `${I}/claude.svg`, h: 15, raport: 1, text: 'Claude' },
  Gemini: { src: `${I}/gemini.svg`, h: 15, raport: 1, text: 'Gemini' },
  Perplexity: { src: `${I}/perplexity.svg`, h: 15, raport: 1, text: 'Perplexity' },
  MCP: { src: `${I}/mcp.svg`, h: 15, raport: 1, text: 'MCP' },
  'Hugging Face': { src: `${I}/hugging-face.svg`, h: 15, raport: 1, text: 'Hugging Face' },
  Telegram: { src: `${I}/telegram.svg`, h: 15, raport: 1, text: 'Telegram' },
  Instagram: { src: `${I}/instagram.svg`, h: 15, raport: 1, text: 'Instagram' },
  TikTok: { src: `${I}/tiktok.svg`, h: 15, raport: 1, text: 'TikTok' },
  YouTube: { src: `${I}/youtube.svg`, h: 15, raport: 1, text: 'YouTube' },
  Gmail: { src: `${I}/gmail.svg`, h: 15, raport: 1, text: 'Gmail' },
  HubSpot: { src: `${I}/hubspot.svg`, h: 15, raport: 1, text: 'HubSpot' },
  'Google Sheets': { src: `${I}/google-sheets.svg`, h: 15, raport: 1, text: 'Google Sheets' },
  Notion: { src: `${I}/notion.svg`, h: 15, raport: 1, text: 'Notion' },
  GitHub: { src: `${I}/github.svg`, h: 15, raport: 1, text: 'GitHub' },
  Chrome: { src: `${I}/chrome.svg`, h: 15, raport: 1, text: 'Chrome' },
  // tehnologii
  PHP: { src: `${T}/php.svg`, h: 26, raport: 1 },
  Laravel: { src: `${T}/laravel.svg`, h: 15, raport: 1, text: 'Laravel' },
  WordPress: { src: `${T}/wordpress.svg`, h: 15, raport: 1, text: 'WordPress' },
  'Next.js': { src: `${T}/nextjs.svg`, h: 15, raport: 1, text: 'Next.js' },
  React: { src: `${T}/react.svg`, h: 15, raport: 1, text: 'React' },
  Supabase: { src: `${T}/supabase.svg`, h: 15, raport: 1, text: 'Supabase' },
  Shopify: { src: `${T}/shopify.svg`, h: 16, raport: 0.877, text: 'Shopify' },
  // portofoliul international (2026-11-07); Tencent Cloud de pe Wikimedia Commons (domeniu public), doar norul
  Angular: { src: `${T}/angular.svg`, h: 15, raport: 1, text: 'Angular' },
  'Node.js': { src: `${T}/nodejs.svg`, h: 15, raport: 1, text: 'Node.js' },
  Astro: { src: `${T}/astro.svg`, h: 15, raport: 1, text: 'Astro' },
  'Tailwind CSS': { src: `${T}/tailwind.svg`, h: 15, raport: 1, text: 'Tailwind CSS' },
  Vercel: { src: `${T}/vercel.svg`, h: 14, raport: 1, text: 'Vercel' },
  Sanity: { src: `${T}/sanity.svg`, h: 15, raport: 1, text: 'Sanity' },
  Firebase: { src: `${T}/firebase.svg`, h: 15, raport: 1, text: 'Firebase' },
  'Tencent Cloud': { src: `${T}/tencent-cloud.svg`, h: 13, raport: 1.376, text: 'Tencent Cloud' },
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

// steagul fiecarei limbi (engleza cu steagul Marii Britanii); numele limbii, in limba paginii, e in
// lib/i18n/pagini/portofoliu.ts
const STEAGURI: Record<string, string> = {
  ro: `${S}/ro.svg`,
  en: `${S}/gb.svg`,
  de: `${S}/de.svg`,
  fr: `${S}/fr.svg`,
  it: `${S}/it.svg`,
  es: `${S}/es.webp`,
  tr: `${S}/tr.svg`,
};

export function Steaguri({ coduri, total, lang = 'ro' }: { coduri: string[]; total?: number; lang?: Limba }) {
  const t = textPortofoliu(lang);
  const inPlus = total && total > coduri.length ? total - coduri.length : 0;
  return (
    <span className={styles.steaguri}>
      {coduri.map((c) => {
        const src = STEAGURI[c];
        const nume = t.limbi[c] ?? c;
        return src ? (
          <Image
            key={c}
            src={src}
            alt={nume}
            title={nume}
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
        <span className={styles.inPlus} title={completeaza(t.incaLimbi, { n: inPlus })}>
          +{inPlus}
          <span className={styles.ascuns}>{t.limbiAscuns}</span>
        </span>
      )}
    </span>
  );
}
