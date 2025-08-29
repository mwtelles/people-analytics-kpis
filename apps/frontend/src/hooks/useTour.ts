import { useContext } from "react";
import { TourContext } from "../contexts/Tour";

export function useTour() {
  const ctx = useContext(TourContext);
  if (!ctx) {
    throw new Error("useTour must be used inside TourProvider");
  }
  return ctx;
}
