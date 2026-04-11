'use client'

import { trackConversions } from '@/lib/gtm'

interface PhoneLinkProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export function PhoneLink({ children, className, style }: PhoneLinkProps) {
  return (
    <a
      href="tel:+40750456096"
      onClick={() => trackConversions.telefon()}
      className={className}
      style={style}
    >
      {children}
    </a>
  )
}
