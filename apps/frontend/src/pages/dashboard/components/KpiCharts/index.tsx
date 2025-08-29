import { motion } from "framer-motion";
import * as S from "./style";
import LineChart from "../../../../components/Chart/Line";
import { KpiPoint } from "../../../../interfaces/kpi";
import { RefObject } from "react";

type SeriesMap = Record<string, KpiPoint[]>;

interface Props {
  headcountSeriesTop: SeriesMap;
  turnoverSeriesTop: SeriesMap;
  headcountContainerRef: RefObject<HTMLDivElement>;
  turnoverContainerRef: RefObject<HTMLDivElement>;
}

export default function KpiCharts({
  headcountSeriesTop,
  turnoverSeriesTop,
  headcountContainerRef,
  turnoverContainerRef,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <S.GridChart>
        <S.CardChart ref={headcountContainerRef} data-tour="chart-headcount">
          <LineChart
            title="Headcount"
            data={headcountSeriesTop}
            containerRef={headcountContainerRef}
          />
        </S.CardChart>

        <S.CardChart ref={turnoverContainerRef} data-tour="chart-turnover">
          <LineChart
            title="Turnover"
            data={turnoverSeriesTop}
            isPercentage
            containerRef={turnoverContainerRef}
          />
        </S.CardChart>
      </S.GridChart>
    </motion.div>
  );
}
