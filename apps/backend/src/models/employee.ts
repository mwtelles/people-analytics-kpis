import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface EmployeeAttributes {
  id: number;
  registration: string;
  status: "ativo" | "inativo";
  name: string;
  email: string;
  leaderId?: number | null;
  admissionDate: Date;
  resignationDate?: Date | null;
  position?: string;
}

type EmployeeCreationAttributes = Optional<
  EmployeeAttributes,
  "id" | "leaderId" | "resignationDate" | "position"
>;

export class Employee
  extends Model<EmployeeAttributes, EmployeeCreationAttributes>
  implements EmployeeAttributes
{
  public id!: number;
  public registration!: string;
  public status!: "ativo" | "inativo";
  public name!: string;
  public email!: string;
  public leaderId!: number | null;
  public admissionDate!: Date;
  public resignationDate!: Date | null;
  public position!: string;
}

Employee.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    registration: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.ENUM("ativo", "inativo"), allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    leaderId: { type: DataTypes.INTEGER, allowNull: true },
    admissionDate: { type: DataTypes.DATEONLY, allowNull: false },
    resignationDate: { type: DataTypes.DATEONLY, allowNull: true },
    position: { type: DataTypes.STRING, allowNull: true },
  },
  {
    sequelize,
    tableName: "Employees",
    timestamps: true,
  },
);
