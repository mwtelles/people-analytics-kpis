import { DefaultTheme } from "styled-components";

export const darkTheme: DefaultTheme = {
  colors: {
    primary: "#38bdf8",
    primaryHover: "#0ea5e9",
    secondary: "#1e293b",
    secondaryHover: "#334155",
    tertiary: "#0284c7",
    tertiaryHover: "#0369a1",

    background: "#0f172a",
    backgroundContent: "#1e293b",

    text: "#f1f5f9",
    textSecondary: "#cbd5e1",
    textHighlight: "#38bdf8",

    border: "#334155",
    surface: "#1e293b",

    success: "#22c55e",
    successHover: "#16a34a",
    warning: "#fbbf24",
    warningHover: "#f59e0b",
    error: "#ef4444",
    errorHover: "#dc2626",
  },
  font: {
    family: "'Inter', sans-serif",
    size: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
    },
    weight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  spacing: (factor: number) => `${0.25 * factor}rem`,
  radius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    full: "9999px",
  },
  shadow: {
    sm: "0 1px 2px rgba(0,0,0,0.3)",
    md: "0 4px 6px rgba(0,0,0,0.4)",
    lg: "0 10px 15px rgba(0,0,0,0.5)",
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
};
