/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js}',
        '../**/**/*.{html,js}'],
    theme: {
        extend: {
            colors: {
                'blue-gray-900': '#0F172A',
                'blue-gray-200': '#E2E8F0',
            },
            boxShadow: {
                'light-2xl': '0px 0px 15px 0px rgba(255, 255, 255, 0.07), 0px 25px 50px -12px rgba(255, 255, 255, 0.25)'
            }
        },
    },
    plugins: [],
}
