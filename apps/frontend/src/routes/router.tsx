import { createRouter } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";
import { QueryClient } from "@tanstack/react-query";

export function makeRouter(queryClient: QueryClient) {
  return createRouter({
    routeTree,
    context: { queryClient },
  });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof makeRouter>;
  }
}
