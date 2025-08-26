import express from "express";
import kpiRoutes from "./routes/kpiRoutes";
import { setupSwagger } from "./config/swagger";

const app = express();

app.use(express.json());

app.use("/api/kpis", kpiRoutes);

setupSwagger(app);

export default app;
