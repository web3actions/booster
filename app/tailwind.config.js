const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./**/*.{vue,js,html}'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        brand: ['Rajdhani', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        indigo: {
          1000: '#211f5d',
          1100: '#151442'
        },
      }
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
      hover: ['disabled'],
    }
  },
  plugins: [require('@tailwindcss/forms')],
}
