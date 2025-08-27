import styled, { keyframes, DefaultTheme } from "styled-components";
import { BookOpen02 } from "@untitled-ui/icons-react";
import { GitHub } from "@mui/icons-material";

interface VariantProps {
  $variant?: "landing" | "app";
}

export const Container = styled.div<VariantProps>`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  color: ${({ theme }) => theme.colors.text};
  overflow: hidden;

  ${({ $variant }) =>
    $variant === "landing"
      ? `
    background: radial-gradient(circle at top, #0a0f1c, #05070d);

    &::before {
      content: "";
      position: absolute;
      inset: 0;
      background-image: linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
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
      background: radial-gradient(circle, rgba(0,180,216,0.25), transparent 70%);
      filter: blur(160px);
      z-index: 0;
    }

    &::marker {
      content: "";
      position: absolute;
      bottom: -200px;
      right: -200px;
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, #0077b644 0%, transparent 70%);
      filter: blur(140px);
      z-index: 0;
      animation: float 14s ease-in-out infinite alternate;
    }
  `
      : `
    background: ${({ theme }: { theme: DefaultTheme }) =>
      `radial-gradient(circle at top left, ${theme.colors.background}, ${theme.colors.backgroundContent})`};
  `}

  > * {
    position: relative;
    z-index: 1;
  }

  @keyframes float {
    from { transform: translateY(0) translateX(0); }
    to   { transform: translateY(-40px) translateX(30px); }
  }
`;



export const Header = styled.header<VariantProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 2rem;
  width: 100%;
  z-index: 100;

  ${({ $variant }) =>
    $variant === "landing"
      ? `
    position: absolute;
    top: 0;
    background: transparent;
  `
      : `
    position: sticky;
    top: 0;
    background: rgba(0,0,0,0.6);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255,255,255,0.1);
  `}
`;

export const Nav = styled.nav`
  display: flex;
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

  transition: color 0.25s ease, transform 0.25s ease;

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
      : `
    max-width: 800px;
  `}
`;

export const Footer = styled.footer<VariantProps>`
  text-align: center;
  padding: 1rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSecondary};

  strong {
    color: ${({ theme }) => theme.colors.primary};
  }

  ${({ $variant }) =>
    $variant === "landing"
      ? `
    background: transparent;
    border-top: 1px solid rgba(255,255,255,0.05);
  `
      : `
    background: rgba(0,0,0,0.6);
    backdrop-filter: blur(12px);
    border-top: 1px solid rgba(255,255,255,0.1);
  `}
`;

export const DocIcon = styled(BookOpen02)``;
export const RepoIcon = styled(GitHub)``;
export const LogoWrapper = styled.div``;
