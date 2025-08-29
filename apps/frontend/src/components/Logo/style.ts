import { motion } from "framer-motion";
import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;

  svg {
    width: 50px;
    height: 50px;
    flex-shrink: 0;
  }
`;

export const InternPath = styled(motion.path)`
  stroke: ${({ theme }) => (theme.mode === "dark" ? "#fff" : theme.colors.primary)};
  transition: stroke 0.2s ease;

  &:hover {
    stroke: ${({ theme }) => (theme.mode === "dark" ? "#fff" : theme.colors.primary)};
  }
`;

export const ExternPath = styled(motion.path)`
  fill: ${({ theme }) => (theme.mode === "dark" ? "#fff" : theme.colors.primary)};
  transition: fill 0.2s ease;

  &:hover {
    fill: ${({ theme }) => (theme.mode === "dark" ? "#fff" : theme.colors.primary)};
  }
`;
