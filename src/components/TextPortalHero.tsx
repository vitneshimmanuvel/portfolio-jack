import React, { useEffect, useRef, useState } from 'react';
import { useMotionValue } from 'motion/react';
import * as THREE from 'three';
import { ArrowDown } from 'lucide-react';
import { ThreeParticleSpace } from './3d/ThreeParticleSpace';
import { CorridorCardsOverlay } from './3d/CorridorCardsOverlay';

export const TextPortalHero: React.FC = () => {
  const scrollProgress = useMotionValue(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const maskLayerRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLButtonElement>(null);
  const textGroupRef = useRef<SVGGElement>(null);
  const text1Ref = useRef<SVGTextElement>(null);
  const text2Ref = useRef<SVGTextElement>(null);
  const lastLoggedProgressRef = useRef(0);
  const targetProgressRef = useRef(0);

  const [isLandscape, setIsLandscape] = useState(() =>
    typeof window === 'undefined' ? true : window.innerWidth / Math.max(1, window.innerHeight) >= 1.25
  );

  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth / Math.max(1, window.innerHeight) >= 1.25);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let current = 0;
    targetProgressRef.current = 0;
    let rafId: number;
    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      // Cinematic slow-motion wheel sensitivity (~3x smoother and slower)
      const delta = e.deltaY * 0.00035;
      targetProgressRef.current = Math.min(Math.max(targetProgressRef.current + delta, 0), 1);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const delta = (touchStartY - e.touches[0].clientY) * 0.0009;
        touchStartY = e.touches[0].clientY;
        targetProgressRef.current = Math.min(Math.max(targetProgressRef.current + delta, 0), 1);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        targetProgressRef.current = Math.min(targetProgressRef.current + 0.08, 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        targetProgressRef.current = Math.max(targetProgressRef.current - 0.08, 0);
      }
    };

    // Geometric target: marked lower aperture of the letter "N" in "VITNESH" (targetX: 960, targetY: 432)
    const targetX = 960;
    const targetY = 432;

    const renderLoop = () => {
      // Fluid momentum dampening for smooth glide
      current = THREE.MathUtils.lerp(current, targetProgressRef.current, 0.045);
      scrollProgress.set(current);

      let currentZoom = 1;
      let minX = 0;
      let minY = 0;
      let w = 1920;
      let h = 1080;
      let cx = targetX;
      let cy = 540;

      if (svgRef.current) {
        // Smooth S-curve zoom mapped cleanly across 0.0 -> 0.18
        const zoomProg = Math.min(Math.max(current / 0.18, 0), 1);
        const easeZoom = zoomProg < 0.5
          ? 4 * zoomProg * zoomProg * zoomProg
          : 1 - Math.pow(-2 * zoomProg + 2, 3) / 2;

        // Razor-sharp 1x up to 95x zoom directly into the marked aperture of "N"
        currentZoom = 1 + easeZoom * 94;

        w = 1920 / currentZoom;
        h = 1080 / currentZoom;
        cx = targetX;
        // Smoothly interpolate vertical focus from screen center (540) to letter "N" aperture (targetY)
        cy = THREE.MathUtils.lerp(540, targetY, THREE.MathUtils.smoothstep(zoomProg, 0, 0.7));

        minX = cx - w / 2;
        minY = cy - h / 2;

        svgRef.current.setAttribute('viewBox', `${minX} ${minY} ${w} ${h}`);
      }

      // Stable typography geometry so letter "N" never drifts off-target
      if (text1Ref.current) {
        text1Ref.current.style.letterSpacing = '-0.04em';
      }
      if (text2Ref.current) {
        text2Ref.current.style.letterSpacing = '-0.04em';
      }
      if (textGroupRef.current) {
        textGroupRef.current.removeAttribute('transform');
      }

      // White Background Dissolve: seamlessly dissolves as camera passes through the letter (0.07 -> 0.18)
      let maskOpacity = 1.0;
      if (maskLayerRef.current) {
        maskOpacity = Math.max(0, 1.0 - THREE.MathUtils.smoothstep(current, 0.07, 0.18));
        maskLayerRef.current.style.opacity = `${maskOpacity}`;
        maskLayerRef.current.style.visibility = maskOpacity <= 0.001 ? 'hidden' : 'visible';
      }

      // Fade out bottom scroll prompt as soon as user starts zooming into 3D space
      if (scrollHintRef.current) {
        const hintOpacity = Math.max(0, 1.0 - THREE.MathUtils.smoothstep(current, 0.005, 0.04));
        scrollHintRef.current.style.opacity = `${hintOpacity}`;
        scrollHintRef.current.style.pointerEvents = hintOpacity > 0.1 ? 'auto' : 'none';
      }

      // Real-time Telemetry Logging
      if (Math.abs(current - lastLoggedProgressRef.current) > 0.008) {
        lastLoggedProgressRef.current = current;
        console.log(
          `%c[Scroll Portal]%c Prog: %c${current.toFixed(4)}%c | Zoom: %c${currentZoom.toFixed(1)}x%c | Center: (%c${cx.toFixed(1)}%c, %c${cy.toFixed(1)}%c) | Mask: %c${maskOpacity.toFixed(2)}%c`,
          'color: #a855f7; font-weight: bold;',
          'color: #94a3b8;',
          'color: #38bdf8; font-weight: bold;',
          'color: #94a3b8;',
          'color: #ec4899; font-weight: bold;',
          'color: #94a3b8;',
          'color: #4ade80;',
          'color: #94a3b8;',
          'color: #4ade80;',
          'color: #94a3b8;',
          'color: #fbbf24;',
          'color: #94a3b8;'
        );
      }

      rafId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    rafId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(rafId);
    };
  }, [scrollProgress]);

  const handleEnterPortalClick = () => {
    targetProgressRef.current = Math.max(targetProgressRef.current, 0.24);
  };

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-[#030306] select-none touch-none">
      {/* 3D Particle Galaxy Universe behind the mask (z-0) */}
      <ThreeParticleSpace scrollProgress={scrollProgress} />

      {/* Razor-Sharp 3D Perspective Card Runway (z-15) */}
      <CorridorCardsOverlay scrollProgress={scrollProgress} />

      {/* Solid #efeff1 Vector Cutout Mask with Center-Anchored Zoom into letter "N" (z-20) */}
      <div
        ref={maskLayerRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
      >
        <svg
          ref={svgRef}
          viewBox="0 0 1920 1080"
          className="w-full h-full block"
          preserveAspectRatio={isLandscape ? 'xMidYMid slice' : 'xMidYMid meet'}
        >
          <defs>
            <mask
              id="portal-cutout-mask"
              maskUnits="userSpaceOnUse"
              x="-50000"
              y="-50000"
              width="100000"
              height="100000"
            >
              {/* White background: solid/opaque */}
              <rect
                x="-50000"
                y="-50000"
                width="100000"
                height="100000"
                fill="#ffffff"
              />
              {/* Black text cutouts: crisp, transparent hole into the dark 3D canvas */}
              <g
                ref={textGroupRef}
                fill="#000000"
                textAnchor="middle"
                fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                fontWeight="900"
              >
                <text
                  ref={text1Ref}
                  x="960"
                  y="475"
                  fontSize="142"
                  style={{ letterSpacing: '-0.04em' }}
                >
                  VITNESH
                </text>
                <text
                  ref={text2Ref}
                  x="960"
                  y="625"
                  fontSize="142"
                  style={{ letterSpacing: '-0.04em' }}
                >
                  IMMANUVEL
                </text>
              </g>
            </mask>
          </defs>

          {/* Solid #efeff1 backdrop with text cutout */}
          <rect
            x="-50000"
            y="-50000"
            width="100000"
            height="100000"
            fill="#efeff1"
            mask="url(#portal-cutout-mask)"
          />
        </svg>
      </div>

      {/* Subtle Scroll Prompt in 3D Mode before zooming */}
      <button
        ref={scrollHintRef}
        type="button"
        onClick={handleEnterPortalClick}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/85 backdrop-blur-md border border-[#d0d0d5] text-xs font-mono uppercase tracking-widest text-[#222222] hover:text-[#e11d48] hover:border-[#e11d48] transition-colors shadow-sm cursor-pointer"
      >
        <span>Scroll to zoom into 3D space</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </button>
    </div>
  );
};

export default TextPortalHero;
