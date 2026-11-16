import React from 'react';
import { motion } from 'motion/react';
import { EDUCATION, PERSONAL_INFO, WHY_WORK_WITH_ME } from '../data/portfolioData';
import { GraduationCap, CheckCircle2, ArrowUpRight, Target } from 'lucide-react';
import { GithubIcon } from './Icons';

export const EducationSection: React.FC = () => {
  return (
    <section
      id="education"
      className="min-h-[85vh] py-28 px-6 sm:px-12 md:px-20 lg:px-24 w-full flex flex-col justify-center border-t border-[#d8d8dc]"
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
            Education & <br />
            Engineering Fit
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full">
          {/* Left Column: Education + GitHub Open-Source Card */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="p-8 sm:p-10 rounded-3xl bg-white border border-[#d8d8dc] hover:border-[#0a0a0a] transition-all hover:shadow-md space-y-6 flex-1 flex flex-col justify-between"
            >
              <div className="space-y-6">
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
                  <p className="text-xs font-mono text-[#666666]">
                    {EDUCATION.affiliation}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#ececef] text-xs font-mono">
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                  Graduated: {EDUCATION.graduated}
                </span>
              </div>
            </motion.div>

            {/* GitHub & Open-Source Work */}
            <motion.a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="p-8 rounded-3xl bg-[#0a0a0a] text-white hover:bg-[#16161a] transition-all hover:shadow-lg space-y-4 group block"
            >
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/70">
                  <GithubIcon className="w-4 h-4 text-white" />
                  <span>GitHub & Open-Source Work</span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <p className="text-sm text-white/80 font-light leading-relaxed">
                Explore personal development projects, full-stack experiments, and production code repositories on GitHub.
              </p>
              <span className="inline-block text-xs font-mono text-[#ff4d6d]">
                github.com/vitneshimmanuvel
              </span>
            </motion.a>
          </div>

          {/* Right Column: Career Objective + Why Work With Me */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-white border border-[#d8d8dc] space-y-8 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#777777]">
                <Target className="w-4 h-4 text-[#e11d48]" />
                <span>Career Objective</span>
              </div>
              <p className="text-base sm:text-lg text-[#222222] font-light leading-relaxed font-sans">
                {EDUCATION.objective}
              </p>
            </div>

            <div className="space-y-4 pt-6 border-t border-[#ececef]">
              <span className="text-xs font-mono uppercase tracking-widest text-[#777777] block">
                Why Work With Me
              </span>

              <div className="grid grid-cols-1 gap-3">
                {WHY_WORK_WITH_ME.map((reason) => (
                  <div
                    key={reason}
                    className="p-4 rounded-xl bg-[#fafafa] border border-[#e8e8ee] hover:border-[#0a0a0a] transition-all flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-sans text-[#222222]">
                      {reason}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
