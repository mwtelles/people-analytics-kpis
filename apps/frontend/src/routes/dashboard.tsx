import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
import { getHeadcount, getTurnover } from "../services/kpis";
import Dashboard from "../pages/dashboard";
import Layout from "../layout";

const searchSchema = z.object({
  email: z.email(),
  from: z.string().min(10),
  to: z.string().min(10),
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
  }),

  loader: async ({ context, deps }) => {
    const { queryClient } = context;

    await Promise.all([
      queryClient.ensureQueryData({
        queryKey: ["kpis", "headcount", deps.email, deps.from, deps.to],
        queryFn: () => getHeadcount(deps.email, deps.from, deps.to),
      }),
      queryClient.ensureQueryData({
        queryKey: ["kpis", "turnover", deps.email, deps.from, deps.to],
        queryFn: () => getTurnover(deps.email, deps.from, deps.to),
      }),
    ]);

    return null;
  },

  component: () => <Layout variant="landing" headerLayout="logoLeft"><Dashboard /></Layout>
});
