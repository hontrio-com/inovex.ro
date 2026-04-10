'use client';

import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

// Hook pentru detectarea intrării elementului în viewport
export function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });

  return { ref, isInView };
}
