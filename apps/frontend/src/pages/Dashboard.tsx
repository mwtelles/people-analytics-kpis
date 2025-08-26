import { useQuery } from "@tanstack/react-query";
import { Route } from "../routes/dashboard";
import { getHeadcount, getTurnover } from "../services/kpis";

export default function Dashboard() {
  const { email, from, to } = Route.useSearch();

  const { data: headcount } = useQuery({
    queryKey: ["kpis", "headcount", email, from, to],
    queryFn: () => getHeadcount(email, from, to),
  });

  const { data: turnover } = useQuery({
    queryKey: ["kpis", "turnover", email, from, to],
    queryFn: () => getTurnover(email, from, to),
  });

  if (!headcount || !turnover) return <p>Carregando...</p>;

  return (
    <main>
      <h2>Dashboard — {email}</h2>
      <section>
        <h3>Headcount</h3>
        <pre>{JSON.stringify(headcount, null, 2)}</pre>
      </section>
      <section>
        <h3>Turnover</h3>
        <pre>{JSON.stringify(turnover, null, 2)}</pre>
      </section>
    </main>
  );
}
