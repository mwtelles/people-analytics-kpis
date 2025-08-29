import { api } from "./api";

export interface CheckEmailResponse {
  valid: boolean;
  email?: string;
}

export const checkEmail = async (email: string): Promise<CheckEmailResponse> => {
  const { data } = await api.get("/employees/check-email", { params: { email } });
  return data;
};
