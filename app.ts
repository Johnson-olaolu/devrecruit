import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import ConnectDB from "./config/database.config";
import { errorHandler, notFound } from "./middleware/errorMiddleware";
import logger from "./config/wiston.config";
import { registerRoutes } from "./routes/index.routes";

//For env File
dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

(async () => {
  await ConnectDB();
  logger.info("Database connected");
})();

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

registerRoutes(app);

//error middleware
app.use(notFound, errorHandler);

export default app;
