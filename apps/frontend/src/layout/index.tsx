import React from "react";
import ChallengeLayout from "./challenge";
import BoostLayout from "./boost";

const FEATURE_ENTERPRISE = import.meta.env.VITE_FEATURE_ENTERPRISE === "true";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return FEATURE_ENTERPRISE ? (
    <BoostLayout>{children}</BoostLayout>
  ) : (
    <ChallengeLayout>{children}</ChallengeLayout>
  );
}
