'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useReducedMotion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';

const projects = [
  {
    title: 'Medilocker',
    description: 'A secure platform to digitize, store, and seamlessly share medical records, giving individuals greater control and access to their health history.',
    tech: ['Next.js', 'React', 'FastAPI', 'MongoDB', 'Supabase', 'LLMs'],
    links: { github: 'https://github.com/ShreyasVij', live: 'https://prayas-hackathon.vercel.app/home' },
    image: '/projects/medilocker-1.png'
  },
  {
    title: 'AI Travel Planning Assistant',
    description: 'A smart, AI-powered system that generates tailored itineraries by factoring in user preferences, real-time availability, and localized insights.',
    tech: ['Python', 'FastAPI', 'LangGraph', 'OpenRouter'],
    links: { github: 'https://github.com/ShreyasVij', live: '#' },
    image: '/projects/travel-1.png'
  },
  {
    title: 'Sentiment-Driven Stock Analysis Dashboard',
    description: 'A real-time financial dashboard visualizing market sentiment by analyzing news headlines and social media streams using NLP.',
    tech: ['Python', 'FinBERT', 'PyTorch', 'Streamlit'],
    links: { github: 'https://github.com/ShreyasVij', live: 'https://sentimental-analysis-git-abg9uhcd6wfph4pbazh6wb.streamlit.app/' },
    image: '/projects/sentiment-1.png'
  },
];

const ProjectCardPreview = ({ image }: { image?: string }) => (
  <div className="w-full h-full min-h-[240px] rounded-2xl bg-white/[0.02] border border-white/[0.05] overflow-hidden flex flex-col relative">
    {/* Browser header */}
    <div className="h-8 border-b border-white/[0.05] flex items-center px-4 gap-2 shrink-0 bg-white/[0.02] z-10">
      <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
      <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
      <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
    </div>
    {/* Browser body */}
    <div className="flex-1 relative flex flex-col items-center justify-center bg-black/20">
      {image ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={image} alt="Project Preview" className="w-full h-full object-cover object-top" />
      ) : (
        <div className="w-full h-full p-6 flex flex-col gap-4">
          <div className="h-4 w-1/3 bg-white/10 rounded-md" />
          <div className="h-32 w-full bg-white/5 rounded-md border border-white/[0.02]" />
        </div>
      )}
    </div>
  </div>
);

export default function ProjectsSection() {
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
    if (typeof window === 'undefined' || isMobile || shouldReduceMotion) return;
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;
      
      const cards = container.querySelectorAll('.project-slide');
      const totalCards = cards.length;
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1, // Smooth interpolation
        }
      });
      
      for (let i = 0; i < totalCards - 1; i++) {
        // Hold current card
        tl.to(cards[i], { opacity: 1, duration: 1 });
        
        // Transition: Fade out current, scale down slightly
        tl.to(cards[i], { 
          opacity: 0,
          scale: 0.95,
          y: -20,
          visibility: 'hidden',
          pointerEvents: 'none',
          duration: 0.6 
        });
        
        // Fade in next, scale up slightly
        tl.fromTo(cards[i + 1], 
          { opacity: 0, scale: 1.05, y: 20 },
          { 
            opacity: 1, 
            scale: 1,
            y: 0,
            visibility: 'visible',
            pointerEvents: 'auto',
            duration: 0.6 
          }, 
          '<' // sync with previous animation
        );
      }
      
      // Hold last card
      tl.to(cards[totalCards - 1], { opacity: 1, duration: 1 });
    }, containerRef);
    
    return () => ctx.revert();
  }, [isMobile, shouldReduceMotion]);

  return (
    <section id="projects" className="py-24 px-6 md:px-12 lg:px-20 bg-[#030303]">
      <SectionHeading title="Selected Works" />
      
      <div ref={containerRef} className="mt-16 w-full max-w-7xl mx-auto">
        {isMobile || shouldReduceMotion ? (
          <div className="flex flex-col gap-8">
            {projects.map((project, idx) => (
              <motion.div 
                key={`mobile-project-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-6"
              >
                <div className="mb-6 h-48">
                  <ProjectCardPreview image={project.image} />
                </div>
                <div className="inline-block px-3 py-1 mb-4 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium tracking-wide">
                  Project {String(idx + 1).padStart(2, '0')}
                </div>
                <h4 className="font-sans font-bold text-2xl text-white mb-3">{project.title}</h4>
                <p className="text-white/60 mb-6 font-sans text-sm leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((tech) => (
                    <span key={tech} className="px-2 py-1 text-xs font-medium bg-white/5 border border-white/10 text-white/70 rounded-md">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  <a href={project.links.github} className="px-4 py-2 text-sm font-medium rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors">
                    Source Code
                  </a>
                  <a href={project.links.live} className="px-4 py-2 text-sm font-medium rounded-lg bg-white text-black transition-colors">
                    Live Demo
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="relative" style={{ height: `${100 + projects.length * 100}vh` }}>
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
              <div className="relative w-full max-w-5xl h-[500px]">
                {projects.map((project, idx) => (
                  <div 
                    key={`project-${idx}`} 
                    className="project-slide absolute inset-0 w-full h-full flex items-center gap-12"
                    style={{ 
                      opacity: idx === 0 ? 1 : 0, 
                      visibility: idx === 0 ? 'visible' : 'hidden', 
                      pointerEvents: idx === 0 ? 'auto' : 'none' 
                    }}
                  >
                    {/* Left: Project Info */}
                    <div className="w-1/2 flex flex-col justify-center">
                      <div className="inline-block px-3 py-1 mb-5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium tracking-wide uppercase self-start">
                        Project {String(idx + 1).padStart(2, '0')}
                      </div>
                      
                      <h4 className="font-sans font-bold text-4xl text-white mb-4 leading-tight">{project.title}</h4>
                      <p className="text-white/60 mb-8 font-sans text-lg leading-relaxed">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-10">
                        {project.tech.map((tech) => (
                          <span key={tech} className="px-3 py-1.5 text-xs font-medium bg-white/5 border border-white/10 text-white/70 rounded-md">
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex gap-4">
                        <a href={project.links.github} className="px-5 py-2.5 text-sm font-medium rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors flex items-center gap-2">
                          Source
                        </a>
                        <a href={project.links.live} className="px-5 py-2.5 text-sm font-medium rounded-full bg-white text-black transition-colors flex items-center gap-2 hover:scale-105">
                          Live Demo
                        </a>
                      </div>
                    </div>

                    {/* Right: Project Visual */}
                    <div className="w-1/2 h-full flex items-center justify-center">
                      <ProjectCardPreview image={project.image} />
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
