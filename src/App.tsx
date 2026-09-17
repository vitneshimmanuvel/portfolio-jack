import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { PixelLoader } from './components/PixelLoader';
import { FloatingSocials } from './components/FloatingSocials';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';

export function App() {
  const [isLoaderActive, setIsLoaderActive] = useState(true);

  // Initialize smooth Lenis scroll
  useEffect(() => {
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
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-[#efeff1] text-[#0a0a0a] antialiased overflow-x-hidden">
      {/* 2-Second Center-Expanding Pixel Shrink Loader */}
      {isLoaderActive && (
        <PixelLoader
          duration={2000}
          blockSize={20}
          onComplete={() => setIsLoaderActive(false)}
        />
      )}

      {/* Floating Edge Socials on Right Hand Side */}
      <FloatingSocials />

      {/* Full Fluid Width Scroll-Revealed Sections */}
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <EducationSection />
      <ContactSection />
    </main>
  );
}

export default App;
