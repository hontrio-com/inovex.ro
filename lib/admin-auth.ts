import { createHmac, randomBytes, timingSafeEqual } from 'crypto';

function secret(): string {
  const s = process.env.ADMIN_SECRET;
  if (!s) throw new Error('ADMIN_SECRET env var is not set');
  return s;
}

/** Generates a signed token: `<random>.<hmac>` */
export function generateAdminToken(): string {
  const rand = randomBytes(32).toString('hex');
  const sig  = createHmac('sha256', secret()).update(rand).digest('hex');
  return `${rand}.${sig}`;
}

/** Verifies a signed token using timing-safe comparison */
export function verifyAdminToken(signedToken: string): boolean {
  try {
    const dot  = signedToken.lastIndexOf('.');
    if (dot === -1) return false;
    const rand = signedToken.slice(0, dot);
    const sig  = signedToken.slice(dot + 1);
    const expected = createHmac('sha256', secret()).update(rand).digest('hex');
    const sigBuf = Buffer.from(sig,      'hex');
    const expBuf = Buffer.from(expected, 'hex');
    if (sigBuf.length !== expBuf.length) return false;
    return timingSafeEqual(sigBuf, expBuf);
  } catch {
    return false;
  }
}

export const COOKIE_NAME = 'admin_token';
export const COOKIE_MAX_AGE = 60 * 60 * 8; // 8 ore
