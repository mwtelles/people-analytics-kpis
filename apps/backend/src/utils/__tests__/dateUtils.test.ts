import { makeEmployee } from "../../__tests__/factories/employeeFactory";
import { isActiveOnDate } from "../../utils/dateUtils";

describe("isActiveOnDate", () => {
  it("deve retornar true se o funcionário está ativo na data", () => {
    const emp = makeEmployee({ admissionDate: new Date("2020-01-01"), resignationDate: null });
    const active = isActiveOnDate(emp, new Date("2021-06-01"));
    expect(active).toBe(true);
  });

  it("deve retornar false se a data é antes da admissão", () => {
    const emp = makeEmployee({ admissionDate: new Date("2020-01-01"), resignationDate: null });
    const active = isActiveOnDate(emp, new Date("2019-12-31"));
    expect(active).toBe(false);
  });

  it("deve retornar false se a data é depois da rescisão", () => {
    const emp = makeEmployee({ admissionDate: new Date("2020-01-01"), resignationDate: new Date("2021-01-31") });
    const active = isActiveOnDate(emp, new Date("2021-02-01"));
    expect(active).toBe(false);
  });

  it("deve retornar true se a data for exatamente a data de admissão", () => {
    const emp = makeEmployee({ admissionDate: new Date("2021-01-10"), resignationDate: null });
    const active = isActiveOnDate(emp, new Date("2021-01-10"));
    expect(active).toBe(true);
  });

  it("deve retornar true se a data for exatamente a data de rescisão", () => {
    const emp = makeEmployee({ admissionDate: new Date("2020-01-01"), resignationDate: new Date("2021-01-31") });
    const active = isActiveOnDate(emp, new Date("2021-01-31"));
    expect(active).toBe(true);
  });

  it("deve retornar false se a data for após a data de rescisão", () => {
    const emp = makeEmployee({ admissionDate: new Date("2020-01-01"), resignationDate: new Date("2021-01-30") });
    const active = isActiveOnDate(emp, new Date("2021-01-31"));
    expect(active).toBe(false);
  });
});
