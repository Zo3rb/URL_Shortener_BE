import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import shortUrlRouter from "./routes/ShortUrl.route";

// initiate the Application.
const app: Application = express();

// Register Global Middleware.
app.use(cors());
app.use(express.json());

// Register the Routes.
app.get(
  "/api/health-check",
  (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
      status: "success",
      message:
        "This Message Means That the Api is Working and Responding Successfully",
    });
  }
);
app.use("/api/shortener", shortUrlRouter);

export default app;
