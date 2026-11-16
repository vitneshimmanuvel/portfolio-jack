import React from 'react';
import { motion } from 'motion/react';
import { PROJECTS } from '../data/portfolioData';
import { ExternalLink, CheckCircle2 } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  return (
    <section
      id="projects"
      className="min-h-screen py-28 px-6 sm:px-12 md:px-20 lg:px-24 w-full flex flex-col justify-center border-t border-[#d8d8dc]"
    >
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

        {/* Project Showcase Grid (Flagship full-width + balanced 2-column rows) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          {PROJECTS.map((project, idx) => {
            const isFlagship = idx === 0;
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.65, delay: (idx % 2) * 0.08 }}
                className={`${
                  isFlagship ? 'lg:col-span-2' : ''
                } p-8 sm:p-10 rounded-3xl bg-white border border-[#d8d8dc] hover:border-[#0a0a0a] transition-all hover:shadow-lg flex flex-col justify-between gap-7 group`}
              >
                <div className="space-y-6">
                  {/* Project Meta Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#ececef] pb-5">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#666666]">
                      0{idx + 1} • {project.domain}
                    </span>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a0a0a] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#e11d48] transition-colors self-start sm:self-auto"
                      >
                        <span>Visit Live Site</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-3">
                    <h3 className="font-heading font-black text-2xl sm:text-3xl text-[#0a0a0a]">
                      {project.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#444444] font-light leading-relaxed font-sans">
                      {project.description}
                    </p>
                  </div>

                  {/* Key Development Areas */}
                  <div
                    className={`grid grid-cols-1 ${
                      isFlagship ? 'md:grid-cols-3' : 'gap-3'
                    } gap-3.5`}
                  >
                    {project.highlights.map((h, hIdx) => (
                      <div
                        key={hIdx}
                        className="p-3.5 rounded-xl bg-[#fafafa] border border-[#ececef] flex items-start gap-2.5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <p className="text-xs sm:text-sm text-[#333333] leading-relaxed font-sans">
                          {h}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contribution + Tech Stack */}
                <div className="space-y-4 pt-2 border-t border-[#ececef]">
                  <p className="text-xs font-mono text-[#555555]">
                    <span className="font-semibold text-[#0a0a0a] uppercase tracking-wider">
                      Contribution:{' '}
                    </span>
                    {project.contribution}
                  </p>

                  <div className="flex flex-wrap items-center gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-md bg-[#f0f0f4] text-[#111111] text-xs font-mono font-medium border border-[#dcdce2]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
