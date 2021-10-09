module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./hoc/**/*.{js,ts,jsx,tsx}", "./contexts/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      bg: "#1F222B",
      fg: "#fff",
      accent1: "#698AFF",
      accentInverted1: "#fff",
      muted1: "#C8C8C8",
      bgVariant1: "#282C38",
      bgVariantInverted1: "#fff",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
