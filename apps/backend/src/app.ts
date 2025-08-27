import express from "express";
import cors from "cors";
import kpiRoutes from "./routes/kpiRoutes";
import { setupSwagger } from "./config/swagger";
import employeeRoutes from "./routes/employeeRoutes";

const app = express();

app.use(cors({ origin: process.env.VITE_URL || "http://localhost:5173" }));

app.use(express.json());

app.use("/api/kpis", kpiRoutes);
app.use("/api/employees", employeeRoutes);

setupSwagger(app);

export default app;
