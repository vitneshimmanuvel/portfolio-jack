import React from 'react';
import { motion } from 'motion/react';
import { EXPERIENCES } from '../data/portfolioData';
import { MapPin, Calendar, CheckCircle2 } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="min-h-screen py-28 px-6 sm:px-12 md:px-20 lg:px-24 w-full flex flex-col justify-center border-t border-[#d8d8dc]">
      <div className="space-y-16 w-full">
        {/* Big Title with Bidirectional Reveal */}
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: '100%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading font-black text-5xl sm:text-7xl md:text-8xl tracking-tight text-[#0a0a0a] uppercase leading-none"
          >
            Work <br />
            Experience
          </motion.h2>
        </div>

        {/* Experience Cards */}
        <div className="space-y-10 w-full">
          {EXPERIENCES.map((exp, idx) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              className="p-8 sm:p-12 rounded-3xl bg-white border border-[#d8d8dc] hover:border-[#0a0a0a] transition-all hover:shadow-md space-y-8 w-full"
            >
              {/* Card Header */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#ececef] pb-8">
                <div className="space-y-1.5">
                  <h3 className="font-heading font-black text-2xl sm:text-4xl text-[#0a0a0a]">
                    {exp.role}
                  </h3>
                  <p className="text-base sm:text-lg font-medium text-[#444444]">
                    {exp.company}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#555555]">
                  <div className="flex items-center gap-2 bg-[#f4f4f6] px-4 py-2 rounded-full border border-[#e2e2e6]">
                    <Calendar className="w-3.5 h-3.5 text-[#0a0a0a]" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#f4f4f6] px-4 py-2 rounded-full border border-[#e2e2e6]">
                    <MapPin className="w-3.5 h-3.5 text-[#0a0a0a]" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {exp.highlights.map((bullet, bIdx) => (
                  <div
                    key={bIdx}
                    className="p-4 rounded-xl bg-[#fafafa] border border-[#ebebee] flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-[#333333] leading-relaxed font-sans">
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#ececef]">
                {exp.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-md bg-[#f0f0f4] text-[#111111] text-xs font-mono font-medium border border-[#dcdce2]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
