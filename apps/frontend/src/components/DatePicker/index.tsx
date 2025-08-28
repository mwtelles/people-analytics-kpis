import { useEffect, useRef, useState, useCallback } from "react";
import * as S from "./style";
import { createPortal } from "react-dom";
import { CalendarPanel } from "./Components/CalendarPanel";
import { useShortcuts, MonthShortcut, YearShortcut } from "./Hooks/useShortcuts";
import { formatDate } from "./Utils/date";
import { AnimatePresence, motion } from "framer-motion";
import dayjs from "dayjs";

interface TriggerProps {
  height?: string;
  width?: string;
}

export type ShortcutType = MonthShortcut | YearShortcut;

export interface DatePickerProps {
  mode?: "single" | "range";
  variant?: "inline" | "dropdown";
  value?: string | [string, string];
  onChange?: (value: string | [string, string]) => void;
  defaultValue?: string | [string, string];
  shortcuts?: ShortcutType[] | null;
  dateFormat?: string;
  monthsToShow?: number;
  "data-testid"?: string;
  size?: { trigger?: TriggerProps };
  allowClear?: boolean;
  showIcon?: boolean;
  allowChangeYear?: boolean;
}

export const DatePicker = ({
  mode = "range",
  variant = "dropdown",
  onChange,
  value,
  defaultValue,
  shortcuts,
  dateFormat = "YYYY-MM-DD",
  monthsToShow,
  "data-testid": testId = "datepicker",
  size,
  allowClear = false,
  showIcon = true,
  allowChangeYear = true,
}: DatePickerProps) => {
  const isRange = mode === "range";
  const resolvedMonthsToShow = monthsToShow ?? (isRange ? 2 : 1);

  const [internalStart, setInternalStart] = useState<string | null>(
    Array.isArray(defaultValue) ? defaultValue[0] : defaultValue ?? null
  );
  const [internalEnd, setInternalEnd] = useState<string | null>(
    Array.isArray(defaultValue) ? defaultValue[1] : null
  );

  const [isOpen, setIsOpen] = useState(false);
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);

  const [panelMonths, setPanelMonths] = useState<string[]>(() => {
    const today = dayjs();
    return Array.from({ length: resolvedMonthsToShow }).map((_, i) =>
      today.subtract(resolvedMonthsToShow - 1 - i, "month").format(dateFormat)
    );
  });

  const [isSelectingEnd, setIsSelectingEnd] = useState(false);
  const [showIndicator, setShowIndicator] = useState(false);
  const [indicatorTarget, setIndicatorTarget] = useState<"start" | "end" | null>(null);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const { resolveShortcut, shortcutLabels } = useShortcuts("month");

  const defaultShortcuts: ShortcutType[] = [
    "thisMonth",
    "last3Months",
    "last6Months",
    "thisYear",
    "lastYear",
  ];

  const activeShortcuts = shortcuts ?? defaultShortcuts;

  useEffect(() => {
    if (defaultValue) {
      if (Array.isArray(defaultValue)) {
        setInternalStart(defaultValue[0]);
        setInternalEnd(defaultValue[1]);
        setPanelMonths((prev) => {
          const updated = [...prev];
          updated[0] = defaultValue[0];
          return updated;
        });
      } else {
        setInternalStart(defaultValue);
        setPanelMonths((prev) => {
          const updated = [...prev];
          updated[0] = defaultValue;
          return updated;
        });
      }
    }
  }, [defaultValue]);

useEffect(() => {
  if (value !== undefined) {
    if (Array.isArray(value)) {
      setInternalStart(value[0] ?? null);
      setInternalEnd(value[1] ?? null);
    } else {
      setInternalStart(value ?? null);
      setInternalEnd(null);
    }
  }
}, [value]);


  useEffect(() => {
    if (isOpen) {
      setIndicatorTarget("start");
      setShowIndicator(true);
      if (triggerRef.current) {
        setTriggerRect(triggerRef.current.getBoundingClientRect());
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        !triggerRef.current?.contains(e.target as Node) &&
        !popoverRef.current?.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setShowIndicator(false);
        setIndicatorTarget(null);
        setIsSelectingEnd(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const formatDisplayDate = (dateStr: string | null) =>
    dateStr ? dayjs(dateStr, ["YYYY-MM", "YYYY-MM-DD"]).format("MMM/YYYY") : "";

  const handleShortcut = useCallback(
    (shortcut: ShortcutType) => {
      const [start, end] = resolveShortcut(shortcut);
      setInternalStart(start);
      setInternalEnd(isRange ? end : null);
      setPanelMonths((prev) => {
        const updated = [...prev];
        updated[0] = start;
        return updated;
      });
      onChange?.(isRange ? [start, end] : start);
      setIsOpen(false);
    },
    [isRange, onChange, resolveShortcut]
  );

  const handleSelect = (start: string, end?: string) => {
    const formattedStart = dayjs(start).format("YYYY-MM");
    const formattedEnd = end ? dayjs(end).format("YYYY-MM") : undefined;

    if (!isRange) {
      setInternalStart(formattedStart);
      onChange?.(formattedStart);
      setIsOpen(false);
      return;
    }

    if (!isSelectingEnd) {
      setInternalStart(formattedStart);
      setInternalEnd(null);
      setIsSelectingEnd(true);
      setShowIndicator(true);
      setIndicatorTarget("end");
    } else {
      setInternalEnd(formattedEnd ?? null);
      if (internalStart) {
        onChange?.([internalStart, formattedEnd ?? formattedStart]);
      }
      setIsSelectingEnd(false);
      setIsOpen(false);
      setShowIndicator(false);
      setTimeout(() => setIndicatorTarget(null), 400);
    }
  };

  const handleChangePanelMonth = (panelIndex: number, newMonth: string) => {
    setPanelMonths((prev) => prev.map((m, idx) => (idx === panelIndex ? newMonth : m)));
  };

  const renderShortcuts = () => (
    <S.ShortcutContainer data-testid={`${testId}-shortcuts`}>
      {activeShortcuts.map((key) => (
        <S.ShortcutButton
          key={key}
          onClick={() => handleShortcut(key)}
          data-testid={`${testId}-shortcut-${key}`}
        >
          {shortcutLabels[key] ?? key}
        </S.ShortcutButton>
      ))}
    </S.ShortcutContainer>
  );

  const renderCalendars = () => (
    <S.CalendarGrid>
      {Array.from({ length: resolvedMonthsToShow }).map((_, idx) => (
        <CalendarPanel
          key={idx}
          mode={mode}
          startDate={internalStart}
          endDate={internalEnd}
          onSelect={handleSelect}
          dateFormat={dateFormat}
          baseMonth={panelMonths[idx]}
          onChangeBaseMonth={(newMonth) => handleChangePanelMonth(idx, newMonth)}
          showLeftArrow={idx === 0}
          showRightArrow={idx === resolvedMonthsToShow - 1}
          allowChangeYear={allowChangeYear}
        />
      ))}
    </S.CalendarGrid>
  );

  return (
    <S.Container data-testid={testId}>
      {variant === "dropdown" ? (
        <S.TriggerContainer>
          <S.Trigger
            $height={size?.trigger?.height}
            $width={size?.trigger?.width}
            onClick={() => setIsOpen((prev) => !prev)}
            ref={triggerRef}
            data-testid={`${testId}-trigger`}
          >
            {showIcon && <S.CalendarIcon />}
            {isRange ? (
              <S.RangeDisplay>
                <S.RangeItem>
                  {formatDisplayDate(internalStart) || "Data inicial"}
                  {showIndicator && indicatorTarget === "start" && (
                    <motion.div
                      layoutId="range-indicator"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                      <S.Indicator />
                    </motion.div>
                  )}
                </S.RangeItem>
                <S.RangeSeparator />
                <S.RangeItem>
                  {formatDisplayDate(internalEnd) || "Data final"}
                  <AnimatePresence>
                    {showIndicator && indicatorTarget === "end" && (
                      <motion.div
                        layoutId="range-indicator"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scaleX: 0.5 }}
                        style={{ originX: 0.5 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                      >
                        <S.Indicator />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </S.RangeItem>
              </S.RangeDisplay>
            ) : (
              <S.Item>{internalStart ? formatDisplayDate(internalStart) : "Selecionar data"}</S.Item>
            )}
            {allowClear && internalStart && (
              <S.ClearButton
                onClick={(e) => {
                  e.stopPropagation();
                  setInternalStart(null);
                  setInternalEnd(null);
                  onChange?.(isRange ? ["", ""] : "");
                }}
                data-testid={`${testId}-clear-button`}
              >
                <S.ClearIcon />
              </S.ClearButton>
            )}
          </S.Trigger>

          {isOpen &&
            triggerRect &&
            createPortal(
              <S.Popover
                ref={(node) => {
                  if (node && triggerRect) {
                    const popoverWidth = node.offsetWidth;
                    const popoverHeight = node.offsetHeight;
                    const maxLeft = window.innerWidth - popoverWidth - 8;
                    const adjustedLeft = Math.min(triggerRect.left, maxLeft);

                    const spaceBelow = window.innerHeight - triggerRect.bottom;
                    const spaceAbove = triggerRect.top;

                    let top = triggerRect.bottom + 4;
                    if (spaceBelow < popoverHeight && spaceAbove > popoverHeight) {
                      top = triggerRect.top - popoverHeight - 4;
                    }

                    node.style.left = `${adjustedLeft}px`;
                    node.style.top = `${top}px`;
                    node.style.position = "fixed";
                    node.style.zIndex = "1200";
                  }
                  (popoverRef as React.RefObject<HTMLDivElement | null>).current = node;
                }}
                data-testid={`${testId}-popover`}
              >
                {renderCalendars()}
                {activeShortcuts.length > 0 && renderShortcuts()}
              </S.Popover>,
              document.body
            )}
        </S.TriggerContainer>
      ) : (
        <>
          {renderCalendars()}
          {activeShortcuts.length > 0 && renderShortcuts()}
        </>
      )}
    </S.Container>
  );
};
