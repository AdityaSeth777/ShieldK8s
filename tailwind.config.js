/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'cyber': {
          black: '#0a0a0f',
          blue: '#00f6ff',
          purple: '#b100f5',
          green: '#00ff9d',
          red: '#ff3864'
        }
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backgroundImage: {
        'cyber-grid': `radial-gradient(circle at center, rgba(0, 246, 255, 0.1) 1px, transparent 1px),
                       linear-gradient(rgba(0, 246, 255, 0.05) 1px, transparent 1px),
                       linear-gradient(90deg, rgba(0, 246, 255, 0.05) 1px, transparent 1px)`,
      },
      backgroundSize: {
        'cyber-grid': '50px 50px, 25px 25px, 25px 25px',
      },
    },
  },
  plugins: [],
};