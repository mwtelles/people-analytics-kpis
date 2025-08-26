# ADR-004 — Padronização de Datas em UTC

### Contexto
O cálculo de KPIs (headcount e turnover) depende de datas de admissão, rescisão e do controle mês a mês.

- Datas construídas como `new Date("2021-01-01")` eram interpretadas em UTC-3, resultando em `2020-12-31T21:00:00Z`.
- Funções de bibliotecas como `date-fns` (`startOfMonth`, `endOfMonth`) geravam objetos `Date` no fuso local, antecipando ou atrasando o início/fim de mês.
- Isso levava a cálculos incorretos, como headcount aparecendo em dezembro de 2020 quando o período solicitado era janeiro de 2021.


### Decisão
Adotada a estratégia **UTC Everywhere**, com as seguintes medidas:

1. **Armazenamento no banco**  
   - As datas de admissão e rescisão são persistidas como `DATEONLY` no PostgreSQL, sem timezone.

2. **Construção de datas em UTC**  
   - Ao converter parâmetros `from` e `to` (`YYYY-MM`), usamos:
     ```ts
     new Date(Date.UTC(year, month - 1, 1))
     ```

3. **Iteração mensal sem libs externas**  
   - Implementado o helper `getMonthRange(year, month)` em `utils/monthUtils.ts`:
     ```ts
     export function getMonthRange(year: number, month: number) {
       const start = new Date(Date.UTC(year, month, 1));
       const end = new Date(Date.UTC(year, month + 1, 0));
       return { start, end };
     }
     ```
   - Isso garante o primeiro e último dia do mês em UTC, sem depender de timezone local.

4. **Testes de fronteira**  
   - Criados testes unitários (`monthUtils.test.ts`) para validar:
     - Janeiro (31 dias).
     - Fevereiro comum (28 dias).
     - Fevereiro bissexto (29 dias).
     - Dezembro (transição de ano).

### Consequências
- **Positivas**:
  - Cálculos consistentes em qualquer ambiente (local, CI/CD, Railway, produção).
  - Nenhum risco de datas “deslocadas” por fuso horário.
  - Testes garantem robustez em cenários limítrofes (anos bissextos, mudança de ano).
  - Arquitetura mais clara: funções de data isoladas em `utils/`.

- **Negativas**:
  - A lógica de iteração mensal precisou ser implementada manualmente em vez de usar bibliotecas como `date-fns`.
  - Leve aumento de código, mas totalmente compensado pela previsibilidade.


### Status
✅ Implementado em:
- `utils/monthUtils.ts`
- `services/kpi/kpiService.ts`
- `utils/__tests__/monthUtils.test.ts`
