import { ChevronDown } from "@untitled-ui/icons-react";
import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  width: 200px;

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const Trigger = styled.div`
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.glowPrimary};
  background: ${({ theme }) => theme.colors.overlay};
  border-radius: 8px;
  padding: 0 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};

  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Dropdown = styled.ul`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;

  background: ${({ theme }) => theme.colors.overlayStrong};
  border: 1px solid ${({ theme }) => theme.colors.glowPrimary};
  border-radius: 8px;
  z-index: 1000;

  list-style: none;
  margin: 0;

  :first-child {
    border-radius: 8px 8px 0 0;
  }

  :last-child {
    border-radius: 0 0 8px 8px;
  }
`;

export const Option = styled.li<{ $active?: boolean }>`
  padding: 8px 12px;
  cursor: pointer;
  text-align: left;
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.textSecondary)};

  &:hover {
    background: ${({ theme }) => theme.colors.overlayInput};
  }
`;

export const TriggerIcon = styled(ChevronDown)<{ $open: boolean }>`
  width: 16px;
  height: 16px;
  color: ${({ theme }) => theme.colors.textSecondary};

  transform: ${({ $open }) => ($open ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.2s ease;
`;
