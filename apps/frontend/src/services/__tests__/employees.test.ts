import { describe, it, expect, vi, beforeEach } from "vitest";
import { checkEmail } from "../employees";
import { api } from "../api";

vi.mock("../api", () => ({
  api: {
    get: vi.fn(),
  },
}));

describe("Employees Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve chamar GET /employees/check-email com params corretos", async () => {
    (api.get as any).mockResolvedValue({
      data: { valid: true, email: "user@acme.com" },
    });

    const res = await checkEmail("user@acme.com");

    expect(api.get).toHaveBeenCalledWith("/employees/check-email", {
      params: { email: "user@acme.com" },
    });
    expect(res).toEqual({ valid: true, email: "user@acme.com" });
  });

  it("deve retornar { valid: false } quando backend responde assim", async () => {
    (api.get as any).mockResolvedValue({
      data: { valid: false },
    });

    const res = await checkEmail("naoexiste@acme.com");
    expect(res).toEqual({ valid: false });
  });

  it("deve propagar erro quando API falha", async () => {
    (api.get as any).mockRejectedValue(new Error("Network Error"));

    await expect(checkEmail("user@acme.com")).rejects.toThrow("Network Error");
  });
});
