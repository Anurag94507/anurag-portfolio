import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  ArrowRight,
  FileDown,
  Mail,
  Terminal,
  Sparkles,
  Phone,
  Briefcase,
  ShieldCheck,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from '../ui/Icons';
import { personalInfo } from '../../data/personal';
import { HeroBackground3D } from '../canvas/HeroBackground3D';
import { RecruiterBriefModal } from '../ui/RecruiterBriefModal';

interface HeroSectionProps {
  onNavigateToProjects?: () => void;
  onNavigateToContact?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigateToProjects,
  onNavigateToContact,
}) => {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRecruiterModalOpen, setIsRecruiterModalOpen] = useState(false);

  // 3D Parallax Tilt for Avatar
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 220, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 220, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Typewriter effect
  useEffect(() => {
    const titles = personalInfo.titles;
    const currentFullTitle = titles[currentTitleIndex];

    const typingSpeed = isDeleting ? 40 : 80;
    const pauseBeforeDelete = 2000;

    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === currentFullTitle) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, pauseBeforeDelete);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
    } else {
      timer = setTimeout(() => {
        const nextChar = isDeleting
          ? currentFullTitle.substring(0, displayText.length - 1)
          : currentFullTitle.substring(0, displayText.length + 1);
        setDisplayText(nextChar);
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentTitleIndex]);

  const whatsappUrl = "https://wa.me/917800509636?text=Hi%20Anurag,%20I%20saw%20your%20portfolio";
  const callUrl = `tel:${personalInfo.contact.phone}`;
  const mailUrl = `mailto:${personalInfo.contact.email}`;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden perspective-1000"
    >
      {/* 3D Particle Constellation Background */}
      <HeroBackground3D />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* ========================================================
            3D ANIMATED AVATAR SHOWCASE (ENTRANCE ON REFRESH & LOAD)
           ======================================================== */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          initial={{ scale: 0.25, opacity: 0, y: -70, rotateY: -35, rotateX: 25, filter: 'blur(10px)' }}
          animate={{ scale: 1, opacity: 1, y: 0, rotateY: 0, rotateX: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-6 cursor-pointer select-none group"
        >
          {/* Volumetric Radial Ambient Energy Field */}
          <div className="absolute -inset-8 bg-gradient-to-tr from-neon-cyan/25 via-indigo-600/20 to-neon-violet/25 blur-3xl rounded-full opacity-70 group-hover:opacity-100 transition-opacity animate-pulse pointer-events-none" />

          {/* Opposing Rotating Orbital Cyber Rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 16, ease: 'linear' }}
            className="absolute -inset-4 rounded-full border border-dashed border-neon-cyan/50 pointer-events-none"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 22, ease: 'linear' }}
            className="absolute -inset-7 rounded-full border border-dotted border-neon-violet/40 pointer-events-none"
          />

          {/* Core Avatar Frame */}
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full p-1.5 bg-gradient-to-tr from-neon-cyan via-indigo-500 to-neon-violet shadow-[0_0_50px_rgba(0,245,255,0.5)] transform-gpu transition-transform group-hover:scale-105">
            <img
              src={personalInfo.avatarUrl}
              alt="Anurag Mishra - Full-Stack Developer & AI Researcher"
              className="w-full h-full rounded-full object-cover object-center border-2 border-slate-950 shadow-inner"
            />
            {/* Dynamic Specular Sheen on hover */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>

          {/* Live Availability Status Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-950/95 backdrop-blur-md px-3.5 py-1 rounded-full border border-emerald-500/50 flex items-center gap-1.5 shadow-xl whitespace-nowrap"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
              Ready for Hire &bull; Immediate
            </span>
          </motion.div>
        </motion.div>

        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-white/10 dark:border-white/10 mb-6 shadow-lg hover:border-neon-cyan/40 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-neon-cyan" />
          <span className="text-xs font-mono font-medium text-slate-700 dark:text-slate-200">
            {personalInfo.availability} &bull; B.Tech IT '27
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="space-y-3"
        >
          <p className="text-sm md:text-base font-mono uppercase tracking-[0.25em] text-neon-cyan flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-neon-violet inline" />
            Hello World, I'm
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight text-slate-950 dark:text-white">
            Anurag <span className="gradient-text">Mishra</span>
          </h1>
        </motion.div>

        {/* Typewriter Dynamic Role Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="mt-6 flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl glass-panel border border-neon-cyan/20 min-h-[52px]"
        >
          <Terminal className="w-4 h-4 text-neon-cyan flex-shrink-0" />
          <span className="text-base sm:text-xl md:text-2xl font-mono font-medium text-slate-800 dark:text-slate-200">
            {displayText}
          </span>
          <span className="w-2.5 h-6 bg-neon-cyan animate-pulse flex-shrink-0" />
        </motion.div>

        {/* Authoritative Personal Introduction */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="mt-6 max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-300/90 leading-relaxed font-sans"
        >
          Welcome to my official portfolio. I am an Information Technology undergraduate at{' '}
          <span className="font-semibold text-slate-800 dark:text-white">Dr. Ram Manohar Lohia Avadh University</span>, Ayodhya (2023–2027), architecting production-grade full-stack systems, real-time DevOps observability telemetry, and applied AI systems with research presented at{' '}
          <span className="text-neon-cyan font-semibold">ICNACT 2026</span>.
        </motion.p>

        {/* 3 Core Highlights Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7 }}
          className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400"
        >
          <span className="px-3 py-1 rounded-full bg-slate-200/70 dark:bg-slate-900/70 border border-slate-300 dark:border-white/10">
            ⚡ Telemetry & Observability @ C-DAC
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-200/70 dark:bg-slate-900/70 border border-slate-300 dark:border-white/10">
            🔬 IEEE Research Paper @ ICNACT 2026
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-200/70 dark:bg-slate-900/70 border border-slate-300 dark:border-white/10">
            🏛️ Systems for CDO Ayodhya
          </span>
        </motion.div>

        {/* Primary Call-to-Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3.5"
        >
          {/* Executive Recruiter Brief Button (Targeted at Employers) */}
          <button
            onClick={() => setIsRecruiterModalOpen(true)}
            className="group relative inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-neon-cyan via-indigo-600 to-neon-violet text-dark-bg font-bold text-sm shadow-glow-cyan hover:shadow-[0_0_35px_rgba(0,245,255,0.6)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <Briefcase className="w-4 h-4 text-dark-bg" />
            <span>Executive Brief for Employers</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Action: View Projects */}
          <a
            href="#projects"
            onClick={(e) => {
              if (onNavigateToProjects) {
                e.preventDefault();
                onNavigateToProjects();
              }
            }}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full glass-card border border-white/15 hover:border-neon-cyan/50 text-slate-800 dark:text-slate-200 hover:text-white font-medium text-sm hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span>View Projects</span>
          </a>

          {/* Action: Download Resume */}
          <a
            href={personalInfo.contact.resumeUrl}
            download="Anurag_Mishra_Resume.pdf"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full glass-card border border-white/15 hover:border-neon-cyan/50 text-slate-800 dark:text-slate-200 hover:text-white font-medium text-sm hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <FileDown className="w-4 h-4 text-neon-cyan" />
            <span>Download Resume</span>
          </a>

          {/* Contact Me Group */}
          <a
            href="#contact"
            onClick={(e) => {
              if (onNavigateToContact) {
                e.preventDefault();
                onNavigateToContact();
              }
            }}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full glass-card border border-white/10 hover:border-neon-violet/50 text-slate-800 dark:text-slate-200 hover:text-white font-medium text-sm transition-all hover:scale-105 active:scale-95"
          >
            <Mail className="w-4 h-4 text-neon-violet" />
            <span>Get In Touch</span>
          </a>

          {/* Quick Direct Connect Links beside Contact Me */}
          <div className="flex items-center gap-2 pl-1">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-400 font-medium text-xs hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)]"
            >
              <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp</span>
            </a>

            <a
              href={callUrl}
              aria-label="Direct Phone Call"
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/40 text-sky-400 font-medium text-xs hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(14,165,233,0.2)]"
            >
              <Phone className="w-3.5 h-3.5 text-sky-400" />
              <span>Call</span>
            </a>
          </div>
        </motion.div>

        {/* Social Proof Channels */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.8 }}
          className="mt-12 flex items-center justify-center gap-3 text-slate-400"
        >
          <a
            href={personalInfo.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-3 rounded-full glass-card hover:text-white hover:border-neon-cyan/50 transition-all hover:-translate-y-1"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={personalInfo.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-3 rounded-full glass-card hover:text-white hover:border-neon-cyan/50 transition-all hover:-translate-y-1"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Message"
            className="p-3 rounded-full glass-card hover:text-white hover:border-emerald-500/50 transition-all hover:-translate-y-1 text-emerald-400"
          >
            <WhatsAppIcon className="w-4 h-4" />
          </a>
          <a
            href={callUrl}
            aria-label="Phone Call"
            className="p-3 rounded-full glass-card hover:text-white hover:border-neon-cyan/50 transition-all hover:-translate-y-1"
          >
            <Phone className="w-4 h-4" />
          </a>
          <a
            href={mailUrl}
            aria-label="Send Email"
            className="p-3 rounded-full glass-card hover:text-white hover:border-neon-cyan/50 transition-all hover:-translate-y-1"
          >
            <Mail className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      {/* Recruiter & Employer Quick Pitch Modal */}
      <RecruiterBriefModal
        isOpen={isRecruiterModalOpen}
        onClose={() => setIsRecruiterModalOpen(false)}
      />
    </section>
  );
};
