import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Obsidian theme accents (champagne gold, rose gold, steel blue)
        obsidian: {
          gold: '#c9a87c',
          rose: '#e8c4a0',
          steel: '#8b9dc3',
        },
        // Alabaster theme accents (slate, graphite, indigo)
        alabaster: {
          slate: '#4a5568',
          graphite: '#2d3748',
          indigo: '#5a67d8',
        },
        // Dusk theme accents (sienna, amber, forest)
        dusk: {
          sienna: '#c2410c',
          amber: '#a16207',
          forest: '#4d7c0f',
        },
        // Legacy dream colors (for compatibility)
        dream: {
          50: '#faf8ff',
          100: '#f3edff',
          200: '#e9ddff',
          300: '#d4c4fc',
          400: '#b89bf8',
          500: '#9f7aea',
          600: '#805ad5',
          700: '#6b46c1',
          800: '#553c9a',
          900: '#44337a',
          950: '#2d2153',
        },
        aurora: {
          50: '#fef5ff',
          100: '#fce9ff',
          200: '#f9d5ff',
          300: '#f4b3ff',
          400: '#eb83ff',
          500: '#d946ef',
          600: '#bd24d3',
          700: '#9d1aae',
          800: '#81178e',
          900: '#6a1874',
          950: '#47034d',
        },
        cosmic: {
          50: '#edfcff',
          100: '#d6f6ff',
          200: '#b5f1ff',
          300: '#83e8ff',
          400: '#48d7ff',
          500: '#1ebcff',
          600: '#069bff',
          700: '#0083f0',
          800: '#0869c1',
          900: '#0d5997',
          950: '#0e375c',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        reading: ['var(--font-reading)', 'Georgia', 'serif'],
        ui: ['var(--font-ui)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Fluid type scale matching CSS custom properties
        'fluid-base': 'clamp(17px, 1.1vw + 14px, 19px)',
        'fluid-lg': 'clamp(19px, 1.2vw + 15px, 22px)',
        'fluid-xl': 'clamp(22px, 1.5vw + 16px, 28px)',
        'fluid-2xl': 'clamp(26px, 2vw + 18px, 36px)',
        'fluid-3xl': 'clamp(32px, 2.5vw + 20px, 48px)',
        'fluid-4xl': 'clamp(40px, 3vw + 24px, 64px)',
      },
      lineHeight: {
        'body': '1.75',
        'heading': '1.2',
      },
      letterSpacing: {
        'body': '-0.01em',
        'heading': '-0.02em',
      },
      maxWidth: {
        'reading': '68ch',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'obsidian-gradient': 'linear-gradient(135deg, #0a0a0f 0%, #12121a 50%, #1a1a24 100%)',
        'alabaster-gradient': 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 50%, #eeeeee 100%)',
        'dusk-gradient': 'linear-gradient(135deg, #1c1917 0%, #262220 50%, #302b27 100%)',
      },
      boxShadow: {
        'refined': '0 2px 12px rgb(var(--shadow-color))',
        'refined-lg': '0 4px 24px rgb(var(--shadow-color))',
        'card-hover': '0 4px 24px rgb(var(--shadow-color)), 0 0 0 1px rgb(var(--card-glow))',
      },
      borderRadius: {
        'card': '12px',
      },
      transitionTimingFunction: {
        'out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        'fast': '150ms',
        'base': '250ms',
        'slow': '350ms',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
