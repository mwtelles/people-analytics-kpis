import styled from "styled-components";
import { motion } from "framer-motion";

export const FloatingWrapper = styled.div`
  position: fixed;
  bottom: 4%;
  right: 1%;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FloatingButton = styled(motion.button)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.glowPrimary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  background: ${({ theme }) => theme.colors.primary};
  backdrop-filter: blur(16px) saturate(140%);
  -webkit-backdrop-filter: blur(16px) saturate(140%);

  color: ${({ theme }) => theme.colors.textSecondary};

  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 20px rgba(0, 180, 216, 0.28);
  }
`;

export const Faders = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: -1;
`;

export const faderStyle: React.CSSProperties = {
  position: "absolute",
  width: 90,
  height: 90,
  borderRadius: "50%",
  background: "radial-gradient(circle, rgba(0,119,182,0.25) 0%, transparent 100%)",
  filter: "blur(40px)",
};

export const Text = styled.span`
  font-size: 25px;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.secondary};
`;
