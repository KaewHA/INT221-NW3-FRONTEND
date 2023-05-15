/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#4D9DE0',
        'custom-black': '#2B2B2B'
      }
    },
    fontFamily: {
      'noto': ['Noto Sans Thai', 'sans-serif']
    }
  },
  plugins: [require('flowbite/plugin')],
}

