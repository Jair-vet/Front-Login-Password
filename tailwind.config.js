/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,html,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'signika': ['"Signika Negative"', 'sans-serif'],
      },
      backgroundImage: {
        'custom-bg': "url('assets/img/fondo.jpg')",
      },
    },
  },
  plugins: [],
}

