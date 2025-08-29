import styled from "styled-components";

export const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.overlay};
  border: 1px solid ${({ theme }) => theme.colors.glowPrimary};
  border-radius: 8px;
  padding: 20px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  min-height: 320px;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const Header = styled.h3`
  font-size: 1.15rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: left;
`;

export const Empty = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-style: italic;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  padding: 20px;
`;

export const ChartWrapper = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
`;

export const YAxis = styled.svg`
  flex-shrink: 0;
  height: 100%;
`;

export const ChartScroll = styled.div`
  flex: 1;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 4px;
  }
`;

export const Chart = styled.svg`
  display: block;
  min-width: 100%;
`;

export const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
`;

export const LegendItem = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.25s ease;
  text-transform: capitalize;

  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme, active }) => (active ? theme.colors.overlay : "transparent")};
  border: 1px solid ${({ theme, active }) => (active ? theme.colors.primary : theme.colors.border)};

  &:hover {
    background: ${({ theme }) => theme.colors.glowPrimary};
    border-color: ${({ theme }) => theme.colors.primary};
    opacity: 0.9;
  }

  opacity: ${({ active }) => (active ? 1 : 0.6)};
`;

export const LegendDot = styled.span<{ color: string }>`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: ${({ color }) => color};
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.05);
`;

export const TooltipContainer = styled.div<{
  $top: number;
  $left: number;
  $width: number;
  $height: number;
}>`
  position: fixed;
  top: ${({ $top }) => $top}px;
  left: ${({ $left }) => $left}px;
  width: ${({ $width }) => $width}px;
  max-width: calc(100vw - 24px);
  min-height: ${({ $height }) => $height}px;

  background: ${({ theme }) => theme.colors.overlay};
  border: 1px solid ${({ theme }) => theme.colors.glowPrimary};
  border-radius: 8px;
  padding: 12px 16px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);

  z-index: 9999;
  pointer-events: none;

  @media (max-width: 480px) {
    padding: 10px 12px;
  }
`;

export const TooltipTitle = styled.span`
  display: block;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.95rem;
`;

export const TooltipContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TooltipRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 4px 0;
  gap: 8px;
`;

export const TooltipLabel = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: Capitalize;
`;

export const TooltipValue = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;
