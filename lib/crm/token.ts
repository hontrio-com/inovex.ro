import { randomBytes } from 'crypto';

const ALPHABET = 'abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // fara caractere ambigue (0/O, 1/l/I)

/** Token scurt, unic si imposibil de ghicit pentru linkul public de semnare. */
export function shortToken(len = 10): string {
  const bytes = randomBytes(len);
  let out = '';
  for (let i = 0; i < len; i++) out += ALPHABET[bytes[i] % ALPHABET.length];
  return out;
}
