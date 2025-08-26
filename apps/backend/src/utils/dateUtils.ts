import { Employee } from "../models/employee";

export function isActiveOnDate(
  employee: Pick<Employee, "admissionDate" | "resignationDate">,
  date: Date,
): boolean {
  const admission = new Date(employee.admissionDate);
  const resignation = employee.resignationDate ? new Date(employee.resignationDate) : null;

  return admission <= date && (!resignation || resignation >= date);
}
