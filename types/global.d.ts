interface TikTokPixel {
  track: (event: string, params?: Record<string, unknown>) => void
  identify: (params: Record<string, unknown>) => void
  instances: (pixelId: string) => TikTokPixel
  load: (pixelId: string) => void
  page: () => void
}

interface Window {
  dataLayer: Record<string, unknown>[]
  ttq: TikTokPixel
}
