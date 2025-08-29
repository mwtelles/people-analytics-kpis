import { styled } from "styled-components";

export const Toolbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
`;

export const HeadlineContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Headline = styled.h1`
  font-size: 2.3rem;
  letter-spacing: -2px;
  font-weight: 800;
  line-height: 1.2;
  text-align: left;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.primaryHover}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

export const Subheadline = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: left;

  strong {
    color: ${({ theme }) => theme.colors.text};
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 16px;
  flex-wrap: wrap;
  width: 100%;
`;

export const SelectContainer = styled.div`
  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const DateContainer = styled.div`
  width: 300px;

  @media (max-width: 480px) {
    width: 100%;
  }
`;
