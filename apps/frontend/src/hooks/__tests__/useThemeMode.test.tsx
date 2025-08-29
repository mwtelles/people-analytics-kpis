import { renderHook } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useThemeMode } from "../useThemeMode";
import { ThemeModeContext } from "../../contexts/ThemeMode";
import { ThemeModeContextType } from "../../contexts/ThemeMode/context";

describe("useThemeMode", () => {
  it("retorna contexto quando usado dentro do ThemeModeProvider", () => {
    const mockContext: ThemeModeContextType = {
      mode: "light",
      toggleMode: () => {},
    };

    const { result } = renderHook(() => useThemeMode(), {
      wrapper: ({ children }) => (
        <ThemeModeContext.Provider value={mockContext}>
          {children}
        </ThemeModeContext.Provider>
      ),
    });

    expect(result.current).toBe(mockContext);
  });

  it("lança erro quando usado fora do ThemeModeProvider", () => {
    expect(() => renderHook(() => useThemeMode())).toThrowError(
      "useThemeMode must be used within ThemeModeProvider",
    );
  });
});
