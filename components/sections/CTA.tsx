'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Word { text: string; highlight: boolean; }

const WORDS: Word[] = [
  { text: 'Ești',       highlight: false },
  { text: 'gata',       highlight: false },
  { text: 'să',         highlight: false },
  { text: 'îți',        highlight: false },
  { text: 'duci',       highlight: false },
  { text: 'afacerea',   highlight: false },
  { text: 'la',         highlight: false },
  { text: 'nivelul',    highlight: true  },
  { text: 'următor?',   highlight: true  },
];

const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.032 } },
};

const charVariants = {
  hidden:  { opacity: 0, filter: 'blur(10px)' },
  visible: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } },
};

function TypewriterHeading({ trigger }: { trigger: boolean }) {
  return (
    <motion.h2
      variants={containerVariants}
      initial="hidden"
      animate={trigger ? 'visible' : 'hidden'}
      aria-label={WORDS.map((w) => w.text).join(' ')}
      className="font-extrabold text-[#0D1117] m-0 flex flex-wrap justify-center gap-x-[0.28em] gap-y-[0.12em]"
      style={{ fontSize: 'clamp(2rem, 4.5vw, 3.75rem)', lineHeight: 1.1, letterSpacing: '-0.030em' }}
    >
      {WORDS.map((word, wi) => (
        <span key={wi} className="inline-flex" style={{ color: word.highlight ? '#2B8FCC' : '#0D1117' }}>
          {word.text.split('').map((char, ci) => (
            <motion.span key={ci} variants={charVariants} style={{ display: 'inline-block' }}>
              {char}
            </motion.span>
          ))}
        </span>
      ))}
      <motion.span
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        className="inline-block w-[3px] bg-[#2B8FCC] rounded-sm ml-1 self-center shrink-0"
        style={{ height: '0.85em' }}
        aria-hidden="true"
      />
    </motion.h2>
  );
}

export function CTA() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduce = useReducedMotion() ?? false;

  return (
    <section
      ref={ref}
      aria-labelledby="cta-titlu"
      className="bg-white text-center"
      style={{ paddingTop: 'clamp(80px,10vw,140px)', paddingBottom: 'clamp(80px,10vw,140px)' }}
    >
      <div className="max-w-[860px] mx-auto px-[clamp(24px,5vw,48px)]">

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="text-base text-gray-500 mb-8"
        >
          Estimare gratuită, fără angajamente.
        </motion.p>

        <div id="cta-titlu" className="mb-12">
          {reduce ? (
            <h2 className="font-extrabold text-[#0D1117] m-0" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.75rem)', lineHeight: 1.1, letterSpacing: '-0.030em' }}>
              Ești gata să îți duci afacerea la{' '}
              <span className="text-[#2B8FCC]">nivelul următor?</span>
            </h2>
          ) : (
            <TypewriterHeading trigger={inView} />
          )}
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-wrap justify-center gap-3"
        >
          <Button
            href="tel:+40750456096"
            size="lg"
            leftIcon={<Phone size={17} />}
            className="bg-[#0D1117] hover:bg-[#1a2030]"
          >
            Sună acum: 0750 456 096
          </Button>

          <Button
            href="/contact"
            size="lg"
            variant="outline"
            leftIcon={<Mail size={17} />}
          >
            Trimite un mesaj
          </Button>
        </motion.div>

      </div>
    </section>
  );
}
