import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireAuth } from '@/lib/auth';
import { ATASAMENTE_BUCKET, ATASAMENTE_PREFIX } from '@/lib/configurator-atasamente';

/**
 * GET /api/admin/atasamente-configurator?f=<id>/<fisier>
 * Deschide un atasament trimis prin configuratorul de aplicatie web (2026-11-07). Linkurile din emailul intern
 * si din CRM trimit aici: bucket-ul e privat, deci generam pe loc un URL semnat de scurta durata, doar pentru
 * utilizatorii autentificati in admin (ca /api/admin/motion-brief).
 */
export async function GET(req: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  const f = req.nextUrl.searchParams.get('f') ?? '';
  if (!/^[0-9a-f-]{36}\/[a-zA-Z0-9._-]+$/.test(f)) {
    return NextResponse.json({ error: 'Fisier invalid' }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin.storage
    .from(ATASAMENTE_BUCKET)
    .createSignedUrl(`${ATASAMENTE_PREFIX}/${f}`, 3600);
  if (error || !data) return NextResponse.json({ error: 'Fisierul nu a fost gasit' }, { status: 404 });

  return NextResponse.redirect(data.signedUrl);
}
