/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a1a1a',
        secondary: '#8b7355',
        accent: '#c9a96e',
        surface: '#ffffff',
        background: '#f8f7f5',
        success: '#2d7a3e',
        warning: '#d97706',
        error: '#b91c1c',
        info: '#1e40af'
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif']
      },
      scale: {
        '102': '1.02'
      },
      transitionProperty: {
        'shadow': 'box-shadow'
      }
    },
  },
  plugins: [],
}