import cors from "cors";
import express from "express";
import { logger } from "./middlewares/logger.middleware";
import router from "./routes/index";

const app = express();
const PORT = 3001;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  }),
);
app.use(express.json());

app.use(logger);
app.use(router);

app.listen(PORT, () => {
  console.log(`🚀 Backend rodando em http://localhost:${PORT}`);
});
