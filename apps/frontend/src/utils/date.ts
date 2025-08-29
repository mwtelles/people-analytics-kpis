export function parseMonth(month: string): Date {
  const [year, m] = month.split("-").map(Number);
  return new Date(Date.UTC(year, m - 1, 1));
}

interface FormatMonthOptions {
  locale?: "pt-BR" | "en-US";
  format?: "short" | "long";
  showYear?: "2-digit" | "numeric" | false;
}

export function formatMonth(
  month: string,
  { locale = "pt-BR", format = "short", showYear = "2-digit" }: FormatMonthOptions = {},
): string {
  const date = parseMonth(month);

  const options: Intl.DateTimeFormatOptions = {
    month: format,
    timeZone: "UTC",
  };

  if (showYear) {
    options.year = showYear;
  }

  return date.toLocaleDateString(locale, options);
}
