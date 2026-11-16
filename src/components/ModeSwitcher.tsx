import React from 'react';
import { Box, Layers } from 'lucide-react';

export type PortfolioMode = 'normal' | '3d';

interface ModeSwitcherProps {
  mode: PortfolioMode;
  onChange: (mode: PortfolioMode) => void;
}

export const ModeSwitcher: React.FC<ModeSwitcherProps> = ({ mode, onChange }) => {
  return (
    <div
      role="group"
      aria-label="Portfolio experience mode"
      className="fixed top-5 right-4 sm:top-6 sm:right-8 z-40 inline-flex items-center gap-1 p-1 rounded-full bg-white/85 backdrop-blur-md border border-[#d0d0d5] shadow-sm select-none"
    >
      <button
        type="button"
        onClick={() => onChange('normal')}
        aria-pressed={mode === 'normal'}
        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
          mode === 'normal'
            ? 'bg-[#0a0a0a] text-white shadow-xs'
            : 'text-[#444444] hover:text-[#0a0a0a] hover:bg-black/5'
        }`}
      >
        <Layers className="w-3.5 h-3.5" />
        <span>Normal</span>
      </button>

      <button
        type="button"
        onClick={() => onChange('3d')}
        aria-pressed={mode === '3d'}
        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
          mode === '3d'
            ? 'bg-[#e11d48] text-white shadow-xs'
            : 'text-[#444444] hover:text-[#e11d48] hover:bg-[#e11d48]/10'
        }`}
      >
        <Box className="w-3.5 h-3.5" />
        <span>3D</span>
      </button>
    </div>
  );
};
