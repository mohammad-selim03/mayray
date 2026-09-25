/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff8ff",
          100: "#dbeffe",
          500: "#13a0e7",
          600: "#0e87c8",
          700: "#0b6fa8",
        },
      },
    },
  },
  plugins: [],
};
