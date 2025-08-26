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
 *     responses:
 *       200:
 *         description: Série temporal de headcount
 *         content:
 *           application/json:
 *             example:
 *               series:
 *                 - month: "2021-01"
 *                   value: 12
 *                 - month: "2021-02"
 *                   value: 13
 *                 - month: "2021-03"
 *                   value: 15
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
 *     responses:
 *       200:
 *         description: Série temporal de turnover
 *         content:
 *           application/json:
 *             example:
 *               series:
 *                 - month: "2021-01"
 *                   value: 0.05
 *                 - month: "2021-02"
 *                   value: 0
 *                 - month: "2021-03"
 *                   value: 0.08
 */
router.get("/turnover", KpiController.getTurnover);

export default router;
