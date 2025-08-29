import OpenAI from "openai";
import { KpiService } from "../kpi/kpiService";
import dotenv from "dotenv";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

dotenv.config();

const env = process.env.OPENAI_API_KEY;
const client = new OpenAI({ apiKey: env });

function formatHuman(date: string) {
  return format(new Date(date), "MMMM 'de' yyyy", { locale: ptBR });
}

export async function answerQuestion(email: string, question: string) {
  const today = format(new Date(), "yyyy-MM-dd");

  const parserPrompt = `
Hoje é ${today}.
Pergunta: "${question}"

Sua tarefa:
- Interprete corretamente períodos relativos (ex: "últimos 5 anos", "este ano", "últimos 6 meses"), sempre considerando a data de hoje (${today}).
- Retorne sempre datas absolutas em AAAA-MM-DD.
- Não invente outros campos.

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

  const text = `O ${metric === "headcount" ? "número de funcionários" : "turnover"} \
(${agg === "avg" ? "médio" : agg === "max" ? "máximo" : "mais recente"}) \
entre ${formatHuman(from)} e ${formatHuman(to)} foi \
${value.toFixed(1)}${metric === "turnover" ? "%" : ""}.`;

  return {
    text,
    value,
    params,
  };
}
