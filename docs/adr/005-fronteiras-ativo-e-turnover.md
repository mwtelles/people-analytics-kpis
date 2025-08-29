# ADR-005 — Regras de Fronteira para Atividade e Turnover

### Contexto
Enquanto implementava os cálculos de KPIs (headcount e turnover), percebi que precisava tomar uma decisão clara sobre os casos de fronteira.  
Especificamente: como tratar um colaborador admitido ou desligado exatamente no limite de um mês?  
Sem essas regras, os cálculos poderiam ficar inconsistentes e confusos.

### Decisão
Adotei as seguintes regras:

1. **Admissão**
   - Um funcionário é considerado ativo **a partir do dia da admissão, inclusive**.
   - Exemplo: se alguém é admitido em `2021-01-31`, ele deve aparecer ativo em janeiro, mesmo que tenha trabalhado apenas um dia.

2. **Rescisão**
   - Um funcionário é considerado ativo **até o dia da rescisão, inclusive**.
   - Exemplo: desligado em `2021-01-01` → aparece ativo em 01/01, mas entra no turnover de janeiro.

3. **Exclusão**
   - Funcionários **admitidos após o mês de referência** não entram no headcount desse mês.
   - Funcionários **desligados antes do mês de referência** também não entram no headcount.

4. **Turnover**
   - O turnover de um mês considera todos os desligamentos ocorridos dentro desse mês (incluindo se aconteceu no primeiro ou último dia).

### Consequências
- **Positivas**:
  - Os cálculos ficam consistentes e alinhados às boas práticas de People Analytics.
  - Casos de fronteira ficam documentados e cobertos por testes automatizados.
  - Eu evito qualquer ambiguidade no cálculo de headcount e turnover.

- **Negativas**:
  - Precisei escrever mais cenários de teste para garantir esses limites.
  - Um colaborador ativo por apenas um dia ainda impacta o headcount do mês (decisão consciente).

### Status
✅ Já implementei essas regras em:
- `utils/dateUtils.ts` (`isActiveOnDate`)
- `services/kpi/kpiService.ts`
- Testes (`dateUtils.test.ts` e `kpiService.test.ts`), cobrindo:
  - Admissão no último dia do mês.
  - Rescisão no primeiro dia do mês.
  - Admissão futura (excluído).
  - Rescisão passada (excluído).
