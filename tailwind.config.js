/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#060A17',
          surface: '#0B1226',
          card: '#0F172E',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        light: {
          bg: '#F8FAFD',
          surface: '#FFFFFF',
          card: '#FFFFFF',
          border: 'rgba(203, 213, 225, 0.8)',
        },
        neon: {
          cyan: '#00F5FF',
          blue: '#38BDF8',
          violet: '#8B5CF6',
          purple: '#A855F7',
          magenta: '#EC4899',
          emerald: '#10B981',
          amber: '#F59E0B',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(0, 245, 255, 0.45)',
        'glow-cyan-lg': '0 0 45px -5px rgba(0, 245, 255, 0.6)',
        'glow-violet': '0 0 25px -5px rgba(139, 92, 246, 0.45)',
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.4)',
        'glow-card': '0 10px 40px -10px rgba(0, 245, 255, 0.15)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cyber-gradient': 'linear-gradient(135deg, #00F5FF 0%, #6366F1 50%, #A855F7 100%)',
        'subtle-glow': 'radial-gradient(circle at 50% 0%, rgba(0, 245, 255, 0.12) 0%, transparent 70%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 28s linear infinite',
        'marquee-reverse': 'marquee-reverse 28s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
