import { useState, useRef, useLayoutEffect, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import * as S from "./style";
import { formatMonth, parseMonth } from "../../../utils/date";
import { generateTicks } from "../../../utils/generateTicks";
import React from "react";
import { KpiData } from "../../../hooks/useKpis";

type ChartSeries = Record<string, Point[]>;

interface Point {
  month: string;
  value: number;
}

interface Props {
  title: string;
  data?: KpiData | ChartSeries;
  isPercentage?: boolean;
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

const BASE_PALETTE = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#e377c2", "#17becf"];

const colorMap = new Map<string, string>();

function getColor(key: string, index: number): string {
  if (colorMap.has(key)) return colorMap.get(key)!;

  let color: string;
  if (index < BASE_PALETTE.length) {
    color = BASE_PALETTE[index];
  } else {
    const hue = (index * 47) % 360;
    color = `hsl(${hue}, 65%, 55%)`;
  }

  colorMap.set(key, color);
  return color;
}

export default function LineChart({
  title,
  data,
  isPercentage = false,
  containerRef: externalRef,
}: Props) {
  const internalRef = useRef<HTMLDivElement>(null);
  const containerRef = externalRef ?? internalRef;
  const svgRef = useRef<SVGSVGElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [dims, setDims] = useState({ width: 600, height: 360 });
  const [hidden, setHidden] = useState<string[]>([]);
  const [tooltip, setTooltip] = useState<{ month: string; x: number; y: number } | null>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      setDims({ width: entry.contentRect.width, height: 360 });
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [containerRef]);

  const series = useMemo(() => {
    if (!data) return [];

    if ("scope" in data) {
      return Object.entries(data)
        .filter(
          ([key, value]) =>
            key !== "scope" &&
            key !== "reports" &&
            Array.isArray(value) &&
            (value as Point[]).every((p) => p && typeof p.month === "string"),
        )
        .map(([key, value], idx) => ({
          id: key,
          color: getColor(key, idx),
          points: value as Point[],
        }));
    }

    return Object.entries(data as ChartSeries)
      .filter(([_, value]) => Array.isArray(value))
      .map(([key, value], idx) => ({
        id: key,
        color: getColor(key, idx),
        points: value as Point[],
      }));
  }, [data]);

  const domainX = useMemo(() => {
    const all = series.flatMap((s) => s.points.map((p) => p.month));
    const uniq = Array.from(new Set(all)).sort(
      (a, b) => parseMonth(a).getTime() - parseMonth(b).getTime(),
    );
    return uniq;
  }, [series]);

  const safeMax = useMemo(() => {
    const vals = [...series.flatMap((s) => s.points.map((p) => p.value)), 0];
    const mx = Math.max(...vals);
    return mx > 0 ? mx : 1;
  }, [series]);

  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const plotLeft = padding.left;
  const plotTop = padding.top;
  const plotBottom = dims.height - padding.bottom;
  const MIN_STEP = 80;
  const baseWidth = containerRef.current?.clientWidth ?? dims.width;

  const chartWidth = Math.max(
    baseWidth,
    (domainX.length - 1) * MIN_STEP + padding.left + padding.right,
  );

  const xScale = useCallback(
    (month: string) => {
      const i = domainX.indexOf(month);
      const step = (chartWidth - plotLeft - padding.right) / Math.max(1, domainX.length - 1);
      return plotLeft + i * step;
    },
    [domainX, chartWidth, plotLeft, padding.right],
  );

  const yScale = useCallback(
    (val: number) => {
      const h = plotBottom - plotTop;
      return plotTop + (1 - val / safeMax) * h;
    },
    [plotTop, plotBottom, safeMax],
  );

  const handleLeaveChart = () => setTooltip(null);

  const renderTooltip = () => {
    if (!tooltip || !containerRef.current || !scrollRef.current) return null;
    const containerRect = containerRef.current.getBoundingClientRect();
    const scrollLeft = scrollRef.current.scrollLeft;

    const tooltipWidth = 260;
    const tooltipHeight = 132;

    let left = containerRect.left + tooltip.x - scrollLeft + 12;
    let top = containerRect.top + tooltip.y - 40;

    if (left + tooltipWidth > window.innerWidth)
      left = containerRect.left + tooltip.x - scrollLeft - tooltipWidth - 12;
    if (top + tooltipHeight > window.innerHeight) top = window.innerHeight - tooltipHeight - 12;
    if (top < 0) top = 12;

    return createPortal(
      <S.TooltipContainer $top={top} $left={left} $width={tooltipWidth} $height={tooltipHeight}>
        <S.TooltipTitle>
          {formatMonth(tooltip.month, {
            locale: "pt-BR",
            format: "long",
            showYear: "numeric",
          }).replace(/^./, (char) => char.toUpperCase())}
        </S.TooltipTitle>
        <S.TooltipContent>
          {series.map((s) => {
            if (hidden.includes(s.id)) return null;
            const p = s.points.find((pt) => pt.month === tooltip.month);
            if (!p) return null;
            return (
              <S.TooltipRow key={s.id}>
                <S.LegendDot color={s.color} />
                <S.TooltipLabel>{s.id}</S.TooltipLabel>
                <S.TooltipValue>{isPercentage ? `${p.value.toFixed(1)}%` : p.value}</S.TooltipValue>
              </S.TooltipRow>
            );
          })}
        </S.TooltipContent>
      </S.TooltipContainer>,
      document.body,
    );
  };

  const SeriesPath = React.memo(
    ({
      color,
      points,
      isTotal = false,
      fillArea = false,
    }: {
      color: string;
      points: Point[];
      isTotal?: boolean;
      fillArea?: boolean;
    }) => {
      if (points.length === 0) return null;
      const pathD = points
        .map((p, i) => `${i === 0 ? "M" : "L"} ${xScale(p.month)},${yScale(p.value)}`)
        .join(" ");
      return (
        <g>
          {fillArea && (
            <motion.path
              d={`${pathD} L ${xScale(points[points.length - 1].month)},${yScale(
                0,
              )} L ${xScale(points[0].month)},${yScale(0)} Z`}
              fill={color}
              opacity={0.1}
              animate={{ opacity: 0.1 }}
              pointerEvents="none"
            />
          )}
          <motion.path
            d={pathD}
            fill="none"
            stroke={color}
            strokeWidth={isTotal ? 3 : 2}
            strokeDasharray={isTotal ? "6 4" : "none"}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </g>
      );
    },
  );

  const SeriesPoints = ({ color, points }: { color: string; points: Point[] }) => (
    <>
      {points.map((p, i) => {
        const cx = xScale(p.month);
        const cy = yScale(p.value);
        const isHighlighted = tooltip?.month === p.month;
        return (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r={isHighlighted ? 7 : 5}
            fill={color}
            stroke="#fff"
            strokeWidth={2}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setTooltip({ month: p.month, x: cx, y: cy })}
            onMouseLeave={handleLeaveChart}
          />
        );
      })}
    </>
  );

  return (
    <S.Wrapper ref={containerRef}>
      <S.Header>{title}</S.Header>

      {series.length === 0 ? (
        <S.Empty>Nenhum dado disponível.</S.Empty>
      ) : (
        <S.ChartWrapper>
          <S.ChartScroll ref={scrollRef}>
            <S.Chart
              ref={svgRef}
              width={chartWidth}
              height={dims.height}
              viewBox={`0 0 ${chartWidth} ${dims.height}`}
              onMouseLeave={handleLeaveChart}
            >
              {generateTicks(safeMax).map((val, i) => {
                const y = yScale(val);
                return (
                  <line
                    key={i}
                    x1={plotLeft}
                    y1={y}
                    x2={chartWidth - padding.right}
                    y2={y}
                    stroke="#e5e7eb"
                    strokeDasharray="4 4"
                  />
                );
              })}

              <line x1={plotLeft} y1={plotTop} x2={plotLeft} y2={plotBottom} stroke="#999" />

              {generateTicks(safeMax).map((val, i) => {
                const y = yScale(val);
                return (
                  <text
                    key={`label-${i}`}
                    x={plotLeft - 10}
                    y={y + 4}
                    textAnchor="end"
                    fontSize={12}
                    fill="#aaa"
                  >
                    {isPercentage ? `${val.toFixed(0)}%` : val.toFixed(0)}
                  </text>
                );
              })}

              <line
                x1={plotLeft}
                y1={plotBottom}
                x2={chartWidth - padding.right}
                y2={plotBottom}
                stroke="#999"
              />

              {domainX.map((m) => (
                <g key={m}>
                  <line
                    x1={xScale(m)}
                    y1={plotBottom}
                    x2={xScale(m)}
                    y2={plotBottom + 6}
                    stroke="#999"
                  />
                  <text
                    x={xScale(m)}
                    y={plotBottom + 20}
                    textAnchor="middle"
                    fontSize={12}
                    fill="#aaa"
                  >
                    {formatMonth(m, { locale: "pt-BR" })}
                  </text>
                </g>
              ))}

              {tooltip && (
                <line
                  x1={tooltip.x}
                  y1={plotTop}
                  x2={tooltip.x}
                  y2={plotBottom}
                  stroke="#999"
                  strokeDasharray="4 4"
                  strokeWidth={1}
                />
              )}

              {series.map(
                (s) =>
                  !hidden.includes(s.id) && (
                    <g key={s.id}>
                      <SeriesPath
                        color={s.color}
                        points={s.points}
                        isTotal={s.id === "total"}
                        fillArea={s.id !== "total"}
                      />
                      <SeriesPoints color={s.color} points={s.points} />
                    </g>
                  ),
              )}
            </S.Chart>
          </S.ChartScroll>
        </S.ChartWrapper>
      )}

      <S.Legend>
        {series
          .filter((s) => s.points.length > 0)
          .map((s) => (
            <S.LegendItem
              key={s.id}
              active={!hidden.includes(s.id)}
              onClick={() =>
                setHidden((prev) =>
                  prev.includes(s.id) ? prev.filter((h) => h !== s.id) : [...prev, s.id],
                )
              }
            >
              <S.LegendDot color={s.color} />
              {s.id}
            </S.LegendItem>
          ))}
      </S.Legend>

      {renderTooltip()}
    </S.Wrapper>
  );
}
