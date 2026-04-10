import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const revalidate = 3600;

const SITE_URL = 'https://inovex.ro';

function buildSitemap(urls: { loc: string; lastmod: string; priority: string; changefreq: string }[]) {
  const urlsXml = urls
    .map(
      ({ loc, lastmod, priority, changefreq }) => `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;
}

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const now = new Date().toISOString();

    // Fetch published learn content
    const { data: learnContent } = await supabase
      .from('learn_content')
      .select('slug, type, updated_at, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    // Fetch published marketplace items
    const { data: marketplaceItems } = await supabase
      .from('marketplace_items')
      .select('slug, updated_at')
      .eq('status', 'published')
      .order('updated_at', { ascending: false });

    const typeToPath: Record<string, string> = {
      articol: 'articole',
      resursa: 'resurse',
      tool: 'tool-uri',
      video: 'video',
    };

    const urls: { loc: string; lastmod: string; priority: string; changefreq: string }[] = [];

    // Learn content URLs
    for (const item of learnContent ?? []) {
      const pathSegment = typeToPath[item.type];
      if (!pathSegment) continue;
      urls.push({
        loc: `${SITE_URL}/invata-gratuit/${pathSegment}/${item.slug}`,
        lastmod: item.updated_at ?? item.published_at ?? now,
        priority: item.type === 'articol' ? '0.8' : '0.75',
        changefreq: 'monthly',
      });
    }

    // Marketplace item URLs
    for (const item of marketplaceItems ?? []) {
      urls.push({
        loc: `${SITE_URL}/marketplace/${item.slug}`,
        lastmod: item.updated_at ?? now,
        priority: '0.85',
        changefreq: 'weekly',
      });
    }

    const xml = buildSitemap(urls);

    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
