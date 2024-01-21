/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');
const forms = require('@tailwindcss/forms');

module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors: {
      ...colors,
      primary: '#6096B4',
      'primary-dark': '#4c7890',
      secondary: '#93BFCF',
      tertiary: '#BDCDD6',
      pastel: '#EEE9DA',
    },
    extend: {},
  },
  plugins: [forms],
};
