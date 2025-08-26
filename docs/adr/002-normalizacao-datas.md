# ADR-002 — Estratégia de Ingestão e Normalização de Datas

### Contexto
A base de folha de pagamento é entregue em Excel, contendo colunas de datas (`data de admissão`, `data de rescisão`).  
Na prática, os valores podem vir em formatos diferentes:
- **Número serial Excel** (dias desde 01/01/1900).  
- **Objeto Date**.  
- **String legível**.

Como o PostgreSQL espera valores compatíveis com `DATEONLY`, inserir os dados crus poderia gerar erros de tipo ou valores incorretos.

### Decisão
Implementar no seeder (`20250826-load-employees.cjs`) uma função `excelDateToJSDate` que normaliza os formatos:

- Se for número → converter com `XLSX.SSF.parse_date_code` para `Date` em UTC.  
- Se for `Date` → usar diretamente.  
- Se for string → parsear via `new Date(value)`.

### Consequências
- **Positivas**:
  - Consistência de dados para cálculos de KPIs.  
  - Evita erros de inserção no Postgres.  
  - Facilita comparações temporais.  

- **Negativas**:
  - Leve custo extra de processamento na ingestão.  

### Status
✅ Implementado no seeder `20250826-load-employees.cjs`.