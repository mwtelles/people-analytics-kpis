import timeout from "connect-timeout";
import { Request, Response, NextFunction } from "express";

export function setupTimeout(app: any) {
  app.use(timeout("15s"));

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err?.code === "ETIMEDOUT") {
      return res.status(503).json({ error: "Request timed out" });
    }
    next(err);
  });
}
