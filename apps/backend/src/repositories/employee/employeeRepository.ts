import { QueryTypes } from "sequelize";
import sequelize from "../../config/database";

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
      }
    );

    return result.map((row) => row.id);
  }

  static async getEmployeesByIds(ids: number[]) {
    if (!ids.length) return [];
    const result = await sequelize.query(
      `SELECT * FROM "Employees" WHERE id IN (:ids)`,
      {
        type: QueryTypes.SELECT,
        replacements: { ids },
      }
    );
    return result;
  }
}
