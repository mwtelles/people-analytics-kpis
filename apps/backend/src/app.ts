import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import kpiRoutes from "./routes/kpiRoutes";
import { setupSwagger } from "./config/swagger";
import employeeRoutes from "./routes/employeeRoutes";
import aiRoutes from "./routes/aiRoutes";
import timeout from "connect-timeout";

const app = express();

app.use(cors({ origin: process.env.VITE_URL }));
console.log(`CORS enabled for ${process.env.VITE_URL}`);

app.use(express.json());
app.use(timeout("15s"));

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (typeof err === "object" && err !== null && "code" in err) {
    if ((err as { code?: string }).code === "ETIMEDOUT") {
      return res.status(503).json({ error: "Request timed out" });
    }
  }
  next(err);
});

app.use("/api/kpis", kpiRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/ai", aiRoutes);

setupSwagger(app);

export default app;
