import { EmployeeRepository } from "../../repositories/employee";
import { isActiveOnDate } from "../../utils/dateUtils";
import { getMonthRange } from "../../utils/monthUtils";

interface KpiPoint {
  month: string;
  value: number;
}

export class KpiService {
  static async getHeadcountSeries(email: string, from: string, to: string): Promise<KpiPoint[]> {
    const ids = await EmployeeRepository.getEmployeeTreeByEmail(email);
    if (!ids.length) return [];

    const employees: any[] = await EmployeeRepository.getEmployeesByIds(ids);

    const [fromYear, fromMonth] = from.split("-").map(Number);
    const [toYear, toMonth] = to.split("-").map(Number);

    const series: KpiPoint[] = [];

    for (let y = fromYear, m = fromMonth - 1; y < toYear || (y === toYear && m <= toMonth - 1); m++) {
      if (m > 11) { y++; m = 0; }
      const { start, end } = getMonthRange(y, m);

      const activeFirstDay = employees.filter((e) => isActiveOnDate(e, start)).length;
      const activeLastDay = employees.filter((e) => isActiveOnDate(e, end)).length;

      const headcount = (activeFirstDay + activeLastDay) / 2;

      series.push({
        month: `${y}-${String(m + 1).padStart(2, "0")}`,
        value: headcount,
      });
    }

    return series;
  }

  static async getTurnoverSeries(email: string, from: string, to: string): Promise<KpiPoint[]> {
    const ids = await EmployeeRepository.getEmployeeTreeByEmail(email);
    if (!ids.length) return [];

    const employees: any[] = await EmployeeRepository.getEmployeesByIds(ids);

    const [fromYear, fromMonth] = from.split("-").map(Number);
    const [toYear, toMonth] = to.split("-").map(Number);

    const series: KpiPoint[] = [];

    for (let y = fromYear, m = fromMonth - 1; y < toYear || (y === toYear && m <= toMonth - 1); m++) {
      if (m > 11) { y++; m = 0; }
      const { start, end } = getMonthRange(y, m);

      const terminated = employees.filter((e) => {
        if (!e.resignationDate) return false;
        const res = new Date(e.resignationDate);
        return res.getUTCFullYear() === y && res.getUTCMonth() === m;
      }).length;

      const activeFirstDay = employees.filter((e) => isActiveOnDate(e, start)).length;
      const activeLastDay = employees.filter((e) => isActiveOnDate(e, end)).length;

      const headcount = (activeFirstDay + activeLastDay) / 2;
      const turnover = headcount > 0 ? terminated / headcount : 0;

      series.push({
        month: `${y}-${String(m + 1).padStart(2, "0")}`,
        value: turnover,
      });
    }

    return series;
  }
}
