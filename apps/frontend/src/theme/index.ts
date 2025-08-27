import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  colors: {
    primary: "#0086c9",
    secondary: "#E0F2FE",
    tertiary: "#065986",

    background: "#ffffff",
    backgroundContent: "#F9FAFB",

    text: "#101828",
    textSecondary: "#667085",
    textHighlight: "#B9E6FE",

    border: "#e5e7eb",
    surface: "#f3f4f6",
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
};
