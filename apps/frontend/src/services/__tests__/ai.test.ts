import { describe, it, expect, vi, beforeEach } from "vitest";
import { askQuestion, getInsights } from "../ai";
import { api } from "../api";

vi.mock("../api", () => ({
  api: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));

describe("AI Services", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("askQuestion deve chamar POST /ai/qa com email e question", async () => {
    (api.post as any).mockResolvedValue({
      data: { text: "Resposta da IA", value: 42 },
    });

    const res = await askQuestion("user@acme.com", "Qual o turnover?");
    expect(api.post).toHaveBeenCalledWith("/ai/qa", {
      email: "user@acme.com",
      question: "Qual o turnover?",
    });
    expect(res).toEqual({ text: "Resposta da IA", value: 42 });
  });

  it("getInsights deve chamar GET /ai/insights com params corretos", async () => {
    (api.get as any).mockResolvedValue({
      data: { text: "Resumo do período" },
    });

    const res = await getInsights("user@acme.com", "2025-01", "2025-06");
    expect(api.get).toHaveBeenCalledWith("/ai/insights", {
      params: { email: "user@acme.com", from: "2025-01", to: "2025-06" },
    });
    expect(res).toEqual({ text: "Resumo do período" });
  });

  it("propaga erro quando a API falha", async () => {
    (api.post as any).mockRejectedValue(new Error("Network Error"));

    await expect(askQuestion("user@acme.com", "teste")).rejects.toThrow(
      "Network Error",
    );
  });
});
