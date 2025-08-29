const numberFormatter = new Intl.NumberFormat("pt-BR", {
  maximumFractionDigits: 0,
});

const percentFormatter = new Intl.NumberFormat("pt-BR", {
  style: "percent",
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export const formatValue = (val: number, isPercentage: boolean) => {
  if (isPercentage) {
    return percentFormatter.format(val);
  }
  return numberFormatter.format(val);
};
