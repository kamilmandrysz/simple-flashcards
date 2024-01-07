/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');
const forms = require('@tailwindcss/forms');

module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      ...colors,
      primary: '#6096B4',
      secondary: '#93BFCF',
      gray: '#BDCDD6',
      pastel: '#EEE9DA',
    },
    extend: {},
  },
  plugins: [forms],
};
