import { useMemo, useRef, useState } from "react";
import * as S from "./style";
import { Scope, useKpis } from "../../hooks/useKpis";
import { useSearch } from "@tanstack/react-router";
import AiFloatingChat from "../../components/AiFloatingToggle";
import ReportTree from "./components/ReportTree";
import DashboardHeader from "./components/Header";
import KpiCards from "./components/KpiCards";
import KpiCharts from "./components/KpiCharts";
import { buildChildSeriesMap } from "../../utils/seriesUtils";
import type { HierarchyNodeResponse, KpiPoint } from "../../interfaces/kpi";

type SeriesMap = Record<string, KpiPoint[]>;

export default function DashboardPage() {
  const headcountContainerRef = useRef<HTMLDivElement>(null);
  const turnoverContainerRef = useRef<HTMLDivElement>(null);
  const search = useSearch({ from: "/dashboard" });
  const { email, from: initialFrom, to: initialTo } = search;
  const [scope, setScope] = useState<Scope>("total");
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);

  const { headcount, turnover, summary } = useKpis({ email, from, to, scope });

  const headcountSeriesTop: SeriesMap = useMemo(() => {
    if (headcount.scope === "hierarchy") {
      const syntheticRoot: HierarchyNodeResponse = {
        id: -1,
        name: "Root",
        email: "",
        position: undefined,
        status: "ativo",
        counts: { direct: 0, indirect: 0, total: 0 },
        metrics: { headcount: headcount.total, turnover: turnover.total },
        reports: (headcount.reports ?? []) as HierarchyNodeResponse[],
      };
      return buildChildSeriesMap(syntheticRoot, "headcount", 6);
    }
    if (headcount.scope === "grouped") {
      return { Total: headcount.total, Diretos: headcount.direct, Indiretos: headcount.indirect };
    }
    return { Total: headcount.total };
  }, [headcount, turnover]);

  const turnoverSeriesTop: SeriesMap = useMemo(() => {
    if (turnover.scope === "hierarchy") {
      const syntheticRoot: HierarchyNodeResponse = {
        id: -1,
        name: "Root",
        email: "",
        position: undefined,
        status: "ativo",
        counts: { direct: 0, indirect: 0, total: 0 },
        metrics: { headcount: headcount.total, turnover: turnover.total },
        reports: (turnover.reports ?? []) as HierarchyNodeResponse[],
      };
      return buildChildSeriesMap(syntheticRoot, "turnover", 6);
    }
    if (turnover.scope === "grouped") {
      return { Total: turnover.total, Diretos: turnover.direct, Indiretos: turnover.indirect };
    }
    return { Total: turnover.total };
  }, [headcount, turnover]);

  const hierarchyReports =
    headcount.scope === "hierarchy" ? (headcount.reports as HierarchyNodeResponse[]) : [];

  return (
    <S.Container>
      <DashboardHeader
        scope={scope}
        onScopeChange={setScope}
        from={from}
        to={to}
        onRangeChange={([f, t]) => { setFrom(f); setTo(t); }}
        initialFrom={initialFrom}
        initialTo={initialTo}
      />

      <KpiCards summary={summary ?? null} />

      <KpiCharts
        headcountSeriesTop={headcountSeriesTop}
        turnoverSeriesTop={turnoverSeriesTop}
        headcountContainerRef={headcountContainerRef as React.RefObject<HTMLDivElement>}
        turnoverContainerRef={turnoverContainerRef as React.RefObject<HTMLDivElement>}
      />

      {scope === "hierarchy" && (
        <S.HierarchySection>
          <S.SectionTitle>Detalhes por Gestor</S.SectionTitle>
          <ReportTree reports={hierarchyReports} />
        </S.HierarchySection>
      )}

      <S.CardContainer>
        <S.ChatContainer data-tour="chat">
          <AiFloatingChat />
        </S.ChatContainer>
      </S.CardContainer>
    </S.Container>
  );
}
