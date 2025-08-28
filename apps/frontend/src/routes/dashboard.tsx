import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
import { getKpis } from "../services/kpis";
import Dashboard from "../pages/dashboard";
import Layout from "../layout";

const searchSchema = z.object({
  email: z.email(),
  from: z.string().regex(/^\d{4}-\d{2}$/, "Use o formato YYYY-MM"),
  to: z.string().regex(/^\d{4}-\d{2}$/, "Use o formato YYYY-MM"),
  scope: z.enum(["total", "grouped", "hierarchy"]).optional().default("total"),
  includeMeta: z.coerce.boolean().optional().default(false),
});

export const Route = createFileRoute("/dashboard")({
  validateSearch: zodValidator(searchSchema),

  beforeLoad: ({ search }) => {
    if (!search?.email) throw redirect({ to: "/" });
  },

  loaderDeps: ({ search }) => ({
    email: search.email,
    from: search.from,
    to: search.to,
    scope: search.scope ?? "total" as "total" | "grouped" | "hierarchy",
    includeMeta: search.includeMeta ?? false,
  }),

  loader: async ({ context, deps }) => {
    const { queryClient } = context;

    await queryClient.ensureQueryData({
      queryKey: ["kpis", "series", deps.email, deps.from, deps.to, deps.scope, deps.includeMeta],
      queryFn: () => {
        switch (deps.scope) {
          case "total":
            return getKpis(deps.email, deps.from, deps.to, "total", deps.includeMeta);
          case "grouped":
            return getKpis(deps.email, deps.from, deps.to, "grouped", deps.includeMeta);
          case "hierarchy":
            return getKpis(deps.email, deps.from, deps.to, "hierarchy", deps.includeMeta);
        }
      },
    });

    return null;
  },

  component: () => (
    <Layout variant="landing" headerLayout="logoLeft">
      <Dashboard />
    </Layout>
  ),
});
