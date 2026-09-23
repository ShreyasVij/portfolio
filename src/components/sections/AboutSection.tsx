'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeading from '@/components/ui/SectionHeading';
import Image from 'next/image';

export default function AboutSection() {
  return (
    <section id="about" className="py-32 px-8 md:px-16 lg:px-24">
      <SectionHeading title="About Me" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16 max-w-7xl mx-auto">
        {/* Photo Column */}
        <ScrollReveal direction="right" className="lg:col-span-5 relative">
          <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-white/[0.02] border border-white/[0.05]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/profile.jpg" 
              alt="Shreyas Vij" 
              className="object-cover w-full h-full"
            />
            {/* Subtle overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
          </div>
        </ScrollReveal>

        {/* Text & Education Column */}
        <div className="lg:col-span-7 flex flex-col gap-10">
          <ScrollReveal direction="up" className="space-y-6">
            <p className="text-foreground/70 text-lg leading-relaxed font-body">
              I am Shreyas Vij, a passionate technology enthusiast and engineering student. From an early age, I've been fascinated by how software can solve complex problems and improve lives. This curiosity led me to pursue programming, where I discovered my love for building scalable applications and intuitive user experiences.
            </p>
            <p className="text-foreground/70 text-lg leading-relaxed font-body">
              My journey in tech is driven by a constant desire to learn and adapt. Whether it's developing full-stack web applications, exploring the intricacies of artificial intelligence, or optimizing backend systems, I approach every project with dedication and an analytical mindset. I believe in writing clean, maintainable code and building products that make a meaningful impact.
            </p>
            <p className="text-foreground/70 text-lg leading-relaxed font-body">
              When I'm not coding, you can find me participating in hackathons, collaborating with peers in the Robotics Society, or exploring the latest trends in software engineering. I am always eager to take on new challenges and contribute to innovative solutions in the tech industry.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <div className="bg-card-bg border border-card-border rounded-2xl p-8 flex flex-col justify-center">
              <h3 className="font-heading font-bold text-2xl mb-6 text-foreground">Education</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-foreground font-body">B.Tech in Electronics and Communication</h4>
                  <p className="text-accent-light text-sm font-medium mt-1">Minor in Data Science</p>
                  <p className="text-foreground/70 text-sm mt-2 font-body">Punjab Engineering College (PEC)</p>
                  <p className="text-muted text-sm mt-1">2024 - 2028</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
