import React, { useState } from "react";
import * as S from "./style";
import Logo from "../components/Logo";
import { useThemeMode } from "../contexts/ThemeMode";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  variant?: "landing" | "app";
  headerLayout?: "centered" | "logoLeft";
}

const API_DOCS_URL = import.meta.env.VITE_API_DOCS_URL || "http://localhost:3000/api/docs";
const GITHUB_REPO = "https://github.com/mwtelles/people-analytics-kpis";

export default function BoostLayout({
  children,
  variant = "landing",
  headerLayout = "centered",
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { mode, toggleMode } = useThemeMode();
  const navigate = useNavigate();

  return (
    <S.Container $variant={variant}>
      <S.Header $variant={variant} $layout={headerLayout}>
        {headerLayout === "centered" ? (
          <>
            <S.LeftCluster $layout={headerLayout}>
              <S.Nav>
                <S.NavItem data-tour="repo-link" href={GITHUB_REPO} target="_blank" rel="noopener noreferrer">
                  <S.RepoIcon />
                  Repositório
                </S.NavItem>
                <S.NavItem data-tour="docs-link" href={API_DOCS_URL} target="_blank" rel="noopener noreferrer">
                  <S.DocIcon />
                  API Docs
                </S.NavItem>
              </S.Nav>
            </S.LeftCluster>

            <S.CenterCluster $layout={headerLayout} onClick={() => navigate({ to: "/" })}>
              <Logo />
            </S.CenterCluster>

            <S.RightCluster $layout={headerLayout}>
              <S.Actions>
                <S.ThemeButton onClick={toggleMode} aria-label="Toggle theme">
                  <motion.div
                    key={mode}
                    initial={{ rotate: 0, scale: 0.8, opacity: 0 }}
                    animate={{ rotate: 360, scale: 1, opacity: 1 }}
                    exit={{ rotate: -180, scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    {mode === "light" ? <S.DarkModeIcon /> : <S.LightModeIcon />}
                  </motion.div>
                </S.ThemeButton>
                <S.MenuButton onClick={() => setMenuOpen(true)}>
                  <S.MenuIcon />
                </S.MenuButton>
              </S.Actions>
            </S.RightCluster>
          </>
        ) : (
          <>
            <S.LeftCluster $layout={headerLayout} onClick={() => navigate({ to: "/" })}>
              <Logo />
            </S.LeftCluster>

            <S.RightCluster $layout={headerLayout}>
              <S.Nav>
                <S.NavItem data-tour="repo-link" href={GITHUB_REPO} target="_blank" rel="noopener noreferrer">
                  <S.RepoIcon />
                  Repositório
                </S.NavItem>
                <S.NavItem data-tour="docs-link" href={API_DOCS_URL} target="_blank" rel="noopener noreferrer">
                  <S.DocIcon />
                  API Docs
                </S.NavItem>
              </S.Nav>

              <S.Actions>
                <S.ThemeButton onClick={toggleMode} aria-label="Toggle theme">
                  <motion.div
                    key={mode}
                    initial={{ rotate: 0, scale: 0.8, opacity: 0 }}
                    animate={{ rotate: 360, scale: 1, opacity: 1 }}
                    exit={{ rotate: -180, scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    {mode === "light" ? <S.DarkModeIcon /> : <S.LightModeIcon />}
                  </motion.div>
                </S.ThemeButton>
                <S.MenuButton onClick={() => setMenuOpen(true)}>
                  <S.MenuIcon />
                </S.MenuButton>
              </S.Actions>
            </S.RightCluster>
          </>
        )}
      </S.Header>

      {menuOpen && (
        <S.MobileMenu>
          <S.CloseButton onClick={() => setMenuOpen(false)}>
            <S.CloseIcon />
          </S.CloseButton>

          <S.MobileNav>
            <S.NavItem
              href={GITHUB_REPO}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              <S.RepoIcon /> Repositório
            </S.NavItem>
            <S.NavItem
              href={API_DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              <S.DocIcon /> API Docs
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
