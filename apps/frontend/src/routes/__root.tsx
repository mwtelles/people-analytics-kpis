import {
  createRootRouteWithContext,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { AnimatePresence, motion } from "framer-motion";
import LoadingScreen from "../components/Loading/LoadingScreen";
import { easeInOut } from "framer-motion";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootLayout,
});

const pageVariants = {
  initial: { opacity: 0, y: 40, filter: "blur(6px)" },
  in: { opacity: 1, y: 0, filter: "blur(0px)" },
  out: { opacity: 0, y: -40, filter: "blur(6px)" },
};

const pageTransition = {
  duration: 0.45,
  ease: easeInOut,
};

function RootLayout() {
  const routerState = useRouterState();

  return (
    <AnimatePresence mode="sync">
      {routerState.isLoading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(255,255,255,0.75)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <LoadingScreen />
        </motion.div>
      ) : (
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="in"
          exit="out"
          transition={pageTransition}
          style={{ minHeight: "100vh" }}
        >
          <Outlet />
          <TanStackRouterDevtools position="bottom-right" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
