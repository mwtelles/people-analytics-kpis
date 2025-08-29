import React, { useState } from "react";
import { TourContext } from "./context";

export function TourProvider({ children }: { children: React.ReactNode }) {
  const [seen, setSeen] = useState<Record<string, boolean>>(() => {
    const stored = localStorage.getItem("tours-seen");
    return stored ? JSON.parse(stored) : {};
  });

  const markAsSeen = (tour: string) => {
    const updated = { ...seen, [tour]: true };
    setSeen(updated);
    localStorage.setItem("tours-seen", JSON.stringify(updated));
  };

  return <TourContext.Provider value={{ seen, markAsSeen }}>{children}</TourContext.Provider>;
}
