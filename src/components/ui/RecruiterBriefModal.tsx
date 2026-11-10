import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  X,
  FileDown,
  Mail,
  Phone,
  CheckCircle2,
  Calendar,
  MapPin,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Terminal,
} from 'lucide-react';
import { personalInfo } from '../../data/personal';
import { WhatsAppIcon, LinkedinIcon, GithubIcon } from './Icons';

interface RecruiterBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RecruiterBriefModal: React.FC<RecruiterBriefModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-3xl max-h-[90vh] glass-panel rounded-3xl border border-neon-cyan/30 flex flex-col overflow-hidden shadow-2xl bg-slate-950/95 text-slate-100"
      >
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-slate-900 to-indigo-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-neon-cyan to-indigo-600 text-dark-bg font-bold shadow-glow-cyan">
              <Briefcase className="w-5 h-5 text-dark-bg" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-lg text-white">
                  Executive Brief for Employers & Recruiters
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono border border-emerald-500/30">
                  AVAILABLE NOW
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Key qualifications, deliverables & hiring profile for Anurag Mishra
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Quick Snapshot Profile */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border border-neon-cyan/40 shadow-md flex-shrink-0">
                <img
                  src={personalInfo.avatarUrl}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-display font-bold text-lg text-white">Anurag Mishra</h4>
                <p className="text-xs font-mono text-neon-cyan">
                  DevOps Engineer &bull; Full-Stack Architect &bull; AI/ML Researcher
                </p>
                <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-slate-400 mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    Ayodhya / Sultanpur, IN &bull; Remote / Relocation Ready
                  </span>
                </div>
              </div>
            </div>

            <a
              href={personalInfo.contact.resumeUrl}
              download="Anurag_Mishra_Resume.pdf"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-neon-cyan to-indigo-600 text-dark-bg font-bold text-xs shadow-glow-cyan hover:scale-105 transition-all flex-shrink-0"
            >
              <FileDown className="w-4 h-4" />
              <span>Download Official Resume</span>
            </a>
          </div>

          {/* 3 Core Value Propositions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-1.5">
              <span className="text-[10px] font-mono text-neon-cyan uppercase block font-bold">
                01 // Observability & Telemetry
              </span>
              <h5 className="font-display font-bold text-sm text-white">C-DAC Experience</h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                Hands-on telemetry architecture using Prometheus & Grafana. Custom exporters, high-throughput metrics, zero-downtime alerting.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-1.5">
              <span className="text-[10px] font-mono text-neon-violet uppercase block font-bold">
                02 // Applied AI Research
              </span>
              <h5 className="font-display font-bold text-sm text-white">ICNACT 2026 IEEE Paper</h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                Published & presented at VIT Bhopal. Solved 10 deployment gaps in cattle welfare AI using temporal graph transformers & SHAP explainability.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-1.5">
              <span className="text-[10px] font-mono text-emerald-400 uppercase block font-bold">
                03 // Production Web Systems
              </span>
              <h5 className="font-display font-bold text-sm text-white">GovTech & Full-Stack</h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                Engineered public administrative dispute resolution platform for CDO Ayodhya. 6+ high-availability full-stack apps in production.
              </p>
            </div>
          </div>

          {/* Technical Stack Radar */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-white/10 space-y-3">
            <h5 className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Technical Arsenal & Readiness
            </h5>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {[
                'TypeScript', 'JavaScript (ES6+)', 'React 19', 'Next.js', 'Node.js',
                'Express', 'Python', 'Prometheus', 'Grafana', 'Docker',
                'Linux Systems', 'CI/CD Automation', 'MongoDB', 'PostgreSQL', 'Tailwind CSS',
                'Git & GitHub', 'REST APIs', 'System Design'
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 border border-white/10 text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Hiring Details & Direct Action Row */}
          <div className="p-4 sm:p-5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Immediate Availability for Full-Time, Contract & Internship Roles
              </span>
              <p className="text-xs text-slate-300">
                Notice Period: Immediate &bull; Target Roles: DevOps / SRE, Full-Stack Software Engineer, AI Systems
              </p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <a
                href={`mailto:${personalInfo.contact.email}?subject=Interview%20Inquiry%20for%20Anurag%20Mishra`}
                className="px-4 py-2 rounded-xl bg-neon-cyan/20 border border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/30 text-xs font-mono font-medium transition-colors flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Schedule Interview</span>
              </a>
              <a
                href="https://wa.me/917800509636?text=Hi%20Anurag,%20we%20reviewed%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20role"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/30 transition-colors"
                title="Message on WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

