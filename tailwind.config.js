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
          bg: '#0B0A09',
          surface: '#141210',
          card: '#191613',
          border: 'rgba(245, 239, 230, 0.09)',
        },
        light: {
          bg: '#F6F1E8',
          surface: '#FFFDF8',
          card: '#FFFFFF',
          border: 'rgba(214, 204, 189, 0.9)',
        },
        // Warm "studio" palette: ember primary, amber mid, sand highlight.
        neon: {
          cyan: '#FF7A45',
          blue: '#F0A24B',
          violet: '#E7C79A',
          purple: '#D98F5F',
          magenta: '#D96C4A',
          emerald: '#3FBE8B',
          amber: '#F0A24B',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(255, 122, 69, 0.45)',
        'glow-cyan-lg': '0 0 45px -5px rgba(255, 122, 69, 0.55)',
        'glow-violet': '0 0 25px -5px rgba(231, 199, 154, 0.4)',
        'glow-emerald': '0 0 25px -5px rgba(63, 190, 139, 0.35)',
        'glow-card': '0 16px 44px -14px rgba(255, 122, 69, 0.22)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
        'depth': '0 30px 60px -28px rgba(0, 0, 0, 0.75), 0 8px 20px -12px rgba(255, 122, 69, 0.25)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cyber-gradient': 'linear-gradient(135deg, #FF7A45 0%, #F0A24B 55%, #E7C79A 100%)',
        'subtle-glow': 'radial-gradient(circle at 50% 0%, rgba(255, 122, 69, 0.14) 0%, transparent 70%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 28s linear infinite',
        'marquee-reverse': 'marquee-reverse 28s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'aurora': 'aurora 20s ease-in-out infinite alternate',
        'sheen': 'sheen 3.6s ease-in-out infinite',
        'sway': 'sway 10s ease-in-out infinite',
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
        aurora: {
          '0%': { transform: 'translate3d(-4%, -2%, 0) scale(1)', opacity: '0.55' },
          '50%': { transform: 'translate3d(3%, 2%, 0) scale(1.12)', opacity: '0.8' },
          '100%': { transform: 'translate3d(-2%, 3%, 0) scale(1.04)', opacity: '0.6' },
        },
        sheen: {
          '0%': { transform: 'translateX(-130%) skewX(-18deg)' },
          '55%, 100%': { transform: 'translateX(230%) skewX(-18deg)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotateX(6deg) rotateY(-7deg) translateZ(0)' },
          '50%': { transform: 'rotateX(-4deg) rotateY(7deg) translateZ(18px)' },
        },
      },
    },
  },
  plugins: [],
};
