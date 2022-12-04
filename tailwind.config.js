
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        "products": "repeat(auto-fill, minmax(260px, 1fr))",
        "categories": "repeat(auto-fill, minmax(200px, 1fr))"
      }
    },
  },
  plugins: [],
}