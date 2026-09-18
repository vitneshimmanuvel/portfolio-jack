import React, { useEffect, useRef } from 'react';

interface InteractivePixelGridProps {
  blockSize?: number; // Size of each pixel box in px (default 20px)
}

interface ActiveCell {
  col: number;
  row: number;
  tier: number; // 0 = Center vibrant red, 1 = Inner scarlet, 2 = Mid coral, 3 = Outer rose
  intensity: number; // 1.0 down to 0.0
  color: string;
  zLift: number; // 0.0 to 1.0
}

// Vibrant & Energetic Red Hierarchy Palette (Pure, luminous reds with NO muddy brown)
const RED_TIERS = [
  // Tier 0: Center Core — Rich Vibrant Crimson / Electric Red (#e11d48, #dc2626, #e60026)
  ['#e11d48', '#dc2626', '#e60026', '#d90429'],
  // Tier 1: Inner Ring — Luminous Scarlet / Radiant Coral Red
  ['#ef4444', '#f43f5e', '#ff2a5f', '#ff3864'],
  // Tier 2: Mid Diagonals — Bright Coral Flame / Warm Rose
  ['#fb7185', '#f87171', '#ff597b', '#ff6b81'],
  // Tier 3: Outer Halo — Soft Luminous Rose
  ['#fda4af', '#fca5a5', '#ff8fa3'],
];

export const InteractivePixelGrid: React.FC<InteractivePixelGridProps> = ({
  blockSize = 20,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number | null = null;
    let lastTime = performance.now();
    let isRunning = false;

    // Track active trail cells
    const activeCells = new Map<string, ActiveCell>();

    let prevMouseX: number | null = null;
    let prevMouseY: number | null = null;

    const resize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.resetTransform();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    };

    resize();
    window.addEventListener('resize', resize);

    const render = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      const toDelete: string[] = [];
      const decayRate = 2.2; // Smooth fade over ~450ms

      activeCells.forEach((cell, key) => {
        cell.intensity -= delta * decayRate;
        cell.zLift = Math.max(0, cell.intensity);

        if (cell.intensity <= 0.01) {
          toDelete.push(key);
          return;
        }

        const alpha = Math.min(1, Math.max(0, cell.intensity));
        const x = cell.col * blockSize;
        const y = cell.row * blockSize;

        // 3D Z-Axis Lift: Center & inner pixels expand cleanly
        let scaleFactor = 0.82;
        if (cell.tier === 0) scaleFactor = 0.84 + cell.zLift * 0.11; // up to 0.95
        else if (cell.tier === 1) scaleFactor = 0.82 + cell.zLift * 0.08; // up to 0.90
        else scaleFactor = 0.82 + cell.zLift * 0.04;

        const currentSize = blockSize * scaleFactor;
        const offset = (blockSize - currentSize) / 2;

        const drawX = x + offset;
        const drawY = y + offset;

        ctx.save();
        ctx.globalAlpha = alpha;

        if (cell.tier === 0) {
          // --- TIER 0: CENTER VIBRANT ELECTRIC RED 3D LIFTED PIXEL ---
          // 1. Soft crimson ambient glow underneath
          ctx.fillStyle = `rgba(225, 29, 72, ${(alpha * 0.22).toFixed(3)})`;
          ctx.fillRect(drawX - 1, drawY - 1, currentSize + 2, currentSize + 2);

          // 2. Vibrant Red Surface
          ctx.fillStyle = cell.color;
          ctx.fillRect(drawX, drawY, currentSize, currentSize);

          // 3. 3D Bevel Specular Highlight (Top & Left edges bright white reflection)
          ctx.strokeStyle = `rgba(255, 255, 255, ${(alpha * 0.55).toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(drawX, drawY + currentSize);
          ctx.lineTo(drawX, drawY);
          ctx.lineTo(drawX + currentSize, drawY);
          ctx.stroke();

          // 4. 3D Bevel Deep Crimson Edge (Bottom & Right edges dark red, not dirty black)
          ctx.strokeStyle = `rgba(159, 18, 57, ${(alpha * 0.75).toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(drawX + currentSize, drawY);
          ctx.lineTo(drawX + currentSize, drawY + currentSize);
          ctx.lineTo(drawX, drawY + currentSize);
          ctx.stroke();
        } else if (cell.tier === 1) {
          // --- TIER 1: INNER LUMINOUS SCARLET PIXEL ---
          ctx.fillStyle = cell.color;
          ctx.fillRect(drawX, drawY, currentSize, currentSize);

          ctx.strokeStyle = `rgba(255, 255, 255, ${(alpha * 0.35).toFixed(3)})`;
          ctx.lineWidth = 0.75;
          ctx.strokeRect(drawX, drawY, currentSize, currentSize);
        } else if (cell.tier === 2) {
          // --- TIER 2: MID RADIANT CORAL PIXEL ---
          ctx.fillStyle = cell.color;
          ctx.fillRect(drawX, drawY, currentSize, currentSize);

          ctx.strokeStyle = `rgba(255, 255, 255, ${(alpha * 0.22).toFixed(3)})`;
          ctx.lineWidth = 0.5;
          ctx.strokeRect(drawX, drawY, currentSize, currentSize);
        } else {
          // --- TIER 3: OUTER SOFT ROSE PIXEL ---
          ctx.fillStyle = cell.color;
          ctx.fillRect(drawX, drawY, currentSize, currentSize);
        }

        ctx.restore();
      });

      for (const k of toDelete) {
        activeCells.delete(k);
      }

      // Loop condition: Continue while trail is active, stop when all decayed
      if (activeCells.size > 0) {
        animId = requestAnimationFrame(render);
      } else {
        isRunning = false;
        animId = null;
        ctx.clearRect(0, 0, width, height);
      }
    };

    const startLoop = () => {
      if (!isRunning) {
        isRunning = true;
        lastTime = performance.now();
        animId = requestAnimationFrame(render);
      }
    };

    // Activate a specific cell with its corresponding red tier
    const activateCell = (col: number, row: number, tier: number) => {
      if (col < 0 || row < 0) return;
      const key = `${col},${row}`;
      const existing = activeCells.get(key);

      const tierColors = RED_TIERS[Math.min(tier, RED_TIERS.length - 1)];
      const color = tierColors[Math.floor(Math.random() * tierColors.length)];

      const initialIntensity = tier === 0 ? 1.0 : tier === 1 ? 0.85 : tier === 2 ? 0.65 : 0.45;

      if (!existing) {
        activeCells.set(key, {
          col,
          row,
          tier,
          intensity: initialIntensity,
          color,
          zLift: 1.0,
        });
      } else {
        // Boost existing cell if closer tier
        if (tier <= existing.tier) {
          existing.tier = tier;
          existing.color = color;
          existing.intensity = Math.max(existing.intensity, initialIntensity);
          existing.zLift = 1.0;
        } else {
          existing.intensity = Math.max(existing.intensity, initialIntensity);
        }
      }
    };

    // Interpolate continuous path between mouse moves for silky smooth trail follow
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      if (prevMouseX === null || prevMouseY === null) {
        prevMouseX = mouseX;
        prevMouseY = mouseY;
      }

      const dist = Math.hypot(mouseX - prevMouseX, mouseY - prevMouseY);
      const steps = Math.max(1, Math.ceil(dist / (blockSize * 0.4)));

      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const curX = prevMouseX + (mouseX - prevMouseX) * t;
        const curY = prevMouseY + (mouseY - prevMouseY) * t;

        const centerCol = Math.floor(curX / blockSize);
        const centerRow = Math.floor(curY / blockSize);

        // Tier 0: Direct center cursor pixel -> Pure Vibrant Crimson / Electric Red (3D Lifted)
        activateCell(centerCol, centerRow, 0);

        // Tier 1: Cardinal direct neighbors (distance = 1) -> Luminous Scarlet Red
        activateCell(centerCol + 1, centerRow, 1);
        activateCell(centerCol - 1, centerRow, 1);
        activateCell(centerCol, centerRow + 1, 1);
        activateCell(centerCol, centerRow - 1, 1);

        // Tier 2: Diagonal neighbors (distance = ~1.4) -> Bright Coral Flame
        activateCell(centerCol + 1, centerRow + 1, 2);
        activateCell(centerCol - 1, centerRow + 1, 2);
        activateCell(centerCol + 1, centerRow - 1, 2);
        activateCell(centerCol - 1, centerRow - 1, 2);

        // Tier 3: Subtle outer halo (distance = 2) -> Soft Luminous Rose
        activateCell(centerCol + 2, centerRow, 3);
        activateCell(centerCol - 2, centerRow, 3);
        activateCell(centerCol, centerRow + 2, 3);
        activateCell(centerCol, centerRow - 2, 3);
      }

      prevMouseX = mouseX;
      prevMouseY = mouseY;

      startLoop();
    };

    const handleMouseLeave = () => {
      prevMouseX = null;
      prevMouseY = null;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [blockSize]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
};
