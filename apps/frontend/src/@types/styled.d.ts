import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryHover: string;
      secondary: string;
      secondaryHover: string;
      tertiary: string;
      tertiaryHover: string;

      background: string;
      backgroundContent: string;

      text: string;
      textSecondary: string;
      textHighlight: string;

      border: string;
      surface: string;

      success: string;
      successHover: string;
      warning: string;
      warningHover: string;
      error: string;
      errorHover: string;
    };
    font: {
      family: string;
      size: Record<string, string>;
      weight: Record<string, number>;
    };
    spacing: (factor: number) => string;
    radius: Record<string, string>;
    shadow: Record<string, string>;
    breakpoints: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  }
}
