'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  delay?: number;
  staggerChildren?: number;
}

export default function AnimatedText({
  text,
  className,
  as: Component = 'h1',
  delay = 0,
  staggerChildren = 0.03,
}: AnimatedTextProps) {
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerChildren,
        delayChildren: delay,
      },
    },
  };

  const charVariants = {
    hidden: { y: 40, opacity: 0, rotateX: -40 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: { type: 'spring' as const, damping: 15, stiffness: 120 },
    },
  };

  const MotionComponent = motion[Component as keyof typeof motion] as any;

  return (
    <MotionComponent
      className={cn('font-heading tracking-tight flex flex-wrap', className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap overflow-hidden mr-[0.25em]">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              variants={charVariants}
              className="inline-block transform-gpu"
              style={{ transformOrigin: '50% 50% -20px' }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </MotionComponent>
  );
}
