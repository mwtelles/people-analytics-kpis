import { api } from "./api";

export type SeriesPoint = { month: string; value: number };
export type KpiSeries = { series: SeriesPoint[] };

export const getHeadcount = async (email: string, from: string, to: string): Promise<KpiSeries> => {
  const { data } = await api.get("/kpis/headcount", { params: { email, from, to } });
  return data;
};

export const getTurnover = async (email: string, from: string, to: string): Promise<KpiSeries> => {
  const { data } = await api.get("/kpis/turnover", { params: { email, from, to } });
  return data;
};
