import { KpiData } from "../hooks/useKpis";

export interface DataProps {
  label: string;
  values: number[];
  colors: string[];
  backgroundColors: string[];
  onlyTooltip?: boolean;
}

type AllowedKeys = "total" | "direct" | "indirect";

export function mapKpiDataToChart(
  kpi: KpiData,
  metric: "headcount" | "turnover"
): DataProps[] {
  const datasets: { key: AllowedKeys; label: string; color: string; bg: string }[] = [
    { key: "total", label: "Total", color: "#64748b", bg: "#64748b" },
    { key: "direct", label: "Diretos", color: "#16a34a", bg: "#16a34a" },
    { key: "indirect", label: "Indiretos", color: "#dc2626", bg: "#dc2626" },
  ];

  return datasets
    .filter((d) => (kpi as any)[d.key] !== undefined)
    .map((d) => {
      const series = ((kpi as any)[d.key] ?? []) as { value: number }[];
      return {
        label: d.label,
        values: series.map((p) => p.value),
        colors: [d.color],
        backgroundColors: [d.bg],
      };
    });
}
