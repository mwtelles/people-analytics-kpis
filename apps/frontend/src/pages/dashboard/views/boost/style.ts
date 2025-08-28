import { BarChart01 } from "@untitled-ui/icons-react";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

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
  gap: 16px;
  flex-wrap: wrap;
`;

export const Select = styled.select`
  width: 200px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.glowPrimary};
  background: ${({ theme }) => theme.colors.overlay};
  border-radius: 8px;
  padding: 0 0.5rem;
  color: ${({ theme }) => theme.colors.textSecondary};

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

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  background: ${({ theme }) => theme.colors.overlay};
  border: 1px solid ${({ theme }) => theme.colors.glowPrimary};
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 480px) {
    padding: 12px;
    gap: 12px;
  }
`;

export const CardChart = styled.div`
  min-height: 320px;
  width: 100%;
  max-width: 100%;
  overflow: auto;
`;

export const CardIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.secondary};
  padding: 16px;
  border-radius: 100%;

  svg {
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 480px) {
    padding: 12px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CardTitle = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const CardValue = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  text-align: left;

  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

export const GridChart = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
`;

export const BarIcon = styled(BarChart01)``;

export const HierarchySection = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const ReportCard = styled.div`
  padding: 1rem;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.overlay};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ReportHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ReportName = styled.span`
  font-weight: 600;
  font-size: 1rem;
`;

export const ReportPosition = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ReportCharts = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`;

export const SubReports = styled.div`
  margin-left: 2rem;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-left: 2px solid ${({ theme }) => theme.colors.border};
  padding-left: 1rem;
`;
