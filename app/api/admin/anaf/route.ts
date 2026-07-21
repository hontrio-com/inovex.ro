import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';

// API-ul public ANAF pentru date firma dupa CUI (v9).
const ANAF_URL = 'https://webservicesp.anaf.ro/api/PlatitorTvaRest/v9/tva';

/** GET /api/admin/anaf?cui=RO12345678 — preia datele firmei de la ANAF. */
export async function GET(req: NextRequest) {
  const { error } = await requireAuth();
  if (error) return error;

  const raw = new URL(req.url).searchParams.get('cui') ?? '';
  const cui = raw.replace(/\D/g, ''); // scoate prefix RO, spatii etc.
  if (cui.length < 2) return NextResponse.json({ error: 'CUI invalid' }, { status: 400 });

  const today = new Date().toISOString().slice(0, 10);
  let anafRes: Response;
  try {
    anafRes = await fetch(ANAF_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([{ cui: Number(cui), data: today }]),
      signal: AbortSignal.timeout(12000),
    });
  } catch {
    return NextResponse.json({ error: 'ANAF indisponibil momentan. Incearca din nou.' }, { status: 502 });
  }
  if (!anafRes.ok) return NextResponse.json({ error: 'Eroare la interogarea ANAF' }, { status: 502 });

  const data = await anafRes.json();
  const found = data.found?.[0];
  if (!found) return NextResponse.json({ error: 'Firma nu a fost gasita la ANAF' }, { status: 404 });

  const g = found.date_generale ?? {};
  const a = found.adresa_sediu_social ?? {};
  const vat = found.inregistrare_scop_Tva?.scpTVA ?? false;
  const street = [a.sdenumire_Strada, a.snumar_Strada ? `nr. ${a.snumar_Strada}` : '', a.sdetalii_Adresa]
    .filter(Boolean).join(', ');

  return NextResponse.json({
    company: {
      name: g.denumire ?? '',
      cui: vat ? `RO${cui}` : cui,
      reg_com: g.nrRegCom ?? '',
      address: street || g.adresa || '',
      city: a.sdenumire_Localitate ?? '',
      county: a.sdenumire_Judet ?? '',
      phone: g.telefon ?? '',
      iban: g.iban ?? '',
      is_vat_payer: vat,
      status: g.stare_inregistrare ?? '',
    },
  });
}
