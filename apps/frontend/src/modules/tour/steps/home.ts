import { Step } from "react-joyride";

export const homeSteps: Step[] = [
  {
    target: '[data-tour="repo-link"]',
    content: "Acesse o repositório público do projeto com código e documentação.",
    disableBeacon: true,
  },
  {
    target: '[data-tour="docs-link"]',
    content: "Aqui você encontra a documentação completa da API para explorar os endpoints.",
  },
  {
    target: '[data-tour="headline"]',
    content: "Este é o app de People Analytics KPIs — simples e direto ao ponto.",
  },
  {
    target: '[data-tour="email-input"]',
    content: "Digite seu e-mail corporativo para visualizar os indicadores do seu time.",
  },
  {
    target: '[data-tour="submit-btn"]',
    content: "Clique aqui para carregar seus dashboards de Headcount e Turnover.",
  },
];
