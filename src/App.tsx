import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import Lenis from 'lenis';
import { PixelLoader } from './components/PixelLoader';
import { InteractivePixelGrid } from './components/InteractivePixelGrid';
import { FloatingSocials } from './components/FloatingSocials';
import { ModeSwitcher, type PortfolioMode } from './components/ModeSwitcher';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';

const TextPortalHero = lazy(() => import('./components/TextPortalHero'));

function getModeFromLocation(): PortfolioMode {
  if (typeof window === 'undefined') return 'normal';
  const path = window.location.pathname.toLowerCase();
  const params = new URLSearchParams(window.location.search);
  if (path === '/3d' || path.startsWith('/3d/') || params.get('mode') === '3d') {
    return '3d';
  }
  return 'normal';
}

export function App() {
  const [isLoaderActive, setIsLoaderActive] = useState(true);
  const [mode, setMode] = useState<PortfolioMode>(() => getModeFromLocation());

  const handleLoaderComplete = useCallback(() => {
    setIsLoaderActive(false);
  }, []);

  const handleModeChange = useCallback((nextMode: PortfolioMode) => {
    setMode(nextMode);
    const targetPath = nextMode === '3d' ? '/3d' : '/';
    if (window.location.pathname !== targetPath || window.location.search) {
      window.history.pushState(null, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  // Keep mode synced on browser Back / Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setMode(getModeFromLocation());
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Preload 3D portal bundle quietly after initial pixel loader finishes for instant switching
  useEffect(() => {
    if (!isLoaderActive) {
      void import('./components/TextPortalHero');
    }
  }, [isLoaderActive]);

  // Initialize smooth Lenis scroll exclusively in Normal mode
  useEffect(() => {
    if (mode !== 'normal') return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [mode]);

  return (
    <main
      className={
        mode === '3d'
          ? 'fixed inset-0 w-full h-full overflow-hidden bg-[#030306] text-[#0a0a0a] antialiased select-none'
          : 'relative min-h-screen w-full bg-[#efeff1] text-[#0a0a0a] antialiased overflow-x-hidden'
      }
    >
      {/* 2-Second Center-Expanding Pixel Shrink Loader */}
      {isLoaderActive && (
        <PixelLoader
          duration={2000}
          blockSize={20}
          onComplete={handleLoaderComplete}
        />
      )}

      {/* Mode Switcher: Normal Portfolio vs 3D Portal Experience */}
      <ModeSwitcher mode={mode} onChange={handleModeChange} />

      {/* Floating Edge Socials on Right Hand Side */}
      <FloatingSocials />

      {mode === 'normal' ? (
        <>
          {/* Interactive Vibrant Crimson Pixel Grid Background */}
          <InteractivePixelGrid blockSize={20} />

          {/* Full Fluid Width Scroll-Revealed Sections */}
          <div className="relative z-10">
            <HeroSection />
            <AboutSection />
            <ExperienceSection />
            <ProjectsSection />
            <SkillsSection />
            <EducationSection />
            <ContactSection />
          </div>
        </>
      ) : (
        <Suspense
          fallback={
            <div className="fixed inset-0 w-full h-full bg-[#efeff1] flex items-center justify-center text-xs font-mono uppercase tracking-widest text-[#555555]">
              Loading 3D Space...
            </div>
          }
        >
          <TextPortalHero />
        </Suspense>
      )}
    </main>
  );
}

export default App;
