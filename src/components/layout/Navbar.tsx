import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun,
  Moon,
  Menu,
  X,
  FileDown,
  Sparkles,
  Layers,
  Scroll,
} from 'lucide-react';
import { personalInfo } from '../../data/personal';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  scrollProgress: number;
  viewMode: 'multi-page' | 'single-page';
  toggleViewMode: () => void;
  currentPage: string;
  onNavigatePage: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  toggleTheme,
  scrollProgress,
  viewMode,
  toggleViewMode,
  currentPage,
  onNavigatePage,
}) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { name: 'Home', id: 'home', href: '#hero' },
    { name: 'Projects', id: 'projects', href: '#projects' },
    { name: 'Experience', id: 'experience', href: '#experience' },
    { name: 'Research', id: 'research', href: '#research' },
    { name: 'Skills', id: 'skills', href: '#skills' },
    { name: 'Certifications', id: 'certifications', href: '#certifications' },
    { name: 'Contact', id: 'contact', href: '#contact' },
  ];

  // Track scroll position in single-page mode
  useEffect(() => {
    if (viewMode === 'multi-page') return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['hero', 'about', 'experience', 'research', 'projects', 'skills', 'certifications', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId === 'hero' ? 'home' : sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [viewMode]);

  const handleLinkClick = (e: React.MouseEvent, id: string, href: string) => {
    if (viewMode === 'multi-page') {
      e.preventDefault();
      onNavigatePage(id);
      setMobileMenuOpen(false);
    } else {
      setMobileMenuOpen(false);
    }
  };

  const isCurrentActive = (id: string) => {
    if (viewMode === 'multi-page') {
      return currentPage === id;
    }
    return activeSection === id || (id === 'home' && activeSection === 'hero');
  };

  return (
    <>
      {/* Scroll Progress Bar (Single-Page Mode) */}
      {viewMode === 'single-page' && (
        <div
          className="fixed top-0 left-0 right-0 h-[3px] bg-transparent z-50 pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="h-full bg-gradient-to-r from-neon-cyan via-indigo-500 to-neon-violet shadow-[0_0_10px_#00F0FF]"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      )}

      {/* Floating Pill Header */}
      <header className="fixed top-4 left-0 right-0 z-40 px-3 sm:px-4 transition-all duration-300 flex justify-center">
        <div
          className={`w-full max-w-6xl mx-auto rounded-full px-4 sm:px-5 py-2.5 sm:py-3 flex items-center justify-between transition-all duration-300 ${
            isScrolled || viewMode === 'multi-page'
              ? 'glass-panel shadow-2xl backdrop-blur-xl border border-white/10'
              : 'bg-slate-950/40 backdrop-blur-md border border-white/5'
          }`}
        >
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, 'home', '#hero')}
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none"
            aria-label="Anurag Mishra - Back to Top"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full p-[1.5px] bg-gradient-to-tr from-neon-cyan to-neon-violet group-hover:shadow-[0_0_15px_#00F0FF] transition-shadow">
              <div className="w-full h-full rounded-full bg-dark-bg flex items-center justify-center">
                <span className="font-display font-bold text-xs sm:text-sm tracking-tighter text-white">
                  AM
                </span>
              </div>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-display font-semibold text-xs sm:text-sm tracking-tight text-slate-900 dark:text-white group-hover:text-neon-cyan transition-colors">
                Anurag Mishra
              </span>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 -mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for Roles
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-200/70 dark:bg-slate-900/60 p-1 rounded-full border border-slate-300 dark:border-white/5">
            {navLinks.map((link) => {
              const active = isCurrentActive(link.id);
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.id, link.href)}
                  className={`relative px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                    active
                      ? 'text-slate-950 dark:text-white font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-gradient-to-r from-neon-cyan/25 to-neon-violet/25 border border-neon-cyan/50 rounded-full -z-10 shadow-[0_0_12px_rgba(0,245,255,0.25)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Controls: Mode Switcher, Theme Toggle, Resume, Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* View Mode Switcher Pill */}
            <button
              onClick={toggleViewMode}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-900/80 dark:hover:bg-slate-800 border border-slate-300 dark:border-white/10 hover:border-neon-cyan/40 text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm"
              title={viewMode === 'multi-page' ? 'Switch to Single-Page Scroll' : 'Switch to Multi-Webpage View'}
            >
              {viewMode === 'multi-page' ? (
                <>
                  <Layers className="w-3.5 h-3.5 text-neon-cyan" />
                  <span className="text-neon-cyan font-bold">Multi-Page</span>
                </>
              ) : (
                <>
                  <Scroll className="w-3.5 h-3.5 text-slate-400" />
                  <span>Single-Page</span>
                </>
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="p-2 rounded-full text-slate-300 hover:text-white bg-slate-800/70 hover:border-neon-cyan/40 border border-white/10 transition-all focus:outline-none"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-300 hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-400 hover:-rotate-12 transition-transform" />
              )}
            </button>

            {/* Resume Button */}
            <a
              href={personalInfo.contact.resumeUrl}
              download="Anurag_Mishra_Resume.pdf"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-neon-cyan to-indigo-600 text-dark-bg hover:shadow-glow-cyan transition-all hover:scale-105 active:scale-95"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-slate-800/80 text-slate-300 hover:text-white border border-white/10 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-20 z-40 lg:hidden rounded-3xl glass-panel border border-neon-cyan/20 p-5 shadow-2xl backdrop-blur-2xl"
          >
            {/* View mode toggle in mobile */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 mb-3">
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Navigation Mode:</span>
              <button
                onClick={toggleViewMode}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-cyan/20 border border-neon-cyan/40 text-neon-cyan text-xs font-mono"
              >
                {viewMode === 'multi-page' ? '📑 Multi-Page View' : '📜 Single-Page Flow'}
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const active = isCurrentActive(link.id);
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.id, link.href)}
                    className={`flex items-center justify-between p-3 rounded-2xl font-medium transition-colors ${
                      active
                        ? 'bg-neon-cyan/15 text-neon-cyan font-bold border border-neon-cyan/40'
                        : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-neon-cyan'
                    }`}
                  >
                    <span>{link.name}</span>
                    <Sparkles className="w-3.5 h-3.5 text-slate-500" />
                  </a>
                );
              })}

              <div className="pt-3 border-t border-white/10 flex flex-col gap-2 mt-2">
                <a
                  href={personalInfo.contact.resumeUrl}
                  download="Anurag_Mishra_Resume.pdf"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-neon-cyan to-indigo-600 text-dark-bg font-semibold text-xs shadow-glow-cyan"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Download Resume PDF</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
