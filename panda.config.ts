import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  jsxFramework: "qwik",

  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        //* custom component colors
        colors: {
          primary: { value: "#2563EB" },
          secondary: { value: "#6B7280" },
          success: { value: "#059669" },
          warning: { value: "#D97706" },
          danger: { value: "#DC2626" },
          info: { value: "#0891B2" },
          light: { value: "#F9FAFB" },
          dark: { value: "#1F2A44" },
          link: { value: "#3B82F6" },
        },
      },

      recipes: {},

      slotRecipes: {},
    },
  },

  staticCss: {
    recipes: "*",
  },

  strictPropertyValues: false,
  strictTokens: false,
  hash: true,

  // The output directory for your css system
  outdir: "src/styled-system",
});
