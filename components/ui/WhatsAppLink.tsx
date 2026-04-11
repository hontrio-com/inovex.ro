'use client'

import { trackConversions } from '@/lib/gtm'
import { trackTikTok } from '@/lib/tiktok'

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '40750456096'

interface WhatsAppLinkProps {
  children: React.ReactNode
  className?: string
  message?: string
}

export function WhatsAppLink({ children, className, message }: WhatsAppLinkProps) {
  const encoded = message ? encodeURIComponent(message) : ''
  const url = `https://wa.me/${WA_NUMBER}${encoded ? `?text=${encoded}` : ''}`

  const handleClick = () => {
    trackConversions.whatsapp()
    trackTikTok.whatsapp()
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  )
}
