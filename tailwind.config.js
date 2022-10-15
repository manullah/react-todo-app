/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#16abf8",
        danger: "#ed4c5c",
        secondary: "#f4f4f4",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
