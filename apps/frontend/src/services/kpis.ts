import { api } from "./api";
import {
  KpiResponse,
  TotalKpiResponse,
  GroupedKpiResponse,
  HierarchyKpiResponse,
} from "../interfaces/kpi";

export const getHeadcount = async (
  email: string,
  from: string,
  to: string,
  scope: "total" | "grouped" | "hierarchy" = "total",
  includeMeta = false
): Promise<KpiResponse> => {
  const { data } = await api.get<TotalKpiResponse | GroupedKpiResponse | HierarchyKpiResponse>(
    "/kpis/headcount",
    {
      params: { email, from, to, scope, includeMeta },
    }
  );
  return data;
};

export const getTurnover = async (
  email: string,
  from: string,
  to: string,
  scope: "total" | "grouped" | "hierarchy" = "total",
  includeMeta = false
): Promise<KpiResponse> => {
  const { data } = await api.get<TotalKpiResponse | GroupedKpiResponse | HierarchyKpiResponse>(
    "/kpis/turnover",
    {
      params: { email, from, to, scope, includeMeta },
    }
  );
  return data;
};
