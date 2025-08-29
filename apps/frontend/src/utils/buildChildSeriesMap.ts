import { KpiPoint, HierarchyNodeResponse } from "../interfaces/kpi";
import { sumSeriesByMonth } from "./sumSeriesByMonth";

export type MetricType = "headcount" | "turnover";

export function buildChildSeriesMap(node: HierarchyNodeResponse, metric: MetricType, topN = 6) {
  const total = node.metrics[metric] ?? [];
  const children = (node.reports ?? []).map((child) => {
    const series = child.metrics[metric] ?? [];
    const last = series.length > 0 ? series[series.length - 1].value : 0;
    return { name: child.name, series, last };
  });

  children.sort((a, b) => b.last - a.last);

  const top = children.slice(0, topN);
  const rest = children.slice(topN);

  const map: Record<string, KpiPoint[]> = { Total: total };
  top.forEach(({ name, series }) => {
    map[name] = series;
  });
  if (rest.length) map[`Outros (${rest.length})`] = sumSeriesByMonth(rest.map((c) => c.series));

  return map;
}
