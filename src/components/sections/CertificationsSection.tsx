import React from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  Sparkles,
  CheckCircle,
  FileBadge,
  Calendar,
} from 'lucide-react';
import { certifications } from '../../data/certifications';

export const CertificationsSection: React.FC = () => {
  return (
    <section id="certifications" className="relative py-24 px-4 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-neon-violet/5 rounded-full blur-[130px] pointer-events-none" />

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
            <span>06 // CREDENTIALS & RECOGNITION</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight"
          >
            Certifications & <span className="gradient-text">Honors</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 max-w-xl text-slate-400 text-sm sm:text-base leading-relaxed"
          >
            Peer-reviewed presentations, national research program outreach, government leadership citations, and industry simulation credentials.
          </motion.p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="glass-card p-6 rounded-3xl border border-white/10 hover:border-neon-cyan/40 hover:shadow-glow-cyan transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Card Top Meta */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/25">
                    {item.badge}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    <span>{item.date}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-neon-violet group-hover:scale-110 group-hover:text-neon-cyan transition-all flex-shrink-0 mt-0.5">
                    <FileBadge className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-display font-bold text-white group-hover:text-neon-cyan transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs font-mono text-slate-400 mt-0.5">
                      {item.issuer}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mt-2">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 mt-5 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Verified Credential
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
                  {item.type}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
