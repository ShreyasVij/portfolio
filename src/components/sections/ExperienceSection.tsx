'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useReducedMotion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';

const experiences = [
  {
    role: 'Software Development Engineer Intern',
    company: 'AgNext Technologies',
    period: 'May 2026 - July 2026',
    description: [
      'Developed backend features for Inspeqt, an enterprise audit management platform, improving audit workflow automation and production readiness.',
      'Designed and optimized PostgreSQL queries across 10+ relational tables, improving backend data retrieval efficiency and supporting inspection workflows.',
      'Built Grafana dashboards visualizing operational KPIs, inspection metrics, and audit analytics for business reporting and monitoring.',
      'Developed RESTful APIs, resolved production issues, collaborated with cross-functional teams, and contributed to multiple feature releases following Agile practices.'
    ]
  }
];

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // If only 1 experience, pinning might feel short, but we maintain the architecture
    if (typeof window === 'undefined' || isMobile || shouldReduceMotion) return;
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;
      
      const cards = container.querySelectorAll('.experience-slide');
      const totalCards = cards.length;
      
      // If there are multiple experiences, create a scrubbed timeline
      if (totalCards > 0) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
          }
        });
        
        for (let i = 0; i < totalCards - 1; i++) {
          tl.to(cards[i], { opacity: 1, duration: 1 });
          
          tl.to(cards[i], { 
            opacity: 0,
            y: -30,
            visibility: 'hidden',
            pointerEvents: 'none',
            duration: 0.5 
          });
          
          tl.fromTo(cards[i + 1], 
            { opacity: 0, y: 30 },
            { 
              opacity: 1, 
              y: 0,
              visibility: 'visible',
              pointerEvents: 'auto',
              duration: 0.5 
            }, 
            '<'
          );
        }
        
        tl.to(cards[totalCards - 1], { opacity: 1, duration: 1 });
      }
    }, containerRef);
    
    return () => ctx.revert();
  }, [isMobile, shouldReduceMotion]);

  return (
    <section id="experience" className="py-24 px-6 md:px-12 lg:px-20 bg-[#030303]">
      <SectionHeading title="Experience" />
      
      <div ref={containerRef} className="mt-16 w-full max-w-7xl mx-auto">
        {isMobile || shouldReduceMotion ? (
          <div className="flex flex-col gap-12">
            {experiences.map((exp, idx) => (
              <motion.div 
                key={`mobile-exp-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative border-l border-white/20 pl-8 ml-4"
              >
                <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                
                <h4 className="text-2xl font-bold text-white">{exp.role}</h4>
                <p className="text-blue-400 font-medium mt-1 mb-2">{exp.company}</p>
                <p className="text-sm font-mono text-white/40 mb-6">{exp.period}</p>
                
                <ul className="space-y-4 text-white/70 font-sans">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-3 text-blue-500 mt-1.5 text-xs">■</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="relative" style={{ height: `${100 + Math.max(experiences.length - 1, 0) * 100}vh` }}>
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
              <div className="relative w-full max-w-3xl h-[400px]">
                {experiences.map((exp, idx) => (
                  <div 
                    key={`exp-${idx}`} 
                    className="experience-slide absolute inset-0 w-full h-full flex flex-col justify-center"
                    style={{ 
                      opacity: idx === 0 ? 1 : 0, 
                      visibility: idx === 0 ? 'visible' : 'hidden', 
                      pointerEvents: idx === 0 ? 'auto' : 'none' 
                    }}
                  >
                    <div className="relative pl-12 border-l border-white/10 py-4">
                      {/* Timeline dot */}
                      <div className="absolute -left-[5px] top-7 h-2.5 w-2.5 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
                      
                      <div className="inline-block px-3 py-1 mb-4 rounded-full bg-white/5 border border-white/10 text-white/60 font-mono text-xs tracking-wide">
                        {exp.period}
                      </div>
                      
                      <h4 className="font-sans font-bold text-4xl text-white mb-2">{exp.role}</h4>
                      <p className="text-blue-400 font-medium text-xl mb-8">{exp.company}</p>
                      
                      <ul className="space-y-5 text-white/70 font-sans text-lg">
                        {exp.description.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <span className="mr-4 text-blue-500 mt-2 text-xs">■</span>
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
