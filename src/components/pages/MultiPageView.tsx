import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Home,
  Briefcase,
  FlaskConical,
  Code,
  Award,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { HeroSection } from '../sections/HeroSection';
import { StatsSection } from '../sections/StatsSection';
import { AboutSection } from '../sections/AboutSection';
import { ExperienceSection } from '../sections/ExperienceSection';
import { ResearchSection } from '../sections/ResearchSection';
import { ProjectsSection } from '../sections/ProjectsSection';
import { SkillsSection } from '../sections/SkillsSection';
import { CertificationsSection } from '../sections/CertificationsSection';
import { ContactSection } from '../sections/ContactSection';
import { PortfolioCompanion } from '../character/PortfolioCompanion';

export type PageId =
  | 'home'
  | 'projects'
  | 'experience'
  | 'research'
  | 'skills'
  | 'certifications'
  | 'contact';

interface MultiPageViewProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onSwitchToSinglePage: () => void;
}

const pageSequence: { id: PageId; title: string; subtitle: string; icon: React.ReactNode }[] = [
  { id: 'home', title: 'Home & Overview', subtitle: 'Elevator pitch & core foundation', icon: <Home className="w-4 h-4" /> },
  { id: 'projects', title: 'Projects & Labs', subtitle: 'Full-stack & open-source engineering', icon: <Code className="w-4 h-4" /> },
  { id: 'experience', title: 'Experience & Impact', subtitle: 'C-DAC, IIIT Raipur & Ayodhya Gov', icon: <Briefcase className="w-4 h-4" /> },
  { id: 'research', title: 'AI Research & Paper', subtitle: 'ICNACT 2026 IEEE publication & gaps', icon: <FlaskConical className="w-4 h-4" /> },
  { id: 'skills', title: 'Technical Arsenal', subtitle: 'DevOps, cloud & languages radar', icon: <Code className="w-4 h-4" /> },
  { id: 'certifications', title: 'Credentials & Honors', subtitle: 'Verified awards & coursework', icon: <Award className="w-4 h-4" /> },
  { id: 'contact', title: 'Contact & Inquiries', subtitle: 'Direct channel & interactive assistant', icon: <MessageSquare className="w-4 h-4" /> },
];

export const MultiPageView: React.FC<MultiPageViewProps> = ({
  currentPage,
  onNavigate,
  onSwitchToSinglePage,
}) => {
  const currentIndex = pageSequence.findIndex((p) => p.id === currentPage);
  const prevPage = currentIndex > 0 ? pageSequence[currentIndex - 1] : null;
  const nextPage = currentIndex < pageSequence.length - 1 ? pageSequence[currentIndex + 1] : null;

  // Scroll to top when switching pages
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 max-w-7xl mx-auto flex flex-col">
      {/* ========================================================
          PAGE TOP BAR: BREADCRUMBS & VIEW MODE BADGE
         ======================================================== */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-neon-cyan transition-colors flex items-center gap-1"
          >
            <Home className="w-3.5 h-3.5" />
            <span>anuragmishra.dev</span>
          </button>
          <span>/</span>
          <span className="text-neon-cyan font-bold uppercase tracking-wider">
            {currentPage}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
            <span>Webpage Mode: Page {currentIndex + 1} of {pageSequence.length}</span>
          </div>

          <button
            onClick={onSwitchToSinglePage}
            className="text-xs font-mono text-slate-400 hover:text-white px-3 py-1 rounded-full border border-white/10 hover:border-white/30 transition-colors"
            title="Switch to continuous one-page scroll"
          >
            Switch to 📜 Continuous Scroll
          </button>
        </div>
      </div>

      {/* ========================================================
          PAGE CONTENT CONTAINER WITH TRANSITION
         ======================================================== */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="flex-1"
        >
          {currentPage === 'home' && (
            <div className="space-y-12">
              <HeroSection onNavigateToProjects={() => onNavigate('projects')} onNavigateToContact={() => onNavigate('contact')} />

              {/* Embedded Aura Character Guide Card */}
              <div className="max-w-4xl mx-auto px-4">
                <PortfolioCompanion variant="embedded" onNavigateTo={(page) => onNavigate(page as PageId)} />
              </div>

              <StatsSection />
              <AboutSection />
            </div>
          )}

          {currentPage === 'projects' && (
            <div>
              <ProjectsSection />
            </div>
          )}

          {currentPage === 'experience' && (
            <div>
              <ExperienceSection />
            </div>
          )}

          {currentPage === 'research' && (
            <div>
              <ResearchSection />
            </div>
          )}

          {currentPage === 'skills' && (
            <div>
              <SkillsSection />
            </div>
          )}

          {currentPage === 'certifications' && (
            <div>
              <CertificationsSection />
            </div>
          )}

          {currentPage === 'contact' && (
            <div>
              <ContactSection />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* ========================================================
          BOTTOM WEBPAGE NAVIGATION CONTROLS (PAGINATION)
         ======================================================== */}
      <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        {prevPage ? (
          <button
            onClick={() => onNavigate(prevPage.id)}
            className="flex items-center gap-3 px-5 py-3 rounded-2xl glass-card border border-white/10 hover:border-neon-cyan/40 text-slate-300 hover:text-white transition-all w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4 text-neon-cyan" />
            <div className="text-left">
              <span className="text-[10px] font-mono uppercase text-slate-500 block">Previous Webpage</span>
              <span className="text-sm font-semibold">{prevPage.title}</span>
            </div>
          </button>
        ) : (
          <div className="hidden sm:block" />
        )}

        {/* Quick Page Bubbles */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-1">
          {pageSequence.map((page, idx) => (
            <button
              key={page.id}
              onClick={() => onNavigate(page.id)}
              className={`w-8 h-8 rounded-full text-xs font-mono font-bold flex items-center justify-center transition-all ${
                currentPage === page.id
                  ? 'bg-neon-cyan text-dark-bg shadow-glow-cyan scale-110'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-white/10'
              }`}
              title={page.title}
            >
              {idx + 1}
            </button>
          ))}
        </div>

        {nextPage ? (
          <button
            onClick={() => onNavigate(nextPage.id)}
            className="flex items-center justify-between sm:justify-start gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950/80 border border-neon-cyan/30 hover:border-neon-cyan/60 text-slate-200 hover:text-white transition-all w-full sm:w-auto shadow-md"
          >
            <div className="text-left sm:text-right">
              <span className="text-[10px] font-mono uppercase text-neon-cyan block">Next Webpage</span>
              <span className="text-sm font-semibold">{nextPage.title}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-neon-cyan" />
          </button>
        ) : (
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl glass-card border border-neon-cyan/30 text-neon-cyan hover:text-white transition-all w-full sm:w-auto"
          >
            <span>Back to Home Hub</span>
            <Home className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

