import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi } from "vitest";
import { useKpis } from "../useKpis";
import { getKpis, getSummary } from "../../services/kpis";
import {
    TotalKpiResponse,
    GroupedKpiResponse,
    HierarchyKpiResponse,
    KpiSummaryResponse,
} from "../../interfaces/kpi";

vi.mock("../../services/kpis", () => ({
    getKpis: vi.fn(),
    getSummary: vi.fn(),
}));

function wrapper({ children }: { children: React.ReactNode }) {
    const client = new QueryClient();
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

describe("useKpis", () => {
    const email = "user@acme.com";
    const from = "2025-01";
    const to = "2025-06";

    it("retorna dados normalizados para scope=total", async () => {
        const mockSeries: TotalKpiResponse = {
            aggregates: { total: { headcount: [{ month: "2025-01", value: 10 }], turnover: [] } },
        };
        const mockSummary: KpiSummaryResponse = {
            headcount: { last: 10, avg: 10, max: 10 },
            turnover: { last: 0, avg: 0, max: 0 },
        };

        (getKpis as any).mockResolvedValue(mockSeries);
        (getSummary as any).mockResolvedValue(mockSummary);

        const { result } = renderHook(() => useKpis({ email, from, to, scope: "total" }), { wrapper });

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(result.current.headcount).toEqual({
            scope: "total",
            total: [{ month: "2025-01", value: 10 }],
        });
        expect(result.current.turnover).toEqual({
            scope: "total",
            total: [],
        });
        expect(result.current.summary).toEqual(mockSummary);
    });

    it("retorna dados normalizados para scope=grouped", async () => {
        const mockSeries: GroupedKpiResponse = {
            aggregates: {
                total: { headcount: [{ month: "2025-01", value: 5 }], turnover: [] },
                direct: { headcount: [{ month: "2025-01", value: 2 }], turnover: [] },
                indirect: { headcount: [{ month: "2025-01", value: 3 }], turnover: [] },
            },
        };

        (getKpis as any).mockResolvedValue(mockSeries);
        (getSummary as any).mockResolvedValue(undefined);

        const { result } = renderHook(() => useKpis({ email, from, to, scope: "grouped" }), {
            wrapper,
        });

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(result.current.headcount.scope).toBe("grouped");
        expect(result.current.headcount.direct).toEqual([{ month: "2025-01", value: 2 }]);
    });

    it("retorna dados normalizados para scope=hierarchy", async () => {
        const mockSeries: HierarchyKpiResponse = {
            leader: { id: 1, name: "Boss", email, status: "ativo" },
            hierarchy: {
                directReports: [
                    {
                        id: 2,
                        name: "Alice",
                        email: "alice@acme.com",
                        status: "ativo",
                        counts: { direct: 0, indirect: 0, total: 0 },
                        metrics: { headcount: [{ month: "2025-01", value: 7 }], turnover: [] },
                        reports: [],
                    },
                ],
            },
            aggregates: {
                total: { headcount: [{ month: "2025-01", value: 10 }], turnover: [] },
                direct: { headcount: [], turnover: [] },
                indirect: { headcount: [], turnover: [] },
            },
        };

        (getKpis as any).mockResolvedValue(mockSeries);
        (getSummary as any).mockResolvedValue(undefined);

        const { result } = renderHook(() => useKpis({ email, from, to, scope: "hierarchy" }), {
            wrapper,
        });

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(result.current.headcount.scope).toBe("hierarchy");
        expect(result.current.headcount.reports[0].name).toBe("Alice");
    });
});
