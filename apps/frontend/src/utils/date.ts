export function parseMonth(month: string): Date {
  const [year, m] = month.split("-").map(Number);
  return new Date(Date.UTC(year, m - 1, 1));
}

export function formatMonth(month: string, locale: "pt-BR" | "en-US" = "pt-BR"): string {
  const date = parseMonth(month);
  return date.toLocaleDateString(locale, {
    month: "short",
    year: "2-digit",
    timeZone: "UTC",
  });
}
