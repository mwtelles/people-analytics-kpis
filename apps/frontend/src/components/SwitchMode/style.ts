import styled from "styled-components";
import { motion } from "framer-motion";

interface ITrackProps {
  $checked: boolean;
}

interface IInnerTextProps {
  $checked: boolean;
}

export const SwitchWrapper = styled.div`
  display: inline-flex;
  align-items: center;
`;

export const Thumb = styled(motion.div)`
  background: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 4px;
  will-change: transform;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
`;

export const Track = styled.div<ITrackProps>`
  background: ${({ theme, $checked }) => $checked ? theme.colors.glowPrimary : theme.colors.overlay};
  border: 1px solid ${({ theme, $checked }) => $checked ? theme.colors.glowPrimary : theme.colors.border};
  height: 30px;
  border-radius: 100px;
  padding: 0 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  transition: background 0.2s ease-in-out;
  width: auto;
  min-width: 80px;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;



export const InnerText = styled.span<IInnerTextProps>`
  flex: 1;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: white;
  pointer-events: none;
  user-select: none;
  text-align: center;
  padding: 0 18px;
`;
