# ADR-001 — Modelagem da Tabela Employees

### Contexto
O extrato de folha fornecido contém os seguintes campos por funcionário:

- matrícula  
- status (ativo/inativo)  
- nome  
- email  
- email do gestor  
- data de admissão  
- data de rescisão  
- cargo  

O desafio pede que os KPIs (headcount e turnover) sejam calculados respeitando a hierarquia de líderes diretos e indiretos.  
Isso implica em uma modelagem que suporte **relações hierárquicas** entre colaboradores.

### Decisão
Criar uma tabela única `Employees`, com **chave estrangeira recursiva** `leaderId` para representar a relação gestor → liderado.

### Estrutura

```sql
Employees (
  id SERIAL PRIMARY KEY,
  registration VARCHAR NOT NULL,
  status ENUM('ativo','inativo') NOT NULL,
  name VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  leaderId INT NULL REFERENCES Employees(id),
  admissionDate DATE NOT NULL,
  resignationDate DATE NULL,
  position VARCHAR,
  createdAt TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP NOT NULL
)
````


### Consequências

* **Positivas**:

  * Estrutura simples e alinhada ao extrato da folha.
  * Suporte nativo à hierarquia com `leaderId`.
  * Facilita consultas recursivas (`WITH RECURSIVE`) para obter subárvores de liderados.
  * Flexível para evoluir no modo Enterprise (normalizar cargos/departamentos).

* **Negativas**:

  * Cargos ficam em campo livre (`position`), sem normalização.
  * Não há histórico de movimentação de cargos/status, apenas o snapshot da base.

### Status

✅ Implementado via migration `20250826-create-employees.cjs`.
