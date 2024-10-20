/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        whitebox: 'rgb(240, 217, 181)', // Define your custom color here
        blackbox:'rgb(181, 136, 99)'
      },
    },
  },
  plugins: [],
}

