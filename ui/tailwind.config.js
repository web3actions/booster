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
    },
  },
  variants: {
    extend: {
      opacity: ['disabled']
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
