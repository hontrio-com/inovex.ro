import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog | Resurse, Ghiduri si Sfaturi Web | Inovex',
  description:
    'Articole despre SEO, performanta web, magazine online si design. Ghiduri practice pentru antreprenori si marketeri.',
  keywords: ['blog web design', 'articole SEO', 'ghiduri magazine online', 'sfaturi web Romania'],
  alternates: { canonical: 'https://inovex.ro/blog' },
  openGraph: {
    title: 'Blog | Resurse, Ghiduri si Sfaturi Web | Inovex',
    description: 'Articole despre SEO, performanta web si magazine online. Ghiduri practice.',
    url: 'https://inovex.ro/blog',
    images: [{ url: '/images/og/inovex-og.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Inovex | Resurse si Ghiduri Web',
    description: 'Articole despre SEO, performanta web si magazine online.',
    images: ['/images/og/inovex-og.jpg'],
  },
};

// Articole placeholder
const ARTICOLE = [
  { slug: 'viteza-site-conversie', titlu: 'Cum afectează viteza site-ului rata de conversie a magazinului tău online', categorie: 'SEO & Performanță', data: '2024-03-15', citire: '8 min', excerpt: 'Studiile arată că fiecare secundă de delay costă 7% din conversii. Iată cum optimizezi viteza magazinului tău.' },
  { slug: 'magazine-online-2024', titlu: 'Ghid complet: Cum lansezi un magazin online de succes în 2024', categorie: 'Ghiduri Magazine Online', data: '2024-03-01', citire: '12 min', excerpt: 'De la alegerea platformei la prima vânzare: tot ce trebuie să știi pentru a lansa un magazin online profitabil.' },
  { slug: 'ux-conversie', titlu: 'UX și Design: Cele mai frecvente greșeli care scad rata de conversie', categorie: 'Design & UX', data: '2024-02-20', citire: '6 min', excerpt: 'Analizăm cele mai comune greșeli de design întâlnite pe site-urile românești și cum le poți evita.' },
];

const CATEGORII = ['SEO & Performanță', 'Ghiduri Magazine Online', 'Design & UX', 'Noutăți Inovex'];

export default function BlogPage() {
  return (
    <>
      <div className="bg-gray-50 pt-32 pb-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-h1 text-gray-950 mb-4">Blog Inovex</h1>
          <p className="text-lg text-gray-500">Resurse, ghiduri și sfaturi pentru afacerea ta digitală.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-[1fr_280px] gap-12">
          <div>
            <div className="space-y-8">
              {ARTICOLE.map((a) => (
                <article key={a.slug} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-blue-50 flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">{a.categorie}</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                      <span className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full font-medium">{a.categorie}</span>
                      <span>{new Date(a.data).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {a.citire} citire</span>
                    </div>
                    <Link href={`/blog/${a.slug}`}>
                      <h2 className="text-xl font-semibold text-gray-950 mb-2 hover:text-blue-600 transition-colors">{a.titlu}</h2>
                    </Link>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{a.excerpt}</p>
                    <Link href={`/blog/${a.slug}`} className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                      Citește articolul →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside>
            <div className="sticky top-28 space-y-6">
              <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5">
                <h2 className="font-semibold text-gray-950 mb-3 text-sm">Categorii</h2>
                <ul className="space-y-2">
                  {CATEGORII.map((cat) => (
                    <li key={cat}>
                      <a href={`/blog?categorie=${encodeURIComponent(cat)}`} className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                        {cat}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-blue-50 rounded-2xl p-5">
                <h2 className="font-semibold text-gray-950 mb-2">Proiect nou?</h2>
                <p className="text-sm text-gray-500 mb-4">Primești o estimare gratuită în 24 de ore.</p>
                <a href="/oferta" className="block w-full text-center bg-blue-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1a6fa8] transition-colors">
                  Solicită Ofertă
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
