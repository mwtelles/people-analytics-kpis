import { makeEmployee } from "../../../__tests__/factories/employeeFactory";
import { buildMonthlySeries } from "../buildMonthlySeries";

describe("buildMonthlySeries", () => {
  it("deve calcular corretamente o headcount", () => {
    const employees = [
      makeEmployee({ id: 1 }),
      makeEmployee({ id: 2 }),
      makeEmployee({ id: 3, resignationDate: new Date("2021-02-15"), status: "inativo" })
    ];

    const series = buildMonthlySeries("headcount", employees, "2021-01", "2021-03");

    expect(series).toEqual([
      { month: "2021-01", value: 3 },
      { month: "2021-02", value: 2.5 },
      { month: "2021-03", value: 2 }
    ]);
  });

  it("deve calcular corretamente o turnover", () => {
    const employees = [
      makeEmployee({ id: 1 }),
      makeEmployee({ id: 2, resignationDate: new Date("2021-02-15"), status: "inativo" })
    ];

    const series = buildMonthlySeries("turnover", employees, "2021-01", "2021-03");

    expect(series[0].value).toBe(0);
    expect(series[1].value).toBeCloseTo(0.67, 2);
    expect(series[2].value).toBe(0);
  });
});
