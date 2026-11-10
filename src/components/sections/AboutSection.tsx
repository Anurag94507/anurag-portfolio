import React from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Cpu,
  Terminal,
  Code2,
  GitBranch,
  CheckCircle2,
  Sparkles,
  MapPin,
  Calendar,
} from 'lucide-react';
import { personalInfo } from '../../data/personal';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-24 px-4 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-neon-cyan/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-neon-cyan/20 text-xs font-mono text-neon-cyan mb-3"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>01 // BACKGROUND & FOUNDATION</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight"
          >
            Architecting With <span className="gradient-text">Precision & Vision</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 max-w-2xl text-slate-400 text-sm sm:text-base leading-relaxed"
          >
            Merging full-stack software craftsmanship with deep computational analysis and multi-agent AI research.
          </motion.p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Education & Identity Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Holographic Identity Card */}
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-neon-cyan/20 to-transparent rounded-bl-full pointer-events-none" />

              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-2xl p-0.5 bg-gradient-to-tr from-neon-cyan via-indigo-500 to-neon-violet overflow-hidden shadow-lg flex-shrink-0">
                  <img
                    src={personalInfo.avatarUrl}
                    alt="Anurag Mishra portrait"
                    className="w-full h-full object-cover object-center rounded-2xl"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-white">Anurag Mishra</h3>
                  <p className="text-xs font-mono text-neon-cyan">DevOps &bull; Full-Stack &bull; AI/ML Researcher</p>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>Ayodhya / Sultanpur, India</span>
                  </div>
                </div>
              </div>

              {/* Education Block */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-neon-cyan/10 text-neon-cyan mt-0.5">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      {personalInfo.education.institution}
                    </h4>
                    <p className="text-xs text-slate-300">
                      {personalInfo.education.degree} in {personalInfo.education.field}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400 font-mono">
                      <Calendar className="w-3 h-3" />
                      <span>{personalInfo.education.period}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Academic Standing:</span>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-neon-cyan/15 text-neon-cyan font-mono text-[11px]">
                      1st Yr: {personalInfo.education.cgpaYear1}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-neon-violet/15 text-neon-violet font-mono text-[11px]">
                      2nd Yr: {personalInfo.education.cgpaYear2}
                    </span>
                  </div>
                </div>
              </div>

              {/* Coursework Tags */}
              <div className="mt-5">
                <h5 className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-2.5">
                  Core Academic Coursework
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {personalInfo.education.coursework.map((course) => (
                    <span
                      key={course}
                      className="px-2.5 py-1 rounded-lg bg-slate-800/70 border border-white/5 text-[11px] text-slate-300"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Pillars: Full-Stack, DevOps, AI */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl glass-card border border-white/10">
                <Code2 className="w-5 h-5 text-neon-cyan mb-2" />
                <h4 className="text-sm font-semibold text-white">Full-Stack Core</h4>
                <p className="text-xs text-slate-400 mt-1">
                  React, TypeScript, Node.js, Express, MongoDB, REST APIs
                </p>
              </div>
              <div className="p-4 rounded-2xl glass-card border border-white/10">
                <Cpu className="w-5 h-5 text-emerald-400 mb-2" />
                <h4 className="text-sm font-semibold text-white">DevOps & SRE</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Prometheus, Grafana, Linux, CI/CD, Alerting Telemetry
                </p>
              </div>
              <div className="p-4 rounded-2xl glass-card border border-white/10">
                <Cpu className="w-5 h-5 text-neon-violet mb-2" />
                <h4 className="text-sm font-semibold text-white">Applied AI/ML</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Temporal Graphs, Explainable AI (SHAP), Federated Learning
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative & Engineering Philosophy (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
              <div className="flex items-center gap-2 text-neon-cyan text-xs font-mono">
                <Terminal className="w-4 h-4" />
                <span>BIO // ENGINEERING NARRATIVE</span>
              </div>

              {personalInfo.aboutText.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-slate-300 leading-relaxed text-sm sm:text-base font-sans"
                >
                  {paragraph}
                </p>
              ))}

              {/* Core Strengths Checklist */}
              <div className="pt-6 border-t border-slate-800/80 mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Production-grade MERN & TypeScript architectures",
                  "Real-time observability with Grafana & Prometheus",
                  "Multi-agent benchmark audits & IEEE publications",
                  "Cross-functional team leadership & civic impact",
                  "Solid Data Structures & Algorithmic foundations",
                  "Performance optimization & mobile-first UI/UX",
                ].map((strength) => (
                  <div key={strength} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-neon-cyan flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-300">{strength}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote / Mindset Pill */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-neon-cyan/10 via-slate-900 to-neon-violet/10 border border-neon-cyan/20 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-slate-900 border border-neon-cyan/30 text-neon-cyan flex-shrink-0">
                <GitBranch className="w-5 h-5" />
              </div>
              <p className="text-xs sm:text-sm text-slate-200 italic font-mono">
                "Software engineering is not merely writing code; it is designing resilient, observable systems that solve tangible problems for human beings."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
