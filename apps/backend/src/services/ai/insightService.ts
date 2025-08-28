import OpenAI from "openai";
import { KpiService } from "../kpi/kpiService";
import dotenv from "dotenv";
const env = process.env.OPENAI_API_KEY;
dotenv.config();

const client = new OpenAI({ apiKey: env });

export async function getInsights(email: string, from: string, to: string) {
  const summary = await KpiService.getSummary(email, from, to);

  const prompt = `
Você é um analista de People Analytics.
Baseado nos KPIs abaixo, gere um resumo executivo em português:

- Headcount: último=${summary.headcount.last}, média=${summary.headcount.avg.toFixed(
    1,
  )}, máximo=${summary.headcount.max}
- Turnover: último=${summary.turnover.last.toFixed(
    1,
  )}%, média=${summary.turnover.avg.toFixed(
    1,
  )}%, máximo=${summary.turnover.max.toFixed(1)}%

Explique de forma clara as tendências, picos e quedas observadas no período entre ${from} e ${to}.
  `;

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 250,
  });

  return completion.choices[0].message.content ?? "";
}
