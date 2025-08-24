import express from "express";

const app = express();
app.use(express.json());

app.get("/health", (_, res) => res.json({ status: "ok" }));

if (require.main === module) {
    app.listen(5000, () => console.log("🚀 Backend running on http://localhost:5000"));
}

export default app;
