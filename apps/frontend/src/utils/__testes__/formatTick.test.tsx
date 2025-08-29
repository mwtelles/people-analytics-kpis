import { describe, it, expect } from "vitest";
import { formatTick } from "../formatTick";

describe("formatTick", () => {
  it("retorna número arredondado sem porcentagem", () => {
    expect(formatTick(10.4)).toBe("10");
    expect(formatTick(10.6)).toBe("11");
    expect(formatTick(0)).toBe("0");
  });

  it("retorna número arredondado com porcentagem", () => {
    expect(formatTick(10.4, true)).toBe("10%");
    expect(formatTick(10.6, true)).toBe("11%");
    expect(formatTick(0, true)).toBe("0%");
  });

  it("funciona com valores negativos", () => {
    expect(formatTick(-5.4)).toBe("-5");
    expect(formatTick(-5.6)).toBe("-6");
    expect(formatTick(-5.4, true)).toBe("-5%");
  });
});
