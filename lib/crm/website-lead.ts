import type { NextRequest } from 'next/server';
import { after } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { sendMetaLeadCapi, sendOpenAILeadCapi } from '@/lib/crm/ads/signals';
import { LINKEDIN_CONVERSII, sendLinkedInEvent } from '@/lib/crm/ads/linkedin';

/**
 * Creeaza un lead in CRM dintr-un formular public al site-ului.
 *
 * - Best-effort: NU arunca niciodata — fluxul de email ramane neatins.
 * - Atributie ads: citeste cookie-urile puse de pixelii deja instalati pe site
 *   (_fbp/_fbc de la Meta Pixel, _gcl_aw de la Google tag, ttclid de la TikTok,
 *   __obref/__oppref de la pixelul OpenAI Ads), astfel incat si lead-urile venite
 *   de pe site primesc semnale de calitate inapoi catre platforme cand devin
 *   Calificat/Convertit.
 * - Trimite si perechile server-side ale evenimentelor de browser: Meta CAPI
 *   "Lead", OpenAI "lead_created" si LinkedIn „Server – Lead de pe site”, toate
 *   deduplicate prin acelasi event id.
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
  /**
   * ID generat client-side la trimiterea formularului. Acelasi id se foloseste
   * pentru deduplicarea browser/server la Meta, OpenAI Ads si LinkedIn — un
   * singur id per submit, cate o pereche browser/server pe fiecare platforma.
   */
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
  // Cookie-urile pixelului OpenAI Ads (oaiq). Fara ele, un lead venit din
  // ChatGPT Ads nu poate primi ulterior semnale de calitate din CRM.
  //
  // ATENTIE la diferenta dintre ele, confirmata in sursa SDK-ului
  // (`{obref: g.browserRef, oppref: g.clickId}`):
  //   __obref  = identificator de BROWSER, setat pentru ORICE vizitator (ca _fbp);
  //   __oppref = click ID-ul reclamei, setat DOAR dupa un click pe un anunt (ca fbclid).
  // De-aia sursa lead-ului se decide dupa __oppref: dupa __obref, absolut toate
  // lead-urile de pe site ar aparea ca venite din ChatGPT Ads.
  const obref = c.get('__obref')?.value ?? null;
  const oppref = c.get('__oppref')?.value ?? null;
  // LinkedIn Ads: click ID-ul reclamei, cookie primar pus de Insight Tag („Enhanced
  // conversion tracking”) sau de proxy.ts din ?li_fat_id=. Ca __oppref, exista doar
  // dupa un click pe o reclama, deci decide si sursa lead-ului.
  const liFatId = c.get('li_fat_id')?.value?.slice(0, 200) || null;
  const clientIp = input.req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null;

  // Eveniment Meta CAPI "Lead" — pereche server-side pt Pixel, deduplicat prin
  // metaEventId. Best-effort, programat dupa raspuns (nu blocheaza formularul).
  after(() => sendMetaLeadCapi({
    eventId: input.metaEventId ?? null,
    email: input.email,
    phone: input.phone,
    fbp, fbclid,
    clientIp,
    userAgent: input.req.headers.get('user-agent'),
    sourceUrl: input.req.headers.get('referer'),
  }).catch(() => {}));

  // Perechea server-side pentru `lead_created` trimis din browser de pixelul
  // oaiq — acelasi event id, deci OpenAI pastreaza doar primul care ajunge.
  after(() => sendOpenAILeadCapi({
    eventId: input.metaEventId ?? null,
    email: input.email,
    phone: input.phone,
    obref, oppref,
    clientIp,
    userAgent: input.req.headers.get('user-agent'),
    sourceUrl: input.req.headers.get('referer'),
  }).catch(() => {}));

  // Perechea server-side pentru conversia „Site – …” din Insight Tag (lib/linkedin.ts): acelasi
  // event id, deci LinkedIn o numara doar cand tagul n-a ajuns (ad blocker). Fara event id (cerere
  // care nu vine din formularele site-ului) nu se trimite: n-ar avea cu ce se deduplica.
  if (input.metaEventId) {
    after(() => sendLinkedInEvent({
      conversionId: LINKEDIN_CONVERSII.lead,
      eventId: input.metaEventId,
      email: input.email,
      liFatId,
      ip: clientIp,
      name: input.name,
      company: input.company,
    }).then((r) => {
      if (!r.ok && !r.unconfigured && !r.skip) console.error('[website-lead] LinkedIn CAPI:', r.error);
    }).catch(() => {}));
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('crm_leads')
      .insert({
        name: clean(input.name, 200),
        company: clean(input.company, 200),
        email: clean(input.email, 200)?.toLowerCase() ?? null,
        phone: clean(input.phone, 50),
        status: 'nou',
        platform: oppref ? 'openai' : liFatId ? 'linkedin' : 'website',
        source: clean(input.source, 120),
        notes: clean(input.notes, 5000),
        estimated_value: input.estimatedValue ?? null,
        fbp, fbclid, gclid, ttclid, obref, oppref,
        li_fat_id: liFatId,
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
