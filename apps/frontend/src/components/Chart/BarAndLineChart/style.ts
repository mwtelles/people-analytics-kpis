import styled from 'styled-components';

export const StyledSVG = styled.svg`
  width: 100%;
  height: 100%;
  padding: 25px;

  .grid-line {
    stroke: ${({ theme }) => theme.colors.text}; 
    stroke-dasharray: 3 3;
  }

  .line {
    fill: none;
    stroke-width: 3px;
  }

  .axis-label {
    fill: ${({ theme }) => theme.colors.text}; 
    font-size: 18px;
  }

  .tooltip-rect {
    border-radius: 8px;
    padding: 2px;
  }

  .tooltip {
    fill: ${({ theme }) => theme.colors.text}; 
    font-size: 18px;
    font-weight: 600;
  }

`;

