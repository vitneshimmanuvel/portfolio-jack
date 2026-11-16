import React from 'react';
import { motion } from 'motion/react';
import {
  DEVELOPMENT_APPROACH,
  PERSONAL_INFO,
  STATS,
  WHAT_I_BUILD,
} from '../data/portfolioData';
import { ScrollRevealText } from './ScrollRevealText';
import {
  ArrowUpRight,
  BrainCircuit,
  CheckCircle2,
  Layout,
  MapPin,
  Server,
} from 'lucide-react';

const capabilityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Layout,
  Server,
  BrainCircuit,
};

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="min-h-screen py-28 px-6 sm:px-12 md:px-20 lg:px-24 w-full flex flex-col justify-center border-t border-[#d8d8dc]"
    >
      <div className="space-y-16 w-full">
        {/* HR-First Identity & Tagline Banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65 }}
          className="space-y-5 max-w-5xl"
        >
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono uppercase tracking-widest">
            <span className="px-3.5 py-1.5 rounded-full bg-[#0a0a0a] text-white">
              {PERSONAL_INFO.role}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#d8d8dc] text-[#444444]">
              <MapPin className="w-3.5 h-3.5 text-[#e11d48]" />
              {PERSONAL_INFO.location}
            </span>
          </div>

          <h2 className="font-heading font-black text-2xl sm:text-4xl text-[#0a0a0a] tracking-tight">
            {PERSONAL_INFO.tagline}
          </h2>
        </motion.div>

        {/* Large Typography Scroll-Reveal Summary */}
        <div className="max-w-5xl space-y-6">
          <ScrollRevealText
            as="p"
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-medium tracking-tight text-[#0a0a0a] leading-[1.18]"
          >
            {PERSONAL_INFO.summary}
          </ScrollRevealText>
          <p className="text-base sm:text-lg text-[#444444] font-light leading-relaxed max-w-4xl">
            {PERSONAL_INFO.summaryDetail}
          </p>
        </div>

        {/* Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-[#d8d8dc] w-full">
          {STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="space-y-1"
            >
              <span className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl text-[#0a0a0a]">
                {stat.value}
              </span>
              <p className="text-xs font-mono uppercase tracking-widest text-[#666666]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* What I Can Build */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-[#666666]">
              What I Can Build
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {WHAT_I_BUILD.map((cap, idx) => {
              const Icon = capabilityIcons[cap.iconName] || Layout;
              return (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="p-8 rounded-3xl bg-white border border-[#d8d8dc] hover:border-[#0a0a0a] transition-all hover:shadow-sm space-y-5 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#f0f0f4] flex items-center justify-center text-[#0a0a0a] group-hover:bg-[#0a0a0a] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#888888] group-hover:text-[#0a0a0a] transition-colors" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#0a0a0a]">
                    {cap.title}
                  </h3>
                  <ul className="space-y-2.5">
                    {cap.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-[#444444] font-sans"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 7-Step Development Approach */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#d8d8dc] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#ececef] pb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#666666]">
              My Development Approach
            </span>
            <span className="text-xs font-mono text-[#444444]">
              Problem-First Engineering Lifecycle
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
            {DEVELOPMENT_APPROACH.map((item) => (
              <div
                key={item.step}
                className="p-4 rounded-2xl bg-[#fafafa] border border-[#ececef] space-y-2"
              >
                <span className="text-[11px] font-mono font-bold text-[#e11d48]">
                  {item.step}
                </span>
                <h4 className="font-heading font-bold text-sm text-[#0a0a0a] leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-[#555555] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
