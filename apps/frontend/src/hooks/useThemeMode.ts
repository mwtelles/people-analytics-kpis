import { useContext } from "react";
import { ThemeModeContext } from "../contexts/ThemeMode";

export function useThemeMode() {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) {
    throw new Error("useThemeMode must be used within ThemeModeProvider");
  }
  return ctx;
}
