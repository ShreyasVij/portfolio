'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeading({ title, subtitle, className }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn("flex items-start gap-4 mb-12", className)}
    >
      <div>
        <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-foreground">
          {title}
        </h2>
        {subtitle && (
          <p className="text-muted text-base mt-3 max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
    </motion.div>
  );
}
