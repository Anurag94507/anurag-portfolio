import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Preloader } from './components/ui/Preloader';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { StatsSection } from './components/sections/StatsSection';
import { AboutSection } from './components/sections/AboutSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { ResearchSection } from './components/sections/ResearchSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { CertificationsSection } from './components/sections/CertificationsSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/layout/Footer';
import { PortfolioCompanion } from './components/character/PortfolioCompanion';
import { MultiPageView, PageId } from './components/pages/MultiPageView';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [viewMode, setViewMode] = useState<'multi-page' | 'single-page'>('multi-page');
  const [currentPage, setCurrentPage] = useState<PageId>('home');

  // Initialize Theme from localStorage or default to dark
  useEffect(() => {
    const savedTheme = (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
    setTheme(savedTheme);
    if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  }, []);

  // Initialize View Mode & Page from URL hash or localStorage
  useEffect(() => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    const validPages: PageId[] = [
      'home',
      'projects',
      'experience',
      'research',
      'skills',
      'certifications',
      'contact',
    ];

    if (hash.startsWith('page=')) {
      const pageName = hash.replace('page=', '') as PageId;
      if (validPages.includes(pageName)) {
        setCurrentPage(pageName);
        setViewMode('multi-page');
      }
    } else if (validPages.includes(hash as PageId)) {
      setCurrentPage(hash as PageId);
    }

    const savedMode = localStorage.getItem('viewMode') as 'multi-page' | 'single-page';
    if (savedMode) {
      setViewMode(savedMode);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    if (nextTheme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  };

  const toggleViewMode = () => {
    const nextMode = viewMode === 'multi-page' ? 'single-page' : 'multi-page';
    setViewMode(nextMode);
    localStorage.setItem('viewMode', nextMode);
  };

  const navigateToPage = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = `page=${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Track scroll progress for progress bar in single-page mode
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = window.scrollY || document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scrollPercent = (totalScroll / windowHeight) * 100;
        setScrollProgress(scrollPercent);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#F8FAFD] text-slate-900 dark:bg-[#060A17] dark:text-slate-100 transition-colors duration-300">
      {/* Film Grain Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-30 bg-grain opacity-30 dark:opacity-40" aria-hidden="true" />

      {/* Brand Preloader */}
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Floating Navbar */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        scrollProgress={scrollProgress}
        viewMode={viewMode}
        toggleViewMode={toggleViewMode}
        currentPage={currentPage}
        onNavigatePage={(pageId) => navigateToPage(pageId as PageId)}
      />

      {/* Main Content */}
      <main className="relative z-10 flex flex-col">
        {viewMode === 'multi-page' ? (
          <MultiPageView
            currentPage={currentPage}
            onNavigate={navigateToPage}
            onSwitchToSinglePage={() => {
              setViewMode('single-page');
              localStorage.setItem('viewMode', 'single-page');
            }}
          />
        ) : (
          <>
            <HeroSection
              onNavigateToProjects={() => {
                const el = document.getElementById('projects');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onNavigateToContact={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Embedded Aura Character Card in Single-Page Mode */}
            <div className="max-w-4xl mx-auto px-4 -mt-8 mb-12">
              <PortfolioCompanion
                variant="embedded"
                onNavigateTo={(pageId) => {
                  const el = document.getElementById(pageId);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            </div>

            <StatsSection />
            <AboutSection />
            <ExperienceSection />
            <ResearchSection />
            <ProjectsSection />
            <SkillsSection />
            <CertificationsSection />
            <ContactSection />
          </>
        )}
      </main>

      {/* Floating Animated Mascot Character (Aura Companion) */}
      <PortfolioCompanion
        variant="floating"
        onNavigateTo={(pageId) => {
          if (viewMode === 'multi-page') {
            navigateToPage(pageId as PageId);
          } else {
            const el = document.getElementById(pageId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
