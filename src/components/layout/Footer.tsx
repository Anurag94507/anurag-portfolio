import React, { useState, useEffect } from 'react';
import {
  ArrowUp,
  Mail,
  Phone,
  FileDown,
  Terminal,
  ExternalLink,
  ShieldCheck,
  Cpu,
  Clock,
  MapPin,
  Sparkles,
  Server,
  Database,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from '../ui/Icons';
import { personalInfo } from '../../data/personal';
import { AdminDatabaseModal } from '../ui/AdminDatabaseModal';

export const Footer: React.FC = () => {
  const [istTime, setIstTime] = useState('');
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Live IST (Indian Standard Time) Clock
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      const formatter = new Intl.DateTimeFormat('en-IN', options);
      setIstTime(formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = "https://wa.me/917800509636?text=Hi%20Anurag,%20let's%20connect%20regarding%20an%20engineering%20opportunity";
  const callUrl = `tel:${personalInfo.contact.phone}`;
  const mailUrl = `mailto:${personalInfo.contact.email}`;

  return (
    <footer className="relative border-t border-white/10 bg-[#070b14] pt-20 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden text-slate-300">
      {/* Subtle background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-cyan/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-neon-violet/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ========================================================
            TOP CALL-TO-ACTION BANNER
           ======================================================== */}
        <div className="relative rounded-3xl p-8 sm:p-12 mb-16 bg-gradient-to-r from-slate-900/90 via-slate-850/80 to-slate-900/90 border border-neon-cyan/30 shadow-[0_0_50px_rgba(0,240,255,0.08)] overflow-hidden">
          {/* Neon accent corner */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-neon-cyan/20 to-neon-violet/20 blur-2xl rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan text-xs font-mono font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>OPEN FOR DEVOPS • FULL-STACK • AI/ML ROLES</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-white tracking-tight leading-tight">
                Ready to Build Resilient Systems & Scalable AI Solutions?
              </h2>

              <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
                Whether you need a DevOps engineer to design real-time Prometheus/Grafana observability dashboards, a full-stack engineer to build production React & Node applications, or an applied researcher in graph AI & explainable systems — I am ready to make an immediate impact.
              </p>
            </div>

            {/* Quick action buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 w-full lg:w-auto">
              {/* WhatsApp direct */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs font-mono shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all hover:scale-105 active:scale-95"
              >
                <WhatsAppIcon className="w-4 h-4 fill-slate-950" />
                <span>WhatsApp Me</span>
              </a>

              {/* Direct call */}
              <a
                href={callUrl}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-sky-400/30 hover:border-sky-400 text-sky-300 font-semibold text-xs font-mono transition-all hover:scale-105 active:scale-95"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>+91 7800509636</span>
              </a>

              {/* Direct email */}
              <a
                href={mailUrl}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-neon-violet/30 hover:border-neon-violet text-neon-violet font-semibold text-xs font-mono transition-all hover:scale-105 active:scale-95"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Send Email</span>
              </a>

              {/* Download Resume */}
              <a
                href={personalInfo.contact.resumeUrl}
                download="Anurag_Mishra_Resume.pdf"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-neon-cyan via-indigo-600 to-neon-violet text-dark-bg font-bold text-xs font-mono shadow-glow-cyan transition-all hover:scale-105 active:scale-95"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>Download Resume</span>
              </a>
            </div>
          </div>
        </div>

        {/* ========================================================
            FOUR-COLUMN ENTERPRISE MATRIX
           ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-16 border-b border-slate-800/80">
          {/* COLUMN 1: Profile & Local Pulse */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-neon-cyan to-neon-violet shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                <img
                  src={personalInfo.avatarUrl}
                  alt="Anurag Mishra"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-white">Anurag Mishra</h3>
                <p className="text-[11px] font-mono text-neon-cyan">B.Tech IT '27 &bull; Software Engineer</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Dr. Ram Manohar Lohia Avadh University, Ayodhya. Proven experience with C-DAC monitoring telemetry, ICNACT 2026 published AI research, and end-to-end full-stack applications.
            </p>

            {/* Geolocation & IST Clock */}
            <div className="space-y-2 pt-2 border-t border-slate-800/60 font-mono text-xs">
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-neon-cyan flex-shrink-0" />
                <span>Sultanpur & Ayodhya, UP, India</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>
                  Ayodhya Time (IST): <strong className="text-emerald-400 font-bold">{istTime || 'Loading...'}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* COLUMN 2: Engineering Domains & Skill Matrix */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-sm text-white uppercase tracking-wider flex items-center gap-2">
              <Cpu className="w-4 h-4 text-neon-cyan" />
              <span>Core Specializations</span>
            </h4>

            <ul className="space-y-2.5 text-xs font-mono text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-neon-cyan font-bold">&bull;</span>
                <div>
                  <span className="text-slate-200 font-medium">DevOps & Telemetry:</span>
                  <p className="text-[11px] text-slate-500 font-sans">Grafana, Prometheus, CI/CD, Linux, Docker, Vercel</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neon-violet font-bold">&bull;</span>
                <div>
                  <span className="text-slate-200 font-medium">Full-Stack MERN:</span>
                  <p className="text-[11px] text-slate-500 font-sans">React, TypeScript, Node.js, Express, MongoDB, Redux</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">&bull;</span>
                <div>
                  <span className="text-slate-200 font-medium">Applied AI/ML Research:</span>
                  <p className="text-[11px] text-slate-500 font-sans">Temporal Graph Transformers, SHAP/LIME, PyTorch</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">&bull;</span>
                <div>
                  <span className="text-slate-200 font-medium">Systems & Security:</span>
                  <p className="text-[11px] text-slate-500 font-sans">RESTful APIs, JWT Auth, Microservices, System Design</p>
                </div>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: Rapid Section Navigation */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-sm text-white uppercase tracking-wider flex items-center gap-2">
              <Terminal className="w-4 h-4 text-neon-violet" />
              <span>Navigation</span>
            </h4>

            <ul className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-400">
              <li>
                <a href="#about" className="hover:text-neon-cyan transition-colors flex items-center gap-1.5">
                  <span className="text-slate-600">01.</span> About
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-neon-cyan transition-colors flex items-center gap-1.5">
                  <span className="text-slate-600">02.</span> Experience
                </a>
              </li>
              <li>
                <a href="#research" className="hover:text-neon-cyan transition-colors flex items-center gap-1.5">
                  <span className="text-slate-600">03.</span> Research
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-neon-cyan transition-colors flex items-center gap-1.5">
                  <span className="text-slate-600">04.</span> Projects
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-neon-cyan transition-colors flex items-center gap-1.5">
                  <span className="text-slate-600">05.</span> Skills
                </a>
              </li>
              <li>
                <a href="#certifications" className="hover:text-neon-cyan transition-colors flex items-center gap-1.5">
                  <span className="text-slate-600">06.</span> Honors
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-neon-cyan transition-colors flex items-center gap-1.5">
                  <span className="text-slate-600">07.</span> Contact
                </a>
              </li>
              <li>
                <a
                  href={personalInfo.contact.resumeUrl}
                  download="Anurag_Mishra_Resume.pdf"
                  className="text-neon-cyan hover:underline flex items-center gap-1"
                >
                  <span>PDF Resume</span>
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: Verified Deployments & Research */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-sm text-white uppercase tracking-wider flex items-center gap-2">
              <Server className="w-4 h-4 text-emerald-400" />
              <span>Verified Portals</span>
            </h4>

            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a
                  href="https://cownet-ai.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-neon-cyan/50 hover:bg-slate-800/60 transition-all text-slate-300 hover:text-white"
                >
                  <span className="font-semibold text-neon-cyan">HerdIntel Platform</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Anurag94507"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-slate-600 hover:bg-slate-800/60 transition-all text-slate-300 hover:text-white"
                >
                  <span>GitHub (@Anurag94507)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href={personalInfo.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-sky-500/50 hover:bg-slate-800/60 transition-all text-slate-300 hover:text-white"
                >
                  <span>LinkedIn Profile</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href={personalInfo.contact.resumeUrl}
                  download="Anurag_Mishra_Resume.pdf"
                  className="flex items-center justify-between p-2 rounded-lg bg-gradient-to-r from-neon-cyan/10 to-neon-violet/10 border border-neon-cyan/30 hover:border-neon-cyan hover:bg-neon-cyan/15 transition-all text-white"
                >
                  <span className="flex items-center gap-1.5 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-neon-cyan" />
                    <span>Official Resume PDF</span>
                  </span>
                  <FileDown className="w-3.5 h-3.5 text-neon-cyan" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ========================================================
            BOTTOM BAR: STATUS, COPYRIGHT & BACK TO TOP
           ======================================================== */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500 font-mono text-center sm:text-left">
          {/* Operational status */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-slate-300 font-medium">
              System Status: <span className="text-emerald-400">100% Operational</span> &bull; Open for DevOps, Full-Stack & AI Roles
            </span>
          </div>

          {/* Copyright */}
          <p className="text-slate-400">
            &copy; {new Date().getFullYear()} <span className="text-slate-200 font-semibold">Anurag Mishra</span>. Built with React 19, TypeScript, Tailwind CSS & Three.js.
          </p>

          {/* Social Icons, Owner Vault & Back to Top */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="text-[11px] font-mono text-slate-400 hover:text-neon-cyan flex items-center gap-1 transition-colors px-2.5 py-1 rounded-lg bg-slate-900 border border-white/10"
              title="Open Anurag's Database Vault"
            >
              <Database className="w-3 h-3 text-neon-cyan" />
              <span>Database Vault</span>
            </button>

            <div className="flex items-center gap-2 border-r border-slate-800 pr-3">
              <a
                href={personalInfo.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-1.5 rounded-lg text-slate-400 hover:text-sky-400 hover:bg-slate-800 transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
              <a
                href={mailUrl}
                aria-label="Email"
                className="p-1.5 rounded-lg text-slate-400 hover:text-neon-cyan hover:bg-slate-800 transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 hover:border-neon-cyan text-slate-300 hover:text-white transition-all shadow-md active:scale-95"
              aria-label="Back to Top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-neon-cyan group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Admin Database Vault Modal */}
      <AdminDatabaseModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </footer>
  );
};
