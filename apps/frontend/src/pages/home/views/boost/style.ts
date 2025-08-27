import { Mail04 } from "@untitled-ui/icons-react";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 2rem;
  z-index: 10;
`;

export const Headline = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;

  span {
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.primary},
      ${({ theme }) => theme.colors.primaryHover}
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

export const Subheadline = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 700px;
  text-align: center;

  strong {
    color: ${({ theme }) => theme.colors.text};
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  width: 100%;
  max-width: 480px;

  span {
    background: ${({ theme }) => theme.colors.overlayStrong};
    padding: 0.4rem 1rem;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  }
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.overlay};
  border: 1px solid ${({ theme }) => theme.colors.borderSoft};
  backdrop-filter: blur(25px);
  border-radius: 20px;
  padding: 2rem;
  width: 100%;
  max-width: 600px;

  box-shadow: 0 0 50px ${({ theme }) => theme.colors.glowSecondary};
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: -60px;
    left: 50%;
    transform: translateX(-50%);
    width: 400px;
    height: 200px;
    background: radial-gradient(
      circle,
      ${({ theme }) => theme.colors.glowPrimary} 0%,
      transparent 70%
    );
    filter: blur(80px);
    z-index: -1;
  }
`;

export const FormIntro = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;

  strong {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: ${({ theme }) => theme.colors.overlayInput};
  padding: 1rem 1.25rem;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.borderSoft};
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 12px ${({ theme }) => theme.colors.glowPrimary};
  }

  svg {
    flex-shrink: 0;
    opacity: 0.9;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const SubmitButton = styled.button`
  position: relative;
  overflow: hidden;

  padding: 0.5rem 1rem;
  height: 50px;
  border-radius: 12px;
  border: none;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;

  background: ${({ theme }) => theme.colors.buttonGlass};
  color: ${({ theme }) => theme.colors.text};
  transition: transform 0.3s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    color: #fff;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;

    background: linear-gradient(
      120deg,
      rgba(255, 255, 255, 0.12) 0%,
      rgba(255, 255, 255, 0.04) 40%,
      rgba(255, 255, 255, 0.12) 80%
    );

    background-size: 200% 100%;
    background-position: -120% 0;

    opacity: 0;
    transition: opacity 0.4s ease, background-position 1.2s ease-in-out;
    pointer-events: none;
  }

  &:hover::before {
    opacity: 1;
    background-position: 120% 0;
  }
`;


export const ErrorBox = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-weight: 500;
  text-align: center;
  font-size: 0.9rem;
`;

export const Mailicon = styled(Mail04)``;
