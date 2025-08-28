import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import * as S from "./style";
import { Scope, useKpis } from "../../../../hooks/useKpis";
import { DatePicker } from "../../../../components/DatePicker";
import { formatValue } from "../../../../utils/formatValue";
import { formatMonth } from "../../../../utils/date";
import LineChart from "../../../../components/Chart/Boost/Line";
import type { KpiPoint, HierarchyNodeResponse } from "../../../../interfaces/kpi";
import Select from "../../../../components/Select";

interface Props {
  email: string;
  from: string;
  to: string;
}

type SeriesMap = Record<string, KpiPoint[]>;

function sumSeriesByMonth(seriesList: KpiPoint[][]): KpiPoint[] {
  const months = Array.from(new Set(seriesList.flatMap(s => s.map(p => p.month)))).sort();
  return months.map(month => ({
    month,
    value: seriesList.reduce((acc, s) => acc + (s.find(p => p.month === month)?.value ?? 0), 0),
  }));
}

function buildChildSeriesMap(
  node: HierarchyNodeResponse,
  metric: "headcount" | "turnover",
  topN = 6
): SeriesMap {
  const total = node.metrics[metric] ?? [];
  const children = (node.reports ?? []).map(child => {
    const series = child.metrics[metric] ?? [];
    const last = series.length > 0 ? series[series.length - 1]?.value ?? 0 : 0;
    return { name: child.name, series, last };
  });

  children.sort((a, b) => b.last - a.last);
  const top = children.slice(0, topN);
  const rest = children.slice(topN);

  const map: SeriesMap = { Total: total };
  top.forEach(({ name, series }) => (map[name] = series));
  if (rest.length) map[`Outros (${rest.length})`] = sumSeriesByMonth(rest.map(c => c.series));

  return map;
}

export default function BoostView({ email, from: initialFrom, to: initialTo }: Props) {
  const headcountContainerRef = useRef<HTMLDivElement>(null);
  const turnoverContainerRef = useRef<HTMLDivElement>(null);

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
        reports: (headcount.reports ?? []) as unknown as HierarchyNodeResponse[],
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
        reports: (turnover.reports ?? []) as unknown as HierarchyNodeResponse[],
      };
      return buildChildSeriesMap(syntheticRoot, "turnover", 6);
    }
    if (turnover.scope === "grouped") {
      return { Total: turnover.total, Diretos: turnover.direct, Indiretos: turnover.indirect };
    }
    return { Total: turnover.total };
  }, [headcount, turnover]);

  function renderReports(reports: HierarchyNodeResponse[]): React.ReactNode {
    if (!reports?.length) return null;

    return reports.map((report) => {
      const headcountMap = buildChildSeriesMap(report, "headcount", 5);
      const turnoverMap = buildChildSeriesMap(report, "turnover", 5);

      return (
        <S.ReportCard key={report.id}>
          <S.ReportHeader>
            <S.ReportName>{report.name}</S.ReportName>
            {report.position && <S.ReportPosition>{report.position}</S.ReportPosition>}
          </S.ReportHeader>

          <S.ReportCharts>
            <S.CardChart>
              <LineChart title="Headcount" data={headcountMap} />
            </S.CardChart>

            <S.CardChart>
              <LineChart title="Turnover" data={turnoverMap} isPercentage />
            </S.CardChart>
          </S.ReportCharts>

          {report.reports?.length ? (
            <S.SubReports>{renderReports(report.reports)}</S.SubReports>
          ) : null}
        </S.ReportCard>
      );
    });
  }

  const hierarchyReports =
    headcount.scope === "hierarchy" ? (headcount.reports as HierarchyNodeResponse[]) : [];

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
            Os dados do usuário já estão disponíveis de{" "}
            <strong>{formatMonth(from, { format: "short", showYear: "numeric" })}</strong> até{" "}
            <strong>{formatMonth(to, { format: "short", showYear: "numeric" })}</strong>.
          </S.Subheadline>
        </S.HeadlineContainer>

        <S.Wrapper>
          <Select
            value={scope}
            onChange={(val) => setScope(val as Scope)}
            options={[
              { value: "total", label: "Total" },
              { value: "grouped", label: "Diretos vs Indiretos" },
              { value: "hierarchy", label: "Hierarquia" },
            ]}
          />


          <S.DateContainer>
            <DatePicker
              mode="range"
              variant="dropdown"
              value={[from, to]}
              defaultValue={[initialFrom, initialTo]}
              dateFormat="YYYY-MM"
              onChange={(val) => {
                if (Array.isArray(val)) {
                  setFrom(val[0]);
                  setTo(val[1]);
                }
              }}
              shortcuts={[
                "thisMonth",
                "last3Months",
                "last6Months",
                "thisYear",
                "lastYear",
                "last3Years",
                "last5Years",
              ]}
            />
          </S.DateContainer>
        </S.Wrapper>
      </S.Toolbar>

      <S.GridContainer>
        <S.Card>
          <S.CardIcon><S.BarIcon /></S.CardIcon>
          <S.CardContainer>
            <S.CardTitle>Headcount Atual</S.CardTitle>
            <S.CardValue>{formatValue(summary?.headcount.last ?? 0, false)}</S.CardValue>
          </S.CardContainer>
        </S.Card>

        <S.Card>
          <S.CardIcon><S.BarIcon /></S.CardIcon>
          <S.CardContainer>
            <S.CardTitle>Média Headcount</S.CardTitle>
            <S.CardValue>{formatValue(summary?.headcount.avg ?? 0, false)}</S.CardValue>
          </S.CardContainer>
        </S.Card>

        <S.Card>
          <S.CardIcon><S.BarIcon /></S.CardIcon>
          <S.CardContainer>
            <S.CardTitle>Máximo Headcount</S.CardTitle>
            <S.CardValue>{formatValue(summary?.headcount.max ?? 0, false)}</S.CardValue>
          </S.CardContainer>
        </S.Card>

        <S.Card>
          <S.CardIcon><S.BarIcon /></S.CardIcon>
          <S.CardContainer>
            <S.CardTitle>Turnover Atual</S.CardTitle>
            <S.CardValue>{formatValue(summary?.turnover.last ?? 0, true)}</S.CardValue>
          </S.CardContainer>
        </S.Card>

        <S.Card>
          <S.CardIcon><S.BarIcon /></S.CardIcon>
          <S.CardContainer>
            <S.CardTitle>Máximo Turnover</S.CardTitle>
            <S.CardValue>{formatValue(summary?.turnover.max ?? 0, true)}</S.CardValue>
          </S.CardContainer>
        </S.Card>
      </S.GridContainer>

      <S.GridChart>
        <S.CardChart ref={headcountContainerRef}>
          <LineChart
            title="Headcount"
            data={headcountSeriesTop}
            containerRef={headcountContainerRef}
          />
        </S.CardChart>

        <S.CardChart ref={turnoverContainerRef}>
          <LineChart
            title="Turnover"
            data={turnoverSeriesTop}
            isPercentage
            containerRef={turnoverContainerRef}
          />
        </S.CardChart>
      </S.GridChart>

      {scope === "hierarchy" && (
        <S.HierarchySection>
          <S.SectionTitle>Detalhes por Gestor</S.SectionTitle>
          {renderReports(hierarchyReports)}
        </S.HierarchySection>
      )}
    </S.Container>
  );
}
