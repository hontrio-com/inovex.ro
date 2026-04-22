import { z } from 'zod';

export const automatizariStep1Schema = z.object({
  tipAfacere: z.enum(['magazin-online', 'prestari-servicii', 'afacere-locala', 'alt-tip']),
});

export const proceseEnum = z.enum([
  'comunicare-clienti',
  'confirmare-comenzi',
  'gestionare-date',
  'taskuri-interne',
  'facturi-documente',
  'altceva',
]);

export const automatizariStep2Schema = z
  .object({
    proceseAutomatizare: z.array(proceseEnum).min(1, 'Te rugam sa selectezi cel putin un proces'),
    descriereAltceva: z.string().max(500).optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.proceseAutomatizare.includes('altceva') &&
      (!data.descriereAltceva || data.descriereAltceva.trim().length < 10)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Te rugam sa descrii ce proces vrei sa automatizezi',
        path: ['descriereAltceva'],
      });
    }
  });

export const automatizariStep3Schema = z.object({
  numeComplet: z.string().min(2, 'Numele trebuie sa aiba minim 2 caractere'),
  email:       z.string().email('Email invalid').optional().or(z.literal('')),
  telefon:     z.string().min(10, 'Numarul de telefon este invalid'),
  gdprConsent: z.boolean().refine((val) => val === true, {
    message: 'Trebuie sa accepti politica de confidentialitate',
  }),
});

/* Combined schema for API validation */
export const automatizariCompleteSchema = z
  .object({
    tipAfacere:          z.enum(['magazin-online', 'prestari-servicii', 'afacere-locala', 'alt-tip']),
    proceseAutomatizare: z.array(proceseEnum).min(1),
    descriereAltceva:    z.string().max(500).optional(),
    numeComplet:         z.string().min(2),
    email:               z.string().email().optional().or(z.literal('')),
    telefon:             z.string().min(10).max(20),
    gdprConsent:         z.literal(true),
  })
  .superRefine((data, ctx) => {
    if (
      data.proceseAutomatizare.includes('altceva') &&
      (!data.descriereAltceva || data.descriereAltceva.trim().length < 10)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Te rugam sa descrii ce proces vrei sa automatizezi',
        path: ['descriereAltceva'],
      });
    }
  });

export type AutomatizariFormData = z.infer<typeof automatizariCompleteSchema>;
