'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Download, CheckCircle, AlertCircle, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'

const formSchema = z.object({
  name:        z.string().min(2, 'Minim 2 caractere').max(100),
  email:       z.string().email('Email invalid'),
  gdprConsent: z.boolean().refine((v) => v, { message: 'Acordul GDPR este obligatoriu' }),
})

type FormData = z.infer<typeof formSchema>

export function DownloadGate({
  contentId,
  downloads,
}: {
  contentId: string
  downloads: number
}) {
  const [success, setSuccess] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [countdown, setCountdown] = useState(3)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(formSchema) })

  const gdprValue = watch('gdprConsent') ?? false

  useEffect(() => {
    if (success && downloadUrl) {
      const interval = setInterval(() => {
        setCountdown((c) => {
          if (c <= 1) {
            clearInterval(interval)
            // Trigger download
            const a = document.createElement('a')
            a.href = downloadUrl
            a.download = ''
            a.click()
            return 0
          }
          return c - 1
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [success, downloadUrl])

  async function onSubmit(data: FormData) {
    setServerError(null)
    try {
      const res = await fetch('/api/learn/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:        data.name,
          email:       data.email,
          gdprConsent: data.gdprConsent,
          contentId,
        }),
      })
      const json = await res.json() as { error?: string; downloadUrl?: string }
      if (!res.ok) {
        setServerError(json.error ?? 'Eroare necunoscuta')
        return
      }
      if (json.downloadUrl) {
        setDownloadUrl(json.downloadUrl)
        setSuccess(true)
        setCountdown(3)
      }
    } catch {
      setServerError('Eroare de retea. Incearca din nou.')
    }
  }

  return (
    <div
      style={{
        background: '#fff',
        border: '2px solid #2B8FCC',
        borderRadius: 16,
        padding: 24,
        boxShadow: '0 4px 24px rgba(43,143,204,0.1)',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ background: '#EAF5FF' }}
        >
          <Download size={20} className="text-[#2B8FCC]" />
        </div>
        <div>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '1.0625rem',
              color: '#0D1117',
            }}
          >
            Descarca gratuit
          </p>
          {downloads > 0 && (
            <div className="flex items-center gap-1 mt-0.5">
              <Users size={11} className="text-[#8A94A6]" />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#8A94A6' }}>
                {downloads.toLocaleString('ro-RO')} descarcari
              </span>
            </div>
          )}
        </div>
      </div>

      {success && downloadUrl ? (
        <div className="text-center py-4">
          <div className="flex justify-center mb-3">
            <CheckCircle size={48} className="text-[#10B981]" />
          </div>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '1.0625rem',
              color: '#0D1117',
              marginBottom: 8,
            }}
          >
            Resursa ta este gata!
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#4A5568', marginBottom: 16 }}>
            Descarcarea va incepe automat in{' '}
            <strong className="text-[#2B8FCC]">{countdown}</strong> secunde.
          </p>
          <a
            href={downloadUrl}
            download
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: '#2B8FCC',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: 8,
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              fontSize: '0.9rem',
              textDecoration: 'none',
            }}
          >
            <Download size={15} />
            Descarca acum
          </a>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <Input
              {...register('name')}
              placeholder="Numele tau"
              style={{ fontFamily: 'var(--font-body)' }}
            />
            {errors.name && (
              <p className="text-[#EF4444] text-[12px] mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Input
              {...register('email')}
              type="email"
              placeholder="Adresa ta de email"
              style={{ fontFamily: 'var(--font-body)' }}
            />
            {errors.email && (
              <p className="text-[#EF4444] text-[12px] mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="flex items-start gap-2.5">
            <Checkbox
              id="gdpr-download"
              checked={gdprValue}
              onCheckedChange={(v) => setValue('gdprConsent', v === true)}
              style={{ marginTop: 2 }}
            />
            <label
              htmlFor="gdpr-download"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                color: '#4A5568',
                lineHeight: 1.6,
                cursor: 'pointer',
              }}
            >
              Accept prelucrarea datelor conform{' '}
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
              <AlertCircle size={14} className="text-[#EF4444] shrink-0" />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: '#EF4444' }}>
                {serverError}
              </span>
            </div>
          )}

          <Button
            type="submit"
            loading={isSubmitting}
            leftIcon={<Download size={15} />}
            className="w-full"
            style={{
              background: '#2B8FCC',
              height: 44,
              fontSize: '0.9375rem',
              fontFamily: 'var(--font-body)',
            }}
          >
            Descarca gratuit
          </Button>

          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#8A94A6', textAlign: 'center' }}>
            100% gratuit. Fara spam.
          </p>
        </form>
      )}
    </div>
  )
}
