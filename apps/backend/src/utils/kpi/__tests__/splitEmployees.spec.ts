import { makeEmployee } from "../../../__tests__/factories/employeeFactory";
import { splitEmployees } from "../splitEmployees";

describe("splitEmployees", () => {
  it("deve separar corretamente os funcionários em diretos e indiretos", () => {
    const leader = makeEmployee({ id: 1 });
    const employees = [
      leader,
      makeEmployee({ id: 2, leaderId: 1 }),
      makeEmployee({ id: 3, leaderId: 2 }),
      makeEmployee({ id: 4, leaderId: 1 }),
      makeEmployee({ id: 5, leaderId: 3 })
    ];

    const { direct, indirect } = splitEmployees(employees, leader.id);

    expect(direct.map(e => e.id)).toEqual([2, 4]);
    expect(indirect.map(e => e.id)).toEqual([3, 5]);
  });
});
