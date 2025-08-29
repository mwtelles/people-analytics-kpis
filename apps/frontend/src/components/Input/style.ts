import { Mail04 } from "@untitled-ui/icons-react";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`;

export const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: left;
`;

export const InputWrapper = styled.div<{
  $hasError?: boolean;
  $isValid?: boolean;
  $validating?: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid
    ${({ theme, $hasError, $isValid }) =>
      $hasError ? theme.colors.error : $isValid ? theme.colors.success : theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundContent};

  ${({ $validating, theme }) =>
    $validating &&
    `
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px ${theme.colors.primary}40;
  `}

  &:focus-within {
    border-color: ${({ theme, $hasError, $isValid }) =>
      $hasError
        ? theme.colors.errorHover
        : $isValid
          ? theme.colors.successHover
          : theme.colors.primary};
    box-shadow: 0 0 0 2px
      ${({ theme, $hasError, $isValid }) =>
        $hasError
          ? `${theme.colors.error}40`
          : $isValid
            ? `${theme.colors.success}40`
            : `${theme.colors.primary}40`};
  }

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
`;

export const Icon = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
`;

export const InputField = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  background: transparent;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
    opacity: 0.7;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ErrorMsg = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.error};
  margin-top: 2px;
`;

export const MailIcon = styled(Mail04)``;
