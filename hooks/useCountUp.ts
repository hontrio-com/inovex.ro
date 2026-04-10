'use client';

import { useState, useEffect, useRef } from 'react';

interface UseCountUpOptions {
  from?: number;
  to: number;
  duration?: number;
  startOnMount?: boolean;
}

export function useCountUp({ from = 0, to, duration = 2000, startOnMount = false }: UseCountUpOptions) {
  const [count, setCount] = useState(from);
  const [isRunning, setIsRunning] = useState(startOnMount);
  const frameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  function start() {
    setIsRunning(true);
  }

  useEffect(() => {
    if (!isRunning) return;

    startTimeRef.current = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // Easing ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(from + (to - from) * eased));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    }

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [isRunning, from, to, duration]);

  return { count, start };
}
