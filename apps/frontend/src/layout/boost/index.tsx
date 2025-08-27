import React from "react";
import * as S from "./style";

interface Props {
  children: React.ReactNode;
}

export default function BoostLayout({ children }: Props) {
  return (
    <S.Container>
      <S.Header>People Analytics Enterprise</S.Header>
      <S.Content>{children}</S.Content>
      <S.Footer>Enterprise Footer</S.Footer>
    </S.Container>
  );
}
