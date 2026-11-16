import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { MotionValue } from 'motion/react';
import { ExternalLink, Sparkles, Layers, Briefcase, Code2, ArrowUpRight } from 'lucide-react';
import { PROJECTS, EXPERIENCES } from '../../data/portfolioData';

interface ThreeCardCorridorProps {
  scrollProgress: MotionValue<number>;
}

interface CorridorCardData {
  id: string;
  index: number;
  side: 'left' | 'right';
  worldZ: number;
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  tags: string[];
  icon: React.ReactNode;
  liveUrl?: string;
}

// 6 Cards precisely sequenced along the Z-axis corridor from z = -10 down to z = -45
const CORRIDOR_CARDS: CorridorCardData[] = [
  // 0. Left: Settlo HR Management Platform
  {
    id: 'l1',
    index: 0,
    side: 'left',
    worldZ: -10.0,
    badge: 'HR MANAGEMENT',
    badgeColor: '#ff2a5f',
    title: PROJECTS[0].title,
    subtitle: PROJECTS[0].domain,
    description: PROJECTS[0].description,
    highlights: PROJECTS[0].highlights.slice(0, 2),
    tags: PROJECTS[0].tags,
    icon: <Sparkles className="w-4 h-4 text-[#ff2a5f]" />,
  },
  // 1. Right: PropertyDocks
  {
    id: 'r1',
    index: 1,
    side: 'right',
    worldZ: -17.0,
    badge: 'REAL ESTATE PLATFORM',
    badgeColor: '#e11d48',
    title: PROJECTS[1].title,
    subtitle: PROJECTS[1].domain,
    description: PROJECTS[1].description,
    highlights: PROJECTS[1].highlights.slice(0, 2),
    tags: PROJECTS[1].tags,
    icon: <Layers className="w-4 h-4 text-[#e11d48]" />,
    liveUrl: PROJECTS[1].liveUrl,
  },
  // 2. Left: Settlo Tech Experience
  {
    id: 'l2',
    index: 2,
    side: 'left',
    worldZ: -24.0,
    badge: 'EXPERIENCE',
    badgeColor: '#ff0055',
    title: `${EXPERIENCES[0].role} @ ${EXPERIENCES[0].company}`,
    subtitle: `${EXPERIENCES[0].period} • ${EXPERIENCES[0].location}`,
    description: EXPERIENCES[0].summary,
    highlights: EXPERIENCES[0].highlights.slice(0, 2),
    tags: EXPERIENCES[0].tech.slice(0, 5),
    icon: <Briefcase className="w-4 h-4 text-[#ff0055]" />,
  },
  // 3. Right: Core Skills & Architecture
  {
    id: 'r3',
    index: 3,
    side: 'right',
    worldZ: -31.0,
    badge: 'TECHNICAL EXPERTISE',
    badgeColor: '#ff758f',
    title: 'Full-Stack, Mobile & AI Stack',
    subtitle: 'Web, Backend, Databases, Flutter & AWS',
    description: 'End-to-end engineering from frontend UIs to REST APIs, SQL/NoSQL databases, AWS, and AI integrations.',
    highlights: [
      'Web & Mobile: React.js, Vite, Tailwind CSS, Flutter, Dart',
      'Backend & Cloud: Node.js, Express.js, PostgreSQL, MongoDB, AWS, Firebase',
    ],
    tags: ['React.js', 'Node.js', 'Flutter', 'PostgreSQL', 'AWS', 'AI APIs'],
    icon: <Code2 className="w-4 h-4 text-[#ff758f]" />,
  },
  // 4. Left: Liblist / U-Turn AWS
  {
    id: 'l3',
    index: 4,
    side: 'left',
    worldZ: -38.0,
    badge: 'DOCUMENT & CLOUD',
    badgeColor: '#ff2a5f',
    title: PROJECTS[2].title,
    subtitle: PROJECTS[2].domain,
    description: PROJECTS[2].description,
    highlights: PROJECTS[2].highlights.slice(0, 2),
    tags: PROJECTS[2].tags,
    icon: <ExternalLink className="w-4 h-4 text-[#ff2a5f]" />,
    liveUrl: PROJECTS[2].liveUrl,
  },
  // 5. Right: Contact & Connect
  {
    id: 'r5',
    index: 5,
    side: 'right',
    worldZ: -45.0,
    badge: 'LET’S CONNECT',
    badgeColor: '#e11d48',
    title: 'Let’s Build Something Exceptional',
    subtitle: 'Available for full-time roles & high-impact products',
    description: 'Specialized in building robust, performant web & mobile systems with modern cloud workflows.',
    highlights: [
      'Email: vitneshimmanuvel@gmail.com',
      'Phone: +91 7339121049 • Location: Tamil Nadu, India',
    ],
    tags: ['Full Stack', 'Mobile', 'Backend APIs', 'Lead Engineer'],
    icon: <ArrowUpRight className="w-4 h-4 text-[#e11d48]" />,
  },
];

// Single 3D Perspective Card with Perfect FOV Framing
const CorridorCardItem: React.FC<{
  data: CorridorCardData;
  scrollProgress: MotionValue<number>;
}> = ({ data, scrollProgress }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const cardDivRef = useRef<HTMLDivElement>(null!);
  const isLeft = data.side === 'left';
  const { viewport } = useThree();

  // Responsive lateral position calibrated to camera frustum width
  // Desktop: ~2.1 units lateral offset (fits neatly in left/right quadrant without edge clipping)
  // Mobile: scales down proportionally so cards remain inside screen bounds
  const lateralOffset = Math.min(2.15, Math.max(1.1, viewport.width * 0.24));
  const targetX = isLeft ? -lateralOffset : lateralOffset;
  const baseY = -0.15;
  const baseRotY = isLeft ? 0.18 : -0.18; // Inward perspective angle matching sketch

  useFrame((state) => {
    if (!groupRef.current) return;

    const prog = scrollProgress.get();

    // STRICT FIRST-LAYER CONCEALMENT: Absolutely hidden while hero white mask is active (prog < 0.18)
    if (prog < 0.18) {
      groupRef.current.visible = false;
      if (cardDivRef.current) {
        cardDivRef.current.style.display = 'none';
        cardDivRef.current.style.opacity = '0';
        cardDivRef.current.style.pointerEvents = 'none';
      }
      return;
    }

    const camZ = state.camera.position.z;
    // Relative distance of card ahead of camera along Z (negative = ahead of camera)
    const distAhead = data.worldZ - camZ;

    let opacity = 0;
    let currentX = targetX;
    let scale = 1.0;

    if (distAhead < -24.0) {
      // Too far in deep horizon
      opacity = 0;
    } else if (distAhead < -10.0) {
      // Approaching from horizon: smooth fade-in
      const enterFactor = (distAhead + 24.0) / 14.0; // 0 -> 1
      opacity = THREE.MathUtils.smoothstep(enterFactor, 0, 1) * 0.85;
      scale = THREE.MathUtils.lerp(0.80, 0.95, enterFactor);
    } else if (distAhead <= -3.2) {
      // Prime viewing zone in front of camera
      const focusFactor = (distAhead + 10.0) / 6.8; // 0 -> 1
      opacity = THREE.MathUtils.lerp(0.85, 1.0, THREE.MathUtils.smoothstep(focusFactor, 0, 1));
      scale = THREE.MathUtils.lerp(0.95, 1.0, THREE.MathUtils.smoothstep(focusFactor, 0, 1));
    } else if (distAhead < 2.0) {
      // Passing beside camera: graceful dissolve and slide outward to prevent screen blocking
      const exitFactor = (distAhead + 3.2) / 5.2; // 0 -> 1
      const easedExit = THREE.MathUtils.smoothstep(exitFactor, 0, 1);
      opacity = 1.0 - easedExit;
      currentX = THREE.MathUtils.lerp(targetX, targetX * 1.35, easedExit);
      scale = THREE.MathUtils.lerp(1.0, 1.08, easedExit);
    } else {
      // Past behind camera
      opacity = 0;
    }

    // Apply visibility and transformation
    const isVisible = opacity > 0.01;
    groupRef.current.visible = isVisible;

    if (isVisible) {
      const time = state.clock.elapsedTime;
      const floatY = Math.sin(time * 1.5 + data.index * 1.1) * 0.05;

      groupRef.current.position.set(currentX, baseY + floatY, data.worldZ);
      groupRef.current.scale.set(scale, scale, scale);

      // Interactive subtle mouse tilt
      groupRef.current.rotation.y = baseRotY + (isLeft ? 1 : -1) * state.pointer.x * 0.03;
      groupRef.current.rotation.x = state.pointer.y * 0.02;

      // Update DOM element directly
      if (cardDivRef.current) {
        cardDivRef.current.style.display = 'block';
        cardDivRef.current.style.opacity = `${opacity}`;
        cardDivRef.current.style.pointerEvents = opacity > 0.6 ? 'auto' : 'none';
      }
    } else if (cardDivRef.current) {
      cardDivRef.current.style.display = 'none';
      cardDivRef.current.style.opacity = '0';
      cardDivRef.current.style.pointerEvents = 'none';
    }
  });

  return (
    <group ref={groupRef} position={[targetX, baseY, data.worldZ]} rotation={[0, baseRotY, 0]}>
      <Html
        transform
        distanceFactor={6.2}
        position={[0, 0, 0]}
        className="pointer-events-auto select-none"
      >
        <div
          ref={cardDivRef}
          className="w-[330px] sm:w-[370px] rounded-2xl p-5 sm:p-6 transition-all duration-300 relative group overflow-hidden"
          style={{
            display: 'none',
            opacity: 0,
            background: 'linear-gradient(135deg, rgba(14, 15, 24, 0.92) 0%, rgba(8, 9, 15, 0.96) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 42, 95, 0.25)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.85), 0 0 35px rgba(225, 29, 72, 0.15)',
          }}
        >
          {/* Top Edge Neon Glow Line */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{
              background: `linear-gradient(90deg, transparent, ${data.badgeColor}, transparent)`,
            }}
          />

          {/* Ambient Glow Aura */}
          <div
            className="absolute -top-24 -right-24 w-48 h-48 rounded-full pointer-events-none opacity-20 blur-3xl transition-opacity group-hover:opacity-40"
            style={{ backgroundColor: data.badgeColor }}
          />

          {/* Card Header: Badge & Icon */}
          <div className="flex items-center justify-between mb-3">
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase"
              style={{
                backgroundColor: `${data.badgeColor}18`,
                color: data.badgeColor,
                border: `1px solid ${data.badgeColor}35`,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: data.badgeColor }}
              />
              {data.badge}
            </div>

            <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-white/70">
              {data.icon}
            </div>
          </div>

          {/* Title & Subtitle */}
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug mb-1 group-hover:text-[#ff2a5f] transition-colors">
            {data.title}
          </h3>
          <p className="text-xs font-medium text-white/50 mb-3 line-clamp-1">
            {data.subtitle}
          </p>

          {/* Highlights */}
          <div className="space-y-1.5 mb-3.5">
            {data.highlights.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-white/75 leading-relaxed">
                <span className="w-1 h-1 rounded-full bg-[#ff2a5f] mt-1.5 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Tag Pills */}
          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
            {data.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[10px] font-medium font-mono text-white/65 bg-white/5 rounded-md border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Optional Action Button */}
          {data.liveUrl && (
            <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-end">
              <a
                href={data.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#ff2a5f] hover:text-[#ff4d6d] transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <span>Live Preview</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </Html>
    </group>
  );
};

// Main Corridor Container
export const ThreeCardCorridor: React.FC<ThreeCardCorridorProps> = ({
  scrollProgress,
}) => {
  return (
    <group name="card-corridor-root">
      {CORRIDOR_CARDS.map((card) => (
        <CorridorCardItem
          key={card.id}
          data={card}
          scrollProgress={scrollProgress}
        />
      ))}
    </group>
  );
};

export default ThreeCardCorridor;


