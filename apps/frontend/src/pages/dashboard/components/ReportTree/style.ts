import { styled } from "styled-components";

export const ReportCard = styled.div`
  padding: 1rem;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.overlay};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ReportCharts = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`;

export const CardChart = styled.div`
  min-height: 320px;
  width: 100%;
  max-width: 100%;
  overflow: auto;
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

export const SubReports = styled.div`
  margin-left: 2rem;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-left: 2px solid ${({ theme }) => theme.colors.border};
  padding-left: 1rem;
`;
