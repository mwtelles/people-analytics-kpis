import { makeEmployee } from "../../../__tests__/factories/employeeFactory";
import { buildHierarchyTree } from "../buildHierarchyTree";

describe("buildHierarchyTree", () => {
  it("deve construir a hierarquia com liderados diretos e indiretos", () => {
    const leader = makeEmployee({ id: 1 });
    const employees = [
      leader,
      makeEmployee({ id: 2, leaderId: 1 }),
      makeEmployee({ id: 3, leaderId: 2 })
    ];

    const hierarchy = buildHierarchyTree("headcount", employees, leader, "2021-01", "2021-02");

    expect(hierarchy.directReports.length).toBe(1);
    const firstReport = hierarchy.directReports[0];
    expect(firstReport.id).toBe(2);
    expect(firstReport.type).toBe("direct");
    expect(firstReport.reports[0].type).toBe("indirect");
    expect(firstReport.metrics?.headcount?.length).toBeGreaterThan(0);
  });
});
