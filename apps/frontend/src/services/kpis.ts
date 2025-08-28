import { api } from "./api";
import {
  KpiSeriesResponse,
  TotalKpiResponse,
  GroupedKpiResponse,
  HierarchyKpiResponse,
  KpiSummaryResponse,
} from "../interfaces/kpi";

export type KpiScope = "total" | "grouped" | "hierarchy";

export function getKpis(
  email: string,
  from: string,
  to: string,
  scope: "total",
  includeMeta?: boolean,
): Promise<TotalKpiResponse>;
export function getKpis(
  email: string,
  from: string,
  to: string,
  scope: "grouped",
  includeMeta?: boolean,
): Promise<GroupedKpiResponse>;
export function getKpis(
  email: string,
  from: string,
  to: string,
  scope: "hierarchy",
  includeMeta?: boolean,
): Promise<HierarchyKpiResponse>;
export function getKpis(
  email: string,
  from: string,
  to: string,
  scope: KpiScope = "total",
  includeMeta = false,
): Promise<KpiSeriesResponse> {
  return api
    .get<KpiSeriesResponse>("/kpis", {
      params: {
        email,
        from,
        to,
        scope,
        ...(scope === "hierarchy" ? { includeMeta } : {}),
      },
    })
    .then((r) => r.data);
}

export const getSummary = async (
  email: string,
  from: string,
  to: string,
): Promise<KpiSummaryResponse> => {
  const { data } = await api.get<KpiSummaryResponse>("/kpis/summary", {
    params: { email, from, to },
  });
  return data;
};
