import type { Config } from "tailwindcss";

// Paleta MD — ver Brand/BRANDBOOK.md §3.
// Cores fixas no LP (sem dark toggle — hero é navy, body é paper, cada seção tem
// sua identidade rígida pra preservar o storytelling).
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        md: {
          "navy-deep": "#0B1E3B",
          navy: "#1E3A5F",
          gold: "#C5A572",
          "gold-soft": "#D9C19A",
          paper: "#F8F5EF",
          ink: "#0F172A",
          success: "#10B981",
          warning: "#F59E0B",
          danger: "#DC2626",
          info: "#3B82F6",
          "gray-50": "#F8FAFC",
          "gray-200": "#E2E8F0",
          "gray-400": "#94A3B8",
          "gray-700": "#334155",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
        body: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        display: ["clamp(2.5rem, 6vw, 5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        h1: ["clamp(2rem, 4vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        h2: ["clamp(1.5rem, 3vw, 2rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        h3: ["1.5rem", { lineHeight: "1.3" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6" }],
      },
      boxShadow: {
        "md-card": "0 2px 12px rgba(11, 30, 59, 0.08)",
        "md-card-lg": "0 8px 32px rgba(11, 30, 59, 0.12)",
        "md-gold": "0 0 0 1px rgba(197, 165, 114, 0.3), 0 8px 24px rgba(197, 165, 114, 0.15)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-slow": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 600ms ease-out",
        "fade-in-slow": "fade-in-slow 1200ms ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
