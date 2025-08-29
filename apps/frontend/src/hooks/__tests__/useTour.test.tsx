import { renderHook } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useTour } from "../useTour";
import { TourContext } from "../../contexts/Tour";

const mockContext = {
  currentStep: 0,
  start: () => {},
  next: () => {},
  prev: () => {},
  stop: () => {},
  seen: {},
  markAsSeen: () => {},
};

describe("useTour", () => {
  it("retorna contexto quando usado dentro do TourProvider", () => {
    const { result } = renderHook(() => useTour(), {
      wrapper: ({ children }) => (
        <TourContext.Provider value={mockContext}>
          {children}
        </TourContext.Provider>
      ),
    });

    expect(result.current).toBe(mockContext);
  });

  it("lança erro quando usado fora do TourProvider", () => {
    expect(() => renderHook(() => useTour())).toThrowError(
      "useTour must be used inside TourProvider",
    );
  });
});
