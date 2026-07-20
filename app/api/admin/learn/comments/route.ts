import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { requireRole } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const { error: authError } = await requireRole(['owner', 'admin'])
  if (authError) return authError

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
