import type { Config } from "tailwindcss";

/**
 * Brand palette = "Field & Frost".
 * A warm birch-paper base under deep evergreen structure, with a seasonal accent
 * system: Sap (lawn/summer) and Glacier (snow/winter), plus a Marigold spark.
 * Pine is the one color true in both seasons — evergreens stay green in snow.
 * Token names are semantic so they never shadow Tailwind's default scales.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./site.config.ts",
  ],
  theme: {
    extend: {
      colors: {
        // Deep evergreen — the structural anchor (both seasons).
        pine: { DEFAULT: "#1E3D2C", dark: "#163020", light: "#2C5740" },
        // Warm near-black green — text + deepest bands. Not pure black.
        loam: { DEFAULT: "#13231A", deep: "#0D1812" },
        // Warm birch paper — the page base. Not stark white, not cream.
        birch: { DEFAULT: "#F4F1E8", dark: "#E9E4D5", deep: "#FBFAF4" },
        // Summer / lawn accent — bright spring grass.
        sap: { DEFAULT: "#79B515", dark: "#5E8F10", light: "#92CE2E", deep: "#173404" },
        // Winter / snow accent — cold steel-ice blue.
        glacier: { DEFAULT: "#4E86A6", dark: "#3C6E8B", light: "#7FAAC4", ice: "#DCEAF0", deep: "#0E3140" },
        // Warm spark — rating stars + small highlights.
        marigold: { DEFAULT: "#E0962E", dark: "#BE7A1C" },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        page: "1200px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        "fade-in": "fade-in 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
