'use client'

import { trackConversions } from '@/lib/gtm'
import { trackTikTok } from '@/lib/tiktok'

interface PhoneLinkProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export function PhoneLink({ children, className, style }: PhoneLinkProps) {
  const handleClick = () => {
    trackConversions.telefon()
    trackTikTok.telefon()
  }

  return (
    <a
      href="tel:+40750456096"
      onClick={handleClick}
      className={className}
      style={style}
    >
      {children}
    </a>
  )
}
