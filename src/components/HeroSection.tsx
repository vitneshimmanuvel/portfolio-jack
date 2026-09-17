import React from 'react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Mail, Phone, ArrowDown } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-12 px-6 sm:px-10 md:px-14 lg:px-20 pr-16 sm:pr-20 md:pr-24 lg:pr-28 overflow-hidden select-none">
      <div className="w-full my-auto py-8">
        {/* Responsive Headline Sized Perfectly for Full Visibility */}
        <div className="space-y-1 w-full">
          <div className="overflow-hidden w-full">
            <motion.h1
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-black text-[9.5vw] sm:text-[8.8vw] md:text-[8.2vw] lg:text-[7.6vw] xl:text-[7.2vw] tracking-tighter uppercase text-[#0a0a0a] leading-[0.88] break-normal"
            >
              Vitnesh
            </motion.h1>
          </div>

          <div className="overflow-hidden w-full">
            <motion.h1
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              className="font-heading font-black text-[9.5vw] sm:text-[8.8vw] md:text-[8.2vw] lg:text-[7.6vw] xl:text-[7.2vw] tracking-tighter uppercase text-[#141414] leading-[0.88] break-normal"
            >
              Immanuvel
            </motion.h1>
          </div>
        </div>

        {/* Clean Sub-statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.2 }}
          className="pt-10 max-w-3xl space-y-6"
        >
          <p className="text-xl sm:text-2xl md:text-3xl text-[#333333] font-light leading-relaxed font-sans">
            Building scalable, high-performance web & mobile applications, robust RESTful APIs, and automated production CI/CD pipelines.
          </p>

          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-mono pt-2">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0a0a0a] text-white hover:bg-[#262626] transition-all shadow-sm"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{PERSONAL_INFO.email}</span>
            </a>

            <a
              href={`tel:${PERSONAL_INFO.phone}`}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-[#d0d0d5] text-[#111111] hover:border-[#0a0a0a] transition-all shadow-xs"
            >
              <Phone className="w-3.5 h-3.5 text-[#555555]" />
              <span>+91 {PERSONAL_INFO.phone}</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom Scroll Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-full flex items-center justify-between border-t border-[#d8d8dc] pt-6 text-xs font-mono uppercase tracking-widest text-[#777777]"
      >
        <span>Full Stack Developer</span>
        <a href="#about" className="flex items-center gap-2 hover:text-[#0a0a0a] transition-colors group">
          <span>Scroll down</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
        </a>
      </motion.div>
    </section>
  );
};
