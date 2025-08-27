import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      tertiary: string;
      background: string;
      backgroundContent: string;
      text: string;
      textSecondary: string;
      textHighlight: string;
      border: string;
      surface: string;
    };
    font: {
      family: string;
      size: {
        xs: string;
        sm: string;
        base: string;
        lg: string;
        xl: string;
        "2xl": string;
      };
      weight: {
        regular: number;
        medium: number;
        semibold: number;
        bold: number;
      };
    };
    spacing: (factor: number) => string;
    radius: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      full: string;
    };
    shadow: {
      sm: string;
      md: string;
      lg: string;
    };
  }
}
