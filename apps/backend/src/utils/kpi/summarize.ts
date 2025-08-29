import { KpiPoint, KpiAggregateSummary } from "../../dtos/kpi.dto";

export function summarize(points?: KpiPoint[]): KpiAggregateSummary {
  if (!points || points.length === 0) {
    return { last: 0, avg: 0, max: 0 };
  }

  const values = points.map((p) => p.value);
  const last = values[values.length - 1];
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  const max = Math.max(...values);

  return { last, avg, max };
}
