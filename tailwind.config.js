/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'gray-150': '#f2f2f2',
        'gray-250': '#e0e0e0',
        'brand-500': '#359dd9',
        'brand-800': '#0A6DA9',
      },
    },
  },
  plugins: [],
};
