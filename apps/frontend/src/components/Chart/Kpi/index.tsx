import KpiChartTotal from "./KpiChartTotal";
import KpiChartGrouped from "./KpiChartGrouped";
import KpiChartHierarchy from "./KpiChartHierarchy";
import { SeriesPoint } from "../../../services/kpis";
import { AnimatePresence, motion } from "framer-motion";

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
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={props.scope} // 👈 animação dispara sempre que o tipo muda
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {props.scope === "total" && (
          <KpiChartTotal
            title={props.title}
            data={props.total ?? []}
            isPercentage={props.isPercentage}
          />
        )}

        {props.scope === "grouped" && (
          <KpiChartGrouped
            title={props.title}
            data={{
              total: props.total ?? [],
              direct: props.direct ?? [],
              indirect: props.indirect ?? [],
            }}
            isPercentage={props.isPercentage}
          />
        )}

        {props.scope === "hierarchy" && (
          <KpiChartHierarchy
            title={props.title}
            reports={props.reports ?? []}
            metric={props.metric}
            isPercentage={props.isPercentage}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
