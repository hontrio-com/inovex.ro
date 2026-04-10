import { ArrowRight, Clock, Shield, Star } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import Link from 'next/link';

export function OfertaTeaser() {
  return (
    <section
      className="py-20 lg:py-28 bg-gray-50"
      aria-labelledby="oferta-teaser-titlu"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <div className="bg-white rounded-2xl border border-gray-200 p-8 lg:p-12">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Star size={22} className="text-blue-600" />
            </div>

            <h2 id="oferta-teaser-titlu" className="text-h2 text-gray-950 mb-4">
              Calculează costul proiectului tău în 3 minute
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto mb-8 leading-relaxed">
              Fără apeluri, fără presiune. Completezi un formular simplu și primești o estimare
              personalizată direct pe email.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <Clock size={15} className="text-blue-500" />
                Răspuns în max. 24h
              </span>
              <span className="hidden sm:block w-1 h-1 rounded-full bg-gray-200" />
              <span className="flex items-center gap-2">
                <Shield size={15} className="text-blue-500" />
                Fără angajamente
              </span>
              <span className="hidden sm:block w-1 h-1 rounded-full bg-gray-200" />
              <span className="flex items-center gap-2">
                <Star size={15} className="text-blue-500" />
                Estimare gratuită
              </span>
            </div>

            <Link
              href="/oferta"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gray-900 text-white text-[15px] font-semibold hover:bg-gray-700 transition-colors"
            >
              Configurează Oferta Acum
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
