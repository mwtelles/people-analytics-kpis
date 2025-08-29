import { describe, it, expect, vi, beforeEach } from "vitest";
import { getKpis, getSummary } from "../kpis";
import { api } from "../api";
import {
  TotalKpiResponse,
  GroupedKpiResponse,
  HierarchyKpiResponse,
  KpiSummaryResponse,
} from "../../interfaces/kpi";

vi.mock("../api", () => ({
  api: {
    get: vi.fn(),
  },
}));

describe("KPI Services", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getKpis deve chamar com scope=total", async () => {
    const mockData: TotalKpiResponse = {
      aggregates: {
        total: { headcount: [], turnover: [] },
      },
    };

    (api.get as any).mockResolvedValue({ data: mockData });

    const res = await getKpis("user@acme.com", "2025-01", "2025-06", "total");

    expect(api.get).toHaveBeenCalledWith("/kpis", {
      params: { email: "user@acme.com", from: "2025-01", to: "2025-06", scope: "total" },
    });
    expect(res).toEqual(mockData);
  });

  it("getKpis deve chamar com scope=grouped", async () => {
    const mockData: GroupedKpiResponse = {
      aggregates: {
        direct: { headcount: [], turnover: [] },
        indirect: { headcount: [], turnover: [] },
        total: { headcount: [], turnover: [] },
      },
    };

    (api.get as any).mockResolvedValue({ data: mockData });

    const res = await getKpis("user@acme.com", "2025-01", "2025-06", "grouped");

    expect(api.get).toHaveBeenCalledWith("/kpis", {
      params: { email: "user@acme.com", from: "2025-01", to: "2025-06", scope: "grouped" },
    });
    expect(res).toEqual(mockData);
  });

  it("getKpis deve chamar com scope=hierarchy e includeMeta=true", async () => {
    const mockData: HierarchyKpiResponse = {
      leader: { id: 1, name: "Leader", email: "leader@acme.com", status: "ativo" },
      hierarchy: { directReports: [] },
      aggregates: {
        total: { headcount: [], turnover: [] },
        direct: { headcount: [], turnover: [] },
        indirect: { headcount: [], turnover: [] },
      },
    };

    (api.get as any).mockResolvedValue({ data: mockData });

    const res = await getKpis("user@acme.com", "2025-01", "2025-06", "hierarchy", true);

    expect(api.get).toHaveBeenCalledWith("/kpis", {
      params: {
        email: "user@acme.com",
        from: "2025-01",
        to: "2025-06",
        scope: "hierarchy",
        includeMeta: true,
      },
    });
    expect(res).toEqual(mockData);
  });

  it("getSummary deve chamar /kpis/summary", async () => {
    const mockSummary: KpiSummaryResponse = {
      headcount: { last: 10, avg: 12, max: 20 },
      turnover: { last: 2, avg: 1.5, max: 3 },
    };

    (api.get as any).mockResolvedValue({ data: mockSummary });

    const res = await getSummary("user@acme.com", "2025-01", "2025-06");

    expect(api.get).toHaveBeenCalledWith("/kpis/summary", {
      params: { email: "user@acme.com", from: "2025-01", to: "2025-06" },
    });
    expect(res).toEqual(mockSummary);
  });

  it("propaga erro quando API falha", async () => {
    (api.get as any).mockRejectedValue(new Error("Network Error"));

    await expect(getKpis("user@acme.com", "2025-01", "2025-06", "total")).rejects.toThrow(
      "Network Error",
    );

    await expect(getSummary("user@acme.com", "2025-01", "2025-06")).rejects.toThrow(
      "Network Error",
    );
  });
});
