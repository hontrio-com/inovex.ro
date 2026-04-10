import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { generateAdminToken, COOKIE_NAME, COOKIE_MAX_AGE } from '@/lib/admin-auth';

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

/** POST /api/admin/auth — Login */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = loginSchema.parse(body);

    const expectedUser = process.env.ADMIN_USERNAME ?? 'admin';
    const expectedPass = process.env.ADMIN_PASSWORD ?? 'changeme';

    if (username !== expectedUser || password !== expectedPass) {
      return NextResponse.json({ error: 'Credentiale incorecte' }, { status: 401 });
    }

    const token = generateAdminToken();
    const res   = NextResponse.json({ success: true });

    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure:   process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge:   COOKIE_MAX_AGE,
      path:     '/',
    });

    return res;
  } catch {
    return NextResponse.json({ error: 'Date invalide' }, { status: 400 });
  }
}

/** DELETE /api/admin/auth — Logout */
export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.delete(COOKIE_NAME);
  return res;
}
