export function isActiveOnDate(employee: any, date: Date): boolean {
  const admission = new Date(employee.admissionDate);
  const resignation = employee.resignationDate ? new Date(employee.resignationDate) : null;

  return admission <= date && (!resignation || resignation >= date);
}
