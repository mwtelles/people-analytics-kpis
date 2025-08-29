export function formatTick(val: number, isPercentage?: boolean): string {
  if (isPercentage) {
    return `${Math.round(val)}%`;
  }
  return Math.round(val).toString();
}
