import type { Metadata } from 'next';
import { MapPin, Award, Users, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Despre Inovex - Agentie de Dezvoltare Web din Romania',
  description:
    'Povestea Inovex: o echipa pasionata de digital, cu 7+ ani experienta si 200+ proiecte livrate. Sedii in Targu Jiu si Bucuresti.',
  alternates: { canonical: 'https://inovex.ro/despre-noi' },
  openGraph: {
    title: 'Despre Inovex - Agentie de Dezvoltare Web din Romania',
    description: '7+ ani de experienta, 200+ proiecte livrate, sedii in Targu Jiu si Bucuresti.',
    url: 'https://inovex.ro/despre-noi',
    images: [{ url: '/images/og/inovex-og.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Despre Inovex',
    description: '7+ ani de experienta, 200+ proiecte livrate.',
    images: ['/images/og/inovex-og.jpg'],
  },
};

const VALORI = [
  { icon: Award, titlu: 'Calitate',      descriere: 'Fiecare linie de cod și fiecare pixel sunt tratate cu aceeași atenție ca un proiect propriu.' },
  { icon: Heart, titlu: 'Transparență',  descriere: 'Comunicăm onest, indiferent dacă vestea e bună sau nu. Nicio surpriză la final de proiect.' },
  { icon: Users, titlu: 'Termen',        descriere: 'Respectăm termenele asumate. 100% din proiectele noastre au fost livrate la timp.' },
  { icon: MapPin, titlu: 'Inovație',     descriere: 'Adoptăm constant tehnologiile moderne pentru a livra soluții durabile, nu patch-uri temporare.' },
];

const STATISTICI = [
  { cifra: '200+', label: 'Proiecte livrate' },
  { cifra: '7+',   label: 'Ani de experiență' },
  { cifra: '100%', label: 'Livrate la termen' },
  { cifra: '2',    label: 'Sedii în România' },
];

export default function DespreNoiPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Acasă',     url: 'https://inovex.ro' },
          { name: 'Despre Noi', url: 'https://inovex.ro/despre-noi' },
        ]}
      />

      {/* Hero */}
      <div className="bg-gray-50 pt-32 pb-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-h1 text-gray-950 mb-6">O echipă de oameni pasionați de digital</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Inovex a pornit cu o misiune clară: să construim experiențe digitale care chiar contează pentru afacerile din România.
          </p>
        </div>
      </div>

      {/* Povestea */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-h2 text-gray-950 mb-4">Povestea noastră</h2>
              <p className="text-gray-500 leading-relaxed mb-4">
                Inovex s-a născut în Târgu Jiu, Gorj, cu convingerea că și afacerile din România meritau prezențe online la nivel internațional, nu site-uri făcute în grabă și abandonate.
              </p>
              <p className="text-gray-500 leading-relaxed mb-4">
                De la primele proiecte simple la magazine online complexe și aplicații SaaS cu mii de utilizatori. Am crescut odată cu clienții noștri, acumulând experiență reală, nu teoretică.
              </p>
              <p className="text-gray-500 leading-relaxed">
                Astăzi, operăm sub marca <strong>VOID SFT GAMES SRL</strong> (CUI: 43474393) și avem sedii în Târgu Jiu și București, servind clienți din toată România și diaspora.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {STATISTICI.map((s) => (
                <Card key={s.label} className="bg-blue-50 border-blue-100">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                      {s.cifra}
                    </div>
                    <div className="text-sm text-gray-500">{s.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Valori */}
      <section className="py-20 bg-gray-50" aria-labelledby="valori-titlu">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <h2 id="valori-titlu" className="text-h2 text-gray-950">Valorile noastre</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALORI.map((v, i) => (
              <ScrollReveal key={v.titlu} delay={i * 0.1}>
                <Card className="text-center card-glow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <v.icon size={24} className="text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-950 mb-2">{v.titlu}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{v.descriere}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-h2 text-gray-950 mb-4">Hai să lucrăm împreună</h2>
          <p className="text-gray-500 mb-8">Fiecare proiect este o oportunitate de a crea ceva cu adevărat valoros.</p>
          <Button href="/oferta" size="lg">Solicită Ofertă Gratuită</Button>
        </div>
      </section>
    </>
  );
}
