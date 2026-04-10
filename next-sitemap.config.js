/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://inovex.ro',
  generateRobotsTxt: false, // robots.txt managed manually
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [
    '/admin',
    '/admin/*',
    '/api/*',
    '/oferta',
    '/oferta/*',
    '/politica-de-confidentialitate',
    '/politica-cookies',
    '/termeni-si-conditii',
    '/server-sitemap.xml',
  ],
  additionalSitemaps: ['https://inovex.ro/server-sitemap.xml'],
  transform: async (config, path) => {
    const priorities: Record<string, number> = {
      '/': 1.0,
      '/servicii/magazine-online': 0.95,
      '/servicii/website-de-prezentare': 0.95,
      '/servicii/aplicatii-web-saas': 0.9,
      '/servicii/cms-crm-erp': 0.9,
      '/servicii/aplicatii-mobile': 0.9,
      '/servicii/automatizari-ai': 0.9,
      '/portofoliu': 0.9,
      '/marketplace': 0.92,
      '/invata-gratuit': 0.88,
      '/contact': 0.85,
      '/blog': 0.8,
      '/despre-noi': 0.75,
    };

    let changefreq: string;
    let priority: number;

    if (path === '/') {
      changefreq = 'daily';
      priority = 1.0;
    } else if (path.startsWith('/servicii/')) {
      changefreq = 'monthly';
      priority = priorities[path] ?? 0.9;
    } else if (path.startsWith('/invata-gratuit/')) {
      changefreq = 'monthly';
      priority = 0.75;
    } else if (path.startsWith('/marketplace/')) {
      changefreq = 'weekly';
      priority = 0.8;
    } else if (path.startsWith('/blog/')) {
      changefreq = 'monthly';
      priority = 0.7;
    } else {
      changefreq = 'weekly';
      priority = priorities[path] ?? 0.7;
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};
