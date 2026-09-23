'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface InteractiveNameProps {
  text: string;
}

export default function InteractiveName({ text }: InteractiveNameProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const chars = container.querySelectorAll('.char-wrapper');

    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      chars.forEach((char) => {
        const el = char as HTMLElement;
        const rect = el.getBoundingClientRect();
        const charX = rect.left + rect.width / 2;
        const charY = rect.top + rect.height / 2;

        const distanceX = mouseX - charX;
        const distanceY = mouseY - charY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        const maxDistance = 150;
        
        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          const pushX = (distanceX / distance) * -15 * force;
          const pushY = (distanceY / distance) * -15 * force;

          el.style.transform = `translate(${pushX}px, ${pushY}px)`;
          el.style.textShadow = '0 0 40px rgba(99, 102, 241, 0.4), 0 4px 20px rgba(0,0,0,0.3)';
        } else {
          el.style.transform = 'translate(0px, 0px)';
          el.style.textShadow = 'none';
        }
      });
    };

    const handleMouseLeave = () => {
      chars.forEach((char) => {
        const el = char as HTMLElement;
        el.style.transform = 'translate(0px, 0px)';
        el.style.textShadow = 'none';
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [prefersReducedMotion]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const charVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring" as const, damping: 12, stiffness: 100 }
    },
  };

  if (prefersReducedMotion) {
    return (
      <h1
        className="font-heading font-extrabold tracking-tight leading-[0.9] text-left text-foreground"
        style={{ fontSize: 'clamp(4rem, 8vw, 9rem)' }}
      >
        {text}
      </h1>
    );
  }

  return (
    <motion.h1
      ref={containerRef}
      className="font-heading font-extrabold tracking-tight leading-[0.9] text-left text-foreground flex whitespace-nowrap"
      style={{ fontSize: 'clamp(4rem, 8vw, 9rem)' }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          variants={charVariants}
          className="inline-block"
          style={{ whiteSpace: 'pre' }}
        >
          <motion.span
            className="char-wrapper inline-block transition-transform duration-75 ease-out"
            animate={{ y: [-1.5, 1.5, -1.5] }}
            transition={{ 
              repeat: Infinity, 
              duration: 4, 
              delay: index * 0.3, 
              ease: "easeInOut" 
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </motion.span>
      ))}
    </motion.h1>
  );
}
