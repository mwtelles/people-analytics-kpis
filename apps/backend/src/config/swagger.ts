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
        url: `${process.env.BACKEND_URL}/api`,
        description:
          process.env.NODE_ENV === "production" ? "Production server" : "Local dev server",
      },
    ],
  },
  apis: ["src/routes/*.ts", "dist/routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

export function setupSwagger(app: Express) {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
