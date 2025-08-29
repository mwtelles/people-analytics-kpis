import { makeEmployee } from "../../../__tests__/factories/employeeFactory";
import { EmployeeRepository } from "../../../repositories/employee";
import { KpiService } from "../kpiService";
import { KpiSeriesResponse } from "../../../dtos/kpi.dto";
import { Employee } from "../../../models/employee";

describe("KpiService (Total Scope)", () => {
  beforeEach(() => {
    jest.restoreAllMocks();

    jest.spyOn(Employee, "findOne").mockResolvedValue({
      id: 999,
      email: "test@acme.com",
      name: "Leader",
      position: "Gerente",
      status: "ativo",
    } as unknown as Employee);

    jest
      .spyOn(EmployeeRepository, "getEmployeeTreeByEmail")
      .mockResolvedValue([1]);

    jest
      .spyOn(EmployeeRepository, "getEmployeesByIds")
      .mockResolvedValue([makeEmployee()]);
  });

  it("deve calcular headcount corretamente para 1 funcionário ativo", async () => {
    const result = await KpiService.getKpis(
      "test@acme.com",
      "2021-01",
      "2021-01",
      "total",
      false
    );
    const series = result as KpiSeriesResponse;

    expect(series.aggregates.total.headcount).toHaveLength(1);
    expect(series.aggregates.total.headcount?.[0].month).toBe("2021-01");
    expect(series.aggregates.total.headcount?.[0].value).toBe(1);
  });

  it("deve calcular turnover como 0 quando não há desligamentos", async () => {
    const result = await KpiService.getKpis(
      "test@acme.com",
      "2021-01",
      "2021-01",
      "total",
      false
    );
    const series = result as KpiSeriesResponse;

    expect(series.aggregates.total.turnover).toHaveLength(1);
    expect(series.aggregates.total.turnover?.[0].value).toBe(0);
  });

  it("deve calcular turnover = 2 quando há desligamento no meio do mês", async () => {
    jest.spyOn(EmployeeRepository, "getEmployeesByIds").mockResolvedValue([
      makeEmployee({
        resignationDate: new Date(Date.UTC(2021, 0, 15)),
        status: "inativo",
      }),
    ]);

    const result = await KpiService.getKpis(
      "test@acme.com",
      "2021-01",
      "2021-01",
      "total",
      false
    );
    const series = result as KpiSeriesResponse;

    expect(series.aggregates.total.turnover?.[0].value).toBe(2);
  });

  it("deve calcular série em múltiplos meses do intervalo", async () => {
    const result = await KpiService.getKpis(
      "test@acme.com",
      "2021-01",
      "2021-03",
      "total",
      false
    );
    const series = result as KpiSeriesResponse;

    expect(series.aggregates.total.headcount).toHaveLength(3);
    expect(series.aggregates.total.headcount?.map((s) => s.month)).toEqual([
      "2021-01",
      "2021-02",
      "2021-03",
    ]);
  });

  it("deve considerar funcionário admitido no último dia do mês como meio ativo (0.5)", async () => {
    jest.spyOn(EmployeeRepository, "getEmployeesByIds").mockResolvedValue([
      makeEmployee({ admissionDate: new Date(Date.UTC(2021, 0, 31)) }),
    ]);

    const result = await KpiService.getKpis(
      "test@acme.com",
      "2021-01",
      "2021-01",
      "total",
      false
    );
    const series = result as KpiSeriesResponse;

    expect(series.aggregates.total.headcount?.[0].value).toBe(0.5);
  });

  it("deve calcular turnover = 2 quando funcionário sai no primeiro dia do mês", async () => {
    jest.spyOn(EmployeeRepository, "getEmployeesByIds").mockResolvedValue([
      makeEmployee({
        resignationDate: new Date(Date.UTC(2021, 0, 1)),
        status: "inativo",
      }),
    ]);

    const result = await KpiService.getKpis(
      "test@acme.com",
      "2021-01",
      "2021-01",
      "total",
      false
    );
    const series = result as KpiSeriesResponse;

    expect(series.aggregates.total.turnover?.[0].value).toBe(2);
  });

  it("não deve contar funcionário admitido após o mês de referência", async () => {
    jest.spyOn(EmployeeRepository, "getEmployeesByIds").mockResolvedValue([
      makeEmployee({ admissionDate: new Date(Date.UTC(2021, 1, 1)) }),
    ]);

    const result = await KpiService.getKpis(
      "test@acme.com",
      "2021-01",
      "2021-01",
      "total",
      false
    );
    const series = result as KpiSeriesResponse;

    expect(series.aggregates.total.headcount?.[0].value).toBe(0);
  });

  it("não deve contar funcionário desligado antes do mês de referência", async () => {
    jest.spyOn(EmployeeRepository, "getEmployeesByIds").mockResolvedValue([
      makeEmployee({
        resignationDate: new Date(Date.UTC(2020, 11, 31)),
        status: "inativo",
      }),
    ]);

    const result = await KpiService.getKpis(
      "test@acme.com",
      "2021-01",
      "2021-01",
      "total",
      false
    );
    const series = result as KpiSeriesResponse;

    expect(series.aggregates.total.headcount?.[0].value).toBe(0);
  });
});
