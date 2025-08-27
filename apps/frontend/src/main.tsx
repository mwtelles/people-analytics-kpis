import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { GlobalStyle } from "./theme/global";
import Layout from "./layout";
import { FeatureFlagsProvider } from "./contexts/FeatureFlags";
import { ThemeModeProvider } from "./contexts/ThemeMode";

const queryClient = new QueryClient();
const router = createRouter({ routeTree, context: { queryClient } });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <FeatureFlagsProvider>
        <ThemeModeProvider>
          <GlobalStyle />
          <RouterProvider router={router} />
        </ThemeModeProvider>
      </FeatureFlagsProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
