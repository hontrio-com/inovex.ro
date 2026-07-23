import type { NextRequest } from 'next/server';
import { after } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { sendMetaLeadCapi } from '@/lib/crm/ads/signals';

/**
 * Creeaza un lead in CRM dintr-un formular public al site-ului.
 *
 * - Best-effort: NU arunca niciodata — fluxul de email ramane neatins.
 * - Atributie ads: citeste cookie-urile puse de pixelii deja instalati pe site
 *   (_fbp/_fbc de la Meta Pixel, _gcl_aw de la Google tag, ttclid de la TikTok),
 *   astfel incat si lead-urile venite de pe site primesc semnale de calitate
 *   inapoi catre platforme cand devin Calificat/Convertit.
 * - Trimite si un eveniment Meta CAPI "Lead" (pereche server-side a Pixelului),
 *   deduplicat prin metaEventId — vezi lib/crm/ads/signals.ts#sendMetaLeadCapi.
 */
export interface WebsiteLeadInput {
  req: NextRequest;
  /** Ex.: "Formular contact", "Configurator magazin online". Apare ca sursa in CRM. */
  source: string;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  company?: string | null;
  /** Detaliile formularului (mesaj, optiunile alese) — ajung in campul Note. */
  notes?: string | null;
  estimatedValue?: number | null;
  raw?: unknown;
  /** ID generat client-side la fbq('track','Lead') — pt deduplicare CAPI/Pixel. */
  metaEventId?: string | null;
}

const clean = (v: string | null | undefined, max: number) => {
  const s = v?.trim().slice(0, max);
  return s || null;
};

export async function createWebsiteLead(input: WebsiteLeadInput): Promise<void> {
  const c = input.req.cookies;
  const fbp = c.get('_fbp')?.value ?? null;
  // _fbc are formatul fb.1.<timestamp>.<fbclid> — extragem fbclid-ul.
  const fbc = c.get('_fbc')?.value ?? null;
  const fbclid = fbc ? fbc.split('.').slice(3).join('.') || null : null;
  // _gcl_aw are formatul GCL.<timestamp>.<gclid>.
  const gclAw = c.get('_gcl_aw')?.value ?? null;
  const gclid = gclAw ? gclAw.split('.').slice(2).join('.') || null : null;
  const ttclid = c.get('ttclid')?.value ?? c.get('_ttclid')?.value ?? null;

  // Eveniment Meta CAPI "Lead" — pereche server-side pt Pixel, deduplicat prin
  // metaEventId. Best-effort, programat dupa raspuns (nu blocheaza formularul).
  after(() => sendMetaLeadCapi({
    eventId: input.metaEventId ?? null,
    email: input.email,
    phone: input.phone,
    fbp, fbclid,
    clientIp: input.req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null,
    userAgent: input.req.headers.get('user-agent'),
    sourceUrl: input.req.headers.get('referer'),
  }).catch(() => {}));

  try {
    const { data, error } = await supabaseAdmin
      .from('crm_leads')
      .insert({
        name: clean(input.name, 200),
        company: clean(input.company, 200),
        email: clean(input.email, 200)?.toLowerCase() ?? null,
        phone: clean(input.phone, 50),
        status: 'nou',
        platform: 'website',
        source: clean(input.source, 120),
        notes: clean(input.notes, 5000),
        estimated_value: input.estimatedValue ?? null,
        fbp, fbclid, gclid, ttclid,
        raw_payload: input.raw ?? null,
      })
      .select('id')
      .single();
    if (error) {
      console.error('[website-lead] insert:', error.message);
      return;
    }

    await supabaseAdmin.from('crm_activities').insert({
      type: 'system',
      title: `Lead primit de pe website: ${input.source}`,
      lead_id: data.id,
    });
  } catch (e) {
    console.error('[website-lead]', e instanceof Error ? e.message : e);
  }
}
