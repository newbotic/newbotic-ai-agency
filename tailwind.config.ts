/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
      },
      colors: {
        ink: '#0a0a0f',
        'ink-2': '#3a3a4a',
        'ink-3': '#7a7a8a',
        surface: '#f8f8fc',
        card: '#ffffff',
        accent: '#2a5cff',
        'accent-2': '#00e5a0',
        'accent-3': '#ff4d6d',
        border: 'rgba(10, 10, 15, 0.08)',
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.4 },
        },
      },
    },
  },
  plugins: [],
};