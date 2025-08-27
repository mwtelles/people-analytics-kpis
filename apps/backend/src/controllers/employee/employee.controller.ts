import { Request, Response } from "express";
import { EmployeeRepository } from "../../repositories/employee";

export async function checkEmail(req: Request, res: Response) {
  const { email } = req.query;
  if (!email || typeof email !== "string") {
    return res.status(400).json({ valid: false, error: "Email is required" });
  }

  const employee = await EmployeeRepository.findByEmail(email);

  if (!employee) {
    return res.status(404).json({ valid: false });
  }

  return res.json({ valid: true, email: employee.email });
}

