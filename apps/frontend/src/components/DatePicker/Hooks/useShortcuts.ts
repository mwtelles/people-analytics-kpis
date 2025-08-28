import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export type MonthShortcut =
  | "thisMonth"
  | "last3Months"
  | "last6Months"
  | "thisYear"
  | "lastYear"
  | "last3Years"
  | "last5Years";

export type YearShortcut =
  | "thisYear"
  | "lastYear"
  | "last3Years"
  | "last5Years";

export type ShortcutType = MonthShortcut | YearShortcut;

type RangeFn = (today: Dayjs) => [string, string];

const monthShortcuts: Record<MonthShortcut, { label: string; getRange: RangeFn }> = {
  thisMonth: {
    label: "Este mês",
    getRange: (today) => [
      today.startOf("month").format("YYYY-MM"),
      today.endOf("month").format("YYYY-MM"),
    ],
  },
  last3Months: {
    label: "Últimos 3 meses",
    getRange: (today) => [
      today.subtract(2, "month").startOf("month").format("YYYY-MM"),
      today.endOf("month").format("YYYY-MM"),
    ],
  },
  last6Months: {
    label: "Últimos 6 meses",
    getRange: (today) => [
      today.subtract(5, "month").startOf("month").format("YYYY-MM"),
      today.endOf("month").format("YYYY-MM"),
    ],
  },
  thisYear: {
    label: "Este ano",
    getRange: (today) => [
      today.startOf("year").format("YYYY-MM"),
      today.endOf("year").format("YYYY-MM"),
    ],
  },
  lastYear: {
    label: "Ano passado",
    getRange: (today) => [
      today.subtract(1, "year").startOf("year").format("YYYY-MM"),
      today.subtract(1, "year").endOf("year").format("YYYY-MM"),
    ],
  },
  last3Years: {
    label: "Últimos 3 anos",
    getRange: (today) => [
      today.subtract(2, "year").startOf("year").format("YYYY-MM"),
      today.endOf("year").format("YYYY-MM"),
    ],
  },
  last5Years: {
    label: "Últimos 5 anos",
    getRange: (today) => [
      today.subtract(4, "year").startOf("year").format("YYYY-MM"),
      today.endOf("year").format("YYYY-MM"),
    ],
  },
};

const yearShortcuts: Record<YearShortcut, { label: string; getRange: RangeFn }> = {
  thisYear: {
    label: "Este ano",
    getRange: (today) => [
      today.startOf("year").format("YYYY-MM"),
      today.endOf("year").format("YYYY-MM"),
    ],
  },
  lastYear: {
    label: "Ano passado",
    getRange: (today) => [
      today.subtract(1, "year").startOf("year").format("YYYY-MM"),
      today.subtract(1, "year").endOf("year").format("YYYY-MM"),
    ],
  },
  last3Years: {
    label: "Últimos 3 anos",
    getRange: (today) => [
      today.subtract(2, "year").startOf("year").format("YYYY-MM"),
      today.endOf("year").format("YYYY-MM"),
    ],
  },
  last5Years: {
    label: "Últimos 5 anos",
    getRange: (today) => [
      today.subtract(4, "year").startOf("year").format("YYYY-MM"),
      today.endOf("year").format("YYYY-MM"),
    ],
  },
};

export const useShortcuts = (selectionLevel: "month" | "year" = "month") => {
  const today = dayjs.utc();

  const shortcuts = selectionLevel === "year" ? yearShortcuts : monthShortcuts;

  const shortcutLabels = Object.fromEntries(
    Object.entries(shortcuts).map(([key, { label }]) => [key, label])
  ) as Record<ShortcutType, string>;

  const resolveShortcut = (shortcut: ShortcutType): [string, string] => {
    return (shortcuts as Record<ShortcutType, { label: string; getRange: RangeFn }>)[shortcut].getRange(today);
  };

  return {
    shortcutLabels,
    resolveShortcut,
  };
};
