'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Smartphone,
  Layers,
  CheckCircle,
  XCircle,
  TrendingDown,
} from 'lucide-react';

export default function PlatformComparison() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-[100px] bg-[#F8FAFB]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-[600px] mx-auto text-center mb-14">
          <Badge className="mb-4 inline-flex items-center gap-1.5 bg-[#EAF5FF] text-[#2B8FCC] border border-[#C8E6F8]">
            Alege platforma
          </Badge>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 'clamp(1.7rem,2.8vw,2.4rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: '#0D1117',
            }}
            className="mb-4"
          >
            iOS, Android sau{' '}
            <span style={{ fontStyle: 'italic', color: '#2B8FCC' }}>ambele simultan?</span>
          </h2>
          <p className="text-[#4A5568] text-[0.9375rem] leading-relaxed">
            Te ghidam catre alegerea care potriveste cel mai bine obiectivele si bugetul tau.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-6 items-start">

          {/* iOS Native */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0 }}
          >
            <Card className="h-full border border-[#E8ECF0] rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: '#E8F0FE' }}>
                  <Smartphone size={22} color="#007AFF" />
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.0625rem', color: '#0D1117', marginBottom: 8 }}>
                  iOS Nativ (Swift)
                </h3>
                <Badge className="mb-5 text-[11px]" style={{ background: '#E8F0FE', color: '#007AFF', border: 'none' }}>
                  Performanta maxima
                </Badge>

                <p className="text-[12px] font-semibold text-[#0D1117] mb-3">Cand recomandam</p>
                <ul className="space-y-2 mb-5">
                  {[
                    'Publicul tau e majoritar utilizatori iPhone',
                    'Ai nevoie de acces profund la hardware Apple (Watch, CarPlay)',
                    'Aplicatie premium unde look-and-feel nativ conteaza',
                    'Buget permite doua baze de cod separate',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle size={13} color="#007AFF" className="shrink-0 mt-0.5" />
                      <span className="text-[12px] text-[#4A5568] leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-[12px] font-semibold text-[#0D1117] mb-3">Dezavantaje</p>
                <ul className="space-y-2">
                  {[
                    'Cost mai ridicat fata de cross-platform (doua proiecte)',
                    'Timp de lansare mai lung',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <XCircle size={13} className="text-[#EF4444] shrink-0 mt-0.5" />
                      <span className="text-[12px] text-[#4A5568] leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Android Native */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card className="h-full border border-[#E8ECF0] rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: '#E6F4EA' }}>
                  <Smartphone size={22} color="#34A853" />
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.0625rem', color: '#0D1117', marginBottom: 8 }}>
                  Android Nativ (Kotlin)
                </h3>
                <Badge className="mb-5 text-[11px]" style={{ background: '#E6F4EA', color: '#34A853', border: 'none' }}>
                  Ecosistem larg
                </Badge>

                <p className="text-[12px] font-semibold text-[#0D1117] mb-3">Cand recomandam</p>
                <ul className="space-y-2 mb-5">
                  {[
                    'Publicul tau e majoritar utilizatori Android (piata romana)',
                    'Integratii profunde cu serviciile Google',
                    'Aplicatie enterprise pe dispozitive Android dedicate',
                    'Buget permite doua baze de cod',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle size={13} color="#34A853" className="shrink-0 mt-0.5" />
                      <span className="text-[12px] text-[#4A5568] leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-[12px] font-semibold text-[#0D1117] mb-3">Dezavantaje</p>
                <ul className="space-y-2">
                  {[
                    'Cost mai ridicat fata de cross-platform',
                    'Fragmentare dispozitive necesita testare extinsa',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <XCircle size={13} className="text-[#EF4444] shrink-0 mt-0.5" />
                      <span className="text-[12px] text-[#4A5568] leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Cross-Platform - FEATURED */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1.02 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="relative"
          >
            {/* Recommended badge */}
            <div className="absolute -top-3 right-4 z-10">
              <Badge className="bg-[#2B8FCC] text-white border-none text-[11px] shadow-md">
                Recomandat
              </Badge>
            </div>

            <Card className="h-full border-2 border-[#2B8FCC] rounded-2xl overflow-hidden shadow-lg" style={{ boxShadow: '0 0 0 4px rgba(43,143,204,0.12)' }}>
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: '#EAF5FF' }}>
                  <Layers size={22} color="#2B8FCC" />
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.0625rem', color: '#0D1117', marginBottom: 8 }}>
                  React Native / Flutter
                </h3>
                <Badge className="mb-5 text-[11px]" style={{ background: '#EAF5FF', color: '#2B8FCC', border: 'none' }}>
                  O singura baza de cod
                </Badge>

                <p className="text-[12px] font-semibold text-[#0D1117] mb-3">Cand recomandam</p>
                <ul className="space-y-2 mb-5">
                  {[
                    'Vrei sa acoperi iOS si Android cu buget mai eficient',
                    '80% din functionalitati sunt identice pe ambele platforme',
                    'Vrei lansare simultana pe ambele store-uri',
                    'Startup sau MVP unde viteza conteaza',
                    'Echipa de intretinere este limitata',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle size={13} className="text-[#2B8FCC] shrink-0 mt-0.5" />
                      <span className="text-[12px] text-[#4A5568] leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Extra advantage */}
                <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-lg p-3 flex items-start gap-2">
                  <TrendingDown size={14} color="#10B981" className="shrink-0 mt-0.5" />
                  <span className="text-[12px] text-[#065F46] font-medium leading-relaxed">
                    Cost cu 40-60% mai mic fata de doua aplicatii native separate
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
