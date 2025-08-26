import { isActiveOnDate } from "../../utils/dateUtils";

describe("isActiveOnDate", () => {
  const baseEmployee = {
    admissionDate: "2020-01-01",
    resignationDate: null,
  };

  it("deve retornar true se o funcionário está ativo na data", () => {
    const active = isActiveOnDate(baseEmployee, new Date("2021-06-01"));
    expect(active).toBe(true);
  });

  it("deve retornar false se a data é antes da admissão", () => {
    const active = isActiveOnDate(baseEmployee, new Date("2019-12-31"));
    expect(active).toBe(false);
  });

  it("deve retornar false se a data é depois da rescisão", () => {
    const emp = { ...baseEmployee, resignationDate: "2021-01-31" };
    const active = isActiveOnDate(emp, new Date("2021-02-01"));
    expect(active).toBe(false);
  });
});
