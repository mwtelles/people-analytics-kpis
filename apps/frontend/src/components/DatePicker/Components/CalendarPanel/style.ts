import { ChevronRight } from "@untitled-ui/icons-react";
import styled, { css } from "styled-components";

export const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 280px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const LabelRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const MonthLabel = styled.span<{ $clickable?: boolean }>`
  text-transform: capitalize;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  cursor: ${({ $clickable }) => ($clickable ? "pointer" : "default")};

  ${({ $clickable }) =>
    $clickable &&
    css`
      &:hover {
        color: ${({ theme }) => theme.colors.primary};
      }
    `}
`;

export const YearLabel = styled.span<{ $clickable?: boolean }>`
  text-transform: capitalize;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};

  cursor: ${({ $clickable }) => ($clickable ? "pointer" : "default")};

  ${({ $clickable }) =>
    $clickable &&
    css`
      &:hover {
        color: ${({ theme }) => theme.colors.primary};
      }
    `}
`;

export const NavButton = styled.button<{ $hide?: boolean }>`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: all 0.4s;
  height: 32px;

  &:hover {

    svg {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  ${({ $hide }) =>
    $hide &&
    css`
      color: transparent;
      pointer-events: none;

      svg {
        visibility: hidden;
      }
    `}
`;

export const Weekdays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

export const Weekday = styled.div`
  padding: 4px 0;
`;

export const Week = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

interface DayProps {
  $inRange: boolean;
  $selected: boolean;
  $disabled: boolean;
  $outsideMonth: boolean;
}

export const Day = styled.button<DayProps>`
  padding: 6px;
  border: none;
  background: none;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  transition: background 0.2s;

  ${({ $inRange }) =>
    $inRange &&
    css`
      background-color: red;
      color: ${({ theme }) => theme.colors.text};
    `}

  ${({ $outsideMonth }) =>
    $outsideMonth &&
    css`
      color: ${({ theme }) => theme.colors.text};
    `}

  ${({ $selected, theme }) =>
    $selected &&
    css`
      background-color: ${theme.colors.primary};
      color: blue;
    `}

    ${({ $selected, $outsideMonth, theme }) =>
    $selected &&
    !$outsideMonth &&
    css`
      background-color: ${theme.colors.primary};
      color: ${theme.colors.primary};
    `}

${({ $selected, $outsideMonth, theme }) =>
    $selected &&
    $outsideMonth &&
    css`
      background-color: ${theme.colors.primary};
      color: ${({ theme }) => theme.colors.text};
      opacity: 0.6;
    `}


  ${({ $disabled }) =>
    $disabled &&
    css`
      color: ${({ theme }) => theme.colors.text};
      pointer-events: none;
    `}

  &:hover {
    ${({ $disabled, $selected }) =>
      !$disabled &&
      !$selected &&
      css`
        background-color: ${({ theme }) => theme.colors.text};
      `}
  }
`;

export const ArrowIcon = styled(ChevronRight)<{ $rotated?: boolean }>`
  width: 18px;
  height: 18px;
  color: ${({ theme }) => theme.colors.text};
  transition: transform 0.2s;

  ${({ $rotated }) =>
    $rotated &&
    css`
      transform: rotate(180deg);
    `}
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 16px;
`;

export const GridCell = styled.div`
  text-align: center;
  padding: 4px 12px;
  border-radius: 6px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.overlayStrong};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.glowPrimary};

  &:hover {
    background-color: ${({ theme }) => theme.colors.glowSecondary};
    color: ${({ theme }) => theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.glowSecondary};
  }
`;
