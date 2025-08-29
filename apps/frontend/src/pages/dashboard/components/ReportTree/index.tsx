import * as S from "./style";
import LineChart from "../../../../components/Chart/Line";
import { HierarchyNodeResponse } from "../../../../interfaces/kpi";
import { buildChildSeriesMap } from "../../../../utils/seriesUtils";

interface Props {
  reports: HierarchyNodeResponse[];
}

export default function ReportTree({ reports }: Props) {
  if (!reports?.length) return null;

  return (
    <>
      {reports.map((report) => {
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

            {report.reports?.length && <S.SubReports>
              <ReportTree reports={report.reports} />
            </S.SubReports>}
          </S.ReportCard>
        );
      })}
    </>
  );
}
