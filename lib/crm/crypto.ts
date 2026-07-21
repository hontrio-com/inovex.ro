import crypto from 'crypto';

/**
 * Criptare la nivel de aplicatie pentru date sensibile (parole website-uri).
 * AES-256-GCM cu cheie derivata dintr-un secret de mediu stabil.
 *
 * Cheia: CRM_ENCRYPTION_KEY daca e setata, altfel SUPABASE_SERVICE_ROLE_KEY
 * (mereu prezent pe server, secret, stabil per proiect). Derivare = sha256(secret).
 * Recomandare productie: seteaza CRM_ENCRYPTION_KEY dedicat (>= 32 caractere).
 */
const ALGO = 'aes-256-gcm';

function getKey(): Buffer {
  const secret = process.env.CRM_ENCRYPTION_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  if (!secret) throw new Error('Lipseste cheia de criptare (CRM_ENCRYPTION_KEY / SUPABASE_SERVICE_ROLE_KEY)');
  return crypto.createHash('sha256').update(String(secret)).digest();
}

/** Cripteaza orice valoare serializabila JSON. Format: v1:iv:tag:ciphertext (base64). */
export function encryptJson(value: unknown): string {
  const key = getKey();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGO, key, iv);
  const enc = Buffer.concat([cipher.update(Buffer.from(JSON.stringify(value ?? null), 'utf8')), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `v1:${iv.toString('base64')}:${tag.toString('base64')}:${enc.toString('base64')}`;
}

/** Decripteaza un payload produs de encryptJson. Returneaza null la orice eroare. */
export function decryptJson<T = unknown>(payload: string | null | undefined): T | null {
  if (!payload) return null;
  try {
    const [v, ivB64, tagB64, dataB64] = payload.split(':');
    if (v !== 'v1' || !ivB64 || !tagB64 || !dataB64) return null;
    const decipher = crypto.createDecipheriv(ALGO, getKey(), Buffer.from(ivB64, 'base64'));
    decipher.setAuthTag(Buffer.from(tagB64, 'base64'));
    const dec = Buffer.concat([decipher.update(Buffer.from(dataB64, 'base64')), decipher.final()]);
    return JSON.parse(dec.toString('utf8')) as T;
  } catch {
    return null;
  }
}
