import { api } from "./api";

export interface QaResponse {
  text: string;
  value?: number;
  params?: {
    metric: string;
    agg: string;
    from: string;
    to: string;
  };
}

export const askQuestion = async (email: string, question: string): Promise<QaResponse> => {
  const { data } = await api.post("/ai/qa", { email, question });
  return data;
};

export interface InsightResponse {
  text: string;
}

export const getInsights = async (
  email: string,
  from: string,
  to: string,
): Promise<InsightResponse> => {
  const { data } = await api.get("/ai/insights", {
    params: { email, from, to },
  });
  return data;
};
