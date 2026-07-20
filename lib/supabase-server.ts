import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Client Supabase pentru Server Components si Route Handlers.
 * Citeste (si, in Route Handlers/Server Actions, scrie) sesiunea din cookies.
 * Foloseste cheia anon — RLS se aplica pe baza sesiunii utilizatorului.
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Apelat dintr-un Server Component (unde nu se pot seta cookies).
            // Reimprospatarea sesiunii se face oricum in proxy.ts.
          }
        },
      },
    },
  );
}
