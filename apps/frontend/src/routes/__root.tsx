import {
  createRootRouteWithContext,
  Outlet,
} from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
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
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="in"
        exit="out"
        transition={pageTransition}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}
