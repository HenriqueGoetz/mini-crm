import express from "express";
import { logger } from "./middlewares/logger.middleware";
import router from "./routes/index";

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(express.json());

app.use(logger);
app.use(router);

app.listen(PORT, () => {
  console.log(`🚀 Backend rodando em http://localhost:${PORT}`);
});
