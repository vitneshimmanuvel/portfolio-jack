import React, { useEffect, useRef, useState, useCallback } from 'react';

interface PixelLoaderProps {
  onComplete?: () => void;
  duration?: number; // Total duration in ms (~2000ms - 2200ms)
  blockSize?: number; // Size of each pixel square (20px - 20% larger chunky pixels)
}

// Global smooth cubic ease-in-out
const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

// Smooth cubic shrink for individual pixel blocks
const smoothShrink = (t: number): number => {
  const clamped = Math.max(0, Math.min(1, t));
  return 1 - (3 * clamped * clamped - 2 * clamped * clamped * clamped);
};

export const PixelLoader: React.FC<PixelLoaderProps> = ({
  onComplete,
  duration = 2000,
  blockSize = 20,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  const startAnimation = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const startTime = performance.now();

    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    // Diagonal oval reveal angle (-32 degrees)
    const angle = -0.56;
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);
    const fadeWindow = 0.22; // Shrink transition window per pixel

    const render = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      
      const globalProgress = easeInOutCubic(rawProgress);

      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2;
      const maxDist = Math.hypot(cx, cy) * 1.28;

      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / blockSize);
      const rows = Math.ceil(height / blockSize);

      let remainingPixels = 0;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const pxCenterX = c * blockSize + blockSize / 2;
          const pxCenterY = r * blockSize + blockSize / 2;

          // Rotated ellipse distance from center
          const dx = pxCenterX - cx;
          const dy = pxCenterY - cy;
          const rx = dx * cosA - dy * sinA;
          const ry = dx * sinA + dy * cosA;

          const dist = Math.sqrt((rx / 1.5) * (rx / 1.5) + (ry / 0.9) * (ry / 0.9));
          const normDist = dist / maxDist;

          // Organic jitter for stepped jagged edges
          const jitter = (((Math.sin(c * 12.9898 + r * 78.233) * 43758.5453) % 1) * 0.16) - 0.08;
          const cellThreshold = Math.max(0, Math.min(0.82, normDist + jitter));

          if (globalProgress < cellThreshold) {
            // Pixel is fully black at scale 1.0
            ctx.fillStyle = '#000000';
            ctx.fillRect(c * blockSize, r * blockSize, blockSize, blockSize);
            remainingPixels++;
          } else {
            const localProgress = (globalProgress - cellThreshold) / fadeWindow;

            if (localProgress < 1.0) {
              // Pixel scales down into its own center with easeInOut
              const scale = smoothShrink(localProgress);
              const alpha = Math.max(0, Math.min(1, scale * 1.15));

              if (scale > 0.01 && alpha > 0.01) {
                const currentSize = blockSize * scale;
                const drawX = pxCenterX - currentSize / 2;
                const drawY = pxCenterY - currentSize / 2;

                ctx.fillStyle = `rgba(0, 0, 0, ${alpha.toFixed(3)})`;
                ctx.fillRect(drawX, drawY, currentSize, currentSize);
                remainingPixels++;
              }
            }
          }
        }
      }

      if (rawProgress < 1.0 || remainingPixels > 0) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        setTimeout(() => {
          setIsVisible(false);
          if (onComplete) onComplete();
        }, 50);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [duration, blockSize, onComplete]);

  useEffect(() => {
    setIsVisible(true);
    const cleanup = startAnimation();
    return cleanup;
  }, [startAnimation]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none select-none overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />
    </div>
  );
};
