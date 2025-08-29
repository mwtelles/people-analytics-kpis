import { describe, it, expect } from "vitest";
import { formatValue } from "../formatValue";

describe("formatValue", () => {
    it("formata número inteiro em pt-BR", () => {
        expect(formatValue(1000, false)).toBe("1.000");
        expect(formatValue(1234567, false)).toBe("1.234.567");
    });

    it("formata número decimal em pt-BR (sem casas)", () => {
        expect(formatValue(1234.56, false)).toBe("1.235");
    });

    it("formata porcentagem com 1 casa decimal", () => {
        expect(formatValue(0.1, true)).toMatch(/10,0 ?%/);
        expect(formatValue(0.256, true)).toMatch(/25,6 ?%/);
        expect(formatValue(1, true)).toMatch(/100,0 ?%/);
    });

    it("formata porcentagem para valores negativos", () => {
        expect(formatValue(-0.5, true)).toMatch(/-50,0 ?%/);
    });
});
