import React, { useState } from "react";
import * as S from "./style";
import { GithubLogo, BookOpen, List, X, Sun, Moon } from "phosphor-react";
import Logo from "../../components/Logo";
import { useThemeMode } from "../../contexts/ThemeMode";
import { useNavigate } from "@tanstack/react-router";

interface Props {
  children: React.ReactNode;
  variant?: "landing" | "app";
}

const API_DOCS_URL =
  import.meta.env.VITE_API_DOCS_URL || "http://localhost:3000/api/docs";
const GITHUB_REPO =
  "https://github.com/mwtelles/people-analytics-kpis";

export default function BoostLayout({
  children,
  variant = "landing",
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { mode, toggleMode } = useThemeMode();
  const navigate = useNavigate();

  return (
    <S.Container $variant={variant}>
      <S.Header $variant={variant}>
        <S.LogoWrapper onClick={() => navigate({ to: "/" })}>
          <Logo />
        </S.LogoWrapper>

        <S.Nav>
          <S.NavItem
            href={API_DOCS_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <S.DocIcon />
            API Docs
          </S.NavItem>
          <S.NavItem
            href={GITHUB_REPO}
            target="_blank"
            rel="noopener noreferrer"
          >
            <S.RepoIcon />
            Repositório
          </S.NavItem>
        </S.Nav>

        <S.Actions>
          <S.ThemeButton onClick={toggleMode} aria-label="Toggle theme">
            {mode === "light" ? (
              <Moon size={22} weight="duotone" />
            ) : (
              <Sun size={22} weight="duotone" />
            )}
          </S.ThemeButton>

          <S.MenuButton onClick={() => setMenuOpen(true)}>
            <List size={28} />
          </S.MenuButton>
        </S.Actions>
      </S.Header>

      {menuOpen && (
        <S.MobileMenu>
          <S.CloseButton onClick={() => setMenuOpen(false)}>
            <X size={28} />
          </S.CloseButton>

          <S.MobileNav>
            <S.NavItem
              href={API_DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              <BookOpen size={22} /> API Docs
            </S.NavItem>
            <S.NavItem
              href={GITHUB_REPO}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              <GithubLogo size={22} /> Repositório
            </S.NavItem>
          </S.MobileNav>
        </S.MobileMenu>
      )}

      <S.Content $variant={variant}>
        <S.ContentInner $variant={variant}>{children}</S.ContentInner>
      </S.Content>

      <S.Footer $variant={variant}>
        © {new Date().getFullYear()} People Analytics KPIs — Desenvolvido por{" "}
        <strong>Matheus Telles</strong>
      </S.Footer>
    </S.Container>
  );
}
