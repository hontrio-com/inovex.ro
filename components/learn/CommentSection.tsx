'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { MessageCircle, CornerDownRight, CheckCircle, AlertCircle } from 'lucide-react'
import type { LearnComment } from '@/types/learn'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'

const commentSchema = z.object({
  authorName:   z.string().min(2, 'Minim 2 caractere').max(100),
  authorEmail:  z.string().email('Email invalid'),
  content:      z.string().min(5, 'Minim 5 caractere').max(1000, 'Maxim 1000 caractere'),
  gdprConsent:  z.boolean().refine((v) => v, { message: 'Acordul GDPR este obligatoriu' }),
})

type CommentFormData = z.infer<typeof commentSchema>

const fmt = new Intl.DateTimeFormat('ro-RO', { day: 'numeric', month: 'short', year: 'numeric' })

function formatDate(d: string): string {
  try { return fmt.format(new Date(d)) } catch { return '' }
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0] ?? '')
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

const AVATAR_GRADIENTS = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
]

function getGradient(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return AVATAR_GRADIENTS[Math.abs(hash) % AVATAR_GRADIENTS.length]
}

interface CommentFormProps {
  contentId: string
  replyTo: string | null
  onSuccess: (comment: { authorName: string; content: string; replyTo: string | null }) => void
  onCancel?: () => void
}

function CommentForm({ contentId, replyTo, onSuccess, onCancel }: CommentFormProps) {
  const [serverError, setServerError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CommentFormData>({ resolver: zodResolver(commentSchema) })

  const contentValue = watch('content') ?? ''
  const gdprValue = watch('gdprConsent') ?? false

  async function onSubmit(data: CommentFormData) {
    setServerError(null)
    try {
      const res = await fetch('/api/learn/comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentId,
          authorName:   data.authorName,
          authorEmail:  data.authorEmail,
          content:      data.content,
          replyTo:      replyTo ?? undefined,
          gdprConsent:  data.gdprConsent,
        }),
      })
      const json = await res.json() as { error?: string }
      if (!res.ok) {
        setServerError(json.error ?? 'Eroare necunoscuta')
        return
      }
      onSuccess({ authorName: data.authorName, content: data.content, replyTo })
    } catch {
      setServerError('Eroare de retea. Incearca din nou.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Input
            {...register('authorName')}
            placeholder="Numele tau"
            style={{ fontFamily: 'var(--font-body)' }}
          />
          {errors.authorName && (
            <p className="text-[#EF4444] text-[12px] mt-1">{errors.authorName.message}</p>
          )}
        </div>
        <div>
          <Input
            {...register('authorEmail')}
            type="email"
            placeholder="Email (nu va fi afisat)"
            style={{ fontFamily: 'var(--font-body)' }}
          />
          {errors.authorEmail && (
            <p className="text-[#EF4444] text-[12px] mt-1">{errors.authorEmail.message}</p>
          )}
        </div>
      </div>

      <div>
        <textarea
          {...register('content')}
          placeholder="Comentariul tau..."
          rows={4}
          maxLength={1000}
          style={{
            width: '100%',
            border: '1px solid #E8ECF0',
            borderRadius: 8,
            padding: '10px 12px',
            fontFamily: 'var(--font-body)',
            fontSize: '0.9375rem',
            color: '#0D1117',
            resize: 'vertical',
            lineHeight: 1.6,
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
        <div className="flex justify-between mt-1">
          {errors.content
            ? <p className="text-[#EF4444] text-[12px]">{errors.content.message}</p>
            : <span />
          }
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#8A94A6' }}>
            {contentValue.length} / 1000
          </span>
        </div>
      </div>

      <div className="flex items-start gap-2.5">
        <Checkbox
          id="gdpr-comment"
          checked={gdprValue}
          onCheckedChange={(v) => setValue('gdprConsent', v === true)}
          style={{ marginTop: 2 }}
        />
        <label
          htmlFor="gdpr-comment"
          style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: '#4A5568', lineHeight: 1.6, cursor: 'pointer' }}
        >
          Accept prelucrarea datelor personale conform{' '}
          <a href="/politica-confidentialitate" className="text-[#2B8FCC] hover:underline" target="_blank">
            politicii de confidentialitate
          </a>
          .
        </label>
      </div>
      {errors.gdprConsent && (
        <p className="text-[#EF4444] text-[12px]">{errors.gdprConsent.message}</p>
      )}

      {serverError && (
        <div className="flex items-center gap-2 p-3 bg-[#FFF5F5] border border-[#FECACA] rounded-lg">
          <AlertCircle size={15} className="text-[#EF4444] shrink-0" />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#EF4444' }}>
            {serverError}
          </span>
        </div>
      )}

      <div className="flex items-center gap-3">
        <Button type="submit" loading={isSubmitting} leftIcon={<MessageCircle size={14} />}>
          Trimite comentariul
        </Button>
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Anuleaza
          </Button>
        )}
      </div>
    </form>
  )
}

interface SingleCommentProps {
  comment: LearnComment
  onReply: (id: string) => void
  replyingTo: string | null
  contentId: string
  onReplySuccess: (name: string) => void
}

function SingleComment({ comment, onReply, replyingTo, contentId, onReplySuccess }: SingleCommentProps) {
  const isReplying = replyingTo === comment.id

  return (
    <div>
      <div className="flex gap-3">
        <div
          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white text-[13px] font-bold"
          style={{ background: getGradient(comment.author_name) }}
        >
          {getInitials(comment.author_name)}
        </div>
        <div className="flex-1">
          <div className="flex items-baseline gap-2 mb-1">
            <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.9rem', color: '#0D1117' }}>
              {comment.author_name}
            </span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#8A94A6' }}>
              {formatDate(comment.created_at)}
            </span>
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#4A5568', lineHeight: 1.7, margin: 0 }}>
            {comment.content}
          </p>
          <button
            onClick={() => onReply(comment.id)}
            className="flex items-center gap-1 mt-2"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '0.8125rem',
              color: '#2B8FCC',
              padding: 0,
            }}
          >
            <CornerDownRight size={13} /> Raspunde
          </button>

          {isReplying && (
            <div className="mt-4 pl-4 border-l-2 border-[#E8ECF0]">
              <CommentForm
                contentId={contentId}
                replyTo={comment.id}
                onSuccess={() => { onReplySuccess(comment.author_name); onReply('') }}
                onCancel={() => onReply('')}
              />
            </div>
          )}
        </div>
      </div>

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 ml-12 pl-4 border-l-2 border-[#F0F4F8] space-y-4">
          {comment.replies.map((reply) => (
            <div key={reply.id} className="flex gap-3">
              <div
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold"
                style={{ background: getGradient(reply.author_name) }}
              >
                {getInitials(reply.author_name)}
              </div>
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.875rem', color: '#0D1117' }}>
                    {reply.author_name}
                  </span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#8A94A6' }}>
                    {formatDate(reply.created_at)}
                  </span>
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#4A5568', lineHeight: 1.7, margin: 0 }}>
                  {reply.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function CommentSection({
  contentId,
  initialComments,
}: {
  contentId: string
  initialComments: LearnComment[]
}) {
  const [comments, setComments] = useState(initialComments)
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)

  function handleSuccess({ authorName }: { authorName: string; content: string; replyTo: string | null }) {
    setFormSuccess(true)
    setReplyingTo(null)
    // Optimistic: don't add to list (awaiting moderation)
    void authorName
  }

  function handleReplySuccess(parentName: string) {
    void parentName
    setComments((prev) => [...prev])
  }

  return (
    <section className="mt-12">
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '1.25rem',
          color: '#0D1117',
          marginBottom: 24,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <MessageCircle size={20} className="text-[#2B8FCC]" />
        Comentarii ({comments.length})
      </h2>

      {/* Comments list */}
      {comments.length > 0 && (
        <div className="space-y-6 mb-10">
          {comments.map((comment) => (
            <SingleComment
              key={comment.id}
              comment={comment}
              onReply={(id) => setReplyingTo(replyingTo === id ? null : id)}
              replyingTo={replyingTo}
              contentId={contentId}
              onReplySuccess={handleReplySuccess}
            />
          ))}
        </div>
      )}

      {/* New comment form */}
      <div className="bg-[#F8FAFB] border border-[#E8ECF0] rounded-2xl p-6">
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '1rem',
            color: '#0D1117',
            marginBottom: 16,
          }}
        >
          Lasa un comentariu
        </h3>

        {formSuccess ? (
          <div className="flex items-start gap-3 p-4 bg-[#ECFDF5] border border-[#6EE7B7] rounded-xl">
            <CheckCircle size={20} className="text-[#10B981] shrink-0 mt-0.5" />
            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontWeight: 700, color: '#065F46', marginBottom: 4 }}>
                Comentariul tau a fost trimis!
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#047857' }}>
                Va aparea dupa ce este moderat de echipa noastra. Multumim!
              </p>
            </div>
          </div>
        ) : (
          <CommentForm
            contentId={contentId}
            replyTo={null}
            onSuccess={handleSuccess}
          />
        )}
      </div>
    </section>
  )
}
