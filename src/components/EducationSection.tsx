import React from 'react';
import { motion } from 'motion/react';
import { EDUCATION, INTERESTS } from '../data/portfolioData';
import { GraduationCap, Palette, Video, BrainCircuit, Server, Cloud, Compass } from 'lucide-react';

const interestIcons: Record<string, React.ElementType> = {
  'Ball Pen Art': Palette,
  'Video Editing': Video,
  'AI-Assisted Development': BrainCircuit,
  'Backend Architecture': Server,
  'Cloud & Application Deployment': Cloud,
  'Exploring New Technologies': Compass,
};

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="min-h-[85vh] py-28 px-6 sm:px-12 md:px-20 lg:px-24 w-full flex flex-col justify-center border-t border-[#d8d8dc]">
      <div className="space-y-16 w-full">
        {/* Big Title */}
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: '100%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading font-black text-5xl sm:text-7xl md:text-8xl tracking-tight text-[#0a0a0a] uppercase leading-none"
          >
            Education & <br />
            Interests
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
          {/* Degree Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 p-8 sm:p-10 rounded-3xl bg-white border border-[#d8d8dc] hover:border-[#0a0a0a] transition-all hover:shadow-md space-y-6"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#f0f0f4] flex items-center justify-center text-[#0a0a0a]">
              <GraduationCap className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h3 className="font-heading font-black text-xl sm:text-2xl text-[#0a0a0a]">
                {EDUCATION.degree}
              </h3>
              <p className="text-base text-[#444444] font-medium font-sans">
                {EDUCATION.institution}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#ececef] text-xs font-mono">
              <span className="text-[#666666]">Period: {EDUCATION.period}</span>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                CGPA: {EDUCATION.cgpa}
              </span>
            </div>
          </motion.div>

          {/* Interests Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6 p-8 sm:p-10 rounded-3xl bg-white border border-[#d8d8dc] space-y-6"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-[#777777] block">
              Creative & Tech Pursuits:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {INTERESTS.map((interest) => {
                const Icon = interestIcons[interest] || Compass;
                return (
                  <div
                    key={interest}
                    className="p-4 rounded-xl bg-[#fafafa] border border-[#e8e8ee] hover:border-[#0a0a0a] transition-all flex items-center gap-3 group"
                  >
                    <Icon className="w-4 h-4 text-[#0a0a0a] group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-mono text-[#222222] font-medium">
                      {interest}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
