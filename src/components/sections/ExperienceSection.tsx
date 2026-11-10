import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  Briefcase,
  Activity,
  Brain,
  Users,
  MapPin,
  Calendar,
  Sparkles,
  CheckCircle,
} from 'lucide-react';
import { experiences } from '../../data/experience';

export const ExperienceSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 30%'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const iconMap: Record<string, React.ReactNode> = {
    Activity: <Activity className="w-5 h-5" />,
    Brain: <Brain className="w-5 h-5" />,
    Users: <Users className="w-5 h-5" />,
  };

  return (
    <section id="experience" ref={containerRef} className="relative py-24 px-4 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-neon-violet/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-neon-cyan/20 text-xs font-mono text-neon-cyan mb-3"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>02 // PROFESSIONAL JOURNEY</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight"
          >
            Experience & <span className="gradient-text">Impact Timeline</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 max-w-xl text-slate-400 text-sm sm:text-base leading-relaxed"
          >
            From high-availability telemetry at national research centers to applied AI research and civic technology deployments.
          </motion.p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Animated SVG Path / Line */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-slate-800">
            <motion.div
              style={{ scaleY, originY: 0 }}
              className="w-full h-full bg-gradient-to-b from-neon-cyan via-indigo-500 to-neon-violet shadow-[0_0_12px_#00F0FF]"
            />
          </div>

          {/* Timeline Nodes */}
          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={exp.id}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Central Node Dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
                    className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 z-20 w-9 h-9 rounded-full p-0.5 bg-gradient-to-tr from-neon-cyan to-neon-violet shadow-[0_0_15px_#00F0FF]"
                  >
                    <div className="w-full h-full rounded-full bg-dark-bg flex items-center justify-center text-neon-cyan">
                      {iconMap[exp.icon] || <Briefcase className="w-4 h-4" />}
                    </div>
                  </motion.div>

                  {/* Empty Spacer Column for alternating layout on desktop */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Content Card (Half Width on Desktop, Full Width on Mobile with offset) */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                      isEven ? 'md:pr-12' : 'md:pl-12'
                    }`}
                  >
                    <div className="glass-card p-6 sm:p-7 rounded-3xl border border-white/10 hover:border-neon-cyan/40 hover:shadow-glow-cyan transition-all group">
                      {/* Top Meta Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/30">
                          {exp.badge}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          <span>{exp.period}</span>
                        </div>
                      </div>

                      {/* Role & Company */}
                      <h3 className="text-lg sm:text-xl font-display font-bold text-white group-hover:text-neon-cyan transition-colors">
                        {exp.role}
                      </h3>
                      <h4 className="text-sm font-medium text-slate-300 mt-1 flex items-center gap-1.5">
                        <span>{exp.organization}</span>
                      </h4>
                      <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5 mb-4">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        <span>{exp.location}</span>
                      </div>

                      {/* Bullet points */}
                      <ul className="space-y-2.5 my-4">
                        {exp.description.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300/90 leading-relaxed">
                            <CheckCircle className="w-4 h-4 text-neon-cyan flex-shrink-0 mt-0.5" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Skill tags */}
                      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800">
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1 rounded-lg bg-slate-900/80 border border-white/5 text-[11px] font-mono text-slate-300 group-hover:border-neon-cyan/20 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
