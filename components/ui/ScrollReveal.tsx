'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, type CSSProperties, type ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
  once?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  once = true,
  className,
  style,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.15 });
  const shouldReduceMotion = useReducedMotion();

  const getInitial = () => {
    if (shouldReduceMotion) return { opacity: 0 };
    switch (direction) {
      case 'up': return { opacity: 0, y: 24 };
      case 'left': return { opacity: 0, x: -24 };
      case 'right': return { opacity: 0, x: 24 };
      default: return { opacity: 0 };
    }
  };

  const getAnimate = () => {
    if (shouldReduceMotion) return isInView ? { opacity: 1 } : { opacity: 0 };
    switch (direction) {
      case 'up': return isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 };
      case 'left': return isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 };
      case 'right': return isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 };
      default: return isInView ? { opacity: 1 } : { opacity: 0 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitial()}
      animate={getAnimate()}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
