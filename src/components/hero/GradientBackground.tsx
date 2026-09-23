'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function GradientBackground() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-[#050505]">
        <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-[#030303]">
      {/* Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
          mixBlendMode: 'overlay',
        }}
      />

      {/* Subtle Technical Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 10%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 10%, transparent 80%)',
        }}
      />

      {/* Radial Lighting & Ambient Glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Deep blue/white center glow */}
        <div className="w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] bg-blue-500/5 rounded-full blur-[120px] md:blur-[150px] mix-blend-screen" />
      </div>

      {/* Depth Fog - bottom to top */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/80 to-transparent opacity-80" />
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030303_100%)] opacity-90" />

      {/* Subtle scanning line effect (animated) */}
      <motion.div 
        className="absolute left-0 right-0 h-[1px] bg-blue-400/10 shadow-[0_0_8px_rgba(96,165,250,0.4)]"
        animate={{
          top: ['-10%', '110%'],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
}
