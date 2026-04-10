import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  url: z.string().url(),
})

export interface SeoCheckResult {
  id: string
  label: string
  passed: boolean
  recommendation: string
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'URL invalid' }, { status: 400 })
    }

    const { url } = parsed.data

    // Enforce https for SSL check before fetching
    const isHttps = url.startsWith('https://')

    let html = ''
    let accessible = false
    let finalUrl = url

    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 5000)
      const response = await fetch(url, {
        signal: controller.signal,
        headers: { 'User-Agent': 'InovexSeoChecker/1.0' },
      })
      clearTimeout(timeout)
      accessible = response.ok
      finalUrl = response.url
      html = await response.text()
    } catch {
      accessible = false
    }

    const results: SeoCheckResult[] = []

    // 1. SSL
    results.push({
      id: 'ssl',
      label: 'Conexiune HTTPS (SSL)',
      passed: isHttps && finalUrl.startsWith('https://'),
      recommendation: isHttps
        ? 'Pagina foloseste HTTPS. Conexiunea este securizata.'
        : 'Instaleaza un certificat SSL si redirectioneaza HTTP catre HTTPS.',
    })

    // 2. Accesibila
    results.push({
      id: 'accessible',
      label: 'Pagina accesibila (200 OK)',
      passed: accessible,
      recommendation: accessible
        ? 'Pagina se incarca corect.'
        : 'Pagina nu raspunde sau returneaza o eroare. Verifica serverul.',
    })

    // 3. Title tag
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
    const titleText = titleMatch ? titleMatch[1].trim() : ''
    const hasTitle = titleText.length > 0
    const titleTooLong = titleText.length > 60
    results.push({
      id: 'title',
      label: 'Tag <title>',
      passed: hasTitle && !titleTooLong,
      recommendation: !hasTitle
        ? 'Adauga un tag <title> unic si descriptiv.'
        : titleTooLong
        ? `Titlul are ${titleText.length} caractere. Recomandat: maxim 60 caractere.`
        : `Titlul este prezent si are ${titleText.length} caractere.`,
    })

    // 4. Meta description
    const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/i)
      || html.match(/<meta[^>]+content=["']([^"']*)["'][^>]*name=["']description["']/i)
    const descText = descMatch ? descMatch[1].trim() : ''
    const hasDesc = descText.length > 0
    const descTooLong = descText.length > 160
    results.push({
      id: 'description',
      label: 'Meta description',
      passed: hasDesc && !descTooLong,
      recommendation: !hasDesc
        ? 'Adauga un meta description relevant (120-160 caractere).'
        : descTooLong
        ? `Descrierea are ${descText.length} caractere. Recomandat: maxim 160 caractere.`
        : `Meta description este prezent si are ${descText.length} caractere.`,
    })

    // 5. Viewport meta
    const hasViewport = /<meta[^>]+name=["']viewport["']/i.test(html)
    results.push({
      id: 'viewport',
      label: 'Meta viewport (mobile)',
      passed: hasViewport,
      recommendation: hasViewport
        ? 'Tag-ul viewport este prezent. Pagina este optimizata pentru mobil.'
        : 'Lipseste tag-ul <meta name="viewport">. Adauga-l pentru compatibilitate cu dispozitivele mobile.',
    })

    // 6. Robots meta
    const robotsMatch = html.match(/<meta[^>]+name=["']robots["'][^>]*content=["']([^"']*)["']/i)
      || html.match(/<meta[^>]+content=["']([^"']*)["'][^>]*name=["']robots["']/i)
    const robotsContent = robotsMatch ? robotsMatch[1].toLowerCase() : ''
    const isBlocked = robotsContent.includes('noindex')
    results.push({
      id: 'robots',
      label: 'Meta robots (indexare)',
      passed: !isBlocked,
      recommendation: isBlocked
        ? 'Pagina are noindex - nu va fi indexata de Google. Verifica daca este intentionat.'
        : 'Pagina nu are restrictii de indexare.',
    })

    const passed = results.filter((r) => r.passed).length
    const score = Math.round((passed / results.length) * 100)

    return NextResponse.json({ results, score, url })
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
