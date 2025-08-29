# ADR-003 — Resolução da Hierarquia de Líderes (leaderId)

### Contexto
O extrato de folha fornecido possui uma coluna `email do gestor`.  
Para que seja possível calcular KPIs respeitando a hierarquia (diretos + indiretos), precisamos que a tabela `Employees` referencie corretamente quem é o líder de cada colaborador.

Entretanto, na base:
- O campo de gestor vem em formato de texto (e-mail).  
- O campo `leaderId` é uma foreign key que espera o `id` do líder já existente no banco.  
- Não podemos preencher `leaderId` diretamente na primeira inserção, pois ainda não sabemos o `id` de cada gestor.

### Decisão
Implementar a resolução da hierarquia em **duas passagens no seeder**:

1. **Primeira passada**: inserir todos os colaboradores na tabela `Employees` com `leaderId = null`.  
   - Isso garante que todos os colaboradores recebam um `id` autoincrementado.

2. **Segunda passada**: percorrer novamente a base, localizar o `id` do gestor pelo e-mail e atualizar o `leaderId` de cada colaborador.  
   - Exemplo:
     - Pamela Berry → `email do gestor = sharonbarr@kpis.tech`.  
     - Encontrar `id` de Sharon Barr na tabela.  
     - Atualizar Pamela Berry com `leaderId = <id de Sharon>`.

### Consequências
- **Positivas**:
  - Hierarquia corretamente resolvida em qualquer profundidade.  
  - Suporte direto a queries recursivas (`WITH RECURSIVE`) para calcular KPIs considerando diretos + indiretos.  
  - Lógica clara e simples no seeder.

- **Negativas**:
  - Necessidade de duas interações completas sobre a base.  
  - Pequeno overhead na ingestão (irrelevante para 100 ou mesmo milhares de registros).

### Status
✅ Implementado no seeder `20250826-load-employees.cjs`:
- Inserção inicial com `leaderId = null`.  
- Resolução posterior com `bulkUpdate` após mapear `email → id`.