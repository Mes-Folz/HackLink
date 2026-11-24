import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#2563EB", dark: "#1D4ED8" },
        violet: { DEFAULT: "#7C3AED" },
        cyan: { DEFAULT: "#06B6D4" },
        bg: "#F8FAFC", surface: "#FFFFFF", ink: "#101828", muted: "#64748B", line: "#E2E8F0", night: "#101828",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
