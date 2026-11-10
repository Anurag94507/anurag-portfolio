import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Volume2,
  VolumeX,
  X,
  MessageSquare,
  ArrowRight,
  Code2,
  Brain,
  Rocket,
  CheckCircle2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalInfo } from '../../data/personal';

interface PortfolioCompanionProps {
  onNavigateTo?: (pageId: string) => void;
  variant?: 'floating' | 'embedded';
}

interface DialogueNode {
  id: string;
  speaker: string;
  text: string;
  actionText?: string;
  actionPage?: string;
  options?: { label: string; nextId: string; icon?: React.ReactNode }[];
}

const dialogueTree: Record<string, DialogueNode> = {
  start: {
    id: 'start',
    speaker: 'Aura',
    text: "Hey there! I'm Aura, Anurag's AI co-pilot. Anurag is an IT Engineer, DevOps specialist, and AI researcher. What would you like to explore?",
    options: [
      { label: '🚀 Tell me who Anurag is', nextId: 'about_anurag' },
      { label: '📁 Show top projects', nextId: 'projects_info' },
      { label: '🔬 Explain ICNACT 2026 paper', nextId: 'research_info' },
      { label: '💬 Send a message to Anurag', nextId: 'contact_info' },
    ],
  },
  about_anurag: {
    id: 'about_anurag',
    speaker: 'Aura',
    text: 'Anurag is currently pursuing his B.Tech in IT at Dr. Ram Manohar Lohia Avadh University (2023-2027). He has engineered telemetry at C-DAC Thiruvananthapuram and deployed systems for government initiatives in Ayodhya!',
    options: [
      { label: '🛠️ What is his tech stack?', nextId: 'skills_info' },
      { label: '🔬 Tell me about his research', nextId: 'research_info' },
      { label: '💬 Connect with Anurag', nextId: 'contact_info' },
    ],
  },
  skills_info: {
    id: 'skills_info',
    speaker: 'Aura',
    text: 'His stack is rock-solid: TypeScript, React, Node.js, Python, Express, MongoDB, along with DevOps telemetry (Prometheus, Grafana, Docker, Linux CI/CD pipelines).',
    actionText: 'Explore Tech Radar & Skills',
    actionPage: 'skills',
    options: [
      { label: '📁 See projects using these', nextId: 'projects_info' },
      { label: '💬 Send an inquiry', nextId: 'contact_info' },
      { label: '🔄 Back to menu', nextId: 'start' },
    ],
  },
  projects_info: {
    id: 'projects_info',
    speaker: 'Aura',
    text: 'Anurag has shipped 6+ production apps: from automated Ayodhya citizen dispute portals to multi-agent AI research platforms and full-stack observability pipelines!',
    actionText: 'Browse All Projects Gallery',
    actionPage: 'projects',
    options: [
      { label: '🔬 Tell me about the AI research', nextId: 'research_info' },
      { label: '💬 Connect with Anurag', nextId: 'contact_info' },
      { label: '🔄 Back to menu', nextId: 'start' },
    ],
  },
  research_info: {
    id: 'research_info',
    speaker: 'Aura',
    text: 'His paper at ICNACT 2026 (VIT Bhopal) identified 10 deployment gaps in cattle welfare AI, designing an Edge-Cloud temporal graph transformer with SHAP explainability!',
    actionText: 'View IEEE Paper & Gaps',
    actionPage: 'research',
    options: [
      { label: '🎉 Celebrate achievement', nextId: 'celebrate' },
      { label: '💬 Contact Anurag directly', nextId: 'contact_info' },
      { label: '🔄 Back to menu', nextId: 'start' },
    ],
  },
  celebrate: {
    id: 'celebrate',
    speaker: 'Aura',
    text: "Woohoo! High five! Anurag is always pushing the boundaries of software engineering and applied AI. Let's make something great together!",
    options: [
      { label: '💬 Connect with Anurag', nextId: 'contact_info' },
      { label: '🔄 Back to menu', nextId: 'start' },
    ],
  },
  contact_info: {
    id: 'contact_info',
    speaker: 'Aura',
    text: 'Anurag is currently online and open for DevOps, Full-Stack, and AI engineering opportunities! You can send an inquiry directly or reach him on WhatsApp.',
    actionText: 'Open Interactive Assistant',
    actionPage: 'contact',
    options: [
      { label: '🚀 Learn more about his projects', nextId: 'projects_info' },
      { label: '🔄 Back to menu', nextId: 'start' },
    ],
  },
};

export const PortfolioCompanion: React.FC<PortfolioCompanionProps> = ({
  onNavigateTo,
  variant = 'floating',
}) => {
  const [isOpen, setIsOpen] = useState(variant === 'embedded');
  const [currentNodeId, setCurrentNodeId] = useState('start');
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isWaving, setIsWaving] = useState(false);
  const [eyeState, setEyeState] = useState<'normal' | 'happy' | 'blink' | 'wink'>('normal');

  const currentNode = dialogueTree[currentNodeId] || dialogueTree.start;

  // Eye blinking animation cycle
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setEyeState('blink');
      setTimeout(() => setEyeState('normal'), 220);
    }, 4500);
    return () => clearInterval(blinkInterval);
  }, []);

  // Text to speech when voice enabled
  useEffect(() => {
    if (voiceEnabled && 'speechSynthesis' in window && isOpen) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentNode.text);
      utterance.rate = 1.05;
      utterance.pitch = 1.15;
      window.speechSynthesis.speak(utterance);
    }
  }, [currentNodeId, voiceEnabled, isOpen]);

  const handleSelectOption = (nextId: string) => {
    if (nextId === 'celebrate') {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#00F0FF', '#8B5CF6', '#10B981'],
      });
      setEyeState('happy');
      setIsWaving(true);
      setTimeout(() => setIsWaving(false), 2000);
    } else {
      setEyeState('happy');
      setTimeout(() => setEyeState('normal'), 800);
    }
    setCurrentNodeId(nextId);
  };

  const handleActionClick = (pageId: string) => {
    if (onNavigateTo) {
      onNavigateTo(pageId);
    } else {
      const el = document.getElementById(pageId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleVoice = () => {
    const next = !voiceEnabled;
    setVoiceEnabled(next);
    if (!next && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  // Render SVG Robot Character
  const renderRobotAvatar = (size = 'w-16 h-16') => (
    <div
      onClick={() => {
        setIsWaving(true);
        setEyeState('wink');
        setTimeout(() => {
          setIsWaving(false);
          setEyeState('normal');
        }, 1200);
      }}
      className={`relative ${size} flex-shrink-0 cursor-pointer select-none group`}
      title="Click me to wave!"
    >
      {/* Holographic Pulse Aura */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400/30 via-indigo-500/20 to-purple-500/30 blur-md animate-pulse" />

      {/* Futuristic Floating Bot SVG */}
      <svg
        viewBox="0 0 100 100"
        className={`w-full h-full relative z-10 drop-shadow-[0_0_12px_rgba(0,240,255,0.6)] ${
          isWaving ? 'animate-bounce' : 'animate-float'
        }`}
      >
        <defs>
          <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B132B" />
            <stop offset="50%" stopColor="#1C2541" />
            <stop offset="100%" stopColor="#3A506B" />
          </linearGradient>
          <linearGradient id="faceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#050814" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="cyanNeon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
          <linearGradient id="violetNeon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>

        {/* Antenna */}
        <line x1="50" y1="22" x2="50" y2="12" stroke="#00F0FF" strokeWidth="3" strokeLinecap="round" />
        <circle cx="50" cy="10" r="4.5" fill="#00F0FF" className="animate-ping" style={{ transformOrigin: '50px 10px' }} />
        <circle cx="50" cy="10" r="4" fill="#00F0FF" />

        {/* Floating Ring / Orbit */}
        <ellipse
          cx="50"
          cy="78"
          rx="32"
          ry="9"
          fill="none"
          stroke="url(#cyanNeon)"
          strokeWidth="1.8"
          strokeDasharray="4 3"
          className="animate-spin"
          style={{ transformOrigin: '50px 78px', animationDuration: '8s' }}
        />

        {/* Head Base */}
        <rect
          x="22"
          y="22"
          width="56"
          height="48"
          rx="18"
          fill="url(#bodyGrad)"
          stroke="url(#cyanNeon)"
          strokeWidth="2"
        />

        {/* Visor Screen */}
        <rect
          x="28"
          y="30"
          width="44"
          height="28"
          rx="10"
          fill="url(#faceGrad)"
          stroke="rgba(0, 240, 255, 0.4)"
          strokeWidth="1.2"
        />

        {/* Dynamic Eyes */}
        {eyeState === 'blink' ? (
          <>
            <line x1="36" y1="44" x2="44" y2="44" stroke="#00F0FF" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="56" y1="44" x2="64" y2="44" stroke="#00F0FF" strokeWidth="2.5" strokeLinecap="round" />
          </>
        ) : eyeState === 'wink' ? (
          <>
            <circle cx="40" cy="44" r="4" fill="#00F0FF" />
            <path d="M 56 44 Q 60 48 64 44" stroke="#00F0FF" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </>
        ) : eyeState === 'happy' ? (
          <>
            <path d="M 36 45 Q 40 39 44 45" stroke="#00F0FF" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 56 45 Q 60 39 64 45" stroke="#00F0FF" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            <circle cx="40" cy="44" r="4.2" fill="#00F0FF">
              <animate attributeName="r" values="4.2;4.6;4.2" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="41.5" cy="42.5" r="1.3" fill="#FFFFFF" />
            <circle cx="60" cy="44" r="4.2" fill="#00F0FF">
              <animate attributeName="r" values="4.2;4.6;4.2" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="61.5" cy="42.5" r="1.3" fill="#FFFFFF" />
          </>
        )}

        {/* Cute Smile / Voice Visualizer */}
        <path
          d={isWaving ? "M 44 52 Q 50 56 56 52" : "M 45 52 Q 50 54 55 52"}
          stroke="#00F0FF"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />

        {/* Headphones / Ears */}
        <rect x="17" y="36" width="6" height="16" rx="3" fill="#8B5CF6" />
        <rect x="77" y="36" width="6" height="16" rx="3" fill="#8B5CF6" />

        {/* Chest Core */}
        <circle cx="50" cy="74" r="3.5" fill="#10B981" className="animate-pulse" />
      </svg>
    </div>
  );

  // If embedded directly into a section or hero card
  if (variant === 'embedded') {
    return (
      <div className="w-full glass-card p-6 rounded-3xl border border-neon-cyan/30 relative overflow-hidden shadow-[0_0_40px_rgba(0,240,255,0.12)]">
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-neon-cyan/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 pb-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            {renderRobotAvatar('w-14 h-14')}
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                  Aura // Anurag's Digital Companion
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ONLINE
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Interactive AI co-pilot guiding you through Anurag's work
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={toggleVoice}
              className={`p-2 rounded-xl text-xs font-mono transition-colors flex items-center gap-1.5 border ${
                voiceEnabled
                  ? 'bg-neon-cyan/20 text-neon-cyan border-neon-cyan/50'
                  : 'bg-slate-800 text-slate-400 border-white/10 hover:text-white'
              }`}
              title={voiceEnabled ? 'Mute Aura Voice' : 'Enable Aura Voice Narration'}
            >
              {voiceEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span className="text-[11px]">{voiceEnabled ? 'Voice On' : 'Voice Off'}</span>
            </button>
          </div>
        </div>

        {/* Message bubble */}
        <div className="p-4 rounded-2xl glass-panel border border-white/10 text-slate-800 dark:text-slate-200 text-sm leading-relaxed mb-4">
          <p>{currentNode.text}</p>
          {currentNode.actionText && currentNode.actionPage && (
            <button
              onClick={() => handleActionClick(currentNode.actionPage!)}
              className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-neon-cyan/20 border border-neon-cyan/40 text-neon-cyan hover:bg-neon-cyan/30 text-xs font-mono transition-colors"
            >
              <span>{currentNode.actionText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Options */}
        <div className="flex flex-wrap gap-2">
          {currentNode.options?.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectOption(opt.nextId)}
              className="px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 hover:border-neon-cyan/40 text-xs font-mono text-slate-200 hover:text-white transition-all transform hover:-translate-y-0.5"
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Floating Corner Variant
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ duration: 0.25 }}
            className="w-[90vw] sm:w-96 glass-panel rounded-3xl p-5 border border-neon-cyan/30 shadow-[0_15px_40px_rgba(0,0,0,0.4)] backdrop-blur-2xl mb-3 relative overflow-hidden"
          >
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-cyan via-indigo-500 to-neon-violet" />

            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                {renderRobotAvatar('w-10 h-10')}
                <div>
                  <h4 className="font-display font-bold text-sm text-white flex items-center gap-1.5">
                    Aura <span className="text-[10px] font-mono text-neon-cyan font-normal">// Companion</span>
                  </h4>
                  <p className="text-[10px] text-slate-400">Anurag's Interactive Guide</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={toggleVoice}
                  className={`p-1.5 rounded-lg border text-xs transition-colors ${
                    voiceEnabled
                      ? 'bg-neon-cyan/20 text-neon-cyan border-neon-cyan/50'
                      : 'bg-slate-800/80 text-slate-400 border-white/10'
                  }`}
                  title={voiceEnabled ? 'Mute speech' : 'Enable speech'}
                >
                  {voiceEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/10 transition-colors"
                  aria-label="Close Companion"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Bubble */}
            <div className="p-3.5 rounded-2xl glass-card border border-white/10 text-xs text-slate-800 dark:text-slate-200 leading-relaxed mb-3">
              <p>{currentNode.text}</p>
              {currentNode.actionText && currentNode.actionPage && (
                <button
                  onClick={() => {
                    handleActionClick(currentNode.actionPage!);
                    setIsOpen(false);
                  }}
                  className="mt-2.5 w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-neon-cyan/20 border border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/30 text-xs font-mono font-medium transition-colors"
                >
                  <span>{currentNode.actionText}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Response options */}
            <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
              {currentNode.options?.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt.nextId)}
                  className="w-full text-left px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 hover:border-neon-cyan/40 text-xs font-mono text-slate-200 hover:text-neon-cyan transition-colors"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative group p-1.5 rounded-full bg-gradient-to-tr from-neon-cyan via-indigo-600 to-neon-violet shadow-[0_0_25px_rgba(0,240,255,0.5)] focus:outline-none"
        aria-label="Toggle Aura AI Companion"
      >
        <div className="w-13 h-13 rounded-full bg-slate-950 p-1 flex items-center justify-center relative">
          {renderRobotAvatar('w-12 h-12')}

          {/* Badge indicator */}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-neon-cyan items-center justify-center text-[9px] font-bold text-black">
                AI
              </span>
            </span>
          )}
        </div>
      </motion.button>
    </div>
  );
};

