import { Request, Response } from "express";
import { KpiService, KpiScope } from "../../services/kpi";
import { KpiResponseDto, KpiSummaryDto } from "../../dtos/kpi.dto";

function parseScope(scope: unknown): KpiScope {
  if (scope === "grouped" || scope === "hierarchy" || scope === "total") {
    return scope;
  }
  return "total";
}

export class KpiController {
  static async getKpis(req: Request, res: Response) {
    try {
      const { email, from, to, scope = "total", includeMeta } = req.query;

      if (!email || !from || !to) {
        return res
          .status(400)
          .json({ error: "Parâmetros obrigatórios: email, from, to" });
      }

      const result: KpiResponseDto = await KpiService.getKpis(
        String(email),
        String(from),
        String(to),
        parseScope(scope),
        includeMeta === "true"
      );

      return res.json(result satisfies KpiResponseDto);
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Erro interno ao calcular KPIs" });
    }
  }

  static async getSummary(req: Request, res: Response) {
    try {
      const { email, from, to } = req.query;

      if (!email || !from || !to) {
        return res
          .status(400)
          .json({ error: "Parâmetros obrigatórios: email, from, to" });
      }

      const result: KpiSummaryDto = await KpiService.getSummary(
        String(email),
        String(from),
        String(to)
      );

      return res.json(result satisfies KpiSummaryDto);
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Erro interno ao calcular resumo de KPIs" });
    }
  }
}
