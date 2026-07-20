import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { requireRole } from '@/lib/auth'

export async function GET() {
  const { error: authError } = await requireRole(['owner', 'admin'])
  if (authError) return authError

  const { data, error } = await supabaseAdmin
    .from('learn_categories')
    .select('*')
    .order('order', { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const { error: authError } = await requireRole(['owner', 'admin'])
  if (authError) return authError

  const body = await req.json()
  const payload = {
    ...body,
    created_at: new Date().toISOString(),
  }

  const { data, error } = await supabaseAdmin
    .from('learn_categories')
    .insert(payload)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
