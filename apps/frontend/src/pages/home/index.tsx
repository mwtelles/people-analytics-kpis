import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { AxiosError } from "axios";
import { checkEmail } from "../../services/employees";
import { useFeatureFlags } from "../../contexts/FeatureFlags";

import ChallengeView from "./views/challenge";
import BoostView from "./views/boost";

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
          search: { email: data.email ?? email, from, to },
        });
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response?.data?.valid === false) {
        setError("E-mail não encontrado na base.");
      } else {
        setError("Erro de conexão com o servidor.");
      }
    } finally {
      setLoading(false);
    }
  }

  const viewProps = { email, setEmail, loading, error, onSubmit: handleSubmit };

  return challenge ? (
    <BoostView {...viewProps} />
  ) : (
    <ChallengeView {...viewProps} />
  );
}
