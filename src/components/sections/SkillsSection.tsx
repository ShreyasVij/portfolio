'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const skillCategories = [
  { 
    id: 'languages',
    title: 'LANGUAGES', 
    skills: ['Python', 'C++', 'JavaScript', 'TypeScript', 'SQL'],
  },
  { 
    id: 'frameworks',
    title: 'FRAMEWORKS & RUNTIMES', 
    skills: ['React', 'Next.js', 'Node.js', 'Express', 'FastAPI', 'LangGraph'],
  },
  { 
    id: 'databases',
    title: 'DATABASES', 
    skills: ['MongoDB', 'PostgreSQL', 'Supabase'],
  },
  { 
    id: 'tools',
    title: 'TOOLS', 
    skills: ['Git', 'GitHub', 'Postman', 'Grafana', 'VS Code'],
  },
  { 
    id: 'core',
    title: 'CORE EXPERTISE', 
    skills: ['Data Structures & Algorithms', 'REST APIs', 'Full Stack Development'],
  }
];

const currentStack = {
  frontend: ['Next.js', 'React', 'TypeScript'],
  backend: ['Node.js', 'FastAPI', 'Express'],
  data: ['PostgreSQL', 'MongoDB', 'Supabase'],
  ai: ['LangGraph', 'AI APIs']
};

export default function SkillsSection() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <section id="skills" className="py-32 px-6 md:px-12 lg:px-20 bg-[#030303] text-white overflow-hidden relative">
      {/* Very subtle ambient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 relative z-10">
        
        {/* LEFT COLUMN: Typography & Stack Panel */}
        <div className="lg:col-span-5 flex flex-col h-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6 font-sans">
              Skills &<br />Expertise.
            </h2>
            <p className="text-white/60 text-lg md:text-xl font-body leading-relaxed max-w-md mb-10">
              Technologies I use to build scalable, intelligent and production-ready systems.
            </p>
            
            <div className="flex flex-col gap-3 font-mono text-xs uppercase tracking-widest text-white/40 mb-16">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
                <span>20+ Technologies</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
                <span>Full Stack</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
                <span>AI / Backend / Systems</span>
              </div>
            </div>
          </motion.div>

          {/* Interactive Stack Panel */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-auto border border-white/[0.08] bg-white/[0.01] rounded-2xl p-8 backdrop-blur-sm hidden lg:block"
          >
            <h3 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-sm bg-blue-500/50" />
              Current Stack
            </h3>
            
            <div className="space-y-6">
              {Object.entries(currentStack).map(([layer, techs], idx) => {
                const isActive = hoveredCategory === null || 
                  (hoveredCategory === 'languages' && layer === 'frontend') ||
                  (hoveredCategory === 'frameworks' && (layer === 'frontend' || layer === 'backend' || layer === 'ai')) ||
                  (hoveredCategory === 'databases' && layer === 'data') ||
                  (hoveredCategory === 'tools') ||
                  (hoveredCategory === 'core');

                return (
                  <div 
                    key={layer}
                    className={cn(
                      "transition-all duration-500",
                      isActive ? "opacity-100" : "opacity-20"
                    )}
                  >
                    <div className="text-white/80 font-semibold capitalize mb-1 text-sm">{layer}</div>
                    <div className="text-white/40 font-mono text-xs">
                      {techs.join(' · ')}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Interactive Skills System */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
              className={cn(
                "group relative border border-white/[0.05] bg-white/[0.01] rounded-xl p-6 transition-all duration-500",
                "hover:border-white/[0.15] hover:bg-white/[0.03]"
              )}
            >
              {/* Subtle tech grid background on hover */}
              <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-xl pointer-events-none" />
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-start gap-6">
                <div className="md:w-1/3 shrink-0">
                  <h4 className="font-mono text-xs uppercase tracking-widest text-white/50 group-hover:text-white/90 transition-colors duration-300">
                    {category.title}
                  </h4>
                </div>
                
                <div className="flex flex-wrap gap-x-6 gap-y-3 md:w-2/3">
                  {category.skills.map((skill) => (
                    <div 
                      key={skill}
                      className="flex items-center gap-2 text-white/60 group-hover:text-white transition-colors duration-300"
                    >
                      <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-blue-500/50 transition-colors duration-300" />
                      <span className="font-medium text-sm tracking-wide">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Mobile Stack Panel (Visible only on mobile/tablet) */}
          <div className="mt-8 border border-white/[0.08] bg-white/[0.01] rounded-2xl p-6 lg:hidden">
            <h3 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-sm bg-blue-500/50" />
              Current Stack
            </h3>
            <div className="grid grid-cols-2 gap-6">
              {Object.entries(currentStack).map(([layer, techs]) => (
                <div key={layer}>
                  <div className="text-white/80 font-semibold capitalize mb-1 text-sm">{layer}</div>
                  <div className="text-white/40 font-mono text-xs leading-relaxed">
                    {techs.join(' · ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
