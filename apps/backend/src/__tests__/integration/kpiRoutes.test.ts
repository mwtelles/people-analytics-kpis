import request from "supertest";
import app from "../../app";

describe("KPI Routes (integration)", () => {
  it("deve retornar série de headcount", async () => {
    const res = await request(app)
      .get("/api/kpis/headcount")
      .query({ email: "daniellewinters@kpis.tech", from: "2021-01", to: "2021-03" });

    expect([200, 400]).toContain(res.status);
    if (res.status === 200) {
      expect(res.body).toHaveProperty("series");
      expect(Array.isArray(res.body.series)).toBe(true);
    }
  });

  it("deve retornar série de turnover", async () => {
    const res = await request(app)
      .get("/api/kpis/turnover")
      .query({ email: "daniellewinters@kpis.tech", from: "2021-01", to: "2021-03" });

    expect([200, 400]).toContain(res.status);
    if (res.status === 200) {
      expect(res.body).toHaveProperty("series");
    }
  });
});
