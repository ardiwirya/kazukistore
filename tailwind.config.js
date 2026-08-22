/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        base: {
          950: '#07070d',
          900: '#0c0c16',
          850: '#121220',
          800: '#181829',
          700: '#232336',
          600: '#33334c',
          500: '#4a4a68'
        },
        kazuki: {
          50: '#f4f0ff',
          100: '#e7ddff',
          200: '#cdb8ff',
          300: '#ad8bff',
          400: '#8f5cff',
          500: '#7c3aed',
          600: '#6b21d8',
          700: '#5817ad',
          800: '#42117f',
          900: '#2c0c56'
        },
        neon: {
          pink: '#ff3d9a',
          cyan: '#22d3ee',
          lime: '#a3ff3d',
          gold: '#ffb020'
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      backgroundImage: {
        'kazuki-gradient': 'linear-gradient(135deg, #7c3aed 0%, #ff3d9a 100%)',
        'kazuki-gradient-soft': 'linear-gradient(135deg, rgba(124,58,237,0.18) 0%, rgba(255,61,154,0.14) 100%)',
        'kazuki-radial': 'radial-gradient(circle at top right, rgba(124,58,237,0.35), transparent 60%)'
      },
      boxShadow: {
        glow: '0 0 40px rgba(124,58,237,0.35)',
        'glow-pink': '0 0 40px rgba(255,61,154,0.3)',
        card: '0 8px 30px rgba(0,0,0,0.35)'
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2.2s linear infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      }
    }
  },
  plugins: []
}
