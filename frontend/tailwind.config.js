/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "indigo-dye": "#133C55",
        "bice-blue": "#386FA4",
        "picton-blue": "#59A5D8",
        "pale-azure": "#84D2F6",
        "non-photo-blue": "#91E5F6"
      }
    },
  },
  plugins: [],
}

