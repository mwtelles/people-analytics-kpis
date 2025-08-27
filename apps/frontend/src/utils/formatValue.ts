export const formatValue = (val: number, isPercentage: boolean) =>
  isPercentage ? `${(val * 100).toFixed(1)}%` : `${val}`;
