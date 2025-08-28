import styled from "styled-components";

export const Drawer = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 380px;
  height: 60%;
  background: ${({ theme }) => theme.colors.backgroundContent};
  border-top-left-radius: 16px;
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  box-shadow: -4px -4px 20px rgba(0, 0, 0, 0.15);
  z-index: 1400;
`;

export const Header = styled.div`
  padding: 12px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  font-weight: 600;
`;

export const Messages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Message = styled.div<{ $role: "user" | "assistant" }>`
  align-self: ${({ $role }) => ($role === "user" ? "flex-end" : "flex-start")};
  background: ${({ $role, theme }) =>
    $role === "user" ? theme.colors.primary : theme.colors.surface};
  color: ${({ $role, theme }) =>
    $role === "user" ? "#fff" : theme.colors.text};
  padding: 8px 12px;
  border-radius: 12px;
  max-width: 80%;
`;

export const InputRow = styled.div`
  padding: 8px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  gap: 8px;

  input {
    flex: 1;
    border: none;
    outline: none;
    padding: 8px;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.surface};
  }

  button {
    border: none;
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
    padding: 8px 12px;
    border-radius: 8px;
    cursor: pointer;
  }
`;
