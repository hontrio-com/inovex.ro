'use client'

import { useEffect } from 'react'

export function ViewCounter({ contentId }: { contentId: string }) {
  useEffect(() => {
    fetch('/api/learn/view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contentId }),
    }).catch(() => {
      // Fire and forget - ignore errors
    })
  }, [contentId])

  return null
}
