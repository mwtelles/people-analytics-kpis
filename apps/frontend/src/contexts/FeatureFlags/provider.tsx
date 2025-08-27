import React, { useEffect, useState } from "react";
import { FeatureFlagsContext } from "./context";

export const FeatureFlagsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [challenge, setChallenge] = useState<boolean>(() => {
    const stored = localStorage.getItem("feature_challenge");
    return stored ? stored === "true" : false;
  });

  useEffect(() => {
    localStorage.setItem("feature_challenge", String(challenge));
  }, [challenge]);

  const toggleChallenge = () => setChallenge((prev) => !prev);

  return (
    <FeatureFlagsContext.Provider value={{ flags: { challenge }, toggleChallenge }}>
      {children}
    </FeatureFlagsContext.Provider>
  );
};
