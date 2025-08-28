import { Employee } from "../../models/employee";
import { EmployeeRepository } from "../../repositories/employee";
import {
  TotalKpiDto,
  GroupedKpiDto,
  HierarchyKpiDto,
  KpiSummaryDto,
} from "../../dtos/kpi.dto";
import { buildMonthlySeries, Metric } from "../../utils/kpi/buildMonthlySeries";
import { splitEmployees } from "../../utils/kpi/splitEmployees";
import { buildHierarchyTree } from "../../utils/kpi/buildHierarchyTree";
import { summarize } from "../../utils/kpi/summarize";

export type KpiScope = "total" | "grouped" | "hierarchy";

export class KpiService {
  static async getHeadcount(
    email: string,
    from: string,
    to: string,
    scope: KpiScope,
    includeMeta: boolean,
  ): Promise<TotalKpiDto | GroupedKpiDto | HierarchyKpiDto> {
    return this.getByMetric("headcount", email, from, to, scope, includeMeta);
  }

  static async getTurnover(
    email: string,
    from: string,
    to: string,
    scope: KpiScope,
    includeMeta: boolean,
  ): Promise<TotalKpiDto | GroupedKpiDto | HierarchyKpiDto> {
    return this.getByMetric("turnover", email, from, to, scope, includeMeta);
  }

  private static async getByMetric(
    metric: Metric,
    email: string,
    from: string,
    to: string,
    scope: KpiScope,
    includeMeta: boolean,
  ): Promise<TotalKpiDto | GroupedKpiDto | HierarchyKpiDto> {
    switch (scope) {
      case "grouped":
        return this.getGrouped(metric, email, from, to);
      case "hierarchy":
        return this.getHierarchy(metric, email, from, to, includeMeta);
      case "total":
      default:
        return {
          aggregates: {
            total: {
              [metric]: await buildMonthlySeries(
                metric,
                await this.getAllEmployees(email),
                from,
                to,
              ),
            },
          },
        } as TotalKpiDto;
    }
  }

  private static async getAllEmployees(email: string) {
    const ids = await EmployeeRepository.getEmployeeTreeByEmail(email);
    if (!ids.length) return [];
    return EmployeeRepository.getEmployeesByIds(ids);
  }

  private static async getGrouped(
    metric: Metric,
    email: string,
    from: string,
    to: string,
  ): Promise<GroupedKpiDto> {
    const leader = await Employee.findOne({ where: { email } });
    if (!leader) {
      return {
        aggregates: {
          direct: { [metric]: [] },
          indirect: { [metric]: [] },
          total: { [metric]: [] },
        },
      };
    }

    const employees = await this.getAllEmployees(email);
    const { direct, indirect } = splitEmployees(employees, leader.id);

    return {
      aggregates: {
        direct: { [metric]: buildMonthlySeries(metric, direct, from, to) },
        indirect: { [metric]: buildMonthlySeries(metric, indirect, from, to) },
        total: {
          [metric]: buildMonthlySeries(metric, [...direct, ...indirect], from, to),
        },
      },
    };
  }

  private static async getHierarchy(
    metric: Metric,
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
          direct: { [metric]: [] },
          indirect: { [metric]: [] },
          total: { [metric]: [] },
        },
      };
    }

    const employees = await this.getAllEmployees(email);
    const { direct, indirect } = splitEmployees(employees, leader.id);

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
      hierarchy: buildHierarchyTree(metric, employees, leader, from, to),
      aggregates: {
        direct: { [metric]: buildMonthlySeries(metric, direct, from, to) },
        indirect: { [metric]: buildMonthlySeries(metric, indirect, from, to) },
        total: {
          [metric]: buildMonthlySeries(metric, [...direct, ...indirect], from, to),
        },
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
