/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './store/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        whatsapp: {
          dark: '#111b21',
          panel: '#202c33',
          bg: '#efeae2',
          green: '#00a884',
          teal: '#008069',
          sent: '#d9fdd3',
          bubble: '#f0f2f5',
          incoming: '#ffffff',
          danger: '#f15c6d',
          muted: '#8696a0',
          light: '#f5f7f8',
        },
      },
      boxShadow: {
        soft: '0 10px 25px rgba(0,0,0,0.16)',
      },
      animation: {
        'pulse-slow': 'pulse 1.8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'wave-float': 'waveFloat 1.1s ease-in-out infinite',
      },
      keyframes: {
        waveFloat: {
          '0%, 100%': { transform: 'scaleY(0.35)', opacity: '0.5' },
          '50%': { transform: 'scaleY(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
