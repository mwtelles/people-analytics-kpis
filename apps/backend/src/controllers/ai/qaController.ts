import { Request, Response } from "express";
import { answerQuestion } from "../../services/ai/qaService";

export async function qaController(req: Request, res: Response) {
  try {
    const { email, question } = req.body;
    if (!email || !question) {
      return res.status(400).json({ error: "Missing params" });
    }

    const answer = await answerQuestion(String(email), String(question));
    res.json(answer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to answer question" });
  }
}
