import { Router } from "express";
import { KpiController } from "../controllers/kpi/kpiController";

const router = Router();

/**
 * @swagger
 * /kpis/headcount:
 *   get:
 *     summary: Retorna a evolução do headcount no período
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
 *         description: Série temporal de headcount
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
 *                         - month: "2021-02"
 *                           value: 13
 *               grouped:
 *                 summary: Escopo grouped
 *                 value:
 *                   aggregates:
 *                     direct:
 *                       headcount:
 *                         - month: "2021-01"
 *                           value: 5
 *                     indirect:
 *                       headcount:
 *                         - month: "2021-01"
 *                           value: 7
 *                     total:
 *                       headcount:
 *                         - month: "2021-01"
 *                           value: 12
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
 *                         name: "Pedro"
 *                         email: "pedro@empresa.com"
 *                         position: "Gerente"
 *                         status: "ativo"
 *                         type: "direct"
 *                         metrics:
 *                           headcount:
 *                             - month: "2021-01"
 *                               value: 5
 *                         reports: []
 *                   aggregates:
 *                     direct: { headcount: [{ month: "2021-01", value: 5 }] }
 *                     indirect: { headcount: [{ month: "2021-01", value: 7 }] }
 *                     total: { headcount: [{ month: "2021-01", value: 12 }] }
 */
router.get("/headcount", KpiController.getHeadcount);

/**
 * @swagger
 * /kpis/turnover:
 *   get:
 *     summary: Retorna a evolução do turnover no período
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
 *       - in: query
 *         name: scope
 *         required: false
 *         schema:
 *           type: string
 *           enum: [total, grouped, hierarchy]
 *         example: "hierarchy"
 *       - in: query
 *         name: includeMeta
 *         required: false
 *         schema:
 *           type: boolean
 *         example: true
 *     responses:
 *       200:
 *         description: Série temporal de turnover
 *         content:
 *           application/json:
 *             examples:
 *               total:
 *                 summary: Escopo total
 *                 value:
 *                   aggregates:
 *                     total:
 *                       turnover:
 *                         - month: "2021-01"
 *                           value: 0.05
 *                         - month: "2021-02"
 *                           value: 0
 *               grouped:
 *                 summary: Escopo grouped
 *                 value:
 *                   aggregates:
 *                     direct:
 *                       turnover:
 *                         - month: "2021-01"
 *                           value: 0.04
 *                     indirect:
 *                       turnover:
 *                         - month: "2021-01"
 *                           value: 0.06
 *                     total:
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
 *                         type: "direct"
 *                         metrics:
 *                           turnover:
 *                             - month: "2021-01"
 *                               value: 0.03
 *                         reports: []
 *                   aggregates:
 *                     direct: { turnover: [{ month: "2021-01", value: 0.03 }] }
 *                     indirect: { turnover: [{ month: "2021-01", value: 0.07 }] }
 *                     total: { turnover: [{ month: "2021-01", value: 0.05 }] }
 */
router.get("/turnover", KpiController.getTurnover);

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
