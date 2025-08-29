import { Step } from "react-joyride";

export const dashboardSteps: Step[] = [
  {
    target: '[data-tour="headline"]',
    content: "Bem-vindo ao seu Dashboard! Aqui você acompanha os KPIs do seu time.",
    disableBeacon: true,
  },
  {
    target: '[data-tour="scope-select"]',
    content: "Selecione se deseja ver dados Totais, Diretos vs Indiretos ou por Hierarquia.",
  },
  {
    target: '[data-tour="date-picker"]',
    content: "Ajuste o período de análise usando o seletor de datas e atalhos rápidos.",
  },
  {
    target: '[data-tour="card-headcount"]',
    content: "Aqui está o Headcount atual — a quantidade média de colaboradores no período.",
  },
  {
    target: '[data-tour="card-average-headcount"]',
    content: "Este é o Headcount médio, que mostra a média de colaboradores ao longo do tempo.",
  },
  {
    target: '[data-tour="card-max-headcount"]',
    content: "Este é o Headcount máximo, que mostra o pico de colaboradores no período.",
  },
  {
    target: '[data-tour="card-turnover"]',
    content: "Este é o Turnover, que mostra a taxa de desligamento do time.",
  },
  {
    target: '[data-tour="card-max-turnover"]',
    content: "Este é o Turnover máximo, que mostra o pico de desligamentos no período.",
  },
  {
    target: '[data-tour="chart-headcount"]',
    content: "Gráfico de Headcount mês a mês, com comparações entre times ou hierarquia.",
  },
  {
    target: '[data-tour="chart-turnover"]',
    content: "Gráfico de Turnover mês a mês, para acompanhar as flutuações de saída.",
  },
  {
    target: '[data-tour="chat"]',
    content: "Aqui você pode interagir com o assistente virtual para obter insights adicionais.",
  }
];
