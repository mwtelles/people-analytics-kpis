import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJsDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "People Analytics KPIs API",
      version: "1.0.0",
      description:
        "API para cálculo de KPIs de People Analytics (headcount e turnover) com base em liderados diretos e indiretos.",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Local dev server",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsDoc(options);

export function setupSwagger(app: Express) {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
