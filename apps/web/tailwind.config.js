/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#3456a1",
                "on-primary": "#FFFFFF",
                "primary-container": "#d8e2ff",
                background: "#fefbff",
                surface: "#fefbff",
                "on-surface": "#1b1b1f",
                error: "#ba1a1a",
                outline: "#757780",
            },
        },
    },
    plugins: [],
};
