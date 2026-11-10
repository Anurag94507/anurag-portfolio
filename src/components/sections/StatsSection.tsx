import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { personalInfo } from '../../data/personal';
import { Layers, ShieldAlert, Award, Briefcase } from 'lucide-react';

interface CounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

const AnimatedNumber: React.FC<CounterProps> = ({ value, duration = 1.6, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const end = value;
    const totalFrames = Math.round(duration * 60);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Ease out expo
      const current = Math.round(start + (end - start) * (1 - Math.pow(2, -10 * progress)));
      setCount(current);

      if (frame >= totalFrames) {
        setCount(end);
        clearInterval(counter);
      }
    }, 1000 / 60);

    return () => clearInterval(counter);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white">
      {prefix}{count}{suffix}
    </span>
  );
};

export const StatsSection: React.FC = () => {
  const icons = [Layers, ShieldAlert, Award, Briefcase];

  return (
    <section id="stats" className="relative py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {personalInfo.stats.map((stat, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: idx * 0.12, duration: 0.6 }}
                className="relative group p-6 rounded-2xl glass-card overflow-hidden border border-white/10 hover:border-neon-cyan/40 hover:shadow-glow-cyan transition-all duration-300"
              >
                {/* Glow backdrop */}
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-neon-cyan/10 rounded-full blur-2xl group-hover:bg-neon-cyan/20 transition-all duration-300" />

                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-white/5 text-neon-cyan group-hover:scale-110 group-hover:text-white group-hover:bg-neon-cyan/20 transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                    Metric 0{idx + 1}
                  </span>
                </div>

                <div className="flex items-baseline gap-1 my-2">
                  <AnimatedNumber
                    value={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                  />
                </div>

                <h2 className="text-sm font-semibold text-slate-200 mt-2 font-display">
                  {stat.label}
                </h2>

                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
