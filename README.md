# People Analytics KPIs

 Deploy em produção:

* 🌐 [Frontend](https://frontend-people-analytics-mwtelles.up.railway.app/)
* 🌐 [Backend](https://backend-people-analytics-mwtelles.up.railway.app/)
* 📚 [Swagger Docs](https://backend-people-analytics-mwtelles.up.railway.app/api/docs)



### ✨ Features

* 📊 **KPIs de People Analytics**:

  * **Headcount** (média entre ativos no dia 1 e no último dia do mês)
  * **Turnover** (desligados no mês ÷ headcount)
* 🌳 **Hierarquia organizacional** via CTE recursiva no PostgreSQL
* 🤖 **IA (OpenAI)** integrada para:

  * Perguntas e respostas em linguagem natural
  * Insights narrativos sobre os gráficos
* 📚 **API documentada no Swagger**
* 🧪 **Testes unitários** no backend e frontend
* 🚀 Deploy no **Railway** em contêineres separados (`frontend`, `backend`, `postgres`)
* 📝 **ADRs** registrando decisões arquiteturais

## Backend

* **Camadas explícitas**: controllers, services, repositories, models, middlewares, config
* Endpoints REST:

  * `GET /api/kpis/headcount?email=...&from=...&to=...`
  * `GET /api/kpis/turnover?email=...&from=...&to=...`
  * `GET /api/kpis/summary?email=...&from=...&to=...`
  * `POST /api/ai/qa` → perguntas em linguagem natural
  * `POST /api/ai/insights` → resumo de KPIs

### Frontend

* **React + TypeScript + styled-components**
* **Nenhuma biblioteca de UI ou charts externa**
* Gráficos **SVG/Canvas autorais** com tooltips interativos
* **React Query** para chamadas assíncronas
* UI responsiva, moderna e performática

## Tecnologias

* **Frontend**: React, TypeScript, styled-components, React Query, framer-motion
* **Backend**: Node.js, Express, TypeScript, Sequelize
* **Banco de Dados**: PostgreSQL + CTE recursivas + pré-agregação mensal
* **Infra**: Docker, Docker Compose, Railway
* **IA**: OpenAI API (insights e Q\&A)
* **Qualidade**: ESLint, Prettier, Jest, commitlint, ADRs

## ⚙️ Como Rodar Localmente

Pré-requisitos:

* Node.js >= 20
* Docker + Docker Compose

Clone o repositório:

```bash
git clone https://github.com/seu-usuario/people-analytics-kpis.git
cd people-analytics-kpis
```

Suba os serviços:

```bash
docker compose up --build
```

Acesse:

* Frontend → [http://localhost:5170](http://localhost:5170)
* Backend → [http://localhost:3000/api](http://localhost:3000/api)
* Swagger → [http://localhost:3000/api/docs](http://localhost:3000/api/docs)


## 🔄 CI/CD

O projeto utiliza **GitHub Actions** para automação de qualidade e deploy:

* **CI Checks** (executado em `push` e `PR` para `main` e `develop`):

  * Lint (ESLint + Prettier)
  * Testes do **backend** (com PostgreSQL em container)
  * Testes do **frontend**
  * Build do monorepo
* **Release Pipeline** para geração de versões
* **Husky + commitlint** garantindo convenção de commits (`conventional commits`)

Exemplo de workflow:

```yaml
on:
  push:
    branches: [main, develop]
  pull_request:

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint

  backend:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: people_analytics
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
      - run: pnpm install --frozen-lockfile
      - run: pnpm --filter db migrate
      - run: pnpm --filter backend build
      - run: pnpm --filter backend test
```

## ✅ Qualidade & Boas Práticas

* Código limpo, modular e tipado (SOLID)
* DTOs consistentes e validações robustas
* Timezone consistente em UTC
* Sanitização de entrada e queries otimizadas
* Testes unitários em **front** e **back**
* CI/CD com pipelines completos
