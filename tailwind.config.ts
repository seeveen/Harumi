import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#160D1B",
        surface: "#1F1424",
        surfaceMuted: "#2A1B30",
        border: "#3A2740",
        sakura: "#FF6FA5",
        sakuraDark: "#E85394",
        rose: "#FF9DC2",
        petal: "#3A2740",
        mint: "#34D399",
        coral: "#FB6F92",
        ink: "#F7ECF3",
        inkSoft: "#B9A3B9",
      },
      fontFamily: {
        display: ["var(--font-fredoka)"],
        body: ["var(--font-jakarta)"],
      },
      borderRadius: {
        blob: "1.75rem",
        "blob-lg": "2rem 1.25rem 2rem 1.25rem",
      },
      boxShadow: {
        soft: "0 12px 30px -10px rgba(255, 111, 165, 0.18)",
        pop: "0 6px 0 0 rgba(232, 83, 148, 0.4)",
        glow: "0 0 0 1px rgba(255,255,255,0.04) inset",
      },
    },
  },
  plugins: [],
};

export default config;
