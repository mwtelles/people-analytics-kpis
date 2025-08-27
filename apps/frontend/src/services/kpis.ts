import { api } from "./api";

export type SeriesPoint = { month: string; value: number };

export interface TotalKpiResponse {
  aggregates: {
    total: {
      headcount?: SeriesPoint[];
      turnover?: SeriesPoint[];
    };
  };
}

export interface GroupedKpiResponse {
  aggregates: {
    direct: { headcount?: SeriesPoint[]; turnover?: SeriesPoint[] };
    indirect: { headcount?: SeriesPoint[]; turnover?: SeriesPoint[] };
    total: { headcount?: SeriesPoint[]; turnover?: SeriesPoint[] };
  };
}

export interface HierarchyKpiResponse {
  leader?: { id: number; name: string; email: string; position?: string; status: string };
  hierarchy: { directReports: any[] };
  aggregates: {
    direct: { headcount?: SeriesPoint[]; turnover?: SeriesPoint[] };
    indirect: { headcount?: SeriesPoint[]; turnover?: SeriesPoint[] };
    total: { headcount?: SeriesPoint[]; turnover?: SeriesPoint[] };
  };
}

export type KpiResponse = TotalKpiResponse | GroupedKpiResponse | HierarchyKpiResponse;

export const getHeadcount = async (
  email: string,
  from: string,
  to: string,
  scope: "total" | "grouped" | "hierarchy" = "total",
  includeMeta = false
): Promise<KpiResponse> => {
  const { data } = await api.get("/kpis/headcount", {
    params: { email, from, to, scope, includeMeta },
  });
  return data;
};

export const getTurnover = async (
  email: string,
  from: string,
  to: string,
  scope: "total" | "grouped" | "hierarchy" = "total",
  includeMeta = false
): Promise<KpiResponse> => {
  const { data } = await api.get("/kpis/turnover", {
    params: { email, from, to, scope, includeMeta },
  });
  return data;
};
