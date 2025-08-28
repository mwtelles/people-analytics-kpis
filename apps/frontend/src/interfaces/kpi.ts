export interface KpiPoint {
  month: string;
  value: number;
}

export interface TotalKpiResponse {
  aggregates: {
    total: {
      headcount: KpiPoint[];
      turnover: KpiPoint[];
    };
  };
}

export interface GroupedKpiResponse {
  aggregates: {
    direct: { headcount: KpiPoint[]; turnover: KpiPoint[] };
    indirect: { headcount: KpiPoint[]; turnover: KpiPoint[] };
    total: { headcount: KpiPoint[]; turnover: KpiPoint[] };
  };
}

export interface HierarchyNodeResponse {
  id: number;
  name: string;
  email: string;
  position?: string;
  status: "ativo" | "inativo";

  counts: {
    direct: number;
    indirect: number;
    total: number;
  };

  metrics: {
    headcount: KpiPoint[];
    turnover: KpiPoint[];
  };

  reports: HierarchyNodeResponse[];
}

export interface HierarchyKpiResponse {
  leader: {
    id: number;
    name: string;
    email: string;
    position?: string;
    status: "ativo" | "inativo";
  } | null;

  hierarchy: {
    directReports: HierarchyNodeResponse[];
  };

  aggregates: {
    total: { headcount: KpiPoint[]; turnover: KpiPoint[] };
    direct: { headcount: KpiPoint[]; turnover: KpiPoint[] };
    indirect: { headcount: KpiPoint[]; turnover: KpiPoint[] };
  };
}

export type KpiSeriesResponse =
  | TotalKpiResponse
  | GroupedKpiResponse
  | HierarchyKpiResponse;

export interface KpiAggregateSummary {
  last: number;
  avg: number;
  max: number;
}

export interface KpiSummaryResponse {
  headcount: KpiAggregateSummary;
  turnover: KpiAggregateSummary;
}

export const isHierarchy = (r: KpiSeriesResponse): r is HierarchyKpiResponse =>
  (r as HierarchyKpiResponse).hierarchy !== undefined;

export const isGrouped = (r: KpiSeriesResponse): r is GroupedKpiResponse =>
  !isHierarchy(r) && (r as GroupedKpiResponse).aggregates.direct !== undefined;

export const isTotal = (r: KpiSeriesResponse): r is TotalKpiResponse =>
  !isHierarchy(r) &&
  (r as any).aggregates.direct === undefined &&
  (r as TotalKpiResponse).aggregates.total !== undefined;
