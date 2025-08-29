import { Router } from "express";
import { KpiController } from "../controllers/kpi/kpiController";

const router = Router();

/**
 * @swagger
 * /kpis:
 *   get:
 *     summary: Retorna séries de headcount e turnover no período
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         example: "daniellewinters@kpis.tech"
 *       - in: query
 *         name: from
 *         required: true
 *         schema:
 *           type: string
 *         example: "2021-01"
 *       - in: query
 *         name: to
 *         required: true
 *         schema:
 *           type: string
 *         example: "2021-12"
 *       - in: query
 *         name: scope
 *         required: false
 *         schema:
 *           type: string
 *           enum: [total, grouped, hierarchy]
 *         example: "grouped"
 *       - in: query
 *         name: includeMeta
 *         required: false
 *         schema:
 *           type: boolean
 *         example: true
 *     responses:
 *       200:
 *         description: Séries temporais de headcount e turnover
 *         content:
 *           application/json:
 *             examples:
 *               total:
 *                 summary: Escopo total
 *                 value:
 *                   aggregates:
 *                     total:
 *                       headcount:
 *                         - month: "2021-01"
 *                           value: 12
 *                       turnover:
 *                         - month: "2021-01"
 *                           value: 0.05
 *               grouped:
 *                 summary: Escopo grouped
 *                 value:
 *                   aggregates:
 *                     direct:
 *                       headcount:
 *                         - month: "2021-01"
 *                           value: 5
 *                       turnover:
 *                         - month: "2021-01"
 *                           value: 0.04
 *                     indirect:
 *                       headcount:
 *                         - month: "2021-01"
 *                           value: 7
 *                       turnover:
 *                         - month: "2021-01"
 *                           value: 0.06
 *                     total:
 *                       headcount:
 *                         - month: "2021-01"
 *                           value: 12
 *                       turnover:
 *                         - month: "2021-01"
 *                           value: 0.05
 *               hierarchy:
 *                 summary: Escopo hierarchy
 *                 value:
 *                   leader:
 *                     id: 1
 *                     name: "João"
 *                     email: "joao@empresa.com"
 *                     position: "Diretor"
 *                     status: "ativo"
 *                   hierarchy:
 *                     directReports:
 *                       - id: 2
 *                         name: "Ana"
 *                         email: "ana@empresa.com"
 *                         position: "Gerente"
 *                         status: "ativo"
 *                         counts: { direct: 5, indirect: 12, total: 17 }
 *                         metrics:
 *                           headcount:
 *                             - month: "2021-01"
 *                               value: 5
 *                           turnover:
 *                             - month: "2021-01"
 *                               value: 0.03
 *                         reports: []
 *                   aggregates:
 *                     total:
 *                       headcount: [{ month: "2021-01", value: 12 }]
 *                       turnover: [{ month: "2021-01", value: 0.05 }]
 *                     direct: { headcount: [], turnover: [] }
 *                     indirect: { headcount: [], turnover: [] }
 */
router.get("/", KpiController.getKpis);

/**
 * @swagger
 * /kpis/summary:
 *   get:
 *     summary: Retorna os agregados de headcount e turnover no período
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         example: "daniellewinters@kpis.tech"
 *       - in: query
 *         name: from
 *         required: true
 *         schema:
 *           type: string
 *           example: "2021-01"
 *       - in: query
 *         name: to
 *         required: true
 *         schema:
 *           type: string
 *           example: "2021-12"
 *     responses:
 *       200:
 *         description: Resumo dos KPIs (último, média e máximo)
 *         content:
 *           application/json:
 *             example:
 *               headcount:
 *                 last: 642
 *                 avg: 635
 *                 max: 650
 *               turnover:
 *                 last: 4.2
 *                 avg: 3.8
 *                 max: 6.8
 */
router.get("/summary", KpiController.getSummary);

export default router;
