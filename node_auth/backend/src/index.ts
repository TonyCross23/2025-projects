import "dotenv/config";
import express from "express";
import cors from "cors";
import connectToDatabase from "./config/db";
import { APP_ORIGIN, PORT } from "./constants/env";
import errorHandler from "./middlewares/errorHandler";
import { OK } from "./constants/http";
import authRouters from "./routes/auth.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
  })
);

app.get("/", (req, res, next) => {
  throw new Error("this is test error");
  res.status(OK).json({
    message: "Healthy",
  });
});

//auth route
app.use("/auth", authRouters);

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectToDatabase();
});
