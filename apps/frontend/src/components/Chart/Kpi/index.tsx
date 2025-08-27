import KpiChartTotal from "./KpiChartTotal";
import KpiChartGrouped from "./KpiChartGrouped";
import KpiChartHierarchy from "./KpiChartHierarchy";
import { SeriesPoint } from "../../../services/kpis";

export type Scope = "total" | "grouped" | "hierarchy";

interface TotalProps {
  title: string;
  scope: "total";
  isPercentage?: boolean;
  total?: SeriesPoint[];
}

interface GroupedProps {
  title: string;
  scope: "grouped";
  isPercentage?: boolean;
  total?: SeriesPoint[];
  direct?: SeriesPoint[];
  indirect?: SeriesPoint[];
}

interface HierarchyProps {
  title: string;
  scope: "hierarchy";
  isPercentage?: boolean;
  reports?: {
    id: number;
    name: string;
    position?: string;
    status: string;
    metrics: {
      headcount?: SeriesPoint[];
      turnover?: SeriesPoint[];
    };
  }[];
  metric: "headcount" | "turnover";
}

type KpiChartProps = TotalProps | GroupedProps | HierarchyProps;

export default function KpiChart(props: KpiChartProps) {
  switch (props.scope) {
    case "total":
      return (
        <KpiChartTotal
          title={props.title}
          data={props.total ?? []}
          isPercentage={props.isPercentage}
        />
      );

    case "grouped":
      return (
        <KpiChartGrouped
          title={props.title}
          data={{
            total: props.total ?? [],
            direct: props.direct ?? [],
            indirect: props.indirect ?? [],
          }}
          isPercentage={props.isPercentage}
        />
      );

    case "hierarchy":
      return (
        <KpiChartHierarchy
          title={props.title}
          reports={props.reports ?? []}
          metric={props.metric}
          isPercentage={props.isPercentage}
        />
      );

    default:
      return null;
  }
}
