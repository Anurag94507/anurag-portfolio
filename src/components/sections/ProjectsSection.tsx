import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ExternalLink,
  Sparkles,
  Layers,
  CheckCircle2,
  Code2,
  GitFork,
  ArrowUpRight,
} from 'lucide-react';
import { GithubIcon } from '../ui/Icons';
import { projects, ProjectItem } from '../../data/projects';
import { TiltCard } from '../ui/TiltCard';

export const ProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'AI/Research', 'Full-Stack', 'GovTech', 'Backend/Python', 'Web Apps'];

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const getLanguageColor = (lang: string) => {
    if (lang.includes('TypeScript')) return 'bg-blue-500';
    if (lang.includes('JavaScript')) return 'bg-yellow-400';
    if (lang.includes('Python')) return 'bg-emerald-400';
    if (lang.includes('HTML')) return 'bg-orange-500';
    return 'bg-neon-cyan';
  };

  return (
    <section id="projects" className="relative py-24 px-4 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-neon-cyan/10 rounded-full blur-[130px] pointer-events-none" />

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
            <span>04 // GITHUB REPOSITORIES & ENGINEERING LABS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight"
          >
            Open-Source & <span className="gradient-text">GitHub Repositories</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 max-w-xl text-slate-400 text-sm sm:text-base leading-relaxed"
          >
            Public repositories created, maintained, and deployed by Anurag Mishra across AI, full-stack, and civic infrastructure.
          </motion.p>

          {/* Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap justify-center gap-2 bg-slate-900/40 p-1.5 rounded-full border border-white/5"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-neon-cyan to-indigo-600 text-dark-bg font-semibold shadow-glow-cyan'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project: ProjectItem, index: number) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="flex"
            >
              <TiltCard className="glass-card rounded-3xl border border-white/10 hover:border-neon-cyan/40 hover:shadow-glow-card transition-all flex flex-col justify-between h-full group">
                <div>
                  {/* Browser Mockup Window Chrome with Real Website Photo */}
                  <div className="relative h-52 sm:h-64 w-full rounded-t-3xl overflow-hidden border-b border-white/10 bg-slate-950">
                    {/* The Real Website Photo */}
                    <img
                      src={project.image}
                      alt={`${project.title} screenshot preview`}
                      loading="lazy"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient vignette overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-black/20 to-black/60 pointer-events-none" />

                    {/* Browser Chrome Header Overlay */}
                    <div className="absolute top-0 inset-x-0 p-3 flex items-center justify-between z-10 backdrop-blur-md bg-black/40 border-b border-white/10">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/90 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/90 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90 inline-block" />
                        <span className="text-[10px] font-mono text-slate-300 ml-2 truncate max-w-[130px] sm:max-w-[210px]">
                          github.com/{project.repoName}
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-dark-bg/90 text-neon-cyan border border-white/15 backdrop-blur-md">
                        {project.category}
                      </span>
                    </div>

                    {/* Bottom Bar on image: Language & Live status */}
                    <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between text-[11px] font-mono text-slate-200 z-10">
                      <div className="flex items-center gap-1.5 bg-dark-bg/85 px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-md">
                        <span className={`w-2 h-2 rounded-full ${getLanguageColor(project.language)}`} />
                        <span>{project.language}</span>
                      </div>
                      {project.liveUrl && (
                        <span className="flex items-center gap-1 bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-full backdrop-blur-md text-[10px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Live Web App
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-7 space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
                        <GithubIcon className="w-3.5 h-3.5 text-slate-400" />
                        <span>{project.repoName}</span>
                      </div>
                      <h3 className="text-xl font-display font-bold text-white group-hover:text-neon-cyan transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 font-mono">
                        {project.subtitle}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Bullet highlights */}
                    <div className="space-y-2 pt-2">
                      {project.highlights.map((item, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-neon-cyan flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Tags */}
                    <div className="pt-3 flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-white/5 text-[11px] font-mono text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="p-6 sm:p-7 pt-0 flex items-center justify-between border-t border-slate-800/80 mt-4">
                  <div className="flex items-center gap-2.5">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-neon-cyan to-indigo-600 text-dark-bg font-semibold text-xs shadow-glow-cyan hover:scale-105 transition-all"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full glass-card border border-white/10 hover:border-neon-cyan/40 text-slate-200 hover:text-white font-medium text-xs transition-all hover:scale-105"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>
                  </div>

                  {project.metrics && project.metrics[0] && (
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-mono text-slate-400 block">
                        {project.metrics[0].label}
                      </span>
                      <span className="text-xs font-mono font-bold text-neon-cyan">
                        {project.metrics[0].value}
                      </span>
                    </div>
                  )}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Prominent "Explore All GitHub Repositories" Footer Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-3xl glass-card border border-neon-cyan/30 text-center relative overflow-hidden bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/80"
        >
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
            <div className="text-left space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-neon-cyan">
                <GithubIcon className="w-4 h-4 text-neon-cyan" />
                <span>GITHUB // @Anurag94507</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                Explore All Public Repositories on GitHub
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Explore commits, stars, releases, pull requests, and ongoing algorithmic experiments.
              </p>
            </div>

            <a
              href="https://github.com/Anurag94507?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-neon-cyan via-indigo-600 to-neon-violet text-dark-bg font-display font-bold text-sm shadow-glow-cyan hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] hover:scale-105 active:scale-95 transition-all flex-shrink-0"
            >
              <GithubIcon className="w-4 h-4 text-dark-bg" />
              <span>Visit Anurag94507 on GitHub</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
