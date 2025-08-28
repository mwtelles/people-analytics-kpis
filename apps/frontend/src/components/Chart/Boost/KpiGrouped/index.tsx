import { useState, useRef, useLayoutEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import * as S from "./style";
import { formatMonth, parseMonth } from "../../../../utils/date";
import Series from "./Series";
import { generateTicks } from "../../../../utils/generateTicks";

interface Point {
  month: string;
  value: number;
}

interface Props {
  title: string;
  data?: { total?: Point[]; direct?: Point[]; indirect?: Point[] };
  isPercentage?: boolean;
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

const COLORS = {
  total: "#64748b",
  direct: "#16a34a",
  indirect: "#dc2626",
};

export default function KpiChartGroupedBoost({
  title,
  data,
  isPercentage,
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
      setDims({
        width: entry.contentRect.width,
        height: 360,
      });
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [containerRef.current]);

  const series = useMemo(
    () =>
      [
        { id: "Total", color: COLORS.total, points: data?.total ?? [] },
        { id: "Diretos", color: COLORS.direct, points: data?.direct ?? [] },
        { id: "Indiretos", color: COLORS.indirect, points: data?.indirect ?? [] },
      ].filter((s) => s.points.length > 0),
    [data]
  );

  const domainX: string[] = useMemo(() => {
    const all = series.flatMap((s) => s.points.map((p) => p.month));
    const uniq = Array.from(new Set(all));
    uniq.sort((a, b) => parseMonth(a).getTime() - parseMonth(b).getTime());
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

  const MAX_POINTS_RESPONSIVE = 24;
  const minStep = 60;

  let chartWidth = dims.width;
  if (domainX.length > MAX_POINTS_RESPONSIVE) {
    chartWidth = (domainX.length - 1) * minStep + padding.left + padding.right;
  }

  const xScale = (month: string) => {
    const i = domainX.indexOf(month);
    const step =
      (chartWidth - plotLeft - padding.right) / Math.max(1, domainX.length - 1);
    return plotLeft + i * step;
  };

  const yScale = (val: number) => {
    const h = plotBottom - plotTop;
    return plotTop + (1 - val / safeMax) * h;
  };

  const getTooltipYForMonth = (m: string) => {
    const visibleValues = series
      .filter((s) => !hidden.includes(s.id))
      .map((s) => s.points.find((p) => p.month === m)?.value)
      .filter((v): v is number => typeof v === "number");
    const topVal = visibleValues.length ? Math.max(...visibleValues) : 0;
    return yScale(topVal);
  };

  const handleLeaveChart = () => setTooltip(null);

  const renderTooltip = () => {
    if (!tooltip || !containerRef.current || !scrollRef.current) return null;

    const containerRect = containerRef.current.getBoundingClientRect();
    const scrollLeft = scrollRef.current.scrollLeft;

    const tooltipWidth = 260;
    const tooltipHeight = 132;

    let left = containerRect.left + tooltip.x - scrollLeft + 12;
    let top = containerRect.top + tooltip.y - 40;

    if (left + tooltipWidth > window.innerWidth) {
      left = containerRect.left + tooltip.x - scrollLeft - tooltipWidth - 12;
    }
    if (top + tooltipHeight > window.innerHeight) {
      top = window.innerHeight - tooltipHeight - 12;
    }
    if (top < 0) top = 12;

    return createPortal(
      <S.TooltipContainer $top={top} $left={left} $width={tooltipWidth} $height={tooltipHeight}>
        <S.TooltipTitle>
          {formatMonth(tooltip.month, { locale: "pt-BR", format: "long", showYear: "numeric" })}
        </S.TooltipTitle>
        <table style={{ marginTop: 6, width: "100%" }}>
          <tbody>
            {series.map((s) => {
              if (hidden.includes(s.id)) return null;
              const p = s.points.find((pt) => pt.month === tooltip.month);
              if (!p) return null;
              return (
                <tr key={s.id}>
                  <td>
                    <span
                      style={{
                        display: "inline-block",
                        width: 10,
                        height: 10,
                        background: s.color,
                        borderRadius: "50%",
                        marginRight: 6,
                      }}
                    />
                    {s.id}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {isPercentage ? `${p.value.toFixed(1)}%` : p.value}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </S.TooltipContainer>,
      document.body
    );
  };

  return (
    <S.Wrapper ref={containerRef} style={{ width: "100%", height: "100%", minHeight: 320 }}>
      <S.Header>{title}</S.Header>

      {series.length === 0 ? (
        <S.Empty>Nenhum dado disponível para exibir.</S.Empty>
      ) : (
        <S.ChartWrapper>
          <S.YAxis width={padding.left + 40} height={dims.height}>
            <line
              x1={padding.left + 30}
              y1={plotTop}
              x2={padding.left + 30}
              y2={plotBottom}
              stroke="#999"
              strokeWidth={1}
            />
            {generateTicks(safeMax).map((val, i) => {
              const y = yScale(val);
              return (
                <g key={i}>
                  <text
                    x={padding.left + 20}
                    y={y + 4}
                    textAnchor="end"
                    fontSize={12}
                    fill="#aaa"
                  >
                    {isPercentage ? `${val.toFixed(0)}%` : val.toFixed(0)}
                  </text>
                </g>
              );
            })}

            <text
              transform={`rotate(-90)`}
              x={-dims.height / 2}
              y={20}
              textAnchor="middle"
              fontSize={13}
              fill="#666"
            >
              {isPercentage ? "Turnover (%)" : "Qtd de Pessoas"}
            </text>
          </S.YAxis>

          <S.ChartScroll ref={scrollRef}>
            <S.Chart
              ref={svgRef}
              viewBox={`0 0 ${chartWidth} ${dims.height}`}
              width={chartWidth}
              height={dims.height}
              onMouseLeave={handleLeaveChart}
            >
              <line
                x1={plotLeft}
                y1={plotBottom}
                x2={chartWidth - padding.right}
                y2={plotBottom}
                stroke="#999"
                strokeWidth={1}
                style={{ pointerEvents: "none" }}
              />

              {domainX.map((m) => {
                const x = xScale(m);
                return (
                  <g key={m} style={{ pointerEvents: "none" }}>
                    <line x1={x} y1={plotBottom} x2={x} y2={plotBottom + 6} stroke="#999" />
                    <text
                      x={x}
                      y={plotBottom + 20}
                      textAnchor="middle"
                      fontSize={12}
                      fill="#aaa"
                    >
                      {formatMonth(m, { locale: "pt-BR" })}
                    </text>
                  </g>
                );
              })}

              <text
                x={(chartWidth - padding.left - padding.right) / 2 + padding.left}
                y={dims.height}
                textAnchor="middle"
                fontSize={13}
                fill="#666"
              >
                Mês
              </text>

              {[0, 0.25, 0.5, 0.75, 1].map((r, i) => {
                const val = safeMax * r;
                const y = yScale(val);
                return (
                  <line
                    key={i}
                    x1={plotLeft}
                    y1={y}
                    x2={chartWidth - padding.right}
                    y2={y}
                    stroke="#999"
                    strokeDasharray="4 4"
                    opacity={0.35}
                    style={{ pointerEvents: "none" }}
                  />
                );
              })}

              {tooltip && (
                <line
                  x1={tooltip.x}
                  y1={plotTop}
                  x2={tooltip.x}
                  y2={plotBottom}
                  stroke="#aaa"
                  strokeDasharray="4 4"
                  opacity={0.6}
                  style={{ pointerEvents: "none" }}
                />
              )}

              {series.map((s) =>
                hidden.includes(s.id) ? null : (
                  <Series
                    key={s.id}
                    color={s.color}
                    points={s.points}
                    width={chartWidth}
                    height={dims.height}
                    xDomain={domainX}
                    yDomain={[0, safeMax]}
                    isTotal={s.id === "Total"}
                    fillArea={s.id !== "Total"}
                    tooltipMonth={tooltip?.month}
                    onHoverPoint={(point, cx, cy) =>
                      setTooltip({ month: point.month, x: cx, y: cy })
                    }
                    onLeavePoint={() => setTooltip(null)}
                  />
                )
              )}

              <rect
                x={plotLeft}
                y={plotTop}
                width={chartWidth - padding.right - plotLeft}
                height={plotBottom - plotTop}
                fill="transparent"
                onMouseMove={(e) => {
                  if (!svgRef.current) return;

                  const rect = svgRef.current.getBoundingClientRect();
                  const cursorX = e.clientX - rect.left;

                  const step =
                    (chartWidth - plotLeft - padding.right) / (domainX.length - 1);
                  const idx = Math.round((cursorX - plotLeft) / step);
                  const clampedIdx = Math.max(0, Math.min(domainX.length - 1, idx));
                  const month = domainX[clampedIdx];

                  setTooltip({
                    month,
                    x: xScale(month),
                    y: getTooltipYForMonth(month),
                  });
                }}
                onMouseLeave={handleLeaveChart}
              />
            </S.Chart>
          </S.ChartScroll>
        </S.ChartWrapper>
      )}

      <S.Legend>
        {series.map((s) => (
          <S.LegendItem
            key={s.id}
            active={!hidden.includes(s.id)}
            onClick={() =>
              setHidden((prev) =>
                prev.includes(s.id) ? prev.filter((h) => h !== s.id) : [...prev, s.id]
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
