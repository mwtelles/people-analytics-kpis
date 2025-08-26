import { Request, Response } from "express";
import { KpiService } from "../../services/kpi";

export class KpiController {
  static async getHeadcount(req: Request, res: Response) {
    try {
      const { email, from, to } = req.query;

      if (!email || !from || !to) {
        return res.status(400).json({ error: "Parâmetros obrigatórios: email, from, to" });
      }

      const series = await KpiService.getHeadcountSeries(String(email), String(from), String(to));

      return res.json({ series });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro interno ao calcular headcount" });
    }
  }

  static async getTurnover(req: Request, res: Response) {
    try {
      const { email, from, to } = req.query;

      if (!email || !from || !to) {
        return res.status(400).json({ error: "Parâmetros obrigatórios: email, from, to" });
      }

      const series = await KpiService.getTurnoverSeries(String(email), String(from), String(to));

      return res.json({ series });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro interno ao calcular turnover" });
    }
  }
}
