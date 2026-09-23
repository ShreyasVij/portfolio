'use client';

import { useEffect, useState } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import type { RefObject } from 'react';

// Check reduced motion preference
function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

// Parallax effect — returns a MotionValue<number> for y offset
export function useParallax(ref: RefObject<HTMLElement | null>, speed: number = 0.3) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * -100, speed * 100]);
  return reduced ? 0 : y;
}

// Fade + scale as element scrolls out of view
export function useFadeOnScroll(ref: RefObject<HTMLElement | null>) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.97]);
  
  if (reduced) return { opacity: 1, scale: 1 };
  return { opacity, scale };
}

export { useReducedMotion };
