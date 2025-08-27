import { useQuery } from "@tanstack/react-query";
import { getHeadcount, getTurnover, KpiResponse, SeriesPoint } from "../services/kpis";

export type Scope = "total" | "grouped" | "hierarchy";

export type TotalData = { scope: "total"; total: SeriesPoint[] };
export type GroupedData = {
  scope: "grouped";
  total: SeriesPoint[];
  direct: SeriesPoint[];
  indirect: SeriesPoint[];
};
export type HierarchyData = {
  scope: "hierarchy";
  total: SeriesPoint[];
  direct: SeriesPoint[];
  indirect: SeriesPoint[];
  reports: {
    id: number;
    name: string;
    position?: string;
    status: string;
    metrics: {
      headcount?: SeriesPoint[];
      turnover?: SeriesPoint[];
    };
  }[];
};

export type KpiData = TotalData | GroupedData | HierarchyData;

interface UseKpisParams<S extends Scope> {
  email: string;
  from: string;
  to: string;
  scope?: S;
  includeMeta?: boolean;
}

type UseKpisReturn<S extends Scope> = {
  headcount: Extract<KpiData, { scope: S }>;
  turnover: Extract<KpiData, { scope: S }>;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
};

export function useKpis<S extends Scope = "total">({
  email,
  from,
  to,
  scope = "total" as S,
  includeMeta = false,
}: UseKpisParams<S>): UseKpisReturn<S> {
  const headcountQuery = useQuery<KpiResponse>({
    queryKey: ["kpis", "headcount", email, from, to, scope, includeMeta],
    queryFn: () => getHeadcount(email, from, to, scope, includeMeta),
    enabled: Boolean(email && from && to),
  });

  const turnoverQuery = useQuery<KpiResponse>({
    queryKey: ["kpis", "turnover", email, from, to, scope, includeMeta],
    queryFn: () => getTurnover(email, from, to, scope, includeMeta),
    enabled: Boolean(email && from && to),
  });

  const normalize = (data: KpiResponse | undefined, type: "headcount" | "turnover"): KpiData => {
    if (!data) return { scope, total: [] } as KpiData;

    if ("leader" in data && "hierarchy" in data) {
      return {
        scope: "hierarchy",
        total: data.aggregates.total[type] ?? [],
        direct: data.aggregates.direct[type] ?? [],
        indirect: data.aggregates.indirect[type] ?? [],
        reports: data.hierarchy.directReports.map((r) => ({
          id: r.id,
          name: r.name,
          position: r.position,
          status: r.status,
          metrics: r.metrics,
        })),
      };
    }

    if ("direct" in data.aggregates) {
      return {
        scope: "grouped",
        total: data.aggregates.total[type] ?? [],
        direct: data.aggregates.direct[type] ?? [],
        indirect: data.aggregates.indirect[type] ?? [],
      };
    }

    return {
      scope: "total",
      total: data.aggregates.total[type] ?? [],
    };
  };

  return {
    headcount: normalize(headcountQuery.data, "headcount") as Extract<KpiData, { scope: S }>,
    turnover: normalize(turnoverQuery.data, "turnover") as Extract<KpiData, { scope: S }>,
    isLoading: headcountQuery.isLoading || turnoverQuery.isLoading,
    isError: headcountQuery.isError || turnoverQuery.isError,
    error: headcountQuery.error || turnoverQuery.error,
  };
}
