export interface KpiPoint {
  month: string;
  value: number;
}

export interface TotalKpiDto {
  aggregates: {
    total: {
      headcount: KpiPoint[];
      turnover: KpiPoint[];
    };
  };
}

export interface GroupedKpiDto {
  aggregates: {
    direct: {
      headcount: KpiPoint[];
      turnover: KpiPoint[];
    };
    indirect: {
      headcount: KpiPoint[];
      turnover: KpiPoint[];
    };
    total: {
      headcount: KpiPoint[];
      turnover: KpiPoint[];
    };
  };
}

export interface HierarchyNodeDto {
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

  reports: HierarchyNodeDto[];
}

export interface HierarchyKpiDto {
  leader: {
    id: number;
    name: string;
    email: string;
    position?: string;
    status: "ativo" | "inativo";
  } | null;

  hierarchy: {
    directReports: HierarchyNodeDto[];
  };

  aggregates: {
    total: {
      headcount: KpiPoint[];
      turnover: KpiPoint[];
    };
    direct: {
      headcount: KpiPoint[];
      turnover: KpiPoint[];
    };
    indirect: {
      headcount: KpiPoint[];
      turnover: KpiPoint[];
    };
  };
}

export interface KpiAggregateSummary {
  last: number;
  avg: number;
  max: number;
}

export interface KpiSummaryDto {
  headcount: KpiAggregateSummary;
  turnover: KpiAggregateSummary;
}

export type KpiSeriesResponse = TotalKpiDto | GroupedKpiDto | HierarchyKpiDto;

export type KpiResponseDto = KpiSeriesResponse | KpiSummaryDto;
