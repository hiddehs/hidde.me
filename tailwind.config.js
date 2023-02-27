const {colors} = require('tailwindcss/defaultTheme')

module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './css/**/*.css'],
    theme: {
        fontWeight: {
            normal: 400,
            medium: 600,
            bold: 700,
        },
        extend: {
            fontSize: {
                'base': '1.125rem', // 18px
                // 'lg': '1.5rem',
                'xl2': '1.167rem',
                // '2xl': '2rem',
                // '5xl': '3rem',
                // '6xl': '4rem',
                // '7xl': '5rem',
            },
            fontFamily: {
                'body': [
                    'NeueHaasGrotesk',
                    'Helvetica',
                    'Arial',
                    'sans-serif'],
                'display': [
                    'NeueHaasGrotesk',
                    'Helvetica',
                    'Arial',
                    'sans-serif'],
            },
            minWidth: {
                '2/5': '40%',
            },
            colors: {
                primary: '#FEF208',
                green: "#3EAA47",
                blue: "#73CEDF",
                orange: "#F4A41B",
                red: "#F12E3E",
                secondary: '#009DCA',
                black: '#221E1F',
                gray: {
                    100: '#FBFBFB',
                    200: '#F7F7F7',
                    300: '#F2F2F2',
                    400: '#EEEEEE',
                    500: '#EAEAEA',
                    600: '#BBBBBB',
                    700: '#8C8C8C',
                    800: '#5E5E5E',
                    900: '#221E1F',
                },
            },
        },
    },
    variants: {},
    plugins: [],
}

// TODO: Change line heights
