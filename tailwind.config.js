/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primeGreen: "#2f4e44",
        buttonGreen: "#658a71",
        bodyColor: "#fafaf1",
      },
    },
  },
  plugins: [],
};
