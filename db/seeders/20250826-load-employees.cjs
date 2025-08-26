"use strict";

const path = require("path");
const XLSX = require("xlsx");

function excelDateToJSDate(value) {
  if (!value) return null;
  if (typeof value === "number") {
    const date = XLSX.SSF.parse_date_code(value);
    return new Date(Date.UTC(date.y, date.m - 1, date.d));
  }
  if (value instanceof Date) return value;
  return new Date(value);
}

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface) {
    const filePath = path.resolve(__dirname, "../data/folha_de_pagamento_ACME_A.xlsx");
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    for (const row of rows) {
      await queryInterface.bulkInsert(
        "Employees",
        [
          {
            registration: String(row["matrícula"]),
            status: row["status"].toLowerCase(),
            name: row["nome"],
            email: row["email"].toLowerCase(),
            leaderId: null,
            admissionDate: excelDateToJSDate(row["data de admissão"]),
            resignationDate: excelDateToJSDate(row["data de rescisão"]),
            position: row["cargo"],
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
    }

    const employees = await queryInterface.sequelize.query(
      `SELECT id, email FROM "Employees";`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    for (const row of rows) {
      const leaderEmail = row["email do gestor"];
      if (leaderEmail) {
        const leader = employees.find(
          (e) => e.email.toLowerCase() === leaderEmail.toLowerCase()
        );
        if (leader) {
          await queryInterface.bulkUpdate(
            "Employees",
            { leaderId: leader.id },
            { email: row["email"].toLowerCase() }
          );
        }
      }
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Employees", null, {});
  },
};
