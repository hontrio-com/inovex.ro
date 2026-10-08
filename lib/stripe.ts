import Stripe from 'stripe';

let client: Stripe | null = null;

/** Clientul Stripe (doar pe server). Intoarce null cat timp STRIPE_SECRET_KEY nu e setata. */
export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  if (!client) client = new Stripe(key);
  return client;
}
