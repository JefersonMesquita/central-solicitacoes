import express from "express";
import cors from "cors";

// Middlewares
import errorHandler from "./middlewares/error-handler.middleware.js";

// Rotas
import router from "./router.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", router);
app.use(errorHandler);

app.get("/health", (_req, res) => res.json({ status: "ok" }));

export default app;
