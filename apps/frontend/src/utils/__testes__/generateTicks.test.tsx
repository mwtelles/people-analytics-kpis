import { describe, it, expect } from "vitest";
import { generateTicks } from "../generateTicks";

describe("generateTicks", () => {
  it("retorna [0] quando max <= 0", () => {
    expect(generateTicks(0)).toEqual([0]);
    expect(generateTicks(-10)).toEqual([0]);
  });

  it("retorna sequência simples quando max <= steps", () => {
    expect(generateTicks(3, 5)).toEqual([0, 1, 2, 3]);
    expect(generateTicks(5, 5)).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it("gera ticks 'bonitos' para valores grandes", () => {
    const ticks = generateTicks(100, 5);
    expect(ticks).toEqual([0, 20, 40, 60, 80, 100]);
  });

  it("sempre inclui o valor máximo mesmo se não cair no step exato", () => {
    const ticks = generateTicks(95, 5);
    expect(ticks[ticks.length - 1]).toBe(95);
  });

  it("funciona com steps diferentes", () => {
    expect(generateTicks(10, 2)).toEqual([0, 5, 10]);
    expect(generateTicks(10, 3)).toEqual([0, 5, 10]);
    expect(generateTicks(10, 4)).toEqual([0, 2, 4, 6, 8, 10]);
  });

  it("mantém ordem crescente", () => {
    const ticks = generateTicks(37, 5);
    const sorted = [...ticks].sort((a, b) => a - b);
    expect(ticks).toEqual(sorted);
  });
});
