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
        // Brand palette derived from the Jaws Lawn & Snow logo (red / navy / cream).
        // Token names are legacy (from the old green theme); the VALUES now match
        // the logo so every component re-themes without edits.
        //
        // Navy — structure: headers, footers, dark bands, headings, icon chips.
        pine: { DEFAULT: "#103257", dark: "#0B2542", light: "#2C5781" },
        // Ink (near-black navy) — body text + the darkest bands.
        loam: { DEFAULT: "#0C1E34", deep: "#07131F" },
        // Cream — the page base / light text on dark bands (the logo background).
        birch: { DEFAULT: "#F5F1E7", dark: "#EBE5D6", deep: "#FBFAF3" },
        // Red — the brand accent + primary CTA (the logo "JAWS").
        sap: { DEFAULT: "#C01F22", dark: "#991619", light: "#D84A45", deep: "#4E0B0C" },
        // Cold blue — winter / snow accent (a lighter tint of the navy family).
        glacier: { DEFAULT: "#2E6E9C", dark: "#23577D", light: "#6CA0C8", ice: "#DCEAF4", deep: "#123A57" },
        // Gold — rating stars (kept; a conventional, readable star color).
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
