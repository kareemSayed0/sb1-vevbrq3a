/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          emerald: '#34d399',
          cyan: '#22d3ee',
        }
      }
    },
  },
  plugins: [],
};