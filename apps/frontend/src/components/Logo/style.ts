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