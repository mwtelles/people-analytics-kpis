import { QueryTypes } from "sequelize";
import sequelize from "../../config/database";
import { Employee } from "../../models/employee";

export class EmployeeRepository {
  static async getEmployeeTreeByEmail(email: string): Promise<number[]> {
    const result = await sequelize.query<{ id: number }>(
      `
      WITH RECURSIVE subordinates AS (
        SELECT id FROM "Employees" WHERE email = :email
        UNION
        SELECT e.id
        FROM "Employees" e
        INNER JOIN subordinates s ON e."leaderId" = s.id
      )
      SELECT id FROM subordinates;
      `,
      {
        type: QueryTypes.SELECT,
        replacements: { email },
      },
    );

    return result.map((row) => row.id);
  }

  static async getEmployeesByIds(ids: number[]): Promise<Employee[]> {
    if (!ids.length) return [];
    const employees = await Employee.findAll({
      where: { id: ids },
    });
    return employees;
  }
}
