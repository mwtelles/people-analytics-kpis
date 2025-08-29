import { describe, it, expect } from "vitest";
import { parseMonth, formatMonth } from "../date";

describe("parseMonth", () => {
    it("deve converter YYYY-MM em objeto Date UTC no primeiro dia", () => {
        const date = parseMonth("2025-08");
        expect(date.toISOString()).toBe("2025-08-01T00:00:00.000Z");
    });

    it("deve funcionar para meses de 1 dígito", () => {
        const date = parseMonth("2025-1");
        expect(date.toISOString()).toBe("2025-01-01T00:00:00.000Z");
    });
});

describe("formatMonth", () => {
    it("formata mês curto + ano (default pt-BR)", () => {
        const formatted = formatMonth("2025-08");
        expect(formatted).toMatch(/ago/);
        expect(formatted).toMatch(/25/);
    });

    it("formata mês longo em inglês com ano numérico", () => {
        const formatted = formatMonth("2025-08", {
            locale: "en-US",
            format: "long",
            showYear: "numeric",
        });
        expect(formatted).toBe("August 2025");
    });

    it("formata apenas mês (sem ano)", () => {
        const formatted = formatMonth("2025-08", {
            showYear: false,
        });
        expect(formatted).toMatch(/^ago/);
    });

    it("funciona com locale en-US e mês curto", () => {
        const formatted = formatMonth("2025-01", {
            locale: "en-US",
            format: "short",
            showYear: "2-digit",
        });
        expect(formatted).toBe("Jan 25");
    });
});
