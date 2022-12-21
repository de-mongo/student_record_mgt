/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        matty: {
          "50": "#fafafa",
          "100": "#ebebec",
          "200": "#d7d7d8",
          "300": "#a6acaf",
          "400": "#70797f",
          "500": "#5e696f",
          "600": "#444f56",
          "700": "#3d464c",
          "800": "#2e3539",
          "900": "#1e2326",
        },
        "grey": "#9e9e9e",
        "grey-50": "#fafafa",
        "grey-100": "#f5f5f5",
        "grey-200": "#eeeeee",
        "grey-300": "#e0e0e0",
        "grey-400": "#bdbdbd",
        "grey-500": "#9e9e9e",
        "grey-600": "#757575",
        "grey-700": "#616161",
        "grey-800": "#424242",
        "grey-900": "#212121",
        "blue-grey": "#607d8b",
        "blue-grey-50": "#eceff1",
        "blue-grey-100": "#cfd8dc",
        "blue-grey-200": "#b0bec5",
        "blue-grey-300": "#90a4ae",
        "blue-grey-400": "#78909c",
        "blue-grey-500": "#607d8b",
        "blue-grey-600": "#546e7a",
        "blue-grey-700": "#455a64",
        "blue-grey-800": "#37474f",
        "blue-grey-900": "#263238",
      }
    }
  },
  plugins: [],
}

