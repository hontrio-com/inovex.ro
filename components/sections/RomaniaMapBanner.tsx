'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';

/* ══════════════════════════════════════════════════════
   HOOK countUp
══════════════════════════════════════════════════════ */
function useCountUp(end: number, duration: number, shouldStart: boolean): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let rafId: number;
    let startTime: number | null = null;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed  = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const easeOut  = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(end * easeOut));
      if (progress < 1) rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [end, duration, shouldStart]);

  return count;
}

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

/* ══════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════ */
export default function RomaniaMapBanner() {
  const sectionRef      = useRef<HTMLElement>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const pathsRef        = useRef<SVGPathElement[]>([]);
  const reduce          = useReducedMotion() ?? false;

  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [svgLoaded, setSvgLoaded] = useState(false);

  const count30  = useCountUp(30,  1.2, isInView);
  const count200 = useCountUp(200, 1.5, isInView);
  const count100 = useCountUp(100, 1.2, isInView);

  /* ── Fetch & init SVG ── */
  useEffect(() => {
    const container = svgContainerRef.current;
    if (!container) return;

    fetch('/ro.svg')
      .then((r) => r.text())
      .then((svgText) => {
        container.innerHTML = svgText;
        const svgEl = container.querySelector('svg');
        if (!svgEl) return;

        svgEl.setAttribute('width', '100%');
        svgEl.setAttribute('height', 'auto');
        svgEl.style.overflow = 'visible';
        svgEl.style.display  = 'block';

        const paths = Array.from(svgEl.querySelectorAll('path')) as SVGPathElement[];
        pathsRef.current = paths;

        /* Stare initiala: contur vizibil, fill transparent */
        paths.forEach((path) => {
          path.style.fill        = '#ffffff';
          path.style.stroke      = '#D1D5DB';
          path.style.strokeWidth = '1';
          path.style.cursor      = 'default';
          path.style.transition  = 'fill 700ms ease, stroke 500ms ease';

          const onEnter = () => {
            path.style.fill   = 'rgba(43,143,204,0.20)';
            path.style.stroke = 'rgba(43,143,204,0.50)';
          };
          const onLeave = () => {
            path.style.fill   = 'rgba(43,143,204,0.13)';
            path.style.stroke = '#D1D5DB';
          };
          path.addEventListener('mouseenter', onEnter);
          path.addEventListener('mouseleave', onLeave);
        });

        setSvgLoaded(true);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Coloreaza judetele cand sectiunea e vizibila ── */
  useEffect(() => {
    if (!isInView || !svgLoaded) return;
    const paths = pathsRef.current;
    if (!paths.length) return;

    if (reduce) {
      paths.forEach((path) => { path.style.fill = 'rgba(43,143,204,0.13)'; });
      return;
    }

    /* Ordine aleatorie */
    const shuffled  = [...paths].sort(() => Math.random() - 0.5);
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    shuffled.forEach((path, index) => {
      const t = setTimeout(() => {
        path.style.fill = 'rgba(43,143,204,0.13)';
      }, index * 160);
      timeouts.push(t);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [isInView, svgLoaded, reduce]);

  return (
    <section
      ref={sectionRef}
      aria-label="Acoperire nationala Inovex"
      style={{
        background: '#F9FAFB',
        width: '100%',
        padding: 'clamp(40px,6vw,80px) clamp(24px,5vw,80px)',
      }}
    >
      <style>{`
        @media (max-width: 767px) {
          .map-banner-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .map-col-right   { max-width: 300px !important; margin: 0 auto !important; }
        }
      `}</style>

      {/* Chenar */}
      <div style={{
        maxWidth:     1200,
        margin:       '0 auto',
        border:       '1px solid #E8ECF0',
        borderRadius: 24,
        overflow:     'hidden',
        position:     'relative',
        background:   '#fff',
      }}>
        {/* Grid background */}
        <div
          aria-hidden="true"
          style={{
            position:         'absolute',
            inset:            0,
            backgroundSize:   '40px 40px',
            backgroundImage:  'linear-gradient(to right, #e4e4e7 1px, transparent 1px), linear-gradient(to bottom, #e4e4e7 1px, transparent 1px)',
            pointerEvents:    'none',
          }}
        />
        {/* Radial fade mask — sbterge gridul la centru */}
        <div
          aria-hidden="true"
          style={{
            position:             'absolute',
            inset:                0,
            background:           '#fff',
            maskImage:            'radial-gradient(ellipse at center, transparent 30%, black 80%)',
            WebkitMaskImage:      'radial-gradient(ellipse at center, transparent 30%, black 80%)',
            pointerEvents:        'none',
          }}
        />

        {/* Continut */}
        <div style={{
          position: 'relative',
          zIndex:   1,
          padding:  'clamp(48px,7vw,96px) clamp(32px,5vw,80px)',
        }}>
        <div
          className="map-banner-grid"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}
        >

          {/* ══ COLOANA STANGA ══ */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={reduce ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            {/* Eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 28, height: 1, background: '#2B8FCC', flexShrink: 0 }} />
              <span style={{
                fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 11,
                textTransform: 'uppercase', letterSpacing: '0.10em', color: '#2B8FCC',
              }}>
                Prezenta nationala
              </span>
            </div>

            {/* H2 */}
            <h2 style={{
              fontFamily:    'var(--font-display)',
              fontWeight:    800,
              fontSize:      'clamp(2rem, 3.2vw, 2.75rem)',
              lineHeight:    1.1,
              letterSpacing: '-0.027em',
              color:         '#0D1117',
              margin:        0,
            }}>
              Lucram cu firme din{' '}
              <em style={{ fontStyle: 'italic', color: '#2B8FCC', fontFamily: 'var(--font-serif)' }}>toate</em>
              {' '}colturile tarii
            </h2>

            {/* Paragraf */}
            <p style={{
              fontFamily: 'var(--font-body)', fontWeight: 400,
              fontSize: '1.0625rem', lineHeight: 1.75,
              color: '#4A5568', maxWidth: 400,
              marginTop: 18, marginBottom: 40,
            }}>
              Nu conteaza unde esti. Conteaza ce vrei sa construiesti.
              Am livrat proiecte in peste 30 de judete si continuam.
            </p>

            {/* Stats */}
            <div style={{
              display: 'flex', maxWidth: 400,
              border: '1px solid #E8ECF0',
              borderRadius: 12, overflow: 'hidden',
            }}>
              {([
                { value: count30,  suffix: '+', label: 'judete acoperite'  },
                { value: count200, suffix: '+', label: 'proiecte livrate'  },
                { value: count100, suffix: '%', label: 'colaborare online' },
              ] as const).map((stat, i) => (
                <div
                  key={stat.label}
                  style={{
                    flex: 1, padding: '18px 20px',
                    borderRight: i < 2 ? '1px solid #E8ECF0' : 'none',
                    display: 'flex', flexDirection: 'column', gap: 3,
                  }}
                >
                  <div style={{
                    fontFamily: 'var(--font-display)', fontWeight: 800,
                    fontSize: '1.625rem', color: '#0D1117', lineHeight: 1,
                  }}>
                    {stat.value}{stat.suffix}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-body)', fontWeight: 400,
                    fontSize: '0.75rem', color: '#6B7280', lineHeight: 1.4,
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Butoane */}
            <div style={{ marginTop: 36, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <Link
                href="/oferta"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: '#0D1117', color: '#fff', textDecoration: 'none',
                  fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9375rem',
                  padding: '12px 24px', borderRadius: 8, transition: 'background 200ms ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = '#1a2030'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = '#0D1117'; }}
              >
                Solicita oferta
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/portofoliu"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '0.9375rem',
                  color: '#6B7280', textDecoration: 'none', transition: 'color 150ms ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#0D1117'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#6B7280'; }}
              >
                Vezi portofoliul
                <ChevronRight size={15} />
              </Link>
            </div>
          </motion.div>

          {/* ══ COLOANA DREAPTA — HARTA ══ */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: 24 }}
            whileInView={reduce ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
            className="map-col-right"
            style={{ overflow: 'visible' }}
          >
            <div style={{ position: 'relative', width: '100%' }}>
              {/* Harta SVG */}
              <div ref={svgContainerRef} style={{ width: '100%', lineHeight: 0 }} />


            </div>
          </motion.div>

        </div>
        </div>{/* end continut */}
      </div>{/* end chenar */}
    </section>
  );
}
