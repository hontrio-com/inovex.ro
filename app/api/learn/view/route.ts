import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { canCountView } from '@/lib/learn-view-ratelimit'

export async function POST(req: NextRequest) {
  try {
    const { contentId } = await req.json() as { contentId?: string }
    if (!contentId) {
      return NextResponse.json({ error: 'contentId required' }, { status: 400 })
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '0.0.0.0'

    if (!canCountView(ip, contentId)) {
      return NextResponse.json({ success: true, counted: false })
    }

    const { data: current } = await supabaseAdmin
      .from('learn_content')
      .select('views')
      .eq('id', contentId)
      .single()

    if (current) {
      await supabaseAdmin
        .from('learn_content')
        .update({ views: (current.views ?? 0) + 1 })
        .eq('id', contentId)
    }

    return NextResponse.json({ success: true, counted: true })
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
