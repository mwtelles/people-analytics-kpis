import { useRef, useState } from "react";
import { motion } from "framer-motion";
import * as S from "./style";
import { Scope, useKpis } from "../../../../hooks/useKpis";
import { DatePicker } from "../../../../components/DatePicker";
import { formatValue } from "../../../../utils/formatValue";
import { formatMonth } from "../../../../utils/date";
import LineChart from "../../../../components/Chart/Boost/Line";

interface Props {
  email: string;
  from: string;
  to: string;
}

export default function BoostView({ email, from: initialFrom, to: initialTo }: Props) {
  const headcountContainerRef = useRef<HTMLDivElement>(null);
  const turnoverContainerRef = useRef<HTMLDivElement>(null);
  const [scope, setScope] = useState<Scope>("total");
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const { headcount, turnover, summary, isLoading } = useKpis({ email, from, to, scope });

  function renderReports(reports: any[]): React.ReactNode {
    if (!reports || reports.length === 0) return null;

    return reports.map((report) => (
      <S.ReportCard key={report.id}>
        <S.ReportHeader>
          <S.ReportName>{report.name}</S.ReportName>
          {report.position && <S.ReportPosition>{report.position}</S.ReportPosition>}
        </S.ReportHeader>

        <S.ReportCharts>
          {report.metrics.headcount && (
            <S.CardChart>
              <LineChart
                title="Headcount"
                data={{ headcount: report.metrics.headcount }}
              />
            </S.CardChart>
          )}

          {report.metrics.turnover && (
            <S.CardChart>
              <LineChart
                title="Turnover"
                data={{ turnover: report.metrics.turnover }}
                isPercentage
              />
            </S.CardChart>
          )}
        </S.ReportCharts>

        {report.reports && report.reports.length > 0 && (
          <S.SubReports>
            {renderReports(report.reports)}
          </S.SubReports>
        )}
      </S.ReportCard>
    ));
  }


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
        <S.CardChart ref={headcountContainerRef}>
          <LineChart title="Headcount" data={headcount} containerRef={headcountContainerRef} />
        </S.CardChart>

        <S.CardChart ref={turnoverContainerRef}>
          <LineChart title="Turnover" data={turnover} isPercentage containerRef={turnoverContainerRef} />
        </S.CardChart>
      </S.GridChart>
      {scope === "hierarchy" && (
        <S.HierarchySection>
          <S.SectionTitle>Detalhes por Gestor</S.SectionTitle>
          {(() => {
            const reports = (headcount as any)?.reports ?? [];
            const turnoverReports = (turnover as any)?.reports ?? [];

            const merged = reports.map((r: any) => ({
              ...r,
              metrics: {
                headcount: r.metrics.headcount,
                turnover: turnoverReports.find((t: any) => t.id === r.id)?.metrics.turnover,
              },
              reports: r.reports,
            }));

            return renderReports(merged);
          })()}
        </S.HierarchySection>
      )}

    </S.Container>
  );
}
