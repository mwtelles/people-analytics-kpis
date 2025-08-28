import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import * as S from "./style";
import { Scope, useKpis } from "../../../../hooks/useKpis";
import { formatMonth } from "../../../../utils/date";
import { DatePicker } from "../../../../components/DatePicker";
import { formatValue } from "../../../../utils/formatValue";
import { mapKpiDataToChart } from "../../../../utils/mapKpiDataToChart";
import LineChart from "../../../../components/Chart/Boost/Line";

interface Props {
  email: string;
  from: string;
  to: string;
}

export default function BoostView({ email, from: initialFrom, to: initialTo }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scope, setScope] = useState<Scope>("total");
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [chatOpen, setChatOpen] = useState(false);

  const { headcount, turnover, summary, isLoading } = useKpis({ email, from, to, scope });

  return (
    <S.Container>
      <S.Toolbar>
        <S.HeadlineContainer>
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
            Os dados do usuário já estão disponíveis a partir de{" "}
            {formatMonth(from, { format: "long", showYear: "numeric" })} até{" "}
            {formatMonth(to, { format: "long", showYear: "numeric" })}.
          </S.Subheadline>
        </S.HeadlineContainer>
        <S.Wrapper>
          <S.Select value={scope} onChange={(e) => setScope(e.target.value as Scope)}>
            <option value="total">Total</option>
            <option value="grouped">Diretos vs Indiretos</option>
            <option value="hierarchy">Hierarquia</option>
          </S.Select>
          <S.DateContainer>
            <DatePicker
              mode="range"
              variant="dropdown"
              value={[from, to]}
              defaultValue={[initialFrom, initialTo]}
              onChange={(val) => {
                if (Array.isArray(val)) {
                  setFrom(val[0]);
                  setTo(val[1]);
                }
              }}
              limitRangeDays={1800}
              selectionLevel="month"
              shortcuts={["today", "week", "month", 7, 15, 30]}
              displayFormat="DD/MM/YYYY"
            />
          </S.DateContainer>
        </S.Wrapper>
      </S.Toolbar>

      <S.GridContainer>
        <S.Card>
          <S.CardIcon>
            <S.BarIcon />
          </S.CardIcon>
          <S.CardContainer>
            <S.CardTitle>Headcount Atual</S.CardTitle>
            <S.CardValue>{formatValue(summary?.headcount.last ?? 0, false)}</S.CardValue>
          </S.CardContainer>
        </S.Card>

        <S.Card>
          <S.CardIcon>
            <S.BarIcon />
          </S.CardIcon>
          <S.CardContainer>
            <S.CardTitle>Média Headcount</S.CardTitle>
            <S.CardValue>{formatValue(summary?.headcount.avg ?? 0, false)}</S.CardValue>
          </S.CardContainer>
        </S.Card>

        <S.Card>
          <S.CardIcon>
            <S.BarIcon />
          </S.CardIcon>
          <S.CardContainer>
            <S.CardTitle>Máximo Headcount</S.CardTitle>
            <S.CardValue>{formatValue(summary?.headcount.max ?? 0, false)}</S.CardValue>
          </S.CardContainer>
        </S.Card>

        <S.Card>
          <S.CardIcon>
            <S.BarIcon />
          </S.CardIcon>
          <S.CardContainer>
            <S.CardTitle>Turnover Atual</S.CardTitle>
            <S.CardValue>{formatValue(summary?.turnover.last ?? 0, true)}</S.CardValue>
          </S.CardContainer>
        </S.Card>

        <S.Card>
          <S.CardIcon>
            <S.BarIcon />
          </S.CardIcon>
          <S.CardContainer>
            <S.CardTitle>Máximo Turnover</S.CardTitle>
            <S.CardValue>{formatValue(summary?.turnover.max ?? 0, true)}</S.CardValue>
          </S.CardContainer>
        </S.Card>
      </S.GridContainer>

      <S.GridChart>
        <S.CardChart
          ref={containerRef}
          style={{
            minHeight: 320,
            maxHeight: 480,
            width: "100%",
            maxWidth: "100%",
            overflow: "auto",
          }}
        >
          <LineChart
            title="Headcount"
            data={headcount}
          />
        </S.CardChart>

        <S.CardChart
          ref={containerRef}
          style={{
            minHeight: 320,
            maxHeight: 480,
            width: "100%",
            maxWidth: "100%",
            overflow: "auto",
          }}
        >
          <LineChart
            title="Turnover"
            data={turnover}
            isPercentage
          />
        </S.CardChart>
      </S.GridChart>

    </S.Container>
  );
}
