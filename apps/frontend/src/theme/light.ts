import { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
  colors: {
    primary: "#0086c9",
    primaryHover: "#0369a1",
    secondary: "#E0F2FE",
    secondaryHover: "#BAE6FD",
    tertiary: "#065986",
    tertiaryHover: "#0E7490",

    background: "#ffffff",
    backgroundContent: "#F9FAFB",

    text: "#101828",
    textSecondary: "#667085",
    textHighlight: "#0284C7",

    border: "#e5e7eb",
    surface: "#f3f4f6",

    success: "#16a34a",
    successHover: "#15803d",
    warning: "#f59e0b",
    warningHover: "#d97706",
    error: "#dc2626",
    errorHover: "#b91c1c",

    borderSoft: "rgba(255, 255, 255, 0.08)",
    borderSubtle: "rgba(255, 255, 255, 0.05)",
    overlayGrid: `linear-gradient(rgba(0, 0, 0, 0.07) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 0, 0, 0.07) 1px, transparent 1px)`,
    landingBackground: "radial-gradient(circle at top, #f0f9ff, #e0f2fe)",
    glowPrimary: "rgba(0, 180, 216, 0.20)",
    glowSecondary: "rgba(0, 180, 216, 0.10)",
    glowPrimaryRadial: "radial-gradient(circle, rgba(0, 180, 216, 0.74), transparent 70%)",
    glowSecondaryRadial: "radial-gradient(circle, rgba(0, 180, 216, 0.74), transparent 70%)",
    buttonGlass: "rgba(0,0,0,0.05)",
    overlay: "rgba(255, 255, 255, 0.6)",
    overlayStrong: "rgba(255, 255, 255, 0.9)",
    overlayInput: "rgba(255, 255, 255, 0.8)",

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
    sm: "0 1px 2px rgba(16, 24, 40, 0.05)",
    md: "0 4px 6px rgba(16, 24, 40, 0.07)",
    lg: "0 10px 15px rgba(16, 24, 40, 0.1)",
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
};
