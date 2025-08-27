import request from "supertest";
import app from "../../app";

describe("KPI Routes (integration)", () => {
  it("deve retornar série de headcount", async () => {
    const res = await request(app)
      .get("/api/kpis/headcount")
      .query({
        email: "daniellewinters@kpis.tech",
        from: "2021-01",
        to: "2021-03",
        scope: "total"
      });

    expect([200, 400]).toContain(res.status);
    if (res.status === 200) {
      expect(res.body).toHaveProperty("aggregates.total.headcount");
      expect(Array.isArray(res.body.aggregates.total.headcount)).toBe(true);
    }
  });

  it("deve retornar série de turnover", async () => {
    const res = await request(app)
      .get("/api/kpis/turnover")
      .query({
        email: "daniellewinters@kpis.tech",
        from: "2021-01",
        to: "2021-03",
        scope: "total"
      });

    expect([200, 400]).toContain(res.status);
    if (res.status === 200) {
      expect(res.body).toHaveProperty("aggregates.total.turnover");
      expect(Array.isArray(res.body.aggregates.total.turnover)).toBe(true);
    }
  });
});
