import React from 'react';
import { motion } from 'motion/react';
import { PROJECTS } from '../data/portfolioData';
import { ExternalLink, CheckCircle2 } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="min-h-screen py-28 px-6 sm:px-12 md:px-20 lg:px-24 w-full flex flex-col justify-center border-t border-[#d8d8dc]">
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
            Featured <br />
            Projects
          </motion.h2>
        </div>

        {/* Project Showcase Cards */}
        <div className="space-y-12 w-full">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              className="p-8 sm:p-12 rounded-3xl bg-white border border-[#d8d8dc] hover:border-[#0a0a0a] transition-all hover:shadow-lg space-y-8 w-full group"
            >
              {/* Project Meta Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#ececef] pb-6">
                <span className="text-xs font-mono uppercase tracking-widest text-[#666666]">
                  {project.subtitle}
                </span>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a0a0a] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#262626] transition-colors"
                  >
                    <span>Visit Live Site</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              {/* Title & Description */}
              <div className="space-y-3">
                <h3 className="font-heading font-black text-2xl sm:text-4xl text-[#0a0a0a]">
                  {project.title}
                </h3>
                <p className="max-w-3xl text-base sm:text-lg text-[#444444] font-light leading-relaxed font-sans">
                  {project.description}
                </p>
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                {project.highlights.map((h, hIdx) => (
                  <div
                    key={hIdx}
                    className="p-4 rounded-xl bg-[#fafafa] border border-[#ececef] space-y-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <p className="text-xs sm:text-sm text-[#333333] leading-relaxed font-sans">
                      {h}
                    </p>
                  </div>
                ))}
              </div>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-[#ececef]">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-md bg-[#f0f0f4] text-[#111111] text-xs font-mono font-medium border border-[#dcdce2]"
                  >
                    {tag}
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
