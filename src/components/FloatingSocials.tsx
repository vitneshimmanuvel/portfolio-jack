import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Mail, Phone } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export const FloatingSocials: React.FC = () => {
  return (
    <aside className="fixed right-4 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3 select-none">
      {/* Vertical decorative line */}
      <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-[#0a0a0a]/30 to-[#0a0a0a]/60" />

      {/* GitHub Button */}
      <a
        href={PERSONAL_INFO.github}
        target="_blank"
        rel="noreferrer"
        className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-[#d0d0d5] text-[#222222] hover:text-[#0a0a0a] hover:border-[#0a0a0a] hover:bg-white hover:scale-110 flex items-center justify-center transition-all shadow-sm"
        title="GitHub"
      >
        <GithubIcon className="w-4 h-4" />
      </a>

      {/* LinkedIn Button */}
      <a
        href={PERSONAL_INFO.linkedin}
        target="_blank"
        rel="noreferrer"
        className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-[#d0d0d5] text-[#222222] hover:text-[#0077b5] hover:border-[#0077b5] hover:bg-white hover:scale-110 flex items-center justify-center transition-all shadow-sm"
        title="LinkedIn"
      >
        <LinkedinIcon className="w-4 h-4" />
      </a>

      {/* Direct Email */}
      <a
        href={`mailto:${PERSONAL_INFO.email}`}
        className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-[#d0d0d5] text-[#222222] hover:text-[#0a0a0a] hover:border-[#0a0a0a] hover:bg-white hover:scale-110 flex items-center justify-center transition-all shadow-sm"
        title={`Email: ${PERSONAL_INFO.email}`}
      >
        <Mail className="w-4 h-4" />
      </a>

      {/* Direct Phone */}
      <a
        href={`tel:${PERSONAL_INFO.phone}`}
        className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-[#d0d0d5] text-[#222222] hover:text-[#0a0a0a] hover:border-[#0a0a0a] hover:bg-white hover:scale-110 flex items-center justify-center transition-all shadow-sm"
        title={`Call: +91 ${PERSONAL_INFO.phone}`}
      >
        <Phone className="w-4 h-4" />
      </a>

      {/* Bottom vertical decorative line */}
      <div className="w-[1px] h-12 bg-gradient-to-t from-transparent via-[#0a0a0a]/30 to-[#0a0a0a]/60" />
    </aside>
  );
};
