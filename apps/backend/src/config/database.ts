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
    dialectOptions: {
      statement_timeout: Number(process.env.DB_STATEMENT_TIMEOUT) || 10000,
      query_timeout: Number(process.env.DB_QUERY_TIMEOUT) || 10000,
    },
    pool: {
      max: 10,
      min: 0,
      acquire: Number(process.env.DB_ACQUIRE_TIMEOUT) || 20000,
      idle: Number(process.env.DB_IDLE_TIMEOUT) || 10000,
    },
  },
);

export default sequelize;
