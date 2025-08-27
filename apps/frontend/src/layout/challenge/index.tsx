import React from "react";
import * as S from "./style";
import { ChartLineUp, GithubLogo, BookOpen } from "phosphor-react";
import Logo from "../../components/Logo";

interface Props {
  children: React.ReactNode;
}

const API_DOCS_URL = import.meta.env.VITE_API_DOCS_URL || "http://localhost:3000/api/docs";
const GITHUB_REPO = "https://github.com/mwtelles/people-analytics-kpis";

export default function ChallengeLayout({ children }: Props) {
  return (
    <S.Container>
      <S.Header>
        <Logo />

        <S.Nav>
          <S.NavItem href="/">
            <ChartLineUp size={20} weight="duotone" />
            Dashboard
          </S.NavItem>
          <S.NavItem href={API_DOCS_URL} target="_blank" rel="noopener noreferrer">
            <BookOpen size={20} weight="duotone" />
            API Docs
          </S.NavItem>
          <S.NavItem href={GITHUB_REPO} target="_blank" rel="noopener noreferrer">
            <GithubLogo size={20} weight="duotone" />
            GitHub
          </S.NavItem>
        </S.Nav>
      </S.Header>

      <S.Content>{children}</S.Content>

      <S.Footer>
        © {new Date().getFullYear()} People Analytics KPIs — Desenvolvido por{" "}
        <strong>Matheus Telles</strong>
      </S.Footer>
    </S.Container>
  );
}
