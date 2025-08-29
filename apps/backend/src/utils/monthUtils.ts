export function getMonthRange(year: number, month: number) {
  const start = new Date(Date.UTC(year, month, 1, 0, 0, 0, 0));
  const end = new Date(Date.UTC(year, month + 1, 0, 0, 0, 0));
  return { start, end };
}
