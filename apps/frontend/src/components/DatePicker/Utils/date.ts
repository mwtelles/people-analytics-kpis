import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const parseDate = (value: string, format = "YYYY-MM-DD"): Date => {
  return dayjs.utc(value, format).toDate();
};

export const formatDate = (value: Date, format = "YYYY-MM-DD"): string => {
  return dayjs.utc(value).format(format);
};

export const isAfter = (a: string, b: string, format = "YYYY-MM-DD") => {
  return dayjs.utc(a, format).isAfter(dayjs.utc(b, format));
};

export const isBefore = (a: string, b: string, format = "YYYY-MM-DD") => {
  return dayjs.utc(a, format).isBefore(dayjs.utc(b, format));
};

export const isSame = (a: string, b: string, format = "YYYY-MM-DD") => {
  return dayjs.utc(a, format).isSame(dayjs.utc(b, format), "day");
};

export const diffInDays = (a: string, b: string, format = "YYYY-MM-DD") => {
  return dayjs.utc(a, format).diff(dayjs.utc(b, format), "day");
};
