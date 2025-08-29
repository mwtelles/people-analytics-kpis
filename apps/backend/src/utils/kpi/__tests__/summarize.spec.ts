import { KpiPoint } from "../../../dtos/kpi.dto";
import { summarize } from "../summarize";

describe("summarize", () => {
  it("retorna {last:0, avg:0, max:0} quando não há pontos", () => {
    expect(summarize([])).toEqual({ last: 0, avg: 0, max: 0 });
    expect(summarize(undefined)).toEqual({ last: 0, avg: 0, max: 0 });
  });

  it("calcula corretamente quando há apenas 1 ponto", () => {
    const points: KpiPoint[] = [{ month: "2021-01", value: 5 }];
    const result = summarize(points);

    expect(result).toEqual({ last: 5, avg: 5, max: 5 });
  });

  it("calcula corretamente last, avg e max para múltiplos pontos", () => {
    const points: KpiPoint[] = [
      { month: "2021-01", value: 2 },
      { month: "2021-02", value: 4 },
      { month: "2021-03", value: 6 },
    ];
    const result = summarize(points);

    expect(result.last).toBe(6);
    expect(result.avg).toBe(4);
    expect(result.max).toBe(6);
  });

  it("funciona com valores negativos", () => {
    const points: KpiPoint[] = [
      { month: "2021-01", value: -10 },
      { month: "2021-02", value: 0 },
      { month: "2021-03", value: 5 },
    ];
    const result = summarize(points);

    expect(result.last).toBe(5);
    expect(result.avg).toBeCloseTo(-5 / 3, 5);
    expect(result.max).toBe(5);
  });

  it("funciona com valores decimais", () => {
    const points: KpiPoint[] = [
      { month: "2021-01", value: 1.5 },
      { month: "2021-02", value: 2.5 },
    ];
    const result = summarize(points);

    expect(result.last).toBe(2.5);
    expect(result.avg).toBe(2);
    expect(result.max).toBe(2.5);
  });
});
