import { z } from 'zod';

/** String optional: '', null, undefined -> null; altfel trim + limita lungime. */
const optStr = (max = 500) =>
  z.preprocess(
    (v) => (v === '' || v == null ? null : typeof v === 'string' ? v.trim() : v),
    z.string().max(max).nullable(),
  );

/** Email optional: '' -> null; altfel validat. */
const optEmail = z.preprocess(
  (v) => (v === '' || v == null ? null : typeof v === 'string' ? v.trim() : v),
  z.string().email('Email invalid').nullable(),
);

/** UUID optional: '' -> null; altfel validat. */
const optUuid = z.preprocess(
  (v) => (v === '' || v == null ? null : v),
  z.string().uuid('Valoare invalida').nullable(),
);

/**
 * Schema client — folosita atat la creare cat si la editare (formularul
 * trimite intotdeauna setul complet de campuri editabile).
 */
export const clientSchema = z.object({
  name:           z.string().trim().min(1, 'Numele e obligatoriu').max(200),
  type:           z.enum(['PF', 'PJ']).default('PJ'),
  cui:            optStr(50),
  reg_com:        optStr(50),
  iban:           optStr(50),
  bank:           optStr(120),
  address:        optStr(1000),
  city:           optStr(120),
  county:         optStr(120),
  country:        optStr(120),
  website:        optStr(200),
  email:          optEmail,
  phone:          optStr(50),
  contact_person: optStr(200),
  status:         z.enum(['activ', 'inactiv', 'prospect']).default('activ'),
  source:         optStr(120),
  assigned_to:    optUuid,
  gdpr_consent:   z.preprocess((v) => v ?? false, z.boolean()),
  notes:          optStr(5000),
});

export type ClientInput = z.infer<typeof clientSchema>;

/** Adaugare activitate (nota / apel / email / meeting / task) pe client sau lead. */
export const activityCreateSchema = z.object({
  type:  z.enum(['note', 'call', 'email', 'meeting', 'task']).default('note'),
  title: optStr(200),
  body:  z.string().trim().min(1, 'Continutul e obligatoriu').max(5000),
});
