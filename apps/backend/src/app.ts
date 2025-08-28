import express from "express";
import cors from "cors";
import kpiRoutes from "./routes/kpiRoutes";
import { setupSwagger } from "./config/swagger";
import employeeRoutes from "./routes/employeeRoutes";
import aiRoutes from "./routes/aiRoutes";
import timeout from "connect-timeout";

const app = express();

app.use(cors({ origin: process.env.VITE_URL || "http://localhost:5173" }));
console.log(`CORS enabled for ${process.env.VITE_URL || "http://localhost:5173"}`);

app.use(express.json());

app.use(timeout("15s"));

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err?.code === "ETIMEDOUT") {
    return res.status(503).json({ error: "Request timed out" });
  }
  next(err);
});

app.use("/api/kpis", kpiRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/ai", aiRoutes);

setupSwagger(app);

export default app;
