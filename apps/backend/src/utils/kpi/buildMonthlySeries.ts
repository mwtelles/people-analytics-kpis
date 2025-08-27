import { Employee } from "../../models/employee";
import { isActiveOnDate } from "../../utils/dateUtils";
import { getMonthRange } from "../../utils/monthUtils";
import { KpiPoint } from "../../dtos/kpi.dto";

export type Metric = "headcount" | "turnover";

export function buildMonthlySeries(
  metric: Metric,
  list: Employee[],
  from: string,
  to: string
): KpiPoint[] {
  const [fromYear, fromMonth] = from.split("-").map(Number);
  const [toYear, toMonth] = to.split("-").map(Number);
  const series: KpiPoint[] = [];

  for (
    let y = fromYear, m = fromMonth - 1;
    y < toYear || (y === toYear && m <= toMonth - 1);
    m++
  ) {
    if (m > 11) {
      y++;
      m = 0;
    }
    const { start, end } = getMonthRange(y, m);

    const activeFirstDay = list.filter((e) => isActiveOnDate(e, start)).length;
    const activeLastDay = list.filter((e) => isActiveOnDate(e, end)).length;
    const headcount = (activeFirstDay + activeLastDay) / 2;

    let value = headcount;
    if (metric === "turnover") {
      const terminated = list.filter((e) => {
        if (!e.resignationDate) return false;
        const res = new Date(e.resignationDate);
        return res.getUTCFullYear() === y && res.getUTCMonth() === m;
      }).length;
      value = headcount > 0 ? terminated / headcount : 0;
    }

    series.push({
      month: `${y}-${String(m + 1).padStart(2, "0")}`,
      value
    });
  }
  return series;
}
