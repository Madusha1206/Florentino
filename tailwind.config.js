/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f6f7f4',
          100: '#e9ecdf',
          200: '#d3dbc2',
          300: '#b4c199',
          400: '#94a571',
          500: '#7c8f54',
          600: '#61703f',
          700: '#4d5633',
          800: '#41472d',
          900: '#383d29',
        },
        rose: {
          50: '#fdf2f2',
          100: '#fce7e7',
          200: '#fbd4d4',
          300: '#f8b4b4',
          400: '#f48888',
          500: '#ed5a5a',
          600: '#da3d3d',
          700: '#b82d2d',
          800: '#982828',
          900: '#7f2626',
        },
        cream: {
          50: '#fefdfb',
          100: '#fdfbf7',
          200: '#faf7f0',
          300: '#f5f0e8',
          400: '#ede4d3',
          500: '#e1d3bd',
          600: '#d4c4a8',
          700: '#b8a082',
          800: '#9c8066',
          900: '#7d6652',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      animation: {
        'bounce': 'bounce 2s infinite',
        'pulse': 'pulse 3s infinite',
      }
    },
  },
  plugins: [],
};