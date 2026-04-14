/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#1e3a5f',
        'ink-2': '#1e40af',
        'ink-3': '#7a7a8a',
        surface: '#f8f8fc',
        card: '#ffffff',
        accent: '#2a5cff',
        'accent-2': '#00e5a0',
        'accent-3': '#ff4d6d',
        border: 'rgba(30, 58, 95, 0.08)',
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