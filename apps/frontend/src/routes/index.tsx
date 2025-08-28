import { createFileRoute } from "@tanstack/react-router";
import Home from "../pages/home";
import Layout from "../layout";

export const Route = createFileRoute("/")({
  component: () => <Layout><Home /></Layout>,
});
