import dayjs from "dayjs";
import isoWeek from 'dayjs/plugin/isoWeek';
import type { ShortcutType } from "..";

dayjs.extend(isoWeek);

export const useShortcuts = () => {
  const today = dayjs();

  const shortcutLabels: Record<ShortcutType, string> = {
    today: 'Hoje',
    week: 'Esta semana',
    month: 'Este mês',
    7: 'Últimos 7 dias',
    15: 'Últimos 15 dias',
    30: 'Últimos 30 dias',
    31: 'Últimos 31 dias',
    60: 'Últimos 60 dias',
  };

  const resolveShortcut = (shortcut: ShortcutType, limit: number): [string, string] => {
    let start = today;
    let end = today;

    switch (shortcut) {
      case 'today':
        break;
      case 'week':
        start = today.startOf('isoWeek');
        end = today.endOf('isoWeek');
        break;
      case 'month':
        start = today.startOf('month');
        end = today.endOf('month');
        break;
      case 7:
      case 15:
      case 30:
      case 31:
      case 60:
        start = today.subtract(shortcut - 1, 'day');
        end = today;
        break;
    }

    const maxRange = start.add(limit - 1, 'day');
    if (end.isAfter(maxRange)) end = maxRange;
    if (end.isAfter(today)) end = today;

    return [start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD')];
  };

  const isShortcutAllowed = (shortcut: ShortcutType, limit: number) => {
    const [start, end] = resolveShortcut(shortcut, 9999);

    const diff = dayjs(end).diff(dayjs(start), 'day') + 1;
    return diff <= limit;
  };

  const filterShortcutsByLimit = (shortcuts: ShortcutType[], limit: number): ShortcutType[] => {
    return shortcuts.filter((s) => isShortcutAllowed(s, limit));
  };

  return {
    shortcutLabels,
    resolveShortcut,
    filterShortcutsByLimit,
  };
};
