import { EmployeeRepository } from "../../repositories/employee";
import { startOfMonth, endOfMonth, eachMonthOfInterval } from "date-fns";
import { isActiveOnDate } from "../../utils/dateUtils";

interface KpiPoint {
  month: string;
  value: number;
}

export class KpiService {
  static async getHeadcountSeries(email: string, from: string, to: string): Promise<KpiPoint[]> {
    const ids = await EmployeeRepository.getEmployeeTreeByEmail(email);
    if (!ids.length) return [];

    const employees: any[] = await EmployeeRepository.getEmployeesByIds(ids);
    const startDate = new Date(`${from}-01T00:00:00Z`);
    const endDate = new Date(`${to}-01T00:00:00Z`);
    endDate.setMonth(endDate.getMonth() + 1);

    const months = eachMonthOfInterval({ start: startDate, end: endDate });
    const series: KpiPoint[] = [];

    for (const month of months) {
      const firstDay = startOfMonth(month);
      const lastDay = endOfMonth(month);

      const activeFirstDay = employees.filter((e) => isActiveOnDate(e, firstDay)).length;
      const activeLastDay = employees.filter((e) => isActiveOnDate(e, lastDay)).length;

      const headcount = (activeFirstDay + activeLastDay) / 2;

      series.push({
        month: `${month.getUTCFullYear()}-${String(month.getUTCMonth() + 1).padStart(2, "0")}`,
        value: headcount,
      });
    }

    return series;
  }

  static async getTurnoverSeries(email: string, from: string, to: string): Promise<KpiPoint[]> {
    const ids = await EmployeeRepository.getEmployeeTreeByEmail(email);
    if (!ids.length) return [];

    const employees: any[] = await EmployeeRepository.getEmployeesByIds(ids);
    const startDate = new Date(`${from}-01T00:00:00Z`);
    const endDate = new Date(`${to}-01T00:00Z`);
    endDate.setMonth(endDate.getMonth() + 1);

    const months = eachMonthOfInterval({ start: startDate, end: endDate });
    const series: KpiPoint[] = [];

    for (const month of months) {
      const lastDay = endOfMonth(month);

      const terminated = employees.filter((e) => {
        if (!e.resignationDate) return false;
        const res = new Date(e.resignationDate);
        return res.getUTCFullYear() === month.getUTCFullYear() &&
               res.getUTCMonth() === month.getUTCMonth();
      }).length;

      const activeFirstDay = employees.filter((e) => isActiveOnDate(e, startOfMonth(month))).length;
      const activeLastDay = employees.filter((e) => isActiveOnDate(e, lastDay)).length;

      const headcount = (activeFirstDay + activeLastDay) / 2;
      const turnover = headcount > 0 ? terminated / headcount : 0;

      series.push({
        month: `${month.getUTCFullYear()}-${String(month.getUTCMonth() + 1).padStart(2, "0")}`,
        value: turnover,
      });
    }

    return series;
  }
}
