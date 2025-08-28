import { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import * as S from './style';

interface CalendarPanelProps {
    mode: 'single' | 'range';
    startDate: string | null;
    endDate: string | null;
    onSelect: (start: string, end?: string) => void;
    limitRangeDays: number;
    dateFormat: string;
    today: string;
    baseMonth?: string;
    offset?: number;
    showLeftArrow?: boolean;
    showRightArrow?: boolean;
    onPrevMonth?: () => void;
    onNextMonth?: () => void;
    onChangeBaseMonth?: (newMonth: string) => void;
    allowChangeMonth?: boolean;
    allowChangeYear?: boolean;
    forcedViewMode?: 'day' | 'month' | 'year';
}

export const CalendarPanel = ({
    mode,
    startDate,
    endDate,
    onSelect,
    limitRangeDays,
    dateFormat,
    today,
    baseMonth,
    offset = 0,
    showLeftArrow = false,
    showRightArrow = false,
    onPrevMonth,
    onNextMonth,
    onChangeBaseMonth,
    allowChangeMonth,
    allowChangeYear,
    forcedViewMode,
}: CalendarPanelProps) => {
    const parsedStart = startDate ? dayjs(startDate, dateFormat) : null;
    const parsedEnd = endDate ? dayjs(endDate, dateFormat) : null;
    const maxDate = dayjs(today, dateFormat);
    const [viewMode, setViewMode] = useState<'day' | 'month' | 'year'>(() => forcedViewMode ?? 'day');
    const [yearOffset, setYearOffset] = useState(0);

    useEffect(() => {
        if (forcedViewMode) {
            setViewMode(forcedViewMode);
        }
    }, [forcedViewMode]);


    const currentMonth = useMemo(() => {
        return dayjs(baseMonth, dateFormat).add(offset, 'month');
    }, [baseMonth, offset, dateFormat]);

    const weeks = useMemo(() => {
        const startOfMonth = currentMonth.startOf('month');
        const endOfMonth = currentMonth.endOf('month');

        const calendarStart = startOfMonth.startOf('week');
        const totalDays = 6 * 7;

        const days: dayjs.Dayjs[][] = [];
        let currentWeek: dayjs.Dayjs[] = [];

        let currentDay = calendarStart;

        for (let i = 0; i < totalDays; i++) {
            currentWeek.push(currentDay);

            if (currentWeek.length === 7) {
                days.push(currentWeek);
                currentWeek = [];
            }

            currentDay = currentDay.add(1, 'day');
        }

        return days;
    }, [currentMonth]);


    const isInRange = (date: dayjs.Dayjs) => {
        if (parsedStart && parsedEnd) {
            return date.isAfter(parsedStart) && date.isBefore(parsedEnd);
        }
        return false;
    };

    const isSelected = (date: dayjs.Dayjs) =>
        date.isSame(parsedStart, 'day') || date.isSame(parsedEnd, 'day');

    const isDisabled = (date: dayjs.Dayjs) => {
        if (date.isAfter(maxDate, 'day')) return true;
        if (parsedStart && !parsedEnd) {
            const diff = date.diff(parsedStart, 'day') + 1;
            if (diff > limitRangeDays) return true;
            if (date.isBefore(parsedStart)) return true;
        }
        return false;
    };

    const handleDayClick = (date: dayjs.Dayjs) => {
        if (isDisabled(date)) return;

        if (mode === 'single') {
            onSelect(date.format(dateFormat));
            return;
        }

        if (!parsedStart || (parsedStart && parsedEnd)) {
            onSelect(date.format(dateFormat), undefined);
        } else if (parsedStart && !parsedEnd) {
            if (date.isBefore(parsedStart)) {
                onSelect(date.format(dateFormat), undefined);
            } else {
                const diff = date.diff(parsedStart, 'day') + 1;
                if (diff > limitRangeDays) return;
                onSelect(parsedStart.format(dateFormat), date.format(dateFormat));
            }
        }
    };

    const renderYearGrid = () => {
        const startYear = currentMonth.year() - 6 + yearOffset * 12;

        return (
            <S.GridContainer>
                {Array.from({ length: 12 }).map((_, i) => {
                    const year = startYear + i;
                    return (
                        <S.GridCell
                            key={`year-${year}`}
                            data-testid={`calendar-year-${year}`}
                            onClick={() => {
                                const updated = currentMonth.set('year', year);
                                onChangeBaseMonth?.(updated.format(dateFormat));

                                if (forcedViewMode === 'year') {
                                    onSelect(updated.format(dateFormat));
                                    return;
                                }

                                setViewMode('month');
                            }}

                        >
                            {year}
                        </S.GridCell>
                    );
                })}
            </S.GridContainer>
        );
    };

    const renderMonthGrid = () => {
        return (
            <S.GridContainer>
                {Array.from({ length: 12 }).map((_, i) => {
                    const month = currentMonth.month(i);
                    return (
                        <S.GridCell
                            key={`month-${i + 1}`}
                            data-testid={`calendar-month-${i + 1}`}
                            onClick={() => {
                                const updated = currentMonth.set('month', i);
                                onChangeBaseMonth?.(updated.format(dateFormat));

                                if (forcedViewMode === 'month') {
                                    onSelect(updated.format(dateFormat));
                                    return;
                                }

                                setViewMode('day');
                            }}

                        >
                            {month.format('MMM')}
                        </S.GridCell>
                    );
                })}
            </S.GridContainer>
        );
    };

    const renderDaysGrid = () => (
        <>
            <S.Weekdays data-testid="calendar-weekdays">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'].map((d, i) => (
                    <S.Weekday key={`weekday-${i + 1}`} data-testid={`calendar-weekday-${i + 1}`}>
                        {d}
                    </S.Weekday>
                ))}
            </S.Weekdays>

            {weeks.map((week, wIdx) => (
                <S.Week key={`week-${wIdx + 1}`} data-testid={`calendar-week-${wIdx + 1}`}>
                    {week.map((day, dIdx) => {
                        const isOutsideMonth = !day.isSame(currentMonth, 'month');

                        return (
                            <S.Day
                                key={`day-${wIdx}-${dIdx + 1}`}
                                data-testid={`calendar-week-${wIdx}-day-${dIdx + 1}`}
                                $inRange={isInRange(day)}
                                $selected={isSelected(day)}
                                $disabled={isDisabled(day)}
                                $outsideMonth={isOutsideMonth}
                                onClick={() => handleDayClick(day)}
                            >
                                {day.date()}
                            </S.Day>
                        );
                    })}
                </S.Week>
            ))}
        </>
    );

    return (
        <S.CalendarWrapper>
            <S.Header data-testid="calendar-header">
                <S.NavButton $hide={!showLeftArrow} onClick={onPrevMonth} data-testid="calendar-prev">
                    <S.ArrowIcon $rotated />
                </S.NavButton>

                <S.LabelRow>
                    {viewMode === 'day' && (
                        <S.MonthLabel
                            onClick={() => {
                                if (forcedViewMode) return;
                                setViewMode((prev) => (prev === 'day' ? 'month' : prev === 'month' ? 'day' : 'month'));
                            }}
                            $clickable={allowChangeMonth && !forcedViewMode}
                            data-testid={`calendar-month-${currentMonth.month() + 1}`}
                        >
                            {currentMonth.format('MMMM')}
                        </S.MonthLabel>
                    )}
                    <S.YearLabel
                        onClick={() => {
                            if (forcedViewMode) return;
                            setViewMode((prev) => (prev === 'year' ? 'month' : 'year'));
                        }}
                        $clickable={allowChangeYear && !forcedViewMode}
                        data-testid={`calendar-year-${currentMonth.year()}`}
                    >

                        {currentMonth.year()}
                    </S.YearLabel>
                </S.LabelRow>
                <S.NavButton $hide={!showRightArrow} onClick={onNextMonth} data-testid="calendar-next">
                    <S.ArrowIcon />
                </S.NavButton>
            </S.Header>

            {viewMode === 'year' && renderYearGrid()}
            {viewMode === 'month' && renderMonthGrid()}
            {viewMode === 'day' && renderDaysGrid()}
        </S.CalendarWrapper >
    );

};
