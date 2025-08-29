import { createRootRouteWithContext, Navigate, Outlet } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { TourManager } from "../modules/tour";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootLayout,
  notFoundComponent: () => <Navigate to="/" />,
});

function RootLayout() {
  return (
    <>
      <Outlet />
      <TourManager />
    </>
  );
}
