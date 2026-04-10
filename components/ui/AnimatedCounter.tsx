'use client';

import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { useCountUp } from '@/hooks/useCountUp';

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function AnimatedCounter({
  from = 0,
  to,
  duration = 2000,
  suffix = '',
  prefix = '',
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const { count, start } = useCountUp({ from, to, duration });
  const started = useRef(false);

  useEffect(() => {
    if (isInView && !started.current) {
      started.current = true;
      start();
    }
  }, [isInView, start]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count.toLocaleString('ro-RO')}{suffix}
    </span>
  );
}
