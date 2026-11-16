import React, { useEffect, useRef } from 'react';

interface ParticleOrganicApertureProps {
  className?: string;
}

interface Particle {
  originX: number;
  originY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  baseAlpha: number;
}

export const ParticleOrganicAperture: React.FC<ParticleOrganicApertureProps> = ({
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 360;
    let height = 360;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const particles: Particle[] = [];
    const numParticles = 1400;

    // Generate organic fluid shape particle coordinates (inspired by reference glyph)
    for (let i = 0; i < numParticles; i++) {
      // Parametric organic multi-lobed shape (metaball / fluid curve)
      const t = Math.random() * Math.PI * 2;
      const r1 = 65 + Math.sin(t * 3) * 25 + Math.cos(t * 2) * 18;

      const cluster = Math.random();
      let px = width / 2;
      let py = height / 2;

      if (cluster < 0.65) {
        // Main fluid body
        const spread = Math.sqrt(Math.random()) * r1;
        px += Math.cos(t) * spread;
        py += Math.sin(t) * spread + Math.sin(px * 0.04) * 12;
      } else if (cluster < 0.85) {
        // Top-right fluid drop (as seen in reference Image 2)
        const dt = Math.random() * Math.PI * 2;
        const dSpread = Math.sqrt(Math.random()) * 28;
        px += 75 + Math.cos(dt) * dSpread;
        py += -65 + Math.sin(dt) * dSpread * 0.8;
      } else {
        // Middle-right small satellite droplet
        const dt = Math.random() * Math.PI * 2;
        const dSpread = Math.sqrt(Math.random()) * 16;
        px += 68 + Math.cos(dt) * dSpread;
        py += 15 + Math.sin(dt) * dSpread * 0.8;
      }

      // Shades of dark charcoal & deep graphite with subtle ruby accents
      const colorRoll = Math.random();
      let color = '#111115';
      if (colorRoll > 0.88) color = '#e11d48'; // electric ruby accent
      else if (colorRoll > 0.7) color = '#27272a'; // zinc dark

      particles.push({
        originX: px,
        originY: py,
        x: px,
        y: py,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2.2 + 1.0,
        color,
        baseAlpha: Math.random() * 0.6 + 0.35,
      });
    }

    let mouseX = -9999;
    let mouseY = -9999;
    let isHovered = false;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isHovered = mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height;
    };

    const handleMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
      isHovered = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Render organic fluid backdrop aura
      const grad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        20,
        width / 2,
        height / 2,
        140
      );
      grad.addColorStop(0, 'rgba(20, 20, 25, 0.08)');
      grad.addColorStop(1, 'rgba(20, 20, 25, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 140, 0, Math.PI * 2);
      ctx.fill();

      // Update & Draw Disintegrating Breaking Particles (Image 3)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Distance from cursor
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.hypot(dx, dy);

        if (isHovered && dist < 95) {
          // Particle Breaking / Disintegration explosion force (curl repulsion)
          const force = (1 - dist / 95) * 4.5;
          const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.6;
          p.vx += Math.cos(angle) * force;
          p.vy += Math.sin(angle) * force;
        }

        // Return spring force to reform the organic shape
        const homeDx = p.originX - p.x;
        const homeDy = p.originY - p.y;
        p.vx += homeDx * 0.045;
        p.vy += homeDy * 0.045;

        // Friction damping
        p.vx *= 0.88;
        p.vy *= 0.88;

        // Subtle ambient organic floating oscillation
        p.x += p.vx + Math.sin(time + i * 0.1) * 0.2;
        p.y += p.vy + Math.cos(time + i * 0.1) * 0.2;

        // Draw particle
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.baseAlpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1.0;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <canvas
        ref={canvasRef}
        style={{ width: 360, height: 360 }}
        className="cursor-pointer transition-transform duration-500 hover:scale-105"
      />
    </div>
  );
};
