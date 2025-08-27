import { createContext } from "react";

interface FeatureFlags {
  challenge: boolean;
}

export interface FeatureFlagsContextType {
  flags: FeatureFlags;
  toggleChallenge: () => void;
}

export const FeatureFlagsContext = createContext<FeatureFlagsContextType | undefined>(undefined);
