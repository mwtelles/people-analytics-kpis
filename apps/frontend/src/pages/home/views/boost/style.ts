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
  color: #fff;
  text-align: center;

  span {
    background: linear-gradient(90deg, #00b4d8, #0077b6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

export const Subheadline = styled.p`
  font-size: 1.25rem;
  color: #bbb;
  max-width: 700px;
  text-align: center;

  strong {
    color: #fff;
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

  color: #888;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  width: 100%;
  max-width: 480px;

  span {
    background: rgba(15, 20, 30, 0.9);
    padding: 0.4rem 1rem;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
`;

export const Card = styled.div`
  background: rgba(15, 20, 30, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(25px);
  border-radius: 20px;
  padding: 2rem;
  width: 100%;
  max-width: 600px;

  box-shadow: 0 0 50px rgba(0, 180, 216, 0.15);
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
    background: radial-gradient(circle, rgba(0, 180, 216, 0.25), transparent 70%);
    filter: blur(80px);
    z-index: -1;
  }
`;

export const FormIntro = styled.p`
  font-size: 1rem;
  color: #aaa;
  text-align: center;

  strong {
    color: #fff;
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
  background: rgba(0, 0, 0, 0.4);
  padding: 1rem 1.25rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus-within {
    border-color: #00b4d8;
    box-shadow: 0 0 12px rgba(0, 180, 216, 0.4);
  }

  svg {
    flex-shrink: 0;
    opacity: 0.9;
  }
`;

export const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
  background: transparent;
  color: #fff;

  &::placeholder {
    color: #777;
  }
`;

export const SubmitButton = styled.button`
  padding: 1rem;
  border-radius: 12px;
  border: none;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  background: rgba(252, 252, 252, 0.2);
  color: white;
  transition: all 0.25s ease;

  &:hover:not(:disabled) {
    background: #0077b6;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ErrorBox = styled.div`
  color: #ff6b6b;
  font-weight: 500;
  text-align: center;
  font-size: 0.9rem;
`;

export const Mailicon = styled(Mail04)`
`;