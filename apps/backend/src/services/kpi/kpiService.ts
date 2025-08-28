import { Employee } from "../../models/employee";
import { EmployeeRepository } from "../../repositories/employee";
import {
  TotalKpiDto,
  GroupedKpiDto,
  HierarchyKpiDto,
  KpiSummaryDto,
  KpiResponseDto,
} from "../../dtos/kpi.dto";
import { buildMonthlySeries } from "../../utils/kpi/buildMonthlySeries";
import { splitEmployees } from "../../utils/kpi/splitEmployees";
import { buildHierarchyTree } from "../../utils/kpi/buildHierarchyTree";
import { summarize } from "../../utils/kpi/summarize";

export type KpiScope = "total" | "grouped" | "hierarchy";

export class KpiService {
  static async getKpis(
    email: string,
    from: string,
    to: string,
    scope: KpiScope,
    includeMeta: boolean,
  ): Promise<KpiResponseDto> {
    switch (scope) {
      case "grouped":
        return this.getGrouped(email, from, to);
      case "hierarchy":
        return this.getHierarchy(email, from, to, includeMeta);
      case "total":
      default:
        return this.getTotal(email, from, to);
    }
  }

  private static async getAllEmployees(email: string) {
    const leader = await Employee.findOne({ where: { email } });
    if (!leader) return [];

    if (leader.position === "Diretor") {
      return Employee.findAll();
    }

    const ids = await EmployeeRepository.getEmployeeTreeByEmail(email);
    if (!ids.length) return [];
    return EmployeeRepository.getEmployeesByIds(ids);
  }

  private static async getTotal(
    email: string,
    from: string,
    to: string,
  ): Promise<TotalKpiDto> {
    const employees = await this.getAllEmployees(email);

    return {
      aggregates: {
        total: {
          headcount: buildMonthlySeries("headcount", employees, from, to),
          turnover: buildMonthlySeries("turnover", employees, from, to),
        },
      },
    };
  }

  private static async getGrouped(
    email: string,
    from: string,
    to: string,
  ): Promise<GroupedKpiDto> {
    const leader = await Employee.findOne({ where: { email } });
    if (!leader) {
      return {
        aggregates: {
          direct: { headcount: [], turnover: [] },
          indirect: { headcount: [], turnover: [] },
          total: { headcount: [], turnover: [] },
        },
      };
    }

    if (leader.position === "Diretor") {
      const employees = await Employee.findAll();
      const direct = employees.filter(e => !e.leaderId && e.id !== leader.id);
      const indirect = employees.filter(e => e.leaderId);

      return {
        aggregates: {
          direct: {
            headcount: buildMonthlySeries("headcount", direct, from, to),
            turnover: buildMonthlySeries("turnover", direct, from, to),
          },
          indirect: {
            headcount: buildMonthlySeries("headcount", indirect, from, to),
            turnover: buildMonthlySeries("turnover", indirect, from, to),
          },
          total: {
            headcount: buildMonthlySeries("headcount", employees, from, to),
            turnover: buildMonthlySeries("turnover", employees, from, to),
          },
        },
      };
    }

    const employees = await this.getAllEmployees(email);
    const { direct, indirect } = splitEmployees(employees, leader.id);

    return {
      aggregates: {
        direct: {
          headcount: buildMonthlySeries("headcount", direct, from, to),
          turnover: buildMonthlySeries("turnover", direct, from, to),
        },
        indirect: {
          headcount: buildMonthlySeries("headcount", indirect, from, to),
          turnover: buildMonthlySeries("turnover", indirect, from, to),
        },
        total: {
          headcount: buildMonthlySeries("headcount", [...direct, ...indirect], from, to),
          turnover: buildMonthlySeries("turnover", [...direct, ...indirect], from, to),
        },
      },
    };
  }

  private static async getHierarchy(
    email: string,
    from: string,
    to: string,
    includeMeta: boolean,
  ): Promise<HierarchyKpiDto> {
    const leader = await Employee.findOne({ where: { email } });
    if (!leader) {
      return {
        leader: null,
        hierarchy: { directReports: [] },
        aggregates: {
          direct: { headcount: [], turnover: [] },
          indirect: { headcount: [], turnover: [] },
          total: { headcount: [], turnover: [] },
        },
      };
    }

    const employees =
      leader.position === "Diretor"
        ? await Employee.findAll()
        : await this.getAllEmployees(email);

    return {
      leader: includeMeta
        ? {
            id: leader.id,
            name: leader.name,
            email: leader.email,
            position: leader.position,
            status: leader.status,
          }
        : null,
      hierarchy: buildHierarchyTree(employees, leader, from, to),
      aggregates: {
        total: {
          headcount: buildMonthlySeries("headcount", employees, from, to),
          turnover: buildMonthlySeries("turnover", employees, from, to),
        },
        direct: { headcount: [], turnover: [] },
        indirect: { headcount: [], turnover: [] },
      },
    };
  }

  static async getSummary(
    email: string,
    from: string,
    to: string,
  ): Promise<KpiSummaryDto> {
    const employees = await this.getAllEmployees(email);

    const headcountSeries = buildMonthlySeries("headcount", employees, from, to);
    const turnoverSeries = buildMonthlySeries("turnover", employees, from, to);

    return {
      headcount: summarize(headcountSeries),
      turnover: summarize(turnoverSeries),
    };
  }
}
