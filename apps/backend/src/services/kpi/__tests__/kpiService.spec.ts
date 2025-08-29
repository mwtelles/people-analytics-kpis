import { makeEmployee } from "../../../__tests__/factories/employeeFactory";
import { GroupedKpiDto, HierarchyKpiDto } from "../../../dtos/kpi.dto";
import { EmployeeRepository } from "../../../repositories/employee";
import { Employee } from "../../../models/employee";
import { KpiService } from "../kpiService";

jest.spyOn(EmployeeRepository, "getEmployeeTreeByEmail").mockResolvedValue([1]);

describe("KpiService", () => {
  beforeEach(() => {
    jest.spyOn(EmployeeRepository, "getEmployeesByIds").mockResolvedValue([
      makeEmployee(),
    ]);

    jest.spyOn(Employee, "findOne").mockResolvedValue(
      makeEmployee({ id: 1, email: "test@acme.com" }) as Employee
    );
  });

  describe("Grouped scope", () => {
    it("deve retornar séries para direct, indirect e total (headcount e turnover)", async () => {
      const leader = makeEmployee({ id: 1, email: "test@acme.com" });
      jest.spyOn(EmployeeRepository, "getEmployeesByIds").mockResolvedValue([
        leader,
        makeEmployee({ id: 2, leaderId: leader.id }),
        makeEmployee({ id: 3, leaderId: 2 }),
      ]);

      const result = await KpiService.getKpis(
        "test@acme.com",
        "2021-01",
        "2021-01",
        "grouped",
        false
      );
      const grouped = result as GroupedKpiDto;

      expect(grouped.aggregates.direct.headcount).toBeDefined();
      expect(grouped.aggregates.direct.turnover).toBeDefined();

      expect(grouped.aggregates.indirect.headcount).toBeDefined();
      expect(grouped.aggregates.indirect.turnover).toBeDefined();

      expect(grouped.aggregates.total.headcount).toBeDefined();
      expect(grouped.aggregates.total.turnover).toBeDefined();
    });
  });

  describe("Hierarchy scope", () => {
    it("deve retornar leader e directReports no escopo hierarchy (headcount e turnover)", async () => {
      const leader = makeEmployee({ id: 1, email: "test@acme.com" });
      const direct = makeEmployee({ id: 2, leaderId: leader.id });

      jest.spyOn(EmployeeRepository, "getEmployeesByIds").mockResolvedValue([
        leader,
        direct,
      ]);

      jest.spyOn(Employee, "findOne").mockResolvedValue(leader as Employee);

      const result = await KpiService.getKpis(
        "test@acme.com",
        "2021-01",
        "2021-01",
        "hierarchy",
        true
      );
      const hierarchy = result as HierarchyKpiDto;

      expect(hierarchy.leader?.id).toBe(1);
      expect(hierarchy.hierarchy.directReports.length).toBe(1);

      const firstReport = hierarchy.hierarchy.directReports[0];
      expect(firstReport.id).toBe(2);

      expect(firstReport.metrics.headcount).toBeDefined();
      expect(firstReport.metrics.turnover).toBeDefined();

      expect(firstReport.counts.total).toBeGreaterThanOrEqual(0);
      expect(firstReport.counts.direct).toBeGreaterThanOrEqual(0);
      expect(firstReport.counts.indirect).toBeGreaterThanOrEqual(0);
    });
  });
});
