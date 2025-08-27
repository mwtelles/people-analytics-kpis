import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import Layout from "../layout";
import { TourManager } from "../modules/tour";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootLayout,
});

function RootLayout() {
  return (
    <Layout>
      <Outlet />
      <TourManager />
    </Layout>
  );
}
