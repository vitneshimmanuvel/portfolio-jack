import React, { useEffect, useRef } from 'react';
import { MotionValue } from 'motion/react';
import * as THREE from 'three';

interface CorridorCardsOverlayProps {
  scrollProgress: MotionValue<number>;
}

interface CorridorCardData {
  id: string;
  index: number;
  side: 'left' | 'right' | 'center';
  baseZ: number; // Base depth coordinate along the 3D runway
  badge: string;
  title: string;
  subtitle: string;
  organization: string;
  highlights: string[];
  tags: string[];
}

// 5 Curated Progression Cards with romantic serif typography and clean monochrome aesthetic (Zero Icons)
const CORRIDOR_CARDS: CorridorCardData[] = [
  // 1. Left (Initial): Full-Stack Profile & Real-World Experience
  {
    id: 'card-1',
    index: 0,
    side: 'left',
    baseZ: -420,
    badge: 'FULL-STACK • WEB • MOBILE • AI',
    title: 'Vitnesh Immanuvel — Software Developer',
    subtitle: '1.5+ Years Experience • Settlo Tech Solutions (May 2025 – Nov 2026)',
    organization: 'Building digital products, solving real problems & turning ideas into production applications.',
    highlights: [
      'End-to-end delivery from business requirements and UI workflows to REST APIs, databases & cloud deployment',
      'Core Stack: React.js, JavaScript, Node.js, Express.js, PostgreSQL, MySQL, MongoDB, Flutter & AWS',
    ],
    tags: ['1.5+ Yrs Exp', 'React & Node.js', 'Flutter', 'SQL & MongoDB', 'Erode, India'],
  },
  // 2. Right (Opposite Far): Astounding Business Websites & Featured Platforms
  {
    id: 'card-2',
    index: 1,
    side: 'right',
    baseZ: -1100,
    badge: 'NEXT-GEN WEBSITES & PLATFORMS',
    title: 'Astounding Business Platforms',
    subtitle: 'PropertyDocks • Settlo HR • Liblist • Home Interiors 3D',
    organization: 'Crafting next-generation business websites & multi-domain platforms built to elite modern standards.',
    highlights: [
      'PropertyDocks (zero-brokerage real estate), Settlo HR Platform & Liblist document collaboration suite',
      'Home Interiors 3D Studio visualization with image-based selection & real-time color customization',
    ],
    tags: ['PropertyDocks', 'Settlo HR', 'Liblist', '3D Studio', 'Next-Gen Web'],
  },
  // 3. Left (Opposite Next): Business Technical Automation & Cloud Backends
  {
    id: 'card-3',
    index: 2,
    side: 'left',
    baseZ: -1780,
    badge: 'TECHNICAL AUTOMATION & CLOUD',
    title: 'Capture Your Business Automation',
    subtitle: 'U-Turn AWS • Thambi Oru Tea CRM • Donmar Food',
    organization: 'Transforming manual business operations into automated cloud services, CRM workflows & mobile apps.',
    highlights: [
      'Serverless cloud services powered by Node.js, AWS Lambda, DynamoDB, Amazon S3, Amazon SNS & Firebase',
      'Cross-platform Flutter mobile CRM applications, multi-role RBAC access & automated workflows',
    ],
    tags: ['AWS Lambda', 'DynamoDB & S3', 'Flutter CRM', 'RBAC Auth', 'Automation'],
  },
  // 4. Right (Opposite Next): Education, Capabilities & Engineering Process
  {
    id: 'card-4',
    index: 3,
    side: 'right',
    baseZ: -2460,
    badge: 'ENGINEERING APPROACH & DEGREE',
    title: 'From Idea to Production Deployment',
    subtitle: 'B.E. Computer Science & Engineering (May 2025) • Anna University',
    organization: 'Builders Engineering College (Kangeyam Group of Institutions) — structured 7-step delivery lifecycle.',
    highlights: [
      'Custom Web Apps, Admin Dashboards, SaaS Portals, REST APIs, Flutter Mobile Apps & Business Software',
      'Disciplined workflow: Requirements → Planning → Build → Integration → Testing → Cloud Deployment',
    ],
    tags: ['B.E. CSE 2025', 'Custom SaaS', 'REST APIs', 'System Design', 'Full Ownership'],
  },
  // 5. Center (Final): AI Solutions & Career / Collaboration Call-to-Action
  {
    id: 'card-5',
    index: 4,
    side: 'center',
    baseZ: -3140,
    badge: 'AI SOLUTIONS & LET’S WORK TOGETHER',
    title: 'AI Automation & Next High Standards',
    subtitle: 'Open for Full-Time Roles, Freelance & Technical Collaboration',
    organization: 'Combining AI/LLM integrations and full-stack craftsmanship to elevate engineering teams and businesses.',
    highlights: [
      'AI API & LLM integrations, RAG & vector database concepts, and intelligent workflow automation',
      'Direct Contact: vitneshimmanuvel@gmail.com • +91 7339121049 • github.com/vitneshimmanuvel',
    ],
    tags: ['AI & LLM', 'Full-Time Ready', 'Freelance & Contract', 'vitneshimmanuvel@gmail.com'],
  },
];

const TOTAL_CORRIDOR_DEPTH = 3140; // Total Z distance travelled by camera

export const CorridorCardsOverlay: React.FC<CorridorCardsOverlayProps> = ({
  scrollProgress,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let rafId: number;

    const updateLoop = () => {
      const prog = scrollProgress.get();

      // STRICT CONCEALMENT BEFORE SCROLL COMMENCES (prog < 0.01)
      if (prog < 0.01) {
        if (containerRef.current) {
          containerRef.current.style.opacity = '0';
          containerRef.current.style.pointerEvents = 'none';
        }
        cardRefs.current.forEach((el) => {
          if (el) el.style.display = 'none';
        });
        rafId = requestAnimationFrame(updateLoop);
        return;
      }

      // PRE-ENTRANCE SMOOTH TRANSITION: Emerges as camera passes through letter "N" and re-centers (0.08 -> 0.20)
      const preFactor = Math.min(Math.max((prog - 0.08) / 0.12, 0), 1);
      const easedPre = THREE.MathUtils.smoothstep(preFactor, 0, 1);
      const preScale = THREE.MathUtils.lerp(0.65, 1.0, easedPre);
      const preZOffset = THREE.MathUtils.lerp(-450, 0, easedPre);

      if (containerRef.current) {
        containerRef.current.style.opacity = `${easedPre}`;
        containerRef.current.style.pointerEvents = prog >= 0.18 ? 'auto' : 'none';
      }

      // Normalized corridor progress across 0.16 -> 1.0 (length = 0.84)
      const corridorProg = Math.max(0, prog - 0.16) / 0.84;
      const t = Math.min(Math.max(corridorProg, 0), 1);

      // Smooth camera position advancing forward through the 3D corridor
      const camZ = t * TOTAL_CORRIDOR_DEPTH + preZOffset;

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(0, 0, ${camZ}px)`;
      }

      CORRIDOR_CARDS.forEach((card, idx) => {
        const el = cardRefs.current[idx];
        if (!el) return;

        // Relative distance between card and camera (negative = ahead in distance, positive = passed behind camera)
        const relZ = card.baseZ + camZ;

        let opacity = 0;
        let scale = 1.0;
        let lateralShift = 0;
        let blurAmount = 0;

        if (relZ < -2400) {
          // Too far down the tunnel
          opacity = 0;
        } else if (relZ < -550) {
          // Approaching in distance on its side (visible ahead across the corridor with subtle focal lens blur)
          const enterFactor = (relZ + 2400) / 1850; // 0 -> 1
          const easedEnter = THREE.MathUtils.smoothstep(enterFactor, 0, 1);

          opacity = easedEnter * 0.95;
          scale = THREE.MathUtils.lerp(0.80, 0.98, easedEnter);
          // Subtle focal lens blur when deep in distance, smoothly dropping to 0 by relZ = -550
          const blurFactor = THREE.MathUtils.smoothstep(relZ, -2000, -550);
          blurAmount = THREE.MathUtils.lerp(1.8, 0, blurFactor);
        } else if (relZ <= 50) {
          // Prime reading focus zone directly in front of camera (100% crisp focus, zero blur)
          const focusFactor = (relZ + 550) / 600; // 0 -> 1
          opacity = THREE.MathUtils.lerp(0.95, 1.0, THREE.MathUtils.smoothstep(focusFactor, 0, 1));
          scale = 1.0;
          blurAmount = 0;
        } else if (relZ < 280) {
          // Camera crossing and passing the card: smooth outward drift and graceful dissolve
          const exitFactor = (relZ - 50) / 230; // 0 -> 1
          const easedExit = THREE.MathUtils.smoothstep(exitFactor, 0, 1);

          opacity = 1.0 - easedExit;
          scale = THREE.MathUtils.lerp(1.0, 1.06, easedExit);
          lateralShift = card.side === 'left' ? -easedExit * 80 : card.side === 'right' ? easedExit * 80 : 0;
          blurAmount = THREE.MathUtils.lerp(0, 1.8, easedExit);
        } else {
          // Completely passed behind camera
          opacity = 0;
        }

        const isVisible = opacity > 0.01;
        if (isVisible) {
          el.style.display = 'flex';
          el.style.opacity = `${opacity}`;
          el.style.pointerEvents = opacity > 0.65 && prog >= 0.16 ? 'auto' : 'none';

          // Combine base scale with pre-entrance scale
          const totalScale = scale * preScale;
          const baseRotY = card.side === 'left' ? 16 : card.side === 'right' ? -16 : 0;

          el.style.filter = blurAmount > 0.1 ? `blur(${blurAmount.toFixed(1)}px)` : 'none';
          el.style.transform = `translate3d(${lateralShift}px, 0, ${card.baseZ}px) rotateY(${baseRotY}deg) scale(${totalScale})`;
        } else {
          el.style.display = 'none';
          el.style.opacity = '0';
          el.style.pointerEvents = 'none';
        }
      });

      rafId = requestAnimationFrame(updateLoop);
    };

    rafId = requestAnimationFrame(updateLoop);
    return () => cancelAnimationFrame(rafId);
  }, [scrollProgress]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-15 overflow-hidden select-none flex items-center justify-center transition-opacity duration-300"
      style={{ perspective: '1000px', perspectiveOrigin: '50% 50%' }}
    >
      {/* 3D World Track: Travels along Z as camera flies through the corridor */}
      <div
        ref={trackRef}
        className="relative w-full max-w-7xl h-full flex items-center justify-center pointer-events-none"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {CORRIDOR_CARDS.map((card) => {
          // Positioning on Left runway, Right runway, or Center
          const isLeft = card.side === 'left';
          const isRight = card.side === 'right';

          let positionClass = '';
          if (isLeft) positionClass = 'left-4 sm:left-10 lg:left-16';
          else if (isRight) positionClass = 'right-4 sm:right-10 lg:right-16';
          else positionClass = 'left-1/2 -translate-x-1/2';

          return (
            <div
              key={card.id}
              ref={(el) => {
                cardRefs.current[card.index] = el;
              }}
              className={`absolute top-1/2 -translate-y-1/2 ${positionClass} w-[360px] sm:w-[430px] max-w-[90vw] min-h-[440px] max-h-[78vh] flex flex-col justify-between rounded-3xl p-6 sm:p-8 transition-all duration-300 group overflow-hidden pointer-events-auto`}
              style={{
                display: 'none',
                background: 'linear-gradient(135deg, rgba(14, 15, 24, 0.94) 0%, rgba(7, 8, 14, 0.98) 100%)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                boxShadow: '0 28px 65px rgba(0, 0, 0, 0.85), 0 0 35px rgba(255, 255, 255, 0.05)',
                transformStyle: 'preserve-3d',
                transformOrigin: isLeft ? 'right center' : isRight ? 'left center' : 'center center',
              }}
            >
              {/* Dynamic Light Reflection Hover Shimmer Beam */}
              <div
                className="absolute inset-0 -translate-x-[160%] skew-x-[-22deg] group-hover:translate-x-[260%] transition-transform duration-1000 ease-in-out pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.08) 45%, rgba(255, 255, 255, 0.22) 50%, rgba(255, 255, 255, 0.08) 55%, transparent 100%)',
                }}
              />

              {/* Ambient Glass Glow */}
              <div
                className="absolute -top-24 -right-24 w-48 h-48 rounded-full pointer-events-none opacity-10 blur-3xl transition-opacity group-hover:opacity-25 bg-white"
              />

              {/* Top Section with Romantic Serif Typography (Zero Icons) */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-slate-300 bg-white/5 border border-white/15">
                    {card.badge}
                  </div>
                </div>

                <h3
                  className="text-2xl sm:text-3xl font-normal text-white tracking-tight leading-snug mb-2 group-hover:text-slate-200 transition-colors"
                  style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif" }}
                >
                  {card.title}
                </h3>
                <p
                  className="text-xs sm:text-sm italic text-slate-300 mb-2.5"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {card.subtitle}
                </p>

                <p className="text-xs sm:text-sm font-medium text-slate-400 leading-relaxed mb-4">
                  {card.organization}
                </p>

                <div className="space-y-2.5 mb-4">
                  {card.highlights.map((item, i) => (
                    <div key={i} className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Section: Tag Pills */}
              <div className="relative z-10 pt-3 border-t border-white/10 flex flex-wrap gap-1.5">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-[11px] font-medium font-mono text-slate-300 bg-white/5 rounded-lg border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CorridorCardsOverlay;
