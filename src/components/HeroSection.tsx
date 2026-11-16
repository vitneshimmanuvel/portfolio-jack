import React, { useEffect, useMemo, useRef, useState } from 'react';

interface StarParticle {
  id: number;
  cx: number;
  cy: number;
  r: number;
  color: string;
  opacity: number;
  layer: 0 | 1 | 2;
  glow: boolean;
}

const GALAXY_COLORS = [
  '#ff0055', // electric neon ruby
  '#e11d48', // crimson flame
  '#ff2a5f', // bright luminous rose
  '#ff4d6d', // radiant coral
  '#ff758f', // soft luminous petal
  '#ffffff', // crystalline sparkle
];

// Deterministic seeded PRNG (Mulberry32) so particle distribution is pure and reproducible
function createSeededRng(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const HeroSection: React.FC = () => {
  const layer0Ref = useRef<SVGGElement>(null);
  const layer1Ref = useRef<SVGGElement>(null);
  const layer2Ref = useRef<SVGGElement>(null);
  const [isLandscape, setIsLandscape] = useState(() =>
    typeof window === 'undefined' ? true : window.innerWidth / Math.max(1, window.innerHeight) >= 1.25
  );

  // Match TextPortalHero's xMidYMid slice on desktop/landscape and avoid clipping on portrait mobile
  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth / Math.max(1, window.innerHeight) >= 1.25);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Generate 480 crisp cosmic particles across the centered typography region
  const particles = useMemo<StarParticle[]>(() => {
    const rand = createSeededRng(20260918);
    const items: StarParticle[] = [];

    for (let i = 0; i < 480; i++) {
      const layer = (i % 3) as 0 | 1 | 2;
      const cx = 360 + rand() * 1200;
      const cy = 340 + rand() * 315;
      const baseR = layer === 0 ? 0.9 + rand() * 1.1 : layer === 1 ? 1.3 + rand() * 1.5 : 1.7 + rand() * 2.1;
      const color = GALAXY_COLORS[Math.floor(rand() * GALAXY_COLORS.length)];
      const opacity = layer === 0 ? 0.4 + rand() * 0.4 : layer === 1 ? 0.55 + rand() * 0.4 : 0.7 + rand() * 0.3;

      items.push({
        id: i,
        cx,
        cy,
        r: baseR,
        color,
        opacity,
        layer,
        glow: layer === 2 || rand() > 0.72,
      });
    }

    return items;
  }, []);

  const layers = useMemo(() => {
    return [
      particles.filter((p) => p.layer === 0),
      particles.filter((p) => p.layer === 1),
      particles.filter((p) => p.layer === 2),
    ];
  }, [particles]);

  // Subtle ambient drift & pointer parallax inside the letterforms (no React re-renders)
  useEffect(() => {
    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    const start = performance.now();

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const animate = (now: number) => {
      const t = (now - start) * 0.001;
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      if (layer0Ref.current) {
        const dx = Math.sin(t * 0.35) * 3 - currentX * 4;
        const dy = Math.cos(t * 0.3) * 2 - currentY * 3;
        layer0Ref.current.setAttribute('transform', `translate(${dx.toFixed(2)}, ${dy.toFixed(2)})`);
      }
      if (layer1Ref.current) {
        const dx = Math.cos(t * 0.45) * 5 - currentX * 9;
        const dy = Math.sin(t * 0.4) * 4 - currentY * 7;
        layer1Ref.current.setAttribute('transform', `translate(${dx.toFixed(2)}, ${dy.toFixed(2)})`);
      }
      if (layer2Ref.current) {
        const dx = Math.sin(t * 0.55 + 1.2) * 7 - currentX * 15;
        const dy = Math.cos(t * 0.5 + 0.8) * 5 - currentY * 11;
        layer2Ref.current.setAttribute('transform', `translate(${dx.toFixed(2)}, ${dy.toFixed(2)})`);
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden select-none">
      {/* Vector SVG matching TextPortalHero (Image 2), transparent outside letters so InteractivePixelGrid remains visible */}
      <svg
        viewBox="0 0 1920 1080"
        className="w-full h-full block"
        preserveAspectRatio={isLandscape ? 'xMidYMid slice' : 'xMidYMid meet'}
        aria-label="Vitnesh Immanuvel"
      >
        <defs>
          <mask
            id="normal-hero-text-mask"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="1920"
            height="1080"
          >
            <rect x="0" y="0" width="1920" height="1080" fill="#000000" />
            <g
              fill="#ffffff"
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
              fontWeight="900"
            >
              <text
                x="960"
                y="475"
                fontSize="142"
                style={{ letterSpacing: '-0.04em' }}
              >
                VITNESH
              </text>
              <text
                x="960"
                y="625"
                fontSize="142"
                style={{ letterSpacing: '-0.04em' }}
              >
                IMMANUVEL
              </text>
            </g>
          </mask>

          <radialGradient id="hero-nebula-glow" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#e11d48" stopOpacity="0.2" />
            <stop offset="55%" stopColor="#ff2a5f" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#030306" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g mask="url(#normal-hero-text-mask)">
          {/* Deep cosmic black base strictly inside the letters */}
          <rect x="0" y="0" width="1920" height="1080" fill="#030306" />
          <ellipse cx="960" cy="500" rx="580" ry="190" fill="url(#hero-nebula-glow)" />

          {/* Far Particle Layer */}
          <g ref={layer0Ref}>
            {layers[0].map((p) => (
              <circle
                key={p.id}
                cx={p.cx}
                cy={p.cy}
                r={p.r}
                fill={p.color}
                opacity={p.opacity}
              />
            ))}
          </g>

          {/* Mid Particle Layer */}
          <g ref={layer1Ref}>
            {layers[1].map((p) => (
              <g key={p.id}>
                {p.glow && (
                  <circle
                    cx={p.cx}
                    cy={p.cy}
                    r={p.r * 2.1}
                    fill={p.color}
                    opacity={p.opacity * 0.22}
                  />
                )}
                <circle
                  cx={p.cx}
                  cy={p.cy}
                  r={p.r}
                  fill={p.color}
                  opacity={p.opacity}
                />
              </g>
            ))}
          </g>

          {/* Near Particle Layer */}
          <g ref={layer2Ref}>
            {layers[2].map((p) => (
              <g key={p.id}>
                {p.glow && (
                  <circle
                    cx={p.cx}
                    cy={p.cy}
                    r={p.r * 2.4}
                    fill={p.color}
                    opacity={p.opacity * 0.28}
                  />
                )}
                <circle
                  cx={p.cx}
                  cy={p.cy}
                  r={p.r}
                  fill={p.color}
                  opacity={p.opacity}
                />
              </g>
            ))}
          </g>
        </g>
      </svg>
    </section>
  );
};
