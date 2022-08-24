/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif", "ui-sans-serif", "system-ui"],
      },
      backgroundColor: {
        main: "#1f1f1f",
      },
    },
  },
  plugins: [],
};
