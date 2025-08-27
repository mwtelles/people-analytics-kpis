import { HierarchyNodeDto } from "../../dtos/kpi.dto";
import { Employee } from "../../models/employee";
import { buildMonthlySeries, Metric } from "./buildMonthlySeries";

export function buildHierarchyTree(
  metric: Metric,
  employees: Employee[],
  leader: Employee,
  from: string,
  to: string,
) {
  
  const build = (parent: Employee, rootId: number): HierarchyNodeDto => {
    const children = employees.filter((e) => e.leaderId === parent.id);
    return {
      id: parent.id,
      name: parent.name,
      email: parent.email,
      position: parent.position,
      status: parent.status,
      type: parent.leaderId === rootId ? "direct" : "indirect",
      metrics: { [metric]: buildMonthlySeries(metric, [parent], from, to) },
      reports: children.map((c) => build(c, rootId)),
    };
  };

  return {
    directReports: employees
      .filter((e) => e.leaderId === leader.id)
      .map((c) => build(c, leader.id)),
  };
}
