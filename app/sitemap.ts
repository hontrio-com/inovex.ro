import type { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'

const BASE = 'https://inovex.ro'

export const revalidate = 3600 // regenerate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString()

  // ── Static pages ───────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,                                      lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/servicii`,                        lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/servicii/magazine-online`,        lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/servicii/website-de-prezentare`,  lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/servicii/aplicatii-web-saas`,     lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/servicii/aplicatii-mobile`,       lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/servicii/cms-crm-erp`,            lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/servicii/automatizari-ai`,        lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/portofoliu`,                      lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/despre-noi`,                      lastModified: now, changeFrequency: 'yearly',  priority: 0.7 },
    { url: `${BASE}/contact`,                         lastModified: now, changeFrequency: 'yearly',  priority: 0.7 },
    { url: `${BASE}/oferta`,                          lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/marketplace`,                     lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/invata-gratuit`,                  lastModified: now, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE}/blog`,                            lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/politica-de-confidentialitate`,   lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/termeni-si-conditii`,             lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/politica-cookies`,                lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ]

  // ── Marketplace products ────────────────────────────────────
  const { data: products } = await supabase
    .from('marketplace_products')
    .select('slug, updated_at')
    .eq('status', 'published')

  const productPages: MetadataRoute.Sitemap = (products ?? []).map((p) => ({
    url: `${BASE}/marketplace/${p.slug}`,
    lastModified: p.updated_at ?? now,
    changeFrequency: 'monthly',
    priority: 0.75,
  }))

  // ── Learn content ───────────────────────────────────────────
  const { data: learnItems } = await supabase
    .from('learn_content')
    .select('slug, type, updated_at')
    .eq('status', 'published')

  const learnPages: MetadataRoute.Sitemap = (learnItems ?? []).map((item) => {
    const segment =
      item.type === 'articol' ? 'articole' :
      item.type === 'resursa' ? 'resurse' :
      item.type === 'tool'    ? 'tool-uri' : 'video'
    return {
      url: `${BASE}/invata-gratuit/${segment}/${item.slug}`,
      lastModified: item.updated_at ?? now,
      changeFrequency: 'monthly',
      priority: 0.7,
    }
  })

  return [...staticPages, ...productPages, ...learnPages]
}
