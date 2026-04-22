import { z } from 'zod';

export const aplicatieWebStep1Schema = z.object({
  ideaClaritate: z.enum(['da-stiu-exact', 'am-o-idee', 'am-nevoie-de-ajutor']),
});

export const aplicatieWebStep2Schema = z.object({
  tipAplicatie: z.enum(['platforma-utilizatori', 'marketplace', 'aplicatie-servicii', 'sistem-intern', 'alt-tip']),
  descriereIdeea: z.string().max(500).optional(),
});

export const aplicatieWebStep3Schema = z.object({
  numeComplet: z.string().min(2, 'Numele trebuie sa aiba minim 2 caractere'),
  email:       z.string().email('Email invalid').optional().or(z.literal('')),
  telefon:     z.string().min(10, 'Numarul de telefon este invalid'),
  gdprConsent: z.boolean().refine((val) => val === true, {
    message: 'Trebuie sa accepti politica de confidentialitate',
  }),
});

export const aplicatieWebCompleteSchema = aplicatieWebStep1Schema
  .merge(aplicatieWebStep2Schema)
  .merge(aplicatieWebStep3Schema);

export type AplicatieWebFormData = z.infer<typeof aplicatieWebCompleteSchema>;
