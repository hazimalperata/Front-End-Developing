/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./pages/**/*.{html,js}',
        '../**/**/*.{html,js}'],
    theme: {
        extend: {
            colors: {
                'blue-gray-200': '#E2E8F0',
                'blue-gray-600': '#475569',
                'blue-gray-700': '#334155',
                'blue-gray-900': '#0F172A',
                'blue-light-700': '#0369A1',
                'overlay-dark-75': 'rgba(18, 22, 25, 0.75)',
            },
            boxShadow: {
                'light-2xl': '0px 0px 15px 0px rgba(255, 255, 255, 0.07), 0px 25px 50px -12px rgba(255, 255, 255, 0.25)',
                'dark-m': '0px 0px 4px 0px rgba(0, 0, 0, 0.07), 0px 4px 6px -1px rgba(0, 0, 0, 0.10)',
                'dark-l': '0px 0px 6px 0px rgba(0, 0, 0, 0.07), 0px 10px 15px -3px rgba(0, 0, 0, 0.10)',
                'dark-xl': '0px 0px 10px 0px rgba(0, 0, 0, 0.07), 0px 20px 25px -5px rgba(0, 0, 0, 0.10)',
                'dark-2xl': '0px 0px 15px 0px rgba(0, 0, 0, 0.07), 0px 25px 50px -12px rgba(0, 0, 0, 0.25)'
            },
            fontSize: {
                '32': '32px',
                '56': '56px',
            },
            borderRadius: {
                '5': '5px',
                '20': '20px',
                '30': '30px',
                '50': '50px'
            },
            padding: {
                '5px': '5px'
            },
            gap: {
                '5px': '5px'
            },
            zIndex: {
                '1': '1',
                '2': '2',
                '3': '3',
            }
        },
    },
    plugins: [],
}
