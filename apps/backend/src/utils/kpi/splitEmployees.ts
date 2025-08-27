import { Employee } from "../../models/employee";

export function splitEmployees(employees: Employee[], leaderId: number) {
  return {
    direct: employees.filter((e) => e.leaderId === leaderId),
    indirect: employees.filter((e) => e.leaderId !== leaderId && e.id !== leaderId)
  };
}
