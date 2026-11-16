import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AVAILABILITY_MODES, PERSONAL_INFO } from '../data/portfolioData';
import { Copy, Check, ArrowUpRight, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <section
      id="contact"
      className="min-h-screen py-28 px-6 sm:px-12 md:px-20 lg:px-24 w-full flex flex-col justify-between border-t border-[#d8d8dc]"
    >
      <div className="space-y-14 my-auto w-full">
        {/* Big Contact Title */}
        <div className="space-y-5 w-full">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-black text-5xl sm:text-7xl md:text-8xl lg:text-[6.5vw] xl:text-[6vw] tracking-tight uppercase text-[#0a0a0a] leading-none"
            >
              Let&apos;s Work <br />
              Together
            </motion.h2>
          </div>

          <p className="max-w-2xl text-base sm:text-lg text-[#444444] font-light leading-relaxed font-sans pt-1">
            <span className="font-semibold text-[#0a0a0a]">
              Have an idea? Let&apos;s turn it into reality.
            </span>{' '}
            Open to collaborating with hiring teams, startups, and founders on websites, mobile apps, backend APIs, business automation, and AI-powered solutions.
          </p>

          {/* Availability Modes */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            {AVAILABILITY_MODES.map((item) => (
              <span
                key={item}
                className="px-3.5 py-1.5 rounded-full bg-white border border-[#d8d8dc] text-xs font-mono text-[#222222]"
              >
                {item}
              </span>
            ))}
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#f4f4f6] border border-[#e2e2e6] text-xs font-mono text-[#555555]">
              <MapPin className="w-3.5 h-3.5 text-[#e11d48]" />
              {PERSONAL_INFO.location}
            </span>
          </div>
        </div>

        {/* Big Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Email Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="p-8 sm:p-10 rounded-3xl bg-white border border-[#d8d8dc] hover:border-[#0a0a0a] transition-all hover:shadow-lg space-y-6 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-[#777777]">
                Direct Email
              </span>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 text-xs font-mono text-[#555555] hover:text-[#0a0a0a] transition-colors cursor-pointer bg-[#f4f4f6] px-3.5 py-1.5 rounded-full border border-[#e2e2e6]"
              >
                {copiedEmail ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-[#0a0a0a] hover:text-[#333333] flex items-center gap-2 group-hover:translate-x-1 transition-transform"
            >
              <span className="break-all">{PERSONAL_INFO.email}</span>
              <ArrowUpRight className="w-6 h-6 shrink-0 text-[#888888] group-hover:text-[#0a0a0a]" />
            </a>
          </motion.div>

          {/* Phone Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-8 sm:p-10 rounded-3xl bg-white border border-[#d8d8dc] hover:border-[#0a0a0a] transition-all hover:shadow-lg space-y-6 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-[#777777]">
                Phone / WhatsApp
              </span>
              <button
                type="button"
                onClick={handleCopyPhone}
                className="flex items-center gap-1.5 text-xs font-mono text-[#555555] hover:text-[#0a0a0a] transition-colors cursor-pointer bg-[#f4f4f6] px-3.5 py-1.5 rounded-full border border-[#e2e2e6]"
              >
                {copiedPhone ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <a
              href={`tel:${PERSONAL_INFO.phone}`}
              className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-[#0a0a0a] hover:text-[#333333] flex items-center gap-2 group-hover:translate-x-1 transition-transform"
            >
              <span>+91 {PERSONAL_INFO.phone}</span>
              <ArrowUpRight className="w-6 h-6 shrink-0 text-[#888888] group-hover:text-[#0a0a0a]" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom Footer Credits */}
      <div className="pt-12 mt-12 border-t border-[#d8d8dc] flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-[#666666] w-full">
        <span>© 2026 {PERSONAL_INFO.name}. All rights reserved.</span>

        <div className="flex items-center gap-5">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-[#0a0a0a] transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-[#0077b5] transition-colors"
          >
            <LinkedinIcon className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </section>
  );
};
