import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#010102",
        panel: "#0F1011",
        panel2: "#141516",
        panel3: "#18191A",
        line: "#23252A",
        lineStrong: "#34343A",
        text: "#F7F8F8",
        muted: "#A3A8B3",
        dim: "#62666D",
        cyan: "#00D2FF",
        blue: "#A4F4FD",
        violet: "#5E6AD2"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.07), 0 16px 48px rgba(0,0,0,0.34)",
        soft: "0 12px 36px rgba(0,0,0,0.26)"
      },
      backgroundImage: {
        "radial-grid":
          "radial-gradient(circle at 50% -10%, rgba(94,106,210,0.14), transparent 36rem), linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
