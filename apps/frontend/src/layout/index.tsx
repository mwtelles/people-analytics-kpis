import React from "react";
import ChallengeLayout from "./challenge";
import BoostLayout from "./boost";
import FloatingToggle from "../components/FloatingToggle";
import { useFeatureFlags } from "../contexts/FeatureFlags";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const { flags } = useFeatureFlags();

  return (
    <>
      {flags.challenge ? (
        <BoostLayout>{children}</BoostLayout>
      ) : (
        <ChallengeLayout>{children}</ChallengeLayout>
      )}

      <FloatingToggle />
    </>
  );
}
