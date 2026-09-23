'use client';

import { motion } from 'framer-motion';
import AnimatedText from '@/components/ui/AnimatedText';
import MagneticButton from '@/components/ui/MagneticButton';
import { useState } from 'react';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('shrvij28@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-32 px-8 md:px-16 lg:px-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex flex-col items-center"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/profile.jpg" 
            alt="Shreyas" 
            className="w-24 h-24 rounded-full object-cover mb-8 border border-white/10 shadow-xl"
          />
          <AnimatedText 
            text="Let's build something together." 
            className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground mb-6"
          />
          <p className="text-foreground/70 text-lg md:text-xl font-body max-w-2xl mx-auto">
            I'm always open to new opportunities and interesting projects.
            Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-center gap-6 mb-16"
        >
          <a href="mailto:shrvij28@gmail.com" className="inline-block">
            <MagneticButton className="bg-accent text-white px-10 py-4 rounded-full text-lg font-medium shadow-lg shadow-accent/20 w-full sm:w-auto">
              Say Hello
            </MagneticButton>
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {/* Email */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card-bg border border-card-border rounded-2xl p-6 hover:border-card-border-hover transition-colors group cursor-pointer"
            onClick={copyEmail}
          >
            <div className="h-10 w-10 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 4 10 8 10-8"/></svg>
            </div>
            <h4 className="font-heading font-semibold text-foreground mb-1">Email</h4>
            <p className="text-muted text-sm font-body truncate">shrvij28@gmail.com</p>
            <div className="mt-4 text-xs font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity">
              {copied ? 'Copied!' : 'Click to copy'}
            </div>
          </motion.div>

          {/* GitHub */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-card-bg border border-card-border rounded-2xl p-6 hover:border-card-border-hover transition-colors"
          >
            <a href="https://github.com/ShreyasVij" target="_blank" rel="noopener noreferrer" className="block h-full">
              <div className="h-10 w-10 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </div>
              <h4 className="font-heading font-semibold text-foreground mb-1">GitHub</h4>
              <p className="text-muted text-sm font-body">@ShreyasVij</p>
            </a>
          </motion.div>

          {/* LinkedIn */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-card-bg border border-card-border rounded-2xl p-6 hover:border-card-border-hover transition-colors"
          >
            <a href="https://www.linkedin.com/in/shreyas-vij-07b541328/" target="_blank" rel="noopener noreferrer" className="block h-full">
              <div className="h-10 w-10 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </div>
              <h4 className="font-heading font-semibold text-foreground mb-1">LinkedIn</h4>
              <p className="text-muted text-sm font-body">Connect</p>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
