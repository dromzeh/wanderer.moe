/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

module.exports = {
    content: ['./src/**/*.{html,svelte,ts,js}'],
    options: {
        whitelistPatterns: [/svelte-/],
        defaultExtractor: (content) =>
            [...content.matchAll(/(?:class:)*([\w\d-/:%.]+)/gm)].map(
                ([_match, group, ..._rest]) => group
            ),
    },
    theme: {
        extend: {
            animation: {
                text: 'text 1s ease infinite',
            },
            keyframes: {
                text: {
                    '0%, 100%': {
                        'background-size': '200% 200%',
                        'background-position': 'left center',
                    },
                    '50%': {
                        'background-size': '200% 200%',
                        'background-position': 'right center',
                    },
                },
            },
            textShadow: {
                sm: '0 1px 2px var(--tw-shadow-color)',
                DEFAULT: '0 2px 4px var(--tw-shadow-color)',
                lg: '0 8px 16px var(--tw-shadow-color)',
            },
            colors: {
                main: {
                    100: '#5b5b5b',
                    200: '#434343',
                    300: '#2c2c2c',
                    400: '#141414',
                    500: '#101010',
                    600: '#0c0c0c',
                    700: '#080808',
                    800: '#040404',
                    900: '#000000',
                },
                accent: {
                    100: '#9294f5',
                    200: '#8285f4',
                    300: '#7375f2',
                    400: '#6366f1',
                    500: '#4f52c1',
                    600: '#3b3d91',
                    700: '#282960',
                    800: '#141430',
                    900: '#0a0a18',
                },
            },
        },
    },
    plugins: [
        plugin(function ({ matchUtilities, theme }) {
            matchUtilities(
                {
                    'text-shadow': (value) => ({
                        textShadow: value,
                    }),
                },
                {
                    values: theme('textShadow'),
                }
            )
        }),
    ],
}
