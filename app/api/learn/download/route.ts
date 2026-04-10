import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabaseAdmin } from '@/lib/supabase'

const downloadSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  gdprConsent: z.boolean().refine((v) => v === true, { message: 'GDPR consent required' }),
  contentId: z.string().uuid(),
})

// In-memory rate limit: Map<ip, { count: number; resetAt: number }>
const downloadRateMap = new Map<string, { count: number; resetAt: number }>()

function checkDownloadRateLimit(ip: string): boolean {
  const now = Date.now()
  const HOUR = 60 * 60 * 1000
  const entry = downloadRateMap.get(ip)
  if (!entry || now > entry.resetAt) {
    downloadRateMap.set(ip, { count: 1, resetAt: now + HOUR })
    return true
  }
  if (entry.count >= 5) return false
  entry.count++
  return true
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = downloadSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Date invalide', details: parsed.error.flatten() }, { status: 400 })
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '0.0.0.0'

    if (!checkDownloadRateLimit(ip)) {
      return NextResponse.json({ error: 'Prea multe cereri. Incearca din nou mai tarziu.' }, { status: 429 })
    }

    const { name, email, gdprConsent, contentId } = parsed.data

    const { data: content } = await supabaseAdmin
      .from('learn_content')
      .select('id, title, requires_email, resource_file_url, downloads')
      .eq('id', contentId)
      .eq('status', 'published')
      .single()

    if (!content) {
      return NextResponse.json({ error: 'Resursa negasita' }, { status: 404 })
    }

    if (!content.resource_file_url) {
      return NextResponse.json({ error: 'Fisierul nu este disponibil' }, { status: 404 })
    }

    // Check if already subscribed for this resource
    const { data: existingLead } = await supabaseAdmin
      .from('learn_leads')
      .select('id')
      .eq('email', email)
      .eq('resource_id', contentId)
      .single()

    if (existingLead) {
      return NextResponse.json({
        success: true,
        downloadUrl: content.resource_file_url,
        alreadySubscribed: true,
      })
    }

    await supabaseAdmin.from('learn_leads').insert({
      name,
      email,
      resource_id: contentId,
      resource_title: content.title,
      ip_address: ip,
      user_agent: req.headers.get('user-agent'),
      gdpr_consent: gdprConsent,
      already_subscribed: false,
      downloaded_at: new Date().toISOString(),
    })

    await supabaseAdmin
      .from('learn_content')
      .update({ downloads: (content.downloads ?? 0) + 1 })
      .eq('id', contentId)

    return NextResponse.json({
      success: true,
      downloadUrl: content.resource_file_url,
    })
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
