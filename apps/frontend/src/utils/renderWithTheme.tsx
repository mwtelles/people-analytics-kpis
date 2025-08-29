import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lightTheme } from "../theme/light";

export function renderWithTheme(ui: ReactNode) {
  return render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);
}

export function renderWithThemeAndQueryClient(ui: ReactNode) {
  const client = new QueryClient();
  return render(
    <QueryClientProvider client={client}>
      <ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>
    </QueryClientProvider>,
  );
}
