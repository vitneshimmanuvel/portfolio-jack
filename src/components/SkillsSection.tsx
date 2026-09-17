import React from 'react';
import { motion } from 'motion/react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Code, Layout, Server, Database, GitBranch, ShieldCheck, Cloud } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Code,
  Layout,
  Server,
  Database,
  GitBranch,
  ShieldCheck,
  Cloud,
};

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="min-h-screen py-28 px-6 sm:px-12 md:px-20 lg:px-24 w-full flex flex-col justify-center border-t border-[#d8d8dc]">
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
            Technical <br />
            Stack
          </motion.h2>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const Icon = iconMap[cat.iconName] || Code;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: idx * 0.06 }}
                className="p-8 rounded-3xl bg-white border border-[#d8d8dc] hover:border-[#0a0a0a] transition-all hover:shadow-md space-y-6 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-[#f0f0f4] flex items-center justify-center text-[#0a0a0a] group-hover:bg-[#0a0a0a] group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-heading font-bold text-xl text-[#0a0a0a]">
                    {cat.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-[#ececef]">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-lg bg-[#f6f6f8] text-[#111111] text-xs font-mono border border-[#e4e4e8] hover:border-[#0a0a0a] transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
