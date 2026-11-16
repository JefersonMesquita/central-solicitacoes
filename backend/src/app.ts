import express from "express";

// Middlewares
import errorHandler from "./middlewares/error-handler.middleware";

// Rotas
import router from "./router";

const app = express();

app.use(express.json());
app.use("/api", router);
app.use(errorHandler);

app.get("/health", (_req, res) => res.json({ status: "ok" }));

export default app;
