'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SkillTagProps {
  name: string;
  index: number;
  className?: string;
}

export default function SkillTag({ name, index, className }: SkillTagProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
      whileHover={{ scale: 1.03 }}
      className={cn(
        "px-3.5 py-1.5 rounded-full border border-white/8 bg-white/[0.03] text-sm text-foreground/80",
        "hover:border-white/15 hover:bg-white/[0.06] transition-all duration-200 cursor-default",
        className
      )}
    >
      {name}
    </motion.div>
  );
}
