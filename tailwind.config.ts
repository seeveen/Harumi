import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        blush: "#FFF6FA",
        surface: "#FFFFFF",
        petal: "#FFE1ED",
        sakura: "#FF7EB0",
        sakuraDark: "#E85394",
        rose: "#C2417A",
        plum: "#3A2333",
        plumSoft: "#7A5A6B",
      },
      fontFamily: {
        display: ["var(--font-fredoka)"],
        body: ["var(--font-jakarta)"],
      },
      borderRadius: {
        blob: "2rem",
        "blob-lg": "2.75rem 1.5rem 2.75rem 1.5rem",
      },
      boxShadow: {
        soft: "0 12px 30px -8px rgba(226, 87, 148, 0.25)",
        pop: "0 6px 0 0 rgba(226, 87, 148, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
