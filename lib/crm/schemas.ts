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

const LEAD_STATUSES = ['nou', 'calificat', 'convertit', 'edinio', 'necalificat', 'pierdut'] as const;

/** Schema lead — creare + editare (formularul trimite setul complet). */
export const leadSchema = z
  .object({
    name:            optStr(200),
    company:         optStr(200),
    email:           optEmail,
    phone:           optStr(50),
    status:          z.enum(LEAD_STATUSES).default('nou'),
    source:          optStr(120),
    platform:        z.preprocess(
                       (v) => (v === '' || v == null ? null : v),
                       z.enum(['meta', 'google', 'tiktok', 'website', 'manual']).nullable(),
                     ),
    campaign:        optStr(200),
    estimated_value: z.preprocess(
                       (v) => (v === '' || v == null ? null : typeof v === 'string' ? Number(v) : v),
                       z.number().nonnegative('Valoare invalida').nullable(),
                     ),
    currency:        z.preprocess((v) => (v == null || v === '' ? 'RON' : v), z.string().max(10)),
    assigned_to:     optUuid,
    lost_reason:     optStr(500),
    notes:           optStr(5000),
  })
  .refine((d) => !!(d.name || d.phone || d.email || d.company), { message: 'Completeaza cel putin numele sau telefonul', path: ['name'] });

/** Schimbare rapida de status (drag Kanban / marcare convertit-pierdut). */
export const leadStatusSchema = z.object({
  status:          z.enum(LEAD_STATUSES),
  lost_reason:     optStr(500),
  // Valoarea contractului, ceruta la mutarea pe Convertit (pleaca in semnalul de ads).
  estimated_value: z.preprocess(
                     (v) => (v === '' || v == null ? null : typeof v === 'string' ? Number(v) : v),
                     z.number().nonnegative('Valoare invalida').nullable(),
                   ),
});

/** Sablon de contract (creare + editare). */
export const templateSchema = z.object({
  name:        z.string().trim().min(1, 'Numele e obligatoriu').max(200),
  description: optStr(500),
  content:     z.string().trim().min(1, 'Continutul e obligatoriu'),
  is_active:   z.preprocess((v) => v ?? true, z.boolean()),
});

/** Generare contract din client + sablon. */
export const contractCreateSchema = z.object({
  client_id:   z.string().uuid('Client invalid'),
  template_id: z.string().uuid('Sablon invalid'),
  title:       optStr(200),
  value:       z.preprocess(
                 (v) => (v === '' || v == null ? null : typeof v === 'string' ? Number(v) : v),
                 z.number().nonnegative('Valoare invalida').nullable(),
               ),
  currency:    z.preprocess((v) => (v == null || v === '' ? 'RON' : v), z.string().max(10)),
});

const BILLING_CYCLES = ['lunar', 'trimestrial', 'semestrial', 'anual'] as const;

/** Abonament de mentenanta (creare + editare). */
export const subscriptionSchema = z.object({
  client_id:         z.string().uuid('Client invalid'),
  name:              z.string().trim().min(1, 'Numele e obligatoriu').max(200),
  status:            z.enum(['activ', 'suspendat', 'expirat', 'anulat']).default('activ'),
  price:             z.preprocess(
                       (v) => (v === '' || v == null ? null : typeof v === 'string' ? Number(v) : v),
                       z.number().nonnegative('Pret invalid').nullable(),
                     ),
  currency:          z.preprocess((v) => (v == null || v === '' ? 'RON' : v), z.string().max(10)),
  billing_cycle:     z.enum(BILLING_CYCLES).default('lunar'),
  start_date:        z.preprocess((v) => (v === '' || v == null ? null : v), z.string().nullable()),
  next_renewal_date: z.preprocess((v) => (v === '' || v == null ? null : v), z.string().nullable()),
  contract_id:       optUuid,
  package_id:        optUuid,
  notes:             optStr(2000),
});

/** Pachet de mentenanta (sablon reutilizabil). */
export const packageSchema = z.object({
  name:          z.string().trim().min(1, 'Numele e obligatoriu').max(200),
  description:   optStr(1000),
  price:         z.preprocess(
                   (v) => (v === '' || v == null ? null : typeof v === 'string' ? Number(v) : v),
                   z.number().nonnegative('Pret invalid').nullable(),
                 ),
  currency:      z.preprocess((v) => (v == null || v === '' ? 'RON' : v), z.string().max(10)),
  billing_cycle: z.enum(BILLING_CYCLES).default('lunar'),
  features:      z.preprocess(
                   (v) => (Array.isArray(v) ? v.map((x) => String(x).trim()).filter(Boolean) : []),
                   z.array(z.string().max(300)).max(50),
                 ),
  is_active:     z.preprocess((v) => v ?? true, z.boolean()),
});

/** O intrare de logare pentru website. */
const credentialSchema = z.object({
  label:    optStr(120),
  url:      optStr(300),
  username: optStr(200),
  password: optStr(500),
});

/** Website administrat sub mentenanta. */
export const websiteSchema = z.object({
  client_id:       z.string().uuid('Client invalid'),
  subscription_id: optUuid,
  label:           optStr(200),
  domain:          optStr(200),
  platform:        optStr(120),
  hosting:         optStr(200),
  hosting_url:     optStr(300),
  admin_url:       optStr(300),
  status:          z.enum(['activ', 'in_dezvoltare', 'suspendat', 'arhivat']).default('activ'),
  credentials:     z.preprocess((v) => (Array.isArray(v) ? v : []), z.array(credentialSchema).max(30)),
  notes:           optStr(2000),
});

/** Setari firma (contracte + semnatura). */
export const orgSettingsSchema = z.object({
  company_name:    optStr(200),
  company_cui:     optStr(50),
  company_reg_com: optStr(50),
  company_address: optStr(500),
  company_iban:    optStr(50),
  company_bank:    optStr(120),
  email:           optEmail,
  signer_name:     optStr(200),
  reminder_days:   z.preprocess((v) => (v === '' || v == null ? 3 : typeof v === 'string' ? Number(v) : v), z.number().int().min(1).max(90)),
  expiry_days:     z.preprocess((v) => (v === '' || v == null ? 14 : typeof v === 'string' ? Number(v) : v), z.number().int().min(1).max(365)),
});
