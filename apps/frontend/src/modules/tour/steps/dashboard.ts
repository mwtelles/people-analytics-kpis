import { Step } from "react-joyride";

export const dashboardSteps: Step[] = [
  { target: "#chart-headcount", content: "Headcount mês a mês.", disableBeacon: true },
  { target: "#chart-turnover", content: "Aqui você monitora o turnover da equipe." },
  { target: "#legend", content: "Use a legenda para filtrar as métricas." },
];
