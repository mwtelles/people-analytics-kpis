import { describe, it, expect } from "vitest";
import { sumSeriesByMonth } from "../sumSeriesByMonth";
import { KpiPoint } from "../../interfaces/kpi";

describe("sumSeriesByMonth", () => {
  it("retorna array vazio se nenhuma série for passada", () => {
    expect(sumSeriesByMonth([])).toEqual([]);
  });

  it("soma corretamente quando há uma única série", () => {
    const series: KpiPoint[][] = [
      [
        { month: "2025-01", value: 10 },
        { month: "2025-02", value: 20 },
      ],
    ];
    expect(sumSeriesByMonth(series)).toEqual([
      { month: "2025-01", value: 10 },
      { month: "2025-02", value: 20 },
    ]);
  });

  it("soma corretamente duas séries com os mesmos meses", () => {
    const series: KpiPoint[][] = [
      [
        { month: "2025-01", value: 10 },
        { month: "2025-02", value: 20 },
      ],
      [
        { month: "2025-01", value: 5 },
        { month: "2025-02", value: 15 },
      ],
    ];
    expect(sumSeriesByMonth(series)).toEqual([
      { month: "2025-01", value: 15 },
      { month: "2025-02", value: 35 },
    ]);
  });

  it("considera 0 quando uma das séries não tem valor para determinado mês", () => {
    const series: KpiPoint[][] = [
      [{ month: "2025-01", value: 10 }],
      [{ month: "2025-02", value: 20 }],
    ];
    expect(sumSeriesByMonth(series)).toEqual([
      { month: "2025-01", value: 10 },
      { month: "2025-02", value: 20 },
    ]);
  });

  it("retorna meses em ordem crescente", () => {
    const series: KpiPoint[][] = [
      [{ month: "2025-02", value: 20 }],
      [{ month: "2025-01", value: 10 }],
    ];
    const result = sumSeriesByMonth(series);
    expect(result.map((r) => r.month)).toEqual(["2025-01", "2025-02"]);
  });

  it("funciona com múltiplas séries e meses intercalados", () => {
    const series: KpiPoint[][] = [
      [
        { month: "2025-01", value: 5 },
        { month: "2025-03", value: 15 },
      ],
      [
        { month: "2025-02", value: 10 },
        { month: "2025-03", value: 20 },
      ],
    ];
    expect(sumSeriesByMonth(series)).toEqual([
      { month: "2025-01", value: 5 },
      { month: "2025-02", value: 10 },
      { month: "2025-03", value: 35 },
    ]);
  });
});
