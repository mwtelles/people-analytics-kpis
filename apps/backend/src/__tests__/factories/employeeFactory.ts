import { Employee } from "../../models/employee";

export function makeEmployee(attrs: Partial<Employee> = {}): Employee {
  return {
    id: 1,
    registration: "001",
    status: "ativo",
    name: "Teste User",
    email: "teste@acme.com",
    leaderId: null,
    admissionDate: new Date(Date.UTC(2020, 0, 1)),
    resignationDate: null,
    position: "Dev",
    ...attrs,
  } as Employee;
}
