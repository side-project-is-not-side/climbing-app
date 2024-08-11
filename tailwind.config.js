const typography = {
  '.font-display-1': {
    fontWeight: 'bold',
    fontSize: 24,
  },
  '.font-header-1': {
    fontWeight: 'bold',
    fontSize: 18,
  },
  '.font-header-2': {
    fontWeight: 'bold',
    fontSize: 16,
  },
  '.font-header-3': {
    fontWeight: 'bold',
    fontSize: 14,
  },
  '.font-text-1': {
    fontWeight: 'regular',
    fontSize: 16,
  },
  '.font-text-2': {
    fontWeight: 'regular',
    fontSize: 14,
  },
  '.font-flag': {
    fontWeight: 'regular',
    fontSize: 12,
  },
  '.font-bottom-tab-active': {
    fontWeight: 'bold',
    fontSize: 10,
  },
  '.font-bottom-tab-inactive': {
    fontWeight: 'regular',
    fontSize: 10,
  },
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './App.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          400: '#ff5544',
        },
        neutral: {
          50: '#f4f7f8',
          300: '#c4c4c4',
          400: '#8b8d8e',
          700: '#222427',
          800: '#151518',
          black: '#000000',
          white: '#ffffff',
        },
        red: {
          50: '#ffecef',
          100: '#ffced4',
          200: '#f59c9c',
          300: '#ed7676',
          400: '#ff5544',
          500: '#ff4538',
          600: '#f03b37',
          700: '#dd3031',
          800: '#d0292a',
          900: '#c21b1d',
        },
        grayscale: {
          50: '#f4f7f8',
          100: '#e9e9e9',
          200: '#d9d9d9',
          300: '#c4c4c4',
          400: '#8B8D8E',
          500: '#55575B',
          600: '#333539',
          700: '#191B1D',
          800: '#151518',
          black: '#000000',
          white: '#ffffff',
        },
        white: '#ffffff',
        transparent: 'transparent',
      },
      fontFamily: {
        notoSans: ['NotoSansKR'],
      },
    },
  },
  plugins: [
    ({addUtilities}) => {
      addUtilities(typography);
    },
  ],
};
