import { getMonthRange } from "../monthUtils";

describe("getMonthRange", () => {
  it("deve retornar o primeiro e último dia de Janeiro 2021 em UTC", () => {
    const { start, end } = getMonthRange(2021, 0);

    expect(start.toISOString()).toBe("2021-01-01T00:00:00.000Z");
    expect(end.toISOString()).toBe("2021-01-31T00:00:00.000Z");
  });

  it("deve retornar o último dia correto para Fevereiro em ano não bissexto", () => {
    const { start, end } = getMonthRange(2021, 1);

    expect(start.toISOString()).toBe("2021-02-01T00:00:00.000Z");
    expect(end.toISOString()).toBe("2021-02-28T00:00:00.000Z");
  });

  it("deve retornar o último dia correto para Fevereiro em ano bissexto", () => {
    const { start, end } = getMonthRange(2020, 1);

    expect(start.toISOString()).toBe("2020-02-01T00:00:00.000Z");
    expect(end.toISOString()).toBe("2020-02-29T00:00:00.000Z");
  });

  it("deve retornar o último dia correto para Dezembro", () => {
    const { start, end } = getMonthRange(2021, 11);

    expect(start.toISOString()).toBe("2021-12-01T00:00:00.000Z");
    expect(end.toISOString()).toBe("2021-12-31T00:00:00.000Z");
  });
});
