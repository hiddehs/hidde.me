module.exports = {
  purge: [
    './components/**/*.js', './pages/**/*.js', './css/**/*.css',
  ],
  theme: {
    fontWeight: {
      normal: 400,
      medium: 500,
      bold: 800,
    },
    extend: {
      fontSize: {
        'base': '1.125rem', // 18px
        'lg': '1.5rem',
        'xl': '1.75rem',
        '2xl': '2rem',
        '5xl': '3rem',
        '6xl': '4rem',
        '7xl': '5rem',
      },
      fontFamily: {
        'body': [
          'Neue Haas Grotesk Text Pro',
          'Helvetica',
          'Arial',
          'sans-serif'],
        'display': [
          'Neue Haas Grotesk Text Pro',
          'Helvetica',
          'Arial',
          'sans-serif'],
      },
      colors: {
        primary: '#FEF208',
        secondary: '#009DCA',
      },
    },
  },
  variants: {},
  plugins: [],
}

// TODO: Change line heights
