import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/data-layer';
import { requireRole } from '@/lib/auth';

const ALLOWED = ['testimonials', 'faq', 'portfolio', 'process', 'services', 'settings', 'bids'] as const;
type Section = typeof ALLOWED[number];

/** GET /api/admin/generic/[section] */
export async function GET(_req: NextRequest, { params }: { params: Promise<{ section: string }> }) {
  const { error: authError } = await requireRole(['owner', 'admin']);
  if (authError) return authError;
  const { section } = await params;
  if (!ALLOWED.includes(section as Section)) return NextResponse.json({ error: 'Not allowed' }, { status: 403 });
  const data = await readData(section as Section);
  return NextResponse.json(data ?? []);
}

/** PUT /api/admin/generic/[section] */
export async function PUT(req: NextRequest, { params }: { params: Promise<{ section: string }> }) {
  const { error: authError } = await requireRole(['owner', 'admin']);
  if (authError) return authError;
  const { section } = await params;
  if (!ALLOWED.includes(section as Section)) return NextResponse.json({ error: 'Not allowed' }, { status: 403 });
  const body = await req.json();
  await writeData(section as Section, body);
  return NextResponse.json({ success: true });
}
