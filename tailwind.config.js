/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#4D9DE0'
      }
    },
    fontFamily: {
      'noto': ['Noto Sans Thai', 'sans-serif']
    }
  },
  plugins: [],
}

