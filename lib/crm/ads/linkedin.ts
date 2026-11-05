import crypto from 'crypto';

/**
 * LinkedIn Conversions API (adaugat pe 2026-11-05). Evenimentele pleaca pe regulile de conversie create
 * prin API in contul de reclame 509346705 (conversionMethod CONVERSIONS_API, atribuire „Fiecare campanie”),
 * cu tokenul „Direct API” generat in Campaign Manager (LINKEDIN_CAPI_TOKEN; nu expira).
 * Documentatie: https://learn.microsoft.com/en-us/linkedin/marketing/integrations/ads-reporting/conversions-api
 *
 * - Lead-ul de pe site (website-lead.ts) pleaca cu acelasi eventId ca evenimentul din Insight Tag
 *   (lib/linkedin.ts), deci LinkedIn il numara o singura data: pastreaza evenimentul din tag.
 * - Etapele din CRM (Calificat, Convertit cu valoare, Catre Edinio) pleaca din signals.ts.
 * - Comanda Motion Design platita pleaca din webhook-ul Stripe, cu valoarea reala (doar pe server).
 * - Valorile pleaca in moneda contului (USD): RON nu e printre monedele acceptate de LinkedIn.
 */

const URL_EVENIMENTE = 'https://api.linkedin.com/rest/conversionEvents';
// versiunea API, YYYYMM (202511 se inchide pe 2026-11-16)
const VERSIUNE = '202610';

// regulile de conversie de server (Campaign Manager -> Conversion tracking, „Server – …”)
export const LINKEDIN_CONVERSII = {
  lead: 31928770, // Server – Lead de pe site (LEAD)
  calificat: 31928778, // Server – Lead calificat (CRM) (QUALIFIED_LEAD)
  convertit: 31928786, // Server – Client câștigat (CRM) (PURCHASE, cu valoare)
  edinio: 31928794, // Server – Lead trimis la Edinio (CRM) (OTHER)
  comandaMotion: 31928802, // Server – Comandă Motion Design (PURCHASE, cu valoare)
} as const;

// Moneda contului de reclame (aleasa la creare, nu se mai poate schimba). RON nu e printre monedele LinkedIn
// (https://learn.microsoft.com/en-us/linkedin/shared/references/v2/ads/supported-currencies), asa ca valorile
// se convertesc la cursul de referinta BCE al zilei (are si RON; la a patra zecimala, acelasi cu cel BNR).
const MONEDA_CONT = 'USD';
const CURSURI_BCE = 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml';
let cursuri: { la: number; perEuro: Record<string, number> } | null = null;

/** Cate unitati din fiecare moneda face 1 EUR (cursul BCE), pastrat 6 ore in memoria instantei. */
async function cursuriPerEuro(): Promise<Record<string, number> | null> {
  if (cursuri && Date.now() - cursuri.la < 6 * 60 * 60 * 1000) return cursuri.perEuro;
  try {
    const res = await fetch(CURSURI_BCE, { cache: 'no-store', signal: AbortSignal.timeout(5000) });
    if (res.ok) {
      const perEuro: Record<string, number> = { EUR: 1 };
      for (const m of (await res.text()).matchAll(/currency=['"]([A-Z]{3})['"]\s+rate=['"]([\d.]+)['"]/g)) {
        perEuro[m[1]] = Number(m[2]);
      }
      if (perEuro[MONEDA_CONT] && perEuro.RON) cursuri = { la: Date.now(), perEuro };
    }
  } catch {
    // ramane cursul de data trecuta, daca exista
  }
  return cursuri?.perEuro ?? null;
}

/** Valoarea in moneda contului, sau null cand nu exista curs (nu se ghiceste). */
async function inMonedaContului(v: { amount: number; currency: string }): Promise<{ amount: number; currency: string } | null> {
  const moneda = v.currency.toUpperCase();
  if (moneda === MONEDA_CONT) return { amount: v.amount, currency: moneda };
  const curs = await cursuriPerEuro();
  const din = curs?.[moneda];
  const spre = curs?.[MONEDA_CONT];
  return din && spre ? { amount: (v.amount / din) * spre, currency: MONEDA_CONT } : null;
}

export function linkedinOutboundConfigured(): boolean {
  return Boolean(process.env.LINKEDIN_CAPI_TOKEN?.trim());
}

export interface LinkedInEventInput {
  conversionId: number;
  /** pentru deduplicarea cu Insight Tag si intre reincercari; stabil per eveniment */
  eventId?: string | null;
  /** momentul conversiei, in milisecunde (LinkedIn accepta doar ultimele 90 de zile) */
  happenedAt?: number;
  email?: string | null;
  /** click ID-ul reclamei LinkedIn (cookie-ul primar li_fat_id pus de Insight Tag) */
  liFatId?: string | null;
  ip?: string | null;
  /** numele complet; se imparte in prenume + nume (LinkedIn le cere pe amandoua) */
  name?: string | null;
  company?: string | null;
  /** in orice moneda (de obicei RON); sendLinkedInEvent o trimite convertita in moneda contului */
  value?: { amount: number; currency: string } | null;
}

export interface LinkedInResult {
  ok: boolean;
  error?: string;
  unconfigured?: boolean;
  skip?: boolean;
}

const sha256 = (v: string) => crypto.createHash('sha256').update(v).digest('hex');
// LinkedIn primeste doar adrese IPv4
const IPV4 = /^(25[0-5]|2[0-4]\d|1?\d?\d)(\.(25[0-5]|2[0-4]\d|1?\d?\d)){3}$/;
const ZI = 24 * 60 * 60 * 1000;

/**
 * Corpul unui eveniment pentru /rest/conversionEvents, sau null cand nu exista niciun identificator
 * (LinkedIn l-ar refuza). Identificatori: email (SHA-256, litere mici, fara spatii), li_fat_id, IPv4;
 * prenumele + numele si firma ajuta potrivirea.
 */
export function linkedinEvent(input: LinkedInEventInput): Record<string, unknown> | null {
  const userIds: { idType: string; idValue: string }[] = [];
  const email = input.email?.trim().toLowerCase();
  if (email) userIds.push({ idType: 'SHA256_EMAIL', idValue: sha256(email) });
  const fat = input.liFatId?.trim();
  if (fat) userIds.push({ idType: 'LINKEDIN_FIRST_PARTY_ADS_TRACKING_UUID', idValue: fat });
  const ip = input.ip?.trim();
  if (ip && IPV4.test(ip)) userIds.push({ idType: 'PLAINTEXT_IP_ADDRESS', idValue: ip });

  const parti = (input.name ?? '').trim().split(/\s+/).filter(Boolean);
  const firma = input.company?.trim();
  const userInfo =
    parti.length >= 2
      ? { firstName: parti[0], lastName: parti.slice(1).join(' '), ...(firma ? { companyName: firma } : {}) }
      : null;

  if (userIds.length === 0 && !userInfo) return null;

  // un semnal ramas mult in coada pleaca cu cel mai vechi moment acceptat, nu se pierde
  const acum = Date.now();
  const t = input.happenedAt && Number.isFinite(input.happenedAt) ? input.happenedAt : acum;
  const cand = Math.min(Math.max(t, acum - 89 * ZI), acum);

  const valoare = input.value && Number.isFinite(input.value.amount) && input.value.amount > 0 ? input.value : null;

  return {
    conversion: `urn:lla:llaPartnerConversion:${input.conversionId}`,
    conversionHappenedAt: Math.round(cand),
    ...(valoare
      ? { conversionValue: { currencyCode: valoare.currency.toUpperCase(), amount: valoare.amount.toFixed(2) } }
      : {}),
    ...(input.eventId ? { eventId: input.eventId } : {}),
    user: { userIds, ...(userInfo ? { userInfo } : {}) },
  };
}

/**
 * Trimite un eveniment. Fara token: `unconfigured` (semnalul din CRM ramane in asteptare). Fara curs pentru
 * valoare: eroare, ca semnalul din CRM sa fie reincercat de cron in loc sa plece cu valoarea gresita.
 */
export async function sendLinkedInEvent(input: LinkedInEventInput): Promise<LinkedInResult> {
  const token = process.env.LINKEDIN_CAPI_TOKEN?.trim();
  if (!token) return { ok: false, unconfigured: true };
  let value = input.value ?? null;
  if (value && Number.isFinite(value.amount) && value.amount > 0) {
    value = await inMonedaContului(value);
    if (!value) return { ok: false, error: `Fara curs ${input.value!.currency} -> ${MONEDA_CONT} (BCE indisponibil)` };
  }
  const event = linkedinEvent({ ...input, value });
  if (!event) return { ok: false, skip: true, error: 'Fara identificatori LinkedIn (email, li_fat_id, IP sau nume)' };

  const res = await fetch(URL_EVENIMENTE, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'LinkedIn-Version': VERSIUNE,
      'X-Restli-Protocol-Version': '2.0.0',
    },
    body: JSON.stringify(event),
    signal: AbortSignal.timeout(10_000),
  });
  if (res.ok) return { ok: true };
  const text = await res.text().catch(() => '');
  return { ok: false, error: `${res.status} ${text}`.slice(0, 500) };
}
