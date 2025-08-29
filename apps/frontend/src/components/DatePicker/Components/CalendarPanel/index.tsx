import { useMemo, useState } from "react";
import dayjs from "dayjs";
import * as S from "./style";

interface CalendarPanelProps {
  mode: "single" | "range";
  startDate: string | null;
  endDate: string | null;
  onSelect: (start: string, end?: string) => void;
  dateFormat: string;
  baseMonth?: string;
  onChangeBaseMonth?: (newMonth: string) => void;
  showLeftArrow?: boolean;
  showRightArrow?: boolean;
  allowChangeYear?: boolean;
}

export const CalendarPanel = ({
  onSelect,
  dateFormat,
  baseMonth,
  onChangeBaseMonth,
  showLeftArrow = false,
  showRightArrow = false,
  allowChangeYear = true,
}: CalendarPanelProps) => {
  const [viewMode, setViewMode] = useState<"month" | "year">("month");

  const current = useMemo(() => {
    return dayjs(baseMonth, dateFormat);
  }, [baseMonth, dateFormat]);

  const handleSelect = (unit: "month" | "year", value: number) => {
    const updated = current.set(unit, value);
    onChangeBaseMonth?.(updated.format(dateFormat));

    if (unit === "month") {
      onSelect(updated.format("YYYY-MM"));
    } else {
      setViewMode("month");
    }
  };

  const renderYearGrid = () => {
    const startYear = current.year() - 6;
    return (
      <S.GridContainer>
        {Array.from({ length: 12 }).map((_, i) => {
          const year = startYear + i;
          return (
            <S.GridCell key={year} onClick={() => handleSelect("year", year)}>
              {year}
            </S.GridCell>
          );
        })}
      </S.GridContainer>
    );
  };

  const renderMonthGrid = () => (
    <S.GridContainer>
      {Array.from({ length: 12 }).map((_, i) => (
        <S.GridCell key={i} onClick={() => handleSelect("month", i)}>
          {dayjs().month(i).format("MMM")}
        </S.GridCell>
      ))}
    </S.GridContainer>
  );

  return (
    <S.CalendarWrapper>
      <S.Header>
        <S.NavButton
          $hide={!showLeftArrow}
          onClick={() => {
            const prevYear = current.subtract(1, "year").format(dateFormat);
            onChangeBaseMonth?.(prevYear);
          }}
        >
          <S.ArrowIcon $rotated />
        </S.NavButton>

        <S.YearLabel
          onClick={() => {
            if (allowChangeYear) setViewMode(viewMode === "year" ? "month" : "year");
          }}
          $clickable={allowChangeYear}
        >
          {current.year()}
        </S.YearLabel>

        <S.NavButton
          $hide={!showRightArrow}
          onClick={() => {
            const nextYear = current.add(1, "year").format(dateFormat);
            onChangeBaseMonth?.(nextYear);
          }}
        >
          <S.ArrowIcon />
        </S.NavButton>
      </S.Header>

      {viewMode === "year" ? renderYearGrid() : renderMonthGrid()}
    </S.CalendarWrapper>
  );
};
