import type { Config } from "tailwindcss";

// Paleta MD — alinhada ao logo oficial (Brand/logos/logo-md-original.jpg).
// Navy-azul-marinho profundo + ciano vibrante, sem dourado.
// Ver Brand/BRANDBOOK.md §3.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        md: {
          "navy-deep": "#1C2A6E",
          navy: "#2C3E8E",
          cyan: "#00A0E3",
          "cyan-soft": "#5EBCEC",
          paper: "#F4F6FA",
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
        "md-card": "0 2px 12px rgba(28, 42, 110, 0.08)",
        "md-card-lg": "0 8px 32px rgba(28, 42, 110, 0.14)",
        "md-cyan": "0 0 0 1px rgba(0, 160, 227, 0.3), 0 8px 24px rgba(0, 160, 227, 0.18)",
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
