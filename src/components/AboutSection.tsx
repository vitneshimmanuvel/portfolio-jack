import React from 'react';
import { motion } from 'motion/react';
import { PERSONAL_INFO, STATS } from '../data/portfolioData';
import { ScrollRevealText } from './ScrollRevealText';
import { Terminal, Shield, Zap, ArrowUpRight } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const highlights = [
    {
      icon: Terminal,
      title: 'Full Stack & Mobile Architecture',
      desc: 'Developing enterprise React frontends, Flutter mobile apps, Node/Express backends, and PostgreSQL databases.',
    },
    {
      icon: Shield,
      title: 'Security & Role-Based Control',
      desc: 'Architecting secure stateless JWT authentication, password encryption (bcrypt), and granular multi-role access.',
    },
    {
      icon: Zap,
      title: 'Automated CI/CD Workflows',
      desc: 'Orchestrating GitHub Actions pipelines for automated testing, linting, and continuous delivery to Vercel & Render.',
    },
  ];

  return (
    <section id="about" className="min-h-screen py-28 px-6 sm:px-12 md:px-20 lg:px-24 w-full flex flex-col justify-center border-t border-[#d8d8dc]">
      <div className="space-y-16 w-full">
        {/* Large Typography Scroll-Reveal Statement */}
        <div className="max-w-5xl">
          <ScrollRevealText
            as="p"
            className="text-3xl sm:text-5xl md:text-6xl font-heading font-medium tracking-tight text-[#0a0a0a] leading-[1.16]"
          >
            {PERSONAL_INFO.summary}
          </ScrollRevealText>
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
              <span className="font-heading font-black text-3xl sm:text-5xl text-[#0a0a0a]">
                {stat.value}
              </span>
              <p className="text-xs font-mono uppercase tracking-widest text-[#666666]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 w-full">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-white border border-[#d8d8dc] hover:border-[#0a0a0a] transition-all hover:shadow-sm space-y-4 group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#f0f0f4] flex items-center justify-center text-[#0a0a0a] group-hover:bg-[#0a0a0a] group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#888888] group-hover:text-[#0a0a0a] transition-colors" />
                </div>
                <h3 className="font-heading font-bold text-lg text-[#0a0a0a]">
                  {item.title}
                </h3>
                <p className="text-sm text-[#555555] leading-relaxed font-sans font-light">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
