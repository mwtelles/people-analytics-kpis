import { useMemo } from "react";
import { motion } from "framer-motion";

interface Point {
  month: string;
  value: number;
}

interface Props {
  color: string;
  points: Point[];
  width: number;
  height: number;
  xDomain: string[];
  yDomain: [number, number];
  onHoverPoint?: (point: Point, cx: number, cy: number) => void;
  onLeavePoint?: () => void;
  isTotal?: boolean;
  fillArea?: boolean;
  tooltipMonth?: string;
}

export default function Series({
  color,
  points,
  width,
  height,
  xDomain,
  yDomain,
  onHoverPoint,
  onLeavePoint,
  isTotal = false,
  fillArea = false,
  tooltipMonth,
}: Props) {
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };

  const xScale = (month: string) => {
    const i = xDomain.indexOf(month);
    const step =
      (width - padding.left - padding.right) /
      Math.max(1, xDomain.length - 1);
    return padding.left + i * step;
  };

  const [min, max] = yDomain;
  const yScale = (val: number) => {
    const h = height - padding.top - padding.bottom;
    return padding.top + (1 - (val - min) / (max - min)) * h;
  };

  const pathD = useMemo(() => {
    if (points.length === 0) return "";
    return points
      .map((p, i) => {
        const x = xScale(p.month);
        const y = yScale(p.value);
        return `${i === 0 ? "M" : "L"} ${x},${y}`;
      })
      .join(" ");
  }, [points, xDomain, yDomain, width, height]);

  return (
    <g>
      {fillArea && (
        <motion.path
          d={`${pathD} L ${xScale(
            points[points.length - 1].month
          )},${yScale(0)} L ${xScale(points[0].month)},${yScale(0)} Z`}
          fill={color}
          opacity={0.1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
        />
      )}

      <motion.path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth={isTotal ? 3 : 2}
        strokeDasharray={isTotal ? "6 4" : "none"}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      {points.map((p, i) => {
        const cx = xScale(p.month);
        const cy = yScale(p.value);
        const isHighlighted = tooltipMonth === p.month;
        return (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r={isHighlighted ? 7 : 5}
            fill={color}
            stroke="#fff"
            strokeWidth={2}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.05 }}
            onMouseEnter={() => onHoverPoint?.(p, cx, cy)}
            onMouseLeave={onLeavePoint}
          />
        );
      })}
    </g>
  );
}
