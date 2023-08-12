/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {},
        fontFamily: {
            sans: [
                "'Roboto', sans-serif"
            ],
            body: ["'Roboto', sans-serif"]
        }
    },
    plugins: [],
}