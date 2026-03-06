/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f7fdf9',
          100: '#e8faf0',
          200: '#d1f4e0',
          300: '#a3e9c1',
          400: '#75dea2',
          500: '#47d383',
          600: '#39a668',
          700: '#2b794d',
          800: '#1d4c32',
          900: '#0a3d1f',
          950: '#0a1f12',
        },
        secondary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        accent: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        muted: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      fontFamily: {
        'syne': ['Syne', 'sans-serif'],
        'dm-sans': ['DM Sans', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease both',
        'fade-in': 'fadeIn 1s 0.3s ease both',
        'pulse-dot': 'pulse-dot 2s infinite',
        'pulse-scale': 'pulse-scale 2s infinite',
      },
      keyframes: {
        fadeUp: {
          'from': { opacity: '0', transform: 'translateY(24px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          'from': { opacity: '0', transform: 'translateY(32px) scale(0.97)' },
          'to': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        'pulse-scale': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(0.85)' },
        },
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse 60% 60% at 80% 20%,rgba(78,202,120,0.18) 0%,transparent 70%),radial-gradient(ellipse 40% 50% at 10% 80%,rgba(20,90,46,0.08) 0%,transparent 60%)',
        'hero-grid': 'linear-gradient(rgba(40,167,85,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(40,167,85,0.06) 1px,transparent 1px)',
        'problems-gradient': 'radial-gradient(ellipse 50% 80% at 100% 50%,rgba(78,202,120,0.1) 0%,transparent 60%)',
        'cta-gradient': 'radial-gradient(ellipse 60% 60% at 50% 0%,rgba(78,202,120,0.15) 0%,transparent 60%)',
        'card-gradient': 'linear-gradient(135deg,#1e7a40,#4eca78)',
        'text-gradient': 'linear-gradient(135deg,#1e7a40,#4eca78)',
      },
      boxShadow: {
        'nav': '0 4px 24px rgba(10,61,31,0.08)',
        'hero-button': '0 4px 24px rgba(10,61,31,0.2)',
        'dashboard': '0 32px 80px rgba(10,61,31,0.15),0 0 0 1px rgba(40,167,85,0.1)',
        'card-hover': '0 20px 60px rgba(10,61,31,0.1)',
        'pricing-popular': '0 20px 60px rgba(10,61,31,0.1)',
        'cta-button': '0 8px 32px rgba(0,0,0,0.3)',
      },
      spacing: {
        '18': '4.5rem',
      },
      fontSize: {
        '11': '0.6875rem',
        '13': '0.8125rem',
      },
      lineHeight: {
        '1.05': '1.05',
        '1.1': '1.1',
        '1.2': '1.2',
        '1.5': '1.5',
        '1.6': '1.6',
        '1.7': '1.7',
      },
      borderRadius: {
        '10': '10px',
        '20': '20px',
      },
      borderWidth: {
        '3': '3px',
      },
      opacity: {
        '45': '0.45',
        '55': '0.55',
        '60': '0.6',
        '70': '0.7',
        '75': '0.75',
      },
    },
  },
  plugins: [],
}