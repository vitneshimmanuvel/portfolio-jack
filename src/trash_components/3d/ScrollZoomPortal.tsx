import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ParticleOrganicAperture } from './ParticleOrganicAperture';
import { ThreeProjectSpace } from './ThreeProjectSpace';
import { ArrowDown, Sparkles } from 'lucide-react';

export const ScrollZoomPortal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Scale mask from 1 to 32x (tunnel zoom effect matching Image 4 & 5)
  const maskScale = useTransform(scrollYProgress, [0, 0.45], [1, 28]);
  const maskOpacity = useTransform(scrollYProgress, [0, 0.4, 0.5], [1, 0.95, 0]);
  const tunnelHintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  
  // 3D Scene Opacity & Z-translation
  const sceneOpacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);
  const sceneScale = useTransform(scrollYProgress, [0.2, 0.6], [0.85, 1]);

  return (
    <div ref={containerRef} className="relative w-full h-[320vh] select-none">
      {/* Pinned Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#efeff1]">
        
        {/* Background 3D Perspective Universe (Revealed through the aperture) */}
        <motion.div
          style={{ opacity: sceneOpacity, scale: sceneScale }}
          className="absolute inset-0 w-full h-full z-10"
        >
          <ThreeProjectSpace scrollProgress={scrollYProgress} />
        </motion.div>

        {/* Foreground Organic Aperture Mask Layer (Zooming in as user scrolls) */}
        <motion.div
          style={{
            scale: maskScale,
            opacity: maskOpacity,
          }}
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none origin-center"
        >
          {/* Organic Fluid Glyph Aperture */}
          <div className="relative pointer-events-auto">
            <ParticleOrganicAperture />
          </div>
        </motion.div>

        {/* Scroll Instruction Overlay */}
        <motion.div
          style={{ opacity: tunnelHintOpacity }}
          className="absolute bottom-10 z-30 flex flex-col items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#555555] pointer-events-none"
        >
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-[#d0d0d5] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
            <span>Scroll to Enter 3D Project Universe</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
