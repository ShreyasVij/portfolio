'use client';

import { useRef, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}

export default function MagneticButton({ children, className, href, onClick }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    // Scale movement based on max pull ~10px
    const maxPull = 10;
    const x = (middleX / (width / 2)) * maxPull;
    const y = (middleY / (height / 2)) * maxPull;
    
    setPosition({ x, y });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseClasses = cn(
    "inline-block px-6 py-3 rounded-full font-medium transition-all duration-150 ease-out cursor-pointer outline-none focus:outline-none",
    className
  );

  const motionProps = {
    ref,
    onMouseMove: handleMouse,
    onMouseLeave: reset,
    animate: { x: position.x, y: position.y },
    transition: { type: "spring", stiffness: 150, damping: 15, mass: 0.1 },
    className: baseClasses,
    onClick,
  };

  if (href) {
    return (
      <motion.a href={href} {...(motionProps as any)}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button {...(motionProps as any)}>
      {children}
    </motion.button>
  );
}
