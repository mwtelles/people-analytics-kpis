import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

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












export const ChatContainer = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  right: 0;
  bottom: -3%;
`;
