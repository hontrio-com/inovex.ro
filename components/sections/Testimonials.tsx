'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { TestimonialItem } from '@/lib/site-data';

interface Review {
  id: string;
  name: string;
  initials: string;
  website: string;
  quote: string;
}

const REVIEWS: Review[] = [
  { id: '1', name: 'Cosmin Danila',        initials: 'CD', website: 'stupinamaria.ro',    quote: 'Colaborarea a fost peste așteptări. Răbdare, soluții rapide și un rezultat final foarte bine pus la punct. Se vede experiența și pasiunea pentru ceea ce face. Recomand!' },
  { id: '2', name: 'Export Trans Ultimate', initials: 'ET', website: 'exporttrans.ro',     quote: 'Recomand cu toată încrederea! Site-ul de prezentare a fost realizat exact așa cum mi-am dorit: modern, clar, bine structurat și ușor de folosit. Comunicarea a fost foarte bună, a fost receptiv la toate cerințele mele și a respectat termenele stabilite. Se vede că este implicat și atent la detalii. Mulțumesc pentru profesionalism!' },
  { id: '3', name: 'AVI MOB',              initials: 'AM', website: 'avimob.ro',          quote: 'Servicii calitative, atenție la detalii, idei productive privind organizarea și gestiunea activității în online.' },
  { id: '4', name: 'Romina Somicescu',     initials: 'RS', website: 'romagcooking.ro',    quote: 'Sunt foarte mulțumită de rezultatele colaborării mele cu ei. Recomand cu încredere!' },
  { id: '5', name: 'Craus Armand',         initials: 'CA', website: 'fumgreuiasi.ro',     quote: 'Mi-au făcut un website de nota 10 pentru firma mea de evenimente. Recomand cu cea mai mare încredere dacă doriți ceva profesional și modern.' },
  { id: '6', name: 'IRETRO',              initials: 'IR', website: 'profesoruldeai.ro',  quote: 'Per total am fost foarte mulțumit de serviciile oferite, singura problemă minoră a fost faptul că au întârziat 5 zile. În rest, totul perfect! Recomand!' },
];

const AVATAR_COLORS = ['#2B8FCC', '#1a6fa8', '#374151', '#4A5568', '#1F2937', '#2B8FCC'];
const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

function ReviewCard({ review, colorIndex }: { review: Review; colorIndex: number }) {
  return (
    <Card className="card-glow h-full border-gray-200">
      <CardContent className="flex flex-col gap-4 p-6 h-full">
        {/* Stars */}
        <div className="flex gap-1" aria-label="5 stele">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
          ))}
        </div>

        {/* Quote */}
        <p className="text-[0.9375rem] leading-[1.7] text-gray-700 flex-1">
          &ldquo;{review.quote}&rdquo;
        </p>

        <Separator className="bg-gray-100" />

        {/* Footer */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Avatar
              className="size-10 shrink-0"
              style={{ background: AVATAR_COLORS[colorIndex % AVATAR_COLORS.length] }}
            >
              <AvatarFallback
                className="text-white font-bold text-[13px] tracking-wide"
                style={{ background: AVATAR_COLORS[colorIndex % AVATAR_COLORS.length] }}
              >
                {review.initials}
              </AvatarFallback>
            </Avatar>

            <div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-[13px] text-[#0D1117] leading-tight">
                  {review.name}
                </span>
                <Image src="/imagini/recenzii/verified.png" alt="Verificat" width={14} height={14} className="shrink-0" />
              </div>
              <span className="text-[12px] text-gray-500">{review.website}</span>
            </div>
          </div>

          <GoogleIcon />
        </div>
      </CardContent>
    </Card>
  );
}

export function Testimonials({ items: _items }: { items?: TestimonialItem[] } = {}) {
  const reduce = useReducedMotion() ?? false;
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => setActiveIndex((i) => (i - 1 + REVIEWS.length) % REVIEWS.length);
  const next = () => setActiveIndex((i) => (i + 1) % REVIEWS.length);

  return (
    <section
      aria-labelledby="testimoniale-titlu"
      className="relative overflow-hidden bg-gray-50"
      style={{ paddingTop: 'clamp(80px,10vw,120px)', paddingBottom: 'clamp(80px,10vw,120px)' }}
    >
      <div className="absolute inset-0 bg-dot opacity-50 pointer-events-none" aria-hidden />

      <div className="max-w-[1200px] mx-auto px-[clamp(24px,5vw,80px)]">

        {/* Header */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={reduce ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-white border border-[#E8ECF0] rounded-full px-3.5 py-1.5 mb-5 shadow-sm">
            <GoogleIcon />
            <span className="font-semibold text-[13px] text-gray-700">Recenzii verificate Google</span>
          </div>

          <h2
            id="testimoniale-titlu"
            className="font-extrabold text-[#0D1117] m-0"
            style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1.1, letterSpacing: '-0.027em' }}
          >
            Ce spun clienții noștri
          </h2>
        </motion.div>

        {/* Desktop grid */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={reduce ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {REVIEWS.map((review, i) => (
            <ReviewCard key={review.id} review={review} colorIndex={i} />
          ))}
        </motion.div>

        {/* Mobile carousel */}
        <div className="md:hidden">
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={reduce ? false : { opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <ReviewCard review={REVIEWS[activeIndex]} colorIndex={activeIndex} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <Button variant="outline" size="icon" onClick={prev} aria-label="Recenzie anterioară" className="rounded-full size-9">
              <ChevronLeft size={16} />
            </Button>

            <div className="flex gap-1.5 items-center">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Recenzia ${i + 1}`}
                  className={cn(
                    'h-1.5 rounded-full border-none cursor-pointer p-0 transition-all duration-250',
                    i === activeIndex ? 'w-5 bg-[#2B8FCC]' : 'w-1.5 bg-gray-300'
                  )}
                />
              ))}
            </div>

            <Button variant="outline" size="icon" onClick={next} aria-label="Recenzie următoare" className="rounded-full size-9">
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}
