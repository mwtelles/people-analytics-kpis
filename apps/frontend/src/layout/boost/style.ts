import styled, { css } from "styled-components";
import { BookOpen02, Menu01, Moon01, Sun, X } from "@untitled-ui/icons-react";
import { GitHub } from "@mui/icons-material";

interface VariantProps {
  $variant?: "landing" | "app";
  $layout?: "centered" | "logoLeft";
}
interface HeaderProps {
  $variant?: "landing" | "app";
  $layout?: "centered" | "logoLeft";
}
interface ClusterProps {
  $variant?: "landing" | "app";
  $layout?: "centered" | "logoLeft";
}

export const Container = styled.div<VariantProps>`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  color: ${({ theme }) => theme.colors.text};
  overflow: hidden;

  ${({ $variant, theme }) =>
    $variant === "landing"
      ? `
    background: ${theme.colors.landingBackground};

    &::before {
      content: "";
      position: absolute;
      inset: 0;
      background-image: ${theme.colors.overlayGrid};
      background-size: 40px 40px;
      opacity: 0.25;
      z-index: 0;
    }

    &::after {
      content: "";
      position: absolute;
      top: -200px;
      left: 50%;
      transform: translateX(-50%);
      width: 1000px;
      height: 600px;
      background: ${theme.colors.glowPrimaryRadial};
      filter: blur(160px);
      z-index: 0;
    }
  `
      : `
    background: radial-gradient(circle at top left, ${theme.colors.background}, ${theme.colors.backgroundContent});
  `}

  > * {
    position: relative;
    z-index: 1;
  }
`;

export const Header = styled.header<HeaderProps>`
  width: 100%;
  padding: 1.25rem 2rem;
  z-index: 100;

  ${({ $layout }) =>
    $layout === "centered"
      ? css`
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
        `
      : css`
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}

  ${({ $variant, theme }) =>
    $variant === "landing"
      ? `
    position: absolute;
    top: 0;
    background: transparent;
  `
      : `
    position: sticky;
    top: 0;
    background: ${theme.colors.overlay};
    backdrop-filter: blur(12px);
    border-bottom: 1px solid ${theme.colors.borderSoft};
  `}
`;

export const LeftCluster = styled.div<ClusterProps>`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  ${({ $layout }) =>
    $layout === "centered" &&
    css`
      grid-column: 1;
      justify-self: start;
    `}
`;

export const CenterCluster = styled.div<ClusterProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  ${({ $layout }) =>
    $layout === "centered"
      ? css`
          grid-column: 2;
          justify-self: center;
        `
      : css`
          display: none;
        `}
`;

export const RightCluster = styled.div<ClusterProps>`
  display: flex;
  align-items: center;
  gap: 1.25rem;

  ${({ $layout }) =>
    $layout === "centered" &&
    css`
      grid-column: 3;
      justify-self: end;
    `}
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavItem = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  font-size: 0.95rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;

  transition: all 0.25s ease;

  svg {
    stroke-width: 2;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const ThemeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};

  display: flex;
  align-items: center;
  justify-content: center;

  transition:
    color 0.25s ease,
    transform 0.25s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: rotate(15deg);
  }
`;

export const MenuButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;

  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const MobileMenu = styled.div`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => `${theme.colors.background}E6`};
  backdrop-filter: blur(20px);
  z-index: 1500;

  display: flex;
  flex-direction: column;
  padding: 2rem;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(1.05);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export const CloseButton = styled.button`
  align-self: flex-end;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  transition: color 0.25s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.errorHover};
  }
`;

export const MobileNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  align-items: center;
`;

export const Content = styled.main<VariantProps>`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;

  ${({ $variant }) =>
    $variant === "landing"
      ? `
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 6rem 2rem 4rem;
  `
      : `
    padding: 2rem;
  `}
`;

export const ContentInner = styled.div<VariantProps>`
  flex: 1;
  width: 100%;

  ${({ $variant }) =>
    $variant === "app"
      ? `
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  `
      : ``}
`;

export const Footer = styled.footer<VariantProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  text-align: center;
  padding: 1rem;
  font-size: 0.85rem;
  height: 64px;
  color: ${({ theme }) => theme.colors.textSecondary};

  strong {
    color: ${({ theme }) => theme.colors.primary};
  }

  ${({ $variant, theme }) =>
    $variant === "landing"
      ? `
    background: transparent;
    border-top: 1px solid ${theme.colors.borderSubtle};
  `
      : `
    background: ${theme.colors.overlay};
    backdrop-filter: blur(12px);
    border-top: 1px solid ${theme.colors.borderSoft};
  `}
`;

export const DocIcon = styled(BookOpen02)``;
export const RepoIcon = styled(GitHub)``;
export const CloseIcon = styled(X)``;
export const LightModeIcon = styled(Sun)``;
export const DarkModeIcon = styled(Moon01)``;
export const MenuIcon = styled(Menu01)``;
