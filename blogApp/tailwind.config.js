/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: "jit",
    content: [
        "index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                roboto: ['"Poppins", "sans-serif";'],
                lato: ['"Lato", "sans-serif"'],
            },
        },
    },
    plugins: [
        // require('tailwind-scrollbar-hide')
    ],
};


