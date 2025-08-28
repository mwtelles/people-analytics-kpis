import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { AxiosError } from "axios";
import { checkEmail } from "../../services/employees";
import { useFeatureFlags } from "../../contexts/FeatureFlags";

import ChallengeView from "./views/challenge";
import BoostView from "./views/boost";

function defaultRange() {
  const end = new Date();
  const start = new Date(end.getFullYear(), end.getMonth() - 11, 1);
  const fmt = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  return { from: fmt(start), to: fmt(end) };
}

export default function Home() {
  const { flags } = useFeatureFlags();
  const { challenge } = flags;

  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { from, to } = defaultRange();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await checkEmail(email);

      if (data.valid) {
        navigate({
          to: "/dashboard",
          search: {
            email: (data.email ?? email).trim(),
            from,
            to,
          },
        });
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response?.data?.valid === false) {
        setError("E-mail não encontrado.");
      } else {
        setError("Erro de conexão com o servidor.");
      }
    } finally {
      setLoading(false);
    }
  }

  const viewProps = { email, setEmail, loading, error, onSubmit: handleSubmit };
  return challenge ? <BoostView {...viewProps} /> : <ChallengeView {...viewProps} />;
}
