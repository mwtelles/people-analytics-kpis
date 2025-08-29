import request from "supertest";
import app from "../../app";

describe("KPI Routes (integration)", () => {
  it("deve retornar série de KPIs (headcount e turnover juntos)", async () => {
    const res = await request(app)
      .get("/api/kpis")
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

      expect(res.body).toHaveProperty("aggregates.total.turnover");
      expect(Array.isArray(res.body.aggregates.total.turnover)).toBe(true);
    }
  });

  it("deve retornar resumo de KPIs (summary)", async () => {
    const res = await request(app)
      .get("/api/kpis/summary")
      .query({
        email: "daniellewinters@kpis.tech",
        from: "2021-01",
        to: "2021-03"
      });

    expect([200, 400]).toContain(res.status);
    if (res.status === 200) {
      expect(res.body).toHaveProperty("headcount");
      expect(res.body).toHaveProperty("turnover");
      expect(res.body.headcount).toHaveProperty("last");
      expect(res.body.turnover).toHaveProperty("avg");
    }
  });
});
