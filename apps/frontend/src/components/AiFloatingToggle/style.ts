import styled from "styled-components";
import { motion } from "framer-motion";
import { Send03, User02, X } from "@untitled-ui/icons-react";
import logo from "../../assets/logo.svg";

export const FloatingWrapper = styled.div`
  position: fixed;
  bottom: 4%;
  right: 1%;
  z-index: 999;
  display: flex;
  align-items: end;
  justify-content: end;
`;

export const FloatingButton = styled(motion.button)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.glowPrimary};
  cursor: pointer;
  display: grid;
  place-items: center;

  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textSecondary || "#fff"};

  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  box-shadow: ${({ theme }) => theme.shadow.md};

  &:hover {
    transform: translateY(-2px);
    background: ${({ theme }) => theme.colors.primaryHover};
    box-shadow: ${({ theme }) => theme.shadow.lg};
  }
`;

export const Text = styled.span`
  font-size: 22px;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 520px;
  max-width: 360px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 12px;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.overlayVeryStrong};
  color: ${({ theme }) => theme.colors.text};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px 12px 0 0;
`;

export const Title = styled.h4`
  font-size: 14px;
  font-weight: 600;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.errorHover};
  }
`;

export const CloseIcon = styled(X)`
  width: 18px;
  height: 18px;
`;

export const Segmented = styled.div`
  display: inline-flex;
  border-radius: ${({ theme }) => theme.radius.full};
  padding: 2px;

  background: ${({ theme }) => theme.colors.buttonGlass};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Segment = styled.button`
  border: 0;
  cursor: pointer;
  padding: 6px 10px;
  font-size: 12px;
  border-radius: ${({ theme }) => theme.radius.full};

  color: ${({ theme }) => theme.colors.textSecondary};
  background: transparent;

  &[data-active="true"] {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    box-shadow: ${({ theme }) => theme.shadow.sm};
  }
`;

export const ChatBody = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 320px;
  overflow: auto;
  background: ${({ theme }) => theme.colors.overlayVeryStrong};

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 4px;
`;

export const MessageRow = styled.div<{ align: "user" | "assistant" | "system" }>`
  display: flex;
  align-items: flex-end;
  gap: 8px;
  justify-content: ${({ align }) => (align === "user" ? "flex-end" : "flex-start")};
`;

export const Avatar = styled.div<{ side: "left" | "right" }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.glowPrimary};
  background: ${({ theme }) => theme.colors.background};
  display: grid;
  place-items: center;
  flex: 0 0 28px;

  img { width: 100%; height: 100%; object-fit: cover; }
  svg { width: 16px; height: 16px; color: ${({ theme }) => theme.colors.primary}; }
  span { font-size: 12px; color: ${({ theme }) => theme.colors.textSecondary}; }
`;

export const Logo = styled.img`
  content: url(${logo});
`;

export const UserIcon = styled(User02)`
  width: 20px;
  height: 20px;
`;

export const Message = styled.div<{ $role: "user" | "assistant" | "system"; $type?: "message" | "error"; }>`
  max-width: 76%;
  padding: 10px 12px;
  border-radius: 10px;
  font-size: 13px;
  line-height: 1.35;

  color: ${({ $role, theme }) =>
    $role === "user" ? (theme.colors.text || "#fff") : theme.colors.text};

  background: ${({ $role, theme }) =>
    $role === "user" ? theme.colors.primary : theme.colors.surface};

  border: 1px solid
    ${({ $role, theme }) => ($role === "user" ? "transparent" : theme.colors.border)};

  & a { color: inherit; text-decoration: underline; }

  ${({ $type, theme }) =>
    $type === "error" && `
    border: 1px solid ${theme.colors.error};
    background: ${theme.colors.surface};
    color: ${theme.colors.error};
  `}
`;

export const ParamsBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 6px;
`;

export const ParamChip = styled.span`
  background: ${({ theme }) => theme.colors.backgroundContent};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 11px;
`;

export const ApplyButton = styled.button`
  border: 0;
  background: ${({ theme }) => theme.colors.primaryHover};
  color: ${({ theme }) => theme.colors.textSecondary || "#fff"};
  border-radius: 8px;
  padding: 2px 8px;
  font-size: 11px;
  cursor: pointer;
`;

export const Suggestions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 4px 6px 0;
`;

export const Suggestion = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundContent};
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.radius.full};
  padding: 6px 10px;
  font-size: 12px;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadow.sm};
  &:hover { background: ${({ theme }) => theme.colors.surface}; }
`;

export const ChatFooter = styled.div`
  display: flex;
  flex-direction: row;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0px 0px 8px 8px;
`;

export const PrimaryButton = styled.button`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.primaryHover};
  color: ${({ theme }) => theme.colors.text || "#fff"};
  border: none;
  border-radius: 0px 0px 8px 0px;
  padding: 0 15px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadow.sm};
  transition: background 0.2s ease;

  &:hover { background: ${({ theme }) => theme.colors.primary}; }
  &:disabled { cursor: not-allowed; }
`;

export const Input = styled.textarea`
  flex: 1;
  resize: none;
  min-height: 40px;
  max-height: 96px;
  border: none;
  outline: none;
  border-radius:  0px 0px 0px 10px;
  padding: 8px;
  font-size: 14px;

  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};

  &::placeholder { color: ${({ theme }) => theme.colors.textSecondary}; }
  &:focus { 
    outline: 1px solid ${({ theme }) => theme.colors.primaryHover};
  }
`;

export const SendIcon = styled(Send03)`
  width: 20px;
  height: 20px;
`;

export const TypingBubble = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  max-width: 76%;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 8px 10px;
  border-radius: 10px;
  font-size: 13px;
`;

export const LoadingText = styled.span`
  white-space: nowrap;
`;

export const Dots = styled.span`
  display: inline-flex;
  gap: 4px;
`;

export const Dot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.textSecondary};
  display: inline-block;
`;

export const InsightHeading = styled.h5`
  font-size: 14px;
  font-weight: 600;
  margin: 6px 0;
  color: ${({ theme }) => theme.colors.textHighlight};
`;

export const InsightItem = styled.li`
  font-size: 13px;
  margin-left: 18px;
  list-style: disc;
  color: ${({ theme }) => theme.colors.text};
`;
