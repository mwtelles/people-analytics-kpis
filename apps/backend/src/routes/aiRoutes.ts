import { Router } from "express";
import { insightsController } from "../controllers/ai/insightController";
import { qaController } from "../controllers/ai/qaController";

const router = Router();

/**
 * @swagger
 * /ai/insights:
 *   get:
 *     summary: Gera um resumo narrativo baseado nos KPIs
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
 *         description: Texto narrativo sobre os KPIs
 *         content:
 *           application/json:
 *             example:
 *               text: "O headcount cresceu de 120 para 142 (+18%)..."
 */
router.get("/insights", insightsController);

/**
 * @swagger
 * /ai/qa:
 *   post:
 *     summary: Responde perguntas em linguagem natural sobre KPIs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "daniellewinters@kpis.tech"
 *               question:
 *                 type: string
 *                 example: "Qual foi o turnover médio em 2023?"
 *     responses:
 *       200:
 *         description: Resposta em texto + parâmetros resolvidos
 *         content:
 *           application/json:
 *             example:
 *               text: "O turnover (média) entre 2023-01-01 e 2023-12-31 foi 3.8%."
 *               value: 3.8
 *               params:
 *                 metric: "turnover"
 *                 agg: "avg"
 *                 from: "2023-01-01"
 *                 to: "2023-12-31"
 */
router.post("/qa", qaController);

export default router;
