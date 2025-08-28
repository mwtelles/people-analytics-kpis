import styled from 'styled-components';
import { motion } from 'framer-motion';
import Calendar from '@untitled-ui/icons-react/build/cjs/Calendar';
import X from '@untitled-ui/icons-react/build/cjs/X';

interface TriggerProps {
  $height?: string;
  $width?: string;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: fit-content;
  position: relative;
  font-family: inherit;
  width: 100%;
`;

export const ShortcutContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 8px;
  border-top: 1px solid ${({ theme }) => theme.colors.glowPrimary};
  padding: 8px 12px;
`;

export const ShortcutButton = styled.button`
  background: ${({ theme }) => theme.colors.overlayVeryStrong};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.glowSecondary};
    color: ${({ theme }) => theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.glowSecondary};
  }

  &:active {
    background: ${({ theme }) => theme.colors.text};
  }
`;

export const Dropdown = styled.div`
  position: relative;
  width: 100%;
`;

export const TriggerContainer = styled.div`
`;

export const Trigger = styled.button<TriggerProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: ${({ $width }) => $width || '100%'};
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.glowPrimary};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.overlay};
  text-align: left;
  cursor: pointer;
  height: ${({ $height }) => $height || '40px'};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Popover = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: absolute;
  top: calc(100% + 4px);
  z-index: 100;
  background-color: ${({ theme }) => theme.colors.overlayVeryStrong};
  border: 1px solid ${({ theme }) => theme.colors.glowPrimary};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  min-width: 280px;
`;

export const CalendarGrid = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: nowrap;
  padding: 8px 12px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const RangeDisplay = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const RangeItem = styled.div`
  position: relative;
  flex: 1;
  text-align: center;
  font-weight: 500;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Item = styled.div`
  font-weight: 500;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
`;

export const RangeSeparator = styled.div`
  width: 1px;
  height: 24px;
  background-color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Indicator = styled(motion.div)`
  position: absolute;
  bottom: -7px;
  left: 20px;
  height: 2px;
  width: 80px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 999px;
`;

export const CalendarIcon = styled(Calendar)`
  width: 20px;
  height: 20px;
  color: ${({ theme }) => theme.colors.text};
`;

export const ClearButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  border-radius: 100%;
  outline: none;
  cursor: pointer;
  height: 26px;
  width: 26px;
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.4s;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: black;
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const ClearIcon = styled(X)`
`;