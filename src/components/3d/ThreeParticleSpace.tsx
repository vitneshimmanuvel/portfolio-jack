import React, { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MotionValue } from 'motion/react';

// Deterministic seeded PRNG (Mulberry32) for pure particle generation
function createSeededRng(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface ThreeParticleSpaceProps {
  scrollProgress: MotionValue<number>;
}

// Luminous particle palette for galaxy space
const GALAXY_PALETTE = [
  new THREE.Color('#ff0055'), // electric neon ruby
  new THREE.Color('#e11d48'), // crimson flame
  new THREE.Color('#ff2a5f'), // bright luminous rose
  new THREE.Color('#ff4d6d'), // radiant coral
  new THREE.Color('#ff758f'), // soft luminous petal
  new THREE.Color('#ffffff'), // crystalline sparkle
];

// Helper: Create crisp round glowing particle texture with smooth falloff
function createRoundGlowTexture(size = 64): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const center = size / 2;
    const grad = ctx.createRadialGradient(center, center, 0, center, center, center);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.35, 'rgba(255, 255, 255, 0.95)');
    grad.addColorStop(0.65, 'rgba(255, 255, 255, 0.3)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.generateMipmaps = true;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  return tex;
}

// --- 1. Background 3D Particle Galaxy (Layer 2) ---
const ParticleSwarm: React.FC<{ scrollProgress: MotionValue<number> }> = ({
  scrollProgress,
}) => {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 3500;

  const [positions, colors, scales, initialCoords] = useMemo(() => {
    const rand = createSeededRng(42077);
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sca = new Float32Array(count);
    const init = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const angle = rand() * Math.PI * 2;
      const radius = Math.pow(rand(), 0.55) * 9.5 + 0.3;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const z = (rand() - 0.08) * -65 - 2.0; // Deep galaxy corridor

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      init[i * 3] = x;
      init[i * 3 + 1] = y;
      init[i * 3 + 2] = z;

      const colorPick = GALAXY_PALETTE[Math.floor(rand() * GALAXY_PALETTE.length)];
      col[i * 3] = colorPick.r;
      col[i * 3 + 1] = colorPick.g;
      col[i * 3 + 2] = colorPick.b;

      sca[i] = rand() * 3.4 + 1.2;
    }

    return [pos, col, sca, init];
  }, [count]);

  const particleTexture = useMemo(() => createRoundGlowTexture(64), []);
  const dummyPointer = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    return () => {
      particleTexture.dispose();
    };
  }, [particleTexture]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.elapsedTime;
    const progress = scrollProgress.get();

    // Gated Hover: activates as user enters space through the letter "N" (0.06 -> 0.20)
    const hoverScale = THREE.MathUtils.smoothstep(progress, 0.06, 0.20);

    dummyPointer.current.x = THREE.MathUtils.lerp(
      dummyPointer.current.x,
      state.pointer.x * 6,
      0.08
    );
    dummyPointer.current.y = THREE.MathUtils.lerp(
      dummyPointer.current.y,
      state.pointer.y * 4,
      0.08
    );

    const posAttr = pointsRef.current.geometry.attributes.position;
    const currentPositions = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const ox = initialCoords[i3];
      const oy = initialCoords[i3 + 1];
      const oz = initialCoords[i3 + 2];

      const ambientX = Math.sin(time * 0.45 + i * 0.1) * 0.25;
      const ambientY = Math.cos(time * 0.5 + i * 0.15) * 0.25;
      const ambientZ = Math.sin(time * 0.35 + oz * 0.2) * 0.35;

      let targetX = ox + ambientX;
      let targetY = oy + ambientY;
      let targetZ = oz + ambientZ;

      if (hoverScale > 0.01) {
        const dx = currentPositions[i3] - dummyPointer.current.x;
        const dy = currentPositions[i3 + 1] - dummyPointer.current.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 3.2) {
          const force = (1 - dist / 3.2) * 2.0 * hoverScale;
          const angle = Math.atan2(dy, dx) + 0.35;
          targetX += Math.cos(angle) * force;
          targetY += Math.sin(angle) * force;
        }
      }

      currentPositions[i3] = THREE.MathUtils.lerp(
        currentPositions[i3],
        targetX,
        0.06
      );
      currentPositions[i3 + 1] = THREE.MathUtils.lerp(
        currentPositions[i3 + 1],
        targetY,
        0.06
      );
      currentPositions[i3 + 2] = THREE.MathUtils.lerp(
        currentPositions[i3 + 2],
        targetZ,
        0.06
      );
    }

    posAttr.needsUpdate = true;

    // Smooth camera depth translation on scroll directly aiming through the letter "N"
    const targetCamZ = THREE.MathUtils.lerp(4.5, -48.0, progress);

    // Layer 1 to Layer 2 Trajectory:
    // 1. Aim into letter "N" during initial zoom (0.0 -> 0.14)
    const enterPortal = THREE.MathUtils.smoothstep(progress, 0.0, 0.14);
    // 2. Smoothly glide back to dead-center (0, 0) as camera emerges into the 3D universe (0.14 -> 0.28)
    const exitPortalToCenter = THREE.MathUtils.smoothstep(progress, 0.14, 0.28);

    const aimY = THREE.MathUtils.lerp(0, 0.38, enterPortal);
    const mouseParallax = THREE.MathUtils.smoothstep(progress, 0.18, 0.35);

    // Realign Y to 0.0 for the centered 3D corridor
    const targetCamY = THREE.MathUtils.lerp(aimY, 0.0, exitPortalToCenter) + state.pointer.y * 0.35 * mouseParallax;
    const targetCamX = state.pointer.x * 0.45 * mouseParallax;

    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetCamZ, 0.08);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetCamY, 0.08);
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetCamX, 0.08);

    state.camera.rotation.z = THREE.MathUtils.lerp(
      state.camera.rotation.z,
      -state.pointer.x * 0.03 * mouseParallax,
      0.05
    );
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[scales, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.16}
        vertexColors
        transparent
        alphaTest={0.001}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        map={particleTexture}
      />
    </points>
  );
};

// --- 3D Particle Galaxy Universe Scene ---
export const ThreeParticleSpace: React.FC<ThreeParticleSpaceProps> = ({
  scrollProgress,
}) => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto bg-[#030306]">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 50 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        className="w-full h-full block pointer-events-auto"
      >
        <color attach="background" args={['#030306']} />
        <ambientLight intensity={0.8} />
        <pointLight position={[0, 0, 3]} intensity={2.5} color="#e11d48" distance={20} />
        <pointLight position={[5, 4, -10]} intensity={2.0} color="#ff2a5f" distance={30} />
        <pointLight position={[-5, -4, -25]} intensity={2.0} color="#ff0055" distance={30} />
        <pointLight position={[5, -2, -38]} intensity={1.8} color="#e11d48" distance={30} />

        {/* Deep 3D Particle Galaxy */}
        <ParticleSwarm scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
};

export default ThreeParticleSpace;
