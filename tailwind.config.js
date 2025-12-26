/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],

  theme: {
    extend: {
    },
  },

//префикс
  prefix: 'tw-',

//чтобы не сбрасывались общие правила
  corePlugins: {
    preflight: false,
  },

  important: true,

  plugins: [],
}