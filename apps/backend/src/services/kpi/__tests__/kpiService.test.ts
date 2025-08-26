import { KpiService } from "../../kpi/kpiService";
import { EmployeeRepository } from "../../../repositories/employee/employeeRepository";
import { makeEmployee } from "../../../__tests__/factories/employeeFactory";

jest.spyOn(EmployeeRepository, "getEmployeeTreeByEmail").mockResolvedValue([1]);

describe("KpiService", () => {
  beforeEach(() => {
    jest.spyOn(EmployeeRepository, "getEmployeesByIds").mockResolvedValue([
      makeEmployee(),
    ]);
  });

  it("deve calcular headcount corretamente para 1 funcionário ativo", async () => {
    const series = await KpiService.getHeadcountSeries("test@acme.com", "2021-01", "2021-01");
    expect(series).toHaveLength(1);
    expect(series[0].month).toBe("2021-01");
    expect(series[0].value).toBe(1);
  });

  it("deve calcular turnover como 0 quando não há desligamentos", async () => {
    const series = await KpiService.getTurnoverSeries("test@acme.com", "2021-01", "2021-01");
    expect(series).toHaveLength(1);
    expect(series[0].month).toBe("2021-01");
    expect(series[0].value).toBe(0);
  });

  it("deve calcular turnover > 0 quando há desligamento no mês", async () => {
    jest.spyOn(EmployeeRepository, "getEmployeesByIds").mockResolvedValue([
      makeEmployee({ resignationDate: new Date("2021-01-15") }),
    ]);
    const series = await KpiService.getTurnoverSeries("test@acme.com", "2021-01", "2021-01");
    expect(series).toHaveLength(1);
    expect(series[0].month).toBe("2021-01");
    expect(series[0].value).toBeGreaterThan(0);
  });

  it("deve calcular série em múltiplos meses do intervalo", async () => {
    const series = await KpiService.getHeadcountSeries("test@acme.com", "2021-01", "2021-03");
    expect(series).toHaveLength(3);
    expect(series.map((s) => s.month)).toEqual(["2021-01", "2021-02", "2021-03"]);
  });

  it("deve considerar funcionário admitido no último dia do mês como ativo", async () => {
    jest.spyOn(EmployeeRepository, "getEmployeesByIds").mockResolvedValue([
      makeEmployee({ admissionDate: new Date("2021-01-31") }),
    ]);
    const series = await KpiService.getHeadcountSeries("test@acme.com", "2021-01", "2021-01");
    expect(series[0].value).toBe(0.5); 
  });

  it("deve considerar funcionário desligado no primeiro dia do mês para turnover", async () => {
    jest.spyOn(EmployeeRepository, "getEmployeesByIds").mockResolvedValue([
      makeEmployee({ resignationDate: new Date("2021-01-01") }),
    ]);
    const series = await KpiService.getTurnoverSeries("test@acme.com", "2021-01", "2021-01");
    expect(series[0].value).toBeGreaterThan(0);
  });

  it("não deve contar funcionário admitido após o mês de referência", async () => {
    jest.spyOn(EmployeeRepository, "getEmployeesByIds").mockResolvedValue([
      makeEmployee({ admissionDate: new Date("2021-02-01") }),
    ]);
    const series = await KpiService.getHeadcountSeries("test@acme.com", "2021-01", "2021-01");
    expect(series[0].value).toBe(0);
  });

  it("não deve contar funcionário desligado antes do mês de referência", async () => {
    jest.spyOn(EmployeeRepository, "getEmployeesByIds").mockResolvedValue([
      makeEmployee({ resignationDate: new Date("2020-12-31") }),
    ]);
    const series = await KpiService.getHeadcountSeries("test@acme.com", "2021-01", "2021-01");
    expect(series[0].value).toBe(0);
  });
});
