import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { verifyAdminToken, COOKIE_NAME } from '@/lib/admin-auth'

function isAdmin(req: NextRequest): boolean {
  const token = req.cookies.get(COOKIE_NAME)?.value
  if (!token) return false
  return verifyAdminToken(token)
}

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get('page') ?? '1', 10)
  const perPage = parseInt(searchParams.get('perPage') ?? '20', 10)
  const status = searchParams.get('status')
  const type = searchParams.get('type')

  let query = supabaseAdmin
    .from('learn_content')
    .select('*, category:learn_categories(*)', { count: 'exact' })
    .order('created_at', { ascending: false })

  if (status) query = query.eq('status', status)
  if (type) query = query.eq('type', type)

  const from = (page - 1) * perPage
  const to = from + perPage - 1
  query = query.range(from, to)

  const { data, error, count } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ items: data, total: count, page, perPage })
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const now = new Date().toISOString()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id: _tempId, ...rest } = body  // exclude temporary frontend ID (e.g. "new-...")
  const payload = {
    ...rest,
    created_at: now,
    updated_at: now,
    views: 0,
    downloads: 0,
    tags: rest.tags ?? [],
    resource_preview_urls: rest.resource_preview_urls ?? [],
    resource_benefits: rest.resource_benefits ?? [],
  }

  const { data, error } = await supabaseAdmin
    .from('learn_content')
    .insert(payload)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
