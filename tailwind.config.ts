import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0A0710",
        surface: "#150F1C",
        surfaceHi: "#1D1526",
        line: "rgba(255,255,255,0.08)",
        sakura: "#FF6FB8",
        sakuraDeep: "#E23F86",
        rose: "#FFB6DC",
        lilac: "#C76BFF",
        lilacSoft: "#D9A6FF",
        mint: "#6EE7C8",
        ink: "#F6EFF8",
        inkSoft: "#A99BB3",
      },
      fontFamily: {
        display: ["var(--font-baloo)"],
        body: ["var(--font-jakarta)"],
      },
      borderRadius: {
        xl2: "1.25rem",
        blob: "1.5rem",
        "blob-lg": "1.75rem",
      },
      boxShadow: {
        soft: "0 20px 45px -18px rgba(255, 111, 184, 0.35)",
        pop: "0 4px 0 0 rgba(194, 47, 122, 0.6)",
        glow: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 18px 40px -24px rgba(0,0,0,0.6)",
        card: "0 1px 0 0 rgba(255,255,255,0.05) inset, 0 22px 50px -22px rgba(199, 71, 158, 0.4)",
      },
      backgroundImage: {
        "grad-brand": "linear-gradient(135deg, #FF6FB8 0%, #C76BFF 100%)",
        "grad-brand-soft": "linear-gradient(135deg, #FF9DCF 0%, #D9A6FF 100%)",
        "grad-mesh": "radial-gradient(circle, rgba(255,111,184,0.9) 0%, rgba(255,111,184,0) 70%)",
      },
    },
  },
  plugins: [],
};

export default config;
