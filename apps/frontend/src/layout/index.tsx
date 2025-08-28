import React from "react";
import ChallengeLayout from "./challenge";
import BoostLayout from "./boost";
import FloatingToggle from "../components/FloatingToggle";
import { useFeatureFlags } from "../contexts/FeatureFlags";
import AiFloatingToggle from "../components/AiFloatingToggle";

interface LayoutProps {
  children: React.ReactNode;
  variant?: "landing" | "app";
  headerLayout?: "centered" | "logoLeft";
}

export default function Layout({ children, variant, headerLayout }: LayoutProps) {
  const { flags } = useFeatureFlags();

  return (
    <>
      {flags.challenge ? (
        <BoostLayout variant={variant} headerLayout={headerLayout}>{children}</BoostLayout>
      ) : (
        <ChallengeLayout>{children}</ChallengeLayout>
      )}

      <FloatingToggle />
      <AiFloatingToggle />
    </>
  );
}
