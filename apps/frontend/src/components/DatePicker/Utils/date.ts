import dayjs from 'dayjs';

export const parseDate = (value: string, format = 'YYYY-MM-DD'): Date => {
  return dayjs(value, format).toDate();
};

export const formatDate = (value: Date, format = 'YYYY-MM-DD'): string => {
  return dayjs(value).format(format);
};

export const isAfter = (a: string, b: string, format = 'YYYY-MM-DD') => {
  return dayjs(a, format).isAfter(dayjs(b, format));
};

export const isBefore = (a: string, b: string, format = 'YYYY-MM-DD') => {
  return dayjs(a, format).isBefore(dayjs(b, format));
};

export const isSame = (a: string, b: string, format = 'YYYY-MM-DD') => {
  return dayjs(a, format).isSame(dayjs(b, format), 'day');
};

export const diffInDays = (a: string, b: string, format = 'YYYY-MM-DD') => {
  return dayjs(a, format).diff(dayjs(b, format), 'day');
};
