import { Router } from "express";
import { checkEmail } from "../controllers/employee/employee.controller";

const router = Router();

/**
 * @openapi
 * /employees/check-email:
 *   get:
 *     summary: Verifica se o e-mail pertence a um funcionário cadastrado
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: E-mail do funcionário a ser verificado
 *         example: daniellewinters@kpis.tech   # 👈 exemplo default
 *     responses:
 *       200:
 *         description: E-mail encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 valid:
 *                   type: boolean
 *                   example: true
 *                 email:
 *                   type: string
 *                   example: daniellewinters@kpis.tech
 *       400:
 *         description: Requisição inválida (email ausente ou mal formatado)
 *       404:
 *         description: E-mail não encontrado
 */
router.get("/check-email", checkEmail);

export default router;
