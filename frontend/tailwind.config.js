/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"]
      },
      colors: {
        malibu: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae7fd",
          300: "#5ecbfc",
          400: "#37bff9",
          500: "#0da8ea",
          600: "#0187c8",
          700: "#026ba2",
          800: "#065b86",
          900: "#0c4b6e",
          950: "#083049"
        },
        primary: {
          DEFAULT: "#000000",
          50: "#f6f6f6",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#888888",
          500: "#6d6d6d",
          600: "#5d5d5d",
          700: "#4f4f4f",
          800: "#454545",
          900: "#3d3d3d",
          950: "#000000"
        }
      }
    }
  },
  plugins: [require("flowbite/plugin")]
};
