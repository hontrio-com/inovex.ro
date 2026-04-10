'use client'

import { useState } from 'react'
import { Share2, Link2, Check } from 'lucide-react'

export function ShareButtons({ title, url }: { title: string; url?: string }) {
  const [copied, setCopied] = useState(false)

  function getUrl(): string {
    if (url) return url
    if (typeof window !== 'undefined') return window.location.href
    return ''
  }

  function shareFacebook() {
    const u = encodeURIComponent(getUrl())
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${u}`, '_blank', 'width=600,height=400')
  }

  function shareLinkedIn() {
    const u = encodeURIComponent(getUrl())
    const t = encodeURIComponent(title)
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${u}&title=${t}`, '_blank', 'width=600,height=400')
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(getUrl())
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // Fallback for older browsers
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span
        style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', fontWeight: 600, color: '#8A94A6' }}
      >
        Distribuie:
      </span>

      <button
        onClick={shareFacebook}
        aria-label="Share pe Facebook"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 36,
          height: 36,
          borderRadius: 8,
          border: '1px solid #E8ECF0',
          background: '#fff',
          cursor: 'pointer',
          color: '#1877F2',
          transition: 'border-color 150ms ease, background 150ms ease',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#F0F7FF' }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#fff' }}
      >
        <Share2 size={16} />
      </button>

      <button
        onClick={shareLinkedIn}
        aria-label="Share pe LinkedIn"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 36,
          height: 36,
          borderRadius: 8,
          border: '1px solid #E8ECF0',
          background: '#fff',
          cursor: 'pointer',
          color: '#0A66C2',
          transition: 'border-color 150ms ease, background 150ms ease',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#EFF6FF' }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#fff' }}
      >
        <Share2 size={16} />
      </button>

      <button
        onClick={copyLink}
        aria-label="Copiaza link"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          height: 36,
          padding: '0 12px',
          borderRadius: 8,
          border: copied ? '1px solid #10B981' : '1px solid #E8ECF0',
          background: copied ? '#ECFDF5' : '#fff',
          cursor: 'pointer',
          color: copied ? '#10B981' : '#4A5568',
          fontFamily: 'var(--font-body)',
          fontWeight: 600,
          fontSize: '0.8125rem',
          transition: 'all 150ms ease',
        }}
      >
        {copied ? <Check size={14} /> : <Link2 size={14} />}
        {copied ? 'Copiat!' : 'Copiaza link'}
      </button>
    </div>
  )
}
