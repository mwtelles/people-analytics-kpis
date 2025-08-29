import { useQuery } from "@tanstack/react-query";
import { getKpis, getSummary } from "../services/kpis";
import {
  KpiPoint,
  KpiSeriesResponse,
  KpiSummaryResponse,
  TotalKpiResponse,
  GroupedKpiResponse,
  HierarchyKpiResponse,
  isHierarchy,
  isGrouped,
} from "../interfaces/kpi";

export type Scope = "total" | "grouped" | "hierarchy";

type SeriesByScope<S extends Scope> = S extends "total"
  ? TotalKpiResponse
  : S extends "grouped"
    ? GroupedKpiResponse
    : HierarchyKpiResponse;

export type TotalData = { scope: "total"; total: KpiPoint[] };
export type GroupedData = {
  scope: "grouped";
  total: KpiPoint[];
  direct: KpiPoint[];
  indirect: KpiPoint[];
};
export type HierarchyData = {
  scope: "hierarchy";
  total: KpiPoint[];
  direct: KpiPoint[];
  indirect: KpiPoint[];
  reports: {
    id: number;
    name: string;
    position?: string;
    status: string;
    metrics: {
      headcount: KpiPoint[];
      turnover: KpiPoint[];
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
  summary?: KpiSummaryResponse;
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
  const seriesQuery = useQuery<SeriesByScope<S>>({
    queryKey: ["kpis", "series", email, from, to, scope, includeMeta],
    queryFn: () => {
      switch (scope) {
        case "total":
          return getKpis(email, from, to, "total", includeMeta) as Promise<SeriesByScope<S>>;
        case "grouped":
          return getKpis(email, from, to, "grouped", includeMeta) as Promise<SeriesByScope<S>>;
        case "hierarchy":
          return getKpis(email, from, to, "hierarchy", includeMeta) as Promise<SeriesByScope<S>>;
      }
    },
    enabled: Boolean(email && from && to),
  });

  const summaryQuery = useQuery<KpiSummaryResponse>({
    queryKey: ["kpis", "summary", email, from, to],
    queryFn: () => getSummary(email, from, to),
    enabled: Boolean(email && from && to),
  });

  const normalize = (
    data: KpiSeriesResponse | undefined,
    type: "headcount" | "turnover",
  ): KpiData => {
    if (!data) return { scope, total: [] } as KpiData;

    if (isHierarchy(data)) {
      return {
        scope: "hierarchy",
        total: data.aggregates.total[type],
        direct: data.aggregates.direct[type],
        indirect: data.aggregates.indirect[type],
        reports: data.hierarchy.directReports.map((r) => ({
          id: r.id,
          name: r.name,
          position: r.position,
          status: r.status,
          metrics: r.metrics,
        })),
      };
    }

    if (isGrouped(data)) {
      return {
        scope: "grouped",
        total: data.aggregates.total[type],
        direct: data.aggregates.direct[type],
        indirect: data.aggregates.indirect[type],
      };
    }

    return {
      scope: "total",
      total: data.aggregates.total[type],
    };
  };

  return {
    headcount: normalize(seriesQuery.data as unknown as KpiSeriesResponse, "headcount") as Extract<
      KpiData,
      { scope: S }
    >,
    turnover: normalize(seriesQuery.data as unknown as KpiSeriesResponse, "turnover") as Extract<
      KpiData,
      { scope: S }
    >,
    summary: summaryQuery.data,
    isLoading: seriesQuery.isLoading || summaryQuery.isLoading,
    isError: seriesQuery.isError || summaryQuery.isError,
    error: seriesQuery.error || summaryQuery.error,
  };
}
