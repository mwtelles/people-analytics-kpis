import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { ThemeModeContext, ThemeMode } from "./context";
import { lightTheme, darkTheme } from "../../theme";

export const ThemeModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const stored = localStorage.getItem("theme_mode");
    return stored === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    localStorage.setItem("theme_mode", mode);
  }, [mode]);

  const toggleMode = () => setMode((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};
