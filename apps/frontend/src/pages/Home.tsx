import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

function defaultRange() {
  const end = new Date();
  const start = new Date();
  start.setMonth(start.getMonth() - 11);
  const fmt = (d: Date) => d.toISOString().slice(0, 10);
  return {
    from: fmt(new Date(start.getFullYear(), start.getMonth(), 1)),
    to: fmt(new Date(end.getFullYear(), end.getMonth() + 1, 0)),
  };
}

export default function Home() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { from, to } = defaultRange();

  return (
    <main style={{ maxWidth: 520, margin: "64px auto", padding: 24 }}>
      <h1>🚀 People Analytics KPIs</h1>
      <p>Informe seu e-mail para visualizar os KPIs do seu escopo.</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate({
            to: "/dashboard",
            search: { email, from, to },
          });
        }}
      >
        <input
          type="email"
          required
          placeholder="seu.email@empresa.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: 12, margin: "12px 0" }}
        />
        <button type="submit">Ver KPIs</button>
      </form>
    </main>
  );
}
