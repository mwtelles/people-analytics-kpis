import KpiChartTotal from "./KpiChartTotal";
import KpiChartGrouped from "./KpiChartGrouped";
import KpiChartHierarchy from "./KpiChartHierarchy";
import { KpiPoint } from "../../../interfaces/kpi";
import { AnimatePresence, motion } from "framer-motion";

export type Scope = "total" | "grouped" | "hierarchy";

interface TotalProps {
  title: string;
  scope: "total";
  isPercentage?: boolean;
  total?: KpiPoint[];
}

interface GroupedProps {
  title: string;
  scope: "grouped";
  isPercentage?: boolean;
  total?: KpiPoint[];
  direct?: KpiPoint[];
  indirect?: KpiPoint[];
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
      headcount?: KpiPoint[];
      turnover?: KpiPoint[];
    };
  }[];
  metric: "headcount" | "turnover";
}

type KpiChartProps = TotalProps | GroupedProps | HierarchyProps;

export default function KpiChart(props: KpiChartProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={props.scope}
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
