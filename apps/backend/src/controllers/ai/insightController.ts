import { Request, Response } from "express";
import { getInsights } from "../../services/ai/insightService";

export async function insightsController(req: Request, res: Response) {
  try {
    const { email, from, to } = req.query;
    if (!email || !from || !to) {
      return res.status(400).json({ error: "Missing params" });
    }

    const text = await getInsights(String(email), String(from), String(to));
    res.json({ text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate insights" });
  }
}
