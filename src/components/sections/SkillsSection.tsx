import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code,
  Server,
  Database,
  Cloud,
  Cpu,
  Sparkles,
  Zap,
} from 'lucide-react';
import { skillCategories, allSkillsList } from '../../data/skills';

export const SkillsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const categoryIcons = [Code, Server, Database, Cloud, Cpu];

  return (
    <section id="skills" className="relative py-24 px-4 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Infinite Animated Marquee Top Banner */}
      <div className="w-full overflow-hidden py-4 border-y border-white/5 bg-slate-900/30 mb-16 backdrop-blur-sm">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...allSkillsList, ...allSkillsList].map((skill, sIdx) => (
            <div
              key={sIdx}
              className="inline-flex items-center gap-2 mx-4 px-4 py-1.5 rounded-full glass-card border border-white/10 text-xs font-mono text-slate-300"
            >
              <Zap className="w-3 h-3 text-neon-cyan" />
              <span>{skill}</span>
            </div>
          ))}
        </div>
      </div>

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
            <span>05 // TECHNICAL CAPABILITIES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight"
          >
            Technical <span className="gradient-text">Arsenal & Toolkit</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 max-w-xl text-slate-400 text-sm sm:text-base leading-relaxed"
          >
            Categorized competency breakdown spanning low-level algorithms, web frameworks, and production observability.
          </motion.p>
        </div>

        {/* Tab Navigation for Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {skillCategories.map((cat, idx) => {
            const Icon = categoryIcons[idx % categoryIcons.length];
            const isActive = activeTab === idx;
            return (
              <button
                key={cat.category}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-neon-cyan/20 to-neon-violet/20 border border-neon-cyan/50 text-white shadow-glow-cyan'
                    : 'glass-card text-slate-400 hover:text-white border-white/5 hover:border-white/20'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-neon-cyan' : 'text-slate-400'}`} />
                <span>{cat.category}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Display */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10"
        >
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-xl font-display font-bold text-white">
                {skillCategories[activeTab].category}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {skillCategories[activeTab].description}
              </p>
            </div>
            <span className="text-xs font-mono text-neon-cyan">
              {skillCategories[activeTab].skills.length} Core Technologies
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {skillCategories[activeTab].skills.map((skill) => (
              <div
                key={skill.name}
                className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-neon-cyan/30 hover:bg-slate-900/90 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-neon-cyan group-hover:scale-150 transition-transform shadow-[0_0_8px_#00F0FF]" />
                  <span className="text-sm font-semibold text-slate-200 group-hover:text-white font-sans">
                    {skill.name}
                  </span>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 border border-white/5 text-slate-400 group-hover:text-neon-cyan transition-colors">
                  {skill.level}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
