import { useEffect, useMemo, useRef, useState } from 'react';
import * as S from './style';
import { createPortal } from 'react-dom';
import { CalendarPanel } from './Components/CalendarPanel';
import { useShortcuts } from './Hooks/useShortcuts';
import { formatDate } from './Utils/date';
import { AnimatePresence, motion } from 'framer-motion';
import dayjs from 'dayjs';

interface TriggerProps {
    height?: string;
    width?: string;
}

export type ShortcutType = 'today' | 'week' | 'month' | 7 | 15 | 30 | 31 | 60;

export interface DatePickerProps {
    mode?: 'single' | 'range';
    variant?: 'inline' | 'dropdown';
    value?: string | [string, string];
    onChange?: (value: string | [string, string]) => void;
    defaultValue?: string | [string, string];
    limitRangeDays?: number;
    shortcuts?: ShortcutType[] | null;
    dateFormat?: string;
    monthsToShow?: number;
    'data-testid'?: string;
    size?: {
        trigger?: TriggerProps;
    }
    allowClear?: boolean;
    showIcon?: boolean;
    allowChangeMonth?: boolean;
    allowChangeYear?: boolean;
    selectionLevel?: 'day' | 'month' | 'year';
    displayFormat?: string;
}

export const DatePicker = ({
    mode = 'range',
    variant = 'dropdown',
    value,
    onChange,
    defaultValue,
    limitRangeDays = 31,
    shortcuts = ['today', 'week', 'month', 7, 15, 30],
    dateFormat = 'YYYY-MM-DD',
    monthsToShow,
    'data-testid': testId = 'datepicker',
    size,
    allowClear = false,
    showIcon = true,
    allowChangeMonth = true,
    allowChangeYear = true,
    selectionLevel,
    displayFormat = 'DD/MM/YYYY',
}: DatePickerProps) => {
    const isRange = mode === 'range';
    const resolvedMonthsToShow = monthsToShow ?? (isRange ? 2 : 1);
    const [internalStart, setInternalStart] = useState<string | null>(null);
    const [internalEnd, setInternalEnd] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);
    const [baseMonth, setBaseMonth] = useState<string>(() => formatDate(new Date(), dateFormat));
    const [isSelectingEnd, setIsSelectingEnd] = useState(false);
    const [showIndicator, setShowIndicator] = useState(false);
    const [indicatorTarget, setIndicatorTarget] = useState<'start' | 'end' | null>(null);
    const [baseOffset, setBaseOffset] = useState(0);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);
    const { resolveShortcut, shortcutLabels, filterShortcutsByLimit } = useShortcuts();

    const today = useMemo(() => formatDate(new Date(), dateFormat), [dateFormat]);

    useEffect(() => {
        if (defaultValue) {
            if (Array.isArray(defaultValue)) {
                setInternalStart(defaultValue[0]);
                setInternalEnd(defaultValue[1]);
                setBaseMonth(defaultValue[0]);
            } else {
                setInternalStart(defaultValue);
                setBaseMonth(defaultValue);
            }
        }
    }, [defaultValue]);

    useEffect(() => {
        if (isOpen) {
            setIndicatorTarget('start');
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

        window.addEventListener('mousedown', handleClickOutside);
        return () => window.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const getPortalContainer = () => {
        let el = triggerRef.current as HTMLElement | null;
        while (el?.parentElement) {
            const parent = el.parentElement;
            if (parent.classList.contains('ant-modal-content') || parent.getAttribute('role') === 'dialog') {
                return parent;
            }
            el = parent;
        }
        return document.body;
    };



    const formatDisplayDate = (dateStr: string | null) => {
        if (!dateStr) return '';
        return dayjs(dateStr, dateFormat).format(displayFormat);
    };


    const handleShortcut = (shortcut: ShortcutType) => {
        const [start, end] = resolveShortcut(shortcut, limitRangeDays);

        if (isRange && end) {
            const diff = dayjs(end).diff(dayjs(start), 'day') + 1;
            if (diff > limitRangeDays) return;
        }

        setInternalStart(start);
        setInternalEnd(isRange ? end : null);
        setBaseMonth(start);
        onChange?.(isRange ? [start, end] : start);
        setIsOpen(false);
    };

    const handleNavigate = (direction: 'prev' | 'next') => {
        const diff = selectionLevel === 'month' ? 12 : selectionLevel === 'year' ? 120 : 1;
        const delta = direction === 'prev' ? -diff : diff;
        setBaseOffset((prev) => prev + delta);
    };


    const handleSelect = (start: string, end?: string) => {
        const formatForLevel = (dateStr: string) => {
            const date = dayjs(dateStr);
            switch (selectionLevel) {
                case 'month':
                    return date.format('YYYY-MM');
                case 'year':
                    return date.format('YYYY');
                default:
                    return date.format(dateFormat);
            }
        };

        const formattedStart = formatForLevel(start);
        const formattedEnd = end ? formatForLevel(end) : undefined;

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
            setIndicatorTarget('end');
        } else {
            setInternalEnd(formattedEnd ?? null);
            if (internalStart !== null) {
                onChange?.([internalStart, formattedEnd ?? formattedStart]);
            }
            setIsSelectingEnd(false);
            setIsOpen(false);
            setShowIndicator(false);

            setTimeout(() => {
                setIndicatorTarget(null);
                setIsOpen(false);
            }, 400);
        }
    };


    const handleChangeBaseMonth = (newMonth: string) => {
        setBaseMonth(newMonth);
        setBaseOffset(0);
    };


    const validShortcuts = useMemo(
        () => filterShortcutsByLimit(shortcuts ?? [], limitRangeDays),
        [shortcuts, limitRangeDays, filterShortcutsByLimit]
    );

    const renderShortcuts = () => (
        <S.ShortcutContainer data-testid={`${testId}-shortcuts`}>
            {validShortcuts.map((key) => (
                <S.ShortcutButton
                    key={key}
                    onClick={() => handleShortcut(key)}
                    data-testid={`${testId}-shortcut-${key}`}
                >
                    {shortcutLabels[key]}
                </S.ShortcutButton>
            ))}
        </S.ShortcutContainer>
    );

    const renderCalendars = () => (
        <>
            <S.CalendarGrid>
                {Array.from({ length: resolvedMonthsToShow }).map((_, idx) => (
                    <CalendarPanel
                        key={`calendar-${idx + 1}`}
                        mode={mode}
                        startDate={internalStart}
                        endDate={internalEnd}
                        onSelect={handleSelect}
                        limitRangeDays={limitRangeDays}
                        dateFormat={dateFormat}
                        today={today}
                        baseMonth={baseMonth}
                        offset={baseOffset + idx}
                        onPrevMonth={() => handleNavigate('prev')}
                        onNextMonth={() => handleNavigate('next')}
                        onChangeBaseMonth={handleChangeBaseMonth}
                        showLeftArrow={idx === 0}
                        showRightArrow={idx === resolvedMonthsToShow - 1}
                        allowChangeMonth={allowChangeMonth}
                        allowChangeYear={allowChangeYear}
                        forcedViewMode={selectionLevel}
                    />
                ))}
            </S.CalendarGrid>
        </>
    );

    return (
        <S.Container data-testid={testId}>
            {variant === 'dropdown' ? (
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
                                    {formatDisplayDate(internalStart) || 'Data inicial'}
                                    {showIndicator && indicatorTarget === 'start' && (
                                        <motion.div
                                            layoutId="range-indicator"
                                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                        >
                                            <S.Indicator />
                                        </motion.div>
                                    )}
                                </S.RangeItem>
                                <S.RangeSeparator />
                                <S.RangeItem>
                                    {formatDisplayDate(internalEnd) || 'Data final'}
                                    <AnimatePresence>
                                        {showIndicator && indicatorTarget === 'end' && (
                                            <motion.div
                                                layoutId="range-indicator"
                                                initial={{ opacity: 0, y: -4 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scaleX: 0.5 }}
                                                style={{ originX: 0.5 }}
                                                transition={{ duration: 0.4, ease: 'easeInOut' }}
                                            >
                                                <S.Indicator />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </S.RangeItem>
                            </S.RangeDisplay>

                        ) : (
                            <S.Item>
                                {internalStart ?? 'Selecionar data'}
                            </S.Item>
                        )}
                        {allowClear && internalStart && (
                            <S.ClearButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setInternalStart(null);
                                    setInternalEnd(null);
                                    onChange?.(isRange ? ['', ''] : '');
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

                                    if (popoverRef) {
                                        (popoverRef as React.RefObject<HTMLDivElement | null>).current = node;
                                    }
                                }}

                                data-testid={`${testId}-popover`}
                            >

                                {renderCalendars()}
                                {validShortcuts.length > 0 && renderShortcuts()}
                            </S.Popover>,
                            getPortalContainer(),
                        )}
                </S.TriggerContainer>
            ) : (
                <>
                    {renderCalendars()}
                    {validShortcuts.length > 0 && renderShortcuts()}
                </>
            )}
        </S.Container>
    );
};
