import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { AxiosError } from "axios";
import { motion } from "framer-motion";
import * as S from "./style";
import { EmailInput } from "../../components/EmailInput";
import Spinner from "../../components/Loading/Spinner";
import { checkEmail } from "../../services/employees";

function defaultRange() {
  const end = new Date();
  const start = new Date(end.getFullYear(), end.getMonth() - 11, 1);
  const fmt = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  return { from: fmt(start), to: fmt(end) };
}

export default function HomePage() {
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

  return (
    <S.Wrapper>
      <S.Headline
        data-tour="headline"
        as={motion.h1}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        People Analytics <span>KPIs</span>
      </S.Headline>

      <S.Subheadline
        as={motion.p}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Monitore <strong>Headcount</strong> e <strong>Turnover</strong> com dashboards claros e
        intuitivos.
      </S.Subheadline>

      <S.Divider>
        <span>Busca Inteligente</span>
      </S.Divider>

      <S.Card
        as={motion.div}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
      >
        <S.FormIntro>
          Digite seu <strong>e-mail corporativo</strong> para acessar
        </S.FormIntro>

        <S.Form onSubmit={handleSubmit}>
          <EmailInput
            data-tour="email-input"
            value={email}
            onChange={setEmail}
            required
            domainWhitelist={["kpis.tech"]}
            externalError={error}
          />

          <S.SubmitButton data-tour="submit-btn" type="submit" disabled={loading}>
            {loading ? <Spinner /> : "Ver KPIs"}
          </S.SubmitButton>
        </S.Form>

        {error && <S.ErrorBox>{error}</S.ErrorBox>}
      </S.Card>
    </S.Wrapper>
  );
}
