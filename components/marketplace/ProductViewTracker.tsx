'use client'

import { useEffect } from 'react'
import { trackTikTok } from '@/lib/tiktok'

interface Props {
  productTitle: string
}

export function ProductViewTracker({ productTitle }: Props) {
  useEffect(() => {
    trackTikTok.viewContent(productTitle)
  }, [productTitle])

  return null
}
