export interface KpiPoint {
  month: string;
  value: number;
}

export interface TotalKpiResponse {
  aggregates: {
    total: {
      headcount?: KpiPoint[];
      turnover?: KpiPoint[];
    };
  };
}

export interface GroupedKpiResponse {
  aggregates: {
    direct: {
      headcount?: KpiPoint[];
      turnover?: KpiPoint[];
    };
    indirect: {
      headcount?: KpiPoint[];
      turnover?: KpiPoint[];
    };
    total: {
      headcount?: KpiPoint[];
      turnover?: KpiPoint[];
    };
  };
}

export interface HierarchyNodeResponse {
  id: number;
  name: string;
  email: string;
  position?: string;
  status: "ativo" | "inativo";
  type: "direct" | "indirect";
  metrics: {
    headcount?: KpiPoint[];
    turnover?: KpiPoint[];
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
    direct: { headcount?: KpiPoint[]; turnover?: KpiPoint[] };
    indirect: { headcount?: KpiPoint[]; turnover?: KpiPoint[] };
    total: { headcount?: KpiPoint[]; turnover?: KpiPoint[] };
  };
}

export type KpiResponse =
  | TotalKpiResponse
  | GroupedKpiResponse
  | HierarchyKpiResponse;

export interface KpiSummaryResponse {
  headcount: {
    last: number;
    avg: number;
    max: number;
  };
  turnover: {
    last: number;
    avg: number;
    max: number;
  };
}
