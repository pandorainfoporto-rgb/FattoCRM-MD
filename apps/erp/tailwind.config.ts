import type { Config } from "tailwindcss";

// FattoCRM — config Tailwind v3.
// Tokens semânticos vivem em globals.css via CSS vars (--color-foreground como RGB triple,
// --color-background como hex, --color-azure-500 etc).
//
// Padrão herdado do Fatto V2: cores de marca em CSS vars; classes Tailwind aceitam
// tanto bg-[var(--color-foo)] quanto bg-foreground (mapeadas abaixo).
const config: Config = {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Aliases pra CSS vars — permitem `bg-primary`, `text-foreground/40`, etc.
        background: "var(--color-background)",
        "background-elevated": "var(--color-background-elevated)",
        foreground: "rgb(var(--color-foreground) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)",
        primary: {
          DEFAULT: "var(--color-primary)",
          foreground: "var(--color-primary-foreground)",
        },
        muted: {
          DEFAULT: "var(--color-muted)",
          foreground: "var(--color-muted-foreground)",
        },
        accent: "var(--color-accent)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        error: "var(--color-error)",
        // Brand
        "brand-primary": "var(--color-brand-primary)",
        "brand-cyan": "var(--color-brand-cyan)",
        "brand-dark": "var(--color-brand-dark)",
      },
      fontFamily: {
        heading: "var(--font-family-heading)",
        body: "var(--font-family-body)",
      },
      boxShadow: {
        brand: "0 0 40px rgb(0 160 227 / 0.35)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(-4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 200ms ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
