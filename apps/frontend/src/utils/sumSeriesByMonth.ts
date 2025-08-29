import { KpiPoint } from "../interfaces/kpi";

export function sumSeriesByMonth(seriesList: KpiPoint[][]): KpiPoint[] {
  const months = Array.from(new Set(seriesList.flatMap((s) => s.map((p) => p.month)))).sort();
  return months.map((month) => ({
    month,
    value: seriesList.reduce((acc, s) => acc + (s.find((p) => p.month === month)?.value ?? 0), 0),
  }));
}
