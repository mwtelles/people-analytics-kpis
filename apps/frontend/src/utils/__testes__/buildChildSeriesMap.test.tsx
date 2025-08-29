import { describe, it, expect } from "vitest";
import { buildChildSeriesMap } from "../buildChildSeriesMap";
import { KpiPoint, HierarchyNodeResponse } from "../../interfaces/kpi";

function makeSeries(months: string[], values: number[]): KpiPoint[] {
  return months.map((m, i) => ({ month: m, value: values[i] }));
}

function makeNode(
  id: number,
  name: string,
  headcount: KpiPoint[],
  turnover: KpiPoint[] = []
): HierarchyNodeResponse {
  return {
    id,
    name,
    email: `${name.toLowerCase()}@empresa.com`,
    status: "ativo",
    position: "Manager",
    counts: { direct: 0, indirect: 0, total: 0 },
    metrics: { headcount, turnover },
    reports: [],
  };
}

describe("buildChildSeriesMap", () => {
  const months = ["2025-01", "2025-02", "2025-03"];

  it("retorna apenas Total quando não há filhos", () => {
    const node = makeNode(1, "Diretor", makeSeries(months, [10, 20, 30]));

    const map = buildChildSeriesMap(node, "headcount");
    expect(map).toEqual({
      Total: [
        { month: "2025-01", value: 10 },
        { month: "2025-02", value: 20 },
        { month: "2025-03", value: 30 },
      ],
    });
  });

  it("inclui filhos ordenados pelo último valor", () => {
    const node: HierarchyNodeResponse = {
      ...makeNode(1, "Diretor", makeSeries(months, [100, 200, 300])),
      reports: [
        makeNode(2, "Alice", makeSeries(months, [1, 2, 3])),
        makeNode(3, "Bob", makeSeries(months, [5, 6, 50])),
      ],
    };

    const map = buildChildSeriesMap(node, "headcount", 6);
    expect(Object.keys(map)).toEqual(["Total", "Bob", "Alice"]);
  });

  it("limita filhos a topN e agrupa resto em Outros", () => {
    const node: HierarchyNodeResponse = {
      ...makeNode(1, "Diretor", makeSeries(months, [100, 200, 300])),
      reports: [
        makeNode(2, "A", makeSeries(months, [1, 1, 1])),
        makeNode(3, "B", makeSeries(months, [2, 2, 2])),
        makeNode(4, "C", makeSeries(months, [3, 3, 3])),
        makeNode(5, "D", makeSeries(months, [4, 4, 4])),
      ],
    };

    const map = buildChildSeriesMap(node, "headcount", 2);

    expect(Object.keys(map)).toEqual(["Total", "D", "C", "Outros (2)"]);
    expect(map["Outros (2)"]).toEqual([
      { month: "2025-01", value: 3 },
      { month: "2025-02", value: 3 },
      { month: "2025-03", value: 3 },
    ]);
  });

  it("considera last = 0 quando série do filho está vazia", () => {
    const node: HierarchyNodeResponse = {
      ...makeNode(1, "Diretor", []),
      reports: [makeNode(2, "Alice", []), makeNode(3, "Bob", [])],
    };

    const map = buildChildSeriesMap(node, "headcount", 1);
    expect(map).toHaveProperty("Outros (1)");
  });
});
