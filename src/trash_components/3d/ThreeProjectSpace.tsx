import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles, Html } from '@react-three/drei';
import * as THREE from 'three';
import { PROJECTS, type Project } from '../../data/portfolioData';
import { ExternalLink, CheckCircle2, Layers } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import { MotionValue } from 'motion/react';

interface ThreeProjectSpaceProps {
  scrollProgress: MotionValue<number>;
}

interface ProjectCard3DProps {
  project: Project;
  position: [number, number, number];
  index: number;
}

const ProjectCard3D: React.FC<ProjectCard3DProps> = ({
  project,
  position,
  index,
}) => {
  const meshRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (!meshRef.current) return;
    // Gentle floating idle motion
    const t = state.clock.elapsedTime + index * 1.5;
    meshRef.current.rotation.y = Math.sin(t * 0.4) * 0.05;
    meshRef.current.rotation.x = Math.cos(t * 0.3) * 0.03;
  });

  return (
    <group ref={meshRef} position={position}>
      <Html
        transform
        distanceFactor={4.2}
        position={[0, 0, 0]}
        className="pointer-events-auto select-none"
      >
        <Tilt
          tiltMaxAngleX={10}
          tiltMaxAngleY={10}
          perspective={1200}
          scale={1.02}
          transitionSpeed={1200}
          className="w-[480px] sm:w-[560px] rounded-3xl p-[1.5px] bg-gradient-to-br from-white/90 via-white/50 to-white/20 shadow-2xl backdrop-blur-xl border border-white/60"
        >
          <div className="w-full bg-[#fcfcfd]/95 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 space-y-6 text-[#0a0a0a] border border-[#e5e5ea]/80 shadow-lg">
            {/* Header Badge & Action */}
            <div className="flex items-center justify-between border-b border-[#ececef] pb-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#666666]">
                <Layers className="w-3.5 h-3.5 text-rose-600" />
                <span>Project 0{index + 1}</span>
              </div>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#0a0a0a] text-white text-xs font-mono uppercase hover:bg-rose-600 transition-colors shadow-xs"
                >
                  <span>Visit Live</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-1.5">
              <span className="text-xs font-mono uppercase tracking-wider text-rose-600 font-semibold">
                {project.domain}
              </span>
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-[#0a0a0a] leading-tight">
                {project.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#444444] font-light leading-relaxed font-sans pt-1">
                {project.description}
              </p>
            </div>

            {/* Highlights */}
            <div className="space-y-2 pt-2">
              {project.highlights.slice(0, 2).map((h, hIdx) => (
                <div
                  key={hIdx}
                  className="p-3 rounded-xl bg-white border border-[#ececef] flex items-start gap-2.5 text-xs text-[#333333] shadow-2xs"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">{h}</span>
                </div>
              ))}
            </div>

            {/* Tech Stack Chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-[#ececef]">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md bg-[#f0f0f4] text-[#111111] text-[11px] font-mono font-medium border border-[#dcdce2]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Tilt>
      </Html>
    </group>
  );
};

const SceneRig: React.FC<{ scrollProgress: MotionValue<number> }> = ({
  scrollProgress,
}) => {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (!groupRef.current) return;
    const progress = scrollProgress.get();
    
    // Smoothly push 3D universe along Z-axis based on scroll depth
    // progress: 0.0 to 1.0 -> translates Z from 0 to +16
    const targetZ = progress * 14;
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      targetZ,
      0.1
    );

    // Subtle gentle camera sway
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      Math.sin(progress * Math.PI) * 0.12,
      0.08
    );
  });

  return (
    <group ref={groupRef}>
      {/* 3D Floating Project Cards at calculated depths */}
      <ProjectCard3D
        project={PROJECTS[0]}
        position={[-1.2, 0.2, 0]}
        index={0}
      />
      <ProjectCard3D
        project={PROJECTS[1]}
        position={[1.2, -0.1, -5.5]}
        index={1}
      />
      <ProjectCard3D
        project={PROJECTS[2]}
        position={[-0.4, 0.1, -11.0]}
        index={2}
      />

      {/* Floating Ethereal Particles & Sparkles in 3D Space */}
      <Sparkles
        count={80}
        scale={[15, 10, 20]}
        size={3.5}
        speed={0.4}
        opacity={0.35}
        color="#e11d48"
      />
    </group>
  );
};

export const ThreeProjectSpace: React.FC<ThreeProjectSpaceProps> = ({
  scrollProgress,
}) => {
  return (
    <div className="relative w-full h-full min-h-[500px] overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 48 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} />
        <pointLight position={[-5, -5, -2]} intensity={0.5} color="#e11d48" />

        <SceneRig scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
};
