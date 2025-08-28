import express from "express";
import cors from "cors";
import kpiRoutes from "./routes/kpiRoutes";
import { setupSwagger } from "./config/swagger";
import employeeRoutes from "./routes/employeeRoutes";
import aiRoutes from "./routes/aiRoutes";

const app = express();

app.use(cors({ origin: process.env.VITE_URL || "http://localhost:5173" }));

app.use(express.json());

app.use("/api/kpis", kpiRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/ai", aiRoutes);

setupSwagger(app);

export default app;
