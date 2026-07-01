/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          black: '#07070f',
          dark: '#0d0d1a',
          card: '#0f0f1e',
          'card-hover': '#141428',
          cyan: '#00f5ff',
          pink: '#ff2d78',
          purple: '#9b30ff',
          green: '#00ff9f',
          text: '#e0e8ff',
          muted: '#8892b0',
          border: 'rgba(0, 245, 255, 0.15)',
        },
      },
      fontFamily: {
        orbitron: ['var(--font-orbitron)', 'monospace'],
        space: ['var(--font-space-grotesk)', 'sans-serif'],
      },
      boxShadow: {
        'neon-cyan': '0 0 5px #00f5ff, 0 0 15px rgba(0,245,255,0.5), 0 0 30px rgba(0,245,255,0.2)',
        'neon-cyan-sm': '0 0 4px rgba(0,245,255,0.8), 0 0 8px rgba(0,245,255,0.4)',
        'neon-pink': '0 0 5px #ff2d78, 0 0 15px rgba(255,45,120,0.5)',
        'neon-pink-sm': '0 0 4px rgba(255,45,120,0.8), 0 0 8px rgba(255,45,120,0.4)',
        'neon-purple': '0 0 5px #9b30ff, 0 0 15px rgba(155,48,255,0.4)',
        'card-glow': '0 0 30px rgba(0,245,255,0.06), inset 0 0 20px rgba(0,245,255,0.02)',
      },
      backgroundImage: {
        'cyber-grid':
          'linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)',
        'hero-radial':
          'radial-gradient(ellipse at 40% 50%, rgba(0,245,255,0.08) 0%, rgba(155,48,255,0.05) 40%, transparent 70%)',
        'card-shine':
          'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%)',
      },
      backgroundSize: {
        'cyber-grid': '40px 40px',
      },
      keyframes: {
        'pulse-neon': {
          '0%, 100%': { boxShadow: '0 0 4px rgba(0,245,255,0.5), 0 0 8px rgba(0,245,255,0.3)' },
          '50%': { boxShadow: '0 0 8px #00f5ff, 0 0 20px rgba(0,245,255,0.6), 0 0 40px rgba(0,245,255,0.2)' },
        },
        'pulse-neon-pink': {
          '0%, 100%': { boxShadow: '0 0 4px rgba(255,45,120,0.5), 0 0 8px rgba(255,45,120,0.3)' },
          '50%': { boxShadow: '0 0 8px #ff2d78, 0 0 20px rgba(255,45,120,0.6)' },
        },
        flicker: {
          '0%, 91%, 100%': { opacity: '1' },
          '92%': { opacity: '0.75' },
          '94%': { opacity: '1' },
          '96%': { opacity: '0.85' },
          '98%': { opacity: '1' },
        },
        'slide-down': {
          from: { transform: 'translateY(-8px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in-right': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'scan': {
          '0%': { backgroundPosition: '0 -100vh' },
          '100%': { backgroundPosition: '0 100vh' },
        },
      },
      animation: {
        'pulse-neon': 'pulse-neon 2.5s ease-in-out infinite',
        'pulse-neon-pink': 'pulse-neon-pink 2.5s ease-in-out infinite',
        flicker: 'flicker 6s linear infinite',
        'slide-down': 'slide-down 0.25s ease-out',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'fade-in': 'fade-in 0.4s ease-out',
      },
    },
  },
  plugins: [],
};
