import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#150818",
        surface: "#1E1027",
        surfaceMuted: "#2A1534",
        border: "#3D2247",
        sakura: "#FF6FA8",
        sakuraDark: "#E24E86",
        rose: "#FFA9D3",
        bloom: "#C6428A",
        petal: "#FFD6E8",
        mint: "#5EEAD4",
        coral: "#FF8FA3",
        ink: "#F9EEF6",
        inkSoft: "#C2A7CB",
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
        soft: "0 16px 40px -12px rgba(255, 111, 168, 0.28)",
        pop: "0 5px 0 0 rgba(194, 62, 122, 0.55)",
        glow: "0 0 0 1px rgba(255,255,255,0.05) inset, 0 18px 35px -22px rgba(0,0,0,0.55)",
        card: "0 1px 0 0 rgba(255,255,255,0.05) inset, 0 20px 45px -20px rgba(198, 66, 138, 0.35)",
      },
      backgroundImage: {
        "petal-glow":
          "radial-gradient(circle, rgba(255,111,168,0.9) 0%, rgba(255,111,168,0) 70%)",
      },
    },
  },
  plugins: [],
};

export default config;
