import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import { Request, Response, NextFunction } from "express";
import userRouter from "./api/User/userRouter";
import cors from "cors";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res
    .status(200)
    .json({ message: "Express Server built using create-xpress-starter" });
});

app.use("/api/users", userRouter);

// Global Error Handler
app.use(globalErrorHandler);

export default app;
