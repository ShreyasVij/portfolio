'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import GradientBackground from '@/components/hero/GradientBackground';
import Link from 'next/link';
import Hero3D from '@/components/hero/Hero3D';

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14"></path>
    <path d="m12 5 7 7-7 7"></path>
  </svg>
);

const ArrowUpRightIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M7 17L17 7"></path>
    <path d="M7 7h10v10"></path>
  </svg>
);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.4], [0, 50]);

  // Entrance animations
  const staggerDelay = 0.15;
  const animProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <section id="home" ref={sectionRef} className="min-h-screen relative overflow-hidden flex flex-col justify-center bg-[#030303] text-white">
      <GradientBackground />
      
      {/* 3D WebGL Background - fades in first */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="absolute inset-0 z-0"
      >
        <Hero3D />
      </motion.div>

      <motion.div
        style={{
          opacity: heroOpacity,
          y: heroY
        }}
        className="relative z-10 w-full min-h-screen flex items-center pt-24 pb-20 md:py-0"
      >
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pointer-events-none">
          
          {/* Left: Text content */}
          <div className="flex flex-col justify-center pointer-events-auto">
            
            {/* Status Label */}
            <motion.div 
              {...animProps} transition={{ ...animProps.transition, delay: 0.4 }}
              className="mb-8 flex items-center gap-3"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="font-mono text-[10px] sm:text-xs tracking-widest text-white/60 uppercase">
                Software Engineer · AI/ML · Full Stack
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1 
              {...animProps} transition={{ ...animProps.transition, delay: 0.5 + staggerDelay }}
              className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6"
            >
              SHREYAS VIJ
            </motion.h1>

            {/* Headline */}
            <motion.h2 
              {...animProps} transition={{ ...animProps.transition, delay: 0.5 + staggerDelay * 2 }}
              className="font-serif text-2xl sm:text-3xl lg:text-4xl leading-[1.2] text-white/80 max-w-xl font-light"
            >
              Building software that moves ideas into <span className="italic text-white">reality.</span>
            </motion.h2>

            <motion.p 
              {...animProps} transition={{ ...animProps.transition, delay: 0.5 + staggerDelay * 3 }}
              className="text-sm sm:text-base text-white/50 max-w-md mt-6 leading-relaxed font-sans"
            >
              Software Engineer building scalable systems, AI-powered applications, and intelligent products. Based in Chandigarh, India.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              {...animProps} transition={{ ...animProps.transition, delay: 0.5 + staggerDelay * 4 }}
              className="mt-12 flex flex-wrap gap-4 items-center"
            >
              <Link 
                href="#projects"
                className="group relative overflow-hidden bg-white text-black px-6 py-3 rounded-sm text-sm font-semibold transition-transform duration-300 ease-out hover:scale-[1.02] flex items-center gap-2"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative">View My Work</span>
                <ArrowRightIcon className="relative group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link 
                href="#contact"
                className="group border border-white/10 hover:border-white/30 bg-white/[0.02] hover:bg-white/[0.05] text-white/80 hover:text-white px-6 py-3 rounded-sm text-sm font-medium transition-all duration-300 ease-out flex items-center gap-2"
              >
                Let&apos;s Connect
                <ArrowUpRightIcon className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </Link>
              <a 
                href="https://drive.google.com/file/d/1h9woS2Fz443V9jEZxp3VXrmmIB9UQG2M/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-transparent hover:border-white/20 bg-transparent text-white/60 hover:text-white/90 px-6 py-3 rounded-sm text-sm font-medium transition-all duration-300 ease-out flex items-center gap-2"
              >
                Resume
                <ArrowUpRightIcon className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 opacity-50 group-hover:opacity-100" />
              </a>
            </motion.div>

            {/* Technical Annotations */}
            <motion.div 
              {...animProps} transition={{ ...animProps.transition, delay: 0.5 + staggerDelay * 5 }}
              className="mt-16 flex items-center gap-8 border-t border-white/10 pt-6"
            >
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] text-white/40">01</span>
                <span className="font-mono text-[11px] tracking-wider text-white/80">FULL STACK</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] text-white/40">02</span>
                <span className="font-mono text-[11px] tracking-wider text-white/80">AI / ML</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] text-white/40">03</span>
                <span className="font-mono text-[11px] tracking-wider text-white/80">SYSTEMS</span>
              </div>
            </motion.div>

          </div>
          
          {/* Right side is intentionally left empty for the WebGL canvas to shine through */}
          <div className="hidden lg:block"></div>

        </div>
      </motion.div>

      {/* Sophisticated Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-6 md:left-12 lg:left-20 flex flex-col items-start gap-3 pointer-events-none z-20"
      >
        <span className="font-mono text-[10px] text-white/40">01</span>
        <div className="w-12 h-[1px] bg-white/20 relative overflow-hidden">
          <motion.div 
            className="w-full h-full bg-white/80 origin-left"
            animate={{ scaleX: [0, 1, 0], translateX: ['0%', '0%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <span className="font-mono text-[9px] text-white/40 tracking-[0.2em] uppercase">
          Scroll to explore
        </span>
      </motion.div>
    </section>
  );
}
