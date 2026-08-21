/**
 * Maparea raspunsurilor dintr-un Instant Form Meta pe campurile lead-ului.
 *
 * Meta trimite numele campurilor exact cum le-a scris cine a creat formularul,
 * nu intr-un vocabular fix: formularul nostru are `e-mail` (cu cratima) si
 * `număr_de_telefon` (cu diacritice), nu `email`/`phone_number`. De-aia numele
 * se normalizeaza inainte de comparare (minuscule, fara diacritice, doar
 * litere si cifre) si se potrivesc pe fragment, nu pe egalitate.
 *
 * Ca plasa de siguranta pentru orice formular viitor cu denumiri neprevazute,
 * campurile ramase nepotrivite se verifica dupa FORMA valorii: ceva care arata
 * a adresa de email sau a numar de telefon e luat ca atare.
 *
 * Ce nu se potriveste ajunge in notite, ca text "Eticheta: valoare".
 */

export interface MetaFieldData {
  name?: string;
  values?: unknown[];
}

export interface MappedLeadFields {
  name: string | null;
  email: string | null;
  phone: string | null;
  notes: string | null;
}

/** `e-mail` -> `email`, `număr_de_telefon` -> `numardetelefon`, `Full Name` -> `fullname`. */
function normalizeKey(raw: string): string {
  return raw
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '') // scoate semnele diacritice descompuse de NFD (ă, â, î, ș, ț)
    .replace(/[^a-z0-9]/g, '');
}

/* Numele se potrivesc EXACT (dupa normalizare): "prenume" si "numedefamilie"
   contin amandoua "nume", deci un fragment ar confunda campurile intre ele. */
const FULL_NAME_KEYS = new Set(['fullname', 'name', 'nume', 'numecomplet', 'numesiprenume', 'numeprenume']);
const FIRST_NAME_KEYS = new Set(['firstname', 'prenume']);
const LAST_NAME_KEYS = new Set(['lastname', 'surname', 'numedefamilie', 'numedefamilies']);

const EMAIL_KEY_PARTS = ['email', 'mail'];
const PHONE_KEY_PARTS = ['telefon', 'phone', 'mobil'];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function looksLikeEmail(value: string): boolean {
  return EMAIL_RE.test(value);
}

function looksLikePhone(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  // 8-15 cifre = interval E.164 rezonabil; forma trebuie sa fie doar cifre si
  // separatoare, altfel raspunsuri gen "1–20 produse" ar trece drept telefon.
  return digits.length >= 8 && digits.length <= 15 && /^\+?[\d\s().\-/]+$/.test(value.trim());
}

/**
 * Varianta stricta, pentru cand ghicim dupa valoare un camp al carui nume nu
 * spune nimic: cere prefix international sau zero initial. Fara asta, un
 * raspuns gen "cifra de afaceri: 15000000" ar trece drept numar de telefon.
 */
function looksLikePhoneStrict(value: string): boolean {
  return looksLikePhone(value) && /^(\+|00|0)/.test(value.trim());
}

/** Mapeaza field_data (raspunsurile formularului) pe campurile lead-ului. */
export function mapFieldData(fieldData: MetaFieldData[]): MappedLeadFields {
  let name: string | null = null;
  let firstName = '';
  let lastName = '';
  let email: string | null = null;
  let phone: string | null = null;
  const extra: string[] = [];
  const unmatched: { label: string; value: string }[] = [];

  for (const f of fieldData) {
    const value = String(f.values?.[0] ?? '').trim();
    if (!value) continue;
    const label = f.name ?? '';
    const key = normalizeKey(label);

    if (FULL_NAME_KEYS.has(key)) name ??= value;
    else if (FIRST_NAME_KEYS.has(key)) firstName ||= value;
    else if (LAST_NAME_KEYS.has(key)) lastName ||= value;
    else if (!email && EMAIL_KEY_PARTS.some((p) => key.includes(p)) && looksLikeEmail(value)) email = value;
    else if (!phone && PHONE_KEY_PARTS.some((p) => key.includes(p)) && looksLikePhone(value)) phone = value;
    else unmatched.push({ label, value });
  }

  // Plasa de siguranta: campuri cu denumiri neasteptate, recunoscute dupa valoare.
  for (const { label, value } of unmatched) {
    if (!email && looksLikeEmail(value)) email = value;
    else if (!phone && looksLikePhoneStrict(value)) phone = value;
    else extra.push(`${label}: ${value}`);
  }

  if (!name && (firstName || lastName)) name = `${firstName} ${lastName}`.trim();
  return { name, email, phone, notes: extra.length ? extra.join('\n') : null };
}
