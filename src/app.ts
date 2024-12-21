import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";

const app: Application = express();

// middlewares and parser
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// get started
const getRoot = (req: Request, res: Response) => {
  res.send("Blog Project is Running");
};
app.get("/", getRoot);

// application routes
app.use("/api", router);

// global error handler
app.use(globalErrorHandler);

// not found
app.use(notFound);

export default app;
