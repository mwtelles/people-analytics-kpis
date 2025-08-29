import { FC, HTMLAttributes, useMemo } from "react";
import { useTheme } from "styled-components";
import { motion } from "framer-motion";
import * as S from "./style";

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: number | string;
  thickness?: number;
  speed?: "slow" | "normal" | "fast" | number;
  direction?: "clockwise" | "counterclockwise";
  strokeLinecap?: "round" | "butt" | "square";
  ariaLabel?: string;
}

export const Spinner: FC<SpinnerProps> = ({
  size = 30,
  thickness = 4,
  speed = "normal",
  direction = "clockwise",
  strokeLinecap = "round",
  ariaLabel = "Carregando...",
  ...props
}) => {
  const theme = useTheme();

  const { primary, secondary, background, sizeValue, duration } = useMemo(() => {
    const s = typeof size === "number" ? `${size}px` : size || "30px";

    const speedMap: Record<string, number> = {
      slow: 2,
      normal: 1.3,
      fast: 0.6,
    };

    return {
      sizeValue: s,
      duration: typeof speed === "number" ? speed : (speedMap[speed] ?? 1.2),
      primary: theme.colors.primary,
      secondary: theme.colors.primaryHover,
      background: theme.colors.background,
    };
  }, [size, speed, theme]);

  return (
    <S.Wrapper aria-live="polite" {...props}>
      <motion.svg
        width={sizeValue}
        height={sizeValue}
        viewBox="0 0 72 72"
        aria-label={ariaLabel}
        animate={{ rotate: direction === "clockwise" ? 360 : -360 }}
        transition={{ repeat: Infinity, ease: "linear", duration }}
      >
        <title>{ariaLabel}</title>
        <defs>
          <linearGradient id="spinner-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={primary} stopOpacity="1" />
            <stop offset="60%" stopColor={secondary} stopOpacity="0.7" />
            <stop offset="100%" stopColor={background} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.circle
          cx="36"
          cy="36"
          r="28"
          fill="none"
          stroke="url(#spinner-gradient)"
          strokeWidth={thickness}
          strokeLinecap={strokeLinecap}
          strokeDasharray="120 100"
          animate={{ strokeDasharray: ["120 100", "90 130", "120 100"] }}
          transition={{ repeat: Infinity, duration, ease: "easeInOut" }}
        />
      </motion.svg>
    </S.Wrapper>
  );
};

export default Spinner;
