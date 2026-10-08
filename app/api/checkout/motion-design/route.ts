import { NextRequest, NextResponse, after } from 'next/server';
import { z } from 'zod';
import { getStripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';
import { sendMetaLeadCapi, sendOpenAILeadCapi } from '@/lib/crm/ads/signals';
import {
  isValidMotionQuantity, motionPrice, motionLabel, MOTION_PATH,
  MOTION_BRIEF_PREFIX, MOTION_MAX_FILES, MOTION_MAX_FILE_SIZE,
} from '@/lib/motion-design';

const BUCKET = 'crm-files';
/** Limita Stripe pentru o valoare din metadata. */
const META_VALUE_MAX = 500;

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return true;
  }
  if (entry.count >= 10) return false;
  entry.count++;
  return true;
}

const schema = z.object({
  videoclipuri: z.number(),
  nume:      z.string().min(2).max(100),
  email:     z.string().email(),
  telefon:   z.string().min(10).max(20),
  descriere: z.string().min(20).max(3000),
  link:      z.string().max(300).optional(),
  orderId:   z.string().uuid().optional(),
});

/**
 * Fisierele brief-ului se citesc din storage, nu din ce declara browserul:
 * ce depaseste limita de marime se sterge, restul ajunge in emailul comenzii
 * ca link-uri catre /api/admin/motion-brief (bucket privat, acces doar pentru staff).
 */
async function collectBriefFiles(orderId: string, origin: string): Promise<string[]> {
  const folder = `${MOTION_BRIEF_PREFIX}/${orderId}`;
  const { data: files } = await supabaseAdmin.storage.from(BUCKET).list(folder, { limit: 100 });
  if (!files?.length) return [];

  const ok = files.filter((f) => (f.metadata?.size ?? 0) <= MOTION_MAX_FILE_SIZE).slice(0, MOTION_MAX_FILES);
  const rejected = files.filter((f) => !ok.includes(f));
  if (rejected.length) {
    await supabaseAdmin.storage.from(BUCKET).remove(rejected.map((f) => `${folder}/${f.name}`));
  }
  return ok.map((f) => `${origin}/api/admin/motion-brief?f=${orderId}/${encodeURIComponent(f.name)}`);
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Prea multe cereri. Incearca din nou mai tarziu.' }, { status: 429 });
  }

  const stripe = getStripe();
  if (!stripe) {
    console.error('[checkout motion-design] STRIPE_SECRET_KEY lipseste');
    return NextResponse.json({ error: 'Plata online nu este disponibila momentan. Te rugam sa ne contactezi.' }, { status: 503 });
  }

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: 'Date invalide. Verifica formularul.' }, { status: 400 });
  }
  const data = parsed.data;
  if (!isValidMotionQuantity(data.videoclipuri)) {
    return NextResponse.json({ error: 'Numar de videoclipuri invalid.' }, { status: 400 });
  }
  const pkg = { videos: data.videoclipuri, label: motionLabel(data.videoclipuri), price: motionPrice(data.videoclipuri) };

  const origin = req.nextUrl.origin;
  const fileLinks = data.orderId ? await collectBriefFiles(data.orderId, origin) : [];

  const brief = [
    `Despre videoclip:\n${data.descriere}`,
    data.link ? `Link: ${data.link}` : null,
    fileLinks.length ? `Materiale atasate:\n${fileLinks.join('\n')}` : 'Materiale atasate: niciunul',
  ].filter(Boolean).join('\n\n');

  // Comanda nu se salveaza nicaieri pe site: brief-ul si datele de contact merg
  // cu sesiunea Stripe (metadata), iar webhook-ul le pune in emailul comenzii
  // platite. Valorile din metadata au maximum 500 de caractere, deci brief-ul
  // se imparte in bucati brief_0, brief_1, ...
  const metadata: Record<string, string> = {
    serviciu: 'motion-design',
    videoclipuri: String(pkg.videos),
    nume: data.nume,
    telefon: data.telefon,
  };
  for (let i = 0; i * META_VALUE_MAX < brief.length; i++) {
    metadata[`brief_${i}`] = brief.slice(i * META_VALUE_MAX, (i + 1) * META_VALUE_MAX);
  }

  // Atributie Meta pentru evenimentul Purchase trimis de webhook.
  const c = req.cookies;
  const fbp = c.get('_fbp')?.value ?? null;
  // _fbc are formatul fb.1.<timestamp>.<fbclid> — extragem fbclid-ul.
  const fbc = c.get('_fbc')?.value ?? null;
  const fbclid = fbc ? fbc.split('.').slice(3).join('.') || null : null;
  if (fbp) metadata.fbp = fbp.slice(0, META_VALUE_MAX);
  if (fbclid) metadata.fbclid = fbclid.slice(0, META_VALUE_MAX);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      locale: 'ro',
      customer_email: data.email,
      line_items: [{
        quantity: 1,
        price_data: {
          currency: 'ron',
          unit_amount: pkg.price * 100,
          product_data: {
            name: `Video Motion Design - ${pkg.label}`,
            description: 'Scenariu, animatie, muzica si formate pentru toate platformele. Realizat de Inovex.',
          },
        },
      }],
      billing_address_collection: 'required',
      tax_id_collection: { enabled: true },
      metadata,
      success_url: `${origin}${MOTION_PATH}/multumim?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}${MOTION_PATH}#comanda`,
    });

    // Perechile server-side ale evenimentelor de browser "Lead" (Meta) si
    // "lead_created" (OpenAI Ads), deduplicate prin acelasi event id.
    const eventId = req.headers.get('x-meta-event-id');
    const common = {
      eventId, email: data.email, phone: data.telefon,
      clientIp: ip === 'unknown' ? null : ip,
      userAgent: req.headers.get('user-agent'),
      sourceUrl: req.headers.get('referer'),
    };
    after(() => sendMetaLeadCapi({ ...common, fbp, fbclid }).catch(() => {}));
    after(() => sendOpenAILeadCapi({
      ...common, obref: c.get('__obref')?.value ?? null, oppref: c.get('__oppref')?.value ?? null,
    }).catch(() => {}));

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('[checkout motion-design]', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: 'Nu am putut porni plata. Incearca din nou.' }, { status: 500 });
  }
}
