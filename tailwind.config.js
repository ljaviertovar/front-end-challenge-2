
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        "products": "repeat(auto-fill, minmax(300px, 1fr))"
      }
    },
  },
  plugins: [],
}