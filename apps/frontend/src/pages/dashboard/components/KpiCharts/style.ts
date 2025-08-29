import { styled } from "styled-components";

export const GridChart = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
`;

export const CardChart = styled.div`
  min-height: 320px;
  width: 100%;
  max-width: 100%;
  overflow: auto;
`;
