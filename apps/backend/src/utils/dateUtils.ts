import { Employee } from "../models/employee";

export function isActiveOnDate(
  employee: Pick<Employee, "admissionDate" | "resignationDate">,
  date: Date,
): boolean {
  const admission = new Date(employee.admissionDate);
  const resignation = employee.resignationDate ? new Date(employee.resignationDate) : null;

  if (admission.getTime() > date.getTime()) {
    return false;
  }
  if (resignation && resignation.getTime() < date.getTime()) {
    return false;
  }

  return true;
}
