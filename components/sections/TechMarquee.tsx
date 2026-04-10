'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';

const TECHS = [
  { name: 'WordPress',   file: 'wordpress'   },
  { name: 'WooCommerce', file: 'woocommerce' },
  { name: 'Shopify',     file: 'shopify'     },
  { name: 'Webflow',     file: 'webflow'     },
  { name: 'React',       file: 'react'       },
  { name: 'Next.js',     file: 'nextjs'      },
  { name: 'Laravel',     file: 'laravel'     },
  { name: 'Node.js',     file: 'nodejs'      },
];

/* Two identical sets — wrap by exactly one set width → seamless */
const ITEMS = [...TECHS, ...TECHS];

const SPEED = 55; // px/s

function Logo({ name, file }: { name: string; file: string }) {
  return (
    <div
      style={{
        flexShrink: 0,
        width: 130,
        height: 40,
        margin: '0 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/imagini/tech/${file}.svg`}
        alt={name}
        title={name}
        draggable={false}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block',
          filter: 'grayscale(1) opacity(0.35)',
          transition: 'filter 0.3s ease, transform 0.3s ease',
          cursor: 'default',
          userSelect: 'none',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.filter = 'grayscale(0) opacity(1)';
          e.currentTarget.style.transform = 'scale(1.08)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.filter = 'grayscale(1) opacity(0.35)';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      />
    </div>
  );
}

export function TechMarquee() {
  const x       = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const setW    = useRef(0);
  const ready   = useRef(false);
  const paused  = useRef(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const el = trackRef.current;
      if (!el) return;
      const w = el.scrollWidth / 2; // half of [set1 + set2] = one set
      if (w === 0) return;
      setW.current = w;
      x.set(0);
      ready.current = true;
      setVisible(true);
    }, 120);
    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useAnimationFrame((_, rawDelta) => {
    if (!ready.current || paused.current || setW.current === 0) return;
    const delta = Math.min(rawDelta, 50); // clamp to prevent jumps on tab switch
    let cur = x.get();
    cur -= (SPEED / 1000) * delta;
    if (cur <= -setW.current) cur += setW.current; // wrap seamlessly
    x.set(cur);
  });

  return (
    <section
      aria-label="Tehnologii cu care lucrăm"
      style={{
        background: '#fff',
        borderTop: '1px solid #f3f4f6',
        borderBottom: '1px solid #f3f4f6',
        paddingTop: '2.25rem',
        paddingBottom: '2.25rem',
        overflow: 'hidden',
      }}
    >
      <p
        style={{
          textAlign: 'center',
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#9ca3af',
          marginBottom: '1.5rem',
          fontFamily: 'var(--font-body)',
        }}
      >
        Lucram cu
      </p>

      <div style={{ position: 'relative' }}>
        {/* Left fade */}
        <div aria-hidden style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 100, background: 'linear-gradient(to right, #ffffff 30%, transparent)', zIndex: 10, pointerEvents: 'none' }} />
        {/* Right fade */}
        <div aria-hidden style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: 100, background: 'linear-gradient(to left, #ffffff 30%, transparent)', zIndex: 10, pointerEvents: 'none' }} />

        <motion.div
          ref={trackRef}
          style={{
            x,
            display: 'flex',
            alignItems: 'center',
            width: 'max-content',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
          onMouseEnter={() => { paused.current = true;  }}
          onMouseLeave={() => { paused.current = false; }}
        >
          {ITEMS.map((t, i) => (
            <Logo key={`${t.file}-${i}`} name={t.name} file={t.file} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
