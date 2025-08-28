import { HierarchyNodeDto } from "../../dtos/kpi.dto";
import { Employee } from "../../models/employee";
import { buildMonthlySeries } from "./buildMonthlySeries";

export function buildHierarchyTree(
  employees: Employee[],
  leader: Employee,
  from: string,
  to: string,
) {
  const getSubtree = (root: Employee): Employee[] => {
    const subs = employees.filter((e) => e.leaderId === root.id);
    return subs.length > 0
      ? [...subs, ...subs.flatMap(s => getSubtree(s))]
      : [];
  };

  const build = (parent: Employee, rootId: number): HierarchyNodeDto => {
    const children = employees.filter((e) => e.leaderId === parent.id);
    const subtree = getSubtree(parent);

    const directCount = children.length;
    const indirectCount = subtree.length - directCount;
    const totalCount = subtree.length;

    return {
      id: parent.id,
      name: parent.name,
      email: parent.email,
      position: parent.position,
      status: parent.status,
      counts: {
        direct: directCount,
        indirect: indirectCount,
        total: totalCount,
      },
      metrics: {
        headcount: buildMonthlySeries("headcount", subtree, from, to),
        turnover: buildMonthlySeries("turnover", subtree, from, to),
      },
      reports: children.map((c) => build(c, rootId)),
    };
  };

  return {
    directReports: employees
      .filter((e) => e.leaderId === leader.id)
      .map((c) => build(c, leader.id)),
  };
}
