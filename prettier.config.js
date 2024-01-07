/** @type {import("prettier").Config} */
const config = {
  singleQuote: true,
  printWidth: 100,
  useTabs: false,
  tabWidth: 2,
  semi: true,
  jsxSingleQuote: false,
  quoteProps: 'as-needed',
  trailingComma: 'es5',
  bracketSpacing: true,
  arrowParens: 'always',
  proseWrap: 'always',
  endOfLine: 'lf',
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindFunctions: ['clsx'],
};

module.exports = config;
