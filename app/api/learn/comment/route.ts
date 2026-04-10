import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabaseAdmin } from '@/lib/supabase'
import { transporter } from '@/lib/nodemailer'

const commentSchema = z.object({
  contentId: z.string().uuid(),
  authorName: z.string().min(1).max(100),
  authorEmail: z.string().email(),
  content: z.string().min(1).max(1000),
  replyTo: z.string().uuid().optional(),
  gdprConsent: z.boolean().refine((v) => v === true, { message: 'GDPR consent required' }),
})

// In-memory rate limit: 2 per IP per hour
const commentRateMap = new Map<string, { count: number; resetAt: number }>()

function checkCommentRateLimit(ip: string): boolean {
  const now = Date.now()
  const HOUR = 60 * 60 * 1000
  const entry = commentRateMap.get(ip)
  if (!entry || now > entry.resetAt) {
    commentRateMap.set(ip, { count: 1, resetAt: now + HOUR })
    return true
  }
  if (entry.count >= 2) return false
  entry.count++
  return true
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = commentSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Date invalide', details: parsed.error.flatten() }, { status: 400 })
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '0.0.0.0'

    if (!checkCommentRateLimit(ip)) {
      return NextResponse.json({ error: 'Prea multe comentarii. Incearca din nou mai tarziu.' }, { status: 429 })
    }

    const { contentId, authorName, authorEmail, content, replyTo } = parsed.data

    const { data: article } = await supabaseAdmin
      .from('learn_content')
      .select('title, allow_comments')
      .eq('id', contentId)
      .single()

    if (!article?.allow_comments) {
      return NextResponse.json({ error: 'Comentariile sunt dezactivate pentru acest articol.' }, { status: 403 })
    }

    const { error } = await supabaseAdmin.from('learn_comments').insert({
      content_id: contentId,
      author_name: authorName,
      author_email: authorEmail,
      content,
      approved: false,
      reply_to: replyTo ?? null,
      ip_address: ip,
    })

    if (error) {
      return NextResponse.json({ error: 'Eroare la salvarea comentariului' }, { status: 500 })
    }

    // Email notification
    try {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: process.env.SMTP_TO,
        subject: `[COMENTARIU NOU] Moderare necesara - ${article.title}`,
        html: `
          <h2>Comentariu nou de moderat</h2>
          <p><strong>Articol:</strong> ${article.title}</p>
          <p><strong>Autor:</strong> ${authorName} (${authorEmail})</p>
          <p><strong>Continut:</strong></p>
          <blockquote>${content}</blockquote>
          ${replyTo ? `<p><strong>Raspuns la:</strong> ${replyTo}</p>` : ''}
          <p><a href="${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://inovex.ro'}/admin/invata-gratuit/comentarii">Modereaza comentariul</a></p>
        `,
      })
    } catch {
      // Email failure should not block the comment save
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
