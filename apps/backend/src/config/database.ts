import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.POSTGRES_DB || "people_analytics",
  process.env.POSTGRES_USER || "postgres",
  process.env.POSTGRES_PASSWORD || "admin",
  {
    host: process.env.POSTGRES_HOST || "localhost",
    port: Number(process.env.POSTGRES_PORT) || 5432,
    dialect: "postgres",
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    timezone: "UTC",
    define: {
      underscored: false,
      freezeTableName: true,
      timestamps: true,
    },
  },
);

export default sequelize;
