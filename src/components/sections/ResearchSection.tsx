import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Award,
  ExternalLink,
  Cpu,
  Network,
  Eye,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  AlertTriangle,
  FileCheck,
} from 'lucide-react';
import { researchData } from '../../data/research';

export const ResearchSection: React.FC = () => {
  const [showGaps, setShowGaps] = useState(false);

  const pillarIcons: Record<string, React.ReactNode> = {
    Network: <Network className="w-5 h-5" />,
    Cpu: <Cpu className="w-5 h-5" />,
    Eye: <Eye className="w-5 h-5" />,
    ShieldCheck: <ShieldCheck className="w-5 h-5" />,
  };

  return (
    <section id="research" className="relative py-24 px-4 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-neon-violet/30 text-xs font-mono text-neon-violet mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-neon-cyan" />
            <span>03 // APPLIED AI & ACADEMIC SCHOLARSHIP</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight"
          >
            Research & <span className="gradient-text">Publications</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 max-w-2xl text-slate-400 text-sm sm:text-base leading-relaxed"
          >
            Peer-reviewed research presented at international conference proceedings, solving real-world edge AI and multi-agent computational bottlenecks.
          </motion.p>
        </div>

        {/* Heroic Paper Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-card rounded-3xl p-6 sm:p-10 border border-neon-violet/30 shadow-[0_0_50px_rgba(139,92,246,0.12)] relative overflow-hidden"
        >
          {/* Subtle decorative background gradient */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-neon-violet/15 via-neon-cyan/5 to-transparent rounded-bl-full pointer-events-none" />

          {/* Top badges */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/30 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                ICNACT 2026 Presentation
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-neon-violet/15 text-neon-violet border border-neon-violet/30">
                IEEE-Format Research Paper
              </span>
            </div>
            <span className="text-xs font-mono text-slate-400">
              {researchData.venue}
            </span>
          </div>

          {/* Paper Title */}
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-white leading-tight">
            "{researchData.title}"
          </h3>

          <p className="text-sm font-mono text-slate-400 mt-2">
            Presented at: <span className="text-slate-200">{researchData.conference}</span>
          </p>

          {/* Abstract */}
          <div className="mt-6 p-5 rounded-2xl bg-slate-900/70 border border-white/5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neon-cyan">
              <BookOpen className="w-4 h-4" />
              <span>Executive Abstract</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {researchData.abstract}
            </p>
          </div>

          {/* Companion Links */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            {researchData.companionUrl && (
              <a
                href={researchData.companionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-neon-cyan to-indigo-600 text-dark-bg font-semibold text-xs sm:text-sm shadow-glow-cyan hover:scale-105 transition-all"
              >
                <span>Explore Live HerdIntel Platform</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            <button
              onClick={() => setShowGaps(!showGaps)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card border border-white/10 hover:border-neon-violet/50 text-slate-200 text-xs sm:text-sm font-medium transition-all"
            >
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>{showGaps ? "Hide 10 Deployment Gaps" : "View 10 Critical Gaps Identified"}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showGaps ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Collapsible 10 Critical Gaps Identified */}
          <AnimatePresence>
            {showGaps && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 pt-6 border-t border-slate-800 overflow-hidden"
              >
                <div className="mb-3 flex items-center gap-2 text-xs font-mono uppercase text-amber-300">
                  <FileCheck className="w-4 h-4" />
                  <span>Benchmark Audit: 10 Critical Gaps in Existing CowNet-AI Multi-Agent System</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {researchData.gapsIdentified.map((gap, gIdx) => (
                    <div
                      key={gIdx}
                      className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3"
                    >
                      <span className="font-mono text-xs font-bold text-neon-cyan mt-0.5">
                        GAP-{String(gIdx + 1).padStart(2, '0')}
                      </span>
                      <span className="text-xs text-slate-300 leading-snug">
                        {gap}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 4 Architectural Innovation Pillars */}
          <div className="mt-10 pt-8 border-t border-slate-800">
            <h4 className="text-xs uppercase font-mono tracking-widest text-slate-400 mb-6">
              Proposed Edge-Cloud Hybrid Pillars
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {researchData.proposedArchitecture.map((pillar) => (
                <div
                  key={pillar.name}
                  className="p-5 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-neon-cyan/30 hover:bg-slate-900/80 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center text-neon-cyan group-hover:text-neon-violet group-hover:scale-110 transition-all mb-3">
                    {pillarIcons[pillar.icon]}
                  </div>
                  <h5 className="text-sm font-semibold text-white font-display mb-1.5">
                    {pillar.name}
                  </h5>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Research Keywords */}
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-slate-400 mr-2">Keywords:</span>
            {researchData.keywords.map((kw) => (
              <span
                key={kw}
                className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-white/5 text-[11px] font-mono text-slate-300"
              >
                #{kw}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
