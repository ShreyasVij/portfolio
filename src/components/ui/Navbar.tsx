'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -60% 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[90%] md:max-w-fit"
      >
        <div className="flex items-center justify-between md:justify-center gap-12 bg-[#0a0a0a]/60 backdrop-blur-md border border-white/[0.05] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] rounded-full px-6 py-3">
          
          <Link href="/" className="font-mono text-sm font-semibold tracking-tighter text-white">
            SV
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" onMouseLeave={() => setHoveredLink(null)}>
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              const isHovered = hoveredLink === link.name;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onMouseEnter={() => setHoveredLink(link.name)}
                  className="relative px-4 py-1.5 text-xs font-medium transition-colors duration-300"
                >
                  <span className={cn(
                    "relative z-10 transition-colors duration-300",
                    isActive || isHovered ? "text-white" : "text-white/50"
                  )}>
                    {link.name}
                  </span>
                  
                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-white/[0.08] rounded-full border border-white/[0.05]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  
                  {/* Subtle hover underline */}
                  {!isActive && isHovered && (
                    <motion.div
                      layoutId="hoverNavIndicator"
                      className="absolute bottom-1 left-4 right-4 h-[1px] bg-white/20"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden relative z-50 w-6 h-6 flex flex-col justify-center items-center gap-1 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={cn("block w-5 h-[1.5px] bg-white transition-transform duration-300", mobileMenuOpen && "rotate-45 translate-y-[5.5px]")} />
            <span className={cn("block w-5 h-[1.5px] bg-white transition-opacity duration-300", mobileMenuOpen && "opacity-0")} />
            <span className={cn("block w-5 h-[1.5px] bg-white transition-transform duration-300", mobileMenuOpen && "-rotate-45 -translate-y-[5.5px]")} />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#030303]/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-mono text-xl tracking-tight text-white/80 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
