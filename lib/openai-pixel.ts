/* Helper pentru pixelul OpenAI Ads (ChatGPT Ads).
 *
 * Sigur de apelat inainte ca SDK-ul sa se incarce — apelurile se pun in coada
 * de stub-ul `oaiq` din snippet, la fel ca la fbq.
 *
 * Documentatie: https://developers.openai.com/ads/measurement-pixel
 */

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    oaiq?: (...args: any[]) => void;
  }
}

/**
 * Forma de date pe care o asteapta fiecare eveniment standard. Preluata din
 * SDK-ul oaiq (v0.1.32) — trimiterea altei forme e respinsa la validare.
 */
export type OaiqDataType = 'contents' | 'customer_action' | 'plan_enrollment' | 'custom';

export const EVENT_SHAPE = {
  appointment_scheduled: 'customer_action',
  checkout_started: 'contents',
  contents_viewed: 'contents',
  items_added: 'contents',
  lead_created: 'customer_action',
  order_created: 'contents',
  page_viewed: 'contents',
  registration_completed: 'customer_action',
  subscription_created: 'plan_enrollment',
  trial_started: 'plan_enrollment',
} as const;

export type OaiqStandardEvent = keyof typeof EVENT_SHAPE;

export interface OaiqEventData {
  type: OaiqDataType;
  /**
   * Valoare in unitatea MINORA a monedei (bani, nu lei) — asa cere Conversions
   * API, iar perechea browser/server trebuie sa trimita aceeasi valoare ca sa se
   * deduplice corect. `currency` devine obligatoriu cand `amount` e prezent.
   */
  amount?: number;
  currency?: string;
  contents?: unknown[];
  plan_id?: string;
}

interface OaiqOptions {
  event_id?: string;
  custom_event_name?: string;
  opt_out?: boolean;
}

const available = () => typeof window !== 'undefined' && typeof window.oaiq === 'function';

/** Eveniment standard. `eventId` deduplica cu perechea trimisa de pe server. */
export function measure(event: OaiqStandardEvent, data?: Partial<OaiqEventData>, eventId?: string) {
  if (!available()) return;
  const payload: OaiqEventData = { type: EVENT_SHAPE[event], ...data };
  const options: OaiqOptions = {};
  if (eventId) options.event_id = eventId;
  window.oaiq!('measure', event, payload, options);
}

/** Eveniment custom — numele merge in options.custom_event_name, nu in pozitia a doua. */
export function measureCustom(name: string, data?: Partial<OaiqEventData>, eventId?: string) {
  if (!available()) return;
  const options: OaiqOptions = { custom_event_name: name };
  if (eventId) options.event_id = eventId;
  window.oaiq!('measure', 'custom', { type: 'custom', ...data }, options);
}

/** Comunica SDK-ului decizia din bannerul de cookie-uri. Implicit e permis. */
export function setConsent(granted: boolean) {
  if (!available()) return;
  window.oaiq!('consent', granted);
}

/** RON -> bani. Valorile monetare se trimit in unitatea minora. */
export const toMinorUnits = (amount: number) => Math.round(amount * 100);
