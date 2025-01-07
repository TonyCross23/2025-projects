import express, { Application } from "express";
import userRouter from "./routes/userRouter";
import "./db/db";

const port = process.env.PORT || 6000;

const app: Application = express();

app.use(express.json());
app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
