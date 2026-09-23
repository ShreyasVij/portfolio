'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';

const achievements = [
  { icon: '🏆', title: 'PECathon 2025', desc: 'Special Mention — AI Travel Planning Assistant' },
  { icon: '🏆', title: 'Ideathon 2025', desc: 'Special Mention — Medilocker' },
  { icon: '🎯', title: 'Robotics Society', desc: 'Led inductions for 300+ students, organized RoboRace at PECFest 2025' },
  { icon: '✈️', title: 'IIT Roorkee', desc: 'Represented PEC at RC Plane Competition' },
  { icon: '💼', title: 'Leadership', desc: 'Subhead — Recruitment, RoboRace, Management, Robotics Society Website' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 24 }
  }
};

export default function AchievementsSection() {
  return (
    <section id="achievements" className="py-32 px-8 md:px-16 lg:px-24">
      <SectionHeading title="Achievements & Leadership" />
      
      <div className="max-w-5xl mx-auto mt-16">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {achievements.map((item, idx) => (
            <motion.div 
              key={idx} 
              variants={cardVariants}
              className={`bg-card-bg border border-card-border rounded-2xl p-6 hover:border-card-border-hover transition-all duration-300 hover:-translate-y-[2px] flex items-start gap-4 ${
                idx === 4 ? 'md:col-span-2 md:w-1/2 md:mx-auto' : ''
              }`}
            >
              <div className="text-3xl mt-1 select-none">{item.icon}</div>
              <div>
                <h4 className="font-heading font-bold text-lg text-foreground mb-2">{item.title}</h4>
                <p className="text-muted text-sm font-body leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
