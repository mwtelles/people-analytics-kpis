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

export async function getInsights(email: string, from: string, to: string) {
  const summary = await KpiService.getSummary(email, from, to);

  const prompt = `
Você é um analista de People Analytics.
Sua tarefa: escrever um resumo executivo em português, claro e objetivo.

Contexto:
- Período analisado: ${formatHuman(from)} até ${formatHuman(to)}
- Headcount: último=${summary.headcount.last}, média=${summary.headcount.avg.toFixed(1)}, máximo=${summary.headcount.max}
- Turnover: último=${summary.turnover.last.toFixed(1)}%, média=${summary.turnover.avg.toFixed(1)}%, máximo=${summary.turnover.max.toFixed(1)}%

Regras:
- Destaque tendências (crescimento, queda, estabilidade).
- Aponte picos ou quedas relevantes.
- Evite repetir apenas os números crus, use-os para justificar a análise.
- Texto deve ter no máximo 3 parágrafos curtos.
`;

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 250,
  });

  return completion.choices[0].message.content?.trim()
    ?? "Não foi possível gerar um insight para esse período.";
}