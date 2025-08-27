import { Request, Response } from "express";
import { KpiService } from "../../services/kpi";
import { KpiResponseDto } from "../../dtos/kpi.dto";

export class KpiController {
  static async getHeadcount(req: Request, res: Response) {
    try {
      const { email, from, to, scope = "total", includeMeta } = req.query;

      if (!email || !from || !to) {
        return res
          .status(400)
          .json({ error: "Parâmetros obrigatórios: email, from, to" });
      }

      const result: KpiResponseDto = await KpiService.getHeadcount(
        String(email),
        String(from),
        String(to),
        String(scope),
        includeMeta === "true"
      );

      return res.json(result satisfies KpiResponseDto);
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Erro interno ao calcular headcount" });
    }
  }

  static async getTurnover(req: Request, res: Response) {
    try {
      const { email, from, to, scope = "total", includeMeta } = req.query;

      if (!email || !from || !to) {
        return res
          .status(400)
          .json({ error: "Parâmetros obrigatórios: email, from, to" });
      }

      const result: KpiResponseDto = await KpiService.getTurnover(
        String(email),
        String(from),
        String(to),
        String(scope),
        includeMeta === "true"
      );

      return res.json(result satisfies KpiResponseDto);
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Erro interno ao calcular turnover" });
    }
  }
}
