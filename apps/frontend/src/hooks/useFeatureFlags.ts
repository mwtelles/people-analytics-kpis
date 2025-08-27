import { useContext } from "react";
import { FeatureFlagsContext } from "../contexts/FeatureFlags";

export function useFeatureFlags() {
  const ctx = useContext(FeatureFlagsContext);
  if (!ctx) {
    throw new Error("useFeatureFlags must be used within FeatureFlagsProvider");
  }
  return ctx;
}
