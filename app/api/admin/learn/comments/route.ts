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
  const onlyUnapproved = searchParams.get('approved') === 'false'
  const page = parseInt(searchParams.get('page') ?? '1', 10)
  const perPage = parseInt(searchParams.get('perPage') ?? '50', 10)

  let query = supabaseAdmin
    .from('learn_comments')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })

  if (onlyUnapproved) query = query.eq('approved', false)

  const from = (page - 1) * perPage
  query = query.range(from, from + perPage - 1)

  const { data, error, count } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ items: data, total: count, page, perPage })
}
