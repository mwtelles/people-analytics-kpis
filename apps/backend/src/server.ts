import express from "express";

const app = express();
app.use(express.json());

app.get("/health", (_, res) => res.json({ status: "ok" }));

if (require.main === module) {
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`🚀 Backend running on http://localhost:${port}`));
}

export default app;
