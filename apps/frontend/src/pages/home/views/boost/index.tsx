import { motion } from "framer-motion";
import * as S from "./style";
import { EmailInput } from "../../../../components/EmailInput";
import Spinner from "../../../../components/Loading/Spinner";

interface Props {
  email: string;
  setEmail: (v: string) => void;
  loading: boolean;
  error: string | null;
  onSubmit: (e: React.FormEvent) => void;
}

export default function BoostView({ email, setEmail, loading, error, onSubmit }: Props) {
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

        <S.Form onSubmit={onSubmit}>
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
