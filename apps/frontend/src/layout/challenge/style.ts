import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Nav = styled.nav`
  display: flex;
  gap: 1.25rem;
`;

export const NavItem = styled.a`
  display: flex;
  align-items: center;
  gap: 0.4rem;

  font-size: 0.95rem;
  font-weight: 500;
  color: white;
  text-decoration: none;

  transition:
    color 0.25s ease,
    transform 0.25s ease;

  svg {
    stroke-width: 2;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

export const Content = styled.main`
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  height: 100%;
`;

export const Footer = styled.footer`
  text-align: center;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.surface};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  strong {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
