import { createContext } from "react";

export interface TourContextValue {
  seen: Record<string, boolean>;
  markAsSeen: (tour: string) => void;
}

export const TourContext = createContext<TourContextValue | undefined>(undefined);
