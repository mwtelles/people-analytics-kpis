import OpenAI from "openai";
import { KpiService, KpiScope } from "../kpi/kpiService";
import dotenv from "dotenv";
const env = process.env.OPENAI_API_KEY;
dotenv.config();

const client = new OpenAI({ apiKey: env });

export async function answerQuestion(email: string, question: string) {
  const parserPrompt = `
Pergunta: "${question}"
Retorne um JSON com os campos:
- metric: "headcount" ou "turnover"
- agg: "last" | "avg" | "max"
- from: data inicial AAAA-MM-DD
- to: data final AAAA-MM-DD
  `;

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: parserPrompt }],
    response_format: { type: "json_object" },
  });

  const params = JSON.parse(completion.choices[0].message.content ?? "{}");
  const { metric, agg, from, to } = params;

  const summary = await KpiService.getSummary(email, from, to);
  const series = metric === "headcount" ? summary.headcount : summary.turnover;

  let value = 0;
  if (agg === "avg") value = series.avg;
  if (agg === "max") value = series.max;
  if (agg === "last") value = series.last;

  return {
    text: `O ${metric} (${agg}) entre ${from} e ${to} foi ${value.toFixed(
      1,
    )}${metric === "turnover" ? "%" : ""}.`,
    value,
    params,
  };
}
