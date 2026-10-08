import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { requireAuth } from '@/lib/auth';
import { MOTION_BRIEF_PREFIX } from '@/lib/motion-design';

const BUCKET = 'crm-files';

/**
 * GET /api/admin/motion-brief?f=<orderId>/<fisier>
 * Deschide un material atasat la o comanda Motion Design. Link-urile din
 * emailul comenzii trimit aici: bucket-ul e privat, deci generam pe loc un
 * URL semnat de scurta durata, doar pentru utilizatori autentificati.
 */
export async function GET(req: NextRequest) {
  const auth = await requireAuth();
  if (auth.error) return auth.error;

  const f = req.nextUrl.searchParams.get('f') ?? '';
  if (!/^[0-9a-f-]{36}\/[a-zA-Z0-9._-]+$/.test(f)) {
    return NextResponse.json({ error: 'Fisier invalid' }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin.storage
    .from(BUCKET)
    .createSignedUrl(`${MOTION_BRIEF_PREFIX}/${f}`, 3600);
  if (error || !data) return NextResponse.json({ error: 'Fisierul nu a fost gasit' }, { status: 404 });

  return NextResponse.redirect(data.signedUrl);
}
