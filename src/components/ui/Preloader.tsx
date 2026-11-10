import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ShieldCheck, Cpu, Activity, Zap } from 'lucide-react';
import { personalInfo } from '../../data/personal';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  const logs = [
    { text: 'BOOTING SECURE KERNEL & SYSTEM OBSERVER...', icon: Cpu, phase: 'PHASE 01' },
    { text: 'ESTABLISHING GRAFANA & PROMETHEUS TELEMETRY...', icon: Activity, phase: 'PHASE 02' },
    { text: 'MOUNTING REACT 19 & HIGH-THROUGHPUT MERN STACK...', icon: Zap, phase: 'PHASE 03' },
    { text: 'CALIBRATING TEMPORAL GRAPH TRANSFORMER & SHAP AI...', icon: Terminal, phase: 'PHASE 04' },
    { text: 'ALL SYSTEMS ONLINE // WELCOME TO ANURAG MISHRA', icon: ShieldCheck, phase: 'READY' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }

        const increment = Math.floor(Math.random() * 6) + 3;
        const next = Math.min(prev + increment, 100);

        if (next < 25) {
          setLogIndex(0);
        } else if (next < 50) {
          setLogIndex(1);
        } else if (next < 75) {
          setLogIndex(2);
        } else if (next < 95) {
          setLogIndex(3);
        } else {
          setLogIndex(4);
        }

        return next;
      });
    }, 35);

    return () => clearInterval(timer);
  }, [onComplete]);

  const CurrentIcon = logs[logIndex].icon;

  return (
    <motion.div
      key="preloader"
      initial={{ opacity: 1 }}
      exit={{
        y: '-100%',
        opacity: 0.9,
        transition: {
          duration: 0.85,
          ease: [0.77, 0, 0.175, 1]
        }
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070b14] text-slate-100 select-none overflow-hidden"
    >
      {/* Subtle animated grid background */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />

      {/* Cybernetic ambient radial glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-neon-cyan/20 via-indigo-600/15 to-neon-violet/20 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6 text-center">
        {/* Holographic Avatar / Crest */}
        <div className="relative mb-6">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-neon-cyan via-indigo-500 to-neon-violet shadow-[0_0_40px_rgba(0,240,255,0.4)]"
          >
            <img
              src={personalInfo.avatarUrl}
              alt="Anurag Mishra"
              className="w-full h-full rounded-full object-cover border border-dark-bg"
            />
          </motion.div>

          {/* High-tech revolving radar ring */}
          <motion.div
            className="absolute -inset-2.5 rounded-full border border-dashed border-neon-cyan/40"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
          />
          <motion.div
            className="absolute -inset-5 rounded-full border border-neon-violet/20"
            animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.7, 0.3] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          />
        </div>

        {/* Identity & Status */}
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="space-y-1.5 mb-6"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/60 text-[11px] font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-400 font-semibold">{logs[logIndex].phase}</span>
            <span className="text-slate-500">•</span>
            <span>SYSTEM INITIALIZATION</span>
          </div>

          <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            ANURAG <span className="gradient-text">MISHRA</span>
          </h1>

          <p className="text-xs tracking-[0.2em] font-mono text-slate-400 uppercase">
            DevOps &bull; Full-Stack &bull; Applied AI/ML
          </p>
        </motion.div>

        {/* Progress Gauge */}
        <div className="w-full max-w-xs space-y-2 mb-4">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 flex items-center gap-1.5">
              <CurrentIcon className="w-3.5 h-3.5 text-neon-cyan" />
              <span>DIAGNOSTIC STATUS</span>
            </span>
            <span className="font-bold text-neon-cyan text-sm tracking-wider">
              {progress}%
            </span>
          </div>

          {/* Progress bar with glowing shimmer */}
          <div className="relative w-full h-2 bg-slate-900/90 rounded-full overflow-hidden p-0.5 border border-slate-700/60 shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-neon-cyan via-indigo-500 to-neon-violet rounded-full shadow-[0_0_15px_#00F0FF] relative"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.6)_50%,transparent_100%)] animate-shimmer" />
            </motion.div>
          </div>
        </div>

        {/* Telemetry live log line */}
        <motion.div
          key={logIndex}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="h-8 flex items-center justify-center text-[11px] font-mono text-slate-400 max-w-sm px-2 text-center"
        >
          <span className="text-slate-500 mr-1.5">&gt;</span>
          <span className="text-slate-300 font-medium truncate">{logs[logIndex].text}</span>
        </motion.div>
      </div>

      {/* Decorative cyber corner accents */}
      <div className="absolute top-6 left-6 text-[10px] font-mono text-slate-600 hidden sm:block">
        SYS.VER 2.6.0 // ARCH: EDGE-HYBRID
      </div>
      <div className="absolute top-6 right-6 text-[10px] font-mono text-slate-600 hidden sm:block">
        PORT: 5173 // LATENCY: 12ms
      </div>
      <div className="absolute bottom-6 left-6 text-[10px] font-mono text-slate-600 hidden sm:block">
        LOCATION: AYODHYA &bull; SULTANPUR, IN
      </div>
      <div className="absolute bottom-6 right-6 text-[10px] font-mono text-slate-600 hidden sm:block">
        OPEN: DEVOPS &bull; FULL-STACK &bull; AI
      </div>
    </motion.div>
  );
};
