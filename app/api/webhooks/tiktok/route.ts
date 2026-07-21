import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { ingestLead } from '@/lib/crm/ads/ingest';

export const runtime = 'nodejs';
export const maxDuration = 30;

/**
 * Webhook TikTok Lead Generation.
 * URL-ul (cu cheia secreta) se seteaza in aplicatia TikTok for Business:
 *   https://inovex.ro/api/webhooks/tiktok?key=TIKTOK_WEBHOOK_KEY
 * Parsare toleranta: formatul payload-ului variaza dupa versiunea API-ului,
 * asa ca extragem generic lead_id + campurile din mai multe forme cunoscute.
 */

type Rec = Record<string, unknown>;
const asRec = (v: unknown): Rec | null => (v && typeof v === 'object' && !Array.isArray(v) ? (v as Rec) : null);
const str = (v: unknown): string | null => {
  if (v == null) return null;
  const s = String(v).trim();
  return s || null;
};

/** Cauta prima valoare nenula pentru oricare dintre chei, in obiect si sub-obiecte uzuale. */
function pick(obj: Rec, keys: string[]): string | null {
  for (const k of keys) {
    const direct = str(obj[k]);
    if (direct) return direct;
  }
  for (const nested of ['data', 'lead', 'value', 'properties']) {
    const sub = asRec(obj[nested]);
    if (sub) {
      const found = pick(sub, keys);
      if (found) return found;
    }
  }
  return null;
}

/** Extrage raspunsurile din formular (question/answer) din formele cunoscute. */
function extractAnswers(obj: Rec): { question: string; answer: string }[] {
  const out: { question: string; answer: string }[] = [];
  const visit = (v: unknown) => {
    if (Array.isArray(v)) {
      for (const item of v) {
        const r = asRec(item);
        if (!r) continue;
        const q = str(r.question) ?? str(r.name) ?? str(r.field_name) ?? str(r.column_name);
        const a = str(r.answer) ?? str(r.value) ?? str(r.field_value) ?? str(Array.isArray(r.values) ? r.values[0] : null);
        if (q && a) out.push({ question: q, answer: a });
      }
    }
  };
  for (const key of ['question_list', 'questions', 'form_data', 'user_info', 'answers', 'fields']) {
    visit(obj[key]);
    const data = asRec(obj.data);
    if (data) visit(data[key]);
  }
  return out;
}

export async function POST(req: NextRequest) {
  const key = process.env.TIKTOK_WEBHOOK_KEY;
  if (!key) return NextResponse.json({ error: 'Webhook neconfigurat' }, { status: 503 });

  const given = new URL(req.url).searchParams.get('key') ?? '';
  const expected = Buffer.from(key);
  const provided = Buffer.from(given);
  if (provided.length !== expected.length || !crypto.timingSafeEqual(expected, provided)) {
    return NextResponse.json({ error: 'Cheie invalida' }, { status: 401 });
  }

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'JSON invalid' }, { status: 400 }); }
  const root = asRec(body);
  if (!root) return NextResponse.json({ error: 'Payload invalid' }, { status: 400 });

  const leadId = pick(root, ['lead_id', 'leadId', 'lead_gen_id']);
  if (!leadId) return NextResponse.json({ error: 'lead_id lipsa' }, { status: 400 });

  // Campuri directe + din raspunsurile formularului.
  const answers = extractAnswers(root);
  const byQuestion = (patterns: RegExp[]) =>
    answers.find((a) => patterns.some((p) => p.test(a.question.toLowerCase())))?.answer ?? null;

  const name = pick(root, ['user_name', 'name', 'full_name']) ?? byQuestion([/nume/, /name/]);
  const email = pick(root, ['email']) ?? byQuestion([/e-?mail/]);
  const phone = pick(root, ['phone_number', 'phone', 'telephone']) ?? byQuestion([/telefon/, /phone/]);
  const campaign = pick(root, ['campaign_name']) ?? (pick(root, ['campaign_id']) ? `Campanie ${pick(root, ['campaign_id'])}` : null);

  const extra = answers
    .filter((a) => ![name, email, phone].includes(a.answer))
    .map((a) => `${a.question}: ${a.answer}`);

  try {
    const result = await ingestLead({
      platform: 'tiktok',
      platformLeadId: leadId,
      name, email, phone, campaign,
      source: 'TikTok Lead Ads',
      notes: extra.length ? extra.join('\n') : null,
      ttclid: pick(root, ['ttclid']),
      raw: body,
    });
    return NextResponse.json({ success: true, created: result.created });
  } catch (e) {
    console.error('[webhook tiktok] ingest error:', e instanceof Error ? e.message : e);
    return NextResponse.json({ error: 'Eroare interna' }, { status: 500 });
  }
}
