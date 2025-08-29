import timeout from "connect-timeout";
import { Request, Response, NextFunction, Application } from "express";

export function setupTimeout(app: Application) {
  app.use(timeout("15s"));

  app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (typeof err === "object" && err !== null && "code" in err) {
      if ((err as { code?: string }).code === "ETIMEDOUT") {
        return res.status(503).json({ error: "Request timed out" });
      }
    }
    next(err);
  });
}
